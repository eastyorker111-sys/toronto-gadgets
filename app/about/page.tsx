import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "About Us | Toronto Gadgets — Enterprise Hardware Sourcing Partner",
  description:
    "Toronto Gadgets is the trade name of East Yorker Corp, a federally incorporated Canadian company providing B2B enterprise technology sourcing across Canada, USA, and GCC.",
  alternates: { canonical: "https://torontogadgets.com/about" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://torontogadgets.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://torontogadgets.com/about",
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="shell content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeader
        label="About us"
        eyebrow="TORONTO ROOTS. YOUR BUSINESS IN MIND."
        title="A sourcing partner, built around you."
        description="Toronto Gadgets helps businesses find technology for the way they work. We start with your requirements and bring the sourcing options together."
      />
      <section className="story-grid">
        <h2>
          Technology is the product.
          <br />
          Understanding your needs comes first.
        </h2>
        <div className="body-copy">
          <p>
            Based in Toronto and operating under East Yorker Corp, we source
            servers, workstations, laptops, mobile devices, networking, storage
            and peripherals through reputable supplier and distributor networks.
          </p>
          <p>
            You can bring a specific model, a mixed equipment list or a project
            that still needs defining. We review the specifications, quantities
            and delivery requirements, then prepare a quote for you to consider.
          </p>
          <p>
            Tell us your delivery destination in Canada, the United States or
            the GCC. Availability, delivery options and manufacturer warranty
            where applicable are confirmed for each request.
          </p>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">HOW WE WORK</p>
            <h2>One request. A clear next step.</h2>
          </div>
        </div>
        <div className="feature-grid">
          {[
            [
              "01",
              "Your requirements lead",
              "We work from your specifications, intended use and budget. The examples on our website are starting points; your own items are welcome.",
            ],
            [
              "02",
              "A quote you can review",
              "Product details, quantities, availability and pricing are brought together before you decide how to proceed.",
            ],
            [
              "03",
              "A point of contact",
              "Bring sourcing questions, supplier clarifications and delivery requirements into one conversation with our team.",
            ],
          ].map(([number, title, text]) => (
            <article className="feature-card" key={number}>
              <span className="feature-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BEHIND YOUR REQUEST</p>
            <h2>Our team & responsibilities</h2>
          </div>
        </div>
        <div className="responsibility-grid">
          {[
            [
              "Sourcing & procurement",
              "Reviewing requirements and finding suitable business-grade equipment through supplier and distributor networks.",
            ],
            [
              "Vendor coordination",
              "Clarifying supplier details and assisting with manufacturer warranty and support enquiries where applicable.",
            ],
            [
              "Quote support",
              "Preparing quotes and comparing available configurations, pricing and lead times.",
            ],
            [
              "Delivery coordination",
              "Reviewing destinations, shipment details and the delivery arrangements available for your request.",
            ],
          ].map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="company-details content-section">
        <div>
          <p className="eyebrow">COMPANY INFORMATION</p>
          <h2>
            Toronto Gadgets
            <br />
            <span>East Yorker Corp</span>
          </h2>
        </div>
        <dl>
          {[
            ["Federal Corporation", "No. 1349551-5"],
            ["Ontario Corporation", "No. 1001482504"],
            ["Business Identification", "BIN 1001483714"],
            ["GST/HST Registration", "766421804RT0001"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="custom-request">
        <div>
          <h2>Tell us about your next project.</h2>
          <p>
            A model number, equipment list or a conversation is enough to get
            started.
          </p>
        </div>
        <Link href="/contact" className="button">
          Request a quote ↗
        </Link>
      </section>
    </div>
  );
}
