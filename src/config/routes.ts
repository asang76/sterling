export type RouteEntry = {
  path: string;
  /** Used in the sitemap. Only list pages that are useful and indexable. */
  indexable: boolean;
  label: string;
};

export const routes: RouteEntry[] = [
  { path: "/", indexable: true, label: "Home" },
  { path: "/services", indexable: true, label: "Services" },
  { path: "/services/driver-hire", indexable: true, label: "Driver hire" },
  { path: "/services/care-workers", indexable: true, label: "Care workers" },
  { path: "/services/support-workers", indexable: true, label: "Support workers" },
  { path: "/employers", indexable: true, label: "Employer services" },
  { path: "/candidates", indexable: true, label: "Candidate services" },
  { path: "/jobs", indexable: true, label: "Jobs" },
  { path: "/about", indexable: true, label: "About" },
  { path: "/contact", indexable: true, label: "Contact" },
  { path: "/faqs", indexable: true, label: "FAQs" },
  { path: "/complaints", indexable: true, label: "Complaints and safeguarding" },
  { path: "/privacy-policy", indexable: true, label: "Privacy policy" },
  { path: "/terms", indexable: true, label: "Terms" },
];

export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/employers", label: "Employers" },
  { href: "/candidates", label: "Candidates" },
  { href: "/jobs", label: "Jobs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerServices = [
  { href: "/services/driver-hire", label: "Driver hire" },
  { href: "/services/care-workers", label: "Care workers" },
  { href: "/services/support-workers", label: "Support workers" },
  { href: "/employers", label: "Employer services" },
  { href: "/candidates", label: "Candidate services" },
  { href: "/jobs", label: "Jobs" },
] as const;

export const footerCompany = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faqs", label: "FAQs" },
  { href: "/complaints", label: "Complaints and safeguarding" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms" },
] as const;
