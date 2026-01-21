"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("servers");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      { name: "Dell PowerEdge R760", specs: "2x Intel Xeon Gold 6430 | 256GB DDR5 | 4x 1.92TB NVMe SSD", price: "$12,500", features: ["Hot-swap", "iDRAC9", "5-Year Warranty"] },
      { name: "HPE ProLiant DL380 Gen11", specs: "2x Intel Xeon Silver 4410Y | 128GB DDR5 | 8x 2.4TB SAS", price: "$9,800", features: ["Smart Array", "Redundant", "Tool-free"] },
      { name: "Lenovo ThinkSystem SR650 V3", specs: "2x Intel Xeon Gold 5415+ | 256GB DDR5 | 6x 1.92TB SSD", price: "$11,200", features: ["AnyBay", "GPU-ready", "XClarity"] },
    ],
    laptops: [
      { name: "MacBook Pro 16\" M3 Max", specs: "M3 Max | 48GB Unified | 1TB SSD | Liquid Retina XDR", price: "$3,499", features: ["22hr Battery", "MagSafe 3", "ProRes"] },
      { name: "Dell XPS 15 9530", specs: "i9-13900H | 64GB DDR5 | 2TB NVMe | RTX 4070", price: "$2,899", features: ["3.5K OLED", "Thunderbolt 4", "CNC Body"] },
      { name: "Lenovo ThinkPad X1 Carbon", specs: "i7-1365U | 32GB | 1TB SSD | 2.8K OLED | 5G", price: "$2,199", features: ["5G LTE", "MIL-STD", "IR Camera"] },
      { name: "HP EliteBook 860 G10", specs: "i7-1365U | 32GB DDR5 | 512GB | Sure View", price: "$1,899", features: ["Privacy Screen", "Wolf Security", "Smart Sense"] },
    ],
    mobile: [
      { name: "iPhone 15 Pro Max", specs: "256GB | A17 Pro | Titanium | 5G | eSIM", price: "$1,199", features: ["Titanium", "Action Button", "USB-C 3"] },
      { name: "iPhone 15 Pro", specs: "256GB | A17 Pro | Titanium | 5G | MDM", price: "$999", features: ["ProMotion", "Always-On", "48MP"] },
      { name: "Samsung Galaxy S24 Ultra", specs: "512GB | Snapdragon 8 Gen 3 | S Pen | Knox", price: "$1,299", features: ["S Pen", "200MP", "Titanium"] },
      { name: "iPad Pro 12.9\" M2", specs: "256GB | M2 | Wi-Fi + Cellular | Face ID", price: "$1,199", features: ["Mini-LED", "120Hz", "Thunderbolt"] },
    ],
    workstations: [
      { name: "Dell Precision 7875", specs: "Threadripper PRO 5975WX | 128GB ECC | RTX A6000", price: "$8,500", features: ["32 Cores", "PCIe Gen 5", "Tool-less"] },
      { name: "HP Z8 G5 Fury", specs: "Xeon w9-3495X | 256GB DDR5 | RTX 6000 Ada", price: "$15,900", features: ["56 Cores", "Z Turbo", "1700W PSU"] },
      { name: "Lenovo ThinkStation P620", specs: "Threadripper PRO 5965WX | 256GB ECC | RTX A5000", price: "$7,200", features: ["24 Cores", "FlexBay", "Quiet Mode"] },
    ],
    network: [
      { name: "Cisco Catalyst 9300-48P", specs: "48x 1GbE PoE+ | 4x 10G SFP+ | UADP 2.0", price: "$4,800", features: ["StackWise", "DNA Ready", "Encrypted"] },
      { name: "Cisco Meraki MS250-48FP", specs: "48x PoE+ | 4x 10G SFP+ | Cloud Managed", price: "$6,200", features: ["Zero-touch", "Lifetime Warranty", "Auto Update"] },
      { name: "Ubiquiti Dream Machine Pro", specs: "10G SFP+ | 8-Port | UniFi Controller", price: "$499", features: ["Built-in NVR", "IDS/IPS", "Easy Setup"] },
    ],
    peripherals: [
      { name: "Dell UltraSharp U3223QE", specs: "32\" 4K IPS | USB-C Hub | 90W PD | KVM", price: "$899", features: ["IPS Black", "KVM Switch", "RJ45"] },
      { name: "Poly Studio X70", specs: "4K Dual Camera | Dolby Vision | Teams/Zoom", price: "$5,999", features: ["Director AI", "NoiseBlock", "4K Share"] },
      { name: "CalDigit TS4 Dock", specs: "18 Ports | 98W PD | 2.5GbE | Thunderbolt 4", price: "$449", features: ["18 Ports", "Daisy-chain", "Universal"] },
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
    <div className="min-h-screen bg-[#030308] text-white overflow-x-hidden">
      {/* Advanced Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        :root {
          --neon-cyan: #00f5ff;
          --neon-blue: #0066ff;
          --neon-purple: #a855f7;
          --neon-pink: #ff00aa;
        }
        
        body {
          font-family: 'Rajdhani', sans-serif;
          cursor: none;
        }
        
        .font-orbitron { font-family: 'Orbitron', monospace; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        
        /* Custom Cursor */
        .cursor-dot {
          width: 8px;
          height: 8px;
          background: var(--neon-cyan);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 0 20px var(--neon-cyan), 0 0 40px var(--neon-cyan);
          transition: transform 0.1s ease;
        }
        
        .cursor-ring {
          width: 40px;
          height: 40px;
          border: 1px solid var(--neon-cyan);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transition: all 0.15s ease;
          opacity: 0.5;
        }
        
        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes pulse-neon {
          0%, 100% { 
            box-shadow: 0 0 5px var(--neon-cyan), 0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan);
            border-color: var(--neon-cyan);
          }
          50% { 
            box-shadow: 0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan), 0 0 40px var(--neon-cyan), 0 0 80px var(--neon-cyan);
            border-color: #fff;
          }
        }
        
        @keyframes grid-flow {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-2px, 2px); }
          94% { transform: translate(2px, -2px); }
          96% { transform: translate(-2px, -2px); }
          98% { transform: translate(2px, 2px); }
        }
        
        @keyframes text-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
          52% { opacity: 1; }
          54% { opacity: 0.9; }
        }
        
        @keyframes border-run {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes data-stream {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-neon { animation: pulse-neon 2s ease-in-out infinite; }
        .animate-scan { animation: scan 8s linear infinite; }
        .animate-glitch { animation: glitch 3s ease-in-out infinite; }
        .animate-flicker { animation: text-flicker 4s ease-in-out infinite; }
        .animate-border-run { animation: border-run 3s linear infinite; }
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
        
        /* Glassmorphism */
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glass-dark {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 245, 255, 0.1);
        }
        
        /* Neon Text */
        .neon-text {
          text-shadow: 0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan), 0 0 40px var(--neon-cyan);
        }
        
        .neon-text-subtle {
          text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
        }
        
        /* Holographic Effect */
        .holographic {
          background: linear-gradient(
            135deg,
            rgba(0, 245, 255, 0.1) 0%,
            rgba(0, 102, 255, 0.1) 25%,
            rgba(168, 85, 247, 0.1) 50%,
            rgba(0, 102, 255, 0.1) 75%,
            rgba(0, 245, 255, 0.1) 100%
          );
          background-size: 400% 400%;
          animation: border-run 8s ease infinite;
        }
        
        /* 3D Card Effect */
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        
        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg) rotateY(-5deg);
        }
        
        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #030308;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(var(--neon-cyan), var(--neon-blue));
          border-radius: 3px;
        }
      `}</style>

      {/* Custom Cursor */}
      <div 
        className="cursor-dot hidden md:block"
        style={{ left: mousePosition.x - 4, top: mousePosition.y - 4 }}
      />
      <div 
        className="cursor-ring hidden md:block"
        style={{ left: mousePosition.x - 20, top: mousePosition.y - 20 }}
      />

      {/* Particle Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Deep Space Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0a0a1a_0%,_#030308_100%)]" />
        
        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `pulse-neon ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10px',
                background: i % 2 === 0 ? 'var(--neon-cyan)' : 'var(--neon-purple)',
                boxShadow: `0 0 10px ${i % 2 === 0 ? 'var(--neon-cyan)' : 'var(--neon-purple)'}`,
                animation: `particle-float ${10 + Math.random() * 20}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* 3D Grid Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] overflow-hidden opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: 'perspective(500px) rotateX(60deg)',
              transformOrigin: 'bottom',
              animation: 'grid-flow 4s linear infinite',
            }}
          />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />

        {/* Scan Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"
            style={{ boxShadow: '0 0 20px var(--neon-cyan), 0 0 40px var(--neon-cyan)' }}
          />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyan-500/30" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-500/30" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/30" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50">
        <div className="glass-dark border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                {/* Rotating Ring */}
                <div className="absolute -inset-2 border border-cyan-500/50 rounded-full animate-rotate-slow" />
                <div className="absolute -inset-3 border border-purple-500/30 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
                
                {/* Logo Core */}
                <div className="relative w-12 h-12 rounded-xl overflow-hidden animate-pulse-neon">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600" />
                  <div className="absolute inset-[2px] bg-[#030308] rounded-lg flex items-center justify-center">
                    <span className="font-orbitron font-black text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">TG</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-orbitron text-xl font-bold tracking-wider">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent neon-text-subtle">TORONTO</span>
                  <span className="text-white ml-2">GADGETS</span>
                </div>
                <div className="text-[10px] tracking-[0.4em] text-cyan-400/60 uppercase font-rajdhani">Enterprise Technology Systems</div>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {['Products', 'Services', 'About', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative text-sm font-medium text-slate-400 hover:text-cyan-400 transition-all group font-rajdhani tracking-wider"
                >
                  {item.toUpperCase()}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a 
                href="#contact" 
                className="relative px-6 py-2.5 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg" />
                <div className="absolute inset-[1px] bg-[#030308] rounded-lg group-hover:bg-transparent transition-all duration-300" />
                <span className="relative font-rajdhani font-semibold tracking-wider text-sm text-cyan-400 group-hover:text-white transition-colors">CONTACT US</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center justify-center px-6 z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full mb-8 animate-pulse-neon">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="font-rajdhani text-sm tracking-widest text-cyan-400 uppercase">Head Office: Toronto, Canada • Systems Online</span>
          </div>

          {/* Main Title */}
          <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 animate-glitch">
            <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">ENTERPRISE</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent neon-text animate-flicker">TECHNOLOGY</span>
          </h1>
          
          <p className="font-rajdhani text-xl md:text-2xl text-slate-400 mb-4 tracking-wide">
            DIRECT SUPPLY NETWORK
          </p>
          
          <p className="font-rajdhani text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
            Premium servers, workstations, laptops & mobile devices.
            <span className="text-cyan-400"> Competitive pricing. Full warranty. Global delivery.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap mb-16">
            <a 
              href="#products" 
              className="group relative px-10 py-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-xl animate-border-run bg-[length:200%_100%]" />
              <div className="absolute inset-[2px] bg-[#030308] rounded-[10px] group-hover:bg-transparent transition-all duration-500" />
              <span className="relative flex items-center gap-2 font-orbitron font-semibold tracking-wider text-cyan-400 group-hover:text-white transition-colors">
                VIEW PRODUCTS
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a 
              href="#contact" 
              className="group px-10 py-4 glass rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all font-orbitron font-semibold tracking-wider text-slate-400 hover:text-cyan-400"
            >
              REQUEST QUOTE
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { value: "500+", label: "PRODUCTS", icon: "📦" },
              { value: "50+", label: "COUNTRIES", icon: "🌍" },
              { value: "24/7", label: "SUPPORT", icon: "⚡" },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-xl p-6 card-3d">
                <div className="font-orbitron text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="font-rajdhani text-xs tracking-[0.3em] text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-rajdhani text-xs tracking-widest text-slate-600">SCROLL</span>
          <div className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 glass rounded-full text-cyan-400 text-xs font-rajdhani tracking-[0.3em] uppercase mb-6">
              // PRODUCT CATALOG
            </div>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">ENTERPRISE</span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent ml-3">SOLUTIONS</span>
            </h2>
            <p className="font-rajdhani text-slate-500 tracking-wide">Select a category to explore our inventory</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-rajdhani font-medium tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                    : "glass text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {icons[cat.icon]}
                </svg>
                <span className="hidden sm:inline">{cat.name.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products[activeCategory].map((product, i) => (
              <div
                key={`${activeCategory}-${i}`}
                className="group relative glass rounded-2xl p-6 card-3d hover:border-cyan-500/50 transition-all duration-500"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Holographic Overlay */}
                <div className="absolute inset-0 holographic rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Corner Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-500/0 group-hover:border-cyan-500 transition-all duration-300" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-500/0 group-hover:border-cyan-500 transition-all duration-300" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-500/0 group-hover:border-cyan-500 transition-all duration-300" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-500/0 group-hover:border-cyan-500 transition-all duration-300" />

                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-5 group-hover:from-cyan-900/50 group-hover:to-blue-900/50 transition-all border border-white/5 group-hover:border-cyan-500/30">
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {icons[categories.find(c => c.id === activeCategory)?.icon || "server"]}
                    </svg>
                  </div>

                  {/* Product Info */}
                  <h3 className="font-orbitron text-lg font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">{product.name}</h3>
                  <p className="font-rajdhani text-sm text-slate-500 mb-4">{product.specs}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.features.map((feature, j) => (
                      <span key={j} className="px-2 py-1 text-xs font-rajdhani tracking-wider glass rounded border border-white/5 text-slate-400 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="font-orbitron text-lg font-bold text-cyan-400 neon-text-subtle">{product.price}</span>
                    <a href="#contact" className="flex items-center gap-1 font-rajdhani text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors tracking-wider">
                      GET QUOTE
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
          <div className="mt-20 relative glass rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 holographic" />
            <div className="relative">
              <h3 className="font-orbitron text-2xl md:text-3xl font-bold mb-4 text-white">VOLUME DISCOUNTS AVAILABLE</h3>
              <p className="font-rajdhani text-slate-400 mb-8 tracking-wide">Enterprise orders of 10+ units qualify for special pricing</p>
              <a href="#contact" className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-orbitron font-semibold tracking-wider text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                REQUEST BULK QUOTE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 glass rounded-full text-cyan-400 text-xs font-rajdhani tracking-[0.3em] uppercase mb-6">
              // OUR PROCESS
            </div>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              HOW WE WORK
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "REQUEST", desc: "Submit requirements via email or call", icon: "📋" },
              { step: "02", title: "QUOTE", desc: "Receive pricing within 24-48 hours", icon: "💰" },
              { step: "03", title: "CONFIRM", desc: "Approve with flexible payment terms", icon: "✅" },
              { step: "04", title: "DELIVER", desc: "Fast global shipping & tracking", icon: "🚀" },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center card-3d group">
                <div className="font-orbitron text-5xl font-black bg-gradient-to-b from-cyan-500/40 to-transparent bg-clip-text text-transparent mb-4">{item.step}</div>
                <h3 className="font-orbitron text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                <p className="font-rajdhani text-slate-500 text-sm tracking-wide">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 glass rounded-full text-cyan-400 text-xs font-rajdhani tracking-[0.3em] uppercase mb-6">
                // ABOUT US
              </div>
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                WHY CHOOSE US
              </h2>
              <div className="space-y-4 font-rajdhani text-slate-400 tracking-wide">
                <p><span className="text-cyan-400 font-semibold">Head Office in Toronto, Canada</span> — with global distribution capabilities.</p>
                <p>We connect leading technology manufacturers with enterprise buyers across North America, Middle East, and beyond.</p>
                <p>Direct partnerships with authorized distributors ensure competitive pricing and genuine products.</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="space-y-5">
                {[
                  { title: "AUTHORIZED PRODUCTS", desc: "Genuine with full manufacturer warranty" },
                  { title: "COMPETITIVE PRICING", desc: "Direct sourcing, no middleman markups" },
                  { title: "GLOBAL DELIVERY", desc: "Fast shipping worldwide with tracking" },
                  { title: "DEDICATED SUPPORT", desc: "Single point of contact for all orders" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-orbitron font-bold text-white text-sm mb-1">{item.title}</h4>
                      <p className="font-rajdhani text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0 holographic opacity-50" />
            
            <div className="relative text-center mb-12">
              <div className="inline-block px-4 py-1.5 glass rounded-full text-cyan-400 text-xs font-rajdhani tracking-[0.3em] uppercase mb-6">
                // GET IN TOUCH
              </div>
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                CONTACT US
              </h2>
              <p className="font-rajdhani text-slate-500 tracking-wide">Response within 24 hours guaranteed</p>
            </div>

            <div className="relative grid md:grid-cols-3 gap-6 mb-10">
              {[
                { href: "mailto:east_yorker@outlook.com", icon: "email", label: "EMAIL", value: "east_yorker@outlook.com", color: "cyan" },
                { href: "https://wa.me/14372376895", icon: "whatsapp", label: "WHATSAPP", value: "+1 437 237 6895", color: "green" },
                { href: "tel:+14372376895", icon: "phone", label: "PHONE", value: "+1 437 237 6895", color: "purple" },
              ].map((item, i) => (
                <a key={i} href={item.href} className="group glass rounded-2xl p-6 text-center hover:border-cyan-500/50 transition-all card-3d">
                  <div className={`w-14 h-14 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-${item.color}-500/30 transition-all`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === "email" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                      {item.icon === "whatsapp" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                      {item.icon === "phone" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                    </svg>
                  </div>
                  <h3 className="font-orbitron font-bold text-white mb-1 text-sm">{item.label}</h3>
                  <p className="font-rajdhani text-cyan-400 text-sm">{item.value}</p>
                </a>
              ))}
            </div>

            {/* Head Office with Map */}
            <div className="relative glass rounded-xl overflow-hidden">
              {/* Map */}
              <div className="w-full h-48 md:h-56">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.5!2d-79.3445!3d43.7074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cd1e9a7b5555%3A0x5555555555555555!2s75%20Thorncliffe%20Park%20Dr%2C%20East%20York%2C%20ON%20M4H%201L4%2C%20Canada!5e0!3m2!1sen!2sca!4v1705849200000!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Toronto Gadgets Head Office"
                />
              </div>
              {/* Address */}
              <div className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="font-orbitron font-bold text-white">HEAD OFFICE</h3>
                </div>
                <p className="font-rajdhani text-cyan-400 font-semibold text-lg">75 Thorncliffe Park Drive</p>
                <p className="font-rajdhani text-white">East York, Toronto, ON M4H 1L4, Canada</p>
                <p className="font-rajdhani text-slate-500 text-sm mt-2 tracking-wide">Serving North America, GCC & Global Markets</p>
                <a 
                  href="https://www.google.com/maps/dir//75+Thorncliffe+Park+Dr,+East+York,+ON+M4H+1L4,+Canada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-rajdhani text-white text-sm font-medium tracking-wider hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  GET DIRECTIONS
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <span className="font-orbitron font-bold text-white text-xs">TG</span>
            </div>
            <span className="font-rajdhani text-slate-500 text-sm tracking-wide">© 2025 TORONTO GADGETS. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="font-rajdhani text-slate-600 text-sm tracking-wider">
            ENTERPRISE TECHNOLOGY DISTRIBUTION • TORONTO, CANADA
          </div>
        </div>
      </footer>
    </div>
  );
}
