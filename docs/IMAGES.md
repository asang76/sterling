# Images and licences

1. Prefer the company's own photos (with permission from anyone shown).
2. Stock: **Freepik** has free and premium licences. Free use usually needs attribution; premium removes it. Check the licence on each asset page and keep a record. Unsplash, Pexels and Pixabay have their own licences: read the current terms per asset.
3. Avoid: recognisable brands, logos, vehicle livery that implies a client, identifiable people in a care setting without consent, and images that suggest services you do not provide.
4. For each image: save to `public/images/`, compress (target under about 200 KB for large images; WebP or AVIF), then fill its entry in `src/content/images.ts` (`src`, accurate `alt`, real `width` and `height`, and `source` with provider, URL, licence and credit).
5. Alt text describes the content; decorative images use empty alt.
6. Only the above-the-fold hero image uses `priority`. Everything else loads lazily by default.
7. Show required attribution somewhere visible (for example a short "Image credits" line in the footer or About page).
8. Care and support imagery: choose respectful, realistic pictures. Do not use images that imply real clients.
