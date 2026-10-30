import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "peripherals")!;
export const metadata: Metadata = {
  title: "Peripherals Sourcing in Toronto | Toronto Gadgets",
  description:
    "Source business monitors, docks, printers and meeting-room equipment in Toronto. Request a quote with your models, quantities and compatibility needs.",
  alternates: { canonical: "https://torontogadgets.com/peripherals" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
