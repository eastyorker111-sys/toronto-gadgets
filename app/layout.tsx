import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toronto Gadgets | B2B Electronics & Business Technology",
  description:
    "Premium distribution of enterprise-grade servers, high-end laptops, mobile devices, and business machines. Direct supply across GCC and globally.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
