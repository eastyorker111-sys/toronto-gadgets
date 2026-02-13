const footerLinks = [
  { href: "/servers", label: "Servers" },
  { href: "/laptops", label: "Laptops" },
  { href: "/workstations", label: "Workstations" },
  { href: "/network", label: "Network" },
  { href: "/storage", label: "Storage" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#060609]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Top row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center border border-cyan-400/50">
                <span className="text-white font-black text-sm tracking-tighter">TG</span>
              </div>
              <div>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">TORONTO</span>
                <span className="text-white font-bold ml-1">GADGETS</span>
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              B2B enterprise technology sourcing partner. Servers, workstations, laptops & network equipment.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Products</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.slice(0, 5).map((l) => (
                <a key={l.href} href={l.href} className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Company</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.slice(5).map((l) => (
                <a key={l.href} href={l.href} className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Contact</h3>
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <a href="tel:+14372376895" className="hover:text-cyan-400 transition-colors">+1 (437) 237-6895</a>
              <a href="mailto:east_yorker@outlook.com" className="hover:text-cyan-400 transition-colors">east_yorker@outlook.com</a>
              <p>75 Thorncliffe Park Drive<br />Toronto, ON M4H 1L4, Canada</p>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.linkedin.com/company/toronto-gadgets"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-slate-400">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61587119518549"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-slate-400">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-slate-600">
          <p>&copy; {new Date().getFullYear()} Toronto Gadgets &mdash; Trade name of East Yorker Corp</p>
          <p>BIN: 1001483714 &middot; GST/HST: 766421804RT0001</p>
        </div>
      </div>
    </footer>
  );
}
