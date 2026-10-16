import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { Container, H2 } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { jobs } from "@/content/jobs";
import { HeroCarousel, type Slide } from "@/components/HeroCarousel";
import { Reveal } from "@/components/Reveal";
import { ServiceCards } from "@/components/ServiceCards";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Driver, care and support staffing",
  description: "Staff for driving, care and support services, and a simple way for candidates to register for work. [CONFIRM service area and offer]",
  path: "/",
});

const slides: Slide[] = [
  { kicker: "For employers", title: "Staff when you need them", text: "Your staffing partner for driving, care and support services across Birmingham and the West Midlands. [CONFIRM service area and offer]", c1: "Hire staff", h1: "/contact", c2: "Employer services", h2: "/employers", image: "heroDriver" },
  { kicker: "For candidates", title: "Find your next role", text: "Register with Sterling Workcare and hear about driving, care and support roles that match your experience and where you want to work.", c1: "Register for work", h1: "/candidates", c2: "Browse jobs", h2: "/jobs", image: "heroCare" },
  { kicker: "Our services", title: "Driving, care and support", text: "Driver hire, care workers and support workers, each with its own page. Services shown here are to confirm until the owner approves them.", c1: "See all services", h1: "/services", c2: "Contact the team", h2: "/contact", image: "heroTeam" },
];

const icon = (d: string) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2f6aa8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: d }} />
);

const services = [
  { href: "/services/driver-hire", title: "Driver hire", text: "HGV, van and other drivers on temporary or permanent terms. [CONFIRM categories]", linkText: "See driver hire", icon: icon('<rect x="1" y="6" width="14" height="10" rx="1"/><path d="M15 9h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>') },
  { href: "/services/care-workers", title: "Care workers", text: "Care assistants and healthcare assistants for care homes and home care. [CONFIRM settings]", linkText: "See care workers", icon: icon('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>') },
  { href: "/services/support-workers", title: "Support workers", text: "Support workers, seniors and team leaders for supported living and residential services. [CONFIRM]", linkText: "See support workers", icon: icon('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>') },
];

const why = [
  "Responsive staffing support [CONFIRM]",
  "Temporary and permanent recruitment, where offered [CONFIRM]",
  "Candidate screening and role-specific checks [CONFIRM which checks]",
  "A local point of contact for employers and candidates [CONFIRM]",
];

const faqs = [
  { q: "What should I include when I request staff?", a: "The sector and role (and licence category for drivers), how many staff, the work location, your start date and how long you need cover. Anything else you add helps us respond properly." },
  { q: "Which driver licence categories do you cover?", a: "[CONFIRM: for example HGV Class 1 (C+E), Class 2 (C), 7.5-tonne, van. Care and support roles are listed on their own pages.]" },
  { q: "Is it free to register for work?", a: "[CONFIRM before publishing. Do not state this until the owner agrees.]" },
  { q: "How quickly will I hear back?", a: "[CONFIRM a real response time. No promise is made until the owner agrees one.]" },
];

