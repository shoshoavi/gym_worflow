"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const COUNTDOWN_KEY = "fitdeal-countdown-target";
const COUNTDOWN_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

type Studio = {
  name: string;
  slug: string;
  lat: number;
  lng: number;
};

const studios: Studio[] = [
  { name: "Achern", slug: "achern", lat: 48.6318, lng: 8.0746 },
  { name: "Albstadt", slug: "albstadt", lat: 48.2167, lng: 9.025 },
  { name: "Aschheim", slug: "aschheim", lat: 48.1716, lng: 11.7164 },
  { name: "Biberach", slug: "biberach", lat: 48.0951, lng: 9.7902 },
  { name: "Bühl", slug: "buehl", lat: 48.6968, lng: 8.1356 },
  { name: "Konstanz", slug: "konstanz", lat: 47.6779, lng: 9.1732 },
  { name: "Fulda", slug: "fulda", lat: 50.5558, lng: 9.6808 },
  { name: "Geldern", slug: "geldern", lat: 51.5167, lng: 6.3239 },
  { name: "Holzgerlingen", slug: "holzgerlingen", lat: 48.6393, lng: 9.0115 },
  { name: "Kirchseeon", slug: "kirchseeon", lat: 48.0659, lng: 11.8884 },
  { name: "Lahr", slug: "lahr", lat: 48.3398, lng: 7.8787 },
  { name: "Leonberg", slug: "leonberg", lat: 48.8005, lng: 9.01 },
  { name: "Metzingen", slug: "metzingen", lat: 48.5365, lng: 9.2833 },
  { name: "München Berg am Laim", slug: "muenchen-berg-am-laim", lat: 48.1298, lng: 11.6314 },
  { name: "München Giesing", slug: "muenchen-giesing", lat: 48.1114, lng: 11.5862 },
  { name: "München Aubing", slug: "muenchen-aubing", lat: 48.1548, lng: 11.4136 },
  { name: "Neu-Ulm", slug: "neu-ulm", lat: 48.3928, lng: 10.0111 },
  { name: "Oberhaching", slug: "oberhaching", lat: 48.0246, lng: 11.5967 },
  { name: "Offenburg", slug: "offenburg", lat: 48.4735, lng: 7.9498 },
  { name: "Rheda-Wiedenbrück", slug: "rheda-wiedenbrueck", lat: 51.8444, lng: 8.2981 },
  { name: "Rheinfelden", slug: "rheinfelden", lat: 47.5546, lng: 7.7945 },
  { name: "Tauberbischofsheim", slug: "tauberbischofsheim", lat: 49.6233, lng: 9.6628 },
  { name: "Tuttlingen", slug: "tuttlingen", lat: 47.9857, lng: 8.8198 },
  { name: "Ulm", slug: "ulm", lat: 48.4011, lng: 9.9876 },
  { name: "Überlingen", slug: "ueberlingen", lat: 47.7667, lng: 9.1667 },
  { name: "Unterföhring", slug: "unterfoehring", lat: 48.1922, lng: 11.6427 },
  { name: "Unterhaching", slug: "unterhaching", lat: 48.0651, lng: 11.6156 },
  { name: "Vaterstetten", slug: "vaterstetten", lat: 48.1054, lng: 11.7685 },
  { name: "Waldshut-Tiengen", slug: "waldshut-tiengen", lat: 47.6236, lng: 8.2144 },
];

const DrinkIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 8h12l-1.5 14H7.5L6 8z" />
    <path d="M10 8l2-6h3" />
    <path d="M4 8h16" />
    <circle cx="19" cy="5" r="3" />
  </svg>
);

const DumbbellIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12h20" />
    <path d="M4 8v8" />
    <path d="M8 6v12" />
    <path d="M16 6v12" />
    <path d="M20 8v8" />
    <path d="M6 7v10" />
    <path d="M18 7v10" />
  </svg>
);

const SpaIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 14h18" />
    <path d="M5 14v4" />
    <path d="M19 14v4" />
    <circle cx="8" cy="9" r="2" />
    <path d="M11 11h6a2 2 0 0 1 2 2v1" />
    <path d="M2 14h20" />
  </svg>
);

