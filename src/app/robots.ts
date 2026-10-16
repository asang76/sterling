import type { MetadataRoute } from "next";
import { indexingEnabled, siteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (!indexingEnabled) {
    // Pre-launch and preview deployments: ask crawlers to stay away.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
