"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import catalog from "../data/catalog.json";
import { prepareQuote } from "../lib/quote-draft";
import { measure } from "../lib/measurement";

type Item = {
  id: number;
  category: string;
  choice: string;
  model: string;
  specs: string;
  quantity: string;
};
const emptyItem = (id: number): Item => ({
  id,
  category: "",
  choice: "custom",
  model: "",
  specs: "",
  quantity: "1",
});
export default function QuoteForm({
  initialCategory = "",
  initialItem = "",
  custom = false,
  help = false,
}: {
  initialCategory?: string;
  initialItem?: string;
  custom?: boolean;
  help?: boolean;
}) {
  const category = catalog.find((c) => c.slug === initialCategory);
  const knownItem = category?.products.includes(initialItem);
  const [items, setItems] = useState<Item[]>([
    {
      ...emptyItem(1),
      category:
        category?.slug ?? (help || initialCategory === "other" ? "other" : ""),
      choice: help ? "unsure" : !custom && knownItem ? initialItem : "custom",
      model: knownItem ? "" : initialItem,
    },
  ]);
  const nextId = useRef(2);
  const requestId = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [draft, setDraft] = useState<ReturnType<typeof prepareQuote> | null>(null);
  const [copyMessage, setCopyMessage] = useState("");
  const started = useRef(false);
  const update = (id: number, patch: Partial<Item>) =>
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  const itemSummary = items
    .map(
      (item, i) =>
        `${i + 1}. Category: ${catalog.find((c) => c.slug === item.category)?.title ?? "Other / unsure"}\nItem: ${item.choice === "custom" ? item.model : item.choice === "unsure" ? "Please recommend options" : item.choice}\nQuantity: ${item.quantity}\nSpecifications / product link / use case: ${item.specs}`,
    )
    .join("\n\n");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    requestId.current ??= `TG-${crypto.randomUUID()}`;
    const data = new FormData(event.currentTarget);
    const fields = Object.fromEntries(Array.from(data.entries()).map(([key, value]) => [key, String(value)]));
    setDraft(prepareQuote(requestId.current, itemSummary, fields));
    setCopyMessage("");
    measure("quote_request_prepared");
  }
  async function copyDraft() {
    if (!draft) return;
    try { await navigator.clipboard.writeText(draft.text); setCopyMessage("Copied. Paste this full request into WhatsApp, then press Send."); }
    catch { setCopyMessage("Copy was unavailable. Select the full request below and copy it manually."); }
  }
  return (
    <div>
    {draft && <section className="quote-success quote-form" aria-label="Review your WhatsApp request">
      <p className="eyebrow">REQUEST PREPARED — NOT SENT</p>
      <h2>Review, then send in WhatsApp.</h2>
      <p>We receive your request only after you press Send in WhatsApp. The number is shared across our businesses; keep “Toronto Gadgets” and the reference in your message.</p>
      <label htmlFor="prepared-request">Your complete request</label>
      <textarea id="prepared-request" rows={14} readOnly value={draft.text} onFocus={(event) => event.currentTarget.select()} />
      {draft.needsPaste && <p>Your list is too long for a WhatsApp link. Copy the complete request, open WhatsApp, then paste it into the chat and press Send. The link includes only your reference.</p>}
      <button type="button" className="secondary-button" onClick={copyDraft}>Copy complete request</button>
      <p role="status">{copyMessage}</p>
      <a className="button" href={draft.url} target="_blank" rel="noopener noreferrer" data-quote-handoff="true" onClick={() => measure("whatsapp_handoff")}>Open WhatsApp to send ↗</a>
      <button type="button" className="secondary-button" onClick={() => setDraft(null)}>Edit request</button>
      <p>This is an enquiry, not an order or payment. If WhatsApp is unavailable, copy the request into an email to <a href="mailto:torontogadgets1001@gmail.com">torontogadgets1001@gmail.com</a>.</p>
    </section>}
    <form
      className="quote-form"
      hidden={!!draft}
      onSubmit={submit}
      onFocus={() => { if (!started.current) { measure("quote_start"); started.current = true; } }}
    >
      <noscript><p>Enable JavaScript to prepare a request, or contact <a href="https://wa.me/14372376895">Toronto Gadgets on WhatsApp</a> or email torontogadgets1001@gmail.com.</p></noscript>
      <fieldset className="quote-fields">
        <legend>1. What do you need?</legend>
        <p className="field-help">
          Choose an example model, enter your own item, or ask us to suggest
          options. Add more items for a mixed request.
        </p>
        {items.map((item, index) => (
          <fieldset className="quote-item" key={item.id}>
            <legend>Item {index + 1}</legend>
            <div className="field-row">
              <div>
                <label htmlFor={`category-${item.id}`}>Category *</label>
                <select
                  id={`category-${item.id}`}
                  value={item.category}
                  onChange={(e) =>
                    update(item.id, {
                      category: e.target.value,
                      choice: "custom",
                    })
                  }
                  required
                >
                  <option value="">Choose a category</option>
                  {catalog.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                  <option value="other">Other / not sure</option>
                </select>
              </div>
              <div>
                <label htmlFor={`choice-${item.id}`}>
                  How would you like to choose?
                </label>
                <select
                  id={`choice-${item.id}`}
                  value={item.choice}
                  onChange={(e) => update(item.id, { choice: e.target.value })}
                >
                  <option value="custom">Enter my own item or model</option>
                  <option value="unsure">Help me choose</option>
                  {catalog
                    .find((c) => c.slug === item.category)
                    ?.products.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {item.choice === "custom" && (
              <div>
                <label htmlFor={`model-${item.id}`}>Your item or model *</label>
                <input
                  id={`model-${item.id}`}
                  required
                  maxLength={250}
                  value={item.model}
                  onChange={(e) => update(item.id, { model: e.target.value })}
                  placeholder="e.g. a specific model, docking station, or office laptop"
                />
              </div>
            )}
            <div className="field-row quantity-row">
              <div>
                <label htmlFor={`quantity-${item.id}`}>Quantity *</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={item.quantity}
                  onChange={(e) =>
                    update(item.id, { quantity: e.target.value })
                  }
                />
              </div>
              <p className="field-help">
                Pricing and availability are confirmed for your exact
                requirements.
              </p>
            </div>
            <div>
              <label htmlFor={`specs-${item.id}`}>
                {item.choice === "unsure"
                  ? "Tell us what it needs to do *"
                  : "Specifications or product link (optional)"}
              </label>
              <textarea
                id={`specs-${item.id}`}
                rows={3}
                maxLength={4000}
                required={item.choice === "unsure"}
                value={item.specs}
                onChange={(e) => update(item.id, { specs: e.target.value })}
                placeholder="CPU, RAM, storage, GPU, accessories, or a link. Not sure? Describe your workload and budget."
              />
            </div>
            {items.length > 1 && (
              <button
                className="remove-item"
                type="button"
                onClick={() =>
                  setItems((current) =>
                    current.filter((row) => row.id !== item.id),
                  )
                }
              >
                Remove item {index + 1}
              </button>
            )}
          </fieldset>
        ))}
        <button
          type="button"
          className="secondary-button"
          disabled={items.length >= 20}
          onClick={() =>
            setItems((current) => [...current, emptyItem(nextId.current++)])
          }
        >
          + Add another item
        </button>
        {items.length >= 20 && (
          <p className="field-help">
            For more than 20 items, include the remaining list in your project
            notes.
          </p>
        )}
      </fieldset>
      <fieldset className="quote-fields">
        <legend>2. Where should it go?</legend>
        <div className="field-row">
          <div>
            <label htmlFor="delivery">Delivery city and country *</label>
            <input
              id="delivery"
              name="delivery"
              required
              maxLength={250}
              autoComplete="off"
              placeholder="e.g. Toronto, Canada"
            />
          </div>
          <div>
            <label htmlFor="timeline">When do you need it?</label>
            <input
              id="timeline"
              name="timeline"
              maxLength={200}
              placeholder="e.g. next month, or flexible"
            />
          </div>
        </div>
        <label htmlFor="message">Budget and project notes (optional)</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={6000}
          placeholder="Budget and currency, new or refurbished preference, alternatives, warranty requirements, or additional items."
        />
      </fieldset>
      <fieldset className="quote-fields">
        <legend>3. How can we reach you?</legend>
        <div className="field-row">
          <div>
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              maxLength={150}
            />
          </div>
          <div>
            <label htmlFor="email">Email (optional)</label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              maxLength={250}
            />
          </div>
          <div>
            <label htmlFor="company">Company *</label>
            <input
              id="company"
              name="company"
              autoComplete="organization"
              required
              maxLength={200}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone (optional)</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              maxLength={50}
            />
          </div>
        </div>
      </fieldset>
      <details className="request-review">
        <summary>Review your item list ({items.length})</summary>
        <pre>{itemSummary}</pre>
      </details>
      <p className="field-help">
        Your draft stays on this page until you choose to open WhatsApp or copy it. WhatsApp receives the prepared text when you open the link; press Send there to deliver it to us.
        This does not subscribe you to marketing. Please do not include passwords or payment card details.
        {" "}<a href="/privacy">Read our privacy information</a>.
      </p>
      <p className="field-help">
        Sending your request in WhatsApp asks us to prepare a quote. It does not place an order. Final
        specifications, pricing, delivery and manufacturer warranty where
        applicable are confirmed before you proceed.
      </p>
      <button type="submit" className="button submit-quote" disabled={!ready}>
        Review WhatsApp request ↗
      </button>
    </form>
    </div>
  );
}
