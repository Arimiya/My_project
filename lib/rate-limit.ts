type AttemptState = {
  count: number;
  lockedUntil?: number;
  resetAt: number;
};

const attempts = new Map<string, AttemptState>();

export function getClientKey(req: Request, suffix: string) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || req.headers.get("x-real-ip") || "local";
  return `${suffix}:${ip}`;
}

export function checkRateLimit(key: string, options = { limit: 5, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000 }) {
  const now = Date.now();
  const current = attempts.get(key);

  if (current?.lockedUntil && current.lockedUntil > now) {
    return { allowed: false, retryAfterSeconds: Math.ceil((current.lockedUntil - now) / 1000) };
  }

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 0, resetAt: now + options.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailedAttempt(key: string, options = { limit: 5, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000 }) {
  const now = Date.now();
  const current = attempts.get(key) ?? { count: 0, resetAt: now + options.windowMs };
  const count = current.count + 1;
  attempts.set(key, {
    count,
    resetAt: current.resetAt,
    lockedUntil: count >= options.limit ? now + options.lockMs : undefined
  });
}

export function clearAttempts(key: string) {
  attempts.delete(key);
}
