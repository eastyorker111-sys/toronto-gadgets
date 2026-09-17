import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "workstations")!;
export const metadata: Metadata = {
  title: "Workstations Sourcing in Toronto | Toronto Gadgets",
  description:
    "Professional hardware for design, engineering and demanding workflows. Toronto-based B2B sourcing with quote-based pricing. Request a listed model, a custom configuration, or your own item.",
  alternates: { canonical: "https://torontogadgets.com/workstations" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
