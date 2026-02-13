import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Devices | iPhone, Samsung Galaxy, iPad | Toronto Gadgets",
  description: "Enterprise mobile device sourcing: iPhone 15/16 Pro, Samsung Galaxy S24/S25, iPad Pro, Galaxy Tab. B2B bulk pricing and fleet deployment quotes.",
  alternates: { canonical: "https://torontogadgets.com/mobile" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Mobile Devices", item: "https://torontogadgets.com/mobile" },
  ],
};

const products = [
  { name: "iPhone 16 Pro Max", specs: "A18 Pro · 256/512 GB/1 TB · 6.9″ Super Retina XDR · Titanium", tags: ["5G", "USB-C", "48MP"] },
  { name: "iPhone 16 Pro", specs: "A18 Pro · 256/512 GB/1 TB · 6.3″ Super Retina XDR · Titanium", tags: ["5G", "USB-C", "ProRes"] },
  { name: "iPhone 16", specs: "A18 · 128/256/512 GB · 6.1″ Super Retina XDR", tags: ["5G", "USB-C", "Action Button"] },
  { name: "Samsung Galaxy S25 Ultra", specs: "Snapdragon 8 Elite · 12 GB RAM · 256/512 GB/1 TB · 6.9″ QHD+", tags: ["S Pen", "200MP", "Titanium"] },
  { name: "Samsung Galaxy S25", specs: "Snapdragon 8 Elite · 12 GB RAM · 128/256 GB · 6.2″ FHD+", tags: ["Galaxy AI", "5G", "Compact"] },
  { name: "iPad Pro 13″ M4", specs: "Apple M4 · 256 GB–2 TB · 13″ Ultra Retina XDR · Wi-Fi 6E", tags: ["Tandem OLED", "Thunderbolt", "Apple Pencil Pro"] },
  { name: "iPad Air 13″ M2", specs: "Apple M2 · 128/256/512 GB/1 TB · 13″ Liquid Retina", tags: ["Landscape Camera", "Wi-Fi 6E", "USB-C"] },
  { name: "Samsung Galaxy Tab S10 Ultra", specs: "MediaTek Dimensity 9300+ · 12 GB RAM · 256/512 GB/1 TB · 14.6″", tags: ["S Pen", "DeX", "IP68"] },
];

const categories = [
  { href: "/servers", label: "Servers" }, { href: "/laptops", label: "Laptops" },
  { href: "/workstations", label: "Workstations" }, { href: "/network", label: "Network" },
  { href: "/storage", label: "Storage" }, { href: "/peripherals", label: "Peripherals" },
];

export default function MobilePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6"><a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span><span className="text-slate-300">Mobile Devices</span></nav>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Mobile Devices</h1>
            <a href="/contact" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all">Request Quote</a>
          </div>
          <p className="text-slate-400 text-sm mb-8 max-w-3xl">Enterprise mobile sourcing — iPhones, Samsung Galaxy, iPads, and tablets. Fleet deployment pricing available for businesses of all sizes.</p>
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
