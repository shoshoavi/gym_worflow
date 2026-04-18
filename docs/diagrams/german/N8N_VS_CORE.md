# Entscheidung: n8n vs. coded core (Hybrid)

## Empfehlung

| Aufgabe | Ort |
|---------|-----|
| Lineare Automation: „CRM hat sich geändert → HTTP POST → Template job“ | **n8n** oder **native CRM-Automation** |
| Inbound WhatsApp, Session-State, RAG, Tool-Calling, Sicherheitsregeln | **FastAPI-Services** (`backend/app/`) |
| Idempotenz, Audit-DB, komplexe Regeln, Tests | **Code** (Postgres + App-Logik) |

## Warum nicht alles in n8n?

- Zustand über viele Nachrichten hinweg, Streaming, Prompt-Guardrails und Retrieval sind in Code **einfacher test- und reviewbar**.
- Multi-Tenant-Secrets und Signaturen skalieren in einem Dienst besser.

## Warum nicht alles im Code?

- Marketing/Ops will **Kampagnenpfade** ohne Deploy ändern — dünne n8n-Flows sind schnell anpassbar.

## MVP

- Backend akzeptiert CRM-Webhooks und legt Daten ab; Outbound-Versand ist **Stub** (`messaging.py`).
- n8n **optional** später an `POST /webhooks/crm` oder dedizierte Job-Route anbinden.
