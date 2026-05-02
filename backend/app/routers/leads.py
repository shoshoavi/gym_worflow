from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Lead
from app.schemas import LeadByPhoneRead, LeadCreate, LeadRead
from app.services.gym_profile import GYM_PROFILE
from app.services.orchestrator import playbook_for_lead

router = APIRouter(prefix="/api/v1/leads", tags=["leads"])


@router.post("", response_model=LeadRead, status_code=201)
def create_lead(payload: LeadCreate, db: Session = Depends(get_db)) -> Lead:
    existing = db.scalars(
        select(Lead).where(Lead.gym_id == payload.gym_id, Lead.phone_e164 == payload.phone_e164)
    ).first()
    if existing:
        for k, v in payload.model_dump().items():
            setattr(existing, k, v)
        db.commit()
        db.refresh(existing)
        return existing

    lead = Lead(**payload.model_dump())
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


@router.get("/{lead_id}", response_model=LeadRead)
def get_lead(lead_id: str, db: Session = Depends(get_db)) -> Lead:
    from uuid import UUID

    try:
        uid = UUID(lead_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail="invalid uuid") from e
    lead = db.get(Lead, uid)
    if not lead:
        raise HTTPException(status_code=404, detail="not found")
    return lead


@router.get("/by-phone/{wa_id}", response_model=LeadByPhoneRead)
def get_lead_by_phone(wa_id: str, db: Session = Depends(get_db)) -> LeadByPhoneRead:
    """n8n calls this on every inbound WhatsApp message.

    Meta's `wa_id` arrives without the leading `+` (e.g. `49301234567`); our DB
    stores E.164 with `+`. Try both forms so the workflow doesn't have to care.
    """
    candidates = [wa_id, f"+{wa_id}"] if not wa_id.startswith("+") else [wa_id, wa_id.lstrip("+")]
    lead = db.scalars(select(Lead).where(Lead.phone_e164.in_(candidates))).first()

    playbook = playbook_for_lead(lead) if lead else "unknown"
    return LeadByPhoneRead(
        lead=LeadRead.model_validate(lead) if lead else None,
        playbook=playbook,
        gym=GYM_PROFILE,
    )
