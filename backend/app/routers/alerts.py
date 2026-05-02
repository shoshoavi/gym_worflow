"""Staff alert hooks. MVP only logs to DB + stdout; real notifications (Slack/email) post-MVP."""

import logging
from typing import Literal
from uuid import UUID

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import WebhookEvent

log = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/alerts", tags=["alerts"])


class EscalationIn(BaseModel):
    wa_id: str = Field(..., max_length=32)
    reason: Literal["keyword", "ai_handoff", "fallback"] = "keyword"
    snippet: str = Field(..., max_length=2000)
    lead_id: UUID | None = None
    playbook: str | None = Field(default=None, max_length=16)


@router.post("/escalation", status_code=201)
def escalation(payload: EscalationIn, db: Session = Depends(get_db)) -> dict[str, str]:
    db.add(WebhookEvent(source="escalation", payload=payload.model_dump(mode="json")))
    db.commit()
    log.warning(
        "ESCALATION wa_id=%s reason=%s playbook=%s snippet=%r",
        payload.wa_id, payload.reason, payload.playbook, payload.snippet[:120],
    )
    return {"status": "logged"}
