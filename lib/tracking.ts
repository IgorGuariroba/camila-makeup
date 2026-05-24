declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, string>) {
  window.gtag?.("event", eventName, params);
}

export function trackMetaEvent(eventName: string, params?: Record<string, string>) {
  window.fbq?.("track", eventName, params);
}

export function trackFormSubmit(servico: string) {
  trackEvent("qualify_lead", {
    event_category: "lead",
    event_label: servico,
  });
  trackMetaEvent("Lead", { content_name: servico });
}

export function trackWhatsAppClick(source: string) {
  trackEvent("whatsapp_click", {
    event_category: "engagement",
    event_label: source,
  });
  trackMetaEvent("Contact", { content_name: source });
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

export function getStoredUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("utm_params") || "{}");
  } catch {
    return {};
  }
}

export function storeUtmParams() {
  const utm = getUtmParams();
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem("utm_params", JSON.stringify(utm));
  }
}
