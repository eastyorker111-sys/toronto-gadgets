import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt =
  "Toronto Gadgets — B2B technology sourcing in Toronto. Your requirements. Your quote.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#f7f4ef",
        color: "#25282d",
        width: "100%",
        height: "100%",
        padding: "70px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <svg width="65" height="60" viewBox="0 0 96 88">
          <path fill="#a64037" d="M0 0H96V17H38V88H21V17H0Z" />
          <path fill="#25282d" d="M45 25H96V42H62V71H79V61H69V48H96V88H45Z" />
        </svg>
        <span style={{ fontSize: 36 }}>Toronto Gadgets</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 75,
          fontSize: 67,
          lineHeight: 1.1,
        }}
      >
        <span>B2B technology sourcing.</span>
        <span style={{ color: "#a64037" }}>
          Based in Toronto. Built around you.
        </span>
      </div>
      <span style={{ fontSize: 24, marginTop: 40 }}>
        Your own items welcome · All pricing by quotation
      </span>
    </div>,
    size,
  );
}
