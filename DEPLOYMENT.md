# PANSOFIE Deployment

Status: GOVERNED STAGING RUNBOOK

PANSOFIE must be verified in an isolated staging environment before any production or school-pilot rollout.

## Frontend — Vercel

Framework: Vite / React SPA.

Required project settings:
- repository: `nulleimy/PANSOFIE`;
- production branch: `main`;
- build command: `npm run build` (or Vercel auto-detected Vite equivalent);
- output directory: `dist`;
- environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`;
- never expose a Supabase service-role/secret key to the browser.

`vercel.json` provides the SPA catch-all rewrite to `/index.html`, so direct navigation to React Router routes such as `/skola` and `/skola/mise/:runId` does not become a platform 404.

## Supabase — fresh staging migration order

For a new isolated PANSOFIE staging project, apply migrations in filename order:

1. `20260808130500_auth_profiles_roles.sql`
2. `20260816235000_canonical_experience_model.sql`
3. `20260817000500_school_guardian_consent_model.sql`
4. `20260817003000_school_experience_flow.sql`
5. `20260817003100_school_experience_integrity.sql`
6. `20260817004500_security_definer_execute_hardening.sql`

The sixth migration was added after the first real Supabase staging advisor pass showed broader-than-intended function EXECUTE privileges. It explicitly blocks anonymous execution and removes direct client execution from trigger-only functions.

For an existing environment, do not blindly replay migrations. First inventory existing schema/migration state and capture backup/export evidence.

## Hard staging gates

Before declaring staging validated:

1. record exact Supabase project ref, organization, region and environment purpose;
2. record the exact GitHub `main` SHA being deployed;
3. capture backup/export or establish that the staging database is newly created and contains no production/user data;
4. apply the required migrations in deterministic order;
5. run `supabase/verification/post_migration_structural_checks.sql`;
6. run security and performance advisors after DDL changes;
7. create separate learner, teacher/coordinator, guardian and unauthorized test identities;
8. verify role-isolated RLS/RPC behavior, including purpose separation;
9. verify `submit → needs_revision → edit → resubmit → confirm → finalize → private Passport`;
10. deploy Vercel with staging Supabase public URL/key only;
11. verify SPA deep links, registration/login, `/skola`, run detail and `/portfolio` in the browser;
12. capture deployment receipt, known limitations and rollback/reset path.

## Required authorization/security matrix

At minimum verify:
- learner can access own permitted run but not another learner's private data;
- learner cannot mutate evidence/reflection after submission until governed revision reopens the run;
- teacher/coordinator access requires same organization plus exact active processing purpose;
- evidence-review authority does not silently grant reflection-review authority;
- verified guardian relationship alone grants no raw evidence/reflection access;
- `guardian_passport_view` grants only the intended completed Experience/Passport view;
- unrelated authenticated and anonymous users cannot access protected participant data;
- anonymous users cannot execute PANSOFIE governed SECURITY DEFINER RPCs;
- learner cannot self-finalize or self-verify;
- `needs_revision` invalidates stale confirmed reviews and reopens editing;
- resubmission requires fresh review before finalization;
- review events remain auditable.

## Auth URL configuration

After a Vercel staging URL exists, configure Supabase Auth URL settings for that origin:
- Site URL appropriate to the staging environment;
- allowed Redirect URLs used by the application;
- OAuth callback configuration only for providers actually enabled.

## Production boundary

A successful Vercel build is not production authorization. A successful migration is not pilot authorization. Production/pilot promotion requires a separate evidence-backed GO decision after staging RLS/RPC and browser E2E verification.

See `docs/canonical/STAGING_DEPLOYMENT_RUNBOOK_V1.md` for the evidence checklist.
