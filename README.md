# Toronto Gadgets — Enterprise Technology Sourcing

B2B technology sourcing and delivery website. All pricing is by quotation, including customers' own items. Built with Next.js 16.3.8, React 19, Tailwind CSS and TypeScript.

## Current project records

- Main approved-decision record: `D:/Toronto Gadgets/00-DECISION-RECORD.md`.
- Approved visual specification: `docs/brand-master.md`.
- Latest setup audit: `D:/Toronto Gadgets/Audits/2026-10-05-Setup-Check/REPORT.md`.
- Source: `D:/Toronto Gadgets/Website Preview`; final social assets: `D:/Toronto Gadgets/Brand Kit`.
- Historical design/review notes retain earlier evidence; their superseded colours, paths and release status are not current instructions.

Use `npm run build` for the production build and type check. The link checker is `scripts/check-site.mjs`, with `SITE_URL` set to the intended local or live site. It does not submit a quote request.

**Live:** https://torontogadgets.com

## Pages (14 routes)
- `/` — Homepage with hero, categories, FAQ
- `/servers` — Enterprise servers catalog
- `/laptops` — Business laptops catalog
- `/mobile` — Mobile devices catalog
- `/workstations` — Workstations catalog
- `/network` — Network equipment catalog
- `/peripherals` — Peripherals catalog
- `/storage` — Storage solutions catalog
- `/contact` — Quote request form
- `/about` — Company information
- `/services` — Services overview
- `/blog` — Blog index
- `/blog/dell-vs-hpe-servers` — Dell vs HPE comparison
- `/blog/it-hardware-procurement-guide` — Procurement guide

## Integrations
- Google Analytics: G-VPG7C4F0RB
- Microsoft Clarity: v6xsfx4qka
- Formspree: mdaeqapz
- WhatsApp: +14372376895

Analytics loads only on the production domains and respects browser Do Not Track and Global Privacy Control. Clarity does not initialize on a direct quote-page load; the whole quote form is also masked for visitors who navigate from another page. IndexNow is configured in `.github/workflows/indexnow.yml` after successful production deployments.
