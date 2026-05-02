> English translation of [README.md](README.md)

# Backend (FastAPI)

## Setup (WSL / Linux)

```bash
cd backend
uv venv .venv
source .venv/bin/activate
uv pip install -r requirements.txt
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

- OpenAPI: http://127.0.0.1:8000/docs (when `DEBUG=true`)
- Health: http://127.0.0.1:8000/health

## Endpoints (MVP)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/leads` | Lead from landing form |
| GET | `/api/v1/leads/{id}` | Read lead |
| POST | `/webhooks/crm` | CRM event (JSON) |
| POST | `/webhooks/twilio/inbound` | Twilio WhatsApp (form) → TwiML response |
| POST | `/internal/jobs/outbound-template` | n8n / manual (JSON) |
