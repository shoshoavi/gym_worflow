# Gym WhatsApp AI — Paket für alle Beteiligten

**Zweck dieses Ordners:** Hier liegt eine **verständliche Zusammenfassung** des geplanten Systems (ohne Programmier-Details) plus **Links zu allen Architektur-Bildern**. Technische Tiefe steht weiter unten in Kurzform.

**Sprache:** Dieses Dokument ist bewusst **einfach** gehalten — für Studioinhaberinnen, Vertrieb, Marketing und Partner, die keinen Code lesen müssen.

---

## 1. Worum es geht (in einem Satz)

Wenn jemand über **Werbung** auf die **Webseite** kommt, **Daten hinterlässt** und später **zahlt oder nicht zahlt**, soll ein **WhatsApp-Assistent** automatisch **passende Nachrichten** senden — und **zahlende Mitglieder** zusätzlich beim **Kundenservice** unterstützen — **angeschlossen an das bestehende CRM** des Studios.

---

## 2. Was bereits wo „wohnt“ (wichtig für Vertrauen)

| Ort | Rolle in einfachen Worten |
|-----|---------------------------|
| **CRM des Studios** | Die **einzige offizielle Akte** für Kontakte und Mitgliedschaft. Euer Team arbeitet dort wie heute. **Wir ersetzen das CRM nicht.** |
| **Google Tabellen** | Werden vom **CRM** gefüllt oder aktualisiert — gut für **Übersichten und Reporting**. **Kein Ersatz** für das CRM als Steuerzentrale. |
| **Euer WhatsApp-Kanal** | Über einen **zertifizierten Anbieter** (z. B. Twilio o. ä.) angebunden — damit Nachrichten **regelkonform** rausgehen. |
| **Das geplante Produkt** | Sitzt **daneben**: Es **hört** auf Ereignisse aus dem CRM und **antwortet** auf WhatsApp — mit klaren Regeln und Eskalation zum Menschen. |

---

## 3. Der Ablauf für Interessenten und Mitglieder

1. **Werbung** (Facebook, Google, TikTok …) führt zur **Landingpage** mit **Formular**.  
2. Das Formular legt den Kontakt im **CRM** an (oder aktualisiert ihn).  
3. Das CRM **pflegt** parallel die **Google-Tabelle**, falls ihr das so nutzt — für eure interne Übersicht.  
4. Sobald im CRM klar ist: **„hat gezahlt“** oder **„hat nicht gezahlt“**, löst das **automatisch** die richtige **WhatsApp-Nachricht** aus (z. B. **Glückwunsch** vs. **Angebot**).  
5. Schreibt jemand **zurück** auf WhatsApp, übernimmt der **KI-gestützte Assistent** die **Konversation** — **getrennt nach Zielgruppe**:  
   - **Zahlendes Mitglied** → eher **Service** (Öffnungszeiten, Abläufe, FAQs).  
   - **Noch nicht zahlend** → eher **Vertrieb** (Probetraining, Angebot, Termin).  
6. Bei **sensiblen Themen** (Streit ums Geld, Vertrag, Beschwerden, Gesundheit) soll **immer ein Mensch** übernehmen — das ist fest eingeplant.

---

## 4. Regeln, die in Deutschland wichtig sind

- **Einwilligung:** Wer WhatsApp vom Studio bekommen soll, muss das **verständlich zugestimmt** haben (DSGVO + WhatsApp-Richtlinien).  
- **Vorlagen:** Viele **Werbe- oder Erinnerungsnachrichten** außerhalb des Chatfensters laufen über **genehmigte WhatsApp-Vorlagen** — kein „freies Drauflosreden“ der KI für solche Fälle.  
- **Datenschutz:** Anbieter und Speicherorte sollten **EU-tauglich** gewählt und **vertraglich** abgesichert werden (Auftragsverarbeitung, Dokumentation).

---

## 5. Wie wir verhindern, dass die KI „erfunden“ antwortet

In einfachen Worten:

- Antworten auf **Fakten** (Preise, Regeln, Öffnungszeiten) sollen aus **euren dokumentierten Texten** oder **CRM-Daten** kommen — nicht aus dem Bauch der KI.  
- Wenn etwas **nicht sicher** ist, soll das System **ehrlich nachfragen** oder an **euer Team** **übergeben** — statt zu raten.  
- **Gratulationen und Angebote** per WhatsApp laufen über **feste Vorlagen** mit Platzhaltern aus dem CRM — damit Inhalt und Rechtssicherheit stimmen.

---

## 6. Werkzeuge: n8n vs. „richtige“ Software

- **n8n** (o. ä.) eignet sich gut für **einfache Ketten**: „CRM sagt B → rufe Dienst X → sende Vorlage Y“.  
- Die **eigentliche Chat-Logik** (Gedächtnis, Sicherheit, Anbindung an Wissensdatenbank) soll in **professioneller Software** laufen, die man **testen** und **protokollieren** kann.  
- **Praxis:** oft eine **Kombination** — n8n für schnelle Automation, zentraler Dienst für den WhatsApp-Dialog.

