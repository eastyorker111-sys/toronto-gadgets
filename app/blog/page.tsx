import { Metadata } from "next";
import Link from "next/link";

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs text-[#676660] mb-6">
            <Link href="/" className="hover:text-[#a64037] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#555550]">Blog</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#25282d] to-[#676660] bg-clip-text text-transparent mb-4">
            Blog
          </h1>
          <p className="text-[#676660] text-sm mb-10">
            Expert insights on enterprise hardware sourcing, procurement, and
            technology trends.
          </p>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="block bg-[#fbf9f5] border border-[#dedbd4] rounded-2xl p-6 hover:border-[#a64037]/40 transition-all group"
              >
                <div className="flex items-center gap-3 text-xs text-[#676660] mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-[#25282d] group-hover:text-[#86332c] transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-[#676660] text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-4 text-[#a64037] text-xs font-semibold">
                  Read Article →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
