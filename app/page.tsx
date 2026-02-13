export default function Home() {
  const cards = [
    { href: "/servers", title: "Enterprise Servers", desc: "Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Cisco UCS" },
    { href: "/laptops", title: "Business Laptops", desc: "MacBook Pro/Air, Dell XPS/Latitude, ThinkPad, HP EliteBook/ZBook" },
    { href: "/mobile", title: "Mobile Devices", desc: "iPhone, Galaxy, iPad, Galaxy Tab — enterprise-ready sourcing" },
    { href: "/workstations", title: "Workstations", desc: "Precision, Z series, ThinkStation, Mac Studio/Pro — pro configs" },
    { href: "/network", title: "Network Equipment", desc: "Cisco, Aruba, Juniper, Ubiquiti, Fortinet — switching & security" },
    { href: "/peripherals", title: "Peripherals", desc: "Displays, printers, docks, video bars — enterprise add-ons" },
    { href: "/storage", title: "Storage Solutions", desc: "Synology, QNAP, PowerVault, MSA — NAS/SAN & enterprise drives" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 200, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-24 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[110px]" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-[110px]" />
      </div>

      {/* Top Nav */}
      <nav className="sticky top-0 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-cyan-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl blur-sm opacity-50" />
              <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center border border-cyan-400/50">
                <span className="text-white font-black text-lg sm:text-xl tracking-tighter">TG</span>
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">TORONTO</span>
                <span className="text-white ml-1">GADGETS</span>
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.2em] text-cyan-400/70 uppercase">Enterprise Technology</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="/servers" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Servers</a>
            <a href="/laptops" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Laptops</a>
            <a href="/network" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Network</a>
            <a href="/contact" className="relative px-5 lg:px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg overflow-hidden">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-14 sm:pt-18 pb-10 sm:pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <span className="text-cyan-400 text-xs sm:text-sm font-medium tracking-wide">HEAD OFFICE: TORONTO, CANADA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4 sm:mb-6 tracking-tight">
            <span className="block bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">ENTERPRISE</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">TECHNOLOGY</span>
            <span className="block text-white/80 text-2xl sm:text-3xl md:text-4xl mt-2">SOURCING & SUPPLY</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            We source enterprise servers, workstations, laptops & mobile devices from authorized channels.
            <span className="text-cyan-400 font-medium"> Competitive quotes. Genuine products. Global delivery.</span>
          </p>

          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
            <a
              href="/servers"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 text-sm sm:text-base"
            >
              View Categories
            </a>
            <a
              href="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-cyan-500/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all text-sm sm:text-base"
            >
              Request Quote
            </a>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="relative pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cards.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="group relative bg-[#12151f] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/10 group-hover:to-blue-600/5 transition-all rounded-2xl" />
                <div className="relative">
                  <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{c.title}</h2>
                  <p className="text-slate-500 mt-2 text-sm leading-relaxed">{c.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                    Browse <span aria-hidden>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/contact"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-sm sm:text-base"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-xs">
          <p>© 2026 Toronto Gadgets. All rights reserved.</p>
          <p className="mt-2">75 Thorncliffe Park Drive, Toronto, Ontario M4H 1L4, Canada</p>
          <p className="mt-2 text-cyan-400/50">torontogadgets.com</p>
        </div>
      </footer>
    </div>
  );
}
