import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Complete Guide to IT Hardware Procurement for Canadian Businesses | Toronto Gadgets",
  description:
    "Step-by-step guide to enterprise IT hardware procurement in Canada — vendor selection, RFQ processes, customs, warranties, lifecycle management, and cost optimization.",
  alternates: {
    canonical: "https://torontogadgets.com/blog/it-hardware-procurement-guide",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "The Complete Guide to IT Hardware Procurement for Canadian Businesses",
  datePublished: "2026-02-05",
  dateModified: "2026-09-16",
  author: {
    "@type": "Organization",
    name: "Toronto Gadgets",
    url: "https://torontogadgets.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Toronto Gadgets",
    logo: {
      "@type": "ImageObject",
      url: "https://torontogadgets.com/og-image.png",
    },
  },
  mainEntityOfPage:
    "https://torontogadgets.com/blog/it-hardware-procurement-guide",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://torontogadgets.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://torontogadgets.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "IT Hardware Procurement Guide",
      item: "https://torontogadgets.com/blog/it-hardware-procurement-guide",
    },
  ],
};

export default function ProcurementGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="shell article-page">
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs text-[#676660] mb-6">
            <Link href="/" className="hover:text-[#a64037] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/blog"
              className="hover:text-[#a64037] transition-colors"
            >
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#555550]">
              IT Hardware Procurement Guide
            </span>
          </nav>

          <div className="text-xs text-[#676660] mb-4">
            <time dateTime="2026-02-05">February 5, 2026</time> · 8 min read
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#25282d] mb-6 leading-tight">
            The Complete Guide to IT Hardware Procurement for Canadian
            Businesses
          </h1>

          <div className="prose-custom space-y-5 text-[#676660] text-sm leading-relaxed">
            <p>
              Procuring enterprise IT hardware is more than just buying
              equipment. It involves vendor evaluation, competitive quoting,
              compliance checks, logistics coordination, and lifecycle planning.
              This guide walks through the entire process for Canadian
              businesses — whether you&apos;re refreshing a server room or
              deploying 500 laptops.
            </p>

            <h2 className="text-lg font-bold text-[#25282d] mt-8 mb-3">
              1. Define Your Requirements
            </h2>
            <p>
              Start with a clear specification. Document exactly what you need:
              model numbers (or equivalent), configurations (CPU, RAM, storage,
              GPU), quantities, delivery timelines, and any compliance
              requirements (e.g., ITAR, FIPS, accessibility standards).
            </p>
            <p>
              For servers, specify rack density, power requirements, and cooling
              constraints. For laptops, define the user profiles — a developer
              needs different specs than an accountant. The clearer your
              specification, the more accurate your quotes will be.
            </p>

            <h2 className="text-lg font-bold text-[#25282d] mt-8 mb-3">
              2. Choose Your Sourcing Channel
            </h2>
            <p>
              Compare direct manufacturers, distributors and B2B sourcing
              providers. Evaluate each quote on the same requirements, including
              product condition, specifications, lead time and support. Toronto
              Gadgets sources through reputable supplier and distributor
              networks and coordinates quote requests.
            </p>

            <h2 className="text-lg font-bold text-[#25282d] mt-8 mb-3">
              3. Request for Quotation (RFQ)
            </h2>
            <p>
              Send your specification to multiple vendors. A good RFQ includes
              exact product details, quantities, delivery location, preferred
              delivery date, payment terms, and warranty requirements. Ask
              vendors to quote both their standard offering and any alternatives
              they recommend.
            </p>
            <p>
              Ask each provider to confirm its quote turnaround and validity.
              Complex configurations may require further checks with suppliers.
            </p>

            <h2 className="text-lg font-bold text-[#25282d] mt-8 mb-3">
              4. Evaluate Quotes
            </h2>
            <p>
              Don&apos;t just compare the bottom line. Evaluate total cost of
              ownership: hardware price, shipping costs, customs duties that may
              apply to cross-border purchases, warranty coverage, support
              levels, and lead times. A lower hardware price with longer lead
              time or reduced warranty may cost you more in the long run.
            </p>

            <h2 className="text-lg font-bold text-[#25282d] mt-8 mb-3">
              5. Canadian-Specific Considerations
            </h2>
            <p>
              For Canadian or cross-border purchases, ask the supplier to
              identify the delivery destination, currency, shipping terms and
              charges included in the quote. Confirm applicable tax, customs and
              procurement requirements with the relevant authorities or your
              advisers. The official resources below are a starting point.
            </p>
            <h2 className="text-lg font-bold text-[#25282d] mt-8 mb-3">
              6. Warranties & Support
            </h2>
            <p>
              Request the exact manufacturer warranty and service terms where
              applicable. Confirm coverage duration, service level, destination
              eligibility and any paid support options for the quoted model.
              Keep purchase records, serial numbers and service tags.
            </p>
            <h2 className="text-lg font-bold text-[#25282d] mt-8 mb-3">
              7. Lifecycle Management
            </h2>
            <p>
              Plan refreshes around workload needs, reliability, support
              coverage and your budget. Ask your IT team to define data-handling
              and disposal requirements before equipment is reused or retired,
              and use the relevant official guidance when reviewing obligations.
            </p>
            <h2 className="text-lg font-bold text-[#25282d] mt-8 mb-3">
              Sources &amp; References
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <a
                  href="https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a64037] hover:text-[#86332c] transition-colors"
                >
                  GST/HST for businesses — Canada Revenue Agency
                </a>
              </li>
              <li>
                <a
                  href="https://www.cbsa-asfc.gc.ca/import/menu-eng.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a64037] hover:text-[#86332c] transition-colors"
                >
                  Importing commercial goods (duties and taxes) — Canada Border
                  Services Agency
                </a>
              </li>
              <li>
                <a
                  href="https://www.cbsa-asfc.gc.ca/services/cusma-aceum/overview-survol-eng.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a64037] hover:text-[#86332c] transition-colors"
                >
                  CUSMA overview — Canada Border Services Agency
                </a>
              </li>
              <li>
                <a
                  href="https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a64037] hover:text-[#86332c] transition-colors"
                >
                  PIPEDA — Office of the Privacy Commissioner of Canada
                </a>
              </li>
              <li>
                <a
                  href="https://www.canada.ca/en/public-services-procurement/services/acquisitions/selling-federal-government.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a64037] hover:text-[#86332c] transition-colors"
                >
                  Selling to the federal government — Public Services and
                  Procurement Canada
                </a>
              </li>
            </ul>
            <p className="text-[#676660] text-xs mt-4">
              These references are provided for general information only and are
              not legal, tax, customs, or privacy compliance advice.
              Requirements change and vary by situation — confirm current rules
              with the relevant authority or a qualified professional.
            </p>

            {/* CTA */}
            <div className="mt-10 p-6 bg-[#fbf9f5] border border-[#a64037]/30 rounded-2xl text-center">
              <p className="text-[#25282d] font-semibold mb-2">
                Ready to start procurement?
              </p>
              <p className="text-[#676660] text-xs mb-4">
                Send us your hardware requirements and we&apos;ll provide
                competitive quotes from reputable supplier and distributor
                networks after reviewing your requirements.
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#a64037] to-[#a64037] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#a64037]/30 transition-all"
              >
                Request a Quote →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
