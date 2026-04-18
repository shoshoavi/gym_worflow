> English translation of [docs/N8N_VS_CORE.md](../N8N_VS_CORE.md)

# Decision: n8n vs. Coded Core (Hybrid)

## Recommendation

| Task | Location |
|------|---------|
| Linear automation: "CRM changed → HTTP POST → template job" | **n8n** or **native CRM automation** |
| Inbound WhatsApp, session state, RAG, tool-calling, security rules | **FastAPI services** (`backend/app/`) |
| Idempotency, audit DB, complex rules, tests | **Code** (Postgres + app logic) |

## Why Not Everything in n8n?

- State across many messages, streaming, prompt guardrails, and retrieval are **easier to test and review** in code.
- Multi-tenant secrets and signatures scale better in a single service.

## Why Not Everything in Code?

- Marketing / Ops want to change **campaign flows** without a deploy — lean n8n flows are easy to adjust.

## MVP

- Backend accepts CRM webhooks and stores data; outbound sending is a **stub** (`messaging.py`).
- n8n **optionally** connected later to `POST /webhooks/crm` or a dedicated job route.
