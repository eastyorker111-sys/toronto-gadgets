import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peripherals | Monitors, Printers, Docks, Accessories | Toronto Gadgets",
  description: "Enterprise peripherals sourcing: Dell UltraSharp & HP Z monitors, docking stations, enterprise printers, video conferencing bars, and accessories. B2B quotes.",
  alternates: { canonical: "https://torontogadgets.com/peripherals" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Peripherals", item: "https://torontogadgets.com/peripherals" },
  ],
};

const products = [
  { name: "Dell UltraSharp U2724D", specs: "27″ QHD IPS Black · 120 Hz · USB-C 90W · HDR 400", tags: ["IPS Black", "USB-C PD", "Factory Calibrated"] },
  { name: "Dell UltraSharp U3423WE", specs: "34″ WQHD Curved IPS · USB-C 90W · KVM · RJ45", tags: ["Ultrawide", "Built-in KVM", "RJ45 Ethernet"] },
  { name: "HP Z27k G3 4K", specs: "27″ 4K IPS · USB-C 100W · 4× USB-A · HDMI 2.0 · DP 1.4", tags: ["4K IPS", "100W USB-C", "Color Accurate"] },
  { name: "Lenovo ThinkVision P32p-30", specs: "31.5″ 4K IPS · USB-C 100W · Thunderbolt 4 · KVM", tags: ["Thunderbolt 4", "99% DCI-P3", "Ergonomic"] },
  { name: "CalDigit TS4 Dock", specs: "Thunderbolt 4 · 18 Ports · 98W PD · 2.5GbE · SD UHS-II", tags: ["18 Ports", "98W PD", "2.5GbE"] },
  { name: "Dell WD22TB4 Dock", specs: "Thunderbolt 4 · Triple 4K · 130W PD · USB-C/A · DP · HDMI", tags: ["Triple Display", "130W PD", "Dell Optimized"] },
  { name: "HP LaserJet Enterprise M612dn", specs: "Mono Laser · 71 ppm · Auto Duplex · Gigabit LAN · 550-Sheet", tags: ["High Volume", "Enterprise", "PIN Printing"] },
  { name: "Poly Studio X52", specs: "4K Camera · Stereo Speakers · Wi-Fi 6 · Teams/Zoom Certified", tags: ["All-in-One", "AI Framing", "Noise Block"] },
  { name: "Logitech Rally Bar", specs: "4K Camera · AI Sight · RightSound · USB/Appliance Mode", tags: ["Large Rooms", "AI Sight", "Modular"] },
];

const categories = [
  { href: "/servers", label: "Servers" }, { href: "/laptops", label: "Laptops" },
  { href: "/workstations", label: "Workstations" }, { href: "/network", label: "Network" },
  { href: "/storage", label: "Storage" }, { href: "/mobile", label: "Mobile" },
];

export default function PeripheralsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6"><a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span><span className="text-slate-300">Peripherals</span></nav>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Peripherals</h1>
            <a href="/contact" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all">Request Quote</a>
          </div>
          <p className="text-slate-400 text-sm mb-8 max-w-3xl">Enterprise monitors, docking stations, printers, and video conferencing equipment. Complete your workspace with accessories from trusted brands.</p>
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
