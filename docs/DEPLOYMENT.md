# Deployment, Search Console and rollback

## Environment variables
See `.env.example`. Required in production: `NEXT_PUBLIC_SITE_URL` (the real https origin), `ENQUIRY_WEBHOOK_URL` (+ token if used). `NEXT_PUBLIC_ALLOW_INDEXING=true` only at launch.

## Preview vs production
Keep indexing **off** on every preview and staging deployment. Only the production deployment gets `NEXT_PUBLIC_ALLOW_INDEXING=true`.

## Build and run
```bash
npm ci
npm run lint && npm run typecheck && npm run build
npm start          # or deploy to your host (Vercel, a Node host, or a container)
```

## Pre-launch checklist
- [ ] `src/config/site.ts` facts confirmed and filled
- [ ] `npm run check:launch -- --list` shows 0 placeholders with `NEXT_PUBLIC_ALLOW_INDEXING=true`
- [ ] Both forms tested end to end into the real destination, including the failure case
- [ ] Licensed images added with credits
- [ ] Legal pages reviewed by an adviser
- [ ] Domain on HTTPS, one preferred host (www or not), HSTS set at host
- [ ] `/robots.txt` allows crawling and lists the sitemap; `/sitemap.xml` has only real pages
- [ ] Lighthouse (mobile) and an accessibility pass recorded in this repo
- [ ] Cookie consent in place before any analytics

## Search Console and analytics
1. Verify the domain in Google Search Console (DNS record preferred). Do not commit tokens.
2. Submit `https://<domain>/sitemap.xml`.
3. Add Bing Webmaster Tools if wanted.
4. Add analytics only with consent; track "enquiry sent" and "registration sent" events without personal data.
5. Watch Coverage, Core Web Vitals and queries weekly for the first month.

## Smoke test after each deploy
`SMOKE_URL=https://<domain> npm run test:smoke`, then submit a test enquiry and confirm it arrives.

## Rollback
Redeploy the previous successful build on your host. If a bad indexing setting went live, set `NEXT_PUBLIC_ALLOW_INDEXING=false`, redeploy, and request removal in Search Console if pages were indexed in error.
