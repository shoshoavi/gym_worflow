> English translation of [docs/NFR_AND_GUARDRAILS.md](../NFR_AND_GUARDRAILS.md)

# NFRs and Guardrails (GDPR / WhatsApp / AI)

Short list for architecture and reviews. Always align detailed legal aspects with a lawyer / data protection officer.

## Data Protection & Region

- Processing in the **EU** where possible (hosting, OpenAI/Azure region, CRM, BSP).
- Document **purpose limitation** and **consent** for WhatsApp (form + proof).
- **Retention**: limit chat logs and webhook payloads; define a deletion policy per tenant.

## WhatsApp / Meta

- **Opt-in** required before any promotional first contact.
- **Templates** for outbound messages outside the customer care session.
- Respect **STOP** / opt-out and mirror it in the CRM.

## Reliability

- **Idempotency** for outbound (e.g. `campaign_key` + `lead_id` unique).
- **Retries** with backoff for the BSP API.
- **Webhook replay protection** (event IDs, timestamps).

## AI / Hallucinations

- Facts from **KB/RAG** or **CRM tools**, not freely invented.
- **Escalation** for billing, legal, medical, or repeated uncertainty.
- Outbound promotional copy: **templates**, not generative free text without approval.

## Observability

- Structured logs: `gym_id`, `event_type`, `template_id`, `delivery_status`, `handoff_reason`.
- Metrics later: conversion, template error rate, escalation rate.

## MVP Status in Repo

- Webhooks store raw events (`WebhookEvent`).
- No production LLM call by default — placeholder in `orchestrator.py`.
- Secrets only via **environment variables** (see `.env.example`).
