import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "workstations")!;
export const metadata: Metadata = {
  title: "Workstations Sourcing in Toronto | Toronto Gadgets",
  description:
    "Source workstations for design, engineering and demanding workflows in Toronto. Request a quote for your software needs, configuration and quantity.",
  alternates: { canonical: "https://torontogadgets.com/workstations" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
