import type { ReactNode } from "react";

export function Container({ children, className = "", narrow = false }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return <div className={`mx-auto box-border w-full px-6 ${narrow ? "max-w-[860px]" : "max-w-[1200px]"} ${className}`}>{children}</div>;
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-display text-[clamp(28px,4.5vw,36px)] font-bold leading-tight text-navy ${className}`}>{children}</h2>;
}
