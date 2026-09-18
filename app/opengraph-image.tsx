import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt =
  "Toronto Gadgets — B2B technology sourcing in Toronto. Your requirements. Your quote.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const [logo, photo, font, wordmark] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/tg-symbol.png")),
    readFile(join(process.cwd(), "public/brand/technology-studio.png")),
    readFile(join(process.cwd(), "app/fonts/IBMPlexSans-Regular.ttf")),
    readFile(join(process.cwd(), "public/brand/tg-wordmark.png")),
  ]);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#ecd8a8", color: "#292e2e", padding: 54, fontFamily: "Plex" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 620, paddingRight: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={`data:image/png;base64,${logo.toString("base64")}`} width={76} height={60} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img src={`data:image/png;base64,${wordmark.toString("base64")}`} width={300} height={59} />
            <span style={{ fontSize: 15, color: "#59635f" }}>B2B Technology Sourcing</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 66, fontSize: 60, lineHeight: 1.08, letterSpacing: -2 }}>
          <span>Technology that</span><span style={{ color: "#3d6666" }}>fits your business.</span>
        </div>
        <span style={{ marginTop: 30, fontSize: 24, lineHeight: 1.4 }}>Business-grade hardware, sourced around your requirements.</span>
        <span style={{ marginTop: "auto", color: "#3d6666", fontSize: 18 }}>TORONTO-BASED · PRICING BY QUOTE</span>
      </div>
      <img src={`data:image/png;base64,${photo.toString("base64")}`} width={472} height={522} style={{ objectFit: "contain" }} />
    </div>,
    { ...size, fonts: [{ name: "Plex", data: font, weight: 400, style: "normal" }] },
  );
}
