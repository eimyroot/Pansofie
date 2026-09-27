const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeCredentials({ email, password }) {
  const normalizedEmail = String(email ?? "").trim().toLowerCase();
  const normalizedPassword = String(password ?? "");
  if (!EMAIL_RE.test(normalizedEmail)) {
    return { ok: false, message: "Zadejte platný e-mail." };
  }
  if (normalizedPassword.length < 8) {
    return { ok: false, message: "Heslo musí mít alespoň 8 znaků." };
  }
  return { ok: true, email: normalizedEmail, password: normalizedPassword };
}

export function safeReturnPath(value, fallback = "/app") {
  const candidate = String(value ?? "");
  return candidate.startsWith("/") && !candidate.startsWith("//") ? candidate : fallback;
}

export function authCallbackUrl(siteUrl, next) {
  const origin = String(siteUrl || "http://localhost:3000").replace(/\/$/, "");
  const url = new URL(`${origin}/auth/callback`);
  const safeNext = safeReturnPath(next, "");
  if (safeNext) url.searchParams.set("next", safeNext);
  return url.toString();
}
