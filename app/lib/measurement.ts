export const MEASUREMENT_ID = "G-VPG7C4F0RB";
type TrackingWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
let allowed = false;
let started = false;
const paths = new Set(["/", "/about", "/services", "/contact", "/privacy", "/laptops", "/servers", "/workstations", "/network", "/storage", "/mobile", "/peripherals", "/blog", "/blog/dell-vs-hpe-servers", "/blog/it-hardware-procurement-guide", "/blog/it-hardware-sourcing-toronto", "/blog/business-laptops-toronto-buying-checklist", "/blog/workstation-sourcing-toronto-cad-design"]);
export function safePath(path: string) { return paths.has(path) ? path : "/other"; }
export function privacySignal() { return navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true; }
function production() { return ["torontogadgets.com", "www.torontogadgets.com"].includes(window.location.hostname); }
function disabled(value: boolean) { (window as unknown as Record<string, unknown>)[`ga-disable-${MEASUREMENT_ID}`] = value; }
export function clearAnalyticsCookies() {
  for (const part of document.cookie.split(";")) {
    const name = part.trim().split("=")[0];
    if (!/^(_ga|_gid|_gat|_clck|_clsk)/.test(name)) continue;
    for (const domain of ["", window.location.hostname, ".torontogadgets.com"])
      document.cookie = name + "=; Max-Age=0; path=/;" + (domain ? " domain=" + domain + ";" : "");
  }
}
export function setMeasurementConsent(accept: boolean) {
  allowed = accept && !privacySignal();
  disabled(!allowed);
  const w = window as TrackingWindow;
  if (!allowed) {
    // Opt-out flag takes effect before queued consent updates or pending tag downloads.
    w.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    clearAnalyticsCookies();
    return;
  }
  if (!production()) return;
  if (!started) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer!.push(arguments); };
    w.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    w.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    w.gtag("js", new Date());
    w.gtag("config", MEASUREMENT_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: "https://torontogadgets.com" + safePath(window.location.pathname), page_referrer: "", page_title: "Toronto Gadgets" });
    const script = document.createElement("script");
    script.id = "tg-consented-analytics";
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
    script.async = true;
    document.head.appendChild(script);
    started = true;
  } else {
    w.gtag?.("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  }
}
export function measure(name: "page_view" | "quote_start" | "quote_request_prepared" | "whatsapp_handoff" | "contact_click", method?: "email" | "phone" | "whatsapp") {
  if (!allowed || !production() || privacySignal()) return;
  const w = window as TrackingWindow;
  const parameters: Record<string, unknown> = {
    page_location: "https://torontogadgets.com" + safePath(window.location.pathname),
    page_referrer: "", page_title: "Toronto Gadgets",
  };
  const query = new URLSearchParams(window.location.search);
  if (query.get("tg_test") === "1") { parameters.debug_mode = true; parameters.test_record = 1; }
  if (method) parameters.contact_method = method;
  // Only declared, non-personal campaign codes are accepted; arbitrary query values never leave the site.
  const source = query.get("utm_source");
  if (source && ["google", "bing", "facebook", "instagram", "linkedin", "whatsapp"].includes(source)) parameters.campaign_source = source;
  const medium = query.get("utm_medium");
  if (medium && ["organic", "social", "referral"].includes(medium)) parameters.campaign_medium = medium;
  if (query.get("utm_campaign") === "profile") parameters.campaign_name = "profile";
  w.gtag?.("set", parameters);
  w.gtag?.("event", name, parameters);
}

