"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ButtonLink } from "./ButtonLink";
import { ImageSlot } from "./ImageSlot";
import type { ImageKey } from "@/content/images";

const QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getReducedMotion() {
  return window.matchMedia(QUERY).matches;
}

export type Slide = { kicker: string; title: string; text: string; c1: string; h1: string; c2: string; h2: string; image: ImageKey };

/**
 * Accessible hero carousel. The first slide is rendered on the server, so the main message
 * is in the initial HTML. Autoplay is off for people who prefer reduced motion, and pauses on hover and focus.
 */
export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  // null = follow the visitor's motion preference; true/false = they pressed Play or Pause.
  const [manual, setManual] = useState<boolean | null>(null);
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true);
  const playing = manual ?? !reduceMotion;
  const paused = useRef(false);
  const count = slides.length;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % count);
    }, 7000);
    return () => clearInterval(id);
  }, [playing, count]);

  const go = (n: number) => setIndex(((n % count) + count) % count);
  const slide = slides[index];

  const ring = "flex size-12 items-center justify-center rounded-full border-2 border-[#6f8cae] bg-transparent p-0 text-white hover:bg-white/10";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="bg-navy text-white"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div className="mx-auto max-w-[1200px] px-6 pb-7 pt-14">
        <div role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${count}`} aria-live={playing ? "off" : "polite"} className="flex min-h-[400px] flex-wrap items-center gap-12">
          <div className="min-w-0 flex-[1_1_460px]">
            <span className="mb-5 inline-block rounded-full bg-[#1d3f68] px-3 py-1 text-[13px] font-semibold tracking-wide text-[#d7e7f8]">{slide.kicker}</span>
            {index === 0 ? (
              <h1 className="mb-[18px] font-display text-[clamp(38px,6vw,56px)] font-bold leading-[1.05] text-white">{slide.title}</h1>
            ) : (
              <p className="mb-[18px] font-display text-[clamp(38px,6vw,56px)] font-bold leading-[1.05] text-white">{slide.title}</p>
            )}
            <p className="mb-7 max-w-[560px] text-xl leading-relaxed text-on-navy">{slide.text}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={slide.h1} variant="light">{slide.c1}</ButtonLink>
              <ButtonLink href={slide.h2} variant="outline">{slide.c2}</ButtonLink>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_340px]">
            <ImageSlot name={slide.image} priority={index === 0} sizes="(min-width: 1024px) 480px, 100vw" />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className={ring}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className={ring}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
          <div role="group" aria-label="Choose a slide" className="ml-2 flex items-center">
            {slides.map((s, n) => (
              <button key={s.title} type="button" onClick={() => go(n)} aria-label={`Slide ${n + 1} of ${count}`} aria-current={n === index ? "true" : undefined} className="flex size-11 items-center justify-center border-0 bg-transparent p-0">
                <span className={`block h-3 rounded-md ${n === index ? "w-7 bg-white" : "w-3 bg-[#6f8cae]"}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setManual(!playing)} aria-label={playing ? "Pause automatic slide rotation" : "Start automatic slide rotation"} className="ml-auto flex h-12 items-center gap-2 rounded-full border-2 border-[#6f8cae] bg-transparent px-[18px] text-[15px] font-semibold text-white hover:bg-white/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={playing ? "M8 5v14M16 5v14" : "M7 4v16l13-8z"} /></svg>
            <span>{playing ? "Pause" : "Play"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
