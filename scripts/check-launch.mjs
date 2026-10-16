#!/usr/bin/env node
/**
 * Launch gate. Fails when the site is set to be indexed while placeholders remain.
 * Run: npm run check:launch   (set NEXT_PUBLIC_ALLOW_INDEXING=true to test the production state)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const indexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
const markers = [/\[CONFIRM/i, /\[ADVISER TO/i, /\[OWNER TO/i, /\[Licensed photo/i, /Pre-launch draft/i];
const roots = ["src"];
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|json)$/.test(name)) {
      const lines = readFileSync(p, "utf8").split("\n");
      lines.forEach((line, i) => markers.some((m) => m.test(line)) && hits.push(`${p}:${i + 1}`));
    }
  }
}
roots.forEach(walk);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
const problems = [];
if (indexing && hits.length) problems.push(`${hits.length} placeholder lines remain while indexing is enabled.`);
if (indexing && (!siteUrl || /localhost|example\./.test(siteUrl))) problems.push("NEXT_PUBLIC_SITE_URL is not a real production URL.");

console.log(`Placeholder lines found: ${hits.length}`);
if (process.argv.includes("--list")) hits.forEach((h) => console.log("  " + h));
if (problems.length) {
  problems.forEach((p) => console.error("✗ " + p));
  process.exit(1);
}
console.log(indexing ? "✓ Ready to index." : "ℹ Indexing is disabled (pre-launch draft). Run with NEXT_PUBLIC_ALLOW_INDEXING=true to test the launch gate.");
