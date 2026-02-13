import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Quote | Contact Toronto Gadgets",
  description: "Request a quote for enterprise hardware: servers, laptops, workstations, network equipment. We respond within 24 hours with competitive pricing.",
  alternates: { canonical: "https://torontogadgets.com/contact" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://torontogadgets.com/contact" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6"><a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span><span className="text-slate-300">Contact</span></nav>

          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">Request a Quote</h1>
          <p className="text-slate-400 text-sm mb-8">Fill in the form and we&apos;ll respond within 24 hours with competitive pricing.</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form action="https://formspree.io/f/mdaeqapz" method="POST" className="bg-[#12151f] border border-white/10 rounded-2xl p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Name *</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Email *</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Company</label>
                    <input type="text" name="company" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50" placeholder="Company name (optional)" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Category *</label>
                    <select name="category" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50">
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
                    <label className="block text-xs font-medium text-slate-400 mb-2">Quantity</label>
                    <input type="text" name="quantity" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50" placeholder="e.g., 10 units (optional)" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Delivery Country</label>
                    <input type="text" name="country" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50" placeholder="e.g., Canada, UAE (optional)" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-medium text-slate-400 mb-2">Message *</label>
                  <textarea name="message" required rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 resize-none" placeholder="Describe what you need — model numbers, specs, quantities..." />
                </div>
                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                  Submit Quote Request
                </button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-4">
              <div className="bg-[#12151f] border border-white/10 rounded-xl p-5">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Direct Contact</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-[10px] text-slate-600 mb-0.5">Phone / WhatsApp</div>
                    <a href="tel:+14372376895" className="text-white hover:text-cyan-400 transition-colors">+1 (437) 237-6895</a>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 mb-0.5">Email</div>
                    <a href="mailto:east_yorker@outlook.com" className="text-white hover:text-cyan-400 transition-colors">east_yorker@outlook.com</a>
                  </div>
                </div>
              </div>
              <div className="bg-[#12151f] border border-white/10 rounded-xl p-5">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Office</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  75 Thorncliffe Park Drive<br />Toronto, Ontario M4H 1L4<br />Canada
                </p>
              </div>
              <div className="bg-[#12151f] border border-white/10 rounded-xl p-5">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Response Time</h3>
                <p className="text-sm text-white font-semibold">Within 24 hours</p>
                <p className="text-xs text-slate-500 mt-1">For urgent requests, call or WhatsApp directly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
