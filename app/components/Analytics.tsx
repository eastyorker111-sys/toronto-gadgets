"use client";
import { useEffect, useState } from "react";
const KEY = "tg-analytics-choice-v1";
type Choice = "accepted" | "rejected" | null;
export default function Analytics() {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [storageError, setStorageError] = useState(false);
  function clearCookies() {
    for (const part of document.cookie.split(";")) {
      const name = part.trim().split("=")[0];
      if (!/^(_ga|_gid|_gat|_clck|_clsk)/.test(name)) continue;
      for (const domain of ["", window.location.hostname, ".torontogadgets.com"])
        document.cookie = name + "=; Max-Age=0; path=/;" + (domain ? " domain=" + domain + ";" : "");
    }
  }
  useEffect(() => {
    const signal = navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    setBlocked(signal);
    let saved: Choice = null;
    try { const v = localStorage.getItem(KEY); if (v === "accepted" || v === "rejected") saved = v; } catch { setStorageError(true); }
    setChoice(signal ? "rejected" : saved);
    setOpen(!saved && !signal);
    setReady(true);
    clearCookies();
    const sync = (event: StorageEvent) => {
      if (event.key === KEY) {
        setChoice(event.newValue === "accepted" && !signal ? "accepted" : "rejected");
        clearCookies();
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function choose(next: Exclude<Choice, null>) {
    if (blocked) next = "rejected";
    try { localStorage.setItem(KEY, next); } catch { setStorageError(true); }
    setChoice(next);
    setOpen(false);
    clearCookies();
  }
  // No optional provider is loaded. Reconnection requires GA4 automatic event,
  // URL and referrer collection to be checked in the account first.
  if (!ready) return null;
  return <>
    <button type="button" className="cookie-settings" onClick={() => setOpen(!open)} aria-expanded={open}>Cookie choices</button>
    {open && <section className="cookie-panel" aria-label="Cookie choices">
      <h2>Your privacy choices</h2>
      <p>Optional analytics is currently paused. You can save a preference for anonymous visit measurement. Your quote works either way. <a href="/privacy">Privacy information</a></p>
      <p>Current choice: {choice === "accepted" ? "analytics allowed, currently paused" : "optional tracking off"}.</p>
      {blocked && <p>Your browser privacy signal keeps optional tracking off.</p>}
      {storageError && <p>Your browser cannot save this choice; you may be asked again.</p>}
      <div><button type="button" onClick={() => choose("rejected")}>Reject optional tracking</button><button type="button" disabled={blocked} onClick={() => choose("accepted")}>Allow analytics when available</button><button type="button" onClick={() => setOpen(false)}>Close</button></div>
    </section>}
  </>;
}
