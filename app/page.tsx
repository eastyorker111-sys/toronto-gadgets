"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("servers");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const categories = [
    { id: "servers", name: "Enterprise Servers", icon: "server" },
    { id: "laptops", name: "Business Laptops", icon: "laptop" },
    { id: "mobile", name: "Mobile Devices", icon: "mobile" },
    { id: "workstations", name: "Workstations", icon: "workstation" },
    { id: "network", name: "Network Equipment", icon: "network" },
    { id: "peripherals", name: "Peripherals", icon: "peripheral" },
    { id: "storage", name: "Storage Solutions", icon: "storage" },
  ];

  const products: Record<string, Array<{ name: string; specs: string; features: string[] }>> = {
    servers: [
      { name: "Dell PowerEdge R760", specs: "2x Intel Xeon Gold 6430 | 256GB DDR5 | 4x 1.92TB NVMe SSD", features: ["Hot-swap", "iDRAC9", "5yr warranty"] },
      { name: "Dell PowerEdge R750xs", specs: "2x Intel Xeon Silver 4410T | 128GB DDR5 | 8x 2.4TB SAS", features: ["2U Rack", "PERC H755", "Redundant PSU"] },
      { name: "Dell PowerEdge R660", specs: "2x Intel Xeon Gold 5415+ | 192GB DDR5 | 8x 1.92TB NVMe", features: ["1U Dense", "GPU Ready", "PCIe Gen5"] },
      { name: "HPE ProLiant DL380 Gen11", specs: "2x Intel Xeon Silver 4410Y | 128GB DDR5 | 8x 2.4TB SAS", features: ["Smart Array", "iLO Advanced", "Tool-free"] },
      { name: "HPE ProLiant DL360 Gen11", specs: "2x Intel Xeon Gold 5415+ | 256GB DDR5 | 4x 1.92TB NVMe", features: ["1U Form", "iLO Adv", "PCIe Gen5"] },
      { name: "HPE ProLiant ML350 Gen11", specs: "2x Intel Xeon Silver 4314 | 128GB DDR4 | 8x 2TB SATA", features: ["Tower/Rack", "Quiet", "Tool-less"] },
      { name: "Lenovo ThinkSystem SR650 V3", specs: "2x Intel Xeon Gold 5415+ | 256GB DDR5 | 6x 1.92TB SSD", features: ["AnyBay flex", "GPU-ready", "XClarity"] },
      { name: "Lenovo ThinkSystem SR630 V3", specs: "2x Intel Xeon Silver 4410Y | 128GB DDR5 | 4x 1.92TB NVMe", features: ["1U Dense", "XClarity", "NVMe Ready"] },
      { name: "Cisco UCS C240 M7", specs: "2x Intel Xeon Gold 6430 | 512GB DDR5 | 24x NVMe Bays", features: ["24 NVMe", "Cisco UCS", "High Density"] },
      { name: "Supermicro SYS-620P-TRT", specs: "2x Intel Xeon Gold 5318Y | 256GB DDR4 | 8x 3.5\" Bays", features: ["Value", "IPMI", "Dual 10GbE"] },
    ],
    laptops: [
      { name: "MacBook Pro 16\" M3 Max", specs: "Apple M3 Max | 48GB Unified | 1TB SSD | Liquid Retina XDR", features: ["22hr battery", "MagSafe 3", "ProRes"] },
      { name: "MacBook Pro 14\" M3 Pro", specs: "Apple M3 Pro | 36GB Unified | 512GB SSD | Liquid Retina XDR", features: ["17hr battery", "ProMotion", "TB4"] },
      { name: "MacBook Air 15\" M3", specs: "Apple M3 | 24GB Unified | 512GB SSD | 15.3\" Liquid Retina", features: ["18hr battery", "Fanless", "MagSafe"] },
      { name: "Dell XPS 15 9530", specs: "Intel i9-13900H | 64GB DDR5 | 2TB NVMe | RTX 4070 | OLED", features: ["3.5K OLED", "TB4", "CNC aluminum"] },
      { name: "Dell XPS 17 9730", specs: "Intel i9-13900H | 64GB DDR5 | 2TB NVMe | RTX 4080 | UHD+", features: ["17\" 4K", "RTX 4080", "100Wh"] },
      { name: "Dell Latitude 7440", specs: "Intel i7-1365U | 32GB DDR5 | 512GB SSD | 14\" FHD+ | vPro", features: ["vPro", "Smart Card", "4G LTE"] },
      { name: "Lenovo ThinkPad X1 Carbon Gen 11", specs: "Intel i7-1365U | 32GB | 1TB SSD | 14\" 2.8K OLED | 5G", features: ["5G LTE", "IR cam", "MIL-STD"] },
      { name: "Lenovo ThinkPad P16 Gen 2", specs: "Intel i9-13980HX | 64GB DDR5 | 2TB SSD | RTX 5000 Ada", features: ["Workstation", "ISV Cert", "4K"] },
      { name: "HP EliteBook 860 G10", specs: "Intel i7-1365U | 32GB DDR5 | 512GB SSD | 16\" WUXGA", features: ["Sure View", "Smart Sense", "Wolf Sec"] },
      { name: "HP ZBook Fury 16 G10", specs: "Intel i9-13950HX | 64GB DDR5 | 2TB SSD | RTX 4000 Ada", features: ["DreamColor", "Z Turbo", "ISV Cert"] },
    ],
    mobile: [
      { name: "iPhone 15 Pro Max", specs: "256GB | A17 Pro | Titanium | 5G | eSIM Enterprise Ready", features: ["Titanium", "Action btn", "USB-C"] },
      { name: "iPhone 15 Pro", specs: "256GB | A17 Pro | Titanium | 5G | MDM Compatible", features: ["ProMotion", "Always-On", "Crash Det"] },
      { name: "iPhone 15 Plus", specs: "128GB | A16 Bionic | 5G | 6.7\" Display | USB-C", features: ["Large Display", "All-day", "USB-C"] },
      { name: "iPhone 15", specs: "128GB | A16 Bionic | 5G | Dynamic Island | USB-C", features: ["Dynamic Island", "48MP", "USB-C"] },
      { name: "Samsung Galaxy S24 Ultra", specs: "512GB | Snapdragon 8 Gen 3 | S Pen | Knox Security", features: ["S Pen", "200MP", "Titanium"] },
      { name: "Samsung Galaxy S24+", specs: "256GB | Snapdragon 8 Gen 3 | Knox Enterprise | 5G", features: ["QHD+ AMOLED", "Knox", "Galaxy AI"] },
      { name: "Samsung Galaxy Z Fold5", specs: "512GB | 7.6\" Foldable | Knox Enterprise | 5G", features: ["Flex Mode", "IPX8", "DeX"] },
      { name: "iPad Pro 12.9\" M2", specs: "256GB | M2 Chip | Wi-Fi + Cellular | Face ID", features: ["Mini-LED", "120Hz", "TB"] },
      { name: "iPad Pro 11\" M2", specs: "256GB | M2 Chip | Wi-Fi + Cellular | Face ID | USB-C", features: ["ProMotion", "Face ID", "Pencil"] },
      { name: "Samsung Tab S9 Ultra", specs: "512GB | Snapdragon 8 Gen 2 | S Pen | 14.6\" AMOLED", features: ["14.6\"", "S Pen", "DeX Mode"] },
    ],
    workstations: [
      { name: "Dell Precision 7875 Tower", specs: "AMD Threadripper PRO 5975WX | 128GB ECC | RTX A6000", features: ["32 cores", "PCIe Gen 5", "Tool-less"] },
      { name: "Dell Precision 7875 Rack", specs: "AMD Threadripper PRO 5995WX | 256GB ECC | RTX 6000 Ada", features: ["64 cores", "Rack Mount", "Dual PSU"] },
      { name: "Dell Precision 5860 Tower", specs: "Intel Xeon W5-3435X | 128GB DDR5 ECC | RTX A5000", features: ["16 cores", "Compact", "ISV Cert"] },
      { name: "HP Z8 G5 Fury", specs: "Intel Xeon w9-3495X | 256GB DDR5 | RTX 6000 Ada | 4TB", features: ["56 cores", "Z Turbo", "1700W PSU"] },
      { name: "HP Z6 G5", specs: "Intel Xeon W5-3435X | 128GB DDR5 ECC | RTX A5000 | 2TB", features: ["Dual CPU", "Z Turbo", "ISV Cert"] },
      { name: "HP Z4 G5", specs: "Intel Xeon W3-2435 | 64GB DDR5 ECC | RTX A4000 | 1TB", features: ["Entry WS", "Quiet", "ISV Cert"] },
      { name: "Lenovo ThinkStation P620", specs: "AMD Threadripper PRO 5965WX | 256GB ECC | RTX A5000", features: ["24 cores", "FlexBay", "Dust filter"] },
      { name: "Lenovo ThinkStation P8", specs: "Intel Xeon W9-3495X | 512GB DDR5 | RTX 6000 Ada | 8TB", features: ["Flagship", "56 cores", "Multi-GPU"] },
      { name: "Apple Mac Studio M2 Ultra", specs: "Apple M2 Ultra | 192GB Unified | 8TB SSD | ProRes", features: ["24-core", "76-core GPU", "Compact"] },
      { name: "Apple Mac Pro", specs: "Apple M2 Ultra | 192GB Unified | 8TB SSD | 7 PCIe Slots", features: ["Expandable", "Tower", "Pro"] },
    ],
    network: [
      { name: "Cisco Catalyst 9300-48P", specs: "48x 1GbE PoE+ | 4x 10G SFP+ | UADP 2.0 | DNA Ready", features: ["StackWise", "USB-C", "Encrypted"] },
      { name: "Cisco Catalyst 9300-48UXM", specs: "48x mGig PoE+ | 4x 25G SFP28 | UADP 3.0 | DNA Adv", features: ["Multi-Gig", "Wi-Fi 6E", "StackWise"] },
      { name: "Cisco Catalyst 9500-48Y4C", specs: "48x 25G SFP28 | 4x 100G QSFP | Stackable Core", features: ["100G Up", "SD-Access", "High Den"] },
      { name: "Cisco Meraki MS250-48FP", specs: "48x 1GbE PoE+ | 4x 10G SFP+ | Cloud Managed | 740W", features: ["Zero-touch", "Auto FW", "Lifetime"] },
      { name: "Aruba 6300M 48-Port", specs: "48x 1GbE | 4x 50G SFP56 | VSX | Dynamic Segmentation", features: ["AOS-CX", "Analytics", "VSX"] },
      { name: "Aruba 6400 Switch Series", specs: "Modular Chassis | Up to 400G | ClearPass Ready", features: ["Modular", "High Den", "Zero Trust"] },
      { name: "Juniper EX4400-48T", specs: "48x 1GbE | 4x 25G SFP28 | Virtual Chassis | Mist AI", features: ["Mist AI", "VC", "PoE++"] },
      { name: "Ubiquiti Dream Machine Pro", specs: "10G SFP+ | 8-Port Switch | UniFi Controller | IDS/IPS", features: ["NVR", "Threat mgmt", "Easy"] },
      { name: "Ubiquiti UniFi Pro Max 48", specs: "48x 2.5GbE PoE+ | 4x 25G SFP28 | Layer 3 | UniFi", features: ["2.5GbE", "Layer 3", "UniFi"] },
      { name: "Fortinet FortiSwitch 448E", specs: "48x 1GbE PoE+ | 4x 10G SFP+ | FortiLink | Security", features: ["Security", "FortiLink", "NAC"] },
    ],
    peripherals: [
      { name: "Dell UltraSharp U3223QE", specs: "32\" 4K IPS | USB-C Hub | 90W PD | KVM | HDR 400", features: ["IPS Black", "KVM", "RJ45"] },
      { name: "Dell UltraSharp U2723QE", specs: "27\" 4K IPS | USB-C Hub | 90W PD | KVM | HDR 400", features: ["IPS Black", "Daisy Chain", "RJ45"] },
      { name: "Dell UltraSharp U4924DW", specs: "49\" Dual QHD Curved | USB-C Hub | 90W PD | KVM", features: ["Dual 27\"", "5120x1440", "TB"] },
      { name: "LG UltraFine 32UN880-B", specs: "32\" 4K IPS | Ergo Stand | USB-C 96W | DCI-P3 95%", features: ["Ergo Clamp", "96W PD", "HDR10"] },
      { name: "Samsung ViewFinity S9", specs: "27\" 5K IPS | Matte Display | Thunderbolt 4 | Smart", features: ["5K Res", "Matte", "Smart TV"] },
      { name: "HP LaserJet Enterprise M611dn", specs: "65 ppm | Duplex | Gigabit | 550-Sheet | Sure Start", features: ["5.7s first", "250K duty", "Fleet"] },
      { name: "HP Color LaserJet M555dn", specs: "40 ppm Color | Duplex | Gigabit | 550-Sheet", features: ["Color", "Secure Boot", "Fleet"] },
      { name: "Poly Studio X70", specs: "4K Dual Camera | Dolby Vision | NoPC Video Bar", features: ["Director AI", "NoiseBlock", "4K"] },
      { name: "Poly Studio X52", specs: "4K Camera | Stereo Mics | NoPC Video Bar | Teams/Zoom", features: ["Med Rooms", "AI Frame", "Touch"] },
      { name: "CalDigit TS4 Dock", specs: "18 Ports | 98W PD | 2.5GbE | SD 4.0 | DisplayPort 1.4", features: ["18 ports", "Daisy-chain", "Mac/PC"] },
    ],
    storage: [
      { name: "Synology RS3621xs+", specs: "12-Bay Rackmount | Intel Xeon D-1541 | 8GB ECC | 10GbE", features: ["Enterprise", "SAS", "180TB"] },
      { name: "Synology DS1823xs+", specs: "8-Bay Desktop | AMD Ryzen V1780B | 8GB ECC | 10GbE", features: ["Desktop", "NVMe Cache", "Surveil"] },
      { name: "QNAP TS-h2490FU", specs: "24-Bay U.2 NVMe | AMD EPYC | 64GB ECC | 25GbE x2", features: ["All-Flash", "ZFS", "IOPS"] },
      { name: "QNAP TS-873A", specs: "8-Bay Desktop | AMD Ryzen V1500B | 8GB | 2.5GbE x2", features: ["QuTS hero", "SSD Cache", "VM Ready"] },
      { name: "Dell PowerVault ME5024", specs: "24x SFF Bays | Dual Controllers | 25Gb iSCSI | 96TB", features: ["Block", "iSCSI/FC", "Expand"] },
      { name: "HPE MSA 2062", specs: "24x SFF Bays | Dual Controllers | 16Gb FC | 460TB Max", features: ["Hybrid", "Entry SAN", "Simple"] },
      { name: "Western Digital Ultrastar DC HC580", specs: "24TB Enterprise HDD | 7200RPM | SATA/SAS | CMR", features: ["24TB", "Enterprise", "Helium"] },
      { name: "Seagate Exos X24", specs: "24TB Enterprise HDD | 7200RPM | SATA/SAS | 5yr Warranty", features: ["24TB", "Enterprise", "Helium"] },
    ],
  };

  const icons: Record<string, JSX.Element> = {
    server: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />,
    laptop: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    mobile: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
    workstation: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />,
    network: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />,
    peripheral: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />,
    storage: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />,
  };

  // Brand logos data
  const brands = [
    { name: "Dell", color: "#007DB8" },
    { name: "HP", color: "#0096D6" },
    { name: "Lenovo", color: "#E2231A" },
    { name: "Cisco", color: "#049FD9" },
    { name: "Apple", color: "#A3AAAE" },
    { name: "Samsung", color: "#1428A0" },
    { name: "HPE", color: "#01A982" },
    { name: "Aruba", color: "#FF8300" },
  ];

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
        @keyframes scan-line {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        @keyframes border-glow {
          0%, 100% { border-color: rgba(0, 200, 255, 0.3); }
          50% { border-color: rgba(0, 200, 255, 0.6); }
        }
        .animate-grid { animation: moveGrid 8s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-border-glow { animation: border-glow 2s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
        <div className="absolute inset-0 animate-grid opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(0, 200, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 255, 0.15) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" style={{ animation: 'scan-line 8s linear infinite' }} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-cyan-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 animate-border-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl blur-sm opacity-50" />
              <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center border border-cyan-400/50">
                <span className="text-white font-black text-lg sm:text-xl tracking-tighter">TG</span>
              </div>
              <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-cyan-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 border-cyan-400" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 border-cyan-400" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-cyan-400" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">TORONTO</span>
                <span className="text-white ml-1">GADGETS</span>
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.2em] text-cyan-400/70 uppercase">Enterprise Technology</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#products" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Products</a>
            <a href="#services" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Services</a>
            <a href="#about" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">About</a>
            <a href="#contact" className="relative px-5 lg:px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg overflow-hidden group">
              <span className="relative z-10">Contact Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-cyan-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-cyan-500/20">
            <div className="px-4 py-4 space-y-3">
              <a href="#products" onClick={handleNavClick} className="block py-2 text-slate-400 hover:text-cyan-400 transition-colors">Products</a>
              <a href="#services" onClick={handleNavClick} className="block py-2 text-slate-400 hover:text-cyan-400 transition-colors">Services</a>
              <a href="#about" onClick={handleNavClick} className="block py-2 text-slate-400 hover:text-cyan-400 transition-colors">About</a>
              <a href="#reviews" onClick={handleNavClick} className="block py-2 text-slate-400 hover:text-cyan-400 transition-colors">Reviews</a>
              <a href="#contact" onClick={handleNavClick} className="block w-full text-center py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg mt-4">Contact Us</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 z-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 opacity-20">
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <defs><linearGradient id="skylineGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5"/><stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/></linearGradient></defs>
            <path fill="url(#skylineGrad)" d="M0,320 L0,280 L40,280 L40,250 L50,250 L50,280 L580,280 L585,140 L590,80 L592,40 L594,20 L596,10 L598,20 L600,40 L602,80 L607,140 L612,280 L1440,280 L1440,320 Z"/>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6 sm:mb-8 animate-border-glow">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-xs sm:text-sm font-medium tracking-wide">HEAD OFFICE: TORONTO, CANADA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6 tracking-tight">
            <span className="block bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">ENTERPRISE</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">TECHNOLOGY</span>
            <span className="block text-white/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">SOURCING & SUPPLY</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            We source enterprise servers, workstations, laptops & mobile devices from authorized channels.
            <span className="text-cyan-400 font-medium"> Competitive quotes. Genuine products. Global delivery.</span>
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
            <a href="#products" className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 text-sm sm:text-base">
              <span className="relative z-10 flex items-center gap-2">View Products<svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
            </a>
            <a href="#contact" className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-cyan-500/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all text-sm sm:text-base">Request Quote</a>
          </div>
          <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4">
            {[{ value: "70+", label: "Products" }, { value: "50+", label: "Countries" }, { value: "24/7", label: "Support" }].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Source Section */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-slate-500 text-sm uppercase tracking-wider">Brands We Source</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-12">
            {brands.map((brand, i) => (
              <div 
                key={i} 
                className="group flex items-center justify-center px-4 py-3 opacity-50 hover:opacity-100 transition-all duration-300"
              >
                <span 
                  className="text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300"
                  style={{ color: brand.color }}
                >
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-600 text-xs mt-6">
            All trademarks are property of their respective owners. We are an independent sourcing partner.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-16 sm:py-20 px-4 sm:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">Product Catalog</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"><span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Enterprise Solutions</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base px-4">Browse available products — contact us for current pricing and availability</p>
          </div>
          {/* Category Tabs */}
          <div className="mb-8 sm:mb-12 -mx-4 sm:mx-0">
            <div className="flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-0 pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-medium transition-all whitespace-nowrap flex-shrink-0 text-sm ${activeCategory === cat.id ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30" : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"}`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[cat.icon]}</svg>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products[activeCategory].map((product, i) => (
              <div key={`${activeCategory}-${i}`} className="group relative bg-[#12151f] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/10 group-hover:to-blue-600/5 transition-all duration-300 rounded-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:from-cyan-900/30 group-hover:to-blue-900/30 transition-all border border-white/5 group-hover:border-cyan-500/30">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[categories.find(c => c.id === activeCategory)?.icon || "server"]}</svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">{product.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4 leading-relaxed line-clamp-2">{product.specs}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                    {product.features.map((feature, j) => (<span key={j} className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] sm:text-xs text-slate-400 rounded-md group-hover:border-cyan-500/30 group-hover:text-cyan-400/80 transition-all">{feature}</span>))}
                  </div>
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10">
                    <span className="text-sm font-medium text-slate-500">Contact for pricing</span>
                    <a href="#contact" className="flex items-center gap-1 text-xs sm:text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">Get Quote<svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Bulk CTA */}
          <div className="mt-12 sm:mt-16 relative bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center overflow-hidden">
            <div className="relative">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">Need Bulk Quantities?</h3>
              <p className="text-slate-400 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">Volume discounts for 10+ units. Custom configurations available.</p>
              <a href="#contact" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-sm sm:text-base">Request Bulk Quote</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative py-16 sm:py-20 px-4 sm:px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">Our Process</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">How We Work</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[{ step: "01", title: "Request", desc: "Share your requirements via email or call" }, { step: "02", title: "Quote", desc: "Receive competitive pricing within 24-48 hours" }, { step: "03", title: "Confirm", desc: "Approve quote with flexible payment terms" }, { step: "04", title: "Deliver", desc: "Fast shipping to North America & Global" }].map((item, i) => (
              <div key={i} className="relative bg-[#12151f] border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-cyan-500/30 transition-all group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-b from-cyan-500/50 to-transparent bg-clip-text text-transparent mb-2 sm:mb-4">{item.step}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-white group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-16 sm:py-20 px-4 sm:px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">About Us</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Why Toronto Gadgets</h2>
              <div className="space-y-3 sm:space-y-4 text-slate-400 leading-relaxed text-sm sm:text-base">
                <p><span className="text-cyan-400 font-semibold">Head Office in Toronto, Ontario, Canada</span> — operating as a trade name of East Yorker Corp, with sourcing capabilities extending globally.</p>
                <p>We connect enterprise buyers with authorized distribution channels across North America, Middle East, and beyond.</p>
                <p>As a sourcing partner, we help you find competitive pricing on genuine products from authorized distributors — ensuring authenticity and full manufacturer warranty.</p>
              </div>
            </div>
            <div className="bg-[#12151f] border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="space-y-4 sm:space-y-5">
                {[{ title: "Genuine Products", desc: "Sourced from authorized distribution channels" }, { title: "Competitive Pricing", desc: "We find the best available quotes" }, { title: "Global Delivery", desc: "Shipping coordination worldwide" }, { title: "Dedicated Support", desc: "Single point of contact for your orders" }].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-slate-500 text-xs sm:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="relative py-16 sm:py-20 px-4 sm:px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">Testimonials</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">What Our Clients Say</h2>
            <p className="text-slate-500 mb-8 sm:mb-12 text-sm sm:text-base">Trusted by businesses across North America, GCC & beyond</p>
          </div>
          <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Worked With Us?</h3>
            </div>
            <p className="text-slate-400 mb-6 text-sm sm:text-base">We'd love to hear about your experience</p>
            <a href="mailto:east_yorker@outlook.com?subject=Review for Toronto Gadgets&body=Hi Toronto Gadgets,%0D%0A%0D%0AI would like to share my experience working with you.%0D%0A%0D%0AMy Review:%0D%0A[Write your review here]%0D%0A%0D%0ARating (1-5 stars): %0D%0A%0D%0AMy Name: %0D%0AMy Company/Title: %0D%0ALocation: %0D%0A%0D%0AThank you!" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Leave a Review
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-16 sm:py-20 px-4 sm:px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#12151f] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 overflow-hidden">
            <div className="relative">
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium tracking-wider uppercase mb-4">Get In Touch</div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Request a Quote</h2>
                <p className="text-slate-500 text-sm sm:text-base">Fill the form below and we'll respond within 24 hours</p>
              </div>

              {/* Quote Request Form */}
              <form 
                action="https://formspree.io/f/mdaeqapz" 
                method="POST"
                className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Quote Request Form
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Name *</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      required 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email *</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      required 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-400 mb-2">Company</label>
                    <input 
                      type="text" 
                      id="company"
                      name="company" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                      placeholder="Company name (optional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-400 mb-2">Product Category *</label>
                    <select 
                      id="category"
                      name="category" 
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                      <option value="" className="bg-slate-900">Select a category</option>
                      <option value="Enterprise Servers" className="bg-slate-900">Enterprise Servers</option>
                      <option value="Business Laptops" className="bg-slate-900">Business Laptops</option>
                      <option value="Mobile Devices" className="bg-slate-900">Mobile Devices</option>
                      <option value="Workstations" className="bg-slate-900">Workstations</option>
                      <option value="Network Equipment" className="bg-slate-900">Network Equipment</option>
                      <option value="Peripherals" className="bg-slate-900">Peripherals</option>
                      <option value="Storage Solutions" className="bg-slate-900">Storage Solutions</option>
                      <option value="Other" className="bg-slate-900">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-slate-400 mb-2">Quantity</label>
                    <input 
                      type="text" 
                      id="quantity"
                      name="quantity" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                      placeholder="e.g., 10 units (optional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-slate-400 mb-2">Delivery Country</label>
                    <input 
                      type="text" 
                      id="country"
                      name="country" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                      placeholder="e.g., Canada, UAE (optional)"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message *</label>
                  <textarea 
                    id="message"
                    name="message" 
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                    placeholder="Tell us what you're looking for — specific models, configurations, delivery timeline, etc."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit Quote Request
                </button>
              </form>

              {/* Or Contact Directly */}
              <div className="text-center mb-6">
                <p className="text-slate-500 text-sm">Or contact us directly</p>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
                <a href="mailto:east_yorker@outlook.com" className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center hover:border-cyan-500/50 transition-all">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="font-bold text-white mb-1 text-xs sm:text-sm">Email</h3>
                  <p className="text-cyan-400 text-[10px] sm:text-xs break-all leading-tight">east_yorker@outlook.com</p>
                </a>
                <a href="https://api.whatsapp.com/send?phone=14372376895&text=Hi%2C%20I'm%20interested%20in%20getting%20a%20quote%20from%20Toronto%20Gadgets." target="_blank" rel="noopener noreferrer" className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center hover:border-green-500/50 transition-all">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <h3 className="font-bold text-white mb-1 text-xs sm:text-sm">WhatsApp</h3>
                  <p className="text-green-400 text-[10px] sm:text-xs">+1 437 237 6895</p>
                </a>
                <a href="tel:+14372376895" className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center hover:border-purple-500/50 transition-all">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <h3 className="font-bold text-white mb-1 text-xs sm:text-sm">Phone</h3>
                  <p className="text-purple-400 text-[10px] sm:text-xs">+1 437 237 6895</p>
                </a>
                <a href="https://www.linkedin.com/company/toronto-gadgets" target="_blank" rel="noopener noreferrer" className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center hover:border-blue-500/50 transition-all">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <h3 className="font-bold text-white mb-1 text-xs sm:text-sm">LinkedIn</h3>
                  <p className="text-blue-400 text-[10px] sm:text-xs">Follow Us</p>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61587119518549" target="_blank" rel="noopener noreferrer" className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center hover:border-blue-400/50 transition-all col-span-2 sm:col-span-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </div>
                  <h3 className="font-bold text-white mb-1 text-xs sm:text-sm">Facebook</h3>
                  <p className="text-blue-400 text-[10px] sm:text-xs">Follow Us</p>
                </a>
              </div>

              {/* Head Office */}
              <div className="relative text-center bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-xl p-5 sm:p-6">
                <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  <h3 className="font-bold text-white text-base sm:text-lg">HEAD OFFICE</h3>
                </div>
                <p className="text-cyan-400 font-semibold text-base sm:text-lg">75 Thorncliffe Park Drive</p>
                <p className="text-white text-sm sm:text-base">Toronto, Ontario, Canada</p>
                <p className="text-slate-500 text-xs sm:text-sm mt-2">Serving North America, GCC & Global Markets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 sm:py-12 px-4 sm:px-6 border-t border-white/10 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">TG</span></div>
              <div><span className="text-white font-semibold text-sm sm:text-base">Toronto Gadgets</span><p className="text-slate-500 text-xs">Enterprise Technology Sourcing</p></div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400 overflow-x-auto scrollbar-hide w-full md:w-auto justify-center md:justify-end">
              <a href="#products" className="hover:text-cyan-400 transition-colors whitespace-nowrap">Products</a>
              <a href="#services" className="hover:text-cyan-400 transition-colors whitespace-nowrap">Services</a>
              <a href="#about" className="hover:text-cyan-400 transition-colors whitespace-nowrap">About</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors whitespace-nowrap">Contact</a>
              <a href="https://www.linkedin.com/company/toronto-gadgets" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1 whitespace-nowrap">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61587119518549" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1 whitespace-nowrap">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="hidden sm:inline">Facebook</span>
              </a>
            </div>
          </div>
          {/* Disclaimer */}
          <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 mb-6 sm:mb-8">
            <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed text-center">
              <span className="text-slate-400 font-medium">Disclaimer:</span> Toronto Gadgets operates as an independent sourcing and procurement partner. All product names, logos, and brands mentioned are property of their respective owners. We are not an authorized dealer or reseller for any manufacturer. Products are sourced through authorized distribution channels to ensure authenticity. Pricing and availability subject to confirmation at time of quote.
            </p>
          </div>
          <div className="border-t border-white/5 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <div className="space-y-1">
                <p className="text-slate-500 text-xs sm:text-sm">© 2026 Toronto Gadgets. All rights reserved.</p>
                <p className="text-slate-600 text-[10px] sm:text-xs">Toronto Gadgets is a trade name of <span className="text-cyan-400/70">East Yorker Corp</span></p>
              </div>
              <div className="text-slate-600 text-[10px] sm:text-xs space-y-0.5 sm:space-y-1 text-center md:text-right">
                <p>Federal Corporation No. 1349551-5</p>
                <p>Ontario Corporation No. 1001482504</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5 text-center">
              <p className="text-slate-600 text-[10px] sm:text-xs">75 Thorncliffe Park Drive, Toronto, Ontario M4H 1L4, Canada</p>
              <p className="text-cyan-400/50 text-[10px] sm:text-xs mt-1 sm:mt-2">torontogadgets.com</p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://api.whatsapp.com/send?phone=14372376895&text=Hi%2C%20I'm%20interested%20in%20getting%20a%20quote%20from%20Toronto%20Gadgets."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
        {/* Button */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:shadow-green-500/50 transition-all duration-300">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">
          Chat with us
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
        </div>
      </a>
    </div>
  );
}
