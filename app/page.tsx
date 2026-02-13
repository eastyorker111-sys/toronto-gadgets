const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What brands does Toronto Gadgets source?",
      acceptedAnswer: { "@type": "Answer", text: "We source from Dell, HPE, Lenovo, Cisco, Apple, Samsung, Aruba, Juniper, Ubiquiti, Fortinet, Supermicro, and other leading enterprise brands through authorized channels." },
    },
    {
      "@type": "Question",
      name: "Do you offer international delivery?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. We deliver enterprise hardware across Canada, the United States, and GCC countries including UAE, Saudi Arabia, and Oman." },
    },
    {
      "@type": "Question",
      name: "How do I get a quote?",
      acceptedAnswer: { "@type": "Answer", text: "Visit our Contact page, fill in the form with your requirements, and we'll respond with a competitive quote within 24 hours." },
    },
    {
      "@type": "Question",
      name: "Is Toronto Gadgets a registered Canadian business?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Toronto Gadgets is the registered trade name of East Yorker Corp, a federally incorporated Canadian company (BIN: 1001483714, GST/HST: 766421804RT0001)." },
    },
  ],
};

const cards = [
  { href: "/servers", title: "Enterprise Servers", desc: "Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Cisco UCS" },
  { href: "/laptops", title: "Business Laptops", desc: "MacBook Pro/Air, Dell XPS/Latitude, ThinkPad, HP EliteBook/ZBook" },
  { href: "/mobile", title: "Mobile Devices", desc: "iPhone, Galaxy, iPad, Galaxy Tab — enterprise-ready sourcing" },
  { href: "/workstations", title: "Workstations", desc: "Precision, Z series, ThinkStation, Mac Studio/Pro — pro configs" },
  { href: "/network", title: "Network Equipment", desc: "Cisco, Aruba, Juniper, Ubiquiti, Fortinet — switching & security" },
  { href: "/peripherals", title: "Peripherals", desc: "Displays, printers, docks, video bars — enterprise add-ons" },
  { href: "/storage", title: "Storage Solutions", desc: "Synology, QNAP, PowerVault, MSA — NAS/SAN & enterprise drives" },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative pt-14 sm:pt-20 pb-10 sm:pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-xs sm:text-sm font-medium tracking-wide">HEAD OFFICE: TORONTO, CANADA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4 sm:mb-6 tracking-tight">
            <span className="block bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">ENTERPRISE</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">TECHNOLOGY</span>
            <span className="block text-white/80 text-2xl sm:text-3xl md:text-4xl mt-2">SOURCING &amp; SUPPLY</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            We source enterprise servers, workstations, laptops &amp; mobile devices from authorized channels.
            <span className="text-cyan-400 font-medium"> Competitive quotes. Genuine products. Global delivery.</span>
          </p>

          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
            <a href="/servers" className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 text-sm sm:text-base">
              View Categories
            </a>
            <a href="/contact" className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-cyan-500/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all text-sm sm:text-base">
              Request Quote
            </a>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="relative pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cards.map((c) => (
              <a key={c.href} href={c.href} className="group relative bg-[#12151f] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/10 group-hover:to-blue-600/5 transition-all rounded-2xl" />
                <div className="relative">
                  <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{c.title}</h2>
                  <p className="text-slate-500 mt-2 text-sm leading-relaxed">{c.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold">Browse <span aria-hidden="true">→</span></div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/contact" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-sm sm:text-base">
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-10">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">How It Works</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Tell Us What You Need", desc: "Submit a quote request with your hardware requirements and quantities." },
              { step: "02", title: "We Source & Quote", desc: "We check authorized channels and send you competitive pricing within 24 hours." },
              { step: "03", title: "We Deliver", desc: "Genuine enterprise hardware shipped to Canada, US, or GCC with full warranty." },
            ].map((s) => (
              <div key={s.step} className="bg-[#12151f] border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">{s.step}</div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-10">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">FAQ</span>
          </h2>
          <div className="space-y-4">
            {(faqJsonLd.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>).map((q) => (
              <div key={q.name} className="bg-[#12151f] border border-white/10 rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-2">{q.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
