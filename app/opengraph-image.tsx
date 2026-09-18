import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt =
  "Toronto Gadgets — B2B technology sourcing in Toronto. Your requirements. Your quote.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  // Uses the same fixed symbol and outlined IBM Plex Sans as the channel assets.
  const artwork = await readFile(join(process.cwd(), "public", "og-image.png"));
  return new Response(new Uint8Array(artwork), {
    headers: { "Content-Type": contentType },
  });
}
