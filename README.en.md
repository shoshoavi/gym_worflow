> English translation of [README.md](README.md)

# whatsapp_bot

MVP for the **Gym WhatsApp AI** architecture: **Next.js** landing page, **FastAPI** backend, **Postgres**, optional **Redis** (Compose), webhooks for **CRM** and **Twilio**, orchestrator stub (Member vs. Sales).

## Quick Start (local, WSL2 Ubuntu)

1. **Database**

   ```bash
   docker compose up -d postgres
   ```

2. **Backend**

   ```bash
   cd backend
   uv venv .venv
   source .venv/bin/activate
   uv pip install -r requirements.txt
   cp ../.env.example .env
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Frontend**

   ```bash
   cd web
   cp .env.example .env.local
   npm install
   npm run dev
   ```

4. Browser: http://localhost:3000 — submit the form, then verify the lead at http://127.0.0.1:8000/docs.

## Repo Structure

| Path | Contents |
|------|---------|
| [backend/](backend/) | FastAPI, SQLAlchemy, Webhooks |
| [web/](web/) | Next.js 14 App Router, lead form |
| [docs/](docs/) | Stakeholder brief, architecture docs, diagram guide |
| [scripts/download_diagrams.sh](scripts/download_diagrams.sh) | Download PNG/HTML from Stitch/FigJam to `docs/diagrams/` (WSL) |
| [docker-compose.yml](docker-compose.yml) | Postgres + Redis |

## Architecture Documents (Remaining Plan)

- [docs/WORKFLOW_AS_IS_TO_BE.md](docs/WORKFLOW_AS_IS_TO_BE.md) — Swimlanes As-Is / To-Be  
- [docs/LIFECYCLE_AND_TRIGGERS.md](docs/LIFECYCLE_AND_TRIGGERS.md) — States & Triggers  
- [docs/INTEGRATION_CONTRACTS.md](docs/INTEGRATION_CONTRACTS.md) — CRM / Twilio / n8n  
- [docs/NFR_AND_GUARDRAILS.md](docs/NFR_AND_GUARDRAILS.md) — GDPR, Templates, AI Guardrails  
- [docs/N8N_VS_CORE.md](docs/N8N_VS_CORE.md) — Hybrid Decision  

Stakeholder (non-technical): [docs/STAKEHOLDER_BRIEF.md](docs/STAKEHOLDER_BRIEF.md)

## Next Sensible Steps (after MVP)

- Real **CRM webhook signature** checking, **Twilio** REST for sending templates  
- **ARQ/Celery** + Redis for reliable outbound jobs  
- **OpenAI** + RAG in `orchestrator.py` instead of stub responses  
- Per-tenant **configuration** (template IDs, secrets) in DB  

## Diagrams & Stakeholder Package

- Accessible overview: [docs/STAKEHOLDER_BRIEF.md](docs/STAKEHOLDER_BRIEF.md)  
- Download Stitch/FigJam to `docs/diagrams/` (WSL): [docs/diagrams/README.md](docs/diagrams/README.md)  
