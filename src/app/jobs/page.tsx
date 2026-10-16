import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container, H2 } from "@/components/Container";
import { JobBoard } from "@/components/JobBoard";
import { RegisterForm } from "@/components/RegisterForm";
import { jobs } from "@/content/jobs";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Jobs in driving, care and support work",
  description: "Search current driving, care and support work vacancies, or register your interest with Sterling Workcare.",
  path: "/jobs",
});

export default function JobsPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <Container className="pb-12 pt-14">
          <Breadcrumbs trail={[{ label: "Jobs", href: "/jobs" }]} />
          <h1 className="mb-3.5 font-display text-[clamp(36px,5.5vw,48px)] font-bold leading-[1.08] text-white">Find work in driving, care and support</h1>
          <p className="max-w-[700px] text-xl leading-relaxed text-on-navy">Search current roles, or register so we can contact you when something suits your skills and area. [CONFIRM how roles are offered]</p>
        </Container>
      </section>

      <Reveal as="section">
        <Container className="pb-6 pt-14">
          <H2 className="mb-5">Jobs</H2>
          <JobBoard jobs={jobs} />
        </Container>
      </Reveal>

      <Reveal as="section" id="register">
        <Container className="flex flex-wrap items-start gap-12 pb-[72px] pt-12">
          <div className="flex min-w-0 flex-[3_1_480px] flex-col gap-9">
            <div>
              <H2 className="mb-3.5">What you’ll need</H2>
              <p className="m-0 text-lg leading-relaxed">[CONFIRM eligibility by sector: licence categories for drivers; experience, training and checks for care and support work. See <Link href="/candidates">Candidate services</Link>. Only list what Sterling Workcare actually requires.]</p>
            </div>
            <div>
              <H2 className="mb-3.5">What happens after you register</H2>
              <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-[22px] text-lg leading-[1.7]">
                <li>We receive your details.</li>
                <li>Someone from the team looks at your experience and location. [CONFIRM]</li>
                <li>If a role fits, we contact you. [CONFIRM timing and what comes next]</li>
              </ol>
            </div>
          </div>
          <div className="min-w-0 flex-[2_1_360px] rounded-xl border border-border bg-white p-7">
            <h2 className="mb-1.5 font-display text-[28px] font-bold text-navy">Register for work</h2>
            <p className="mb-5 text-base">Tell us the work you’re looking for.</p>
            <RegisterForm />
          </div>
        </Container>
      </Reveal>
    </>
  );
}
