// Export the existing SVG mark without redrawing it. Run after favicon.svg changes.
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const source = await readFile(new URL("../public/favicon.svg", import.meta.url));
const png = (size) => sharp(source, { density: 384 })
  .resize(size, size, { fit: "contain", background: "#f7f4ef" })
  .flatten({ background: "#f7f4ef" })
  .png()
  .toBuffer();

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((data, index) => {
  const entry = 6 + 16 * index;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(data.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += data.length;
});

await writeFile(new URL("../public/favicon.ico", import.meta.url), Buffer.concat([header, ...images]));
await writeFile(new URL("../public/favicon-96.png", import.meta.url), await png(96));
await writeFile(new URL("../public/apple-touch-icon.png", import.meta.url), await png(180));
console.log("Exported current SVG mark to ICO (16/32/48px), PNG (96px), and Apple icon (180px).");
