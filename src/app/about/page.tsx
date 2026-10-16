import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { Container, H2 } from "@/components/Container";
import { contactValue, site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Who Sterling Workcare is and how we work with employers and candidates.",
  path: "/about",
});

const rows: [string, string][] = [
  ["Company name", site.legalName],
  ["Company number", contactValue("companyNumber", "COMPANY NUMBER")],
  ["Registered office", contactValue("registeredOffice", "ADDRESS")],
  ["VAT number", "[CONFIRM, if registered]"],
  ["Memberships", "[CONFIRM, only if verifiable]"],
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <Container className="py-14">
          <Breadcrumbs trail={[{ label: "About", href: "/about" }]} />
          <h1 className="mb-4 font-display text-[clamp(36px,5.5vw,48px)] font-bold leading-[1.08] text-white">About Sterling Workcare</h1>
          <p className="max-w-[680px] text-xl leading-relaxed text-on-navy">Who we are and how we work with employers and candidates.</p>
        </Container>
      </section>
      <Reveal as="section">
        <Container className="flex flex-col gap-5 py-[72px]">
          <span className="self-start rounded bg-confirm-bg px-2.5 py-1 text-xs font-semibold text-confirm-text">Owner to provide</span>
          <H2>Our story</H2>
          <p className="m-0 max-w-[760px] text-lg leading-[1.7]">[OWNER TO PROVIDE: a short, true account of who started Sterling Workcare, when, and why. Only real facts: no invented years in business, client names or awards.]</p>
        </Container>
      </Reveal>
      <Reveal as="section" className="border-y border-border bg-white">
        <Container className="py-[72px]">
          <H2 className="mb-3">How we work</H2>
          <p className="mb-9 max-w-[680px] text-lg">Draft principles for the owner to edit or replace with their own.</p>
          <div className="flex flex-wrap gap-6">
            {[
              ["Clear and direct", "We tell you what we can and can’t supply, plainly, before you commit."],
              ["Dependable", "We aim to do what we say we will, and we’ll tell you early if something changes."],
              ["People first", "Good cover depends on good people. We treat both employers and candidates with respect."],
            ].map(([t, d]) => (
              <div key={t} className="min-w-[260px] flex-1 border-t-4 border-accent pt-[18px]">
                <h3 className="mb-2 text-[21px] font-semibold text-navy">{t}</h3>
                <p className="m-0 text-[17px] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>
      <Reveal as="section">
        <Container className="flex flex-wrap items-start gap-12 py-[72px]">
          <div className="min-w-0 flex-[1_1_320px]">
            <H2 className="mb-3">Company details</H2>
            <p className="m-0 text-lg">Shown here once verified, so you know exactly who you’re dealing with.</p>
          </div>
          <dl className="m-0 min-w-0 flex-[1_1_420px] rounded-lg border border-border bg-white px-6 py-2 text-[17px]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border py-4 last:border-b-0">
                <dt className="flex-[0_0_180px] font-semibold text-navy">{k}</dt>
                <dd className="m-0 min-w-[200px] flex-1">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>
      <Reveal as="section" className="bg-navy text-white">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-14">
          <div className="min-w-0 flex-[1_1_420px]">
            <h2 className="mb-2 font-display text-[clamp(28px,4.5vw,34px)] font-bold text-white">Talk to the team</h2>
            <p className="m-0 text-lg text-on-navy">Send an enquiry and we’ll get back to you.</p>
          </div>
          <ButtonLink href="/contact" variant="light">Get in touch</ButtonLink>
        </Container>
      </Reveal>
    </>
  );
}