---

## 7. Alle Diagramme und Bilder (Links)

### Google Stitch (großes Architektur-Poster)

- Projekt-ID: `3827988862232643991`  
- Bildschirm: **„System Architecture - Gym-Synapse AI“**  
- **Öffnen:** Im **Google-Stitch-Web** mit demselben Konto wie bei der Erstellung — Projekt suchen oder über eure Stitch-Übersicht öffnen.

### Figma FigJam (drei bearbeitbare Whiteboards)

Öffnet die Links in **Figma** und **„Claim“ / speichern**, damit die Dateien in eurem Team bleiben. **Aktuelle Links** (werden bei neuen MCP-Läufen ersetzt — im Repo nachpflegen):

Siehe **[docs/diagrams/FIGJAM_LINKS.md](diagrams/FIGJAM_LINKS.md)** für die neuesten **Claim-URLs**.

### Bilder lokal im Projektordner (WSL2 Ubuntu)

PNG- und HTML-Exports kannst du **selbst herunterladen** — im **Ubuntu-Terminal unter WSL**, nicht in PowerShell:

```bash
cd ~/workspace/whatsapp_bot
chmod +x scripts/download_diagrams.sh
./scripts/download_diagrams.sh
```

Details: **[docs/diagrams/README.md](diagrams/README.md)**. Stitch-Hinweise: **[docs/diagrams/STITCH.md](diagrams/STITCH.md)**.

### Original-Skizze im Repo

- Falls vorhanden: `image.png` im Projektordner — eure **erste** Architekturzeichnung; die neuen Bilder **erweitern** diese Idee um CRM, Tabellen und klarere Datenwege.

---

## 8. Was schon erledigt ist — was als Nächstes sinnvoll ist

**Erledigt (Konzept & Bilder):**

- Zielarchitektur in **Stitch** erzeugt.  
- Drei **FigJam-Diagramme** (Übersicht, WhatsApp-Ablauf, Status/Lebenszyklad).  
- Ausführlicher **technischer Plan** (engl. Fachbegriffe) in Cursor unter der Plan-Datei `gym_whatsapp_ai_flow_f3d32bd2.plan.md` (liegt im Cursor-Plans-Ordner, nicht zwingend in diesem Git-Repo).

**Erledigt (Umsetzung MVP im Repo):**

- **Next.js**-Landing mit Lead-Formular (`web/`).  
- **FastAPI**-Backend mit Leads-API, CRM- & Twilio-Webhooks, Outbound-Job-Stub (`backend/`).  
- Architektur-Ergänzungen: [WORKFLOW_AS_IS_TO_BE.md](WORKFLOW_AS_IS_TO_BE.md), [LIFECYCLE_AND_TRIGGERS.md](LIFECYCLE_AND_TRIGGERS.md), [INTEGRATION_CONTRACTS.md](INTEGRATION_CONTRACTS.md), [NFR_AND_GUARDRAILS.md](NFR_AND_GUARDRAILS.md), [N8N_VS_CORE.md](N8N_VS_CORE.md).  
- **Docker Compose** für Postgres/Redis; Anleitung im [README](../README.md).

**Noch offen (typische nächste Workshops):**

- **Ist- vs. Soll-Prozess** auf eine Seite (wer macht was im Studio).  
- **Welche CRM-Felder und Ereignisse** genau auslösen (bezahlt / nicht bezahlt, Mitglied pausiert …).  
- **Verträge** mit CRM-, WhatsApp- und KI-Anbietern (EU, DSGVO).  
- **Entscheidung** n8n-Umfang vs. Entwicklung — pro Pilotstudio festhalten.

---

## 9. Kurz-Glossar

| Begriff | Bedeutung für Nicht-Techniker |
|--------|--------------------------------|
| **CRM** | Eure Kunden- und Mitgliederverwaltung. |
| **Webhook** | „Automatischer Anruf“ von einer Software zur anderen: „Pass auf, im CRM hat sich etwas geändert!“ |
| **Vorlage (Template)** | Vorab genehmigte WhatsApp-Nachricht mit Platzhaltern (Name, Studio …). |
| **RAG** | Die KI holt sich **vor dem Antworten** passende Abschnitte aus **euren** Texten — weniger Falsches. |
| **BSP** | „WhatsApp für Unternehmen“ über einen **offiziellen Partner** — technisch und rechtlich sauber angebunden. |

---

## 10. English summary (one minute)

**Goal:** Connect gym **ads → website form → existing CRM → WhatsApp**. CRM updates **Google Sheets** for reporting. When payment status changes, send the right **template** (congrats vs offer). **Inbound** chats use AI with **member service** vs **sales** paths, with **human handoff** for sensitive topics. **CRM stays the system of record**; the product listens to **CRM events**, not spreadsheet edits, when possible. **Diagrams:** one **Stitch** board + **three FigJam** links in section 7.

---

*Stand: April 2026 — Architektur- und Projektpaket zur Abstimmung mit Studios und Partnern.*
