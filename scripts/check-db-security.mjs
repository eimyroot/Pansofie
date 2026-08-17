import fs from "node:fs";

const migrationPath = "supabase/migrations/20260817004900_private_authorization_predicates.sql";
const sql = fs.readFileSync(migrationPath, "utf8");

const required = [
  "create schema if not exists pansofie_private",
  "pansofie_private.is_admin()",
  "pansofie_private.pansofie_is_active_org_member",
  "pansofie_private.pansofie_is_verified_guardian",
  "pansofie_private.pansofie_has_processing_basis",
  "pansofie_private.pansofie_can_review_run",
  "pansofie_private.pansofie_can_review_experience",
  "pansofie_private.pansofie_can_guardian_view_passport",
  "alter policy",
  "revoke execute on function public.is_admin() from public, anon, authenticated",
  "revoke execute on function public.pansofie_is_active_org_member(uuid, text[], uuid) from public, anon, authenticated",
  "revoke execute on function public.pansofie_has_processing_basis(uuid, uuid, text) from public, anon, authenticated",
  "revoke execute on function public.pansofie_can_review_run(uuid, text) from public, anon, authenticated",
  "grant execute on all functions in schema pansofie_private to authenticated, service_role",
];

const missing = required.filter((item) => !sql.includes(item));
if (missing.length) {
  console.error("DB_SECURITY_CONTRACT=FAIL");
  console.error(`Missing: ${missing.join(" | ")}`);
  process.exit(1);
}

const governedBusinessRpcs = [
  "pansofie_assign_school_mission",
  "pansofie_start_mission",
  "pansofie_submit_mission",
  "pansofie_review_school_run",
  "pansofie_finalize_school_experience",
];

for (const rpc of governedBusinessRpcs) {
  const forbidden = `revoke execute on function public.${rpc}`;
  if (sql.includes(forbidden)) {
    console.error(`DB_SECURITY_CONTRACT=FAIL: governed business RPC revoked: ${rpc}`);
    process.exit(1);
  }
}

console.log("DB_SECURITY_CONTRACT=PASS");
