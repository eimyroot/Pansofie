import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";

const db = new PGlite();
const migrationsDir = path.resolve("supabase/migrations");
const migrationFiles = fs
  .readdirSync(migrationsDir)
  .filter((name) => name.endsWith(".sql"))
  .sort();

const ADULT = "11111111-1111-4111-8111-111111111111";
const CHILD = "22222222-2222-4222-8222-222222222222";
const OTHER = "33333333-3333-4333-8333-333333333333";
const ORG = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const MISSION = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
const ADULT_RUN = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
const CHILD_RUN = "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee";
const SKILL = "44444444-4444-4444-8444-444444444444";
const ADULT_EVIDENCE = "55555555-5555-4555-8555-555555555555";
const CHILD_EVIDENCE = "ffffffff-ffff-4fff-8fff-ffffffffffff";

function rowValue(result, key) {
  return result.rows[0]?.[key];
}

async function scalar(sql, key = "value") {
  return rowValue(await db.query(sql), key);
}

async function asUser(userId, fn) {
  await db.exec(`set role authenticated; set request.jwt.claim.sub = '${userId}';`);
  try {
    return await fn();
  } finally {
    await db.exec("reset role; reset request.jwt.claim.sub;");
  }
}

async function expectDenied(label, fn) {
  let denied = false;
  try {
    await fn();
  } catch (error) {
    denied = true;
    console.log(`PGLITE_DENIED=${label}:${error.message.split("\n")[0]}`);
  }
  assert.equal(denied, true, `${label} should be rejected`);
}

await db.exec(`
  create role anon nologin;
  create role authenticated nologin;
  create schema auth;
  grant usage on schema auth to anon, authenticated;
  grant usage on schema public to anon, authenticated;
  alter default privileges in schema public grant all on tables to anon, authenticated;
  alter default privileges in schema public grant all on sequences to anon, authenticated;

  create table auth.users (
    id uuid primary key,
    email text,
    raw_user_meta_data jsonb not null default '{}'::jsonb
  );

  create or replace function auth.uid()
  returns uuid
  language sql
  stable
  as $$
    select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
  $$;

  grant execute on function auth.uid() to anon, authenticated;
`);

for (const file of migrationFiles) {
  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
  try {
    await db.exec(sql);
    console.log(`PGLITE_MIGRATION_PASS=${file}`);
  } catch (error) {
    if (/extension .*pgcrypto.*not available/i.test(error.message)) {
      const withoutPgcrypto = sql.replace(/create extension if not exists pgcrypto;\s*/i, "");
      await db.exec(withoutPgcrypto);
      console.log(`PGLITE_MIGRATION_PASS=${file}:pgcrypto-extension-skipped`);
      continue;
    }
    console.error(`PGLITE_MIGRATION_FAIL=${file}`);
    throw error;
  }
}

assert.equal(await scalar("select count(*)::int as value from public.learning_domains"), 16);

const newTables = [
  "learning_domains",
  "skills",
  "mission_learning_cycles",
  "mission_skills",
  "skill_attestations",
  "impact_observations",
];
for (const table of newTables) {
  assert.equal(
    await scalar(`select to_regclass('public.${table}') is not null as value`),
    true,
    `${table} must exist`,
  );
  assert.equal(
    await scalar(
      `select c.relrowsecurity as value from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname='public' and c.relname='${table}'`,
    ),
    true,
    `${table} must have RLS enabled`,
  );
}

for (const duplicate of ["mission_definitions", "mission_participations", "evidence_items"]) {
  assert.equal(
    await scalar(`select to_regclass('public.${duplicate}') is null as value`),
    true,
    `${duplicate} must not exist`,
  );
}

assert.equal(
  await scalar("select has_function_privilege('anon','public.complete_onboarding(text,text,text,date)','EXECUTE') as value"),
  false,
);
assert.equal(
  await scalar("select has_function_privilege('authenticated','public.complete_onboarding(text,text,text,date)','EXECUTE') as value"),
  true,
);
assert.equal(
  await scalar("select has_function_privilege('anon','public.is_admin()','EXECUTE') as value"),
  false,
);
assert.equal(
  await scalar("select has_function_privilege('authenticated','public.handle_new_user()','EXECUTE') as value"),
  false,
);

