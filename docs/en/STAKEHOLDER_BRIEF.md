> English translation of [docs/STAKEHOLDER_BRIEF.md](../STAKEHOLDER_BRIEF.md)

# Gym WhatsApp AI — Package for All Stakeholders

**Purpose of this folder:** Here you'll find an **easy-to-understand summary** of the planned system (without programming details) plus **links to all architecture diagrams**. Technical depth is provided further below in condensed form.

**Language:** This document is intentionally kept **simple** — for studio owners, sales, marketing, and partners who don't need to read code.

---

## 1. What This Is About (in One Sentence)

When someone arrives at the **website** via **advertising**, **leaves their details**, and later **pays or doesn't pay**, a **WhatsApp assistant** should automatically send **the right messages** — and also support **paying members** with **customer service** — **connected to the studio's existing CRM**.

---

## 2. What Already Lives Where (Important for Trust)

| Location | Role in plain terms |
|----------|---------------------|
| **Studio CRM** | The **single official record** for contacts and memberships. Your team works there as today. **We do not replace the CRM.** |
| **Google Sheets** | Filled or updated by the **CRM** — useful for **overviews and reporting**. **Not a replacement** for the CRM as the control centre. |
| **Your WhatsApp channel** | Connected via a **certified provider** (e.g. Twilio or similar) — so messages go out **in compliance with the rules**. |
| **The planned product** | Sits **alongside**: it **listens** to events from the CRM and **responds** on WhatsApp — with clear rules and escalation to a human. |

---

## 3. The Flow for Prospects and Members

1. **Advertising** (Facebook, Google, TikTok …) leads to the **landing page** with a **form**.  
2. The form creates the contact in the **CRM** (or updates it).  
3. The CRM **maintains** the **Google Sheet** in parallel, if you use it that way — for your internal overview.  
4. As soon as the CRM knows: **"has paid"** or **"has not paid"**, this **automatically** triggers the right **WhatsApp message** (e.g. **congratulations** vs. **offer**).  
5. When someone **writes back** on WhatsApp, the **AI-powered assistant** takes over the **conversation** — **split by audience**:  
   - **Paying member** → primarily **service** (opening hours, procedures, FAQs).  
   - **Not yet paying** → primarily **sales** (trial session, offer, appointment).  
6. For **sensitive topics** (disputes about money, contracts, complaints, health), a **human must always take over** — this is firmly planned in.

---

## 4. Rules That Are Important in Germany

- **Consent:** Anyone who should receive WhatsApp from the studio must have **clearly agreed** to this (GDPR + WhatsApp policies).  
- **Templates:** Many **promotional or reminder messages** outside the chat window go through **approved WhatsApp templates** — no "free improvisation" by the AI for such cases.  
- **Data protection:** Providers and storage locations should be chosen with **EU compliance** in mind and secured **contractually** (data-processing agreements, documentation).

---

## 5. How We Prevent the AI from "Making Things Up"

In simple terms:

- Answers about **facts** (prices, rules, opening hours) should come from **your documented texts** or **CRM data** — not from the AI's imagination.  
- If something is **not certain**, the system should **honestly ask** or **hand over to your team** — rather than guessing.  
- **Congratulations and offers** via WhatsApp go through **fixed templates** with placeholders from the CRM — so content and legal compliance are correct.

---

## 6. Tools: n8n vs. "Proper" Software

- **n8n** (or similar) works well for **simple chains**: "CRM says B → call service X → send template Y".  
- The **actual chat logic** (memory, security, connection to the knowledge base) should run in **professional software** that can be **tested** and **logged**.  
- **In practice:** often a **combination** — n8n for fast automation, a central service for the WhatsApp dialogue.

---

## 7. All Diagrams and Images (Links)

### Google Stitch (Large Architecture Poster)

- Project ID: `3827988862232643991`  
- Screen: **"System Architecture - Gym-Synapse AI"** (desktop), "System Architecture - Mobile"  
- **Open:** In **Google Stitch web** with the same account used during creation — find the project or open it through your Stitch overview.

### Figma FigJam (Three Editable Whiteboards)

Open the links in **Figma** and **"Claim" / save** so the files stay in your team. **Current links** (replaced on new MCP runs — keep updated in the repo):

See **[docs/diagrams/FIGJAM_LINKS.md](diagrams/FIGJAM_LINKS.md)** for the latest **claim URLs**.

### Images Locally in the Project Folder (WSL2 Ubuntu)

PNG and HTML exports can be **downloaded yourself** — in the **Ubuntu terminal under WSL**, not in PowerShell:

```bash
cd ~/workspace/whatsapp_bot
chmod +x scripts/download_diagrams.sh
./scripts/download_diagrams.sh
```

Details: **[docs/diagrams/README.md](diagrams/README.md)**. Stitch notes: **[docs/diagrams/STITCH.md](diagrams/STITCH.md)**.

### Original Sketch in the Repo

- If present: `image.png` in the project folder — your **first** architecture drawing; the new images **expand** this idea with CRM, sheets, and clearer data flows.

---

## 8. What Has Been Done — What Makes Sense Next

**Done (concept & diagrams):**

- Target architecture created in **Stitch**.  
- Three **FigJam diagrams** (overview, WhatsApp flow, status/lifecycle).  
- Detailed **technical plan** (English terms) in Cursor under the plan file `gym_whatsapp_ai_flow_f3d32bd2.plan.md` (in the Cursor plans folder, not necessarily in this Git repo).

**Done (MVP implementation in repo):**

- **Next.js** landing page with lead form (`web/`).  
- **FastAPI** backend with leads API, CRM & Twilio webhooks, outbound job stub (`backend/`).  
- Architecture additions: [WORKFLOW_AS_IS_TO_BE.md](WORKFLOW_AS_IS_TO_BE.md), [LIFECYCLE_AND_TRIGGERS.md](LIFECYCLE_AND_TRIGGERS.md), [INTEGRATION_CONTRACTS.md](INTEGRATION_CONTRACTS.md), [NFR_AND_GUARDRAILS.md](NFR_AND_GUARDRAILS.md), [N8N_VS_CORE.md](N8N_VS_CORE.md).  
- **Docker Compose** for Postgres/Redis; setup guide in [README](../README.md).

**Still open (typical next workshops):**

- **As-Is vs. To-Be process** on one page (who does what in the studio).  
- **Which CRM fields and events** exactly trigger automation (paid / not paid, membership paused …).  
- **Contracts** with CRM, WhatsApp, and AI providers (EU, GDPR).  
- **Decision** on n8n scope vs. development — capture per pilot studio.

---

## 9. Short Glossary

| Term | Meaning for Non-Technical Readers |
|------|----------------------------------|
| **CRM** | Your customer and membership management system. |
| **Webhook** | "Automatic call" from one software to another: "Hey, something changed in the CRM!" |
| **Template** | Pre-approved WhatsApp message with placeholders (name, studio …). |
| **RAG** | The AI fetches relevant sections from **your** texts **before answering** — fewer errors. |
| **BSP** | "WhatsApp for Business" via an **official partner** — connected technically and legally correctly. |

---

## 10. English Summary (One Minute)

**Goal:** Connect gym **ads → website form → existing CRM → WhatsApp**. CRM updates **Google Sheets** for reporting. When payment status changes, send the right **template** (congrats vs offer). **Inbound** chats use AI with **member service** vs **sales** paths, with **human handoff** for sensitive topics. **CRM stays the system of record**; the product listens to **CRM events**, not spreadsheet edits, when possible. **Diagrams:** one **Stitch** board + **three FigJam** links in section 7.

---

*As of: April 2026 — architecture and project package for alignment with studios and partners.*
