from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Lead
from app.schemas import LeadCreate, LeadRead

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
