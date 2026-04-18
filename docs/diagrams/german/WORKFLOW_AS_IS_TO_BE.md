# Workflow: Ist-Zustand vs. Ziel (Swimlanes)

Kurzüberblick für Workshops mit Studios. Technische Umsetzung im Repo: `backend/` + `web/`.

## Swimlane „Marketing & Traffic“

| Ist (typisch) | Ziel |
|---------------|------|
| Ads laufen, Landing existiert, Leads gehen per Mail/Excel rum | Gleiche Kanäle; **eine** Landing mit messbarem Formular und Tracking |

## Swimlane „Interessent / Formular“

| Ist | Ziel |
|-----|------|
| Formular sendet nur E-Mail oder internes Tool | Formular schreibt in **CRM des Studios** + optional in unsere API (`POST /api/v1/leads`) als **Spiegel/Audit** |

## Swimlane „CRM (Studio-System)“

| Ist | Ziel |
|-----|------|
| Manuelle Pflege von „bezahlt / nicht“ | Felder/Stages **bezahlt / nicht bezahlt / Mitglied** pflegen; **Webhooks** oder Polling lösen Automation aus |

## Swimlane „Google Sheets“

| Ist | Ziel |
|-----|------|
| CRM exportiert/verknüpft Sheet für Ops | **Kein** primärer Trigger für WhatsApp; nur **Reporting** für Menschen |

## Swimlane „Automation (n8n / CRM-Flows)“

| Ist | Ziel |
|-----|------|
| Ad-hoc | Dünne Ketten: CRM-Ereignis → HTTP → unser Backend → **WhatsApp-Template** (idempotent) |

## Swimlane „WhatsApp (BSP)“

| Ist | Ziel |
|-----|------|
| Manuelle Chats | **Templates** für Outbound außerhalb 24h-Session; **Inbound** → unser **Orchestrator** |

## Swimlane „Conversation Core (Produkt)“

| Ist | Ziel |
|-----|------|
| — | Identität aus CRM; **Playbook** Mitglied vs. Vertrieb; optional LLM+RAG; **Eskalation** an Personal |

## Swimlane „Studio / Personal“

| Ist | Ziel |
|-----|------|
| Reagiert auf alles manuell | Übernimmt **Beschwerden, Vertrag, Zahlung**; Bot liefert **Tickets** + Kontext |

Siehe auch: [LIFECYCLE_AND_TRIGGERS.md](LIFECYCLE_AND_TRIGGERS.md), [N8N_VS_CORE.md](N8N_VS_CORE.md).
