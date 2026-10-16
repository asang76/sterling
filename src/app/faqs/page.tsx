import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { getContentPage } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQs",
  description: "Answers for employers and candidates about requesting staff, registering for work, checks, pay and complaints.",
  path: "/faqs",
});

export default function Page() {
  return <ContentPage data={getContentPage("faqs")} trail={[{ label: "FAQs", href: "/faqs" }]} />;
}
