# Implementation plan

## Done
1. Scaffold, tokens, fonts, layout, header, footer, skip link.
2. SEO system: `buildMetadata`, canonical, noindex gate, robots, sitemap, Organization, WebSite and BreadcrumbList JSON-LD.
3. Pages: Home (carousel), Services, Driver hire, Care workers, Support workers, Employers, Candidates, Jobs (+ registration), Contact (+ staff request form), About, FAQs, Complaints and safeguarding, Privacy, Terms, 404, error.
4. Forms: Zod validation, honeypot, rate limit, delivery boundary, safe failure, keep typed values.
5. Launch gate script and smoke script.

## Next (in order)
1. **Owner facts** into `src/config/site.ts`: phone, email, registered office, company number, service area.
2. **Confirm the offer**: which services, which driver categories, care settings, support roles, checks per role. Replace each `[CONFIRM ...]` in `src/content/pages.json` and page files.
3. **Delivery**: set `ENQUIRY_WEBHOOK_URL` (CRM, Make/Zapier, or an email-sending endpoint). Test both forms end to end.
4. **Images**: add licensed photos (`docs/IMAGES.md`), fill `src/content/images.ts`, set the hero image `priority`.
5. **Legal**: adviser writes privacy policy, terms of business, candidate terms, complaints and safeguarding.
6. **Real vacancies**: add to `src/content/jobs.ts` (or connect a feed); add `/jobs/[slug]` pages with `JobPosting` JSON-LD for real open roles only.
7. **Analytics and consent**: pick provider, add consent banner, conversion events for successful enquiries (no personal data in events).
8. **Tests**: add Playwright end-to-end tests for both forms and navigation; axe checks.
9. **Performance and accessibility measurement**: Lighthouse on the deployed preview (mobile), record results.
10. **Launch**: `docs/DEPLOYMENT.md` checklist.

## Owner questions
1. Do you supply workers only to care homes and supported living providers, or also provide care directly to people in their own homes? (affects what can be said about CQC)
2. Is the service area Birmingham and the West Midlands?
3. Which driver categories, care roles and support roles do you really supply?
4. Temporary, permanent, or both, per sector?
5. Which checks do you carry out per role (right to work, DBS, references, training)?
6. How does candidate pay work, and is registering free?
7. Where should enquiries go (email address or CRM)?
8. Do you also supply vehicles? (the truck-and-driver page from the prototype was left out until confirmed)
