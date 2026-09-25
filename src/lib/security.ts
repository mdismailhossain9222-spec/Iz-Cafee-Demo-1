const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;
const CONTACT_MAX = 3;
const CONTACT_WINDOW_MS = 60 * 60 * 1000;
const SESSION_MS = 60 * 60 * 1000;

const LOGIN_KEY = "iz.auth.guard";
const CONTACT_KEY = "iz.contact.guard";
const SESSION_KEY = "iz.session";

const DEMO_EMAIL = "atelier@iz.cafe";
const DEMO_PASSWORD_SHA256 =
  "90d9610fd589b39f4b7a531a3690a01c17d67df0d963bb0c132cecf6959fe751";

type LoginGuard = {
  attempts: number;
  windowStart: number;
  lockedUntil: number;
};

type ContactGuard = {
  count: number;
  windowStart: number;
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function sanitize(input: string, max = 500) {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
    .slice(0, max);
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length < 120;
}

export async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export function getLoginStatus() {
  const now = Date.now();
  const guard = readJson<LoginGuard>(LOGIN_KEY, {
    attempts: 0,
    windowStart: now,
    lockedUntil: 0,
  });

  if (guard.lockedUntil > now) {
    return {
      locked: true,
      remainingMs: guard.lockedUntil - now,
      remainingAttempts: 0,
    };
  }

  if (now - guard.windowStart > WINDOW_MS) {
    const reset = { attempts: 0, windowStart: now, lockedUntil: 0 };
    writeJson(LOGIN_KEY, reset);
    return { locked: false, remainingMs: 0, remainingAttempts: MAX_ATTEMPTS };
  }

  return {
    locked: false,
    remainingMs: 0,
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - guard.attempts),
  };
}

export async function attemptLogin(email: string, password: string) {
  const status = getLoginStatus();
  if (status.locked) {
    return { ok: false as const, error: "Too many attempts. Please wait before trying again.", status };
  }

  const cleanEmail = sanitize(email, 120).toLowerCase();
  const cleanPassword = password.slice(0, 128);

  await new Promise((r) => setTimeout(r, 280 + Math.random() * 220));

  const hash = await sha256Hex(cleanPassword);
  const emailOk = timingSafeEqual(cleanEmail, DEMO_EMAIL);
  const passOk = timingSafeEqual(hash, DEMO_PASSWORD_SHA256);

  const now = Date.now();
  const guard = readJson<LoginGuard>(LOGIN_KEY, {
    attempts: 0,
    windowStart: now,
    lockedUntil: 0,
  });

  if (emailOk && passOk) {
    writeJson(LOGIN_KEY, { attempts: 0, windowStart: now, lockedUntil: 0 });
    const token = await sha256Hex(`${cleanEmail}:${now}:${crypto.getRandomValues(new Uint32Array(1))[0]}`);
    writeJson(SESSION_KEY, { token, exp: now + SESSION_MS });
    return { ok: true as const, error: "", status: getLoginStatus() };
  }

  const attempts = guard.attempts + 1;
  const lockedUntil = attempts >= MAX_ATTEMPTS ? now + LOCKOUT_MS : 0;
  writeJson(LOGIN_KEY, {
    attempts,
    windowStart: guard.windowStart || now,
    lockedUntil,
  });

  const next = getLoginStatus();
  return {
    ok: false as const,
    error: next.locked
      ? "Account temporarily locked after 5 failed attempts."
      : `Invalid credentials. ${next.remainingAttempts} attempt${next.remainingAttempts === 1 ? "" : "s"} remaining.`,
    status: next,
  };
}

export function isAuthenticated() {
  const session = readJson<{ token: string; exp: number } | null>(SESSION_KEY, null);
  if (!session?.token || session.exp < Date.now()) {
    sessionStorage.removeItem(SESSION_KEY);
    return false;
  }
  return true;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function canSubmitContact() {
  const now = Date.now();
  const guard = readJson<ContactGuard>(CONTACT_KEY, { count: 0, windowStart: now });
  if (now - guard.windowStart > CONTACT_WINDOW_MS) {
    writeJson(CONTACT_KEY, { count: 0, windowStart: now });
    return { ok: true, remaining: CONTACT_MAX };
  }
  if (guard.count >= CONTACT_MAX) {
    return { ok: false, remaining: 0 };
  }
  return { ok: true, remaining: CONTACT_MAX - guard.count };
}

export function recordContactSubmit() {
  const now = Date.now();
  const guard = readJson<ContactGuard>(CONTACT_KEY, { count: 0, windowStart: now });
  if (now - guard.windowStart > CONTACT_WINDOW_MS) {
    writeJson(CONTACT_KEY, { count: 1, windowStart: now });
    return;
  }
  writeJson(CONTACT_KEY, { count: guard.count + 1, windowStart: guard.windowStart });
}

export function formatMs(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}
