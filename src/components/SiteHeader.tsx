import Image from "next/image";
import Link from "next/link";
import { mainNav } from "@/config/routes";
import { contactValue, site } from "@/config/site";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="relative border-b border-border bg-white">
      <div className="hidden bg-navy text-sm text-on-navy md:block">
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-x-4 gap-y-2 px-6 py-2">
          <span>Driver, care and support staffing</span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/candidates" className="font-medium text-white">Register for work</Link>
            <span>Phone: {contactValue("phone", "PHONE")}</span>
          </span>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3">
        <Link href="/" aria-label={`${site.legalName}, home`} className="flex items-center gap-3 no-underline">
          <Image src="/images/newlogo2.png" alt="" width={1536} height={496} priority unoptimized className="h-auto w-52" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="py-1.5 text-base font-medium text-navy no-underline hover:text-accent hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="rounded-md bg-accent px-5 py-3 text-base font-semibold text-white no-underline hover:brightness-110 hover:text-white">
            Hire staff
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
