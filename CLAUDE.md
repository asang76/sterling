@AGENTS.md

# Sterling Workcare website

Public website for Sterling Workcare Ltd (UK): driver hire, care workers and support workers for employers, plus registration and jobs for candidates.

## How to work in this repo
- Use the `sterling-website-system-design` and `sterling-workcare-website` skills for planning, SEO, performance and accessibility decisions.
- This is **Next.js 16 with Cache Components**. Read the relevant guide in `node_modules/next/dist/docs/` before changing routing, caching, metadata or forms.
- App Router, TypeScript, Tailwind CSS v4. Server Components by default; add `"use client"` only for real interaction.
- Business facts live in `src/config/site.ts`. Page copy for service pages lives in `src/content/pages.json`. Images are declared in `src/content/images.ts`. Real vacancies live in `src/content/jobs.ts` (leave empty until real).

## Truthfulness rules (non-negotiable)
- Never invent facts, stats, jobs, reviews, accreditations, addresses, phone numbers, emails, company number, or response times. Use a `[CONFIRM ...]` marker.
- Care and support are regulated sectors. Do not claim "CQC registered", "fully compliant", "24/7", "all vetted" or "fully DBS checked" unless the owner confirms it and can prove it.
- Never add sample vacancies. The empty state is the correct state until real roles exist.
- No Google ranking promises.

## Commands
- `npm run dev` start locally, `npm run build && npm start` production check
- `npm run lint`, `npm run typecheck`
- `npm run test:smoke` (needs a running server; set `SMOKE_URL`) checks status codes, titles, canonicals, h1, JSON-LD, internal links, sitemap
- `npm run check:launch` lists placeholders; with `NEXT_PUBLIC_ALLOW_INDEXING=true` it fails until none remain

## Open decisions for the owner
See `docs/IMPLEMENTATION_PLAN.md` ("Owner questions").
