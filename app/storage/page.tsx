import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "storage")!;
export const metadata: Metadata = {
  title: "Storage Solutions Sourcing in Toronto | Toronto Gadgets",
  description:
    "Source NAS, SAN and enterprise drives in Toronto. Request a quote for your storage capacity, configuration and quantity, or send your own model.",
  alternates: { canonical: "https://torontogadgets.com/storage" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
