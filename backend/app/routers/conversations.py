"""Conversation turn logging — n8n POSTs each inbound and outbound message here."""

import logging
from typing import Literal
from uuid import UUID

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import ConversationMessage

log = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/conversations", tags=["conversations"])


class ConversationTurnIn(BaseModel):
    wa_id: str = Field(..., max_length=32)
    direction: Literal["in", "out"]
    text: str
    lead_id: UUID | None = None
    playbook: str | None = Field(default=None, max_length=16)
    meta_message_id: str | None = Field(default=None, max_length=128)
    raw: dict = Field(default_factory=dict)


class ConversationTurnOut(BaseModel):
    id: UUID
    deduplicated: bool


@router.post("", response_model=ConversationTurnOut, status_code=201)
def log_turn(payload: ConversationTurnIn, db: Session = Depends(get_db)) -> ConversationTurnOut:
    """Idempotent on `meta_message_id` (Meta retries inbound webhooks aggressively)."""
    if payload.meta_message_id:
        existing = db.scalars(
            select(ConversationMessage).where(
                ConversationMessage.meta_message_id == payload.meta_message_id
            )
        ).first()
        if existing:
            return ConversationTurnOut(id=existing.id, deduplicated=True)

    msg = ConversationMessage(
        wa_id=payload.wa_id,
        direction=payload.direction,
        text=payload.text,
        lead_id=payload.lead_id,
        playbook=payload.playbook,
        meta_message_id=payload.meta_message_id,
        raw=payload.raw,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return ConversationTurnOut(id=msg.id, deduplicated=False)
