import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "storage")!;
export const metadata: Metadata = {
  title: "Storage Solutions Sourcing in Toronto | Toronto Gadgets",
  description:
    "NAS, SAN and enterprise drives for your data requirements. Toronto-based B2B sourcing with quote-based pricing. Request a listed model, a custom configuration, or your own item.",
  alternates: { canonical: "https://torontogadgets.com/storage" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
