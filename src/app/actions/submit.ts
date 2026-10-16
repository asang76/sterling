"use server";

import { headers } from "next/headers";
import { deliver } from "@/lib/enquiries";
import { rateLimit } from "@/lib/rate-limit";
import { enquirySchema, registrationSchema, toFieldErrors, type FieldValues, type FormState } from "@/lib/validation";

const FAILED = "We couldn’t send your details. Your answers are still in the form. Please try again, or contact us directly.";

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

function valuesOf(formData: FormData): FieldValues {
  const out: FieldValues = {};
  for (const [k, v] of formData.entries()) {
    if (typeof v === "string" && !k.startsWith("$ACTION") && k !== "website") out[k] = v;
  }
  return out;
}

function toObject(formData: FormData): Record<string, FormDataEntryValue> {
  return Object.fromEntries(formData);
}

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = valuesOf(formData);
  const parsed = enquirySchema.safeParse(toObject(formData));
  if (!parsed.success) return { status: "error", errors: toFieldErrors(parsed.error), values };
  // Honeypot filled: pretend success so bots learn nothing, but send nothing.
  if (parsed.data.website) return { status: "sent" };
  if (!rateLimit(`enquiry:${await clientKey()}`)) return { status: "failed", message: "Too many attempts. Please wait a few minutes and try again.", values };

  const { website: _website, ...data } = parsed.data;
  void _website;
  const result = await deliver("employer-enquiry", data);
  return result.ok ? { status: "sent" } : { status: "failed", message: FAILED, values };
}

export async function submitRegistration(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = valuesOf(formData);
  const parsed = registrationSchema.safeParse(toObject(formData));
  if (!parsed.success) return { status: "error", errors: toFieldErrors(parsed.error), values };
  if (parsed.data.website) return { status: "sent" };
  if (!rateLimit(`register:${await clientKey()}`)) return { status: "failed", message: "Too many attempts. Please wait a few minutes and try again.", values };

  const { website: _website, privacy: _privacy, ...data } = parsed.data;
  void _website;
  void _privacy;
  const result = await deliver("candidate-registration", { ...data, privacyConfirmed: true });
  return result.ok ? { status: "sent" } : { status: "failed", message: FAILED, values };
}
