import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary: "bg-accent text-white hover:brightness-110 hover:text-white",
  light: "bg-white text-navy hover:brightness-95 hover:text-navy",
  outline: "border-2 border-[#6f8cae] text-white hover:bg-white/10 hover:text-white",
  navy: "bg-navy text-white hover:brightness-125 hover:text-white",
} as const;

export function ButtonLink({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: keyof typeof styles; className?: string }) {
  return (
    <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-[17px] font-semibold no-underline transition-[filter] ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
