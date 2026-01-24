"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("servers");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      { name: "Dell PowerEdge R760", specs: "2x Intel Xeon Gold 6430 | 256GB DDR5 | 4x 1.92TB NVMe SSD | Dual 800W PSU", price: "From $12,500", features: ["Hot-swap drives", "iDRAC9 Enterprise", "5-year warranty"] },
      { name: "HPE ProLiant DL380 Gen11", specs: "2x Intel Xeon Silver 4410Y | 128GB DDR5 | 8x 2.4TB SAS | iLO Advanced", price: "From $9,800", features: ["Smart Array", "Redundant fans", "Tool-free rails"] },
      { name: "Lenovo ThinkSystem SR650 V3", specs: "2x Intel Xeon Gold 5415+ | 256GB DDR5 | 6x 1.92TB SSD | XClarity", price: "From $11,200", features: ["AnyBay flex", "GPU-ready", "XClarity"] },
    ],
    laptops: [
      { name: "MacBook Pro 16\" M3 Max", specs: "Apple M3 Max | 48GB Unified Memory | 1TB SSD | 16\" Liquid Retina XDR", price: "From $3,499", features: ["22hr battery", "MagSafe 3", "ProRes"] },
      { name: "Dell XPS 15 9530", specs: "Intel Core i9-13900H | 64GB DDR5 | 2TB NVMe | RTX 4070 | 15.6\" OLED", price: "From $2,899", features: ["3.5K OLED", "Thunderbolt 4", "CNC aluminum"] },
      { name: "Lenovo ThinkPad X1 Carbon Gen 11", specs: "Intel Core i7-1365U | 32GB | 1TB SSD | 14\" 2.8K OLED | 5G LTE", price: "From $2,199", features: ["5G LTE", "IR camera", "MIL-STD"] },
      { name: "HP EliteBook 860 G10", specs: "Intel Core i7-1365U | 32GB DDR5 | 512GB SSD | 16\" WUXGA | Sure View", price: "From $1,899", features: ["Privacy screen", "Smart Sense", "Wolf Security"] },
    ],
    mobile: [
      { name: "iPhone 15 Pro Max", specs: "256GB | A17 Pro | Titanium | 5G | eSIM Enterprise Ready", price: "From $1,199", features: ["Titanium", "Action button", "USB-C"] },
      { name: "iPhone 15 Pro", specs: "256GB | A17 Pro | Titanium | 5G | MDM Compatible", price: "From $999", features: ["ProMotion", "Always-On", "Crash Detection"] },
      { name: "Samsung Galaxy S24 Ultra", specs: "512GB | Snapdragon 8 Gen 3 | S Pen | Knox Security", price: "From $1,299", features: ["S Pen", "200MP camera", "Titanium"] },
      { name: "Samsung Galaxy Z Fold5", specs: "512GB | 7.6\" Foldable | Knox Enterprise | 5G", price: "From $1,799", features: ["Flex Mode", "IPX8", "DeX support"] },
      { name: "iPad Pro 12.9\" M2", specs: "256GB | M2 Chip | Wi-Fi + Cellular | Face ID | Apple Pencil 2", price: "From $1,199", features: ["Mini-LED XDR", "120Hz", "Thunderbolt"] },
    ],
    workstations: [
      { name: "Dell Precision 7875 Tower", specs: "AMD Ryzen Threadripper PRO 5975WX | 128GB ECC | RTX A6000 | 2TB NVMe", price: "From $8,500", features: ["32 cores", "PCIe Gen 5", "Tool-less"] },
      { name: "HP Z8 G5 Fury", specs: "Intel Xeon w9-3495X | 256GB DDR5 | NVIDIA RTX 6000 Ada | 4TB SSD", price: "From $15,900", features: ["56 cores", "Z Turbo Drive", "1700W PSU"] },
      { name: "Lenovo ThinkStation P620", specs: "AMD Threadripper PRO 5965WX | 256GB ECC | RTX A5000 | 2TB NVMe", price: "From $7,200", features: ["24 cores", "FlexBay", "Dust filter"] },
    ],
    network: [
      { name: "Cisco Catalyst 9300-48P", specs: "48x 1GbE PoE+ | 4x 10G SFP+ | UADP 2.0 | DNA License Ready", price: "From $4,800", features: ["StackWise-480", "USB-C", "Encrypted"] },
      { name: "Cisco Meraki MS250-48FP", specs: "48x 1GbE PoE+ | 4x 10G SFP+ | Cloud Managed | 740W PoE", price: "From $6,200", features: ["Zero-touch", "Auto firmware", "Lifetime warranty"] },
      { name: "Ubiquiti UniFi Dream Machine Pro", specs: "10G SFP+ | 8-Port Switch | UniFi Controller | IDS/IPS", price: "From $499", features: ["Built-in NVR", "Threat mgmt", "Easy setup"] },
      { name: "Aruba 6300M 48-Port", specs: "48x 1GbE | 4x 50G SFP56 | VSX | Dynamic Segmentation", price: "From $5,100", features: ["AOS-CX", "Analytics", "VSX clustering"] },
    ],
    peripherals: [
      { name: "Dell UltraSharp U3223QE", specs: "32\" 4K IPS | USB-C Hub | 90W PD | KVM | HDR 400", price: "From $899", features: ["IPS Black", "Built-in KVM", "RJ45"] },
      { name: "HP LaserJet Enterprise M611dn", specs: "65 ppm | Duplex | Gigabit | 550-Sheet Tray | Sure Start", price: "From $699", features: ["5.7s first page", "250K duty", "Fleet mgmt"] },
      { name: "Poly Studio X70", specs: "4K Dual Camera | Dolby Vision | NoPC Video Bar | Teams/Zoom", price: "From $5,999", features: ["Director AI", "NoiseBlock", "4K share"] },
      { name: "CalDigit TS4 Thunderbolt 4 Dock", specs: "18 Ports | 98W PD | 2.5GbE | SD 4.0 | DisplayPort 1.4", price: "From $449", features: ["18 ports", "Daisy-chain", "Mac/PC"] },
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
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes moveGrid {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(50px) translateX(50px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes scan-line {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        @keyframes border-glow {
          0%, 100% { border-color: rgba(0, 200, 255, 0.3); }
          50% { border-color: rgba(0, 200, 255, 0.6); }
        }
        .animate-grid {
          animation: moveGrid 8s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .animate-float {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-border-glow {
          animation: border-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
        
        {/* Moving Grid */}
        <div 
          className="absolute inset-0 animate-grid opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 200, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 200, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '3s' }} />

        {/* Scan Line Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
            style={{ animation: 'scan-line 8s linear infinite' }}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-cyan-500/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Logo Container */}
              <div className="relative w-12 h-12 animate-border-glow">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl blur-sm opacity-50" />
                {/* Main logo */}
                <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center border border-cyan-400/50">
                  <span className="text-white font-black text-xl tracking-tighter">TG</span>
                </div>
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-cyan-400" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 border-cyan-400" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 border-cyan-400" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-cyan-400" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">TORONTO</span>
                <span className="text-white ml-1">GADGETS</span>
              </div>
              <div className="text-[10px] tracking-[0.3em] text-cyan-400/70 uppercase">Enterprise Technology</div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Products</a>
            <a href="#services" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Services</a>
            <a href="#about" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">About</a>
            <a href="#reviews" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Reviews</a>
            <a href="#contact" className="relative px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg overflow-hidden group">
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero with Toronto Skyline */}
      <section className="relative pt-24 pb-20 px-6 z-10 overflow-hidden">
        {/* Toronto Skyline SVG Background */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* CN Tower and Toronto Skyline silhouette */}
            <path fill="url(#skylineGrad)" d="
              M0,320 
              L0,280 L40,280 L40,250 L50,250 L50,280 L80,280 L80,220 L100,220 L100,280 
              L140,280 L140,200 L160,200 L160,280 
              L200,280 L200,180 L210,180 L210,160 L220,160 L220,180 L230,180 L230,280
              L280,280 L280,240 L300,240 L300,280
              L340,280 L340,160 L360,160 L360,280
              L400,280 L400,200 L420,200 L420,280
              L460,280 L460,220 L480,220 L480,280
              L520,280 L520,190 L540,190 L540,280
              L580,280 L585,140 L590,80 L592,40 L594,20 L596,10 L598,20 L600,40 L602,80 L607,140 L612,280
              L660,280 L660,170 L680,170 L680,280
              L720,280 L720,210 L740,210 L740,280
              L780,280 L780,160 L800,160 L800,280
              L840,280 L840,230 L860,230 L860,280
              L900,280 L900,190 L920,190 L920,280
              L960,280 L960,220 L980,220 L980,280
              L1020,280 L1020,180 L1040,180 L1040,280
              L1080,280 L1080,240 L1100,240 L1100,280
              L1140,280 L1140,200 L1160,200 L1160,280
              L1200,280 L1200,230 L1220,230 L1220,280
              L1260,280 L1260,190 L1280,190 L1280,280
              L1320,280 L1320,240 L1340,240 L1340,280
              L1380,280 L1380,210 L1400,210 L1400,280
              L1440,280 L1440,320 Z
            "/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center relative">
          {/* Head Office Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-8 animate-border-glow">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-sm font-medium tracking-wide">HEAD OFFICE: TORONTO, CANADA</span>
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tight">
            <span className="block bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">ENTERPRISE</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">TECHNOLOGY</span>
            <span className="block text-white/80 text-4xl md:text-5xl mt-2">DIRECT SUPPLY</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Premium servers, workstations, laptops & mobile devices.
            <span className="text-cyan-400 font-medium"> Competitive pricing. Full warranty. Global delivery.</span>
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#products" className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
              <span className="relative z-10 flex items-center gap-2">
                View Products
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/5 border border-cyan-500/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-cyan-400/50 transition-all">
              Request Quote
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { value: "500+", label: "Products" },
              { value: "50+", label: "Countries" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">
              Product Catalog
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Enterprise Solutions</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Click a category to explore our full range of enterprise-grade technology</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white hover:border-cyan-500/30"
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
                key={`${activeCategory}-${i}`}
                className="group relative bg-[#12151f] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/10 group-hover:to-blue-600/5 transition-all duration-300 rounded-2xl" />
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all rounded-br-2xl" />

                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center mb-5 group-hover:from-cyan-900/30 group-hover:to-blue-900/30 transition-all border border-white/5 group-hover:border-cyan-500/30">
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {icons[categories.find(c => c.id === activeCategory)?.icon || "server"]}
                    </svg>
                  </div>

                  {/* Product Info */}
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">{product.specs}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.features.map((feature, j) => (
                      <span key={j} className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-slate-400 rounded-md group-hover:border-cyan-500/30 group-hover:text-cyan-400/80 transition-all">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{product.price}</span>
                    <a href="#contact" className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">
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

          {/* Bulk CTA */}
          <div className="mt-16 relative bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDAsMjAwLDI1NSwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Need Bulk Quantities?</h3>
              <p className="text-slate-400 mb-6 max-w-2xl mx-auto">Volume discounts for 10+ units. Custom configurations available.</p>
              <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
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
            <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">
              Our Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">How We Work</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Request", desc: "Share your requirements via email or call" },
              { step: "02", title: "Quote", desc: "Receive competitive pricing within 24-48 hours" },
              { step: "03", title: "Confirm", desc: "Approve quote with flexible payment terms" },
              { step: "04", title: "Deliver", desc: "Fast shipping to North America & Global" },
            ].map((item, i) => (
              <div key={i} className="relative bg-[#12151f] border border-white/10 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-all group">
                <div className="text-5xl font-black bg-gradient-to-b from-cyan-500/50 to-transparent bg-clip-text text-transparent mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
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
              <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">
                About Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Why Toronto Gadgets</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p><span className="text-cyan-400 font-semibold">Head Office in Toronto, Ontario, Canada</span> — operating as a trade name of East Yorker Corp, with distribution capabilities extending globally.</p>
                <p>We bridge leading technology manufacturers with enterprise buyers across North America, Middle East, and beyond.</p>
                <p>Direct relationships with authorized distributors mean competitive pricing without compromising on authenticity or warranty.</p>
              </div>
            </div>
            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-8">
              <div className="space-y-5">
                {[
                  { title: "Authorized Products", desc: "Genuine with full manufacturer warranty" },
                  { title: "Competitive Pricing", desc: "Direct sourcing, no middleman markups" },
                  { title: "Global Delivery", desc: "Fast shipping worldwide" },
                  { title: "Dedicated Support", desc: "Single point of contact for orders" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
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

      {/* Reviews */}
      <section id="reviews" className="relative py-20 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">What Our Clients Say</h2>
            <p className="text-slate-500 mb-12">Trusted by businesses across North America, GCC & beyond</p>
          </div>

          {/* Leave a Review CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-8 md:p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Worked With Us?</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">We value your feedback. Share your experience and help other businesses discover quality IT solutions.</p>
              <a 
                href="mailto:east_yorker@outlook.com?subject=Review for Toronto Gadgets&body=Hi Toronto Gadgets,%0D%0A%0D%0AI would like to share my experience working with you.%0D%0A%0D%0AMy Review:%0D%0A[Write your review here]%0D%0A%0D%0ARating (1-5 stars): %0D%0A%0D%0AMy Name: %0D%0AMy Company/Title: %0D%0ALocation: %0D%0A%0D%0AThank you!"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Leave a Review
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#12151f] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }} />
            </div>

            <div className="relative text-center mb-12">
              <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">
                Get in Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Contact Us</h2>
              <p className="text-slate-500">We respond within 24 hours</p>
            </div>

            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
              <a href="mailto:east_yorker@outlook.com" className="group bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-cyan-500/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">Email</h3>
                <p className="text-cyan-400 text-xs">east_yorker@outlook.com</p>
              </a>

              <a href="https://wa.me/14372376895" className="group bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-green-500/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">WhatsApp</h3>
                <p className="text-green-400 text-xs">+1 437 237 6895</p>
              </a>

              <a href="tel:+14372376895" className="group bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-purple-500/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">Phone</h3>
                <p className="text-purple-400 text-xs">+1 437 237 6895</p>
              </a>

              <a href="https://www.linkedin.com/company/toronto-gadgets" target="_blank" rel="noopener noreferrer" className="group bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">LinkedIn</h3>
                <p className="text-blue-400 text-xs">Follow Us</p>
              </a>

              <a href="https://www.facebook.com/profile.php?id=61587119518549" target="_blank" rel="noopener noreferrer" className="group bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-blue-400/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">Facebook</h3>
                <p className="text-blue-400 text-xs">Follow Us</p>
              </a>
            </div>

            {/* Head Office Address */}
            <div className="relative text-center bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="font-bold text-white text-lg">HEAD OFFICE</h3>
              </div>
              <p className="text-cyan-400 font-semibold text-lg">75 Thorncliffe Park Drive</p>
              <p className="text-white">Toronto, Ontario, Canada</p>
              <p className="text-slate-500 text-sm mt-2">Serving North America, GCC & Global Markets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TG</span>
              </div>
              <div>
                <span className="text-white font-semibold">Toronto Gadgets</span>
                <p className="text-slate-500 text-xs">Enterprise Technology Distribution</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#products" className="hover:text-cyan-400 transition-colors">Products</a>
              <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
              <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
              <a href="#reviews" className="hover:text-cyan-400 transition-colors">Reviews</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
              <a href="https://www.linkedin.com/company/toronto-gadgets" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a href="https://www.facebook.com/profile.php?id=61587119518549" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Legal Information */}
          <div className="border-t border-white/5 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <div className="space-y-1">
                <p className="text-slate-500 text-sm">© 2026 Toronto Gadgets. All rights reserved.</p>
                <p className="text-slate-600 text-xs">
                  Toronto Gadgets is a trade name of <span className="text-cyan-400/70">East Yorker Corp</span>
                </p>
              </div>
              <div className="text-slate-600 text-xs space-y-1 text-center md:text-right">
                <p>Federal Corporation No. 1349551-5</p>
                <p>Ontario Corporation No. 1001482504</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <p className="text-slate-600 text-xs">
                75 Thorncliffe Park Drive, Toronto, Ontario M4H 1L4, Canada
              </p>
              <p className="text-cyan-400/50 text-xs mt-2">
                torontogadgets.com
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
