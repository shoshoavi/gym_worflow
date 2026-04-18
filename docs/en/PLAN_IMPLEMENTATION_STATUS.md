> English translation of [docs/PLAN_IMPLEMENTATION_STATUS.md](../PLAN_IMPLEMENTATION_STATUS.md)

# Plan → Implementation (Status)

| Plan Item | Status in Repo |
|-----------|---------------|
| Workflow As-Is / To-Be (Swimlanes) | [WORKFLOW_AS_IS_TO_BE.md](WORKFLOW_AS_IS_TO_BE.md) |
| Architecture diagrams (Stitch/FigJam) | Already generated; download guide [diagrams/README.md](diagrams/README.md) |
| Lifecycle & Triggers | [LIFECYCLE_AND_TRIGGERS.md](LIFECYCLE_AND_TRIGGERS.md) + logic in `backend/app/services/orchestrator.py` |
| Integration Contracts | [INTEGRATION_CONTRACTS.md](INTEGRATION_CONTRACTS.md) + endpoints in `backend/app/routers/` |
| NFR / Guardrails | [NFR_AND_GUARDRAILS.md](NFR_AND_GUARDRAILS.md) |
| n8n vs. coded core | [N8N_VS_CORE.md](N8N_VS_CORE.md) + `POST /internal/jobs/outbound-template` |
| Product MVP (code) | [backend/](../backend/), [web/](../web/), [docker-compose.yml](../docker-compose.yml) |

What is **not yet** in the MVP: real Twilio sends, CRM HMAC verification, worker queue, OpenAI/RAG, multi-tenant admin UI.
