/**
 * Single source of truth for business facts.
 * Anything the owner has not confirmed is `null`. Never invent values here.
 * The UI renders `null` as a visible "[CONFIRM ...]" marker, and
 * `npm run check:launch` fails if any marker is left when indexing is enabled.
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = (rawUrl && rawUrl.length > 0 ? rawUrl : "http://localhost:3000").replace(/\/+$/, "");

/** Search engines may index the site only when this is explicitly "true". */
export const indexingEnabled = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const site = {
  name: "Sterling Workcare",
  legalName: "Sterling Workcare Ltd",
  /** Short, factual description. Confirm wording with the owner before launch. */
  description:
    "Driver, care worker and support worker staffing for employers, and a way for candidates to register for work.",
  locale: "en_GB",
  copyrightYear: 2026,
  contact: {
    phone: null as string | null,
    email: null as string | null,
    registeredOffice: null as string | null,
    companyNumber: null as string | null,
  },
  /** Proposed starting area from the owner's brief. Not yet confirmed. */
  serviceArea: null as string | null,
  social: [] as string[],
} as const;

export function confirm(label: string): string {
  return `[CONFIRM ${label}]`;
}

export function contactValue(key: keyof typeof site.contact, label: string): string {
  return site.contact[key] ?? confirm(label);
}
