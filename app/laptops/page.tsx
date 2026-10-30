import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "laptops")!;
export const metadata: Metadata = {
  title: "Business Laptops Sourcing in Toronto | Toronto Gadgets",
  description:
    "Source business laptops for office, hybrid and mobile teams in Toronto. Request a quote for your models, specifications and quantities, or get help choosing.",
  alternates: { canonical: "https://torontogadgets.com/laptops" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
