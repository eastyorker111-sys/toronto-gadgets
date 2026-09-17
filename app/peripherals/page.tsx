import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "peripherals")!;
export const metadata: Metadata = {
  title: "Peripherals Sourcing in Toronto | Toronto Gadgets",
  description:
    "Monitors, docks, printers and meeting-room equipment to complete your setup. Toronto-based B2B sourcing with quote-based pricing. Request a listed model, a custom configuration, or your own item.",
  alternates: { canonical: "https://torontogadgets.com/peripherals" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
