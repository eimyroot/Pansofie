import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const migration = readFileSync(
  new URL("../supabase/migrations/20260910060000_security_definer_anon_hardening.sql", import.meta.url),
  "utf8",
);

const authenticatedRpcSignatures = [
  "public.pansofie_add_experience_team_member(uuid,uuid,text)",
  "public.pansofie_add_pilot_cohort_member(uuid,uuid,text)",
  "public.pansofie_assign_pilot_team_mission(uuid,uuid)",
  "public.pansofie_can_access_team(uuid,uuid)",
  "public.pansofie_create_experience_team(uuid,text)",
];

test("legacy RPC hardening is guarded for clean databases", () => {
  assert.match(migration, /to_regprocedure\(function_signature\)/);
  for (const signature of [
    "public.is_admin()",
    "public.handle_new_user()",
    "public.pansofie_materialize_mission_version(uuid)",
  ]) {
    assert.ok(migration.includes(`to_regprocedure('${signature}')`), `missing guard for ${signature}`);
  }
});

test("restored auth baseline is not anonymously executable", () => {
  assert.match(
    migration,
    /revoke execute on function public\.is_admin\(\) from public, anon/,
  );
  assert.match(
    migration,
    /grant execute on function public\.is_admin\(\) to authenticated/,
  );
  assert.match(
    migration,
    /revoke execute on function public\.handle_new_user\(\) from public, anon, authenticated/,
  );
});

test("anon loses execute on externally callable governed RPCs", () => {
  for (const signature of authenticatedRpcSignatures) {
    assert.ok(migration.includes(signature), `missing ${signature}`);
  }

  assert.match(
    migration,
    /revoke execute on function ' \|\| function_signature \|\| ' from public, anon/,
  );
  assert.match(
    migration,
    /grant execute on function ' \|\| function_signature \|\| ' to authenticated/,
  );
});

test("mission version materialization is internal-only", () => {
  assert.match(
    migration,
    /revoke execute on function public\.pansofie_materialize_mission_version\(uuid\) from public, anon, authenticated/,
  );
  assert.doesNotMatch(
    migration,
    /grant execute on function public\.pansofie_materialize_mission_version\(uuid\) to authenticated/,
  );
});

test("hardening migration is additive and non-destructive", () => {
  assert.doesNotMatch(migration, /\bdrop\s+(table|schema)\b/i);
  assert.doesNotMatch(migration, /\btruncate\b/i);
  assert.doesNotMatch(migration, /\bdelete\s+from\b/i);
});
