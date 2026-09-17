# Toronto Gadgets website review

Status: REVIEWED local preview; production publication and email delivery remain unverified.
Save location: C:/Users/east_/Projects/toronto-gadgets
Business website work; keep outside the read-only GBC sources mirror.

## Original content comparison

Compared original GitHub HEAD with origin/main (no divergence) and the live homepage.
- All 14 original content routes retained.
- All 7 categories and all 63 original example model names retained (count checked against Git history).
- About/company details, services, two articles, contacts, social links and WhatsApp retained.
- Homepage mission, vision and FAQs restored with quote-led wording.
- Old fixed specification combinations and promotional tags were replaced by configurable sourcing examples. No live stock, price, guaranteed compatibility or blanket certification is asserted.
- Product links carry the selected category/model into the quote request.
- Custom items, product links, quantities, mixed-item requests and a help-me-choose route are supported.
- Category photos are generated illustrations, explicitly labelled; they are not exact model photography.

## Why fixed specifications were removed

The prior catalogue contained contradictory or unsupported combinations. Examples checked against manufacturers:
- Precision 7875 / Threadripper PRO 7975WX was tagged 64-core; Dell identifies that CPU as 32-core.
  https://i.dell.com/sites/csdocuments/Merchandizing_Docs/en/precision-7875-spec-sheet.pdf
- HP Z8 Fury G5 was described as dual-CPU; HP describes a single-socket platform.
  https://www.hp.com/ca-en/workstations/z8-fury.html
- M2 Ultra Mac Pro was tagged Afterburner; Apple states that the 2019 Afterburner card is unsupported.
  https://support.apple.com/en-us/101988
- Dell U2724D was advertised with 90W USB-C charging; Dell identifies a data-only upstream port.
  https://www.dell.com/support/kbdoc/en-lv/000218443/dell-u2724d-usage-and-troubleshooting-guide

Quote specifications must be checked against actual manufacturer model/part numbers and supplier availability before an offer is made. All original names remain reference examples, including older generations; availability is not verified.

## Search visibility

- Visible copy and titles identify Toronto-based B2B technology sourcing.
- Organization, LocalBusiness, Service, WebSite and visible FAQ structured data describe sourcing, not retail inventory.
- No fabricated Product offers, prices, reviews or availability schema.
- Removed nonfunctional SearchAction (there is no on-site search).
- Unique canonical URLs, descriptions, public sitemap, robots directives and updated sharing graphic.
- Existing verification file retained. Search Console/Bing ownership and submission status not verified.
- Search engines cannot index a localhost preview. Publish first, then submit/inspect the production sitemap in Google Search Console and Bing Webmaster Tools. No ranking or indexing guarantee.
  https://developers.google.com/search/docs/appearance/structured-data/local-business
  https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a

## Verification and remaining limits

See site-check-results.json for HTTP checks, anchors, query links, images and external destinations. Browser checks cover selected model, custom item, help-me-choose, add/remove rows, summary and responsive layout. Production build and TypeScript checks pass.

No real enquiry was submitted. Formspree endpoint is preserved from the original website; delivery to the business mailbox must be tested before launch. Phone/email/WhatsApp destinations are unchanged, but calling or message delivery was not tested. Company registrations, address and service capacity were preserved from the original site, not independently certified. Original dependency audit reported high/critical vulnerabilities; resolve these before production publication.
