from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class LeadCreate(BaseModel):
    gym_id: str = Field(default="default", max_length=64)
    phone_e164: str = Field(..., examples=["+493012345678"])
    email: str | None = Field(default=None, max_length=255)
    name: str | None = Field(default=None, max_length=255)
    whatsapp_opt_in: bool = False


class LeadRead(BaseModel):
    model_config = {"from_attributes": True}

    id: UUID
    gym_id: str
    phone_e164: str
    email: str | None
    name: str | None
    whatsapp_opt_in: bool
    payment_status: str
    member_status: str
    external_id: str | None
    created_at: datetime


class HealthResponse(BaseModel):
    status: str = "ok"


class InternalOutboundJob(BaseModel):
    gym_id: str = Field(..., max_length=64)
    lead_id: UUID
    campaign_key: str = Field(..., max_length=64)
    template_name: str = Field(..., max_length=128)
