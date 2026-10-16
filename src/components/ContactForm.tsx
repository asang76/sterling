"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitEnquiry } from "@/app/actions/submit";
import type { FormState } from "@/lib/validation";
import { Field, FormMessage, describedBy, inputClass, textareaClass } from "./FormField";

const idle: FormState = { status: "idle" };

const needs = [
  ["driver-hire", "Driver hire (temporary or permanent)"],
  ["care-workers", "Care workers"],
  ["support-workers", "Support workers"],
  ["senior-team-leaders", "Senior support workers or team leaders"],
  ["not-sure", "Not sure yet"],
] as const;

export function ContactForm() {
  const [state, action, pending] = useActionState(submitEnquiry, idle);

  if (state.status === "sent") {
    return (
      <FormMessage tone="success" title="Thank you. Your enquiry has been sent.">
        A member of the team will review it. [CONFIRM what happens next and when they will reply]
      </FormMessage>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const v = (k: string) => (state.status === "error" || state.status === "failed" ? (state.values[k] ?? "") : "");
  const summary = Object.entries(errors);

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <p className="text-base">Fields marked * are needed so we can respond.</p>

      {summary.length > 0 ? (
        <FormMessage tone="error" title="There’s a problem with the form">
          <ul className="list-disc pl-5">
            {summary.map(([key, message]) => (
              <li key={key}>
                <a className="text-[#7a1710] underline" href={`#f-${key}`}>{message}</a>
              </li>
            ))}
          </ul>
        </FormMessage>
      ) : null}

      {state.status === "failed" ? (
        <FormMessage tone="error" title="We couldn’t send your enquiry">
          {state.message}
        </FormMessage>
      ) : null}

      <div className="flex flex-wrap gap-5">
        <div className="min-w-[220px] flex-1">
          <Field id="f-name" label="Your name *" error={errors.name}>
            <input id="f-name" name="name" defaultValue={v("name")} type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={describedBy("f-name", errors.name)} className={inputClass(errors.name)} />
          </Field>
        </div>
        <div className="min-w-[220px] flex-1">
          <Field id="f-company" label="Organisation">
            <input id="f-company" name="company" defaultValue={v("company")} type="text" autoComplete="organization" className={inputClass()} />
          </Field>
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="min-w-[220px] flex-1">
          <Field id="f-email" label="Work email *" error={errors.email}>
            <input id="f-email" name="email" defaultValue={v("email")} type="email" inputMode="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={describedBy("f-email", errors.email)} className={inputClass(errors.email)} />
          </Field>
        </div>
        <div className="min-w-[220px] flex-1">
          <Field id="f-phone" label="Phone (optional)">
            <input id="f-phone" name="phone" defaultValue={v("phone")} type="tel" inputMode="tel" autoComplete="tel" className={inputClass()} />
          </Field>
        </div>
      </div>

      <Field id="f-organisationType" label="Organisation type">
        <select id="f-organisationType" name="organisationType" defaultValue={v("organisationType")} className={inputClass()}>
          <option value="">Choose one</option>
          <option>Care home or care provider</option>
          <option>Supported living provider</option>
          <option>Logistics or delivery company</option>
          <option>Other employer</option>
        </select>
      </Field>

      <fieldset id="f-need" className="m-0 flex min-w-0 flex-col gap-2.5 border-0 p-0" aria-describedby={errors.need ? "f-need-error" : undefined}>
        <legend className="mb-2.5 p-0 text-[15px] font-semibold text-navy">What do you need? *</legend>
        {needs.map(([value, label]) => (
          <label key={value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-border-strong px-3.5 text-[17px] text-navy">
            <input type="radio" name="need" value={value} defaultChecked={v("need") === value} className="size-5" />
            {label}
          </label>
        ))}
        {errors.need ? <span id="f-need-error" className="text-[15px] text-danger">{errors.need}</span> : null}
      </fieldset>

      <div className="flex flex-wrap gap-5">
        <div className="min-w-[140px] flex-1">
          <Field id="f-quantity" label="Number of staff">
            <select id="f-quantity" name="quantity" defaultValue={v("quantity")} className={inputClass()}>
              <option value="">Choose one</option>
              <option>1–5</option>
              <option>6–10</option>
              <option>10+</option>
            </select>
          </Field>
        </div>
        <div className="min-w-[200px] flex-1">
          <Field id="f-requirement" label="Requirement">
            <select id="f-requirement" name="requirement" defaultValue={v("requirement")} className={inputClass()}>
              <option value="">Choose one</option>
              <option>Temporary shifts</option>
              <option>Permanent recruitment</option>
              <option>Ongoing staff cover</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="min-w-[200px] flex-1">
          <Field id="f-postcode" label="Location or postcode *" error={errors.postcode}>
            <input id="f-postcode" name="postcode" defaultValue={v("postcode")} type="text" autoComplete="postal-code" required aria-invalid={!!errors.postcode} aria-describedby={describedBy("f-postcode", errors.postcode)} className={inputClass(errors.postcode)} />
          </Field>
        </div>
        <div className="min-w-[200px] flex-1">
          <Field id="f-startDate" label="Start date">
            <input id="f-startDate" name="startDate" defaultValue={v("startDate")} type="date" className={inputClass()} />
          </Field>
        </div>
      </div>

      <Field id="f-details" label="Anything else we should know?" hint="Include the role, licence category (drivers), shifts, and any checks or training you need.">
        <textarea id="f-details" name="details" defaultValue={v("details")} rows={4} aria-describedby="f-details-hint" className={textareaClass()} />
      </Field>

      {/* Honeypot. Hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this field empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <button type="submit" disabled={pending} className="h-13 rounded-md bg-accent px-6 text-[17px] font-semibold text-white hover:brightness-110 disabled:opacity-70">
        {pending ? "Sending…" : "Send enquiry"}
      </button>
      <p className="text-sm leading-snug">
        We’ll use your details to respond to this enquiry. See the <Link href="/privacy-policy">privacy policy</Link>. [CONFIRM wording with owner]
      </p>
    </form>
  );
}
