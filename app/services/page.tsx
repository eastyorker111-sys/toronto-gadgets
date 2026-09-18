import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Services | IT Hardware Sourcing & Procurement | Toronto Gadgets",
  description:
    "Enterprise IT hardware sourcing services: procurement consulting, bulk ordering, global logistics, vendor management, and lifecycle support for businesses across Canada, USA, and GCC.",
  alternates: { canonical: "https://torontogadgets.com/services" },
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
      name: "Services",
      item: "https://torontogadgets.com/services",
    },
  ],
};

const services = [
  {
    title: "Hardware Sourcing",
    desc: "We source enterprise hardware through reputable supplier and distributor networks. Servers, workstations, laptops, networking, storage — based on your requirements and supplier availability.",
    points: [
      "Dell, HPE, Lenovo, Cisco, Apple, Samsung",
      "Reputable supplier and distributor networks",
      "Custom configurations available",
    ],
  },
  {
    title: "Bulk Procurement",
    desc: "Quantity-based sourcing for team upgrades, infrastructure projects and office rollouts. Pricing and delivery arrangements are confirmed in your quote.",
    points: [
      "Quantity-based quotes for fleet projects",
      "Consolidated invoicing",
      "Delivery scheduling by arrangement",
    ],
  },
  {
    title: "Global Logistics",
    desc: "Tell us your destination in Canada, the United States or the GCC. We review available shipping options, timing and documentation requirements for your order.",
    points: [
      "Canada, USA, UAE, Saudi Arabia, Oman",
      "Cross-border shipping documentation support",
      "Tracking and insurance options where available",
    ],
  },
  {
    title: "Vendor Coordination",
    desc: "Single point of contact for multi-vendor environments. We manage supplier relationships, assist with manufacturer warranty support where applicable, and coordinate support escalations.",
    points: [
      "Multi-vendor management",
      "Manufacturer warranty support where applicable",
      "RMA & support coordination",
    ],
  },
  {
    title: "Quote Comparison",
    desc: "We provide competitive multi-vendor quotes so you can compare pricing, availability, and lead times before committing.",
    points: [
      "Side-by-side comparisons",
      "Transparent pricing",
      "Quotes tailored to your requirements",
    ],
  },
  {
    title: "Lifecycle Support",
    desc: "Discuss equipment refreshes, upgrades and support requirements as part of your sourcing request. The available support and scope are confirmed before you proceed.",
    points: [
      "Deployment planning",
      "Refresh & upgrade scheduling",
      "End-of-life requirements discussed on request",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="shell content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeader
        label="Sourcing services"
        eyebrow="FROM REQUIREMENTS TO A QUOTE"
        title="Less searching. More clarity."
        description="Bring your hardware requirements into one conversation. We help with sourcing, quote comparison and coordination around your project."
      />
      <div className="service-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.title}>
            <span className="feature-number">0{index + 1}</span>
            <h2>{service.title}</h2>
            <p>{service.desc}</p>
            <ul>
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <section className="service-brief content-section">
        <div>
          <p className="eyebrow">A BETTER BRIEF, A BETTER START</p>
          <h2>
            What to include
            <br />
            in your request.
          </h2>
          <p>Share what you know. We can clarify the rest with you.</p>
        </div>
        <ol>
          {[
            [
              "Equipment & quantities",
              "Model names, part numbers, product links or your own item list.",
            ],
            [
              "Specifications & purpose",
              "How it will be used, required compatibility, and whether alternatives are welcome.",
            ],
            [
              "Destination & timing",
              "Delivery city, country, preferred date and budget if you have one.",
            ],
          ].map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="custom-request">
        <div>
          <h2>Your project doesn’t need to fit a catalogue.</h2>
          <p>
            Request multiple items or describe what you need help finding. Scope
            and availability are confirmed in your quote.
          </p>
        </div>
        <Link href="/contact?mode=custom" className="button">
          Build your request ↗
        </Link>
      </section>
    </div>
  );
}
