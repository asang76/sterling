import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Website terms",
  description: "Terms of use for the Sterling Workcare website.",
  path: "/terms",
});

export default function Page() {
  return (
    <>
      <div className="bg-confirm-bg px-6 py-2.5 text-center text-sm leading-snug text-confirm-text">
        <strong>Draft structure only.</strong> This page must be written or reviewed by a suitably qualified adviser before launch.
      </div>
      <section className="bg-navy text-white">
        <Container className="py-14">
          <Breadcrumbs trail={[{ label: "Website terms", href: "/terms" }]} />
          <h1 className="font-display text-[clamp(36px,5.5vw,48px)] font-bold leading-[1.08] text-white">Website terms</h1>
        </Container>
      </section>
      <Reveal as="section">
        <Container narrow className="flex flex-col gap-9 py-16 text-[17px] leading-[1.7]">
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Using this website</h2>
            <p className="m-0">[ADVISER TO WRITE: acceptable use, availability, and what visitors can rely on.]</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Enquiries and services</h2>
            <p className="m-0">Sending an enquiry doesn’t create a contract. [CONFIRM how services are agreed and where the commercial terms live.]</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Terms of business (employers)</h2>
            <p className="m-0">[ADVISER TO WRITE: rates, cancellation, payment terms and responsibilities. Published separately from these website terms.]</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Candidate terms</h2>
            <p className="m-0">[ADVISER TO WRITE: how recruitment, placements, shifts and payments work for candidates.]</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Content and links</h2>
            <p className="m-0">[ADVISER TO WRITE: ownership of content, third-party links, accuracy of information.]</p>
          </div>
          <div>
            <h2 className="mb-2.5 font-display text-[28px] font-bold text-navy">Liability and governing law</h2>
            <p className="m-0">[ADVISER TO WRITE.]</p>
          </div>
        </Container>
      </Reveal>
    </>
  );
}
