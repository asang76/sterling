import Link from "next/link";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { ButtonLink } from "./ButtonLink";
import { Container, H2 } from "./Container";
import { Faq } from "./Faq";
import type { ContentPageData, Section } from "@/content/types";
import { Reveal } from "./Reveal";

function ConfirmTag() {
  return <span className="mb-2.5 inline-block rounded bg-confirm-bg px-2.5 py-1 text-xs font-semibold text-confirm-text">To confirm</span>;
}

function Check() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2f6aa8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SectionBlock({ s }: { s: Section }) {
  if (s.kind === "confirm") {
    return (
      <div className="rounded-lg border-2 border-dashed border-border-strong bg-white p-[22px]">
        <ConfirmTag />
        <p className="m-0 text-[17px] leading-relaxed">{s.body}</p>
      </div>
    );
  }
  return (
    <div>
      <H2 className="mb-3">{s.heading}</H2>
      {s.kind === "p" ? <p className="m-0 text-lg leading-[1.65]">{s.body}</p> : null}
      {s.kind === "bullets" ? (
        <ul className="m-0 flex list-none flex-col gap-3 p-0 text-lg leading-normal">
          {s.body.map((b) => (
            <li key={b} className="flex items-start gap-3"><Check />{b}</li>
          ))}
        </ul>
      ) : null}
      {s.kind === "steps" ? (
        <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-[22px] text-lg leading-[1.7]">
          {s.body.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export function ContentPage({ data, trail, faqHeading = "Common questions", showFaqs = true }: { data: ContentPageData; trail: Crumb[]; faqHeading?: string; showFaqs?: boolean }) {
  return (
    <>
      <section className="bg-navy text-white">
        <Container className="py-14">
          <Breadcrumbs trail={trail} />
          <h1 className="mb-4 font-display text-[clamp(36px,5.5vw,48px)] font-bold leading-[1.08] text-white">{data.h1}</h1>
          <p className="mb-7 max-w-[700px] text-xl leading-relaxed text-on-navy">{data.lead}</p>
          <ButtonLink href={data.chref} variant="light">{data.cta}</ButtonLink>
        </Container>
      </section>

      <Reveal as="section">
        <Container className="flex flex-wrap items-start gap-12 py-[72px]">
          <div className="flex min-w-0 flex-[2_1_520px] flex-col gap-10">
            {data.secs.map((s, i) => (
              <SectionBlock key={`${s.kind}-${i}`} s={s} />
            ))}
          </div>
          <aside aria-label={data.asideTitle} className="min-w-0 flex-[1_1_300px] rounded-lg border border-border bg-white p-6">
            <h2 className="mb-4 font-display text-2xl font-bold text-navy">{data.asideTitle}</h2>
            <dl className="m-0 flex flex-col gap-3.5 text-base leading-normal">
              {data.aside.map((a) => (
                <div key={a.label}>
                  <dt className="font-semibold text-navy">{a.label}</dt>
                  <dd className="m-0">{a.value}</dd>
                </div>
              ))}
            </dl>
            <Link href={data.asideHref} className="mt-[22px] block rounded-md bg-accent px-5 py-3.5 text-center text-[17px] font-semibold text-white no-underline hover:brightness-110 hover:text-white">
              {data.asideCta}
            </Link>
          </aside>
        </Container>
      </Reveal>

      {showFaqs && data.faqs.length > 0 ? (
        <Reveal as="section" className="border-t border-border bg-white">
          <Container narrow className="py-16">
            <H2 className="mb-7">{faqHeading}</H2>
            <Faq items={data.faqs} />
          </Container>
        </Reveal>
      ) : null}

      <Reveal as="section" className="bg-navy text-white">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-14">
          <div className="min-w-0 flex-[1_1_420px]">
            <h2 className="mb-2 font-display text-[clamp(28px,4.5vw,34px)] font-bold text-white">{data.final[0]}</h2>
            <p className="m-0 text-lg text-on-navy">{data.final[1]}</p>
          </div>
          <ButtonLink href={data.final[2]} variant="light">{data.final[3]}</ButtonLink>
        </Container>
      </Reveal>
    </>
  );
}
