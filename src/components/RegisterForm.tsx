"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitRegistration } from "@/app/actions/submit";
import type { FormState } from "@/lib/validation";
import { Field, FormMessage, describedBy, inputClass, textareaClass } from "./FormField";

const idle: FormState = { status: "idle" };

export function RegisterForm() {
  const [state, action, pending] = useActionState(submitRegistration, idle);

  if (state.status === "sent") {
    return (
      <FormMessage tone="success" title="Thank you. You’re registered.">
        The team will look at your details and contact you if a role fits. [CONFIRM process and timing]
      </FormMessage>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const v = (k: string) => (state.status === "error" || state.status === "failed" ? (state.values[k] ?? "") : "");
  const summary = Object.entries(errors);

  return (
    <form action={action} noValidate className="flex flex-col gap-4">
      {summary.length > 0 ? (
        <FormMessage tone="error" title="There’s a problem with the form">
          <ul className="list-disc pl-5">
            {summary.map(([key, message]) => (
              <li key={key}><a className="text-[#7a1710] underline" href={`#r-${key}`}>{message}</a></li>
            ))}
          </ul>
        </FormMessage>
      ) : null}
      {state.status === "failed" ? <FormMessage tone="error" title="We couldn’t register your details">{state.message}</FormMessage> : null}

      <Field id="r-name" label="Full name *" error={errors.name}>
        <input id="r-name" name="name" defaultValue={v("name")} type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={describedBy("r-name", errors.name)} className={inputClass(errors.name)} />
      </Field>
      <Field id="r-phone" label="Telephone *" error={errors.phone}>
        <input id="r-phone" name="phone" defaultValue={v("phone")} type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={!!errors.phone} aria-describedby={describedBy("r-phone", errors.phone)} className={inputClass(errors.phone)} />
      </Field>
      <Field id="r-email" label="Email *" error={errors.email}>
        <input id="r-email" name="email" defaultValue={v("email")} type="email" inputMode="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={describedBy("r-email", errors.email)} className={inputClass(errors.email)} />
      </Field>
      <Field id="r-role" label="Preferred job role *" error={errors.role} hint="[CONFIRM roles offered]">
        <select id="r-role" name="role" defaultValue={v("role")} required aria-invalid={!!errors.role} aria-describedby={describedBy("r-role", errors.role, "hint")} className={inputClass(errors.role)}>
          <option value="">Choose one</option>
          <option>Driver</option>
          <option>Care worker</option>
          <option>Healthcare assistant</option>
          <option>Support worker</option>
          <option>Senior support worker</option>
          <option>Team leader</option>
        </select>
      </Field>
      <Field id="r-location" label="Preferred location or postcode">
        <input id="r-location" name="location" defaultValue={v("location")} type="text" autoComplete="postal-code" className={inputClass()} />
      </Field>
      <Field id="r-experience" label="Relevant experience and qualifications">
        <textarea id="r-experience" name="experience" defaultValue={v("experience")} rows={3} className={textareaClass()} />
      </Field>
      <Field id="r-licence" label="Driving licence category (driving work only)" hint="[CONFIRM categories]">
        <select id="r-licence" name="licence" defaultValue={v("licence")} aria-describedby="r-licence-hint" className={inputClass()}>
          <option value="">Choose one</option>
          <option>HGV Class 1 (C+E)</option>
          <option>HGV Class 2 (C)</option>
          <option>7.5-tonne</option>
          <option>Van</option>
          <option>Not applying for driving work</option>
        </select>
      </Field>
      <Field id="r-availability" label="Availability and preferred shifts">
        <textarea id="r-availability" name="availability" defaultValue={v("availability")} rows={2} className={textareaClass()} />
      </Field>

      <p className="text-sm leading-snug">
        CV upload is not included yet. It needs secure file storage first. [CONFIRM whether CVs are wanted]
      </p>

      <div>
        <label className="flex min-h-11 items-start gap-3 text-[15px] leading-snug text-navy">
          <input id="r-privacy" type="checkbox" name="privacy" defaultChecked={v("privacy") === "on"} aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? "r-privacy-error" : undefined} className="mt-0.5 size-[22px] flex-none" />
          <span>I have read the <Link href="/privacy-policy">privacy notice</Link>. *</span>
        </label>
        {errors.privacy ? <span id="r-privacy-error" className="text-[15px] text-danger">{errors.privacy}</span> : null}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this field empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <button type="submit" disabled={pending} className="h-13 rounded-md bg-accent px-6 text-[17px] font-semibold text-white hover:brightness-110 disabled:opacity-70">
        {pending ? "Sending…" : "Register"}
      </button>
      <p className="text-sm leading-snug">
        Please don’t send passport details, National Insurance numbers, bank details or health information here. We’ll ask for what’s needed later, through a secure process. [CONFIRM]
      </p>
    </form>
  );
}
