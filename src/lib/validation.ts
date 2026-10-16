import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);
const required = (max: number, message: string) => z.string().trim().min(1, message).max(max);

export const enquirySchema = z.object({
  name: required(120, "Enter your name."),
  company: text(160).optional().default(""),
  email: z.string().trim().min(1, "Enter your work email.").email("Enter a valid email address, like name@company.co.uk.").max(200),
  phone: text(40).optional().default(""),
  organisationType: text(80).optional().default(""),
  need: z.enum(["driver-hire", "care-workers", "support-workers", "senior-team-leaders", "not-sure"], {
    error: "Choose what you need.",
  }),
  quantity: text(20).optional().default(""),
  requirement: text(60).optional().default(""),
  postcode: required(12, "Enter the location or postcode where the work is based."),
  startDate: text(20).optional().default(""),
  details: text(2000).optional().default(""),
  /** Honeypot: real people leave this empty. */
  website: text(200).optional().default(""),
});

export const registrationSchema = z.object({
  name: required(120, "Enter your full name."),
  phone: required(40, "Enter a telephone number."),
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email address.").max(200),
  role: required(80, "Choose a preferred job role."),
  location: text(80).optional().default(""),
  experience: text(2000).optional().default(""),
  licence: text(60).optional().default(""),
  availability: text(1000).optional().default(""),
  privacy: z.literal("on", { error: "Confirm that you have read the privacy notice." }),
  website: text(200).optional().default(""),
});

export type FieldErrors = Record<string, string>;

export type FieldValues = Record<string, string>;

/** `values` carries what the visitor typed so the form can be refilled after an error (React resets uncontrolled forms). */
export type FormState =
  | { status: "idle" }
  | { status: "error"; errors: FieldErrors; values: FieldValues }
  | { status: "failed"; message: string; values: FieldValues }
  | { status: "sent" };

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
