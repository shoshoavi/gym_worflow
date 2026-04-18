# Gym WhatsApp AI — Architecture Diagrams

> Derived from the project documentation in `docs/en/`. Designed for stakeholder presentations.
> Last updated: April 2026

---

## 1. System Architecture Overview

```mermaid
flowchart TB
    subgraph ADS["🎯  LEAD GENERATION"]
        direction LR
        A1["Meta Ads\n(Facebook · Instagram)"]
        A2["Google Ads"]
        A3["TikTok Ads"]
    end

    subgraph LANDING["🌐  LANDING & CAPTURE"]
        L1["Landing Page\n(Next.js)"]
        L2["Lead Form\n+ GDPR Opt-in"]
        L3["Tracking Pixel"]
        L1 --> L2 --> L3
    end

    subgraph CRM_BLOCK["🗂️  STUDIO CRM — System of Record"]
        C1["Contact / Member\nRecord"]
        C2["Payment Status\npaid · not_paid · churned"]
        C3["Webhook Emitter\n(HMAC signed)"]
        C4["Google Sheets\n(reporting only)"]
        C1 --> C2
        C2 --> C3
        C2 -.->|sync| C4
    end

    subgraph AUTO["⚙️  AUTOMATION LAYER  (n8n or CRM-native)"]
        N1["n8n Flow\nCRM event → HTTP → template job"]
        N2["Job Queue\n(Redis · idempotent)"]
        N1 --> N2
    end

    subgraph BACKEND["🤖  CONVERSATION CORE  (FastAPI + Postgres)"]
        direction TB
        W1["Webhook Handler\n/webhooks/crm\n/webhooks/twilio"]
        W2["Lead Store\n(Postgres · raw events)"]
        O1["Orchestrator"]
        O2{"Member\nor Prospect?"}
        O3["Member CS Playbook\nFAQ · hours · escalation"]
        O4["Sales Playbook\noffer · trial · appointment"]
        AI["OpenAI GPT-4\n+ RAG / Knowledge Base"]
        GR["Guardrails\n• facts from KB only\n• no hallucination\n• template-only outbound"]
        ESC["🚨 Human Escalation\nbilling · legal · medical\ncomplaints · uncertainty"]

        W1 --> W2
        W1 --> O1
        O1 --> O2
        O2 -->|"paying member"| O3
        O2 -->|"prospect / not paid"| O4
        O3 --> AI
        O4 --> AI
        AI --> GR
        GR -->|"safe reply"| MSG_OUT
        GR -->|"sensitive topic"| ESC
    end

    subgraph WHATSAPP["📱  WHATSAPP (Twilio BSP)"]
        direction TB
        MSG_OUT["Outbound\n(approved templates only)"]
        MSG_IN["Inbound\n(customer writes back)"]
    end

    subgraph STAFF["👤  STUDIO STAFF"]
        S1["Human Agent\n(complaints · contracts · payments)"]
        S2["Ticket + Context\nfrom bot"]
    end

    subgraph OBSERVE["📊  OBSERVABILITY"]
        OB1["Structured Logs\ngym_id · event · delivery · handoff"]
        OB2["Metrics\nconversion · errors · escalation rate"]
    end

    %% ── Main flow ──
    ADS --> L1
    L2 -->|"POST /api/v1/leads\n(mirror + audit)"| C1
    C3 -->|"CRM event webhook"| W1
    C3 -->|"CRM event webhook"| N1
    N2 -->|"POST /internal/jobs/\noutbound-template"| W1
    MSG_IN -->|"POST /webhooks/twilio"| W1
    MSG_OUT -->|"WhatsApp message"| MSG_IN

    ESC --> S1
    S1 --> S2

    W1 -.-> OB1
    MSG_OUT -.-> OB1
    ESC -.-> OB1
    OB1 --> OB2

    %% ── Clean 3-color palette: slate nodes, red = alert, light subgraph borders ──
    style ADS fill:transparent,stroke:#555,color:#fff
    style LANDING fill:transparent,stroke:#555,color:#fff
    style CRM_BLOCK fill:transparent,stroke:#555,color:#fff
    style AUTO fill:transparent,stroke:#555,color:#fff
    style BACKEND fill:transparent,stroke:#555,color:#fff
    style WHATSAPP fill:transparent,stroke:#555,color:#fff
    style STAFF fill:transparent,stroke:#555,color:#fff
    style OBSERVE fill:transparent,stroke:#555,color:#fff

    style A1 fill:#37474f,stroke:#78909c,color:#fff
    style A2 fill:#37474f,stroke:#78909c,color:#fff
    style A3 fill:#37474f,stroke:#78909c,color:#fff
    style L1 fill:#37474f,stroke:#78909c,color:#fff
    style L2 fill:#37474f,stroke:#78909c,color:#fff
    style L3 fill:#37474f,stroke:#78909c,color:#fff
    style C1 fill:#37474f,stroke:#78909c,color:#fff
    style C2 fill:#37474f,stroke:#78909c,color:#fff
    style C3 fill:#37474f,stroke:#78909c,color:#fff
    style C4 fill:#37474f,stroke:#78909c,color:#fff
    style N1 fill:#37474f,stroke:#78909c,color:#fff
    style N2 fill:#37474f,stroke:#78909c,color:#fff
    style W1 fill:#37474f,stroke:#78909c,color:#fff
    style W2 fill:#37474f,stroke:#78909c,color:#fff
    style O1 fill:#37474f,stroke:#78909c,color:#fff
    style O2 fill:#37474f,stroke:#78909c,color:#fff
    style O3 fill:#37474f,stroke:#78909c,color:#fff
    style O4 fill:#37474f,stroke:#78909c,color:#fff
    style AI fill:#37474f,stroke:#78909c,color:#fff
    style GR fill:#37474f,stroke:#78909c,color:#fff
    style MSG_OUT fill:#37474f,stroke:#78909c,color:#fff
    style MSG_IN fill:#37474f,stroke:#78909c,color:#fff
    style S1 fill:#37474f,stroke:#78909c,color:#fff
    style S2 fill:#37474f,stroke:#78909c,color:#fff
    style OB1 fill:#37474f,stroke:#78909c,color:#fff
    style OB2 fill:#37474f,stroke:#78909c,color:#fff
    style ESC fill:#c62828,stroke:#ef9a9a,color:#fff
```