const offers = [
  {
    Icon: DrinkIcon,
    title: "Getränke Flatrate",
    text: "Wasser, Isotonics und mehr — vor, während und nach dem Training inklusive. Kein Aufpreis, kein Limit.",
  },
  {
    Icon: DumbbellIcon,
    title: "Plate-Loaded Area",
    text: "Freie Hantelzone mit echtem Wettkampf-Equipment. Für alle, die ernsthaft Gewicht bewegen.",
  },
  {
    Icon: SpaIcon,
    title: "Massageliegen & Solarium",
    text: "Recovery-Zone je nach Standort mit Massageliegen und Solarium. Entspannung direkt nach dem Training.",
  },
];

const faqs = [
  {
    question: "Wie läuft die Aktion ab?",
    answer:
      "Du reservierst dir jetzt unverbindlich dein Angebot. Danach melden wir uns direkt bei dir oder führen dich zum nächsten Schritt, damit du deinen Start schnell abschließen kannst.",
  },
  {
    question: "Was kann ich alles nutzen?",
    answer:
      "Mit deiner Mitgliedschaft nutzt du die Trainingsflächen, Geräte und die standortabhängigen Inklusivleistungen deines Studios. Welche Extras vor Ort verfügbar sind, hängt vom ausgewählten Standort ab.",
  },
  {
    question: "An wen kann ich mich bei Fragen wenden?",
    answer:
      "Unser Team im Studio unterstützt dich bei Training, Ablauf und Starttermin. Sobald du dein Studio ausgewählt hast, melden wir uns mit den passenden Details.",
  },
];

