"use client";
import { useState } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("servers");

  const categories = [
    { id: "servers", name: "Enterprise Servers", icon: "server" },
    { id: "laptops", name: "Business Laptops", icon: "laptop" },
    { id: "mobile", name: "Mobile Devices", icon: "mobile" },
    { id: "workstations", name: "Workstations", icon: "workstation" },
    { id: "network", name: "Network Equipment", icon: "network" },
    { id: "peripherals", name: "Peripherals", icon: "peripheral" },
  ];

  const products: Record<string, Array<{ name: string; specs: string; price: string; features: string[] }>> = {
    servers: [
      { name: "Dell PowerEdge R760", specs: "2x Intel Xeon Gold 6430 | 256GB DDR5 | 4x 1.92TB NVMe SSD | Dual 800W PSU", price: "From $12,500", features: ["Hot-swap drives", "iDRAC9 Enterprise", "5-year warranty available"] },
      { name: "HPE ProLiant DL380 Gen11", specs: "2x Intel Xeon Silver 4410Y | 128GB DDR5 | 8x 2.4TB SAS | iLO Advanced", price: "From $9,800", features: ["Smart Array controller", "Redundant fans", "Tool-free rails"] },
      { name: "Lenovo ThinkSystem SR650 V3", specs: "2x Intel Xeon Gold 5415+ | 256GB DDR5 | 6x 1.92TB SSD | XClarity", price: "From $11,200", features: ["AnyBay flexibility", "GPU-ready", "Lenovo XClarity"] },
    ],
    laptops: [
      { name: "MacBook Pro 16\" M3 Max", specs: "Apple M3 Max | 48GB Unified Memory | 1TB SSD | 16\" Liquid Retina XDR", price: "From $3,499", features: ["22hr battery", "MagSafe 3", "ProRes acceleration"] },
      { name: "Dell XPS 15 9530", specs: "Intel Core i9-13900H | 64GB DDR5 | 2TB NVMe | RTX 4070 | 15.6\" OLED", price: "From $2,899", features: ["3.5K OLED touch", "Thunderbolt 4", "CNC aluminum"] },
      { name: "Lenovo ThinkPad X1 Carbon Gen 11", specs: "Intel Core i7-1365U | 32GB | 1TB SSD | 14\" 2.8K OLED | 5G LTE", price: "From $2,199", features: ["5G connectivity", "IR camera", "MIL-STD tested"] },
      { name: "HP EliteBook 860 G10", specs: "Intel Core i7-1365U | 32GB DDR5 | 512GB SSD | 16\" WUXGA | Sure View", price: "From $1,899", features: ["Privacy screen", "Smart Sense", "Wolf Security"] },
    ],
    mobile: [
      { name: "iPhone 15 Pro Max", specs: "256GB | A17 Pro | Titanium | 5G | eSIM Enterprise Ready", price: "From $1,199", features: ["Titanium design", "Action button", "USB-C with USB 3"] },
      { name: "iPhone 15 Pro", specs: "256GB | A17 Pro | Titanium | 5G | MDM Compatible", price: "From $999", features: ["ProMotion display", "Always-On", "Crash Detection"] },
      { name: "Samsung Galaxy S24 Ultra", specs: "512GB | Snapdragon 8 Gen 3 | S Pen | Knox Security", price: "From $1,299", features: ["S Pen included", "200MP camera", "Titanium frame"] },
      { name: "Samsung Galaxy Z Fold5", specs: "512GB | 7.6\" Foldable | Knox Enterprise | 5G", price: "From $1,799", features: ["Flex Mode", "IPX8 rated", "DeX support"] },
      { name: "iPad Pro 12.9\" M2", specs: "256GB | M2 Chip | Wi-Fi + Cellular | Face ID | Apple Pencil 2", price: "From $1,199", features: ["Mini-LED XDR", "ProMotion 120Hz", "Thunderbolt/USB 4"] },
    ],
    workstations: [
      { name: "Dell Precision 7875 Tower", specs: "AMD Ryzen Threadripper PRO 5975WX | 128GB ECC | RTX A6000 | 2TB NVMe", price: "From $8,500", features: ["32 cores", "PCIe Gen 5", "Tool-less chassis"] },
      { name: "HP Z8 G5 Fury", specs: "Intel Xeon w9-3495X | 256GB DDR5 | NVIDIA RTX 6000 Ada | 4TB SSD", price: "From $15,900", features: ["56 cores", "Z Turbo Drive", "1700W PSU"] },
      { name: "Lenovo ThinkStation P620", specs: "AMD Threadripper PRO 5965WX | 256GB ECC | RTX A5000 | 2TB NVMe", price: "From $7,200", features: ["24 cores", "FlexBay storage", "Dust filter"] },
    ],
    network: [
      { name: "Cisco Catalyst 9300-48P", specs: "48x 1GbE PoE+ | 4x 10G SFP+ | UADP 2.0 | DNA License Ready", price: "From $4,800", features: ["StackWise-480", "USB-C console", "Encrypted traffic"] },
      { name: "Cisco Meraki MS250-48FP", specs: "48x 1GbE PoE+ | 4x 10G SFP+ | Cloud Managed | 740W PoE Budget", price: "From $6,200", features: ["Zero-touch deploy", "Auto firmware", "Lifetime warranty"] },
      { name: "Ubiquiti UniFi Dream Machine Pro", specs: "10G SFP+ | 8-Port Switch | UniFi Controller | IDS/IPS | 3.5\" HDD Bay", price: "From $499", features: ["Built-in NVR", "Threat management", "Easy setup"] },
      { name: "Aruba 6300M 48-Port", specs: "48x 1GbE | 4x 50G SFP56 | VSX | Dynamic Segmentation", price: "From $5,100", features: ["AOS-CX", "Analytics ready", "VSX clustering"] },
    ],
    peripherals: [
      { name: "Dell UltraSharp U3223QE", specs: "32\" 4K IPS | USB-C Hub | 90W PD | KVM | HDR 400", price: "From $899", features: ["IPS Black panel", "Built-in KVM", "RJ45 Ethernet"] },
      { name: "HP LaserJet Enterprise M611dn", specs: "65 ppm | Duplex | Gigabit | 550-Sheet Tray | HP Sure Start", price: "From $699", features: ["First page 5.7s", "250K duty cycle", "Fleet management"] },
      { name: "Poly Studio X70", specs: "4K Dual Camera | Dolby Vision | NoPC Video Bar | Teams/Zoom Certified", price: "From $5,999", features: ["Director AI", "NoiseBlockAI", "4K content share"] },
      { name: "CalDigit TS4 Thunderbolt 4 Dock", specs: "18 Ports | 98W PD | 2.5GbE | SD 4.0 | DisplayPort 1.4", price: "From $449", features: ["18 total ports", "Daisy-chain 2", "Mac/PC compatible"] },
    ],
  };

  const icons: Record<string, JSX.Element> = {
    server: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />,
    laptop: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    mobile: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
    workstation: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />,
    network: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />,
    peripheral: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />,
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950" />
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'grid-move 20s linear infinite',
          }}
        />
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center" style={{ animation: 'glow 3s ease-in-out infinite' }}>
              <span className="text-white font-black text-lg">TG</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Toronto Gadgets</span>
              <span className="hidden sm:block text-xs text-slate-500 tracking-widest uppercase">Enterprise Technology</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-sm font-medium text-slate-400 hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Products</a>
            <a href="#services" className="text-sm font-medium text-slate-400 hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Services</a>
            <a href="#about" className="text-sm font-medium text-slate-400 hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">About</a>
            <a href="#contact" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50">Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 text-blue-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            B2B Electronics Distribution • Now Serving GCC
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Enterprise Technology</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Direct Supply</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Premium servers, workstations, laptops, and mobile devices. 
            <span className="text-white font-medium"> Competitive pricing. Full warranty. Global delivery.</span>
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#products" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105">
              View Products
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/5 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-sm">
              Request Quote
            </a>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section id="products" className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Product Catalog</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Click a category to explore enterprise-grade technology</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {icons[cat.icon]}
                </svg>
                <span className="hidden sm:inline">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products[activeCategory].map((product, i) => (
              <div
                key={i}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                style={{ animation: `float 6s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-transparent group-hover:to-cyan-500/10 rounded-2xl transition-all duration-300" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center mb-5 group-hover:from-blue-900/50 group-hover:to-cyan-900/50 transition-all border border-white/5">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {icons[categories.find(c => c.id === activeCategory)?.icon || "server"]}
                    </svg>
                  </div>

                  {/* Product Info */}
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">{product.specs}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.features.map((feature, j) => (
                      <span key={j} className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-slate-400 rounded-md">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{product.price}</span>
                    <a href="#contact" className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                      Get Quote
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bulk Order CTA */}
          <div className="mt-16 relative bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5" />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Need Bulk Quantities?</h3>
              <p className="text-slate-400 mb-6 max-w-2xl mx-auto">Volume discounts available for 10+ units. Let us customize a solution for your enterprise.</p>
              <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
                Request Bulk Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">How We Work</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Streamlined procurement for businesses of all sizes</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Request", desc: "Share your requirements via email or call. Specs, quantities, timeline." },
              { step: "02", title: "Quote", desc: "Receive competitive pricing within 24-48 hours. No hidden fees." },
              { step: "03", title: "Confirm", desc: "Approve quote and confirm order. Flexible payment terms available." },
              { step: "04", title: "Deliver", desc: "Fast shipping to North America, GCC, and global destinations." },
            ].map((item, i) => (
              <div key={i} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-blue-500/30 transition-all group">
                <div className="text-5xl font-black bg-gradient-to-b from-blue-500/40 to-transparent bg-clip-text text-transparent mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Why Toronto Gadgets</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>Based in <span className="text-white font-medium">Toronto, Ontario, Canada</span> with distribution capabilities extending to the GCC region and beyond.</p>
                <p>We bridge leading technology manufacturers with enterprise buyers across North America, Middle East, and globally.</p>
                <p>Direct relationships with authorized distributors mean competitive pricing without compromising on authenticity or warranty coverage.</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="space-y-5">
                {[
                  { title: "Authorized Products", desc: "Genuine products with full manufacturer warranty" },
                  { title: "Competitive Pricing", desc: "Direct sourcing eliminates middleman markups" },
                  { title: "Global Delivery", desc: "Fast shipping to North America, GCC & worldwide" },
                  { title: "Dedicated Support", desc: "Single point of contact for all your orders" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Get in Touch</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">Ready to discuss your technology requirements? We respond within 24 hours.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <a href="mailto:east_yorker@outlook.com" className="group bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-blue-500/30 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-1">Email</h3>
                <p className="text-blue-400 text-sm">east_yorker@outlook.com</p>
              </a>

              <a href="https://wa.me/14372376895" className="group bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-green-500/30 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-1">WhatsApp</h3>
                <p className="text-green-400 text-sm">+1 437 237 6895</p>
              </a>

              <a href="tel:+14372376895" className="group bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-purple-500/30 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-1">Phone</h3>
                <p className="text-purple-400 text-sm">+1 437 237 6895</p>
              </a>
            </div>

            {/* Address */}
            <div className="text-center bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-bold text-white">Office Location</h3>
              </div>
              <p className="text-slate-400">75 Thorncliffe Park Drive</p>
              <p className="text-slate-400">Toronto, Ontario, Canada</p>
              <p className="text-slate-500 text-sm mt-2">Serving North America, GCC & Global Markets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/10 z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TG</span>
            </div>
            <span className="text-slate-500 text-sm">© 2025 Toronto Gadgets. All rights reserved.</span>
          </div>
          <div className="text-slate-600 text-sm">
            Enterprise Electronics & Business Technology Distribution
          </div>
        </div>
      </footer>
    </div>
  );
}
