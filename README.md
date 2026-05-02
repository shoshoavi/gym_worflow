# whatsapp_bot

MVP für die **Gym WhatsApp AI**-Architektur: **Next.js**-Landing, **FastAPI**-Backend, **Postgres**, optional **Redis** (Compose), Webhooks für **CRM** und **Twilio**, Orchestrator-Stub (Member vs. Vertrieb).

## Schnellstart (lokal, WSL2 Ubuntu)

1. **Datenbank**

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

4. Browser: http://localhost:3000 — Formular absenden, dann Lead unter http://127.0.0.1:8000/docs prüfen.

## Repo-Struktur

| Pfad | Inhalt |
|------|--------|
| [backend/](backend/) | FastAPI, SQLAlchemy, Webhooks |
| [web/](web/) | Next.js 14 App Router, Lead-Formular |
| [docs/](docs/) | Stakeholder-Brief, Architektur-Dokumente, Diagramm-Anleitung |
| [scripts/download_diagrams.sh](scripts/download_diagrams.sh) | PNG/HTML von Stitch/FigJam nach `docs/diagrams/` (WSL) |
| [docker-compose.yml](docker-compose.yml) | Postgres + Redis |

## Architektur-Dokumente (Rest des Plans)

- [docs/WORKFLOW_AS_IS_TO_BE.md](docs/WORKFLOW_AS_IS_TO_BE.md) — Swimlanes Ist/Soll  
- [docs/LIFECYCLE_AND_TRIGGERS.md](docs/LIFECYCLE_AND_TRIGGERS.md) — Zustände & Trigger  
- [docs/INTEGRATION_CONTRACTS.md](docs/INTEGRATION_CONTRACTS.md) — CRM / Twilio / n8n  
- [docs/NFR_AND_GUARDRAILS.md](docs/NFR_AND_GUARDRAILS.md) — DSGVO, Templates, KI-Guardrails  
- [docs/N8N_VS_CORE.md](docs/N8N_VS_CORE.md) — Hybrid-Entscheidung  

Stakeholder (nicht technisch): [docs/STAKEHOLDER_BRIEF.md](docs/STAKEHOLDER_BRIEF.md)

## Nächste sinnvolle Schritte (nach MVP)

- Echtes **CRM-Webhook-Signatur**-Checking, **Twilio**-REST zum Senden von Templates  
- **ARQ/Celery** + Redis für zuverlässige Outbound-Jobs  
- **OpenAI** + RAG in `orchestrator.py` statt Stub-Antworten  
- Pro-Tenant **Konfiguration** (Template-IDs, Geheimnisse) in DB  

## Diagramme & Stakeholder-Paket

- Verständliche Übersicht: [docs/STAKEHOLDER_BRIEF.md](docs/STAKEHOLDER_BRIEF.md)  
- Stitch/FigJam nach `docs/diagrams/` laden (WSL): [docs/diagrams/README.md](docs/diagrams/README.md)  
