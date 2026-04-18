> English translation of [docs/LIFECYCLE_AND_TRIGGERS.md](../LIFECYCLE_AND_TRIGGERS.md)

# Lifecycle: States and Triggers

Aligned with the FigJam **Lead and Payment States** board. The CRM remains the **source of truth**; our backend **mirrors** data for events and chat.

## States (logical)

| State | Meaning |
|-------|---------|
| `prospect` | Contact created, no clear conversion yet |
| `not_paid` | Lead with no active payment / no conversion |
| `offer_sent` | Outbound offer template has been triggered (idempotent per campaign) |
| `paid` | CRM reports active membership / payment |
| `member_care` | Paying + WhatsApp service playbook active |
| `churned` | CRM reports end of membership |

## Typical Transitions (Triggers)

- `prospect` → `not_paid`: Lead captured, no "won".
- `not_paid` → `offer_sent`: Automation by rules (e.g. 24h after lead, opt-in yes).
- `offer_sent` → `paid`: CRM webhook "subscription active" / deal won.
- `paid` → `member_care`: Confirmation + optional onboarding template.
- `*` → `churned`: CRM webhook cancellation / status field.

## Chat Routing (Inbound WhatsApp)

| Condition | Playbook |
|-----------|---------|
| CRM: actively paying member | **Member CS** (FAQ, opening hours, escalation) |
| Otherwise | **Sales** (offer, trial session, soft CTA) |

## MVP in Code

- Fields `payment_status` + `member_status` on `Lead` (see `backend/app/models.py`).
- Webhook `POST /webhooks/crm` updates by `external_id` / phone (simplified mapping).
- Orchestrator stub: `backend/app/services/orchestrator.py`.
