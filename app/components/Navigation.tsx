"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import Brand from "./Brand";
import catalog from "../data/catalog.json";
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const dropdown = useRef<HTMLDetailsElement>(null);
  const close = () => {
    setOpen(false);
    if (dropdown.current) dropdown.current.open = false;
  };
  return (
    <header className="site-header">
      <div className="shell nav-row">
        <Link href="/" aria-label="Toronto Gadgets home" onClick={close}>
          <Brand />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <details
            className="technology-menu"
            ref={dropdown}
            onKeyDown={(e) => {
              if (e.key === "Escape" && dropdown.current) {
                dropdown.current.open = false;
                dropdown.current.querySelector("summary")?.focus();
              }
            }}
          >
            <summary>
              Technology <span aria-hidden="true">⌄</span>
            </summary>
            <div>
              {catalog.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} onClick={close}>
                  {c.title} ↗
                </Link>
              ))}
              <Link href="/contact?mode=custom" onClick={close}>
                Request your own item ↗
              </Link>
            </div>
          </details>
          <Link href="/services" onClick={close}>
            Sourcing services
          </Link>
          <Link href="/about" onClick={close}>
            About us
          </Link>
          <Link className="button" href="/contact" onClick={close}>
            Request a quote ↗
          </Link>
        </nav>
        <button
          className="menu-toggle"
          aria-controls="mobile-nav"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close ×" : "Menu ☰"}
        </button>
      </div>
      {open && (
        <nav
          className="mobile-nav shell"
          id="mobile-nav"
          aria-label="Mobile navigation"
        >
          {catalog.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} onClick={close}>
              {c.title} ↗
            </Link>
          ))}
          {[
            ["/services", "Sourcing services"],
            ["/about", "About us"],
            ["/blog", "Insights"],
            ["/contact", "Request a quote"],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={close}>
              {label} ↗
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
