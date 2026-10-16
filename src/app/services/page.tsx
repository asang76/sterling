import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { Container, H2 } from "@/components/Container";
import { ServiceCards } from "@/components/ServiceCards";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description: "Driver hire, care workers and support workers for employers, plus a clear route for candidates looking for work.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <Container className="py-14">
          <Breadcrumbs trail={[{ label: "Services", href: "/services" }]} />
          <h1 className="mb-4 font-display text-[clamp(36px,5.5vw,48px)] font-bold leading-[1.08] text-white">Our services</h1>
          <p className="mb-7 max-w-[700px] text-xl leading-relaxed text-on-navy">Driver hire, care workers and support workers for employers, plus a clear route for candidates. [CONFIRM full list of services]</p>
          <ButtonLink href="/contact" variant="light">Hire staff</ButtonLink>
        </Container>
      </section>
      <Reveal as="section">
        <Container className="pb-6 pt-[72px]">
          <H2 className="mb-3">Staffing services</H2>
          <p className="mb-8 max-w-[680px] text-lg">Pick a sector to see the roles, checks and shifts we can cover.</p>
          <ServiceCards
            cards={[
              { href: "/services/driver-hire", title: "Driver hire", text: "Driver categories, licence requirements, shift patterns, temporary cover and permanent recruitment. [CONFIRM]", linkText: "See driver hire" },
              { href: "/services/care-workers", title: "Care workers", text: "Care assistants and healthcare assistants: experience, training, availability and required checks. [CONFIRM]", linkText: "See care workers" },
              { href: "/services/support-workers", title: "Support workers", text: "Supported living, residential and community support, senior support workers and team leaders. [CONFIRM]", linkText: "See support workers" },
            ]}
          />
        </Container>
      </Reveal>
      <Reveal as="section">
        <Container className="pb-[72px] pt-6">
          <H2 className="mb-3">How to work with us</H2>
          <p className="mb-8 max-w-[680px] text-lg">Separate routes for employers and candidates.</p>
          <ServiceCards
            cards={[
              { href: "/employers", title: "Employer services", text: "How to request staff, service areas, response process, onboarding and how to discuss rates.", linkText: "See employer services" },
              { href: "/candidates", title: "Candidate services", text: "How to register, documents required, how shifts are offered, payroll arrangements and contact details.", linkText: "See candidate services" },
              { href: "/jobs", title: "Jobs", text: "Search current roles by sector, location and contract type, or register your interest.", linkText: "Browse jobs" },
            ]}
          />
        </Container>
      </Reveal>
    </>
  );
}
