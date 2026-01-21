export default function Home() {
  const products = {
    servers: [
      { name: "Dell PowerEdge R760", specs: "2x Intel Xeon Gold 6430 | 256GB DDR5 | 4x 1.92TB NVMe SSD | Dual 800W PSU", price: "From $12,500" },
      { name: "HPE ProLiant DL380 Gen11", specs: "2x Intel Xeon Silver 4410Y | 128GB DDR5 | 8x 2.4TB SAS | iLO Advanced", price: "From $9,800" },
      { name: "Lenovo ThinkSystem SR650 V3", specs: "2x Intel Xeon Gold 5415+ | 256GB DDR5 | 6x 1.92TB SSD | XClarity", price: "From $11,200" },
    ],
    laptops: [
      { name: "MacBook Pro 16\" M3 Max", specs: "Apple M3 Max | 48GB Unified Memory | 1TB SSD | 16\" Liquid Retina XDR", price: "From $3,499" },
      { name: "Dell XPS 15 9530", specs: "Intel Core i9-13900H | 64GB DDR5 | 2TB NVMe | RTX 4070 | 15.6\" OLED", price: "From $2,899" },
      { name: "Lenovo ThinkPad X1 Carbon Gen 11", specs: "Intel Core i7-1365U | 32GB | 1TB SSD | 14\" 2.8K OLED | 5G LTE", price: "From $2,199" },
      { name: "HP EliteBook 860 G10", specs: "Intel Core i7-1365U | 32GB DDR5 | 512GB SSD | 16\" WUXGA | Sure View", price: "From $1,899" },
    ],
    mobile: [
      { name: "iPhone 15 Pro Max", specs: "256GB | A17 Pro | Titanium | 5G | eSIM Enterprise Ready", price: "From $1,199" },
      { name: "iPhone 15 Pro", specs: "256GB | A17 Pro | Titanium | 5G | MDM Compatible", price: "From $999" },
      { name: "Samsung Galaxy S24 Ultra", specs: "512GB | Snapdragon 8 Gen 3 | S Pen | Knox Security", price: "From $1,299" },
      { name: "Samsung Galaxy Z Fold5", specs: "512GB | 7.6\" Foldable | Knox Enterprise | 5G", price: "From $1,799" },
      { name: "iPad Pro 12.9\" M2", specs: "256GB | M2 Chip | Wi-Fi + Cellular | Face ID | Apple Pencil 2", price: "From $1,199" },
    ],
    workstations: [
      { name: "Dell Precision 7875 Tower", specs: "AMD Ryzen Threadripper PRO 5975WX | 128GB ECC | RTX A6000 | 2TB NVMe", price: "From $8,500" },
      { name: "HP Z8 G5 Fury", specs: "Intel Xeon w9-3495X | 256GB DDR5 | NVIDIA RTX 6000 Ada | 4TB SSD", price: "From $15,900" },
      { name: "Lenovo ThinkStation P620", specs: "AMD Threadripper PRO 5965WX | 256GB ECC | RTX A5000 | 2TB NVMe", price: "From $7,200" },
    ],
    network: [
      { name: "Cisco Catalyst 9300-48P", specs: "48x 1GbE PoE+ | 4x 10G SFP+ | UADP 2.0 | DNA License Ready", price: "From $4,800" },
      { name: "Cisco Meraki MS250-48FP", specs: "48x 1GbE PoE+ | 4x 10G SFP+ | Cloud Managed | 740W PoE Budget", price: "From $6,200" },
      { name: "Ubiquiti UniFi Dream Machine Pro", specs: "10G SFP+ | 8-Port Switch | UniFi Controller | IDS/IPS | 3.5\" HDD Bay", price: "From $499" },
      { name: "Aruba 6300M 48-Port", specs: "48x 1GbE | 4x 50G SFP56 | VSX | Dynamic Segmentation", price: "From $5,100" },
    ],
    peripherals: [
      { name: "Dell UltraSharp U3223QE", specs: "32\" 4K IPS | USB-C Hub | 90W PD | KVM | HDR 400", price: "From $899" },
      { name: "HP LaserJet Enterprise M611dn", specs: "65 ppm | Duplex | Gigabit | 550-Sheet Tray | HP Sure Start", price: "From $699" },
      { name: "Poly Studio X70", specs: "4K Dual Camera | Dolby Vision | NoPC Video Bar | Teams/Zoom Certified", price: "From $5,999" },
      { name: "CalDigit TS4 Thunderbolt 4 Dock", specs: "18 Ports | 98W PD | 2.5GbE | SD 4.0 | DisplayPort 1.4", price: "From $449" },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">TG</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Toronto Gadgets</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Products</a>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Services</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">About</a>
            <a href="#contact" className="px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition">Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full mb-6">B2B Electronics Distribution</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
            Enterprise Technology<br /><span className="text-slate-500">Direct Supply</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Premium servers, workstations, laptops, and mobile devices for businesses. Competitive pricing. Full support. GCC and global delivery.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#products" className="px-8 py-3.5 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800 transition">View Products</a>
            <a href="#contact" className="px-8 py-3.5 border-2 border-slate-300 text-slate-900 rounded-md font-medium hover:border-slate-900 transition">Request Quote</a>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section id="products" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Catalog</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Enterprise-grade technology from leading manufacturers. Bulk pricing available.</p>
          </div>

          {/* Enterprise Servers */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Enterprise Servers</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {products.servers.map((product, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-lg transition-all">
                  <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{product.specs}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{product.price}</span>
                    <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Get Quote →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Laptops */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Business Laptops</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.laptops.map((product, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-lg transition-all">
                  <div className="h-28 bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold mb-2">{product.name}</h4>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{product.specs}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{product.price}</span>
                    <a href="#contact" className="text-xs font-medium text-slate-600 hover:text-slate-900 transition">Quote →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Devices */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Mobile Devices</h3>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {products.mobile.map((product, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-5 hover:border-slate-400 hover:shadow-lg transition-all">
                  <div className="h-24 bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-sm mb-2">{product.name}</h4>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">{product.specs}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{product.price}</span>
                    <a href="#contact" className="text-xs font-medium text-slate-600 hover:text-slate-900 transition">Quote →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workstations */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Workstations</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {products.workstations.map((product, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-lg transition-all">
                  <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{product.specs}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{product.price}</span>
                    <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Get Quote →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Network Equipment */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Network Equipment</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.network.map((product, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-lg transition-all">
                  <div className="h-28 bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <h4 className="font-bold mb-2">{product.name}</h4>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{product.specs}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{product.price}</span>
                    <a href="#contact" className="text-xs font-medium text-slate-600 hover:text-slate-900 transition">Quote →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peripherals */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Business Peripherals</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.peripherals.map((product, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-lg transition-all">
                  <div className="h-28 bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                  <h4 className="font-bold mb-2">{product.name}</h4>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{product.specs}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{product.price}</span>
                    <a href="#contact" className="text-xs font-medium text-slate-600 hover:text-slate-900 transition">Quote →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bulk Order CTA */}
          <div className="mt-16 bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Bulk Quantities?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">We offer competitive pricing for enterprise orders. Volume discounts available for 10+ units.</p>
            <a href="#contact" className="inline-block px-8 py-3 bg-white text-slate-900 rounded-md font-medium hover:bg-slate-100 transition">Request Bulk Quote</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Streamlined procurement for businesses of all sizes</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-slate-200 mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">Request</h3>
              <p className="text-slate-600 leading-relaxed">Share your requirements via email or call. Specs, quantities, timeline.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-slate-200 mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">Quote</h3>
              <p className="text-slate-600 leading-relaxed">Receive competitive pricing within 24-48 hours. No hidden fees.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-slate-200 mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">Confirm</h3>
              <p className="text-slate-600 leading-relaxed">Approve quote and confirm order. Flexible payment terms available.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-slate-200 mb-4">04</div>
              <h3 className="text-xl font-bold mb-2">Deliver</h3>
              <p className="text-slate-600 leading-relaxed">Fast shipping to GCC, Middle East, and global destinations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Toronto Gadgets</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>Based in Toronto with operations extending to the GCC region. We bridge North American technology suppliers with Middle Eastern enterprise buyers.</p>
                <p>Our team combines 19+ years of operations experience across logistics, hospitality, and financial services with deep regional knowledge of Oman, UAE, and Saudi markets.</p>
                <p>Direct relationships with authorized distributors mean competitive pricing without compromising on authenticity or warranty coverage.</p>
              </div>
            </div>
            <div className="bg-slate-100 rounded-xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Authorized Products</h4>
                    <p className="text-slate-600 text-sm">Genuine products with full manufacturer warranty</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Competitive Pricing</h4>
                    <p className="text-slate-600 text-sm">Direct sourcing eliminates middleman markups</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Global Delivery</h4>
                    <p className="text-slate-600 text-sm">Reliable shipping to GCC, Middle East, and worldwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Dedicated Support</h4>
                    <p className="text-slate-600 text-sm">Single point of contact for all your orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">Ready to discuss your technology requirements? Reach out for quotes, inquiries, or partnership opportunities.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="font-bold mb-2">Email</h3>
              <a href="mailto:east_yorker@outlook.com" className="text-slate-300 hover:text-white transition">east_yorker@outlook.com</a>
            </div>
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <h3 className="font-bold mb-2">WhatsApp</h3>
              <a href="https://wa.me/14372376895" className="text-slate-300 hover:text-white transition">+1 437 237 6895</a>
            </div>
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="font-bold mb-2">Oman Office</h3>
              <a href="tel:+96890655212" className="text-slate-300 hover:text-white transition">+968 9065 5212</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800">
            <p className="text-slate-400 text-sm">Toronto • Salalah, Oman • Serving GCC, Middle East & Global Markets</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-950 text-center">
        <p className="text-slate-500 text-sm">© 2025 Toronto Gadgets. Enterprise Electronics & Business Technology Distribution.</p>
      </footer>
    </div>
  );
}
