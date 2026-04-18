# NFRs und Guardrails (DE / WhatsApp / KI)

Kurzliste für Architektur und Reviews. Detailrechtliches immer mit Anwalt / DSB abstimmen.

## Datenschutz & Region

- Verarbeitung **EU** wo möglich (Hosting, OpenAI/Azure-Region, CRM, BSP).
- **Zweckbindung** und **Einwilligung** für WhatsApp dokumentieren (Formular + Nachweis).
- **Aufbewahrung** Chat-Logs und Webhook-Payloads begrenzen; Löschkonzept pro Tenant.

## WhatsApp / Meta

- **Opt-in** vor werblichem Erstkontakt.
- **Templates** für Outbound außerhalb der Customer-Care-Session.
- **STOP** / Opt-out respektieren und im CRM spiegeln.

## Zuverlässigkeit

- **Idempotenz** bei Outbound (z. B. `campaign_key` + `lead_id` eindeutig).
- **Retries** mit Backoff für BSP-API.
- **Webhook-Replay-Schutz** (Event-IDs, Timestamps).

## KI / Halluzinationen

- Fakten aus **KB/RAG** oder **CRM-Tools**, nicht frei erfinden.
- **Eskalation** bei Billing, Legal, Medical, wiederholter Unsicherheit.
- Outbound-Werbetext: **Templates**, nicht generatives Freitext ohne Freigabe.

## Observability

- Strukturierte Logs: `gym_id`, `event_type`, `template_id`, `delivery_status`, `handoff_reason`.
- Metriken später: Conversion, Template-Fehlerquote, Eskalationsrate.

## MVP-Stand im Repo

- Webhooks speichern Roh-Events (`WebhookEvent`).
- Kein produktiver LLM-Call im Standard — Platzhalter in `orchestrator.py`.
- Secrets nur über **Umgebungsvariablen** (siehe `.env.example`).
