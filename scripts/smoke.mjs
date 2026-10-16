#!/usr/bin/env node
/**
 * Smoke test against a running server: npm run build && npm start, then npm run test:smoke.
 * Checks status codes, unique titles, canonicals, robots and sitemap output, JSON-LD validity and internal links.
 */
const base = process.env.SMOKE_URL ?? "http://localhost:3000";
const paths = ["/", "/services", "/services/driver-hire", "/services/care-workers", "/services/support-workers", "/employers", "/candidates", "/jobs", "/about", "/contact", "/faqs", "/complaints", "/privacy-policy", "/terms"];
const failures = [];
const fail = (m) => failures.push(m);
const titles = new Map();
const linked = new Set();

for (const p of paths) {
  const res = await fetch(base + p);
  if (res.status !== 200) { fail(`${p}: status ${res.status}`); continue; }
  const html = await res.text();
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="(.*?)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="(.*?)"/)?.[1];
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (!title) fail(`${p}: no <title>`);
  else if (titles.has(title)) fail(`${p}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, p);
  if (!desc) fail(`${p}: no meta description`);
  if (!canonical) fail(`${p}: no canonical`);
  else if (!canonical.endsWith(p === "/" ? "" : p) && p !== "/") fail(`${p}: canonical mismatch ${canonical}`);
  if (h1s !== 1) fail(`${p}: expected exactly one h1, found ${h1s}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail(`${p}: invalid JSON-LD`); }
  }
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) linked.add(m[1]);
}
for (const l of linked) {
  if (/^\/(_next|brand|images|favicon)/.test(l)) continue;
  const res = await fetch(base + l);
  if (res.status !== 200) fail(`broken internal link ${l}: ${res.status}`);
}
const robots = await (await fetch(base + "/robots.txt")).text();
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
console.log("robots.txt:\n" + robots.trim());
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
console.log(`sitemap.xml: ${urls.length} URLs`);
if (urls.length !== paths.length) fail(`sitemap has ${urls.length} URLs, expected ${paths.length}`);
const missing = await fetch(base + "/this-page-does-not-exist");
if (missing.status !== 404) fail(`unknown route should be 404, got ${missing.status}`);

if (failures.length) { console.error("\nFAILED:\n- " + failures.join("\n- ")); process.exit(1); }
console.log(`\nSmoke test passed for ${paths.length} pages.`);
