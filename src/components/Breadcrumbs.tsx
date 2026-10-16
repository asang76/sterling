import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/seo";

export type Crumb = { label: string; href: string };

/** Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...trail];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: absoluteUrl(c.href) })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-[18px] text-[15px] text-on-navy">
        <ol className="m-0 flex list-none flex-wrap gap-x-2 p-0">
          {all.map((c, i) => (
            <li key={c.href} className="flex gap-2">
              {i < all.length - 1 ? (
                <>
                  <Link href={c.href} className="text-on-navy underline-offset-2 hover:text-white">{c.label}</Link>
                  <span aria-hidden="true">/</span>
                </>
              ) : (
                <span aria-current="page">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={schema} />
    </>
  );
}
