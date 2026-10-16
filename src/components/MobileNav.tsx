"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/config/routes";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex size-[46px] items-center justify-center rounded-md border border-border-strong bg-white text-navy"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={open ? "M18 6 6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="absolute left-0 right-0 top-full z-30 border-t border-border bg-white shadow-md">
          <ul className="m-0 mx-auto flex max-w-[1200px] list-none flex-col px-6 pb-4 pt-2">
            <li>
              <Link href="/" onClick={() => setOpen(false)} className="block border-b border-border py-3.5 text-lg font-medium text-navy no-underline">Home</Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block border-b border-border py-3.5 text-lg font-medium text-navy no-underline">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
