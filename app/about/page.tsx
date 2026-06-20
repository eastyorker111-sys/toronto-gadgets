import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Toronto Gadgets — Enterprise Hardware Sourcing Partner",
  description: "Toronto Gadgets is the trade name of East Yorker Corp, a federally incorporated Canadian company providing B2B enterprise technology sourcing across Canada, USA, and GCC.",
  alternates: { canonical: "https://torontogadgets.com/about" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://torontogadgets.com/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6"><a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span><span className="text-slate-300">About</span></nav>

          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-6">About Toronto Gadgets</h1>

          <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
            <p>
              Toronto Gadgets is a B2B enterprise technology sourcing partner headquartered in Toronto, Canada. We source servers, workstations, laptops, mobile devices, network equipment, storage solutions, and peripherals through reputable supplier and distributor networks — delivering competitive quotes and genuine products to businesses across Canada, the United States, and the GCC region.
            </p>
            <p>
              Founded under East Yorker Corp, a federally incorporated Canadian corporation, Toronto Gadgets bridges the gap between enterprise buyers and global hardware supply chains. Whether you need a single workstation or a fleet of 500 servers, we provide the sourcing expertise, pricing transparency, and logistics coordination that enterprise procurement demands.
            </p>
          </div>

          {/* Trust Signals */}
          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {[
              { label: "Federal Corporation", value: "No. 1349551-5" },
              { label: "Ontario Corporation", value: "No. 1001482504" },
              { label: "Business Identification", value: "BIN 1001483714" },
              { label: "GST/HST Registration", value: "766421804RT0001" },
            ].map((item) => (
              <div key={item.label} className="bg-[#12151f] border border-white/10 rounded-xl p-4">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-sm text-white font-mono">{item.value}</div>
              </div>
            ))}
          </div>

          {/* What We Offer */}
          <h2 className="text-xl font-bold text-white mt-12 mb-6">Why Businesses Choose Us</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Trusted Sourcing", desc: "We procure through reputable supplier and distributor networks — genuine, business-grade technology, no grey market, and no refurbished units unless you request them." },
              { title: "Competitive Pricing", desc: "Our network of suppliers across North America enables volume pricing even for smaller orders." },
              { title: "Global Delivery", desc: "We ship across Canada, USA, and the GCC region with support for the standard shipping documentation and end-to-end tracking." },
            ].map((item) => (
              <div key={item.title} className="bg-[#12151f] border border-white/10 rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Team & Responsibilities */}
          <h2 className="text-xl font-bold text-white mt-12 mb-6">Our Team &amp; Responsibilities</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">Toronto Gadgets operates as a coordinated sourcing team rather than a storefront, organized around the core functions that business technology procurement depends on:</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Sourcing & Procurement", desc: "Identifies and procures genuine, business-grade hardware through reputable supplier and distributor networks, sourcing competitive pricing across North America." },
              { title: "Vendor Coordination", desc: "Acts as a single point of contact across multiple suppliers, assisting with manufacturer warranty support where applicable and coordinating returns and support escalations." },
              { title: "Quote Support", desc: "Prepares competitive, multi-supplier quotes with side-by-side comparisons, typically within 24 hours." },
              { title: "Logistics / Delivery Coordination", desc: "Coordinates cross-border shipping and end-to-end delivery tracking across Canada, the United States, and the GCC, with support for the standard documentation that accompanies international shipments." },
            ].map((item) => (
              <div key={item.title} className="bg-[#12151f] border border-white/10 rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mt-6">Across each function, our aim is procurement that is transparent, straightforward, and compliance-conscious.</p>

          {/* CTA */}
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
