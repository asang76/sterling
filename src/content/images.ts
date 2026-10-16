/**
 * Image registry. Every photo on the site is declared here with its licence details.
 * Leave `src` as null until you have added a real, licensed file under /public/images.
 * See docs/IMAGES.md for the licence checklist (Freepik, Unsplash, Pexels and others).
 */
export type SiteImage = {
  /** Path under /public, for example "/images/driver-hgv.jpg". null = show a labelled placeholder. */
  src: string | null;
  alt: string;
  width: number;
  height: number;
  /** Where it came from and under which licence. Required before launch. */
  source?: { provider: string; url: string; licence: string; attributionRequired: boolean; credit?: string };
};

// Owner-supplied files. Licence/source details still to be recorded (see docs/IMAGES.md).
// Images repeat across slots until more are added; width/height set the display crop (object-cover).
export const images = {
  heroDriver: { src: "/images/driver-hgv.jpg", alt: "A truck driver beside an HGV", width: 1200, height: 900 },
  heroCare: { src: "/images/care-worker.jpg", alt: "A healthcare worker", width: 1200, height: 900 },
  heroTeam: { src: "/images/hiring-staff.jpg", alt: "Staff being hired", width: 1200, height: 900 },
  driverHire: { src: "/images/driver-hgv-2.jpg", alt: "A truck driver", width: 1200, height: 800 },
  careWorkers: { src: "/images/care-worker.jpg", alt: "A healthcare worker", width: 1200, height: 800 },
  supportWorkers: { src: "/images/workers-illustration.jpg", alt: "Illustration of a group of workers", width: 1200, height: 800 },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
