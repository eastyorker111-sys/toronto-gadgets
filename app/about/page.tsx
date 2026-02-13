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
              Toronto Gadgets is a B2B enterprise technology sourcing partner headquartered in Toronto, Canada. We source servers, workstations, laptops, mobile devices, network equipment, storage solutions, and peripherals from authorized channels — delivering competitive quotes and genuine products to businesses across Canada, the United States, and the GCC region.
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
              { title: "Authorized Sourcing", desc: "We procure from authorized distributors and OEM channels — no grey market, no refurbished unless requested." },
              { title: "Competitive Pricing", desc: "Our network of suppliers across North America enables volume pricing even for smaller orders." },
              { title: "Global Delivery", desc: "We ship across Canada, USA, and the GCC region with full customs documentation and tracking." },
            ].map((item) => (
              <div key={item.title} className="bg-[#12151f] border border-white/10 rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

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
