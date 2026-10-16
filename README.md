# Sterling Workcare website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Zod

## Start
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

The site is a **pre-launch draft**: it tells search engines not to index it, and any unconfirmed business fact shows as `[CONFIRM ...]`.

## Where things are
| What | Where |
| --- | --- |
| Business facts (phone, email, address, company number, area) | `src/config/site.ts` |
| Routes, menu, footer links, sitemap list | `src/config/routes.ts` |
| Service, employer, candidate, FAQ and complaints page copy | `src/content/pages.json` |
| Images and licence details | `src/content/images.ts`, `docs/IMAGES.md` |
| Real vacancies | `src/content/jobs.ts` (empty on purpose) |
| SEO helper, robots, sitemap, JSON-LD | `src/lib/seo.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/components/JsonLd.tsx` |
| Forms and server actions | `src/components/ContactForm.tsx`, `RegisterForm.tsx`, `src/app/actions/submit.ts` |
| Where enquiries are delivered | `src/lib/enquiries.ts` (set `ENQUIRY_WEBHOOK_URL`) |

## Checks
```bash
npm run lint && npm run typecheck && npm run build
npm start &            # then:
SMOKE_URL=http://localhost:3000 npm run test:smoke
npm run check:launch -- --list
```

## Going live
See `docs/DEPLOYMENT.md`. Do not set `NEXT_PUBLIC_ALLOW_INDEXING=true` until `npm run check:launch` passes with it on.
