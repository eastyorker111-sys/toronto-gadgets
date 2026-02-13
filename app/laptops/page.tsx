import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Laptops | Dell, HP, Lenovo, Apple | Toronto Gadgets",
  description: "Source business laptops: MacBook Pro, Dell Latitude/XPS, Lenovo ThinkPad, HP EliteBook/ZBook. Bulk pricing and B2B quotes within 24 hours.",
  alternates: { canonical: "https://torontogadgets.com/laptops" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Business Laptops", item: "https://torontogadgets.com/laptops" },
  ],
};

const products = [
  { name: "MacBook Pro 16″ M3 Pro", specs: "Apple M3 Pro · 18 GB RAM · 512 GB SSD · 16.2″ Liquid Retina XDR", tags: ["macOS", "18hr Battery", "ProRes"] },
  { name: "MacBook Pro 14″ M3", specs: "Apple M3 · 16 GB RAM · 512 GB SSD · 14.2″ Liquid Retina XDR", tags: ["macOS", "Compact", "MagSafe"] },
  { name: "MacBook Air 15″ M3", specs: "Apple M3 · 16 GB RAM · 256 GB SSD · 15.3″ Liquid Retina", tags: ["macOS", "Fanless", "1.51 kg"] },
  { name: "Dell Latitude 5550", specs: "Intel Core Ultra 7 · 16 GB DDR5 · 512 GB SSD · 15.6″ FHD", tags: ["vPro", "Smart Card", "MIL-STD"] },
  { name: "Dell XPS 15 9530", specs: "Intel Core i7-13700H · 32 GB DDR5 · 1 TB SSD · 15.6″ 3.5K OLED", tags: ["OLED", "Thunderbolt 4", "CNC Aluminum"] },
  { name: "Lenovo ThinkPad T14s Gen 5", specs: "Intel Core Ultra 7 · 32 GB DDR5 · 512 GB SSD · 14″ 2.8K OLED", tags: ["vPro", "1.24 kg", "TrackPoint"] },
  { name: "Lenovo ThinkPad X1 Carbon Gen 12", specs: "Intel Core Ultra 7 · 32 GB DDR5 · 1 TB SSD · 14″ 2.8K OLED", tags: ["Flagship", "1.08 kg", "vPro"] },
  { name: "HP EliteBook 860 G11", specs: "Intel Core Ultra 7 · 32 GB DDR5 · 512 GB SSD · 16″ WQXGA", tags: ["Sure View", "Wolf Security", "5G Option"] },
  { name: "HP ZBook Firefly 16 G11", specs: "Intel Core Ultra 7 · 32 GB DDR5 · 1 TB SSD · NVIDIA RTX A500", tags: ["ISV Certified", "CAD/CAM", "MIL-STD"] },
];

const categories = [
  { href: "/servers", label: "Servers" }, { href: "/workstations", label: "Workstations" },
  { href: "/network", label: "Network" }, { href: "/storage", label: "Storage" },
  { href: "/mobile", label: "Mobile" }, { href: "/peripherals", label: "Peripherals" },
];

export default function LaptopsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6"><a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span><span className="text-slate-300">Business Laptops</span></nav>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Business Laptops</h1>
            <a href="/contact" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all">Request Quote</a>
          </div>
          <p className="text-slate-400 text-sm mb-8 max-w-3xl">Enterprise-grade laptops from Apple, Dell, Lenovo, and HP. Built for business — sourced at competitive rates with bulk pricing available.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {products.map((p) => (
              <div key={p.name} className="bg-[#12151f] border border-white/10 rounded-2xl p-5 hover:border-cyan-500/40 transition-all">
                <h2 className="text-base font-bold text-white">{p.name}</h2>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{p.specs}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">{p.tags.map((t) => (<span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-400">{t}</span>))}</div>
                <a href="/contact" className="inline-block mt-4 text-cyan-400 text-xs font-semibold hover:text-cyan-300 transition-colors">Get Quote →</a>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-sm font-semibold text-slate-400 mb-4">Browse Other Categories</h3>
            <div className="flex flex-wrap gap-2">{categories.map((c) => (<a key={c.href} href={c.href} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all">{c.label}</a>))}</div>
          </div>
        </div>
      </section>
    </>
  );
}
