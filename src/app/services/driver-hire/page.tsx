import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { getContentPage } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Driver hire",
  description: "Temporary cover and permanent recruitment for HGV, van and other driving roles. Tell us what you need and we confirm which drivers we can supply.",
  path: "/services/driver-hire",
});

export default function Page() {
  return <ContentPage data={getContentPage("driver-hire")} trail={[{ label: "Services", href: "/services" }, { label: "Driver hire", href: "/services/driver-hire" }]} />;
}
