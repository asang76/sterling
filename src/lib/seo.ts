import type { Metadata } from "next";
import { indexingEnabled, site, siteUrl } from "@/config/site";

type SeoInput = {
  /** Page title without the site name. The root layout adds the template. */
  title: string;
  description: string;
  /** Canonical path, starting with "/". */
  path: string;
  /** Force noindex for a specific page (for example thank-you pages). */
  noindex?: boolean;
};

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

/** Builds consistent per-page metadata. Always use this instead of ad hoc objects. */
export function buildMetadata({ title, description, path, noindex = false }: SeoInput): Metadata {
  const canIndex = indexingEnabled && !noindex;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: canIndex ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title,
      description,
      url: path,
    },
    twitter: { card: "summary", title, description },
  };
}
