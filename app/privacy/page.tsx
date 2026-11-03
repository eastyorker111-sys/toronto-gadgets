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
    <p>Our website is hosted by Vercel. The quote builder prepares a draft in your browser without submitting it to us. Opening the WhatsApp link shares its prepared text with WhatsApp; you must press Send there to deliver it to our shared business number. We identify Toronto Gadgets enquiries by the business name and reference. We use Gmail and Outlook for correspondence, and private Google Sheets and Excel records to manage enquiries and orders. Square handles card payments separately after an agreed quote. These providers may process information outside Canada and be subject to the laws of those locations. Hosting and communication services may process technical information to deliver and protect the service.</p>
    <p>If you proceed with an order, necessary specifications and delivery details may be shared with the supplier or delivery provider identified for that order. Links to WhatsApp, Google Maps and social networks take you to services with their own privacy practices.</p>
    <h2>Optional tracking and marketing</h2>
    <p>Google Analytics loads only if you accept optional analytics. It measures public page visits, contact-button clicks and quote starts, prepared requests and WhatsApp handoffs. A handoff does not establish that a message was sent or an order placed. We exclude contact details, item descriptions, request identifiers and unapproved URL parameters. Google receives technical usage information and may process it outside Canada. We do not use Microsoft Clarity or session recordings.</p>
    <p>Cookie choices lets you accept, reject or change your analytics preference at any time. Rejecting or withdrawing keeps future optional measurement off and clears accessible analytics cookies. Browser Do Not Track and Global Privacy Control signals keep optional tracking off. Your quote works without analytics. The preference is stored in your browser; clearing browser storage removes it. Withdrawal does not erase information already received by Google; contact us about privacy requests.</p>
    <p>A sourcing enquiry does not subscribe you to marketing. Any future marketing subscription will be separate from communications needed to handle your request.</p>
    <h2>Access, correction and retention</h2>
    <p>We retain information for the enquiry, order, support and recordkeeping purposes for which it is needed, including applicable legal obligations. Contact us to request access, correction or deletion, withdraw optional consent, or raise a privacy concern. We may need to verify your identity and explain any records we must retain.</p>
    <p>Contact the Toronto Gadgets owner at <a href="mailto:torontogadgets1001@gmail.com">torontogadgets1001@gmail.com</a> or <a href="tel:+14372376895">+1 (437) 237-6895</a>. Toronto, Ontario, Canada — M4H 1L4.</p>
  </article>;
}
