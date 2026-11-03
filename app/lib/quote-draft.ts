export function prepareQuote(reference: string, items: string, fields: Record<string, string>) {
  const text = ["Toronto Gadgets — sourcing enquiry", `Reference: ${reference}`, items,
    ...[["Name", "name"], ["Company", "company"], ["Email", "email"], ["Phone", "phone"], ["Delivery", "delivery"], ["Timeline", "timeline"], ["Notes", "message"]].map(([label, key]) => `${label}: ${fields[key]?.trim() || "Not provided"}`),
    "Please review my requirements and confirm pricing and availability. This is an enquiry, not an order."
  ].join("\n\n");
  const base = "https://wa.me/14372376895?text=";
  const fullUrl = base + encodeURIComponent(text);
  const needsPaste = fullUrl.length > 6000;
  const url = needsPaste ? base + encodeURIComponent(`Toronto Gadgets — sourcing enquiry\nReference: ${reference}\nI will paste my full request in this chat.`) : fullUrl;
  return { reference, text, url, needsPaste };
}
