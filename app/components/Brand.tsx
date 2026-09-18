import brand from "../data/brand.json";

export default function Brand() {
  return (
    <span className="brand">
      <svg viewBox={brand.viewBox} aria-hidden="true">
        {brand.paths.map((d) => <path key={d} fill="currentColor" d={d} />)}
      </svg>
      <span>
        <strong>Toronto Gadgets</strong>
        <small>{brand.descriptor}</small>
      </span>
    </span>
  );
}
