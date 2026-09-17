import type { Metadata } from "next";
import CategoryPage from "../components/CategoryPage";
import catalog from "../data/catalog.json";
const category = catalog.find((c) => c.slug === "mobile")!;
export const metadata: Metadata = {
  title: "Mobile Devices Sourcing in Toronto | Toronto Gadgets",
  description:
    "Phones and tablets for business teams and mobile workflows. Toronto-based B2B sourcing with quote-based pricing. Request a listed model, a custom configuration, or your own item.",
  alternates: { canonical: "https://torontogadgets.com/mobile" },
};
export default function Page() {
  return <CategoryPage category={category} />;
}
