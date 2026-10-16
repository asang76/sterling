import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export type ServiceCard = { href: string; title: string; text: string; linkText: string; icon?: ReactNode };

export function ServiceCards({ cards }: { cards: ServiceCard[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-6 p-0">
      {cards.map((c, i) => (
        <Reveal as="li" key={c.href} delay={i * 120} className="min-w-[280px] flex-[1_1_300px]">
          <Link href={c.href} className="flex h-full flex-col gap-3.5 rounded-lg border-2 border-border bg-white p-7 no-underline transition-[border-color] hover:border-accent">
            {c.icon ? <span className="flex size-12 items-center justify-center rounded-lg bg-tint">{c.icon}</span> : null}
            <span className="font-display text-[26px] font-bold text-navy">{c.title}</span>
            <span className="text-base leading-normal text-slate">{c.text}</span>
            <span className="mt-auto inline-flex items-center gap-2 text-base font-semibold text-accent">
              {c.linkText}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
