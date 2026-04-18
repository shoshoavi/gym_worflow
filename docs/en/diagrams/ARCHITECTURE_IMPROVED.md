# Gym WhatsApp AI — Full Technical Architecture

> For developers, CTOs, and integration partners. Full tech stack, all data flows.
> Last updated: April 2026

---

## Full System Architecture — Technical Swimlane View

```mermaid
flowchart TB
    %% ══════════════════════════════════════════════════
    %% SWIMLANE 1 — LEAD CAPTURE
    %% ══════════════════════════════════════════════════
    subgraph LC["LEAD CAPTURE  |  Next.js · CRM · Google Sheets"]
        direction LR
        ADS["Meta / Google / TikTok Ads"]
        NXT["Next.js 14\nLanding Page + Lead Form"]
        GDPR["GDPR Opt-in\nconsent + timestamp"]
        CRMR["Studio CRM\nContact + Payment Status"]
        GSH["Google Sheets\nreporting sync"]
        ADS --> NXT --> GDPR --> CRMR
        CRMR -.->|"auto-sync"| GSH
    end

    %% ══════════════════════════════════════════════════
    %% SWIMLANE 2 — BACKEND CORE
    %% ══════════════════════════════════════════════════
    subgraph BC["BACKEND CORE  |  FastAPI · PostgreSQL + pgvector · Redis"]
        direction LR
        WH["Webhook Handler\nPOST /webhooks/crm\nPOST /webhooks/bird"]
        PG["PostgreSQL 16 + pgvector\nleads · events · chat logs\nRAG embeddings"]
        RD["Redis 7\nJob Queue · idempotent delivery"]
        WH --> PG
        WH --> RD
    end

    %% ══════════════════════════════════════════════════
    %% SWIMLANE 3 — AI PIPELINE
    %% ══════════════════════════════════════════════════
    subgraph AI["AI PIPELINE  |  OpenAI GPT-4 · pgvector RAG"]
        direction LR
        ORCH["Chat Orchestrator\nroutes by member status"]
        IC["Intent Classifier\ncategory · confidence · language"]
        CS["Context Store\nRAG / Knowledge Base\npgvector embeddings"]
        GPT["OpenAI GPT-4\nprompt + KB context"]
        GR["Guardrails\nfacts-only · no hallucination"]
        ORCH --> IC --> CS --> GPT --> GR
    end

    %% ══════════════════════════════════════════════════
    %% SWIMLANE 4 — MESSAGING
    %% ══════════════════════════════════════════════════
    subgraph MSG["MESSAGING  |  Bird.com WhatsApp BSP  (EU · DE)"]
        direction LR
        BIRD_OUT["Bird.com Outbound\napproved templates only\nFlow 1: deal · Flow 2: congrats"]
        BIRD_IN["Bird.com Inbound\ncustomer replies\nFlow 3: support"]
        CUSTOMER(["Customer\nWhatsApp"])
        BIRD_OUT --> CUSTOMER
        CUSTOMER --> BIRD_IN
    end

    %% ══════════════════════════════════════════════════
    %% SWIMLANE 5 — BOOKING
    %% ══════════════════════════════════════════════════
    subgraph BOOK["BOOKING  |  Cal.com · Google Calendar"]
        direction LR
        CALCOM["Cal.com API\ntrial session scheduling"]
        GCAL["Google Calendar\nslot availability"]
        CALCOM <-->|"sync slots"| GCAL
    end

    %% ══════════════════════════════════════════════════
    %% SWIMLANE 6 — AUTOMATION
    %% ══════════════════════════════════════════════════
    subgraph AUTO["AUTOMATION  |  n8n · Rule Engine · Scheduler"]
        direction LR
        N8N["n8n Flows\nCRM event chains"]
        RULES["Rule Engine\ndelay · opt-in check"]
        SCHED["Job Scheduler\ntiming + retries"]
        N8N --> RULES --> SCHED
    end

    %% ══════════════════════════════════════════════════
    %% SWIMLANE 7 — ANALYTICS
    %% ══════════════════════════════════════════════════
    subgraph ANL["ANALYTICS  |  Metabase · PostHog (EU)"]
        direction LR
        EVT["Event Tracking\nconversion · opt-out · escalation"]
        MBAS["Metabase Dashboard\nstudio owner reports"]
        PH["PostHog EU\nprivacy-first analytics"]
        EVT --> MBAS
        EVT --> PH
    end

    STAFF["STUDIO STAFF\nbilling · legal · medical · complaints"]

    %% ══════════════════════════════════════════════════
    %% CROSS-SWIMLANE CONNECTIONS
    %% ══════════════════════════════════════════════════

    %% Lead Capture → Backend
    GDPR -->|"POST /api/v1/leads"| WH
    CRMR -->|"HMAC webhook\nstatus changed"| WH
    CRMR -->|"status changed"| N8N

    %% Automation → Backend → Queue → Outbound
    SCHED -->|"POST /internal/jobs"| WH
    RD -->|"queued template job"| BIRD_OUT

    %% Inbound → Backend → AI Pipeline
    BIRD_IN -->|"POST /webhooks/bird"| WH
    WH -->|"route conversation"| ORCH

    %% AI Pipeline → Outbound or Escalation
    GR -->|"safe reply"| BIRD_OUT
    GR -->|"sensitive topic"| STAFF
    GR -->|"booking intent"| CALCOM

    %% Analytics (async)
    WH -.->|"events"| EVT
    BIRD_OUT -.->|"delivery events"| EVT
    GR -.->|"escalation events"| EVT

    %% ══════════════════════════════════════════════════
    %% STYLING — swimlane borders
    %% ══════════════════════════════════════════════════
    style LC fill:transparent,stroke:#1565c0,color:#ccc
    style BC fill:transparent,stroke:#4527a0,color:#ccc
    style AI fill:transparent,stroke:#00695c,color:#ccc
    style MSG fill:transparent,stroke:#2e7d32,color:#ccc
    style BOOK fill:transparent,stroke:#e65100,color:#ccc
    style AUTO fill:transparent,stroke:#37474f,color:#ccc
    style ANL fill:transparent,stroke:#ad1457,color:#ccc

    %% Lead Capture nodes (blue)
    style ADS fill:#1a237e,stroke:#5c6bc0,color:#fff
    style NXT fill:#1a237e,stroke:#5c6bc0,color:#fff
    style GDPR fill:#1a237e,stroke:#5c6bc0,color:#fff
    style CRMR fill:#1a237e,stroke:#5c6bc0,color:#fff
    style GSH fill:#1a237e,stroke:#5c6bc0,color:#fff

    %% Backend Core nodes (purple)
    style WH fill:#311b92,stroke:#9575cd,color:#fff
    style PG fill:#311b92,stroke:#9575cd,color:#fff
    style RD fill:#311b92,stroke:#9575cd,color:#fff

    %% AI Pipeline nodes (teal)
    style ORCH fill:#004d40,stroke:#4db6ac,color:#fff
    style IC fill:#004d40,stroke:#4db6ac,color:#fff
    style CS fill:#004d40,stroke:#4db6ac,color:#fff
    style GPT fill:#004d40,stroke:#4db6ac,color:#fff
    style GR fill:#004d40,stroke:#4db6ac,color:#fff

    %% Messaging nodes (green)
    style BIRD_OUT fill:#1b5e20,stroke:#66bb6a,color:#fff
    style BIRD_IN fill:#1b5e20,stroke:#66bb6a,color:#fff
    style CUSTOMER fill:#1b5e20,stroke:#66bb6a,color:#fff

    %% Booking nodes (orange)
    style CALCOM fill:#bf360c,stroke:#ff8a65,color:#fff
    style GCAL fill:#bf360c,stroke:#ff8a65,color:#fff

    %% Automation nodes (slate)
    style N8N fill:#37474f,stroke:#78909c,color:#fff
    style RULES fill:#37474f,stroke:#78909c,color:#fff
    style SCHED fill:#37474f,stroke:#78909c,color:#fff

    %% Analytics nodes (pink)
    style EVT fill:#880e4f,stroke:#f48fb1,color:#fff
    style MBAS fill:#880e4f,stroke:#f48fb1,color:#fff
    style PH fill:#880e4f,stroke:#f48fb1,color:#fff

    %% Escalation (red)
    style STAFF fill:#c62828,stroke:#ef9a9a,color:#fff
```

