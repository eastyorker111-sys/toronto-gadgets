# Search engine notifications

The IndexNow workflow runs after a successful production deployment, or manually from GitHub Actions. It uses the existing public repository's standard Ubuntu runner and does not add a paid search/hosting service.

Before sending a notification, `node scripts/indexnow.mjs --submit` checks the live ownership file, sitemap and each public HTML page. Only canonical URLs on https://torontogadgets.com are permitted. The script rejects query strings, credentials and unrelated domains. Its cached fingerprints limit notifications to changed/new pages; removed URLs are only submitted after verifying a redirect or removal response. Losing the cache causes one full sitemap submission, not a scheduled loop.

The ownership token is deliberately served publicly as required by IndexNow. It is not a hosting password or a private API credential. The workflow has read-only repository permissions. No form data, customer data or account credentials are submitted.

Use `node scripts/indexnow.mjs` for a live-site dry run and `node --test test/indexnow.test.mjs` for URL validation tests. The live ownership file must be deployed before the script can run successfully.

HTTP 200 means the notification was accepted; HTTP 202 means received with ownership validation pending. Neither means the URL is indexed or will rank. This complements Google Search Console and sitemaps; Google is not assumed to participate in IndexNow.

To stop automatic notifications, disable the workflow in GitHub Actions or remove `.github/workflows/indexnow.yml`. This does not affect the website or its existing indexed pages.

Protocol: https://www.indexnow.org/documentation
