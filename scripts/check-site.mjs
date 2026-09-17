import { writeFile } from "node:fs/promises";
const base = process.env.SITE_URL || "http://127.0.0.1:3011";
const queue = ["/"];
const pages = new Map();
const targets = new Set();
const external = new Set();
const failures = [];
const decode = (s) => s.replaceAll("&amp;", "&").replaceAll("&#x27;", "'");
while (queue.length) {
  const path = queue.shift();
  if (pages.has(path)) continue;
  const response = await fetch(base + path);
  const html = await response.text();
  pages.set(path, html);
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1)
    failures.push(`${path}: expected one H1`);
  if (!html.includes('name="description"'))
    failures.push(`${path}: missing description`);
  if (!html.includes('rel="canonical"'))
    failures.push(`${path}: missing canonical`);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const raw = decode(match[1]);
    const url = new URL(raw, base + path);
    if (url.origin !== new URL(base).origin) {
      external.add(raw);
      continue;
    }
    targets.add(url.pathname + url.search + url.hash);
    if (!pages.has(url.pathname) && !queue.includes(url.pathname))
      queue.push(url.pathname);
  }
}
for (const target of targets) {
  const url = new URL(target, base);
  if (
    url.hash &&
    !pages
      .get(url.pathname)
      ?.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)
  )
    failures.push(`${target}: missing anchor`);
}
const quoteTargets = [...targets].filter((t) => t.startsWith("/contact?"));
for (let i = 0; i < quoteTargets.length; i += 6) {
  await Promise.all(
    quoteTargets.slice(i, i + 6).map(async (target) => {
      const r = await fetch(base + target);
      const h = await r.text();
      if (!r.ok) failures.push(target + ": HTTP " + r.status);
      const u = new URL(target, base);
      const item = u.searchParams.get("item");
      const selected = [...h.matchAll(/<option[^>]*selected=[^>]*>(.*?)<\/option>/g)].map(m=>decode(m[1]).replaceAll('&quot;','"'));
      if(item && !selected.includes(item)) failures.push(target+': missing selected product');
      if(u.searchParams.get('mode')==='help' && !selected.includes('Help me choose')) failures.push(target+': missing help selection');
    }),
  );
}
const images = new Set(
  [...pages.values()].flatMap((html) =>
    [...html.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((m) => decode(m[1])),
  ),
);
for (const src of images) {
  const r = await fetch(new URL(src, base));
  if (!r.ok || !r.headers.get("content-type")?.startsWith("image/"))
    failures.push(`${src}: invalid image (${r.status})`);
}
for (const path of [
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.svg",
  "/opengraph-image",
]) {
  const r = await fetch(base + path);
  if (!r.ok) failures.push(`${path}: HTTP ${r.status}`);
}
const externalResults = await Promise.all(
  [...external]
    .filter((x) => x.startsWith("http"))
    .map(async (url) => {
      try {
        const r = await fetch(url, { signal: AbortSignal.timeout(18000) });
        return { url, status: r.status, final: r.url };
      } catch {
        return { url, status: "unverified (timeout / access restriction)" };
      }
    }),
);
const report = {
  checkedAt: new Date().toISOString(),
  pages: [...pages.keys()],
  internalLinkTargets: targets.size,
  images: images.size,
  failures,
  external: externalResults,
  contactLinks: [...external].filter((x) => /^(tel:|mailto:)/.test(x)),
  formSubmission: "Not submitted; a real delivery test is still required.",
};
await writeFile(
  "site-check-results.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