function RouteCard({ href, title, text, cta }: { href: string; title: string; text: string; cta: string }) {
  return (
    <Link href={href} className="flex min-w-0 flex-[1_1_420px] flex-col gap-2 rounded-xl border-2 border-border bg-white p-8 no-underline transition-[border-color] hover:border-accent">
      <span className="font-display text-[28px] font-bold text-navy">{title}</span>
      <span className="text-[17px] leading-normal text-slate">{text}</span>
      <span className="mt-1.5 font-semibold text-accent">{cta} →</span>
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={slides} />

      <Reveal as="section">
        <Container className="flex flex-wrap gap-6 pb-6 pt-16">
          <RouteCard href="/candidates" title="I’m looking for work" text="Driving, care or support work. Browse roles and register so we can contact you when something suits you." cta="Candidate services" />
          <RouteCard href="/employers" title="I need staff" text="Drivers, care workers or support workers. Tell us the role, location and start date and we’ll confirm what we can supply." cta="Employer services" />
        </Container>
      </Reveal>

      <Reveal as="section">
        <Container className="pb-[72px] pt-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <H2>Latest jobs</H2>
            <Link href="/jobs" className="text-[17px] font-semibold">See all jobs →</Link>
          </div>
          {jobs.length === 0 ? (
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-border bg-white p-8">
              <div className="min-w-0 flex-[1_1_380px]">
                <h3 className="mb-2 text-[22px] font-semibold text-navy">No open roles listed right now</h3>
                <p className="m-0 text-[17px] leading-relaxed">We only show real, current vacancies. Register your details and we’ll be in touch when a suitable role comes up.</p>
              </div>
              <ButtonLink href="/jobs#register">Register for work</ButtonLink>
            </div>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              {jobs.slice(0, 3).map((j) => (
                <li key={j.slug} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-white px-6 py-5">
                  <div className="min-w-0 flex-[1_1_340px]">
                    <h3 className="mb-2 text-[22px] font-semibold text-navy">
                      {j.title}
                      {j.sample ? <span className="ml-3 rounded bg-confirm-bg px-2 py-0.5 align-middle text-xs font-semibold text-confirm-text">Sample role</span> : null}
                    </h3>
                    <p className="m-0 flex flex-wrap gap-x-5 gap-y-1 text-base"><span>{j.location}</span><span>{j.contract}</span><span>{j.sector}</span></p>
                  </div>
                  <Link href="/jobs" className="font-semibold">View role →</Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Reveal>

      <section className="border-y border-border bg-white">
        <Container className="py-20">
          <Reveal>
            <H2 className="mb-3">Staff for driving, care and support services</H2>
            <p className="mb-10 max-w-[680px] text-lg leading-relaxed">Three sectors, one team. Each service is confirmed with the owner before it goes live.</p>
          </Reveal>
          <ServiceCards cards={services} />
          <p className="mt-7 text-[17px]">
            <Link href="/services" className="font-semibold">All services</Link> · <Link href="/employers" className="font-semibold">Employer services</Link> · <Link href="/candidates" className="font-semibold">Candidate services</Link>
          </p>
        </Container>
      </section>

      <Reveal as="section">
        <Container className="py-20">
          <H2 className="mb-3">How it works</H2>
          <p className="mb-10 max-w-[680px] text-lg leading-relaxed">One simple route for each side. Steps and timings need confirming with the owner.</p>
          <div className="flex flex-wrap gap-6">
            {[
              { title: "If you’re hiring", tone: "bg-accent", href: "/contact", cta: "Hire staff", steps: ["Tell us the sector, role, location and start date.", "A member of the team reviews the request.", "We confirm which staff are available. [CONFIRM how staff are matched and checked]", "Staff start on the agreed date."] },
              { title: "If you’re a candidate", tone: "bg-navy", href: "/candidates", cta: "Register for work", steps: ["Browse roles or register your details and sector.", "The team looks at your experience, documents and area. [CONFIRM checks]", "If a role fits, we contact you.", "You start work on the agreed date."] },
            ].map((col) => (
              <div key={col.title} className="min-w-0 flex-[1_1_420px] rounded-xl border border-border bg-white p-8">
                <h3 className="mb-5 font-display text-[26px] font-bold text-navy">{col.title}</h3>
                <ol className="m-0 flex list-none flex-col gap-[18px] p-0">
                  {col.steps.map((s, i) => (
                    <li key={s} className="flex items-start gap-4">
                      <span className={`flex size-9 flex-none items-center justify-center rounded-full font-semibold text-white ${col.tone}`}>{i + 1}</span>
                      <span className="pt-1 text-[17px] leading-normal">{s}</span>
                    </li>
                  ))}
                </ol>
                <ButtonLink href={col.href} variant={col.tone === "bg-navy" ? "navy" : "primary"} className="mt-6">{col.cta}</ButtonLink>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>

      <Reveal as="section" className="border-t border-border bg-white">
        <Container className="py-20">
          <H2 className="mb-3">Why work with Sterling Workcare</H2>
          <p className="mb-8 max-w-[700px] text-lg leading-relaxed">Only claims the owner can prove will be published. Figures, logos and testimonials are added once they are real.</p>
          <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-3.5 p-0 text-lg leading-normal">
            {why.map((w) => (
              <li key={w} className="flex min-w-[280px] flex-[1_1_300px] items-start gap-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2f6aa8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none"><path d="M20 6 9 17l-5-5" /></svg>
                {w}
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>

      <Reveal as="section">
        <Container className="flex flex-wrap items-start gap-10 py-[72px]">
          <div className="min-w-0 flex-[1_1_360px]">
            <span className="mb-3.5 inline-block rounded bg-confirm-bg px-2.5 py-1 text-xs font-semibold text-confirm-text">To confirm</span>
            <H2 className="mb-3">Where we work</H2>
            <p className="mb-5 text-lg leading-relaxed">Proposed starting area: Birmingham and the West Midlands. [CONFIRM SERVICE AREA: local, regional or national, and which regions.] No office or location will be shown unless it’s real.</p>
            <Link href="/contact" className="text-[17px] font-semibold">Contact the team →</Link>
          </div>
        </Container>
      </Reveal>

      <Reveal as="section" className="border-t border-border bg-white">
        <Container narrow className="py-20">
          <H2 className="mb-8">Common questions</H2>
          <Faq items={faqs} />
          <p className="mt-6 text-[17px]"><Link href="/faqs" className="font-semibold">More FAQs →</Link></p>
        </Container>
      </Reveal>

      <Reveal as="section" className="bg-navy text-white">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-16">
          <div className="min-w-0 flex-[1_1_420px]">
            <h2 className="mb-2.5 font-display text-[clamp(28px,4.5vw,36px)] font-bold text-white">Ready to get started?</h2>
            <p className="m-0 text-lg text-on-navy">Looking for work, or looking for staff? Pick your route.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/candidates" variant="light">Register for work</ButtonLink>
            <ButtonLink href="/contact" variant="outline">Hire staff</ButtonLink>
          </div>
        </Container>
      </Reveal>
    </>
  );
}
