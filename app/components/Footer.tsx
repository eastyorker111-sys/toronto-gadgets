import Link from "next/link";
import Brand from "./Brand";
import catalog from "../data/catalog.json";
import { contactLinks } from "../data/contact";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Link href="/" aria-label="Toronto Gadgets home">
              <Brand />
            </Link>
            <p>
              Toronto-based B2B technology sourcing.
              <br />
              Business-grade hardware. Pricing by quote.
            </p>
          </div>
          <div>
            <h3>Technology</h3>
            {catalog.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`}>
                {c.title}
              </Link>
            ))}
          </div>
          <div>
            <h3>Toronto Gadgets</h3>
            <Link href="/about">About us</Link>
            <Link href="/services">Sourcing services</Link>
            <Link href="/blog">Insights</Link>
            <Link href="/contact">Request a quote</Link>
            <Link href="/contact?mode=custom">Request your own item</Link>
          </div>
          <div>
            <h3>Let’s connect</h3>
            <a href="tel:+14372376895">+1 (437) 237-6895</a>
            <a href="mailto:torontogadgets1001@gmail.com">
              torontogadgets1001@gmail.com
            </a>
            <p>
              75 Thorncliffe Park Drive
              <br />
              Toronto, Ontario M4H 1L4, Canada
            </p>
            <a
              href={contactLinks.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href={contactLinks.whatsApp} target="_blank" rel="noopener noreferrer">
              WhatsApp ↗
            </a>
            <a href={contactLinks.googleMaps} target="_blank" rel="noopener noreferrer">
              Google Maps profile ↗
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61587119518549"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Toronto Gadgets · Trade name of East
            Yorker Corp
          </span>
          <span>Toronto, Ontario, Canada</span>
        </div>
      </div>
    </footer>
  );
}
