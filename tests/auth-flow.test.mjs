import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { authCallbackUrl, normalizeCredentials, safeReturnPath } from "../src/domain/auth-flow.js";

test("auth flow normalizes valid credentials and rejects malformed input", () => {
  assert.deepEqual(normalizeCredentials({ email: " USER@Example.COM ", password: "12345678" }), {
    ok: true, email: "user@example.com", password: "12345678",
  });
  assert.equal(normalizeCredentials({ email: "bad", password: "12345678" }).ok, false);
  assert.equal(normalizeCredentials({ email: "user@example.com", password: "short" }).ok, false);
});

test("auth return paths stay local and callback preserves a safe destination", () => {
  assert.equal(safeReturnPath("/go/school"), "/go/school");
  assert.equal(safeReturnPath("https://evil.test"), "/app");
  assert.equal(safeReturnPath("//evil.test"), "/app");
  assert.equal(authCallbackUrl("https://pansofie.test/", "/go/school"), "https://pansofie.test/auth/callback?next=%2Fgo%2Fschool");
});

test("signup distinguishes an immediate session from email-confirmation flow", () => {
  const actions = fs.readFileSync("src/app/login/actions.js", "utf8");
  const page = fs.readFileSync("src/app/login/page.jsx", "utf8");
  assert.match(actions, /if \(data\?\.session\) redirect\("\/onboarding"\)/);
  assert.match(actions, /Zkontrolujte e-mail/);
  assert.match(page, /params\?\.message/);
});
