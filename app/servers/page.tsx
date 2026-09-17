import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "servers")!;
export const metadata: Metadata = {
  title: "Enterprise Servers Sourcing in Toronto | Toronto Gadgets",
  description:
    "Rack and tower servers for infrastructure projects. Toronto-based B2B sourcing with quote-based pricing. Request a listed model, a custom configuration, or your own item.",
  alternates: { canonical: "https://torontogadgets.com/servers" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
