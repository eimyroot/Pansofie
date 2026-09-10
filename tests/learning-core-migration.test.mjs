import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const sql = fs.readFileSync("supabase/migrations/20260908203000_learning_core_foundation.sql", "utf8");
const executableSql = sql.replace(/--.*$/gm, "");

const expectedTables = [
  "learning_domains",
  "skills",
  "mission_learning_cycles",
  "mission_skills",
  "skill_attestations",
  "impact_observations",
];

test("learning core adds only taxonomy, pedagogy, skill and impact tables", () => {
  for (const table of expectedTables) {
    assert.match(sql, new RegExp(`create table if not exists public\\.${table}\\b`, "i"));
  }

  for (const duplicate of ["mission_definitions", "mission_participations", "evidence_items"]) {
    assert.doesNotMatch(executableSql, new RegExp(`create table(?: if not exists)? public\\.${duplicate}\\b`, "i"));
  }

  assert.doesNotMatch(executableSql, /create table(?: if not exists)? public\.(spaces|memberships|guardian_links)\b/i);
  assert.doesNotMatch(executableSql, /drop table|truncate table|delete from public\.profiles/i);
});

test("learning core reuses the canonical experience engine", () => {
  assert.match(sql, /references public\.missions\(id\)/i);
  assert.match(sql, /references public\.experience_evidence\(id\)/i);
  assert.match(sql, /join public\.mission_runs r on r\.id = e\.run_id/i);
  assert.match(sql, /join public\.mission_skills ms/i);
  assert.doesNotMatch(executableSql, /user_skill_portfolio/i);
  assert.match(sql, /user_skill_evidence_summary/i);
});

test("all new learning tables are protected by RLS", () => {
  for (const table of expectedTables) {
    assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`, "i"));
  }
  assert.match(sql, /security_invoker = true/i);
});

test("pedagogical mission metadata encodes the six phase method without adding age gates", () => {
  for (const phase of ["learn", "play", "do", "create", "share", "reflect"]) {
    assert.match(sql, new RegExp(`${phase}_prompt text not null`, "i"));
  }
  assert.match(sql, /development_level_min/i);
  assert.match(sql, /development_level_max/i);
  assert.doesNotMatch(executableSql, /\bage_min\b|\bage_max\b/i);
});

test("impact dimensions remain separate and no human reputation score is introduced", () => {
  for (const dimension of [
    "knowledge",
    "skills",
    "well_being",
    "family",
    "community",
    "nature",
    "entrepreneurship",
    "intergenerational_connection",
  ]) {
    assert.match(sql, new RegExp(dimension));
  }
  assert.doesNotMatch(executableSql, /leaderboard|reputation_score|public_xp/i);
});

test("canonical curriculum metadata is read-only to ordinary authenticated users", () => {
  for (const relation of ["skills", "mission_learning_cycles", "mission_skills"]) {
    assert.match(sql, new RegExp(`grant select on public\\.${relation} to authenticated`, "i"));
    assert.doesNotMatch(executableSql, new RegExp(`grant[^;]*(insert|update|delete)[^;]*public\\.${relation}`, "i"));
  }
});

test("organization-scoped impact writes require an active existing membership", () => {
  assert.match(sql, /public\.organization_memberships/);
  assert.match(sql, /om\.status = 'active'/);
});

test("self attestations must use owned canonical evidence mapped to the run mission", () => {
  assert.match(sql, /from public\.experience_evidence e/i);
  assert.match(sql, /join public\.mission_runs r on r\.id = e\.run_id/i);
  assert.match(sql, /ms\.mission_id = r\.mission_id/i);
  assert.match(sql, /ms\.skill_id = skill_attestations\.skill_id/i);
  assert.match(sql, /e\.owner_id = \(select auth\.uid\(\)\)/i);
  assert.match(sql, /r\.user_id = \(select auth\.uid\(\)\)/i);
});
