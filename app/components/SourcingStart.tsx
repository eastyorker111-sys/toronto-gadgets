import catalog from "../data/catalog.json";

export default function SourcingStart() {
  return (
    <section
      className="shell sourcing-start"
      id="start-request"
      aria-labelledby="start-title"
    >
      <div className="start-heading">
        <div>
          <p className="eyebrow">A SIMPLE PLACE TO START</p>
          <h2 id="start-title">What can we help you find?</h2>
        </div>
        <p>
          A model number, an equipment list, or just an idea. We can start
          there.
        </p>
      </div>
      <form action="/contact" method="get" className="start-form">
        <div>
          <label htmlFor="request-mode">I would like to…</label>
          <select id="request-mode" name="mode" defaultValue="custom">
            <option value="custom">Get a quote for my item or list</option>
            <option value="help">Get help choosing equipment</option>
          </select>
        </div>
        <div>
          <label htmlFor="request-category">For this type of technology</label>
          <select id="request-category" name="category" defaultValue="other">
            <option value="other">Mixed items / not sure yet</option>
            {catalog.map((category) => (
              <option value={category.slug} key={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <button className="button" type="submit">
          Build my request <span aria-hidden="true">↗</span>
        </button>
      </form>
      <p className="start-note">
        You can add multiple items on the next page. This is a quote request,
        with no payment required.
      </p>
    </section>
  );
}
