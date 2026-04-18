> English translation of [docs/WORKFLOW_AS_IS_TO_BE.md](../WORKFLOW_AS_IS_TO_BE.md)

# Workflow: As-Is vs. To-Be (Swimlanes)

Quick overview for workshops with studios. Technical implementation in the repo: `backend/` + `web/`.

## Swimlane "Marketing & Traffic"

| As-Is (typical) | To-Be |
|-----------------|-------|
| Ads running, landing page exists, leads circulate via email/Excel | Same channels; **one** landing page with a measurable form and tracking |

## Swimlane "Prospect / Form"

| As-Is | To-Be |
|-------|-------|
| Form only sends an email or goes to an internal tool | Form writes to the **studio's CRM** + optionally to our API (`POST /api/v1/leads`) as a **mirror / audit** |

## Swimlane "CRM (Studio System)"

| As-Is | To-Be |
|-------|-------|
| Manual maintenance of "paid / not paid" | Keep **paid / not paid / member** fields; **webhooks** or polling trigger automation |

## Swimlane "Google Sheets"

| As-Is | To-Be |
|-------|-------|
| CRM exports/links sheet for ops | **Not** a primary trigger for WhatsApp; **reporting only** for humans |

## Swimlane "Automation (n8n / CRM Flows)"

| As-Is | To-Be |
|-------|-------|
| Ad-hoc | Lean chains: CRM event → HTTP → our backend → **WhatsApp template** (idempotent) |

## Swimlane "WhatsApp (BSP)"

| As-Is | To-Be |
|-------|-------|
| Manual chats | **Templates** for outbound outside 24h session; **inbound** → our **orchestrator** |

## Swimlane "Conversation Core (Product)"

| As-Is | To-Be |
|-------|-------|
| — | Identity from CRM; **playbook** member vs. sales; optional LLM+RAG; **escalation** to staff |

## Swimlane "Studio / Staff"

| As-Is | To-Be |
|-------|-------|
| Responds to everything manually | Handles **complaints, contracts, payments**; bot delivers **tickets** + context |

See also: [LIFECYCLE_AND_TRIGGERS.md](LIFECYCLE_AND_TRIGGERS.md), [N8N_VS_CORE.md](N8N_VS_CORE.md).
