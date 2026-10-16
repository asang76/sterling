# Architecture

## Stack
Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Zod. No database, no CMS yet. Content is typed files and JSON, which suits a small site. Move to a CMS or database when non-developers must edit pages or when vacancies are managed daily.

## Rendering
Every page is static (prerendered). Cache Components is on, so avoid reading request data (`cookies()`, `headers()`, `searchParams`) in page components; do it only inside Server Actions or behind `<Suspense>`. Client Components exist only for: mobile menu, hero carousel, job filter, and the two forms.

## Folder map
```
src/app            routes, robots.ts, sitemap.ts, actions/submit.ts
src/components     UI, forms, JSON-LD, carousel
src/config         site facts, routes and menus
src/content        page copy (JSON), images, jobs, types
src/lib            seo, validation, rate limit, enquiry delivery
scripts            check-launch, smoke test
```

## SEO system
- `buildMetadata()` is the only way pages declare metadata (title, description, canonical, robots, Open Graph). The root layout supplies `metadataBase` and the title template.
- `indexingEnabled` (env `NEXT_PUBLIC_ALLOW_INDEXING`) switches robots meta, robots.txt and the draft banner together.
- `routes.ts` drives the sitemap and footer. Add a page there and in the sitemap in one place.
- JSON-LD: Organization and WebSite in the layout, BreadcrumbList on content pages. Service and JobPosting markup are intentionally **not** emitted yet: they must match confirmed, visible content.

## Forms
`ContactForm` and `RegisterForm` call Server Actions in `src/app/actions/submit.ts`. Flow: validate (Zod) → honeypot → rate limit → `deliver()`. `deliver()` posts JSON to `ENQUIRY_WEBHOOK_URL`; if it is missing or fails, the user sees a clear failure and keeps what they typed. Personal data is never logged.

## Security
Security headers in `next.config.ts` (nosniff, frame deny, referrer policy, permissions policy), `poweredByHeader` off, server-only delivery code, no secrets in client bundles. To do: CSP (after choosing analytics), HSTS at the host, shared rate limiting, CAPTCHA only if spam appears.

## Images
All images go through `ImageSlot` and the registry in `src/content/images.ts` (dimensions, alt text, licence details). Only the first hero image gets `priority`.
