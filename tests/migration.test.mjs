import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const sql = fs.readFileSync("supabase/migrations/20260908164632_user_experience_architecture.sql", "utf8");

test("migration extends the existing membership model", () => {
  for (const table of ["profiles", "organizations", "organization_memberships", "guardian_relationships"]) {
    assert.match(sql, new RegExp(`public\\.${table}`, "i"));
  }
  assert.doesNotMatch(sql, /create table public\.(spaces|memberships|guardian_links)\b/i);
});

test("authorization is membership based and not user metadata based", () => {
  assert.match(sql, /public\.organization_memberships/);
  assert.doesNotMatch(sql, /raw_user_meta_data|user_metadata/i);
});

test("security definer functions are explicitly revoked", () => {
  assert.match(sql, /revoke all on function public\.complete_onboarding[\s\S]+from public, anon/i);
  assert.match(sql, /security definer/i);
});
