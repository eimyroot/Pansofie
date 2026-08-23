import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    console.error(`R16 FAIL: ${message}`);
    process.exit(1);
  }
};

const migration = read("supabase/migrations/20260824014500_witness_verification_r16.sql");
const edge = read("supabase/functions/evidence-witness/index.ts");
const supabaseConfig = read("supabase/config.toml");
const page = read("src/pages/WitnessVerification.jsx");
const app = read("src/App.jsx");

assert(migration.includes("experience_witness_requests"), "witness request table missing");
assert(migration.includes("experience_witness_events"), "append-only witness event table missing");
assert(migration.includes("token_hash text not null unique"), "hashed token contract missing");
assert(migration.includes("'^[0-9a-f]{64}$'"), "SHA-256 token hash constraint missing");
assert(!migration.includes("raw_token"), "raw token field must not exist in database schema");
assert(!migration.includes("isVerified"), "R16 must not add a duplicate isVerified boolean");
assert(!migration.includes("experienceLevel"), "R16 must not add a stored experience level");
assert(migration.includes("grant execute on function public.pansofie_preview_witness_request(text) to service_role"), "preview RPC must be service-role only");
assert(migration.includes("grant execute on function public.pansofie_consume_witness_request(text, text, text) to service_role"), "decision RPC must be service-role only");
assert(migration.includes("does not alter R15 Fan depth directly") || migration.includes("does not mutate Passport verification or Experience Fan depth"), "truth boundary for Fan/Passport missing");

assert(edge.includes('request.method !== "POST"'), "Edge Function must reject non-POST mutation calls");
assert(edge.includes('action === "preview"'), "non-mutating preview action missing");
assert(edge.includes('action === "confirm" || action === "needs_revision"'), "explicit witness decisions missing");
assert(edge.includes("sha256Hex(token)"), "raw token must be hashed before DB lookup");
assert(!/target_token_hash\s*:\s*token(?:\s*[,}])/m.test(edge), "raw token must never be passed as token_hash");
assert(/target_token_hash\s*:\s*tokenHash/m.test(edge), "hashed token must be passed to witness RPCs");
assert(edge.includes("PANSOFIE_PUBLIC_ORIGIN"), "origin allowlist missing");
assert(supabaseConfig.includes("[functions.evidence-witness]"), "Edge Function config missing");
assert(supabaseConfig.includes("verify_jwt = false"), "bearer-token witness endpoint must not depend on user JWT");

assert(app.includes('path="/potvrzeni-zkusenosti"'), "public witness landing route missing");
assert(page.includes("Ano, mohu tuto zkušenost potvrdit"), "CZ confirm action missing");
assert(page.includes("Yes, I can confirm this Experience"), "EN confirm action missing");
assert(page.includes("Samo o sobě neuděluje body, známku ani automaticky neschvaluje Pansofický pas"), "no-grade/no-auto-passport boundary missing");
assert(page.includes("window.history.replaceState"), "raw token must be removed from address bar after decision");
assert(page.includes('action: "preview"'), "landing page must preview before any mutation");
assert(!page.includes("Vytvořit bezplatný profil"), "witness landing must not promise public account creation");

console.log("R16 witness verification contract: PASS");
