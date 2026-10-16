import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { absoluteUrl } from "@/lib/seo";

/** Built from the route registry. Only indexable, public pages are listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.filter((r) => r.indexable).map((r) => ({ url: absoluteUrl(r.path), changeFrequency: "monthly", priority: r.path === "/" ? 1 : 0.7 }));
}