---

## 2. Lead Lifecycle — State Machine

```mermaid
stateDiagram-v2
    [*] --> prospect : Form submitted\n(landing page)

    prospect --> not_paid : Lead captured,\nno deal won

    not_paid --> offer_sent : Automation rule fires\n(24h delay, opt-in ✓)\nOutbound template sent

    offer_sent --> paid : CRM webhook →\n"subscription active"\nor deal won

    paid --> member_care : Confirmation +\nonboarding template

    member_care --> churned : CRM webhook →\ncancellation

    not_paid --> churned : CRM webhook →\ncancellation
    offer_sent --> churned : CRM webhook →\ncancellation
    paid --> churned : CRM webhook →\ncancellation

    note right of prospect
        CRM = source of truth
        Our backend mirrors for events + chat
    end note

    note right of member_care
        Chat routing:
        • Member → CS playbook
        • Prospect → Sales playbook
    end note

    note left of churned
        Opt-out / STOP
        respected at every state
    end note
```

---

## 3. Inbound WhatsApp — Conversation Sequence

```mermaid
sequenceDiagram
    participant U as 👤 Customer
    participant T as Twilio BSP
    participant W as Webhook Handler<br/>(FastAPI)
    participant DB as Postgres<br/>(Lead Store)
    participant O as Orchestrator
    participant AI as GPT-4 + RAG
    participant H as 🧑‍💼 Studio Staff

    U->>T: WhatsApp message
    T->>W: POST /webhooks/twilio<br/>(x-www-form-urlencoded)
    W->>DB: Store raw event
    W->>DB: Look up Lead by phone
    DB-->>W: Lead record<br/>(payment_status, member_status)

    W->>O: Route conversation
    alt Paying member
        O->>AI: Member CS playbook<br/>+ KB/RAG context
        AI-->>O: Draft reply
        O-->>O: Guardrail check
        alt Safe reply
            O->>T: Send reply (TwiML or REST)
            T->>U: WhatsApp response
        else Sensitive topic
            O->>H: Escalate → ticket + context
            H->>U: Human takes over
        end
    else Prospect / not paid
        O->>AI: Sales playbook<br/>+ KB/RAG context
        AI-->>O: Draft reply
        O-->>O: Guardrail check
        alt Safe reply
            O->>T: Send reply
            T->>U: WhatsApp response
        else Sensitive topic
            O->>H: Escalate → ticket + context
            H->>U: Human takes over
        end
    end
```

