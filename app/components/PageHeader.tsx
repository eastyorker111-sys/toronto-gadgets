import Link from "next/link";

export default function PageHeader({
  label,
  eyebrow,
  title,
  description,
}: {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-intro">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{label}</span>
      </nav>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="intro">{description}</p>
    </header>
  );
}
