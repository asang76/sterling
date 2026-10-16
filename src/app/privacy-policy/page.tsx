import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description: "How Sterling Workcare collects, uses, stores and shares personal data from employers and candidates.",
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <>
      <div className="bg-confirm-bg px-6 py-2.5 text-center text-sm leading-snug text-confirm-text">
        <strong>Draft structure only.</strong> This page must be written or reviewed by a suitably qualified adviser before launch.
      </div>
      <section className="bg-navy text-white">
        <Container className="py-14">
          <Breadcrumbs trail={[{ label: "Privacy policy", href: "/privacy-policy" }]} />
          <h1 className="font-display text-[clamp(36px,5.5vw,48px)] font-bold leading-[1.08] text-white">Privacy policy</h1>
        </Container>
      </section>
      <Reveal as="section">
        <Container narrow className="flex flex-col gap-9 py-16 text-[17px] leading-[1.7]">
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Who we are</h2>
            <p className="m-0">Sterling Workcare Ltd, [CONFIRM ADDRESS]. Contact for data protection questions: [CONFIRM EMAIL].</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">What we collect</h2>
            <p className="m-0">Employer enquiries: name, organisation, contact details, staffing needs. Candidate registrations: name, contact details, role, location, experience, availability. [ADVISER TO CONFIRM the full list against the real forms.]</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Why we use it and our lawful basis</h2>
            <p className="m-0">[ADVISER TO WRITE: purposes and lawful basis for each type of data.]</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Who we share it with</h2>
            <p className="m-0">[CONFIRM: for example email provider, CRM, payroll provider, clients. List only real recipients.]</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">How long we keep it</h2>
            <p className="m-0">[ADVISER TO WRITE: retention periods for enquiries, registrations and placement records.]</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Your rights</h2>
            <p className="m-0">[ADVISER TO WRITE: access, correction, erasure, objection, and how to complain to the ICO.]</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Cookies and analytics</h2>
            <p className="m-0">[CONFIRM: which cookies or analytics are used, and the consent controls.]</p>
          </div>
        </Container>
      </Reveal>
    </>
  );
}
