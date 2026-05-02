"""Outbound WhatsApp templates — queue + dispatch to n8n for delivery via Meta Cloud API."""

import logging
from uuid import UUID

import httpx
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import settings
from app.models import Lead, OutboundJob

log = logging.getLogger(__name__)


def enqueue_template_job(
    db: Session,
    *,
    gym_id: str,
    lead_id: UUID | None,
    campaign_key: str,
    template_name: str,
) -> OutboundJob:
    """Idempotency: same campaign_key + lead_id + gym_id when already queued/sent → return existing.

    After insert, POST to n8n outbound webhook so n8n can dispatch via Meta. The DB row stays
    `queued` until n8n calls `/internal/jobs/{id}/sent` back.
    """
    stmt = select(OutboundJob).where(
        OutboundJob.gym_id == gym_id,
        OutboundJob.lead_id == lead_id,
        OutboundJob.campaign_key == campaign_key,
        OutboundJob.status.in_(["queued", "sent"]),
    )
    existing = db.scalars(stmt).first()
    if existing:
        return existing

    job = OutboundJob(
        gym_id=gym_id,
        lead_id=lead_id,
        campaign_key=campaign_key,
        template_name=template_name,
        status="queued",
        detail=None,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    log.info("outbound job %s template=%s lead=%s", job.id, template_name, lead_id)

    _dispatch_to_n8n(db, job)
    return job


def _dispatch_to_n8n(db: Session, job: OutboundJob) -> None:
    """Fire-and-forget POST to n8n. Marks job `failed` on transport error so we can retry."""
    if not settings.n8n_outbound_webhook_url:
        job.detail = "n8n webhook unset (dev mode); job left queued"
        db.commit()
        return

    lead = db.get(Lead, job.lead_id) if job.lead_id else None
    payload = {
        "job_id": str(job.id),
        "gym_id": job.gym_id,
        "lead_id": str(job.lead_id) if job.lead_id else None,
        "wa_id": lead.phone_e164.lstrip("+") if lead else None,
        "lead_name": lead.name if lead else None,
        "campaign_key": job.campaign_key,
        "template_name": job.template_name,
    }
    try:
        with httpx.Client(timeout=5.0) as client:
            r = client.post(settings.n8n_outbound_webhook_url, json=payload)
            r.raise_for_status()
        job.detail = "dispatched to n8n"
    except httpx.HTTPError as exc:
        log.exception("n8n dispatch failed for job %s", job.id)
        job.status = "failed"
        job.detail = f"n8n dispatch error: {exc.__class__.__name__}: {exc}"
    db.commit()