const testimonials = [
  {
    name: "Sandra S.",
    initials: "SS",
    role: "Mitglied seit 3 Jahren",
    stars: 5,
    quote:
      "Trainer sehr kompetent, super freundlich und immer mit Tipps. Ich fühle mich gut aufgehoben und empfehle das Studio klar weiter.",
  },
  {
    name: "Adam S.",
    initials: "AS",
    role: "Krafttraining",
    stars: 5,
    quote:
      "Sauber, genügend Geräte und insgesamt ein sehr starkes Studio. Man kann hier ernsthaft trainieren und fühlt sich direkt wohl.",
  },
  {
    name: "Samira T.",
    initials: "ST",
    role: "Functional Training",
    stars: 5,
    quote:
      "Moderne Geräte, sauberer Trainingsbereich und ein hilfsbereites Team. Genau die Mischung, die ich gesucht habe.",
  },
  {
    name: "Sophie M.",
    initials: "SM",
    role: "Cardio & Kurse",
    stars: 5,
    quote:
      "Das Angebot ist vielseitig und der Einstieg war unkompliziert. Besonders stark ist die Atmosphäre vor Ort.",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <span className="star-row" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} aria-hidden="true">★</span>
      ))}
    </span>
  );
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function distanceInKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const originLat = toRad(aLat);
  const targetLat = toRad(bLat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(originLat) * Math.cos(targetLat);

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export default function Home() {
  const [countdownMs, setCountdownMs] = useState(COUNTDOWN_DURATION_MS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedStudio, setSelectedStudio] = useState("");
  const [nearestStudioLabel, setNearestStudioLabel] = useState("Noch kein Studio ausgewählt.");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(COUNTDOWN_KEY) : null;
    const parsed = stored ? Number(stored) : 0;
    const target = parsed > Date.now() ? parsed : Date.now() + COUNTDOWN_DURATION_MS;

    if (!stored || parsed <= Date.now()) {
      window.localStorage.setItem(COUNTDOWN_KEY, String(target));
    }

    const updateCountdown = () => {
      const remaining = Math.max(target - Date.now(), 0);
      setCountdownMs(remaining);
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Reveal-on-scroll: fade-up elements with [data-reveal] as they enter viewport.
  // Uses inline styles (not classList) so that React re-renders (e.g. FAQ toggle)
  // cannot strip the revealed state.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els.length) return;
    const reveal = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    if (typeof IntersectionObserver === "undefined") {
      els.forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Track which testimonial card is centered in the scroll-snap track
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const first = track.firstElementChild as HTMLElement | null;
        if (!first) return;
        const step = first.offsetWidth + 22;
        const index = Math.round(track.scrollLeft / step);
        setCarouselIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  function scrollToTestimonial(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const target = track.children[index] as HTMLElement | undefined;
    if (!target) return;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  const countdown = useMemo(() => {
    const totalSeconds = Math.floor(countdownMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      { label: "Tage", value: pad(days) },
      { label: "Stunden", value: pad(hours) },
      { label: "Minuten", value: pad(minutes) },
      { label: "Sekunden", value: pad(seconds) },
    ];
  }, [countdownMs]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const firstName = String(data.get("first_name") || "").trim();
    const lastName = String(data.get("last_name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone_e164") || "").trim();
    const studio = String(data.get("studio") || "").trim();
    const privacyAccepted = data.get("privacy") === "on";
    const whatsappOptIn = data.get("whatsapp_opt_in") === "on";

    if (!firstName || !lastName || !email || !phone || !studio) {
      setFormStatus("err");
      setFormMessage("Bitte fülle alle Pflichtfelder aus.");
      return;
    }

    if (!privacyAccepted) {
      setFormStatus("err");
      setFormMessage("Bitte akzeptiere die Datenschutzerklärung.");
      return;
    }

    setFormStatus("loading");
    setFormMessage("");

    try {
      const response = await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gym_id: studio,
          phone_e164: phone,
          email,
          name: `${firstName} ${lastName}`,
          whatsapp_opt_in: whatsappOptIn,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || response.statusText);
      }

      setFormStatus("ok");
      setFormMessage("Perfekt. Dein Angebot ist reserviert und wir melden uns zeitnah bei dir.");
      form.reset();
      setSelectedStudio("");
      setNearestStudioLabel("Noch kein Studio ausgewählt.");
      window.setTimeout(() => setIsModalOpen(false), 1200);
    } catch (error) {
      setFormStatus("err");
      setFormMessage(error instanceof Error ? error.message : "Es ist ein Fehler aufgetreten.");
    }
  }

  function openModal() {
    setFormStatus("idle");
    setFormMessage("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function selectNearestStudio() {
    if (!navigator.geolocation) {
      setFormStatus("err");
      setFormMessage("Dein Browser unterstützt keine Standortfreigabe.");
      return;
    }

    setFormStatus("loading");
    setFormMessage("Standort wird ermittelt …");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nearest = studios.reduce((best, studio) => {
          const distance = distanceInKm(coords.latitude, coords.longitude, studio.lat, studio.lng);
          if (!best || distance < best.distance) {
            return { studio, distance };
          }
          return best;
        }, null as { studio: Studio; distance: number } | null);

        if (!nearest) {
          setFormStatus("err");
          setFormMessage("Kein passendes Studio gefunden.");
          return;
        }

        setSelectedStudio(nearest.studio.slug);
        setNearestStudioLabel(`Empfohlenes Studio in Deutschland: ${nearest.studio.name} (${nearest.distance.toFixed(0)} km)`);
        setFormStatus("idle");
        setFormMessage("");
      },
      () => {
        setFormStatus("err");
        setFormMessage("Standortfreigabe wurde abgelehnt oder war nicht verfügbar.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <>
      <main className="landing-page">
        {/* ── HERO ── */}
        <section className="hero-section" aria-label="Angebot Hero">
          <div className="hero-overlay" aria-hidden="true" />

          <header className="hero-header">
            <div className="brand-mark" aria-label="clever fit">
              <Image
                src="/logo-clever-fit.png"
                alt="clever fit"
                width={513}
                height={637}
                className="brand-logo"
                priority
              />
            </div>
            <button type="button" className="ghost-button" onClick={openModal}>
              Jetzt reservieren
            </button>
          </header>

          <div className="hero-title">
            <p className="eyebrow">Angebot</p>
            <h1 className="hero-h1">Dein Rundum<br /><span className="hero-h1-accent">Sorglos Deal</span></h1>
          </div>

          <div className="hero-center">
            <p className="hero-kicker">
              NUR FÜR DIE ERSTEN<br />
              <strong>80 ANMELDUNGEN</strong>
            </p>

            <div className="price-tag" aria-label="Preis: 19,90 Euro pro 4 Wochen">
              <span className="price-main">19,90&nbsp;€</span>
              <span className="price-period">/&nbsp;4&nbsp;WTL.</span>
            </div>
            <p className="price-strike">
              <span>STATT 29,90 €</span>
            </p>

            <div className="countdown-row" aria-label="Angebot Countdown">
              {countdown.map((item, idx) => (
                <div key={item.label} className="countdown-unit">
                  <div className="countdown-cell">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                  {idx < countdown.length - 1 && (
                    <span className="countdown-pipe" aria-hidden="true">|</span>
                  )}
                </div>
              ))}
            </div>

            <button type="button" className="cta-button hero-cta" onClick={openModal}>
              Angebot sichern
            </button>
          </div>
        </section>

        {/* ── OFFERS ── */}
        <section className="content-section offers-section" aria-labelledby="offers-heading">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Unsere Angebote</p>
            <h2 id="offers-heading">Alles für dein perfektes Training.</h2>
            <p>Klare Leistungen, starke Flächen und ein Setup, das sich nach Training anfühlt.</p>
          </div>

          <div className="offer-grid">
            {offers.map((offer, idx) => (
              <article
                key={offer.title}
                className="offer-card"
                data-reveal
                data-reveal-delay={idx + 1}
              >
                <div className="offer-icon" aria-hidden="true">
                  <offer.Icon />
                </div>
                <div className="offer-body">
                  <h3>{offer.title}</h3>
                  <p>{offer.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="content-section faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-heading">Häufig gestellte Fragen.</h2>
            <p>Die wichtigsten Antworten zum Angebot, zum Ablauf und zum Start im Studio.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;

              return (
                <article
                  key={faq.question}
                  className={`faq-item${isOpen ? " open" : ""}`}
                  data-reveal
                  data-reveal-delay={index + 1}
                >
                  <button
                    type="button"
                    id={`faq-trigger-${index}`}
                    className="faq-trigger"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="faq-question">{faq.question}</span>
                    <span className="faq-symbol" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen ? (
                    <div
                      className="faq-answer"
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="content-section testimonials-section" aria-labelledby="testimonials-heading">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Testimonials</p>
            <h2 id="testimonials-heading">Was unsere Mitglieder sagen.</h2>
            <p>Klare Stimmen aus dem Studio statt leere Werbephrasen.</p>
          </div>

          <div
            ref={trackRef}
            className="testimonial-track"
            aria-live="polite"
            aria-atomic="true"
            aria-label="Testimonial-Karussell, zum Wischen"
          >
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="testimonial-card">
                <div className="quote-mark" aria-hidden="true">&ldquo;</div>
                <p>{testimonial.quote}</p>
                <footer className="testimonial-footer">
                  <div className="avatar" aria-hidden="true">{testimonial.initials}</div>
                  <div className="testimonial-meta">
                    <strong className="testimonial-name">{testimonial.name}</strong>
                    <span className="testimonial-role">{testimonial.role}</span>
                    <StarRow count={testimonial.stars} />
                  </div>
                </footer>
              </article>
            ))}
          </div>

          <div className="carousel-controls">
            <button
              type="button"
              className={`carousel-button${carouselIndex === 0 ? " disabled" : ""}`}
              onClick={() => scrollToTestimonial(Math.max(carouselIndex - 1, 0))}
              disabled={carouselIndex === 0}
              aria-label="Vorherige Bewertung"
            >
              ←
            </button>
            <div className="carousel-dots" role="tablist" aria-label="Bewertung auswählen">
              {testimonials.map((t, index) => (
                <button
                  key={t.name}
                  type="button"
                  className={`carousel-dot${carouselIndex === index ? " active" : ""}`}
                  onClick={() => scrollToTestimonial(index)}
                  aria-label={`Gehe zu Bewertung ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className={`carousel-button${carouselIndex >= testimonials.length - 1 ? " disabled" : ""}`}
              onClick={() => scrollToTestimonial(Math.min(carouselIndex + 1, testimonials.length - 1))}
              disabled={carouselIndex >= testimonials.length - 1}
              aria-label="Nächste Bewertung"
            >
              →
            </button>
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section className="cta-band" aria-labelledby="cta-band-heading">
          <div className="cta-overlay" aria-hidden="true" />
          <div className="cta-band-content">
            <p className="eyebrow">Starte noch heute</p>
            <h2 id="cta-band-heading">Bereit für deine Transformation?</h2>
            <button type="button" className="cta-button" onClick={openModal}>
              Angebot sichern
            </button>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="page-footer">
        <span className="footer-copy">Konzept und Webentwicklung: WhatsApp Bot Landing</span>
        <nav className="footer-links" aria-label="Footer Navigation">
          <a href="/impressum">Impressum</a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a href="/datenschutz">Datenschutz</a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a href="/kuendigen">Verträge kündigen</a>
        </nav>
      </footer>

      {/* ── MODAL ── */}
      {isModalOpen ? (
        <div className="modal-shell" role="dialog" aria-modal="true" aria-labelledby="reserve-title">
          <div className="modal-backdrop" onClick={closeModal} />
          <div className="modal-card">
            <button type="button" className="modal-close" onClick={closeModal} aria-label="Schließen">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" />
              </svg>
            </button>

            <p className="eyebrow">Jetzt reservieren</p>
            <h2 id="reserve-title">Wir reservieren dein Angebot.</h2>
            <p className="modal-text">
              Trag dich kurz ein. Wir schlagen dir auf Wunsch direkt das nächste Studio in Deutschland vor.
            </p>

            <form className="reserve-form" onSubmit={handleSubmit} noValidate>
              <div className="field-grid two-cols">
                <label>
                  <span>Vorname *</span>
                  <input name="first_name" type="text" placeholder="Vorname" required autoComplete="given-name" />
                </label>
                <label>
                  <span>Nachname *</span>
                  <input name="last_name" type="text" placeholder="Nachname" required autoComplete="family-name" />
                </label>
              </div>

              <div className="field-grid">
                <label>
                  <span>Deine E-Mail Adresse *</span>
                  <input name="email" type="email" placeholder="name@beispiel.de" required autoComplete="email" />
                </label>
              </div>

              <div className="field-grid">
                <label>
                  <span>Telefon (Mobil) *</span>
                  <input name="phone_e164" type="tel" placeholder="+491701234567" required autoComplete="tel" />
                </label>
              </div>

              <div className="field-grid compact-grid">
                <label>
                  <span>Wähle dein Studio *</span>
                  <select
                    name="studio"
                    value={selectedStudio}
                    onChange={(event) => setSelectedStudio(event.target.value)}
                    required
                  >
                    <option value="">Wähle dein Studio *</option>
                    {studios.map((studio) => (
                      <option key={studio.slug} value={studio.slug}>
                        {studio.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="finder-box">
                  <p>{nearestStudioLabel}</p>
                  <button type="button" className="location-button" onClick={selectNearestStudio}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    Standort finden
                  </button>
                </div>
              </div>

              <div className="field-grid compact-grid">
                <label className="checkbox-row">
                  <input name="privacy" type="checkbox" />
                  <span>
                    Ich akzeptiere die <strong>Datenschutzerklärung</strong> *
                  </span>
                </label>

                <label className="checkbox-row muted">
                  <input name="whatsapp_opt_in" type="checkbox" defaultChecked />
                  <span>Ich moechte per WhatsApp zu meinem Angebot kontaktiert werden.</span>
                </label>

                <button type="submit" className="cta-button wide" disabled={formStatus === "loading"}>
                  {formStatus === "loading" ? (
                    <>
                      <svg className="spinner" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                        <path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      Bitte warten …
                    </>
                  ) : formStatus === "ok" ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 9l4 4 6-8" />
                      </svg>
                      Reserviert
                    </>
                  ) : "Weiter"}
                </button>

                {formMessage ? (
                  <p className={`form-message ${formStatus === "ok" ? "ok" : "err"}`} role="alert">
                    {formStatus === "ok" && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <circle cx="7" cy="7" r="6" />
                        <path d="M4 7l2 2 4-4" />
                      </svg>
                    )}
                    {formMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
