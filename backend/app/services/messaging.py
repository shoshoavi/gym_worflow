"""Outbound WhatsApp — Twilio stub (log + record job only)."""

import logging
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import OutboundJob

log = logging.getLogger(__name__)


def enqueue_template_job(
    db: Session,
    *,
    gym_id: str,
    lead_id: UUID | None,
    campaign_key: str,
    template_name: str,
) -> OutboundJob:
    """Idempotency: same campaign_key + lead_id + gym_id when already queued/sent → return existing."""
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
        detail="MVP: no Twilio send yet; configure TWILIO_* env",
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    log.info("outbound job %s template=%s lead=%s", job.id, template_name, lead_id)
    return job
