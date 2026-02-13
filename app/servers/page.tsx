export const metadata = {
  title: "Enterprise Servers | Toronto Gadgets",
  description: "Enterprise server sourcing: Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Cisco UCS. Quotes on request.",
};

const products = [
  { name: "Dell PowerEdge R760", specs: "2x Intel Xeon Gold 6430 | 256GB DDR5 | 4x 1.92TB NVMe SSD", features: ["Hot-swap", "iDRAC9", "5yr warranty"] },
  { name: "Dell PowerEdge R750xs", specs: "2x Intel Xeon Silver 4410T | 128GB DDR5 | 8x 2.4TB SAS", features: ["2U Rack", "PERC H755", "Redundant PSU"] },
  { name: "Dell PowerEdge R660", specs: "2x Intel Xeon Gold 5415+ | 192GB DDR5 | 8x 1.92TB NVMe", features: ["1U Dense", "GPU Ready", "PCIe Gen5"] },
  { name: "HPE ProLiant DL380 Gen11", specs: "2x Intel Xeon Silver 4410Y | 128GB DDR5 | 8x 2.4TB SAS", features: ["Smart Array", "iLO Advanced", "Tool-free"] },
  { name: "HPE ProLiant DL360 Gen11", specs: "2x Intel Xeon Gold 5415+ | 256GB DDR5 | 4x 1.92TB NVMe", features: ["1U Form", "iLO Adv", "PCIe Gen5"] },
  { name: "Lenovo ThinkSystem SR650 V3", specs: "2x Intel Xeon Gold 5415+ | 256GB DDR5 | 6x 1.92TB SSD", features: ["AnyBay flex", "GPU-ready", "XClarity"] },
  { name: "Cisco UCS C240 M7", specs: "2x Intel Xeon Gold 6430 | 512GB DDR5 | 24x NVMe Bays", features: ["24 NVMe", "Cisco UCS", "High Density"] },
];

export default function ServersPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-3xl sm:text-4xl font-black">Enterprise Servers</h1>
          <div className="flex gap-2">
            <a href="/" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 hover:bg-white/10">Home</a>
            <a href="/contact" className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold">Request Quote</a>
          </div>
        </div>

        <p className="text-slate-400 mt-4 max-w-3xl">
          Browse server models and request a quote for current pricing and availability.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {products.map((p) => (
            <div key={p.name} className="bg-[#12151f] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all">
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className="text-slate-500 text-sm mt-2">{p.specs}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.features.map((f) => (
                  <span key={f} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-slate-300">{f}</span>
                ))}
              </div>
              <div className="mt-5">
                <a className="text-cyan-400 font-semibold text-sm hover:text-cyan-300" href="/contact">Get Quote →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
