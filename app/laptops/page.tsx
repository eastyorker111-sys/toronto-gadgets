import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "laptops")!;
export const metadata: Metadata = {
  title: "Business Laptops Sourcing in Toronto | Toronto Gadgets",
  description:
    "The right devices for office, hybrid and mobile teams. Toronto-based B2B sourcing with quote-based pricing. Request a listed model, a custom configuration, or your own item.",
  alternates: { canonical: "https://torontogadgets.com/laptops" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
