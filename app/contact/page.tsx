export const metadata = {
  title: "Contact | Toronto Gadgets",
  description: "Request a quote for enterprise hardware sourcing. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-4 sm:px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-3xl sm:text-4xl font-black">Request a Quote</h1>
          <a href="/" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 hover:bg-white/10">Home</a>
        </div>

        <p className="text-slate-400 mt-4">
          Fill the form and we’ll respond within 24 hours.
        </p>

        <form
          action="https://formspree.io/f/mdaeqapz"
          method="POST"
          className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8"
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Company</label>
              <input
                type="text"
                name="company"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="Company name (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Category *</label>
              <select
                name="category"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
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
              <label className="block text-sm font-medium text-slate-400 mb-2">Quantity</label>
              <input
                type="text"
                name="quantity"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="e.g., 10 units (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Delivery Country</label>
              <input
                type="text"
                name="country"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="e.g., Canada, UAE (optional)"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-400 mb-2">Message *</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none"
              placeholder="Tell us what you're looking for — specific models, configurations, delivery timeline, etc."
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Submit Quote Request
          </button>

          <div className="mt-8 text-xs text-slate-500">
            Or email directly: <a className="text-cyan-400" href="mailto:east_yorker@outlook.com">east_yorker@outlook.com</a>
          </div>
        </form>
      </div>
    </main>
  );
}
