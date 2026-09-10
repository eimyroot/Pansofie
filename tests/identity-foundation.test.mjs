import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const migrationsDir = "supabase/migrations";
const foundationName = "20260908160000_identity_foundation.sql";
const experienceName = "20260908164632_user_experience_architecture.sql";
const learningName = "20260908203000_learning_core_foundation.sql";
const sql = fs.readFileSync(path.join(migrationsDir, foundationName), "utf8");

test("identity foundation precedes dependent migrations", () => {
  const names = fs.readdirSync(migrationsDir).filter((name) => name.endsWith(".sql")).sort();
  assert.ok(names.indexOf(foundationName) >= 0);
  assert.ok(names.indexOf(foundationName) < names.indexOf(experienceName));
  assert.ok(names.indexOf(experienceName) < names.indexOf(learningName));
});

test("identity foundation creates the four canonical base tables", () => {
  for (const table of ["profiles", "organizations", "organization_memberships", "guardian_relationships"]) {
    assert.match(sql, new RegExp(`create table if not exists public\\.${table}\\b`, "i"));
    assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`, "i"));
  }
  assert.match(sql, /profiles[\s\S]+references auth\.users\(id\) on delete cascade/i);
});

test("membership shape matches complete_onboarding conflict target", () => {
  assert.match(sql, /unique\s*\(organization_id,\s*user_id,\s*role\)/i);
  assert.match(sql, /status\s+text[\s\S]+active/i);
});

test("ordinary authenticated clients do not receive base-table write grants", () => {
  assert.match(sql, /revoke all on public\.profiles from anon, authenticated/i);
  assert.match(sql, /grant select on public\.profiles to authenticated/i);
  assert.doesNotMatch(sql, /grant\s+(?:insert|delete)[^;]*public\.(?:profiles|organizations|organization_memberships|guardian_relationships)[^;]*authenticated/i);
});

test("base RLS exposes only own profile, own memberships and relationship parties", () => {
  assert.match(sql, /profiles_owner_read[\s\S]+id\s*=\s*\(select auth\.uid\(\)\)/i);
  assert.match(sql, /organization_memberships_self_read[\s\S]+user_id\s*=\s*\(select auth\.uid\(\)\)/i);
  assert.match(sql, /organizations_active_member_read[\s\S]+membership\.status\s*=\s*'active'/i);
  assert.match(sql, /guardian_relationships_party_read[\s\S]+guardian_user_id\s*=\s*\(select auth\.uid\(\)\)[\s\S]+child_user_id\s*=\s*\(select auth\.uid\(\)\)/i);
});

test("foundation remains non-destructive", () => {
  assert.doesNotMatch(sql, /\bdrop\s+(?:table|schema|database)\b|\btruncate\b|\bdelete\s+from\b/i);
});
