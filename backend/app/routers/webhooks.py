import logging
from html import escape
from typing import Any
from uuid import UUID
from fastapi import APIRouter, Body, Depends, HTTPException, Request
from fastapi.responses import Response
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Lead, OutboundJob, WebhookEvent
from app.schemas import InternalOutboundJob
from app.services.messaging import enqueue_template_job
from app.services.orchestrator import draft_reply_stub, playbook_for_lead

log = logging.getLogger(__name__)

router = APIRouter(tags=["webhooks"])


def _parse_crm_payload(body: dict[str, Any]) -> dict[str, Any]:
    return {
        "gym_id": str(body.get("gym_id") or body.get("tenant_id") or "default"),
        "external_id": body.get("external_id") or body.get("id"),
        "phone_e164": body.get("phone_e164") or body.get("phone") or body.get("Phone"),
        "payment_status": (body.get("payment_status") or body.get("payment") or "unknown").lower(),
        "member_status": (body.get("member_status") or body.get("membership") or "none").lower(),
    }


@router.post("/webhooks/crm")
async def crm_webhook(request: Request, db: Session = Depends(get_db)) -> dict[str, str]:
    body = await request.json()
    db.add(WebhookEvent(source="crm", payload=body))
    db.commit()

    parsed = _parse_crm_payload(body)
    phone = parsed.get("phone_e164")
    if not phone:
        return {"status": "ignored", "reason": "no phone in payload"}

    lead = db.scalars(
        select(Lead).where(Lead.gym_id == parsed["gym_id"], Lead.phone_e164 == str(phone))
    ).first()
    if not lead:
        lead = Lead(
            gym_id=parsed["gym_id"],
            phone_e164=str(phone),
            payment_status=parsed["payment_status"],
            member_status=parsed["member_status"],
            external_id=str(parsed["external_id"]) if parsed["external_id"] else None,
        )
        db.add(lead)
    else:
        lead.payment_status = parsed["payment_status"]
        lead.member_status = parsed["member_status"]
        if parsed["external_id"]:
            lead.external_id = str(parsed["external_id"])
    db.commit()
    db.refresh(lead)

    if parsed["payment_status"] == "paid":
        enqueue_template_job(
            db,
            gym_id=lead.gym_id,
            lead_id=lead.id,
            campaign_key="paid_congrats_v1",
            template_name="paid_congrats",
        )
    elif parsed["payment_status"] in ("not_paid", "unpaid", "lead"):
        enqueue_template_job(
            db,
            gym_id=lead.gym_id,
            lead_id=lead.id,
            campaign_key="offer_not_paid_v1",
            template_name="offer_not_paid",
        )

    return {"status": "ok"}


@router.post("/webhooks/twilio/inbound")
async def twilio_inbound(request: Request, db: Session = Depends(get_db)) -> Response:
    form = await request.form()
    data = {k: str(v) for k, v in form.multi_items()}
    db.add(WebhookEvent(source="twilio", payload=data))
    db.commit()

    from_number = str(data.get("From") or "")
    body_text = str(data.get("Body") or "")

    lead = db.scalars(select(Lead).where(Lead.phone_e164 == from_number)).first()
    pb = playbook_for_lead(lead)
    reply = draft_reply_stub(pb, body_text)

    log.info("twilio inbound playbook=%s from=%s", pb, from_number)
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>'
        f"<Response><Message>{escape(reply)}</Message></Response>"
    )
    return Response(content=xml, media_type="application/xml")


@router.post("/internal/jobs/outbound-template")
def internal_outbound_template(
    payload: InternalOutboundJob,
    db: Session = Depends(get_db),
) -> dict[str, str]:
    """Optional hook for n8n (add API key / mTLS in production)."""
    enqueue_template_job(
        db,
        gym_id=payload.gym_id,
        lead_id=payload.lead_id,
        campaign_key=payload.campaign_key,
        template_name=payload.template_name,
    )
    return {"status": "queued"}


def _update_job_status(
    db: Session, job_id: str, status: str, detail: str | None
) -> dict[str, str]:
    try:
        uid = UUID(job_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail="invalid uuid") from e
    job = db.get(OutboundJob, uid)
    if not job:
        raise HTTPException(status_code=404, detail="job not found")
    job.status = status
    if detail is not None:
        job.detail = detail
    db.commit()
    return {"status": status, "job_id": str(job.id)}


@router.post("/internal/jobs/{job_id}/sent")
def mark_job_sent(
    job_id: str,
    body: dict[str, Any] = Body(default_factory=dict),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    """n8n calls this after Meta confirms the template send."""
    return _update_job_status(db, job_id, "sent", body.get("detail"))


@router.post("/internal/jobs/{job_id}/failed")
def mark_job_failed(
    job_id: str,
    body: dict[str, Any] = Body(default_factory=dict),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    """n8n calls this when Meta rejects the template send."""
    return _update_job_status(db, job_id, "failed", body.get("detail"))
