import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "network")!;
export const metadata: Metadata = {
  title: "Network Equipment Sourcing in Toronto | Toronto Gadgets",
  description:
    "Source switches, access points and network security equipment in Toronto. Request a B2B quote with your models, quantities and connection requirements.",
  alternates: { canonical: "https://torontogadgets.com/network" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
