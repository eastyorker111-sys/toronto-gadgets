import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "../components/QuoteForm";
import { contactLinks } from "../data/contact";
export const metadata: Metadata = {
  title: "Request a B2B Sourcing Quote in Toronto | Toronto Gadgets",
  description:
    "Request business technology from a Toronto-based sourcing provider. Choose an example model, add your own items, or ask for options. All pricing by quotation.",
  alternates: { canonical: "https://torontogadgets.com/contact" },
};
export default async function ContactPage(
  props: {
    searchParams: Promise<{ category?: string; item?: string; mode?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const category =
    typeof searchParams.category === "string" ? searchParams.category : "";
  const item =
    typeof searchParams.item === "string"
      ? searchParams.item.slice(0, 250)
      : "";
  return (
    <div className="shell quote-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span aria-current="page">Request a quote</span>
      </nav>
      <p className="eyebrow">TORONTO-BASED TECHNOLOGY SOURCING</p>
      <h1>Tell us what you need.</h1>
      <p className="intro quote-intro">
        Your list. Your specifications. One sourcing request. Select a product
        below or tell us about an item that isn’t on our website.
      </p>
      <div className="quote-layout">
        <QuoteForm
          key={`${category}:${item}:${searchParams.mode}`}
          initialCategory={category}
          initialItem={item}
          custom={searchParams.mode === "custom"}
          help={searchParams.mode === "help"}
        />
        <aside className="quote-aside">
          <h2>A quote built around you.</h2>
          <p>
            We review your requirements, check sourcing options, and follow up
            with pricing and availability.
          </p>
          <h3>Contact directly</h3>
          <a href="tel:+14372376895">+1 (437) 237-6895</a>
          <a href="mailto:torontogadgets1001@gmail.com">
            torontogadgets1001@gmail.com
          </a>
          <a href={contactLinks.whatsApp} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp ↗
          </a>
          <a href={contactLinks.linkedIn} target="_blank" rel="noopener noreferrer">
            Toronto Gadgets on LinkedIn ↗
          </a>
          <h3>Based in Toronto</h3>
          <a href={contactLinks.googleMaps} target="_blank" rel="noopener noreferrer">
            View our Google Maps profile ↗
          </a>
          <p>Sourcing and delivery service. Please contact us online for a quote.</p>
          <p>
            75 Thorncliffe Park Drive
            <br />
            Toronto, Ontario M4H 1L4
            <br />
            Canada
          </p>
          <h3>Delivery requirements</h3>
          <p>
            Tell us your destination in Canada, the United States, or the GCC.
            Delivery options and timing are confirmed for each request.
          </p>
          <h3>What happens next?</h3>
          <ol>
            <li>We review your requirements.</li>
            <li>We clarify specifications if needed.</li>
            <li>You receive a quote to review.</li>
          </ol>
        </aside>
      </div>
    </div>
  );
}
