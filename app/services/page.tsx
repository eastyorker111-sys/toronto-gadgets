import { Metadata } from "next";
import Link from "next/link";

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
    desc: "Volume pricing for fleet deployments, data center builds, and office rollouts. We work across supplier and distributor networks to source competitive rates.",
    points: [
      "Quantity-based quotes for fleet projects",
      "Consolidated invoicing",
      "Scheduled delivery windows",
    ],
  },
  {
    title: "Global Logistics",
    desc: "We coordinate shipping across Canada, the United States, and GCC countries with support for the standard shipping documentation, tracking, and insurance.",
    points: [
      "Canada, USA, UAE, Saudi Arabia, Oman",
      "Cross-border shipping documentation support",
      "Door-to-door tracking",
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
    desc: "From initial sourcing through deployment to refresh — we support the full hardware lifecycle for enterprise IT departments.",
    points: [
      "Deployment planning",
      "Refresh & upgrade scheduling",
      "Asset disposal coordination",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-[#676660] mb-6">
            <Link href="/" className="hover:text-[#a64037] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#555550]">Services</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#25282d] to-[#676660] bg-clip-text text-transparent mb-4">
            Our Services
          </h1>
          <p className="text-[#676660] text-sm mb-10 max-w-3xl">
            End-to-end enterprise hardware sourcing and procurement services for
            businesses that need reliable technology supply chains.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-[#fbf9f5] border border-[#dedbd4] rounded-2xl p-5 hover:border-[#a64037]/40 transition-all"
              >
                <h2 className="text-base font-bold text-[#25282d] mb-2">
                  {s.title}
                </h2>
                <p className="text-[#676660] text-xs leading-relaxed mb-3">
                  {s.desc}
                </p>
                <div className="space-y-1">
                  {s.points.map((pt) => (
                    <div
                      key={pt}
                      className="flex items-start gap-2 text-xs text-[#676660]"
                    >
                      <span className="text-[#a64037] mt-0.5">✓</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#a64037] to-[#a64037] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#a64037]/30 transition-all"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
