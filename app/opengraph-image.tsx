import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt = "Toronto Gadgets — The right hardware. For your business. All pricing by quote.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const image = await readFile(join(process.cwd(), "public/brand/social-share.png"));
  return new Response(new Uint8Array(image), { headers: { "Content-Type": contentType } });
}
