import Image from "next/image";
import Link from "next/link";
import { footerCompany, footerServices } from "@/config/routes";
import { contactValue, site } from "@/config/site";

function Column({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div className="flex min-w-[180px] flex-1 flex-col gap-2 text-base">
      <h2 className="mb-1.5 text-lg font-semibold">{title}</h2>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="text-navy">{l.label}</Link>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-tint text-navy">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-10 px-6 pb-8 pt-14">
        <div className="min-w-[240px] flex-1">
          <Image src="/images/newlogo2.png" alt={site.legalName} width={1536} height={496} unoptimized className="h-auto w-[260px] max-w-full" />
        </div>
        <div className="flex min-w-[220px] flex-1 flex-col gap-2 text-base leading-normal">
          <h2 className="mb-1.5 text-lg font-semibold">Contact</h2>
          <span>Phone: {contactValue("phone", "PHONE")}</span>
          <span>Email: {contactValue("email", "EMAIL")}</span>
          <span>Registered office: {contactValue("registeredOffice", "ADDRESS")}</span>
          <span>Company number: {contactValue("companyNumber", "COMPANY NUMBER")}</span>
        </div>
        <Column title="Services" links={footerServices} />
        <Column title="Company" links={footerCompany} />
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-[#c5d3e3] px-6 pb-8 pt-5 text-sm text-slate">
        © {site.copyrightYear} {site.legalName}
      </div>
    </footer>
  );
}
