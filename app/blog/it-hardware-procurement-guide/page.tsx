import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Guide to IT Hardware Procurement for Canadian Businesses | Toronto Gadgets",
  description: "Step-by-step guide to enterprise IT hardware procurement in Canada — vendor selection, RFQ processes, customs, warranties, lifecycle management, and cost optimization.",
  alternates: { canonical: "https://torontogadgets.com/blog/it-hardware-procurement-guide" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "The Complete Guide to IT Hardware Procurement for Canadian Businesses",
  datePublished: "2026-02-05",
  dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Toronto Gadgets", url: "https://torontogadgets.com" },
  publisher: { "@type": "Organization", name: "Toronto Gadgets", logo: { "@type": "ImageObject", url: "https://torontogadgets.com/og-image.png" } },
  mainEntityOfPage: "https://torontogadgets.com/blog/it-hardware-procurement-guide",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://torontogadgets.com/blog" },
    { "@type": "ListItem", position: 3, name: "IT Hardware Procurement Guide", item: "https://torontogadgets.com/blog/it-hardware-procurement-guide" },
  ],
};

export default function ProcurementGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6">
            <a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span>
            <a href="/blog" className="hover:text-cyan-400 transition-colors">Blog</a><span className="mx-2">/</span>
            <span className="text-slate-300">IT Hardware Procurement Guide</span>
          </nav>

          <div className="text-xs text-slate-500 mb-4">
            <time dateTime="2026-02-05">February 5, 2026</time> · 8 min read
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mb-6 leading-tight">
            The Complete Guide to IT Hardware Procurement for Canadian Businesses
          </h1>

          <div className="prose-custom space-y-5 text-slate-400 text-sm leading-relaxed">
            <p>Procuring enterprise IT hardware is more than just buying equipment. It involves vendor evaluation, competitive quoting, compliance checks, logistics coordination, and lifecycle planning. This guide walks through the entire process for Canadian businesses — whether you&apos;re refreshing a server room or deploying 500 laptops.</p>

            <h2 className="text-lg font-bold text-white mt-8 mb-3">1. Define Your Requirements</h2>
            <p>Start with a clear specification. Document exactly what you need: model numbers (or equivalent), configurations (CPU, RAM, storage, GPU), quantities, delivery timelines, and any compliance requirements (e.g., ITAR, FIPS, accessibility standards).</p>
            <p>For servers, specify rack density, power requirements, and cooling constraints. For laptops, define the user profiles — a developer needs different specs than an accountant. The clearer your specification, the more accurate your quotes will be.</p>

            <h2 className="text-lg font-bold text-white mt-8 mb-3">2. Choose Your Sourcing Channel</h2>
            <p>Canadian businesses have several sourcing options. Direct from OEM (Dell, HPE, Lenovo) gives you factory-configured systems with full warranty but often at list price. Authorized distributors (Ingram Micro, TD SYNNEX, D&H) offer better pricing on volume orders. Sourcing partners like Toronto Gadgets combine the best of both — competitive pricing through distributor relationships with personalized service and coordination.</p>

            <h2 className="text-lg font-bold text-white mt-8 mb-3">3. Request for Quotation (RFQ)</h2>
            <p>Send your specification to multiple vendors. A good RFQ includes exact product details, quantities, delivery location, preferred delivery date, payment terms, and warranty requirements. Ask vendors to quote both their standard offering and any alternatives they recommend.</p>
            <p>Expect 24–72 hours for standard quotes. Complex configurations (custom servers, multi-vendor deployments) may take a week.</p>

            <h2 className="text-lg font-bold text-white mt-8 mb-3">4. Evaluate Quotes</h2>
            <p>Don&apos;t just compare the bottom line. Evaluate total cost of ownership: hardware price, shipping costs, customs duties (for cross-border purchases), warranty coverage, support levels, and lead times. A lower hardware price with longer lead time or reduced warranty may cost you more in the long run.</p>

            <h2 className="text-lg font-bold text-white mt-8 mb-3">5. Canadian-Specific Considerations</h2>
            <p>GST/HST applies to all domestic hardware purchases. Cross-border purchases (from the US) may incur customs duties depending on the HS code and country of origin. CUSMA (Canada-US-Mexico Agreement) eliminates duties on many IT products manufactured in North America, but not all.</p>
            <p>For government procurement, ensure your vendor is on the Standing Offer list or can meet Supply Arrangement requirements. Federal departments often require PSPC-compliant purchasing processes.</p>

            <h2 className="text-lg font-bold text-white mt-8 mb-3">6. Warranties & Support</h2>
            <p>Standard manufacturer warranties range from 1–3 years depending on the product line. Enterprise servers typically include 3-year next-business-day onsite support. For mission-critical deployments, upgrade to 4-hour response or 24×7 coverage.</p>
            <p>Register all warranties immediately upon delivery. Keep records of serial numbers, purchase dates, and service tag numbers — you&apos;ll need these for any support interactions or future refresh planning.</p>

            <h2 className="text-lg font-bold text-white mt-8 mb-3">7. Lifecycle Management</h2>
            <p>Enterprise hardware has a typical lifecycle of 3–5 years. Plan your refresh schedule early. Many organizations stagger their replacements to spread costs — refreshing one-third of their fleet annually rather than replacing everything at once.</p>
            <p>At end-of-life, ensure proper asset disposal. Canadian privacy law (PIPEDA) requires that all personal data be securely erased before equipment is resold, donated, or recycled. Work with certified ITAD (IT Asset Disposition) providers for compliant disposal.</p>

            {/* CTA */}
            <div className="mt-10 p-6 bg-[#12151f] border border-cyan-500/30 rounded-2xl text-center">
              <p className="text-white font-semibold mb-2">Ready to start procurement?</p>
              <p className="text-slate-500 text-xs mb-4">Send us your hardware requirements and we&apos;ll provide competitive quotes from authorized channels within 24 hours.</p>
              <a href="/contact" className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                Request a Quote →
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
