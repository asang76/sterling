import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { contactValue } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Contact and staff requests",
  description: "Request driver, care or support staff, or get in touch with the Sterling Workcare team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <Container className="py-14">
          <Breadcrumbs trail={[{ label: "Contact", href: "/contact" }]} />
          <h1 className="mb-4 font-display text-[clamp(36px,5.5vw,48px)] font-bold leading-[1.08] text-white">Request staff or get in touch</h1>
          <p className="max-w-[680px] text-xl leading-relaxed text-on-navy">Tell us which staff you need (drivers, care workers or support workers), the role, where the work is based, and when it starts. Our team will review the request and confirm availability.</p>
        </Container>
      </section>
      <Reveal as="section">
        <Container className="flex flex-wrap items-start gap-12 py-[72px]">
          <div className="min-w-0 flex-[2_1_520px] rounded-xl border border-border bg-white p-8">
            <h2 className="mb-1.5 font-display text-[30px] font-bold text-navy">Send an enquiry</h2>
            <ContactForm />
          </div>
          <aside aria-label="Other ways to reach us" className="flex min-w-0 flex-[1_1_300px] flex-col gap-5">
            <div className="rounded-lg border border-border bg-white p-6">
              <h2 className="mb-3 font-display text-2xl font-bold text-navy">Contact details</h2>
              <dl className="m-0 flex flex-col gap-3 text-base">
                <div><dt className="font-semibold text-navy">Phone</dt><dd className="m-0">{contactValue("phone", "PHONE")}</dd></div>
                <div><dt className="font-semibold text-navy">Email</dt><dd className="m-0">{contactValue("email", "EMAIL")}</dd></div>
                <div><dt className="font-semibold text-navy">Registered office</dt><dd className="m-0">{contactValue("registeredOffice", "ADDRESS")}</dd></div>
              </dl>
            </div>
            <div className="rounded-lg border border-border bg-white p-6">
              <h2 className="mb-3 font-display text-2xl font-bold text-navy">What happens next</h2>
              <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-5 text-base leading-relaxed">
                <li>Someone reviews what you need.</li>
                <li>We confirm what we can supply. [CONFIRM]</li>
                <li>We agree the details and a start date.</li>
              </ol>
            </div>
          </aside>
        </Container>
      </Reveal>
    </>
  );
}
