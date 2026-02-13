import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Enterprise IT Insights | Toronto Gadgets",
  description: "Expert insights on enterprise IT hardware: server comparisons, procurement guides, and technology trends for Canadian businesses.",
  alternates: { canonical: "https://torontogadgets.com/blog" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://torontogadgets.com/blog" },
  ],
};

const posts = [
  {
    href: "/blog/dell-vs-hpe-servers",
    title: "Dell PowerEdge vs HPE ProLiant: Which Enterprise Server Is Right for Your Business?",
    excerpt: "A side-by-side comparison of Dell and HPE server lines covering performance, management tools, pricing, and use cases for Canadian enterprises.",
    date: "2026-02-10",
    readTime: "6 min read",
  },
  {
    href: "/blog/it-hardware-procurement-guide",
    title: "The Complete Guide to IT Hardware Procurement for Canadian Businesses",
    excerpt: "Everything you need to know about sourcing enterprise technology — from vendor selection and RFQ processes to customs, warranties, and lifecycle management.",
    date: "2026-02-05",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs text-slate-500 mb-6"><a href="/" className="hover:text-cyan-400 transition-colors">Home</a><span className="mx-2">/</span><span className="text-slate-300">Blog</span></nav>

          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-4">Blog</h1>
          <p className="text-slate-400 text-sm mb-10">Expert insights on enterprise hardware sourcing, procurement, and technology trends.</p>

          <div className="space-y-6">
            {posts.map((post) => (
              <a key={post.href} href={post.href} className="block bg-[#12151f] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/40 transition-all group">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">{post.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed">{post.excerpt}</p>
                <div className="mt-4 text-cyan-400 text-xs font-semibold">Read Article →</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
