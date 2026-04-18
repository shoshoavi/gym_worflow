# Plan → Umsetzung (Stand)

| Plan-Todo | Status im Repo |
|-----------|----------------|
| Workflow Ist/Soll (Swimlanes) | [WORKFLOW_AS_IS_TO_BE.md](WORKFLOW_AS_IS_TO_BE.md) |
| Architektur-Diagramme (Stitch/FigJam) | Bereits erzeugt; Download [diagrams/README.md](diagrams/README.md) |
| Lifecycle & Trigger | [LIFECYCLE_AND_TRIGGERS.md](LIFECYCLE_AND_TRIGGERS.md) + Logik in `backend/app/services/orchestrator.py` |
| Integrationsverträge | [INTEGRATION_CONTRACTS.md](INTEGRATION_CONTRACTS.md) + Endpoints in `backend/app/routers/` |
| NFR / Guardrails | [NFR_AND_GUARDRAILS.md](NFR_AND_GUARDRAILS.md) |
| n8n vs. coded core | [N8N_VS_CORE.md](N8N_VS_CORE.md) + `POST /internal/jobs/outbound-template` |
| Produkt-MVP (Code) | [backend/](../backend/), [web/](../web/), [docker-compose.yml](../docker-compose.yml) |

Was **noch nicht** im MVP steckt: echte Twilio-Sends, CRM-HMAC-Verify, Worker-Queue, OpenAI/RAG, Multi-Tenant-Admin-UI.
