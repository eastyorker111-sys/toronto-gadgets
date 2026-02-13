import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workstations | Dell Precision, HP Z, Lenovo ThinkStation | Toronto Gadgets",
  description: "Source professional workstations: Dell Precision, HP Z series, Lenovo ThinkStation, Mac Studio & Mac Pro. ISV-certified configs for CAD, rendering, and AI.",
  alternates: { canonical: "https://torontogadgets.com/workstations" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Workstations", item: "https://torontogadgets.com/workstations" },
  ],
};

const products = [
  { name: "Dell Precision 7875 Tower", specs: "AMD Threadripper PRO 7975WX · 128 GB DDR5 · NVIDIA RTX 5000 Ada · 2 TB NVMe", tags: ["64-Core", "ISV Cert", "4× GPU Slots"] },
  { name: "Dell Precision 5860 Tower", specs: "Intel Xeon W5-3433 · 64 GB DDR5 · NVIDIA RTX A4000 · 1 TB NVMe", tags: ["Compact Tower", "ISV Cert", "vPro"] },
  { name: "Dell Precision 5690 Mobile", specs: "Intel Core Ultra 9 · 64 GB DDR5 · NVIDIA RTX 3000 Ada · 16″ 4K", tags: ["Mobile WS", "ISV Cert", "Thunderbolt 4"] },
  { name: "HP Z8 G5 Fury", specs: "2× Intel Xeon W9-3495X · 512 GB DDR5 · NVIDIA RTX 6000 Ada × 2 · 4 TB NVMe", tags: ["Dual CPU", "AI Ready", "Liquid Cooled"] },
  { name: "HP Z6 G5", specs: "Intel Xeon W5-3435X · 128 GB DDR5 · NVIDIA RTX A5000 · 2 TB NVMe", tags: ["Mid-Tower", "ISV Cert", "PCIe Gen5"] },
  { name: "Lenovo ThinkStation P8", specs: "AMD Threadripper PRO 7975WX · 256 GB DDR5 · NVIDIA RTX 5000 Ada · 4 TB NVMe", tags: ["96-Core Option", "4× GPU", "Tool-free"] },
  { name: "Lenovo ThinkStation P5", specs: "Intel Xeon W5-2465X · 64 GB DDR5 · NVIDIA RTX A4000 · 1 TB NVMe", tags: ["Compact", "ISV Cert", "XClarity"] },
  { name: "Apple Mac Studio M2 Ultra", specs: "Apple M2 Ultra · 192 GB Unified · 1/2/4/8 TB SSD", tags: ["macOS", "76-Core GPU", "Thunderbolt 4 × 6"] },
  { name: "Apple Mac Pro M2 Ultra", specs: "Apple M2 Ultra · 192 GB Unified · 1–8 TB SSD · 7× PCIe Gen4", tags: ["Tower", "Expandable", "Afterburner"] },
];

const categories = [
  { href: "/servers", label: "Servers" }, { href: "/laptops", label: "Laptops" },
  { href: "/network", label: "Network" }, { href: "/storage", label: "Storage" },
  { href: "/mobile", label: "Mobile" }, { href: "/peripherals", label: "Peripherals" },
];

export default function WorkstationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6"><a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span><span className="text-slate-300">Workstations</span></nav>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Workstations</h1>
            <a href="/contact" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all">Request Quote</a>
          </div>
          <p className="text-slate-400 text-sm mb-8 max-w-3xl">Professional-grade workstations for CAD, 3D rendering, AI/ML, and video production. ISV-certified configurations from Dell, HP, Lenovo, and Apple.</p>
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
