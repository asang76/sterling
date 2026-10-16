import type { ReactNode } from "react";

const control =
  "h-12 w-full rounded-md border bg-white px-3 text-base text-navy focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-focus";

export function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[15px] font-semibold text-navy">
        {label}
      </label>
      {children}
      {hint ? <span id={`${id}-hint`} className="text-sm">{hint}</span> : null}
      {error ? (
        <span id={`${id}-error`} className="flex items-start gap-1.5 text-[15px] leading-snug text-danger">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-px flex-none">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span>{error}</span>
        </span>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

export function inputClass(error?: string) {
  return `${control} ${error ? "border-2 border-danger" : "border-border-strong"}`;
}

export function textareaClass(error?: string) {
  return `w-full rounded-md border bg-white p-3 text-base text-navy focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-focus ${error ? "border-2 border-danger" : "border-border-strong"}`;
}

export function FormMessage({ tone, title, children }: { tone: "error" | "success"; title: string; children: ReactNode }) {
  const isError = tone === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      className={`rounded-lg border-2 p-4 text-base leading-relaxed ${isError ? "border-danger bg-[#fdf1f0] text-[#7a1710]" : "border-accent bg-tint text-navy"}`}
    >
      <div className="mb-1 text-[17px] font-semibold">{title}</div>
      {children}
    </div>
  );
}
