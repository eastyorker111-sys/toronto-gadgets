import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Blog | Enterprise IT Insights | Toronto Gadgets",
  description:
    "Expert insights on enterprise IT hardware: server comparisons, procurement guides, and technology trends for Canadian businesses.",
  alternates: { canonical: "https://torontogadgets.com/blog" },
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
  ],
};

const posts = [
  {
    href: "/blog/dell-vs-hpe-servers",
    title:
      "Dell PowerEdge vs HPE ProLiant: Which Enterprise Server Is Right for Your Business?",
    excerpt:
      "A side-by-side comparison of Dell and HPE server lines covering performance, management tools, pricing, and use cases for Canadian enterprises.",
    date: "2026-02-10",
    readTime: "6 min read",
  },
  {
    href: "/blog/it-hardware-procurement-guide",
    title:
      "The Complete Guide to IT Hardware Procurement for Canadian Businesses",
    excerpt:
      "Everything you need to know about sourcing enterprise technology — from vendor selection and RFQ processes to customs, warranties, and lifecycle management.",
    date: "2026-02-05",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="shell content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeader
        label="Insights"
        eyebrow="A LITTLE CLARITY BEFORE YOUR NEXT PURCHASE"
        title="Make a more informed request."
        description="Explore our hardware comparison and procurement guide to help frame your next sourcing conversation."
      />
      <div className="insight-grid">
        {posts.map((post, index) => (
          <Link href={post.href} key={post.href} className="insight-card">
            <Image
              src={
                index === 0
                  ? "/categories/servers.png"
                  : "/categories/workstations.png"
              }
              alt=""
              width={900}
              height={450}
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <div className="insight-copy">
              <div className="insight-meta">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="text-link">
                Read the guide <span aria-hidden="true">↗</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
      <section className="custom-request">
        <div>
          <h2>Ready to talk about your requirements?</h2>
          <p>
            Share your workload, preferred models or equipment list. We’ll use
            that to start your quote.
          </p>
        </div>
        <Link className="button" href="/contact?mode=help">
          Help me choose ↗
        </Link>
      </section>
    </div>
  );
}
