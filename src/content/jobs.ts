/**
 * TEMPORARY: the entries below are SAMPLE roles (sample: true) added at the owner's request to preview the layout.
 * They show a "Sample role" badge. Before launch, delete them and list real, current vacancies only
 * (an empty array shows the honest empty state). `npm run check:launch` should flag any left behind.
 * Later this can be replaced by a CMS or ATS feed, keeping the same Job shape.
 */
export type Job = {
  slug: string;
  title: string;
  sector: "Driving" | "Care" | "Support work";
  location: string;
  contract: "Temporary" | "Permanent";
  licence?: string;
  pay?: string;
  summary: string;
  postedOn: string; // ISO date
  /** Dummy preview role. Remove before launch. */
  sample?: boolean;
};

export const jobs: Job[] = [
  { slug: "sample-hgv-class-1-driver", title: "HGV Class 1 Driver", sector: "Driving", location: "Birmingham", contract: "Temporary", licence: "HGV Class 1 (C+E)", summary: "Sample role to preview the layout. Details to be replaced with a real vacancy.", postedOn: "2026-10-01", sample: true },
  { slug: "sample-van-driver", title: "Van Driver", sector: "Driving", location: "Wolverhampton", contract: "Permanent", licence: "Category B", summary: "Sample role to preview the layout. Details to be replaced with a real vacancy.", postedOn: "2026-10-02", sample: true },
  { slug: "sample-care-assistant", title: "Care Assistant", sector: "Care", location: "Coventry", contract: "Permanent", summary: "Sample role to preview the layout. Details to be replaced with a real vacancy.", postedOn: "2026-10-03", sample: true },
  { slug: "sample-healthcare-assistant", title: "Healthcare Assistant", sector: "Care", location: "Solihull", contract: "Temporary", summary: "Sample role to preview the layout. Details to be replaced with a real vacancy.", postedOn: "2026-10-04", sample: true },
  { slug: "sample-support-worker", title: "Support Worker", sector: "Support work", location: "Dudley", contract: "Permanent", summary: "Sample role to preview the layout. Details to be replaced with a real vacancy.", postedOn: "2026-10-05", sample: true },
  { slug: "sample-senior-support-worker", title: "Senior Support Worker", sector: "Support work", location: "Walsall", contract: "Temporary", summary: "Sample role to preview the layout. Details to be replaced with a real vacancy.", postedOn: "2026-10-06", sample: true },
];
