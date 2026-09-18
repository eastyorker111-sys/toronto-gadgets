# Toronto Gadgets website design refinement

Status: REVIEWED local website preview; visual direction remains DRAFT for user review.

Saved in `C:/Users/east_/Projects/toronto-gadgets-design` on branch `codex/website-design-refinement`, based on brand preview commit `3c5bf46`. This is business website work, outside the GBC course mirror. The original checkout and its untracked brand studies are preserved.

## Scope

The user explicitly stopped hosting work and asked to continue the website. No hosting, billing, domain, DNS or production deployment changes were made. This version runs locally at http://127.0.0.1:3012; the earlier preview on port 3011 remains separate.

## Changes

- Refined the homepage headline, readable type scale, spacing, button treatment and ivory/graphite/brick-red palette using IBM Plex Sans.
- Added a homepage request selector for an equipment list or help choosing, with a category that carries into the existing quote form.
- Corrected the quote form's initial `other` category so the mixed/custom request path stays selected.
- Reworked About, Services and Insights to match the main site. Improved article and category typography and quote-field sizing.
- Preserved all 14 routes, seven illustrated equipment categories and all 63 example model names, the two articles, company identifiers, contact destinations and social links.
- Preserved the existing draft logo geometry. The later joined-TG concept exists only in generated brand boards; it was not substituted with an invented final master.
- Retained the original services, with conditional wording for delivery, support and availability; no stock, fixed price, authorized-dealer or blanket compliance claims added.
- Added mobile-menu Escape behavior and active page indications. Replaced the animated green contact bubble with a quieter brand-colour WhatsApp control.
- Limited the existing Google Analytics and Clarity script loading to the production domain so local/preview visits do not enter production analytics.

## Verified

- Production build and TypeScript checks passed with Next.js 14.2.35.
- `scripts/check-site.mjs`: 14 pages, 109 internal link targets and eight distinct image URLs; no reported failures. Sitemap, robots, favicon and sharing image responded successfully. All 12 HTTP external destinations returned 200, sometimes after redirects; that does not certify their full content or delivery.
- All original catalogue data is byte-equivalent after JSON parsing: seven categories, 63 models.
- Chrome: homepage help + Workstations leads to `/contact?mode=help&category=workstations`, with Workstations and Help me choose selected.
- Chrome: default homepage submission leads to `/contact?mode=custom&category=other`, with Other / not sure and Enter my own item selected.
- Chrome: add custom docking-station item, set quantity to five, review both item summaries, then remove the extra item. No actual enquiry sent.
- Chrome: no horizontal overflow across all 14 pages at 390px. Additional 320px checks for home/contact/about/services/workstations/server article and 820px checks for home/contact/about/services/workstations/blog passed.
- Mobile menu opens and closes with Escape. Desktop home/About/Services/Workstations and mobile home visually inspected. Viewport override reset afterward.
- Local preview contains no loaded Google Analytics or Clarity script URLs. Browser logs contained an asynchronous extension-listener message; no application exception was identified in these checks.
- `git diff --check` passed.

## Missing / unverified

No real Formspree submission or inbox delivery test was performed. Source company information and fulfilment capabilities were preserved rather than independently certified. The separate Bing/IndexNow branches have not been deployed or merged into this design branch. Previously recorded dependency vulnerabilities still need resolution before public publication. No hosting migration was continued.

## Next action

Review the local design, then finish the exact logo artwork and verify enquiry delivery and release readiness before any public update. No GitHub push or production deployment is part of this pass.
