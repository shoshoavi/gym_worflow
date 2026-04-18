# Gym WhatsApp AI — Simplified Overview

> For studio owners, sales, marketing and partners. Simple language, no tech jargon.
> Last updated: April 2026

---

## How It All Works — The 3 Flows

```mermaid
flowchart TD
    subgraph VIS["VISITOR JOURNEY"]
        direction LR
        AD["Sees ad or searches online"]
        SITE["Visits our website"]
        FORM["Fills in contact form\n+ gives WhatsApp consent"]
    end

    subgraph SYS["OUR SYSTEM"]
        direction TB
        CRM["Contact saved in CRM\n(single source of truth)"]
        SHEETS["Auto-synced to\nGoogle Sheets report"]
        PAID{"Has this person\nalready paid?"}
        BOT["AI Assistant\nreads member history"]
        INTENT{"Topic type?"}
        AUTO["Bot answers automatically\nhours · FAQ · booking"]
        ESC["Passed to your staff\nwith full context"]
    end

    subgraph WA["WHATSAPP CONVERSATIONS"]
        direction TB
        OFFER["Flow 1 — Deal offer\nSpecial price just for you"]
        CONGRATS["Flow 2 — Welcome message\nSubscription details + next steps"]
        SUPPORT["Flow 3 — Ongoing support\nbooking · questions · help"]
    end

    subgraph TEAM["YOUR TEAM"]
        STAFF["Staff takes over\ncomplaints · contracts · billing"]
    end

    AD --> SITE --> FORM
    FORM -->|"contact stored"| CRM
    CRM -.->|"auto-sync"| SHEETS
    CRM -->|"status checked"| PAID

    PAID -->|"Not paid yet"| OFFER
    PAID -->|"Paid member"| CONGRATS

    OFFER -->|"member later pays"| CONGRATS
    CONGRATS -->|"member writes in"| SUPPORT
    SUPPORT --> BOT
    BOT --> INTENT
    INTENT -->|"routine question"| AUTO
    INTENT -->|"sensitive topic"| ESC
    ESC --> STAFF

    style VIS fill:transparent,stroke:#546e7a,color:#ccc
    style SYS fill:transparent,stroke:#455a64,color:#ccc
    style WA fill:transparent,stroke:#2e7d32,color:#ccc
    style TEAM fill:transparent,stroke:#b71c1c,color:#ccc

    style AD fill:#37474f,stroke:#78909c,color:#fff
    style SITE fill:#37474f,stroke:#78909c,color:#fff
    style FORM fill:#37474f,stroke:#78909c,color:#fff
    style CRM fill:#37474f,stroke:#78909c,color:#fff
    style SHEETS fill:#37474f,stroke:#78909c,color:#fff
    style PAID fill:#37474f,stroke:#78909c,color:#fff
    style BOT fill:#37474f,stroke:#78909c,color:#fff
    style INTENT fill:#37474f,stroke:#78909c,color:#fff
    style AUTO fill:#1b5e20,stroke:#66bb6a,color:#fff
    style ESC fill:#bf360c,stroke:#ff8a65,color:#fff
    style OFFER fill:#1b5e20,stroke:#66bb6a,color:#fff
    style CONGRATS fill:#1b5e20,stroke:#66bb6a,color:#fff
    style SUPPORT fill:#1b5e20,stroke:#66bb6a,color:#fff
    style STAFF fill:#c62828,stroke:#ef9a9a,color:#fff
```

---

## Tech Stack at a Glance

| Component | Technology | What it does |
|-----------|-----------|--------------|
| Website | **Next.js** (React) | Landing page with lead form + tracking |
| Backend | **FastAPI** (Python) | Receives webhooks, routes conversations, applies rules |
| Database | **PostgreSQL** | Stores leads, events, chat history |
| Job Queue | **Redis** | Reliable message delivery with retries |
| Automation | **n8n** (optional) | Simple CRM-event → template chains, editable without code |
| AI | **OpenAI GPT-4** + RAG | Answers questions using your knowledge base, not guesses |
| WhatsApp | **Twilio** (BSP) | Sends and receives WhatsApp messages (approved templates) |
| Hosting | **Docker Compose** | Runs everything together (Postgres + Redis + Backend) |
| Reporting | **Google Sheets** | Auto-synced from CRM for your team's overview |

---

## Key Promises

| What | How |
|------|-----|
| **Your CRM stays in charge** | We never replace it — we listen to it |
| **No spam** | Only people who agreed get WhatsApp messages |
| **No made-up answers** | The AI uses your texts and CRM data, not guesses |
| **Humans stay in the loop** | Complaints, billing, contracts → always your staff |
| **Google Sheets stays** | Updated by the CRM for your internal reporting |
