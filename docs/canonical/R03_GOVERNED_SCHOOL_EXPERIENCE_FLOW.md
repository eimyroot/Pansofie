# R0.3 — GOVERNED SCHOOL EXPERIENCE FLOW

Status: IMPLEMENTATION SLICE
Date: 2026-08-17

## Goal

Implement the first real end-to-end PANSOFIE SCHOOL product loop without bypassing the R0.1 canonical domain model or R0.2 school/guardian access boundaries.

Canonical runtime path:

`Teacher assigns Mission → Learner starts → Evidence → Reflection → Learner submits → scoped Teacher review → Experience → private Passport`

## Core rules

1. Assignment is server-authorized. A browser cannot invent teacher authority.
2. The learner owns learner-authored evidence and reflection.
3. Submission requires at least one evidence item and a substantive `what_learned` reflection.
4. Teacher review is independent data. It does not overwrite learner-authored evidence or reflection.
5. Review purposes remain distinct: mission, evidence, reflection and Passport are not one broad permission.
6. Finalization requires a confirmed mission review and creates one canonical Experience + one private Passport item.
7. A completed Experience does not create a human score.
8. Passport items are private by default.
9. R0.3 does not deploy SQL to live Supabase by itself.

## New database operations

Migration: `supabase/migrations/20260817003000_school_experience_flow.sql`

Governed RPCs:
- `pansofie_assign_school_mission(...)`
- `pansofie_start_mission(...)`
- `pansofie_submit_mission(...)`
- `pansofie_review_school_run(...)`
- `pansofie_finalize_school_experience(...)`

### Assignment gate

The caller must be an active teacher/coordinator in the organization (or admin), the learner must be an active learner in that organization, and an active `school_mission_assignment` processing basis must exist for that learner/org. Normal teachers may assign only published Missions.

### Submission gate

A learner may submit only their own `in_progress` run. Submission requires:
- at least one evidence row owned by the learner;
- a reflection for the run with non-empty `what_learned`.

### Review gate

Each review scope maps to a separate processing purpose:

| review scope | purpose |
|---|---|
| `mission` | `school_mission_review` |
| `evidence` | `school_evidence_review` |
| `reflection` | `school_reflection_review` |
| `passport` | `school_passport_review` |

A teacher having mission-review access does not automatically gain reflection-review access.

### Finalization gate

A school Experience can be finalized only when:
- the run is `submitted`;
- caller may perform `school_mission_review` (or is admin);
- a confirmed independent `mission` review exists;
- evidence exists;
- a completed reflection exists.

Finalization is idempotent for an already completed run.

## UI

### `/skola`
Role-aware School Hub:
- learners see their assigned school runs;
- teachers/coordinators see assignment controls and their active review queue;
- assignment calls the governed server RPC.

### `/skola/mise/:runId`
Experience workbench:
- learner start;
- evidence-note capture;
- structured reflection;
- governed submission;
- purpose-scoped teacher review;
- governed Experience/Passport finalization.

### `/portfolio`
The old fake nine-card personal portfolio is removed in this slice. The page reads real `portfolio_items` and displays an explicit empty/error state instead of inventing user evidence.

## CI

`npm run check:flow` verifies structural invariants and is included in `npm run check` before Vite build.

## Deployment boundary

This PR contains migration code but **DOES NOT apply it to live Supabase**.

Before live application:
1. verify exact Supabase project/environment identity;
2. export/backup relevant schema and data;
3. apply R0.1 → R0.2 → R0.3 in order;
4. test RLS and RPCs using separate learner, teacher, guardian and unauthorized accounts;
5. record a deployment receipt and rollback/export plan.

## Explicit non-scope

- file/blob evidence upload storage;
- guardian self-service UI;
- school invitation onboarding UI;
- exact DOB collection;
- public child profiles;
- open social feed;
- unknown-adult → child messaging;
- AI evaluation of the learner;
- pricing/billing;
- production deployment.
