/**
 * Renders a JSON-LD block. Replaces "<" so user-controlled strings cannot close the script tag.
 * Only pass data that matches visible, confirmed page content.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