---

## What's New vs. Previous Version

| Previous | Improved |
|----------|----------|
| Twilio (US-based BSP) | **Bird.com** — EU/DE data residency, DSGVO-native |
| Implicit RAG / separate vector DB | **pgvector** on PostgreSQL 16 — no extra service |
| Raw Google Calendar API | **Cal.com** → Google Calendar — booking UI + WhatsApp links |
| Metabase only | **PostHog EU** added — privacy-first product analytics |
| Intent classification inside GPT-4 prompt | **Explicit Intent Classifier step** — gates expensive model calls |
| Monochrome flat diagram | **7 color-coded swimlanes** by domain |
| No explicit Context Store | **Context Store** (RAG) shown as a distinct pipeline step |

---

## Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Ads | Meta · Google · TikTok | Drive traffic to the gym landing page |
| Website | **Next.js 14** (App Router) | Landing page + lead form + tracking pixel |
| CRM | **Studio's existing CRM** | Contacts, payments, membership — we never write back |
| Reporting | **Google Sheets** | Auto-synced from CRM for the studio team |
| Backend | **FastAPI** (Python) | Webhooks, routing, rules, job dispatch |
| Database | **PostgreSQL 16 + pgvector** | Leads, events, chat logs, RAG embeddings |
| Queue | **Redis 7** | Idempotent job delivery with retries |
| AI | **OpenAI GPT-4** + pgvector RAG | Answers grounded in your knowledge base |
| Intent | **Intent Classifier** | Lightweight routing step before GPT-4 |
| WhatsApp | **Bird.com** BSP | Approved templates + inbound chat (EU hosting) |
| Booking | **Cal.com** + Google Calendar | Trial session scheduling via WhatsApp |
| Automation | **n8n** + Rule Engine | CRM event → template chains, no deploy needed |
| Analytics | **Metabase** + **PostHog EU** | Studio dashboards + privacy-first product analytics |
| Infrastructure | **Docker Compose** | Postgres + Redis + Backend in one command |

---

## Key Rules

| Rule | How it's enforced |
|------|------------------|
| GDPR / DSGVO consent before any WhatsApp | Form checkbox + timestamp stored in CRM + opt-in check in Rule Engine |
| Only approved templates for outbound | Messaging service blocks freeform outbound |
| AI never makes up facts | GPT-4 uses RAG from KB + CRM data only — Guardrails layer blocks hallucinations |
| Sensitive topics → human | Guardrails escalate billing, legal, medical, complaints to Studio Staff |
| CRM stays in charge | We listen to CRM events via HMAC-verified webhooks — never write back or override |
| Idempotent delivery | Outbound jobs keyed on `campaign_key + lead_id` — Redis queue prevents duplicates |
