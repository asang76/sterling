"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-24">
      <h1 className="mb-4 font-display text-5xl font-bold text-navy">Something went wrong</h1>
      <p className="mb-7 max-w-[560px] text-xl">Sorry, this page couldn’t load. Please try again.</p>
      <button type="button" onClick={reset} className="rounded-md bg-accent px-6 py-3 text-[17px] font-semibold text-white">Try again</button>
    </div>
  );
}
