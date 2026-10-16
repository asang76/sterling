export type Section =
  | { kind: "p"; heading: string; body: string }
  | { kind: "bullets"; heading: string; body: string[] }
  | { kind: "steps"; heading: string; body: string[] }
  | { kind: "confirm"; heading: null; body: string };

export type ContentPageData = {
  title: string;
  h1: string;
  lead: string;
  cta: string;
  chref: string;
  secs: Section[];
  aside: { label: string; value: string }[];
  asideTitle: string;
  asideCta: string;
  asideHref: string;
  faqs: { q: string; a: string }[];
  final: [string, string, string, string];
};
