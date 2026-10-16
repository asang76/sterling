import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { getContentPage } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Candidate services",
  description: "How to register for driving, care and support work, the documents you may need, how shifts are offered and how pay works.",
  path: "/candidates",
});

export default function Page() {
  return <ContentPage data={getContentPage("candidates")} trail={[{ label: "Candidate services", href: "/candidates" }]} />;
}
