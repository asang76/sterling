import "server-only";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

/**
 * The single boundary between the website and wherever enquiries are stored or sent.
 * Set ENQUIRY_WEBHOOK_URL (for example a CRM, Zapier/Make or an API route that sends email).
 * When it is missing, we fail visibly so no enquiry is ever silently discarded.
 * Do not log the payload: it contains personal data.
 */
export async function deliver(kind: "employer-enquiry" | "candidate-registration", payload: Record<string, unknown>): Promise<DeliveryResult> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return { ok: false, reason: "not-configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...(process.env.ENQUIRY_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), ...payload }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
