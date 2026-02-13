import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | IT Hardware Sourcing & Procurement | Toronto Gadgets",
  description: "Enterprise IT hardware sourcing services: procurement consulting, bulk ordering, global logistics, vendor management, and lifecycle support for businesses across Canada, USA, and GCC.",
  alternates: { canonical: "https://torontogadgets.com/services" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://torontogadgets.com/services" },
  ],
};

const services = [
  {
    title: "Hardware Sourcing",
    desc: "We source enterprise hardware from authorized distributors and OEM partners. Servers, workstations, laptops, networking, storage — any brand, any configuration.",
    points: ["Dell, HPE, Lenovo, Cisco, Apple, Samsung", "Authorized channel sourcing only", "Custom configurations available"],
  },
  {
    title: "Bulk Procurement",
    desc: "Volume pricing for fleet deployments, data center builds, and office rollouts. We negotiate directly with distributors to secure the best rates.",
    points: ["Fleet pricing for 10–10,000+ units", "Consolidated invoicing", "Scheduled delivery windows"],
  },
  {
    title: "Global Logistics",
    desc: "We coordinate shipping across Canada, the United States, and GCC countries with full customs documentation, tracking, and insurance.",
    points: ["Canada, USA, UAE, Saudi Arabia, Oman", "Customs clearance support", "Door-to-door tracking"],
  },
  {
    title: "Vendor Coordination",
    desc: "Single point of contact for multi-vendor environments. We manage supplier relationships, warranty registrations, and support escalations.",
    points: ["Multi-vendor management", "Warranty registration", "RMA & support coordination"],
  },
  {
    title: "Quote Comparison",
    desc: "We provide competitive multi-vendor quotes so you can compare pricing, availability, and lead times before committing.",
    points: ["Side-by-side comparisons", "Transparent pricing", "24-hour quote turnaround"],
  },
  {
    title: "Lifecycle Support",
    desc: "From initial sourcing through deployment to refresh — we support the full hardware lifecycle for enterprise IT departments.",
    points: ["Deployment planning", "Refresh & upgrade scheduling", "Asset disposal coordination"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6"><a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span><span className="text-slate-300">Services</span></nav>

          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-4">Our Services</h1>
          <p className="text-slate-400 text-sm mb-10 max-w-3xl">End-to-end enterprise hardware sourcing and procurement services for businesses that need reliable technology supply chains.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.title} className="bg-[#12151f] border border-white/10 rounded-2xl p-5 hover:border-cyan-500/40 transition-all">
                <h2 className="text-base font-bold text-white mb-2">{s.title}</h2>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">{s.desc}</p>
                <div className="space-y-1">
                  {s.points.map((pt) => (
                    <div key={pt} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-cyan-400 mt-0.5">✓</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
              Request a Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
