import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const sql = fs.readFileSync("supabase/migrations/20260908203000_learning_core_foundation.sql", "utf8");

const expectedTables = [
  "learning_domains",
  "skills",
  "mission_definitions",
  "mission_skills",
  "mission_participations",
  "evidence_items",
  "skill_attestations",
  "impact_observations",
];

test("learning core migration creates only additive domain tables", () => {
  for (const table of expectedTables) assert.match(sql, new RegExp(`create table if not exists public\\.${table}\\b`, "i"));
  assert.doesNotMatch(sql, /create table(?: if not exists)? public\.(spaces|memberships|guardian_links)\b/i);
  assert.doesNotMatch(sql, /drop table|truncate table|delete from public\.profiles/i);
});

test("all user generated learning data is protected by RLS", () => {
  for (const table of expectedTables) assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`, "i"));
  assert.match(sql, /security_invoker = true/i);
});

test("mission model encodes the six phase method and avoids hard-coded age columns", () => {
  for (const phase of ["learn", "play", "do", "create", "share", "reflect"]) assert.match(sql, new RegExp(`${phase}_prompt text not null`, "i"));
  assert.match(sql, /development_level_min/i);
  assert.match(sql, /development_level_max/i);
  assert.doesNotMatch(sql, /\bage_min\b|\bage_max\b/i);
});

test("the migration keeps impact dimensions separate and does not add a public reputation score", () => {
  for (const dimension of ["knowledge", "skills", "well_being", "family", "community", "nature", "entrepreneurship", "intergenerational_connection"]) {
    assert.match(sql, new RegExp(dimension));
  }
  assert.doesNotMatch(sql, /leaderboard|reputation_score|public_xp/i);
});

test("canonical curriculum content is read-only to ordinary authenticated users", () => {
  assert.match(sql, /grant select on public\.skills to authenticated/i);
  assert.match(sql, /grant select on public\.mission_definitions to authenticated/i);
  assert.doesNotMatch(sql, /grant select, insert, update on public\.(skills|mission_definitions)/i);
});

test("organization-scoped writes require an active membership", () => {
  assert.match(sql, /public\.organization_memberships/);
  assert.match(sql, /om\.status = 'active'/);
});

test("self attestations must be backed by evidence from the mission skill mapping", () => {
  assert.match(sql, /join public\.mission_participations p/);
  assert.match(sql, /join public\.mission_skills ms/);
  assert.match(sql, /ms\.skill_id = skill_id/);
});
