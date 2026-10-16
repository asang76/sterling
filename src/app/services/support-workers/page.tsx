import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { getContentPage } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Support workers",
  description: "Support workers, senior support workers and team leaders for supported living, residential and community services.",
  path: "/services/support-workers",
});

export default function Page() {
  return <ContentPage data={getContentPage("support-workers")} trail={[{ label: "Services", href: "/services" }, { label: "Support workers", href: "/services/support-workers" }]} />;
}
