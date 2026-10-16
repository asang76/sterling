import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { getContentPage } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Employer services",
  description: "How to request driver, care and support staff: the process, service areas, onboarding and how rates are discussed.",
  path: "/employers",
});

export default function Page() {
  return <ContentPage data={getContentPage("employers")} trail={[{ label: "Employer services", href: "/employers" }]} />;
}
