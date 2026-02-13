import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Toronto Gadgets | Enterprise Technology Sourcing | Servers, Workstations, Laptops",
  description:
    "Toronto Gadgets is a B2B enterprise technology sourcing partner serving Canadian businesses with servers, workstations, laptops, and network equipment. Competitive pricing and fast delivery.",
  keywords:
    "enterprise servers, business laptops, workstations, network equipment, IT sourcing, Dell PowerEdge, HPE ProLiant, Lenovo ThinkPad, Toronto, Canada, B2B technology",
  authors: [{ name: "Toronto Gadgets", url: "https://torontogadgets.com" }],
  creator: "Toronto Gadgets",
  publisher: "East Yorker Corp",

  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL("https://torontogadgets.com"),
  alternates: {
    canonical: "https://torontogadgets.com",
  },

  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://torontogadgets.com",
    siteName: "Toronto Gadgets",
    title: "Toronto Gadgets | Enterprise Technology Sourcing",
    description:
      "B2B enterprise hardware sourcing partner — servers, workstations, laptops, and network equipment.",
    images: [
      {
        url: "https://torontogadgets.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Toronto Gadgets - Enterprise Technology Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Toronto Gadgets | Enterprise Technology Sourcing",
    description:
      "B2B enterprise hardware sourcing partner — servers, workstations, laptops, and network equipment.",
    images: ["https://torontogadgets.com/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00d4ff",
};

/* ORGANIZATION STRUCTURED DATA */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://torontogadgets.com/#organization",
  name: "Toronto Gadgets",
  legalName: "East Yorker Corp",
  url: "https://torontogadgets.com",
  logo: "https://torontogadgets.com/og-image.png",
  description:
    "B2B technology sourcing and procurement partner for enterprise hardware.",
  foundingDate: "2021",
  address: {
    "@type": "PostalAddress",
    streetAddress: "75 Thorncliffe Park Drive",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M4H 1L4",
    addressCountry: "CA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-437-237-6895",
    contactType: "sales",
    email: "east_yorker@outlook.com",
    availableLanguage: ["English", "Urdu", "Arabic"],
  },
  sameAs: [
    "https://www.linkedin.com/company/toronto-gadgets",
    "https://www.facebook.com/profile.php?id=61587119518549",
  ],
};

/* LOCAL BUSINESS (B2B OFFICE – NOT RETAIL STORE) */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://torontogadgets.com/#localbusiness",
  name: "Toronto Gadgets",
  url: "https://torontogadgets.com",
  image: "https://torontogadgets.com/og-image.png",
  telephone: "+1-437-237-6895",
  email: "east_yorker@outlook.com",
  description:
    "B2B enterprise technology sourcing partner providing servers, workstations, laptops, and network equipment. Quotes on request.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "75 Thorncliffe Park Drive",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M4H 1L4",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7066,
    longitude: -79.3407,
  },
  areaServed: [
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United States" },
    { "@type": "AdministrativeArea", name: "GCC" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>

      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VPG7C4F0RB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VPG7C4F0RB');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
