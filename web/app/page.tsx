"use client";

import { FormEvent, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const phone_e164 = String(fd.get("phone_e164") || "").trim();
    const email = String(fd.get("email") || "").trim() || null;
    const name = String(fd.get("name") || "").trim() || null;
    const whatsapp_opt_in = fd.get("whatsapp_opt_in") === "on";

    if (!phone_e164) {
      setStatus("err");
      setMessage("Bitte Telefonnummer in E.164 angeben (z. B. +493012345678).");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch(`${API}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gym_id: "default",
          phone_e164,
          email,
          name,
          whatsapp_opt_in,
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || res.statusText);
      }
      setStatus("ok");
      setMessage("Danke — wir melden uns bei dir.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
  }

  return (
    <main>
      <h1>Probetraining anfragen</h1>
      <p className="lead">
        Daten gehen an das Studio-CRM und an die WhatsApp-Automation (MVP-Backend).
      </p>
      <div className="card">
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Alex" />

          <label htmlFor="email">E-Mail</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="du@beispiel.de" />

          <label htmlFor="phone_e164">Telefon (E.164) *</label>
          <input
            id="phone_e164"
            name="phone_e164"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+493012345678"
          />

          <label className="checkbox">
            <input name="whatsapp_opt_in" type="checkbox" />
            <span>
              Ich stimme zu, dass mich das Studio per WhatsApp zu Mitgliedschaft &amp; Angeboten
              kontaktieren darf (freiwillig).
            </span>
          </label>

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Senden…" : "Absenden"}
          </button>
        </form>
        {message ? (
          <p className={`msg ${status === "ok" ? "ok" : status === "err" ? "err" : ""}`}>{message}</p>
        ) : null}
      </div>
    </main>
  );
}
