> English translation of [docs/INTEGRATION_CONTRACTS.md](../INTEGRATION_CONTRACTS.md)

# Integration Contracts (CRM · WhatsApp · Product)

## 1. Gym CRM (external, System of Record)

**Must provide (per studio):**

| Artifact | Purpose |
|----------|---------|
| **API or Webhooks** | Changes to contact / deal / membership (minimum: payment / membership status) |
| **Fields** | `phone` (E.164), `email`, `name`, `whatsapp_opt_in` (+ timestamp), `payment_status`, `member_status`, optional `external_id` |
| **Authentication** | API key, OAuth, or signed webhooks (HMAC) — configurable per tenant |

**Example webhook payload (generic):**

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

**Our endpoint:** `POST /webhooks/crm` — validates signature (when `CRM_WEBHOOK_SECRET` is set), stores the raw event, updates `Lead`.

## 2. WhatsApp (BSP, e.g. Twilio)

**Outbound**

- Only **approved templates** outside the 24-hour session (Meta rules).
- Merge fields from CRM / Lead.

**Inbound**

- `POST /webhooks/twilio` (x-www-form-urlencoded as per Twilio).
- Response: TwiML or empty (async reply via REST — extendable later).

**Ownership**

- **BSP account** belongs to the studio or the SaaS operator; **phone number** and **template IDs** per `gym_id` in env / configuration.

## 3. Landing / Next.js

- `POST /api/v1/leads` (backend) with JSON body (see OpenAPI at `/docs` when `DEBUG=true`).
- **CORS**: `CORS_ORIGINS` must include the Next.js URL.

## 4. n8n (optional)

- Calls **HTTP POST** `/internal/jobs/outbound-template` with JSON body:

```json
{
  "gym_id": "default",
  "lead_id": "uuid-of-lead",
  "campaign_key": "manual_n8n_v1",
  "template_name": "offer_not_paid"
}
```

- **Secure in production** (API key, IP allowlist, mTLS).

## Open Items per Pilot Studio

- [ ] Which CRM + exact webhook payloads  
- [ ] Which template SIDs in Twilio  
- [ ] GDPR: data-processing agreements, EU regions  
