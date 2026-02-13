import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storage Solutions | NAS, SAN, Enterprise Drives | Toronto Gadgets",
  description: "Enterprise storage sourcing: Synology, QNAP, Dell PowerVault, HPE MSA, NetApp. NAS, SAN, and enterprise SSD/HDD drives for data centers and businesses.",
  alternates: { canonical: "https://torontogadgets.com/storage" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Storage Solutions", item: "https://torontogadgets.com/storage" },
  ],
};

const products = [
  { name: "Synology RS3621xs+", specs: "12-Bay Rack · Intel Xeon D-1541 · 8 GB ECC DDR4 · 10GbE × 2", tags: ["Enterprise NAS", "Scalable to 180 Bays", "Snapshot Replication"] },
  { name: "Synology DS3622xs+", specs: "12-Bay Desktop · Intel Xeon D-1531 · 16 GB ECC DDR4 · 10GbE", tags: ["SMB NAS", "SSD Cache", "Active Backup"] },
  { name: "QNAP TS-h1290FX", specs: "12× U.2 NVMe · AMD EPYC 7232P · 64 GB DDR4 · 25GbE × 2", tags: ["All-Flash NAS", "ZFS", "25GbE"] },
  { name: "QNAP TS-873A-8G", specs: "8-Bay Desktop · AMD Ryzen V1500B · 8 GB DDR4 · 2.5GbE × 2", tags: ["Dual 2.5GbE", "QTS/QuTS", "M.2 Cache"] },
  { name: "Dell PowerVault ME5024", specs: "24× SFF SAS/NVMe · Dual Controllers · 25GbE iSCSI/FC", tags: ["Block Storage", "Dual Controller", "Unity-based"] },
  { name: "HPE MSA 2062", specs: "24× SFF SAS · Dual Controllers · 12Gb SAS · 10GbE iSCSI", tags: ["SMB SAN", "Tiered Storage", "Replication"] },
  { name: "NetApp AFF A250", specs: "All-Flash · NVMe · 24× SFF · ONTAP · SnapMirror", tags: ["All-Flash", "ONTAP", "Hybrid Cloud"] },
  { name: "Seagate Exos X24 24TB", specs: "24 TB 3.5″ SAS/SATA · 7200 RPM · 256 MB Cache · CMR", tags: ["Data Center HDD", "2.5M hr MTBF", "Helium Sealed"] },
  { name: "Samsung PM9A3 3.84TB", specs: "3.84 TB U.2 NVMe · PCIe Gen4 · 6,900 MB/s Read · 1 DWPD", tags: ["Data Center SSD", "PCIe Gen4", "Power Loss Protection"] },
];

const categories = [
  { href: "/servers", label: "Servers" }, { href: "/laptops", label: "Laptops" },
  { href: "/workstations", label: "Workstations" }, { href: "/network", label: "Network" },
  { href: "/mobile", label: "Mobile" }, { href: "/peripherals", label: "Peripherals" },
];

export default function StoragePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6"><a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span><span className="text-slate-300">Storage Solutions</span></nav>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Storage Solutions</h1>
            <a href="/contact" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all">Request Quote</a>
          </div>
          <p className="text-slate-400 text-sm mb-8 max-w-3xl">Enterprise NAS, SAN, and storage drives from Synology, QNAP, Dell, HPE, NetApp, Samsung, and Seagate. Scale from SMB to data center.</p>
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
