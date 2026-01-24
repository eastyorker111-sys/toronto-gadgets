import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Basic Meta Tags
  title: "Toronto Gadgets | Enterprise Technology Solutions | Servers, Workstations, Laptops",
  description: "Toronto Gadgets is a B2B enterprise technology solutions provider serving Canadian businesses with servers, workstations, laptops, and network equipment. Competitive pricing, fast delivery across North America & GCC.",
  keywords: "enterprise servers, business laptops, workstations, network equipment, IT hardware, Dell PowerEdge, HPE ProLiant, Lenovo ThinkPad, Toronto, Canada, B2B technology",
  authors: [{ name: "Toronto Gadgets", url: "https://torontogadgets.com" }],
  creator: "Toronto Gadgets",
  publisher: "East Yorker Corp",
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  metadataBase: new URL("https://torontogadgets.com"),
  alternates: {
    canonical: "https://torontogadgets.com",
  },

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://torontogadgets.com",
    siteName: "Toronto Gadgets",
    title: "Toronto Gadgets | Enterprise Technology Solutions",
    description: "B2B enterprise technology solutions provider serving Canadian businesses with servers, workstations, laptops, and network equipment.",
    images: [
      {
        url: "https://torontogadgets.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Toronto Gadgets - Enterprise Technology Solutions",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Toronto Gadgets | Enterprise Technology Solutions",
    description: "B2B enterprise technology solutions provider - servers, workstations, laptops, network equipment.",
    images: ["https://torontogadgets.com/og-image.png"],
    creator: "@torontogadgets",
  },

  // Verification (add your codes after registering)
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE", // Get from Google Search Console
    // yandex: "YOUR_YANDEX_CODE",
    // bing: "YOUR_BING_CODE",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Category
  category: "technology",
};

// JSON-LD Structured Data for Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Toronto Gadgets",
  legalName: "East Yorker Corp",
  url: "https://torontogadgets.com",
  logo: "https://torontogadgets.com/logo.png",
  description: "B2B enterprise technology solutions provider serving Canadian businesses with servers, workstations, laptops, and network equipment.",
  foundingDate: "2021",
  founders: [
    {
      "@type": "Person",
      name: "Nabil Khan",
    },
  ],
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
  areaServed: [
    {
      "@type": "Country",
      name: "Canada",
    },
    {
      "@type": "Country",
      name: "United States",
    },
    {
      "@type": "Place",
      name: "GCC Countries",
    },
  ],
  priceRange: "$$$$",
  currenciesAccepted: "CAD, USD",
  paymentAccepted: "Credit Card, Bank Transfer, Wire Transfer",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Enterprise Technology Products",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Enterprise Servers",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Dell PowerEdge Servers" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "HPE ProLiant Servers" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Lenovo ThinkSystem Servers" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Business Laptops",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "MacBook Pro" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Dell XPS" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Lenovo ThinkPad" } },
        ],
      },
    ],
  },
};

// JSON-LD for Local Business
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ComputerStore",
  name: "Toronto Gadgets",
  image: "https://torontogadgets.com/logo.png",
  "@id": "https://torontogadgets.com",
  url: "https://torontogadgets.com",
  telephone: "+1-437-237-6895",
  email: "east_yorker@outlook.com",
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
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.linkedin.com/company/toronto-gadgets",
    "https://www.facebook.com/profile.php?id=61587119518549",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        
        {/* Additional SEO Tags */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Toronto" />
        <meta name="geo.position" content="43.7066;-79.3407" />
        <meta name="ICBM" content="43.7066, -79.3407" />
        
        {/* Business Contact */}
        <meta name="contact" content="east_yorker@outlook.com" />
        <meta name="reply-to" content="east_yorker@outlook.com" />
        
        {/* Language & Region */}
        <meta httpEquiv="content-language" content="en-CA" />
        <link rel="alternate" hrefLang="en-CA" href="https://torontogadgets.com" />
        <link rel="alternate" hrefLang="en" href="https://torontogadgets.com" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
