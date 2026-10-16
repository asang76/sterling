# Project audit

**Date:** 2026-10-16. **Scope:** this repository as first scaffolded. There was no earlier codebase, only the HTML prototype (a design reference). Everything below was checked by running the commands noted.

## Current architecture
- Next.js 16.4.2, App Router, `src/` layout, TypeScript strict, Tailwind v4, React 19, Cache Components enabled.
- 17 static routes (14 public pages, robots.txt, sitemap.xml, 404). All prerendered.
- Forms use Server Actions with Zod validation, honeypot, per-instance rate limit and a single delivery boundary.

## Strengths
- Metadata, canonical, robots and sitemap come from one helper and one route registry.
- Pre-launch safety: noindex and `Disallow: /` unless `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- No fabricated facts: unknown business details are `null` in config and show as `[CONFIRM ...]`.
- Local fonts (no third-party font request), one image registry, no heavy dependencies (runtime deps: next, react, react-dom, zod, server-only).
- Accessible patterns: skip link, landmarks, labelled fields, error summary, keyboard-closable menu, reduced-motion handling in the carousel.

## Weaknesses and risks
| Priority | Issue |
| --- | --- |
| Critical | No real business facts yet (phone, email, address, company number, service area, services offered). Site must not be indexed until confirmed. |
| Critical | Forms deliver nowhere until `ENQUIRY_WEBHOOK_URL` is set. They show a safe failure message instead of losing data. |
| Critical | Care and support wording needs review (regulatory position, checks, safeguarding). Open question for the owner. |
| High | No licensed photos yet (placeholders only). Needs `docs/IMAGES.md` process. |
| High | Privacy policy, terms, complaints and safeguarding pages are structure only. Need a qualified adviser. |
| High | In-memory rate limiter is per instance. Use a shared store or host firewall in production. |
| Medium | No cookie banner or analytics yet (deliberately). Add consent before any non-essential cookies. |
| Medium | CV upload not built (needs secure storage, type and size limits). |
| Medium | No Content-Security-Policy yet; add after analytics choice. HSTS to be set at the host. |
| Medium | No automated component or end-to-end test suite committed; only the smoke script. |
| Low | `npm audit` reports 0 vulnerabilities in production dependencies; dev tooling has advisories to review on upgrade. |

## Measured so far
- `npm run lint`, `tsc --noEmit`, `npm run build`: pass.
- Smoke script on a production build: 14 pages 200, unique titles, one h1 each, canonicals, valid JSON-LD, internal links resolve, sitemap lists 14 URLs, unknown route returns 404.
- Browser check (Chromium, 1440 and 390 wide): no horizontal overflow, no console errors, mobile menu opens and closes with Escape, carousel advances, form validation and safe-failure states work, typed values are kept after an error.
- **Not measured:** Lighthouse/PageSpeed scores, Core Web Vitals, a full accessibility audit with a screen reader, real email/CRM delivery.
