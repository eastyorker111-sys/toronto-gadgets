"use client";
import { FormEvent, useRef, useState } from "react";
import catalog from "../data/catalog.json";

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
      category: category?.slug ?? (help ? "other" : ""),
      choice: help ? "unsure" : !custom && knownItem ? initialItem : "custom",
      model: knownItem ? "" : initialItem,
    },
  ]);
  const nextId = useRef(2);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
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
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    data.set("items", itemSummary);
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/mdaeqapz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const result = await response.json();
      setStatus(response.ok && result.ok === true ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }
  if (status === "success")
    return (
      <div className="quote-success" role="status">
        <p className="eyebrow">REQUEST RECEIVED</p>
        <h2>Thanks for sharing your requirements.</h2>
        <p>
          Your quote request was submitted successfully. We’ll review it and
          reply using the contact details you provided.
        </p>
        <p>This is a sourcing enquiry, not an order or a payment.</p>
        <a className="button" href="/contact">
          Start another request
        </a>
      </div>
    );
  return (
    <form
      className="quote-form"
      action="https://formspree.io/f/mdaeqapz"
      method="POST"
      onSubmit={submit}
    >
      <input
        type="hidden"
        name="_subject"
        value="Toronto Gadgets — B2B sourcing request"
      />
      <input type="hidden" name="items" value={itemSummary} />
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="company-website">Leave this field empty</label>
        <input
          id="company-website"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <fieldset disabled={status === "sending"} className="quote-fields">
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
      <fieldset disabled={status === "sending"} className="quote-fields">
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
      <fieldset disabled={status === "sending"} className="quote-fields">
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
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
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
        Submitting asks us to prepare a quote. It does not place an order. Final
        specifications, pricing, delivery and manufacturer warranty where
        applicable are confirmed before you proceed.
      </p>
      {status === "error" && (
        <p className="form-error" role="alert">
          We couldn’t confirm submission. Your entries are still here. Please
          try again, or email torontogadgets1001@gmail.com or call +1 (437)
          237-6895.
        </p>
      )}
      <button
        type="submit"
        className="button submit-quote"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending request…" : "Send quote request ↗"}
      </button>
    </form>
  );
}
