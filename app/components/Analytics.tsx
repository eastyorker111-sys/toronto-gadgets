"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { measure, privacySignal, setMeasurementConsent } from "../lib/measurement";
const KEY = "tg-analytics-choice-v2";
type Choice = "accepted" | "rejected" | null;
export default function Analytics() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const lastPage = useRef("");
  useEffect(() => {
    const signal = privacySignal();
    setBlocked(signal);
    let saved: Choice = null;
    try { const v = localStorage.getItem(KEY); if (v === "accepted" || v === "rejected") saved = v; } catch { setStorageError(true); }
    const effective = signal ? "rejected" : saved;
    setChoice(effective);
    setOpen(!saved && !signal);
    setReady(true);
    setMeasurementConsent(effective === "accepted");
    const sync = (event: StorageEvent) => {
      if (event.key === KEY || event.key === null) {
        const next = event.newValue === "accepted" && !privacySignal() ? "accepted" : "rejected";
        setChoice(next); setMeasurementConsent(next === "accepted");
      }
    };
    window.addEventListener("storage", sync);
    const clicks = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link || link.hasAttribute("data-quote-handoff")) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("mailto:")) measure("contact_click", "email");
      else if (href.startsWith("tel:")) measure("contact_click", "phone");
      else if (href.startsWith("https://api.whatsapp.com/") || href.startsWith("https://wa.me/")) measure("contact_click", "whatsapp");
    };
    document.addEventListener("click", clicks);
    return () => { window.removeEventListener("storage", sync); document.removeEventListener("click", clicks); };
  }, []);
  useEffect(() => {
    if (ready) setMeasurementConsent(choice === "accepted");
    if (!ready || choice !== "accepted") { lastPage.current = ""; return; }
    if (lastPage.current !== pathname) { measure("page_view"); lastPage.current = pathname; }
  }, [pathname, choice, ready]);
  function choose(next: Exclude<Choice, null>) {
    if (privacySignal()) next = "rejected";
    try { localStorage.setItem(KEY, next); } catch { setStorageError(true); }
    setMeasurementConsent(next === "accepted");
    setChoice(next); setOpen(false);
  }
  if (!ready) return null;
  return <>
    <button type="button" className="cookie-settings" onClick={() => setOpen(!open)} aria-expanded={open}>Cookie choices</button>
    {open && <section className="cookie-panel" aria-label="Cookie choices">
      <h2>Your privacy choices</h2>
      <p>With your permission, Google Analytics measures page visits, contact-button clicks and quote progress. We exclude your contact details and item descriptions. Your quote works without analytics. <a href="/privacy">Privacy information</a></p>
      <p>Current choice: {choice === "accepted" ? "analytics allowed" : "optional tracking off"}.</p>
      {blocked && <p>Your browser privacy signal keeps optional tracking off.</p>}
      {storageError && <p>Your browser cannot save this choice; you may be asked again.</p>}
      <div><button type="button" onClick={() => choose("rejected")}>Reject optional tracking</button><button type="button" disabled={blocked} onClick={() => choose("accepted")}>Accept analytics</button><button type="button" onClick={() => setOpen(false)}>Close</button></div>
    </section>}
  </>;
}