---

## 4. Outbound Template Flow (CRM → WhatsApp)

```mermaid
sequenceDiagram
    participant CRM as 🗂️ Studio CRM
    participant N as n8n / CRM Flow
    participant BE as FastAPI Backend
    participant Q as Job Queue (Redis)
    participant T as Twilio BSP
    participant U as 👤 Customer

    CRM->>BE: Webhook (HMAC signed)<br/>POST /webhooks/crm
    CRM->>N: Webhook (parallel)
    BE->>BE: Validate signature +<br/>store raw event
    BE->>BE: Update Lead record<br/>(payment_status)
    N->>BE: POST /internal/jobs/<br/>outbound-template<br/>(campaign_key + lead_id)
    BE->>BE: Idempotency check<br/>(campaign_key + lead_id)
    BE->>Q: Enqueue template job
    Q->>T: Send approved template<br/>(merge fields from CRM)
    T->>U: WhatsApp template message<br/>(e.g. congrats or offer)
```

---

## 5. Integration Points Summary

```mermaid
flowchart LR
    subgraph EXTERNAL["External Systems"]
        CRM["Studio CRM"]
        TWILIO["Twilio BSP"]
        N8N["n8n"]
        NEXT["Next.js\nLanding"]
    end

    subgraph API["FastAPI Endpoints"]
        E1["POST /api/v1/leads"]
        E2["GET  /api/v1/leads/{id}"]
        E3["POST /webhooks/crm"]
        E4["POST /webhooks/twilio/inbound"]
        E5["POST /internal/jobs/outbound-template"]
    end

    NEXT -->|"lead form"| E1
    NEXT -->|"read lead"| E2
    CRM -->|"HMAC webhook"| E3
    TWILIO -->|"inbound WhatsApp"| E4
    N8N -->|"campaign trigger"| E5

    style EXTERNAL fill:transparent,stroke:#555,color:#fff
    style API fill:transparent,stroke:#555,color:#fff
    style CRM fill:#37474f,stroke:#78909c,color:#fff
    style TWILIO fill:#37474f,stroke:#78909c,color:#fff
    style N8N fill:#37474f,stroke:#78909c,color:#fff
    style NEXT fill:#37474f,stroke:#78909c,color:#fff
    style E1 fill:#37474f,stroke:#78909c,color:#fff
    style E2 fill:#37474f,stroke:#78909c,color:#fff
    style E3 fill:#37474f,stroke:#78909c,color:#fff
    style E4 fill:#37474f,stroke:#78909c,color:#fff
    style E5 fill:#37474f,stroke:#78909c,color:#fff
```

---

## GDPR & Compliance Guardrails

| Rule | Enforced Where |
|------|---------------|
| WhatsApp **opt-in** required before first promotional contact | Lead form (consent checkbox + timestamp) |
| **Approved templates only** for outbound outside 24h session | Messaging service (no freeform outbound) |
| **STOP / opt-out** respected immediately | Webhook handler → CRM sync |
| Facts from **KB/RAG** or **CRM data** only — no hallucination | AI guardrails in orchestrator |
| **Human escalation** for billing, legal, medical, complaints | Orchestrator routing rules |
| **EU hosting** for all services | Infrastructure config |
| **Data retention** limits on chat logs and webhook payloads | Deletion policy per tenant |

---

*To import into Figma/FigJam: use the **Mermaid to FigJam** plugin or paste diagrams via the Figma MCP `generate_diagram` action.*
