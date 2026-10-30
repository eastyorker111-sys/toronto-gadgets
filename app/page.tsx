import Link from "next/link";
import Image from "next/image";
import catalog from "./data/catalog.json";
const homepageCategories = ["servers", "laptops", "workstations", "network", "storage", "mobile", "peripherals"]
  .flatMap((slug) => catalog.filter((category) => category.slug === slug));
const faqs = [
  [
    "Can I request an item that is not listed?",
    "Yes. Enter your own model, part number or product link in the quote form. You can also describe your requirements and ask us to suggest options.",
  ],
  [
    "Can I request several different items?",
    "Yes. Add laptops, servers, accessories or other items to the same request. Include quantities and specifications for each item.",
  ],
  [
    "What brands do you source?",
    "Our sourcing categories include Dell, HPE, HP, Lenovo, Cisco, Apple, Samsung, Aruba, Juniper, Ubiquiti, Fortinet, Supermicro and other business technology brands. Availability is checked for each request through reputable supplier and distributor networks.",
  ],
  [
    "Are the listed models in stock?",
    "The models are examples for your sourcing request, not a live inventory. Exact specifications, availability, pricing, delivery and manufacturer warranty where applicable are confirmed in the quote.",
  ],
  [
    "Where are you based, and where can I request delivery?",
    "Toronto Gadgets is based in Toronto, Ontario, Canada and operates under East Yorker Corp. Tell us your delivery requirements in Canada, the United States or the GCC so we can confirm options for your request.",
  ],
  [
    "How do I get a quote?",
    "Use our quote form or contact us by phone, email or WhatsApp. Share the items, quantities, specifications and destination. We review your requirements and follow up; submitting a request does not place an order.",
  ],
];
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(([name, text]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text },
            })),
          }),
        }}
      />
      <div className="hero-band">
      <section className="shell hero">
        <div className="hero-copy">
          <p className="eyebrow">Toronto-based. Built around your requirements.</p>
          <h1>
            The right hardware.<br />For your business.
          </h1>
          <p className="intro">
            From a single laptop to your next infrastructure project. Tell us what you need. We’ll help you source it.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/contact?mode=custom">
              Start your request ↗
            </Link>
            <Link className="text-link" href="#technology">
              Explore technology
            </Link>
          </div>
          <p className="hero-note">
            Pricing by quotation. Your own models and item lists welcome.
          </p>
        </div>
        <figure className="hero-visual">
          <Image
            src="/brand/hero-adobe-teal.png"
            alt="Illustrative business laptop, workstation and server for Toronto Gadgets technology sourcing"
            width={2304}
            height={1792}
            priority
            sizes="(max-width: 760px) 100vw, 70vw"
          />
        </figure>
      </section>
      <nav className="shell sourcing-routes" aria-label="Start your sourcing request">
        <Link href="/contact?mode=custom"><div><strong>I know what I need</strong><span>Send models, links or an equipment list</span></div><b aria-hidden="true">↗</b></Link>
        <Link href="/contact?mode=help"><div><strong>Help me build a setup</strong><span>Start with your work and requirements</span></div><b aria-hidden="true">↗</b></Link>
        <Link href="#technology"><div><strong>Let me explore</strong><span>Browse technology we can source</span></div><b aria-hidden="true">↓</b></Link>
      </nav>
      </div>
      <section className="shell technology-section" id="technology">
        <div className="section-heading">
          <div>
            <h2>What does your business need?</h2>
          </div>
          <p>
            Explore sourcing categories.<br />Exact models are just the starting point.
          </p>
        </div>
        <div className="category-grid">
          {homepageCategories.map((c) => (
            <Link className="category-card" href={`/${c.slug}`} key={c.slug}>
              <Image
                src={c.image}
                width={600}
                height={400}
                sizes="(max-width:540px) 100vw, (max-width:1000px) 50vw, 280px"
                alt={`${c.title} category illustration`}
              />
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <span className="category-link">
                Explore options <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
          <Link
            href="/contact?mode=custom"
            className="category-card custom-category"
          >
            <h3>Not on the list?</h3>
            <p>
              Send models, links or specifications.
            </p>
            <span className="category-link">
              Build your request <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
        <p className="catalogue-disclaimer">Images illustrate sourcing categories, not live stock. Specifications, availability and pricing are confirmed in your quote.</p>
      </section>
      <section className="process-section">
        <div className="shell process-layout">
          <div>
            <h2>A clear path from request to quote.</h2>
          </div>
          <div className="steps">
            {[
              [
                "01",
                "Tell us what you need",
                "Choose an example model or add your own items, specifications, quantities and destination.",
              ],
              [
                "02",
                "We source and quote",
                "We check sourcing options through reputable supplier and distributor networks and prepare your quote.",
              ],
              [
                "03",
                "Confirm and coordinate",
                "Review the details before ordering. Delivery and manufacturer warranty where applicable are confirmed for your request.",
              ],
            ].map(([n, t, p]) => (
              <div className="step" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="shell mission-section">
        <div className="mission-grid">
          <div>
            <h2>Sourcing with a purpose.</h2>
          </div>
          <div>
            <p>
              We help businesses find technology that fits their work.
              Bring your requirements. We will help you explore the options.
            </p>
            <Link href="/about" className="text-link">
              About Toronto Gadgets ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="shell faq-section">
        <h2>Before you request a quote.</h2>
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <section className="shell closing">
        <p className="eyebrow">LET’S TALK TECHNOLOGY</p>
        <h2>
          Your next project starts
          <br />
          with a conversation.
        </h2>
        <Link href="/contact" className="button">
          Request a quote ↗
        </Link>
        <p>Toronto-based sourcing. A quote built around your requirements.</p>
      </section>
    </>
  );
}
