import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/* ─── METADATA ─── */
export const metadata: Metadata = {
  title: "Toronto Gadgets | Enterprise Technology Sourcing | Servers, Workstations, Laptops",
  description:
    "Toronto Gadgets is a B2B enterprise technology sourcing partner serving Canadian businesses with servers, workstations, laptops, and network equipment. Competitive pricing and fast delivery.",
  keywords:
    "enterprise servers, business laptops, workstations, network equipment, IT sourcing, Dell PowerEdge, HPE ProLiant, Lenovo ThinkPad, Toronto, Canada, B2B technology",
  authors: [{ name: "Toronto Gadgets", url: "https://torontogadgets.com" }],
  creator: "Toronto Gadgets",
  publisher: "East Yorker Corp",
  robots: { index: true, follow: true },
  metadataBase: new URL("https://torontogadgets.com"),
  alternates: { canonical: "https://torontogadgets.com" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://torontogadgets.com",
    siteName: "Toronto Gadgets",
    title: "Toronto Gadgets | Enterprise Technology Sourcing",
    description: "B2B enterprise hardware sourcing partner — servers, workstations, laptops, and network equipment.",
    images: [{ url: "https://torontogadgets.com/og-image.png", width: 1200, height: 630, alt: "Toronto Gadgets - Enterprise Technology Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toronto Gadgets | Enterprise Technology Sourcing",
    description: "B2B enterprise hardware sourcing partner — servers, workstations, laptops, and network equipment.",
    images: ["https://torontogadgets.com/og-image.png"],
  },
  icons: { icon: "/favicon.svg" },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00d4ff",
};

/* ─── STRUCTURED DATA ─── */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://torontogadgets.com/#organization",
  name: "Toronto Gadgets",
  legalName: "East Yorker Corp",
  url: "https://torontogadgets.com",
  logo: "https://torontogadgets.com/og-image.png",
  description: "B2B technology sourcing and procurement partner for enterprise hardware.",
  foundingDate: "2021",
  address: { "@type": "PostalAddress", streetAddress: "75 Thorncliffe Park Drive", addressLocality: "Toronto", addressRegion: "ON", postalCode: "M4H 1L4", addressCountry: "CA" },
  contactPoint: { "@type": "ContactPoint", telephone: "+1-437-237-6895", contactType: "sales", email: "east_yorker@outlook.com", availableLanguage: ["English", "Urdu", "Arabic"] },
  sameAs: ["https://www.linkedin.com/company/toronto-gadgets", "https://www.facebook.com/profile.php?id=61587119518549"],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://torontogadgets.com/#localbusiness",
  name: "Toronto Gadgets",
  url: "https://torontogadgets.com",
  image: "https://torontogadgets.com/og-image.png",
  telephone: "+1-437-237-6895",
  email: "east_yorker@outlook.com",
  description: "B2B enterprise technology sourcing partner providing servers, workstations, laptops, and network equipment.",
  address: { "@type": "PostalAddress", streetAddress: "75 Thorncliffe Park Drive", addressLocality: "Toronto", addressRegion: "ON", postalCode: "M4H 1L4", addressCountry: "CA" },
  geo: { "@type": "GeoCoordinates", latitude: 43.7066, longitude: -79.3407 },
  areaServed: [{ "@type": "Country", name: "Canada" }, { "@type": "Country", name: "United States" }, { "@type": "AdministrativeArea", name: "GCC" }],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://torontogadgets.com/#website",
  name: "Toronto Gadgets",
  url: "https://torontogadgets.com",
  publisher: { "@id": "https://torontogadgets.com/#organization" },
  potentialAction: { "@type": "SearchAction", target: "https://torontogadgets.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-VPG7C4F0RB" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-VPG7C4F0RB');`}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","v6xsfx4qka");`}
        </Script>

        {/* Tawk.to Live Chat */}
        <Script id="tawk-to" strategy="lazyOnload">
          {`var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src='https://embed.tawk.to/6975f84a9602761980a88780/1jfqd3pfm';s1.charset='UTF-8';s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);})();`}
        </Script>

        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />

        {/* WhatsApp FAB — Global */}
        <a
          href="https://api.whatsapp.com/send?phone=14372376895&text=Hi%2C%20I%27m%20interested%20in%20getting%20a%20quote%20from%20Toronto%20Gadgets."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 group"
        >
          <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
          <span className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-all duration-300">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
        </a>
      </body>
    </html>
  );
}
