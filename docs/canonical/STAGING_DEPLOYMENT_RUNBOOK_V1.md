# PANSOFIE — STAGING DEPLOYMENT RUNBOOK V1

Status: PRE-DEPLOYMENT GOVERNANCE / EXECUTION CHECKLIST
Date: 2026-08-17

## Goal

Prove the merged PANSOFIE School runtime against a real isolated Supabase database and a real Vercel preview/staging deployment without confusing build success with authorization correctness.

## Canonical deployed scope

The staging target validates the current implemented spine:

`Teacher assigns Mission → Learner starts → Evidence → Reflection → Submit → scoped Teacher review → needs_revision/resubmit when required → Experience → private Passport`

School Pilot Kit and Company Partner Kit are product/methodology packages. Persistent Partner Portal / Challenge-Adoption-Outcome entities are still non-scope for this deployment.

## Phase A — identity and provenance

Record:
- GitHub repository and exact `main` SHA;
- Supabase organization + project ref + region;
- environment classification: `STAGING`, never silently `PRODUCTION`;
- Vercel team + project ID + deployment ID/URL;
- operator/time;
- whether database is fresh or pre-existing.

Fail closed if the Supabase project identity cannot be tied unambiguously to PANSOFIE.

## Phase B — backup / reset evidence

Fresh empty staging database:
- record creation evidence and project identity;
- record that no production/user dataset is present;
- rollback may be destructive reset/recreate because the environment is disposable.

Pre-existing database:
- inventory schema/migration state;
- capture backup/export before mutation;
- do not apply files merely because they exist in Git.

## Phase C — migration application

Fresh project order:
1. `20260808130500_auth_profiles_roles.sql`
2. `20260816235000_canonical_experience_model.sql`
3. `20260817000500_school_guardian_consent_model.sql`
4. `20260817003000_school_experience_flow.sql`
5. `20260817003100_school_experience_integrity.sql`
6. `20260817004500_security_definer_execute_hardening.sql`
7. `20260817004600_public_execute_cleanup.sql`

The execute-hardening migrations are mandatory because the first real staging advisor pass identified broader-than-intended function execution. The second hardening step specifically removes PostgreSQL's inherited `PUBLIC` EXECUTE privilege, which otherwise keeps anonymous access even after a direct `REVOKE ... FROM anon`.

After each migration record success/failure. Stop on first failure; do not skip ahead.

Then run:
`supabase/verification/post_migration_structural_checks.sql`

Run Supabase security and performance advisors after DDL changes and triage every warning before promotion. Anonymous SECURITY DEFINER exposure and direct browser execution of trigger-only functions are blockers. Authenticated SECURITY DEFINER warnings may only be accepted when the function is intentionally required by RLS/current frontend and the authorization semantics are independently tested.

## Phase D — multi-role test fixture

Use separate identities for:
- learner A;
- learner B;
- teacher/coordinator;
- guardian of learner A;
- unrelated authenticated account;
- anonymous request where relevant.

Create one school organization and only the minimum purpose-specific processing-basis records required by each scenario.

Do not use an admin/service role to demonstrate ordinary-user access correctness.

## Phase E — negative authorization matrix

Must pass:
- learner A cannot read/update learner B private run/evidence/reflection;
- teacher with mission purpose but no reflection purpose cannot read/review reflection;
- guardian relationship without `guardian_passport_view` grants no child content;
- guardian Passport purpose does not grant raw evidence/reflection;
- unrelated account cannot read protected rows;
- anonymous caller cannot invoke protected governed RPCs;
- trigger-only functions cannot be invoked directly by anonymous/authenticated browser roles;
- learner cannot mark own work independently verified or create final Experience by direct client authority;
- submitted learner evidence/reflection remains frozen.

Any critical data isolation failure = STOP.

## Phase F — golden-path lifecycle

Run and retain IDs/timestamps for:
1. teacher assigns a published Mission to learner A;
2. learner starts;
3. learner records evidence;
4. learner records substantive reflection;
5. learner submits;
6. teacher requests `needs_revision`;
7. confirm stale positive review decisions are invalidated/reset;
8. learner edits after reopening;
9. learner resubmits;
10. teacher records fresh confirmed mission review;
11. authorized finalization creates one canonical Experience and one private Passport item;
12. confirm review-event history preserves lifecycle evidence.

## Phase G — Vercel staging

Required public browser variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Never place a service-role/secret database key in Vite/Vercel browser variables.

Verify:
- `/` loads;
- refresh/deep-link on `/skola` resolves through SPA rewrite;
- login/register path works against staging Auth;
- learner/teacher role-specific School Hub behavior is correct;
- `/skola/mise/:runId` completes the golden path;
- `/portfolio` shows real private Passport data after finalization;
- unauthorized browser session does not reveal protected data.

## Phase H — evidence receipt

A staging receipt must contain:
- GitHub exact SHA;
- migration files and execution result;
- Supabase project ref/region/environment classification;
- advisor results;
- test identities represented by non-secret labels only;
- RLS/RPC matrix results;
- golden-path run/Experience/Passport identifiers where safe;
- Vercel project/deployment URL and exact deployment status;
- build/runtime errors if any;
- rollback/reset plan;
- unresolved risks;
- final `STAGING_VALIDATED = YES/NO`.

## Promotion rule

`STAGING_VALIDATED = YES` does not automatically mean `PRODUCTION_AUTHORIZED = YES`.

Production/pilot promotion requires a separate decision after evidence review, controller/school runtime parameters and incident/safeguarding ownership are resolved.
