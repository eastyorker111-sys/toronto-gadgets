import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "../guides";

export const dynamicParams = false;
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find(g => g.slug === slug);
  if (!guide) notFound();
  return {
    title: `${guide.title} | Toronto Gadgets`, description: guide.description,
    alternates: { canonical: `https://torontogadgets.com/blog/${slug}` },
    openGraph: { type: "article", title: guide.title, description: guide.description,
      url: `https://torontogadgets.com/blog/${slug}`, publishedTime: "2026-10-30",
      images: [{ url: "/brand/social-share.png", width: 1200, height: 630 }] }
  };
}
export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find(g => g.slug === slug);
  if (!guide) notFound();
  const url = `https://torontogadgets.com/blog/${slug}`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BlogPosting", headline: guide.title,
      description: guide.description, datePublished: "2026-10-30", dateModified: "2026-10-30",
      mainEntityOfPage: url, image: "https://torontogadgets.com/brand/social-share.png",
      author: { "@type": "Organization", name: "Toronto Gadgets", url: "https://torontogadgets.com/about" },
      publisher: { "@type": "Organization", name: "Toronto Gadgets", logo: { "@type": "ImageObject", url: "https://torontogadgets.com/brand/tg-symbol.png" } } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://torontogadgets.com/" },
      { "@type": "ListItem", position: 2, name: "Insights", item: "https://torontogadgets.com/blog" },
      { "@type": "ListItem", position: 3, name: guide.title, item: url }
    ] }
  ];
  return <article className="shell article-page sourcing-guide">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <div className="guide-inner">
      <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span> / </span><Link href="/blog">Insights</Link></nav>
      <p className="guide-byline">By <Link href="/about">Toronto Gadgets</Link> · <time dateTime="2026-10-30">October 30, 2026</time> · {guide.readTime}</p>
      <h1>{guide.title}</h1><p className="guide-intro">{guide.intro}</p>
      <nav className="guide-contents" aria-label="On this page"><strong>In this guide</strong><ol>
        {guide.sections.map((section, i) => <li key={section.title}><a href={`#section-${i + 1}`}>{section.title}</a></li>)}
      </ol></nav>
      <div className="prose-custom">
        {guide.sections.map((section, i) => <section key={section.title} id={`section-${i + 1}`}>
          <h2>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}
          {section.checklist && <ul>{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}
        </section>)}
        {guide.sources && <section><h2>Check the original requirements</h2><ul>{guide.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul><p>Requirements can change. Check the version relevant to your proposed equipment and software.</p></section>}
      </div>
      <aside className="guide-request"><h2>Bring your requirements. We’ll start there.</h2><p>Your own models, links and lists are welcome. All pricing by quotation.</p><div className="guide-actions"><Link className="button" href="/contact?mode=custom">Request your own items ↗</Link><Link className="text-link" href={guide.category}>{guide.categoryLabel} ↗</Link></div></aside>
      <nav className="guide-related" aria-label="Related guides"><h2>Continue planning</h2>{guides.filter(g => g.slug !== slug).map(g => <Link key={g.slug} href={`/blog/${g.slug}`}>{g.title} ↗</Link>)}<Link href="/blog/it-hardware-procurement-guide">IT hardware procurement checklist ↗</Link></nav>
    </div>
  </article>;
}
