import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const migrationUrl = new URL(
  "../supabase/migrations/20260926090000_go_school_foundation.sql",
  import.meta.url,
);

const migration = await readFile(migrationUrl, "utf8");

test("GO school foundation reuses canonical identities", () => {
  assert.match(migration, /create table if not exists public\.school_classes/);
  assert.match(migration, /create table if not exists public\.school_class_memberships/);
  assert.doesNotMatch(migration, /create table[^;]+school_students/i);
  assert.doesNotMatch(migration, /create table[^;]+school_teachers/i);
  assert.doesNotMatch(migration, /create table[^;]+school_admins/i);
  assert.match(migration, /role in \('learner', 'teacher', 'mentor'\)/);
});

test("GO school foundation is RLS protected and anon closed", () => {
  assert.match(migration, /alter table public\.school_classes enable row level security/);
  assert.match(migration, /alter table public\.school_class_memberships enable row level security/);
  assert.match(migration, /revoke all privileges on table public\.school_classes from public, anon, authenticated/);
  assert.match(migration, /revoke execute on function public\.is_school_coordinator\(uuid\) from public, anon/);
});

test("teacher scope is learner-only while coordinator owns school scope", () => {
  assert.match(
    migration,
    /target_role = 'learner'[\s\S]+public\.is_school_class_staff\(sc\.id\)/,
  );
  assert.match(migration, /public\.is_school_coordinator\(sc\.school_id\)/);
  assert.match(
    migration,
    /public\.can_manage_school_class_member\(class_id, user_id, role\)/,
  );
});

test("ordinary clients cannot rewrite class identity or hard-delete history", () => {
  assert.match(migration, /grant update \(name, status\)[\s\S]+school_classes to authenticated/);
  assert.doesNotMatch(migration, /grant update \([^)]*school_id[^)]*\)/i);
  assert.match(
    migration,
    /grant update \(status, ended_at\)[\s\S]+school_class_memberships to authenticated/,
  );
  assert.doesNotMatch(migration, /grant update \([^)]*role[^)]*\)[\s\S]+school_class_memberships/i);
  assert.doesNotMatch(migration, /grant delete on public\.school_classes/i);
  assert.doesNotMatch(migration, /grant delete on public\.school_class_memberships/i);
});
