import raw from "./pages.json";
import type { ContentPageData } from "./types";

export type ContentSlug = "driver-hire" | "care-workers" | "support-workers" | "employers" | "candidates" | "faqs" | "complaints";

const pages = raw as unknown as Record<ContentSlug, ContentPageData>;

export function getContentPage(slug: ContentSlug): ContentPageData {
  return pages[slug];
}
