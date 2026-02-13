"use client";

import { useState } from "react";

const navLinks = [
  { href: "/servers", label: "Servers" },
  { href: "/laptops", label: "Laptops" },
  { href: "/workstations", label: "Workstations" },
  { href: "/network", label: "Network" },
  { href: "/storage", label: "Storage" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-cyan-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
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
            <div className="text-[9px] sm:text-[10px] tracking-[0.2em] text-cyan-400/70 uppercase">
              Enterprise Technology
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="/contact"
            className="px-5 lg:px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Get Quote
          </a>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line block w-6 h-0.5 bg-white rounded-full ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`hamburger-line block w-6 h-0.5 bg-white rounded-full ${open ? "opacity-0" : ""}`} />
          <span className={`hamburger-line block w-6 h-0.5 bg-white rounded-full ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-3 px-4 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact"
              className="mt-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg text-center"
            >
              Get Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
