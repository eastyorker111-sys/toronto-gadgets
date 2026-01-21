export default function Home() {
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

      {/* Products */}
      <section id="products" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Categories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Enterprise-grade technology from leading manufacturers</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group p-8 bg-slate-50 rounded-xl hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-200 group-hover:bg-slate-800 rounded-lg flex items-center justify-center mb-6 transition-colors">
                <svg className="w-7 h-7 text-slate-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">Enterprise Servers</h3>
              <p className="text-slate-600 group-hover:text-slate-300 transition-colors leading-relaxed">Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem. Rack, tower, and blade configurations.</p>
            </div>
            <div className="group p-8 bg-slate-50 rounded-xl hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-200 group-hover:bg-slate-800 rounded-lg flex items-center justify-center mb-6 transition-colors">
                <svg className="w-7 h-7 text-slate-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">Business Laptops</h3>
              <p className="text-slate-600 group-hover:text-slate-300 transition-colors leading-relaxed">MacBook Pro, Dell XPS, HP EliteBook, Lenovo ThinkPad. Premium builds for professionals.</p>
            </div>
            <div className="group p-8 bg-slate-50 rounded-xl hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-200 group-hover:bg-slate-800 rounded-lg flex items-center justify-center mb-6 transition-colors">
                <svg className="w-7 h-7 text-slate-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">Mobile Devices</h3>
              <p className="text-slate-600 group-hover:text-slate-300 transition-colors leading-relaxed">iPhone, Samsung Galaxy, tablets. Bulk enterprise orders with MDM support.</p>
            </div>
            <div className="group p-8 bg-slate-50 rounded-xl hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-200 group-hover:bg-slate-800 rounded-lg flex items-center justify-center mb-6 transition-colors">
                <svg className="w-7 h-7 text-slate-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">Workstations</h3>
              <p className="text-slate-600 group-hover:text-slate-300 transition-colors leading-relaxed">High-performance workstations for engineering, design, and data processing.</p>
            </div>
            <div className="group p-8 bg-slate-50 rounded-xl hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-200 group-hover:bg-slate-800 rounded-lg flex items-center justify-center mb-6 transition-colors">
                <svg className="w-7 h-7 text-slate-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">Network Equipment</h3>
              <p className="text-slate-600 group-hover:text-slate-300 transition-colors leading-relaxed">Cisco, Ubiquiti, Aruba. Switches, routers, access points, and security appliances.</p>
            </div>
            <div className="group p-8 bg-slate-50 rounded-xl hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-200 group-hover:bg-slate-800 rounded-lg flex items-center justify-center mb-6 transition-colors">
                <svg className="w-7 h-7 text-slate-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">Business Peripherals</h3>
              <p className="text-slate-600 group-hover:text-slate-300 transition-colors leading-relaxed">Monitors, printers, docking stations, conferencing equipment. Complete office setup.</p>
            </div>
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
