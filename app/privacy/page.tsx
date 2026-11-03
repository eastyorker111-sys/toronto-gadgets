import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy | Toronto Gadgets",
  description: "How Toronto Gadgets uses sourcing enquiries and your privacy choices.",
  alternates: { canonical: "https://torontogadgets.com/privacy" },
};
export default function Privacy() {
  return <article className="shell quote-page privacy-copy">
    <h1>Privacy information</h1><p>Updated November 3, 2026.</p>
    <h2>Your enquiry</h2>
    <p>Toronto Gadgets uses the name, company, email, optional phone number, delivery location and equipment requirements you submit to respond to your enquiry and prepare a quote. Please do not send passwords, payment card details or sensitive personal information.</p>
    <h2>Services that handle information</h2>
    <p>Our website is hosted by Vercel. Formspree processes quote submissions and sends notifications to our operational Outlook inbox. We also use Gmail for business correspondence. These providers may process information outside Canada and be subject to the laws of those locations. Hosting and form services may process technical information to deliver and protect the service.</p>
    <p>If you proceed with an order, necessary specifications and delivery details may be shared with the supplier or delivery provider identified for that order. Links to WhatsApp, Google Maps and social networks take you to services with their own privacy practices.</p>
    <h2>Optional tracking and marketing</h2>
    <p>Optional Google Analytics and Microsoft Clarity tracking are paused. We do not load session recordings. Cookie choices lets you save, reject or change your analytics preference at any time. Browser Do Not Track and Global Privacy Control signals keep optional tracking off. The preference is stored in your browser; clearing browser storage removes it.</p>
    <p>A sourcing enquiry does not subscribe you to marketing. Any future marketing subscription will be separate from communications needed to handle your request.</p>
    <h2>Access, correction and retention</h2>
    <p>We retain information for the enquiry, order, support and recordkeeping purposes for which it is needed, including applicable legal obligations. Contact us to request access, correction or deletion, withdraw optional consent, or raise a privacy concern. We may need to verify your identity and explain any records we must retain.</p>
    <p>Contact the Toronto Gadgets owner at <a href="mailto:torontogadgets1001@gmail.com">torontogadgets1001@gmail.com</a> or <a href="tel:+14372376895">+1 (437) 237-6895</a>. Toronto, Ontario, Canada — M4H 1L4.</p>
  </article>;
}
