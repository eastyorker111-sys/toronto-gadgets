import Image from "next/image";
import Link from "next/link";
import catalog from "../data/catalog.json";

type Category = (typeof catalog)[number];
export default function CategoryPage({ category: c }: { category: Category }) {
  const quote = `/contact?category=${c.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${c.title} sourcing in Toronto`,
    serviceType: "B2B technology sourcing",
    provider: { "@id": "https://torontogadgets.com/#organization" },
    url: `https://torontogadgets.com/${c.slug}`,
    description: c.description,
  };
  return (
    <div className="shell category-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/#technology">Technology</Link>
        <span>/</span>
        <span aria-current="page">{c.title}</span>
      </nav>
      <section className="category-hero">
        <div>
          <p className="eyebrow">TORONTO-BASED B2B SOURCING</p>
          <h1>{c.title}</h1>
          <p className="intro">{c.description}</p>
          <p className="category-brands">{c.brands}</p>
          <Link className="button" href={quote}>
            Request a quote ↗
          </Link>
        </div>
        <figure>
          <Image
            src={c.image}
            width={1536}
            height={1024}
            priority
            sizes="(max-width:760px) 100vw, 50vw"
            alt={`Illustrative ${c.title.toLowerCase()} hardware`}
          />
          <figcaption>
            Category illustration. Exact products and configurations vary.
          </figcaption>
        </figure>
      </section>
      <section className="requirements-strip">
        <div>
          <h2>Start with your requirements.</h2>
          <p>
            Every request is quoted individually. Tell us the model you want, or
            describe the job it needs to do.
          </p>
        </div>
        <ul>
          {c.requirements.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>
      <section className="model-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">IDEAS FOR YOUR SOURCING REQUEST</p>
            <h2>Example models</h2>
          </div>
          <p>
            These are starting points, not a live stock list.
            <br />
            Specifications, availability and pricing are confirmed in your
            quote.
          </p>
        </div>
        <div className="model-grid">
          {c.products.map((name) => (
            <article className="model-card" key={name}>
              <p className="eyebrow">QUOTE ON REQUEST</p>
              <h3>{name}</h3>
              <p>
                Request your preferred configuration, quantity and delivery
                destination.
              </p>
              <Link
                href={`${quote}&item=${encodeURIComponent(name)}`}
                aria-label={`Request a quote for ${name}`}
              >
                Quote this model <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="custom-request">
        <div>
          <h2>Have a different item in mind?</h2>
          <p>
            Send your model number, product link or specifications. You can add
            several items to one request, including products that are not listed
            here.
          </p>
        </div>
        <Link className="button" href={`${quote}&mode=custom`}>
          Request your own item ↗
        </Link>
      </section>
      <nav
        className="other-categories"
        aria-label="Other technology categories"
      >
        <h2>Explore other categories</h2>
        <div>
          {catalog
            .filter((cat) => cat.slug !== c.slug)
            .map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}>
                {cat.title} ↗
              </Link>
            ))}
        </div>
      </nav>
    </div>
  );
}
