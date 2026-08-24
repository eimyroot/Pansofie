import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    console.error(`R18 FAIL: ${message}`);
    process.exit(1);
  }
};

const onboarding = read("src/pages/Onboarding.jsx");
const legacy = read("src/components/pansofie/LegacyOnboardingR14.jsx");
const auth = read("src/lib/AuthContext.jsx");
const flow = read("src/lib/pansofieOnboardingFlow.js");
const register = read("src/pages/Register.jsx");
const migration = read("supabase/migrations/20260824032000_adult_onboarding_r18.sql");
const css = read("src/adult-onboarding-r18.css");

for (const marker of [
  "Základní údaje",
  "Pansofická role",
  "Nultá mise",
  "education",
  "wise_business",
  "circular_ecology",
  "Labyrint algoritmů",
  "Etický kompas",
  "Materiálový most",
]) {
  assert(onboarding.includes(marker), `missing onboarding marker: ${marker}`);
}

assert(onboarding.includes('readOnly aria-readonly="true"'), "invited-account email must be read-only");
assert(!onboarding.includes('type="password"'), "R18 must not re-collect account passwords");
assert(onboarding.includes("profile?.adultOnboardingSupported"), "R18 schema-aware fallback gate missing");
assert(onboarding.includes("LegacyOnboardingR14"), "R14 fallback must remain available");
assert(legacy.includes("completeOnboarding"), "legacy onboarding fallback was not preserved");
assert(register.includes("Registrace je nyní pouze na pozvání"), "open public registration must remain disabled");
assert(!register.includes("signUp("), "R18 must not silently reopen self-service registration");

assert(flow.includes('supabase.rpc("pansofie_complete_adult_onboarding"'), "R18 completion must use governed server RPC");
assert(!flow.match(/completeAdultOnboarding[\s\S]{0,1500}userId/), "R18 completion must not accept a caller-supplied user id");
assert(auth.includes("adultOnboardingSupported"), "R18 capability must be explicit in auth profile state");
assert(auth.includes("r14ProfileQuery"), "R18 schema failure must fall back to R14 schema rather than disabling onboarding");

for (const sql of [
  "auth.uid()",
  "security definer",
  "terms_accepted_at",
  "dialogue_code_accepted_at",
  "terms_accepted_version",
  "dialogue_code_accepted_version",
  "onboarding_track",
  "coalesce(p.terms_accepted_at, now())",
  "coalesce(p.dialogue_code_accepted_at, now())",
  "when p.network_role is null or p.network_role = '' then v_inferred_role",
  "grant execute on function public.pansofie_complete_adult_onboarding",
]) {
  assert(migration.toLowerCase().includes(sql.toLowerCase()), `missing governed SQL marker: ${sql}`);
}

assert(!migration.match(/p_user_id\s+uuid/i), "RPC must never accept target user id");
assert(css.includes(".r18-track[data-track=\"education\"]"), "education visual state missing");
assert(css.includes(".r18-track[data-track=\"wise_business\"]"), "business visual state missing");
assert(css.includes(".r18-track[data-track=\"circular_ecology\"]"), "circular visual state missing");
assert(css.includes("prefers-reduced-motion"), "reduced-motion handling missing");

console.log("ADULT_ONBOARDING_R18=PASS");
