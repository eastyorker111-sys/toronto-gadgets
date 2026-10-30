import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "servers")!;
export const metadata: Metadata = {
  title: "Enterprise Servers Sourcing in Toronto | Toronto Gadgets",
  description:
    "Source rack and tower servers for your business in Toronto. Request a quote for your configuration and quantity, or send your own model and requirements.",
  alternates: { canonical: "https://torontogadgets.com/servers" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
