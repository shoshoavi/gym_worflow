# Backend (FastAPI)

## Setup (WSL / Linux)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env   # or symlink; edit DATABASE_URL if needed
```

Start Postgres (from repo root):

```bash
docker compose up -d postgres
```

Run API:

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- OpenAPI: http://127.0.0.1:8000/docs (wenn `DEBUG=true`)
- Health: http://127.0.0.1:8000/health

## Endpoints (MVP)

| Method | Path | Beschreibung |
|--------|------|----------------|
| POST | `/api/v1/leads` | Lead aus Landing-Formular |
| GET | `/api/v1/leads/{id}` | Lead lesen |
| POST | `/webhooks/crm` | CRM-Event (JSON) |
| POST | `/webhooks/twilio/inbound` | Twilio WhatsApp (form) → TwiML-Antwort |
| POST | `/internal/jobs/outbound-template` | n8n / manuell (JSON) |