await db.exec(`
  insert into auth.users (id, email) values
    ('${ADULT}', 'adult@pansofie.test'),
    ('${CHILD}', 'child@pansofie.test'),
    ('${OTHER}', 'other@pansofie.test');

  update public.profiles
  set display_name = case id
        when '${ADULT}' then 'Adult'
        when '${CHILD}' then 'Child'
        else 'Other'
      end,
      date_of_birth = case id
        when '${ADULT}' then date '1990-01-01'
        when '${CHILD}' then date '2015-01-01'
        else date '1995-01-01'
      end,
      account_context = case when id = '${CHILD}' then 'young' else 'personal' end
  where id in ('${ADULT}', '${CHILD}', '${OTHER}');

  insert into public.organizations (id, slug, name, organization_type, status, created_by)
  values ('${ORG}', 'pglite-community', 'PGlite Community', 'community', 'active', '${ADULT}');

  insert into public.organization_memberships
    (organization_id, user_id, role, status, joined_at, created_by)
  values ('${ORG}', '${ADULT}', 'coordinator', 'active', now(), '${ADULT}');

  insert into public.missions (id, slug, title, summary, program_id, status, created_by)
  values ('${MISSION}', 'pglite-learning-core', 'PGlite Learning Core', 'migration gate', 'pansofie', 'published', '${ADULT}');

  insert into public.mission_learning_cycles
    (mission_id, development_level_min, development_level_max, difficulty, learn_prompt, play_prompt, do_prompt, create_prompt, share_prompt, reflect_prompt)
  values ('${MISSION}', 2, 4, 2, 'learn', 'play', 'do', 'create', 'share', 'reflect');

  insert into public.skills (id, code, domain_id, title_cs, title_en, status, created_by)
  values ('${SKILL}', 'pglite_observation', 'mind', 'Pozorování', 'Observation', 'active', '${ADULT}');

  insert into public.mission_skills (mission_id, skill_id, contribution_weight)
  values ('${MISSION}', '${SKILL}', 1);

  insert into public.mission_runs (id, mission_id, user_id, status) values
    ('${ADULT_RUN}', '${MISSION}', '${ADULT}', 'in_progress'),
    ('${CHILD_RUN}', '${MISSION}', '${CHILD}', 'in_progress');

  insert into public.experience_evidence (id, run_id, owner_id, kind, description) values
    ('${ADULT_EVIDENCE}', '${ADULT_RUN}', '${ADULT}', 'note', 'adult evidence'),
    ('${CHILD_EVIDENCE}', '${CHILD_RUN}', '${CHILD}', 'note', 'child evidence');
`);

await asUser(ADULT, async () => {
  assert.equal(await scalar("select count(*)::int as value from public.mission_runs"), 1);
  assert.equal(
    await scalar(`select count(*)::int as value from public.experience_evidence where owner_id='${CHILD}'`),
    0,
  );
  await db.exec(`
    insert into public.impact_observations
      (user_id, organization_id, dimension, metric_key, value_numeric, unit, evidence_id, recorded_by)
    values
      ('${ADULT}', '${ORG}', 'knowledge', 'pglite.test', 1, 'observation', '${ADULT_EVIDENCE}', '${ADULT}');
  `);
});

await asUser(CHILD, async () => {
  assert.equal(await scalar("select count(*)::int as value from public.mission_runs"), 1);
  assert.equal(await scalar("select count(*)::int as value from public.experience_evidence"), 1);
  await db.exec(`
    insert into public.skill_attestations
      (user_id, skill_id, evidence_id, level, attestation_type, attested_by)
    values
      ('${CHILD}', '${SKILL}', '${CHILD_EVIDENCE}', 2, 'self', '${CHILD}');
  `);
  assert.equal(await scalar("select count(*)::int as value from public.user_skill_evidence_summary"), 1);
});

await asUser(OTHER, async () => {
  assert.equal(await scalar("select count(*)::int as value from public.mission_runs"), 0);
  assert.equal(await scalar("select count(*)::int as value from public.experience_evidence"), 0);
  assert.equal(await scalar("select count(*)::int as value from public.skill_attestations"), 0);
  await expectDenied("non-member-org-impact", async () => {
    await db.exec(`
      insert into public.impact_observations
        (user_id, organization_id, dimension, metric_key, value_numeric, recorded_by)
      values
        ('${OTHER}', '${ORG}', 'knowledge', 'pglite.denied', 1, '${OTHER}');
    `);
  });
});

await asUser(ADULT, async () => {
  await expectDenied("cross-user-self-attestation", async () => {
    await db.exec(`
      insert into public.skill_attestations
        (user_id, skill_id, evidence_id, level, attestation_type, attested_by)
      values
        ('${ADULT}', '${SKILL}', '${CHILD_EVIDENCE}', 2, 'self', '${ADULT}');
    `);
  });
});

console.log(`PGLITE_MIGRATIONS=${migrationFiles.length}`);
console.log("PGLITE_RLS_GATE=PASS");
await db.close();
