import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network Equipment | Cisco, Aruba, Juniper, Fortinet | Toronto Gadgets",
  description: "Enterprise network equipment sourcing: Cisco Catalyst & Meraki, Aruba, Juniper, Ubiquiti UniFi, Fortinet FortiGate. Switches, routers, firewalls, and access points.",
  alternates: { canonical: "https://torontogadgets.com/network" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Network Equipment", item: "https://torontogadgets.com/network" },
  ],
};

const products = [
  { name: "Cisco Catalyst 9300-48P", specs: "48× GbE PoE+ · 4× 10G Uplinks · UADP 2.0 ASIC · StackWise-480", tags: ["PoE+ 740W", "DNA License", "Stackable"] },
  { name: "Cisco Catalyst 9200-24T", specs: "24× GbE · 4× 1G SFP Uplinks · Compact", tags: ["Entry Layer", "DNA Essential", "Fanless Option"] },
  { name: "Cisco Meraki MS250-48FP", specs: "48× GbE PoE+ · 4× 10G SFP+ · Cloud-Managed", tags: ["Cloud Managed", "740W PoE", "Dashboard"] },
  { name: "Aruba CX 6300M-48G", specs: "48× GbE · 4× SFP56 Uplinks · VSX Support", tags: ["AOS-CX", "VSX", "Modular PSU"] },
  { name: "Aruba AP-635 Wi-Fi 6E", specs: "Tri-Radio · Wi-Fi 6E · 3.9 Gbps · BLE/Zigbee IoT", tags: ["Wi-Fi 6E", "IoT Ready", "AI Powered"] },
  { name: "Juniper EX4400-48T", specs: "48× GbE · 4× 10G SFP+ · 2× 25G SFP28 · Mist AI", tags: ["Mist AI", "Campus/Branch", "MACsec"] },
  { name: "Fortinet FortiGate 100F", specs: "20 Gbps Firewall · 1 Gbps IPS · SD-WAN · ZTNA", tags: ["NGFW", "SD-WAN", "FortiGuard AI"] },
  { name: "Fortinet FortiGate 60F", specs: "10 Gbps Firewall · 700 Mbps IPS · SD-WAN", tags: ["SMB NGFW", "SD-WAN", "WiFi Option"] },
  { name: "Ubiquiti UniFi USW-Pro-48-PoE", specs: "48× GbE PoE+ · 4× 10G SFP+ · Layer 3 Lite", tags: ["UniFi", "600W PoE", "1.3U Silent"] },
];

const categories = [
  { href: "/servers", label: "Servers" }, { href: "/laptops", label: "Laptops" },
  { href: "/workstations", label: "Workstations" }, { href: "/storage", label: "Storage" },
  { href: "/mobile", label: "Mobile" }, { href: "/peripherals", label: "Peripherals" },
];

export default function NetworkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6"><a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span><span className="text-slate-300">Network Equipment</span></nav>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Network Equipment</h1>
            <a href="/contact" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all">Request Quote</a>
          </div>
          <p className="text-slate-400 text-sm mb-8 max-w-3xl">Enterprise switches, routers, firewalls, and wireless access points from Cisco, Aruba, Juniper, Fortinet, and Ubiquiti. Competitive sourcing for network infrastructure projects.</p>
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
