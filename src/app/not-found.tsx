import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="mb-4 font-display text-5xl font-bold text-navy">Page not found</h1>
      <p className="mb-7 max-w-[560px] text-xl">We can’t find that page. It may have moved, or the link may be wrong.</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <ButtonLink href="/contact" variant="navy">Contact the team</ButtonLink>
      </div>
    </Container>
  );
}
