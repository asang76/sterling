import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { getContentPage } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Complaints and safeguarding",
  description: "How to raise a complaint or a safeguarding concern with Sterling Workcare.",
  path: "/complaints",
});

export default function Page() {
  return <ContentPage data={getContentPage("complaints")} trail={[{ label: "Complaints and safeguarding", href: "/complaints" }]} />;
}
