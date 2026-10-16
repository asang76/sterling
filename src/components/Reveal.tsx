"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  className?: string;
  /** Stagger delay in ms, for siblings that enter together. */
  delay?: number;
};

/**
 * Fade-and-rise on scroll. Progressive enhancement:
 * - Server HTML and first paint are fully visible, so there is no flash, no layout shift and no hidden content without JS.
 * - Only elements that start below the fold are hidden after hydration, then revealed once, when they scroll into view.
 * - Users who prefer reduced motion never see the effect (also enforced in globals.css).
 */
export function Reveal({ children, as: Tag = "div", id, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"visible" | "hidden" | "shown">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already on screen: leave it alone

    // Hide on the next frame so the transition starts from a painted "hidden" state.
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: state === "shown" ? `${delay}ms` : "0ms" } : undefined;
  const motion =
    state === "hidden"
      ? "translate-y-6 opacity-0"
      : state === "shown"
        ? "translate-y-0 opacity-100 transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none"
        : "";

  return (
    <Tag ref={ref} id={id} style={style} className={`${className} ${motion}`.trim()}>
      {children}
    </Tag>
  );
}
