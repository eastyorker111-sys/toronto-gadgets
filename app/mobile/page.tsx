import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "mobile")!;
export const metadata: Metadata = {
  title: "Mobile Devices Sourcing in Toronto | Toronto Gadgets",
  description:
    "Source business phones and tablets in Toronto. Request a quote for your team's models, specifications and quantities, or send your own equipment list.",
  alternates: { canonical: "https://torontogadgets.com/mobile" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
