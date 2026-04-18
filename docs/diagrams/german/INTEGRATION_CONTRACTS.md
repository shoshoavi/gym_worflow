# Integrationsverträge (CRM · WhatsApp · Produkt)

## 1. Gym-CRM (extern, System of Record)

**Muss liefern (pro Studio):**

| Artefakt | Zweck |
|----------|--------|
| **API oder Webhooks** | Änderungen an Kontakt/Deal/Mitglied (mindestens: Zahlungs-/Mitgliedsstatus) |
| **Felder** | `phone` (E.164), `email`, `name`, `whatsapp_opt_in` (+ Zeitstempel), `payment_status`, `member_status`, optional `external_id` |
| **Authentifizierung** | API-Key, OAuth oder signierte Webhooks (HMAC) — pro Tenant konfigurierbar |

**Payload-Beispiel Webhook (generisch):**

```json
{
  "event": "contact.updated",
  "gym_id": "gym_123",
  "external_id": "crm_contact_456",
  "phone_e164": "+493012345678",
  "payment_status": "paid",
  "member_status": "active",
  "occurred_at": "2026-04-11T12:00:00Z"
}
```

**Unser Endpoint:** `POST /webhooks/crm` — validiert Signatur (wenn `CRM_WEBHOOK_SECRET` gesetzt), speichert Roh-Event, aktualisiert `Lead`.

## 2. WhatsApp (BSP, z. B. Twilio)

**Outbound**

- Nur **genehmigte Templates** außerhalb der 24h-Session (Meta-Regeln).
- Merge-Felder aus CRM/Lead.

**Inbound**

- `POST /webhooks/twilio` (x-www-form-urlencoded wie Twilio).
- Antwort: TwiML oder leer (Antwort asynchron über REST — später erweiterbar).

**Eigentum**

- **BSP-Konto** liegt beim Studio oder beim SaaS-Betreiber; **Telefonnummer** und **Template-IDs** pro `gym_id` in Env/Konfiguration.

## 3. Landing / Next.js

- `POST /api/v1/leads` (Backend) mit JSON-Body (siehe OpenAPI unter `/docs` wenn `DEBUG=true`).
- **CORS**: `CORS_ORIGINS` muss die Next-URL enthalten.

## 4. n8n (optional)

- Ruft **HTTP POST** ` /internal/jobs/outbound-template` mit JSON-Body auf:

```json
{
  "gym_id": "default",
  "lead_id": "uuid-vom-lead",
  "campaign_key": "manual_n8n_v1",
  "template_name": "offer_not_paid"
}
```

- **Im Produktivbetrieb absichern** (API-Key, IP-Allowlist, mTLS).

## Offene Punkte pro Pilotstudio

- [ ] Welches CRM + exakte Webhook-Payloads  
- [ ] Welche Template-SIDs bei Twilio  
- [ ] DSGVO: AV-Verträge, EU-Regionen  
