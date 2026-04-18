# Lifecycle: Zustände und Auslöser

Abgestimmt mit dem FigJam **Lead and Payment States**. CRM bleibt **Source of Truth**; unser Backend **spiegelt** für Events und Chat.

## Zustände (logisch)

| State | Bedeutung |
|-------|-----------|
| `prospect` | Kontakt angelegt, noch kein klarer Abschluss |
| `not_paid` | Lead ohne aktive Zahlung / kein Abschluss |
| `offer_sent` | Outbound-Angebots-Template wurde ausgelöst (idempotent pro Kampagne) |
| `paid` | CRM meldet aktive Mitgliedschaft / Zahlung |
| `member_care` | Zahlend + WhatsApp-Service-Playbook aktiv |
| `churned` | CRM meldet Ende der Mitgliedschaft |

## Typische Übergänge (Trigger)

- `prospect` → `not_paid`: Lead erfasst, kein „won“.
- `not_paid` → `offer_sent`: Automation nach Regeln (z. B. 24h nach Lead, Opt-in ja).
- `offer_sent` → `paid`: CRM-Webhook „subscription active“ / Deal gewonnen.
- `paid` → `member_care`: Bestätigung + ggf. Onboarding-Template.
- `*` → `churned`: CRM-Webhook Kündigung / Statusfeld.

## Chat-Routing (Inbound WhatsApp)

| Bedingung | Playbook |
|-----------|----------|
| CRM: aktiv zahlendes Mitglied | **Member CS** (FAQ, Öffnungszeiten, Eskalation) |
| Sonst | **Sales** (Angebot, Probetermin, Soft-CTA) |

## MVP im Code

- Feld `payment_status` + `member_status` auf `Lead` (siehe `backend/app/models.py`).
- Webhook `POST /webhooks/crm` aktualisiert nach `external_id` / Telefon (vereinfachtes Mapping).
- Orchestrator-Stub: `backend/app/services/orchestrator.py`.
