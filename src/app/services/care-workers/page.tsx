import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { getContentPage } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Care workers",
  description: "Care assistants and healthcare assistants for care homes and home care. Tell us the setting, shifts and experience you need.",
  path: "/services/care-workers",
});

export default function Page() {
  return <ContentPage data={getContentPage("care-workers")} trail={[{ label: "Services", href: "/services" }, { label: "Care workers", href: "/services/care-workers" }]} />;
}
