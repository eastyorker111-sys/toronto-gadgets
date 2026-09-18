# Toronto Gadgets — approved website identity

On 18 September 2026 the user approved deployment of the refined Adobe website concept. This supersedes the previous brick-red website treatment.

Use the existing Adobe TG master at `public/brand/tg-symbol.png`; do not redraw or regenerate its geometry. Website typography is IBM Plex Sans, supplied locally with its license. The palette is cream #F7F2E8, graphite #292E2E, muted teal #3D6666, dark teal #293B3B and champagne #EDDBB9. `app/brand.css` supplies the shared treatment; `app/data/brand.json` records the identity.

FAQ rows blend into the page background. The footer places the identical symbol silhouette in champagne directly on dark teal, with light lettering and no pale rectangle. Cards use warm neutral surfaces. Preserve readable contrast, desktop/mobile spacing, full symbol geometry, and platform-safe margins.

The Adobe hero is illustrative product artwork, not evidence of actual stock or premises. The business remains Toronto-based B2B sourcing and delivery, with quote-based pricing and customer-supplied item lists.

Browser icons and the shared-link image match this website. `node scripts/build-icons.mjs` exports browser formats from the Adobe master. Previous social-platform files in the local Brand Kit are preserved; deployment does not imply that those external profiles have been updated.

Previous website version for rollback: d6e4ebf4c7a9210476f851fa620632b60789b251.
