import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const migration = fs.readFileSync("supabase/migrations/20260927110000_go_school_pilot_onboarding.sql", "utf8");
const actions = fs.readFileSync("src/app/go/school/actions.js", "utf8");
const joinAction = fs.readFileSync("src/app/go/school/join/actions.js", "utf8");
const joinPage = fs.readFileSync("src/app/go/school/join/page.jsx", "utf8");
const workspace = fs.readFileSync("src/components/experiences/SchoolGoWorkspace.jsx", "utf8");
const onboarding = fs.readFileSync("src/app/onboarding/actions.js", "utf8");
const login = fs.readFileSync("src/app/login/actions.js", "utf8");

test("school pilot invite is hashed, single-use and RPC-only", () => {
  assert.match(migration, /create table if not exists public\.school_class_invites/i);
  assert.match(migration, /extensions\.digest\(raw_token, 'sha256'\)/i);
  assert.match(migration, /school_id, class_id, token_hash, expires_at, created_by[\s\S]+resolved_school_id, target_class_id, token_digest, expiry, actor_id/i);
  assert.match(migration, /status = 'accepted'[\s\S]+accepted_by = actor_id/i);
  assert.match(migration, /revoke all privileges on table public\.school_class_invites from public, anon, authenticated/i);
  assert.match(migration, /revoke all on function public\.accept_school_class_invite\(text\) from public, anon/i);
});

test("school invite acceptance reuses canonical identity and memberships", () => {
  assert.match(migration, /insert into public\.organization_memberships/i);
  assert.match(migration, /insert into public\.school_class_memberships/i);
  assert.match(migration, /role, status, joined_at[\s\S]+learner[\s\S]+active/i);
  assert.doesNotMatch(migration, /create table[^;]+(?:student|teacher|school_admin)/i);
  assert.match(migration, /active_organization_id = invite_row\.school_id/i);
});

test("invite-aware onboarding reuses an accepted school instead of creating a duplicate", () => {
  assert.match(migration, /normalized_context = 'school'[\s\S]+organization_memberships/i);
  assert.match(migration, /and target_organization_id is null/i);
  assert.match(onboarding, /safeReturnPath\(formData\.get\("next"\)\)/);
  assert.match(onboarding, /redirect\(next\)/);
});

test("school workspace can create a class and issue a bounded learner invite", () => {
  assert.match(actions, /createSchoolClassAction/);
  assert.match(actions, /createSchoolInviteAction/);
  assert.match(actions, /rpc\("create_school_class_invite"/);
  assert.match(workspace, /SchoolPilotSetup/);
  assert.match(workspace, /Vytvořit pozvánku pro studenta/);
  assert.match(workspace, /platí 48 hodin/);
  assert.doesNotMatch(workspace, /service_role|SUPABASE_SERVICE_ROLE_KEY/i);
});

test("join route preserves the invite through login and does not expose peer data", () => {
  assert.match(joinPage, /referrer: "no-referrer"/);
  assert.match(joinPage, /login\?next=/);
  assert.match(joinPage, /existující Pansofie účet/);
  assert.doesNotMatch(joinPage, /email|roster|date_of_birth/i);
  assert.match(joinAction, /accept_school_class_invite/);
  assert.match(joinAction, /onboarding_required/);
});

test("signup keeps a non-default safe return path for invitation confirmation", () => {
  assert.match(login, /data\?\.session[\s\S]+next === "\/app" \? "\/onboarding" : next/);
  assert.match(login, /pendingParams\.set\("next", next\)/);
});
