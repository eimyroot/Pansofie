import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const sql = fs.readFileSync("supabase/migrations/20260908164632_user_experience_architecture.sql", "utf8");

test("all exposed user-context tables enable RLS", () => {
  for (const table of ["profiles", "spaces", "memberships", "guardian_links"]) {
    assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`, "i"));
  }
});

test("authorization is membership based and not user metadata based", () => {
  assert.match(sql, /private\.is_active_space_member/);
  assert.doesNotMatch(sql, /raw_user_meta_data|user_metadata/i);
});

test("security definer functions are explicitly revoked", () => {
  assert.match(sql, /revoke all on function public\.complete_onboarding[\s\S]+from public, anon/i);
  assert.match(sql, /revoke all on function public\.handle_new_user\(\) from public, anon, authenticated/i);
});
