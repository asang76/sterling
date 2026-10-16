/**
 * Minimal in-memory rate limiter. It resets on restart and is per server instance,
 * so on serverless or multi-instance hosting replace it with a shared store
 * (for example Upstash Redis or your host's firewall rules). See docs/ARCHITECTURE.md.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
