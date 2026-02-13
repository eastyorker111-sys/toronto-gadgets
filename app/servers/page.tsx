import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Servers | Dell, HPE, Lenovo, Cisco | Toronto Gadgets",
  description: "Source enterprise rack and tower servers: Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Cisco UCS, Supermicro. Competitive B2B quotes within 24 hours.",
  alternates: { canonical: "https://torontogadgets.com/servers" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Enterprise Servers", item: "https://torontogadgets.com/servers" },
  ],
};

const products = [
  { name: "Dell PowerEdge R760", specs: "2× Intel Xeon Gold 6430 · 256 GB DDR5 · 4× 1.92 TB NVMe SSD", tags: ["2U Rack", "iDRAC9", "5yr Warranty"] },
  { name: "Dell PowerEdge R750xs", specs: "2× Intel Xeon Silver 4410T · 128 GB DDR5 · 8× 2.4 TB SAS", tags: ["2U Rack", "PERC H755", "Redundant PSU"] },
  { name: "Dell PowerEdge R660", specs: "2× Intel Xeon Gold 5415+ · 192 GB DDR5 · 8× 1.92 TB NVMe", tags: ["1U Dense", "GPU Ready", "PCIe Gen5"] },
  { name: "HPE ProLiant DL380 Gen11", specs: "2× Intel Xeon Silver 4410Y · 128 GB DDR5 · 8× 2.4 TB SAS", tags: ["Smart Array", "iLO Advanced", "Tool-free"] },
  { name: "HPE ProLiant DL360 Gen11", specs: "2× Intel Xeon Gold 5415+ · 256 GB DDR5 · 4× 1.92 TB NVMe", tags: ["1U Form", "iLO Adv", "PCIe Gen5"] },
  { name: "HPE ProLiant ML350 Gen11", specs: "2× Intel Xeon Gold 5415+ · 128 GB DDR5 · 8× 2.4 TB SAS", tags: ["Tower", "Expandable", "Quiet"] },
  { name: "Lenovo ThinkSystem SR650 V3", specs: "2× Intel Xeon Gold 5415+ · 256 GB DDR5 · 6× 1.92 TB SSD", tags: ["AnyBay Flex", "GPU Ready", "XClarity"] },
  { name: "Lenovo ThinkSystem SR630 V3", specs: "2× Intel Xeon Gold 5415+ · 128 GB DDR5 · 10× 2.5″ Bays", tags: ["1U Compact", "XClarity", "PCIe Gen5"] },
  { name: "Cisco UCS C240 M7", specs: "2× Intel Xeon Gold 6430 · 512 GB DDR5 · 24× NVMe Bays", tags: ["24 NVMe", "Cisco UCS", "High Density"] },
  { name: "Supermicro SYS-620P-TRT", specs: "2× Intel Xeon Gold 5415+ · 256 GB DDR5 · 8× 3.5″ Bays", tags: ["2U Twin", "IPMI", "Cost Efficient"] },
];

const categories = [
  { href: "/laptops", label: "Laptops" },
  { href: "/workstations", label: "Workstations" },
  { href: "/network", label: "Network" },
  { href: "/storage", label: "Storage" },
  { href: "/mobile", label: "Mobile" },
  { href: "/peripherals", label: "Peripherals" },
];

export default function ServersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-xs text-slate-500 mb-6">
            <a href="/" className="hover:text-cyan-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Enterprise Servers</span>
          </nav>

          <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Enterprise Servers</h1>
            <a href="/contact" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
              Request Quote
            </a>
          </div>
          <p className="text-slate-400 text-sm mb-8 max-w-3xl">
            Browse enterprise rack and tower servers from Dell, HPE, Lenovo, Cisco, and Supermicro. All pricing on request — submit a quote for current availability and competitive rates.
          </p>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {products.map((p) => (
              <div key={p.name} className="bg-[#12151f] border border-white/10 rounded-2xl p-5 hover:border-cyan-500/40 transition-all">
                <h2 className="text-base font-bold text-white">{p.name}</h2>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{p.specs}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-400">{t}</span>
                  ))}
                </div>
                <a href="/contact" className="inline-block mt-4 text-cyan-400 text-xs font-semibold hover:text-cyan-300 transition-colors">Get Quote →</a>
              </div>
            ))}
          </div>

          {/* Cross-Navigation */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-sm font-semibold text-slate-400 mb-4">Browse Other Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <a key={c.href} href={c.href} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
