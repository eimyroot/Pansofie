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
4. Evidence and reflection freeze after submission.
5. A governed `needs_revision` decision reopens the run to `in_progress` and invalidates stale positive review decisions before the next submission.
6. Teacher review is independent data. It does not overwrite learner-authored evidence or reflection.
7. Review purposes remain distinct: mission, evidence, reflection and Passport are not one broad permission.
8. Review changes generate append-only review-event evidence.
9. Finalization requires a current confirmed mission review and creates one canonical Experience + one private Passport item.
10. A completed Experience does not create a human score.
11. Passport items are private by default.
12. R0.3 does not deploy SQL to live Supabase by itself.

## Database operations

Migrations:
- `supabase/migrations/20260817003000_school_experience_flow.sql`
- `supabase/migrations/20260817003100_school_experience_integrity.sql`

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

After submission, evidence and reflection are frozen for non-admin users. This prevents the reviewed object from changing silently underneath a review.

### Revision gate

A teacher with mission-review authority may return a submitted run as `needs_revision`. The server then:
- resets previously confirmed review decisions to `pending` because learner content may change;
- reopens the run to `in_progress`;
- clears `submitted_at`;
- preserves review history in `experience_review_events`.

The learner can then edit, add evidence and resubmit.

### Review gate

Each review scope maps to a separate processing purpose:

| review scope | purpose |
|---|---|
| `mission` | `school_mission_review` |
| `evidence` | `school_evidence_review` |
| `reflection` | `school_reflection_review` |
| `passport` | `school_passport_review` |

A teacher having mission-review access does not automatically gain reflection-review access. Non-pending review decisions require a submitted run.

### Review audit trail

`experience_reviews` stores the current review state. `experience_review_events` stores append-only snapshots of review creation/change/system reset so a later state transition does not erase the review history.

### Finalization gate

A school Experience can be finalized only when:
- the run is `submitted`;
- caller may perform `school_mission_review` (or is admin);
- a current confirmed independent `mission` review exists;
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
- governed revision reopening;
- governed Experience/Passport finalization.

### `/portfolio`
The old fake nine-card personal portfolio is removed in this slice. The page reads real `portfolio_items` and displays an explicit empty/error state instead of inventing user evidence.

## CI

`npm run check:flow` verifies structural invariants and is included in `npm run check` before Vite build.

The contract checks include:
- assignment/review purpose gates;
- evidence + reflection submission requirements;
- submission freeze triggers;
- review-event audit evidence;
- stale-review reset on revision;
- no destructive auth/profile changes;
- required UI routes/actions.

## Deployment boundary

This PR contains migration code but **DOES NOT apply it to live Supabase**.

Before live application:
1. verify exact Supabase project/environment identity;
2. export/backup relevant schema and data;
3. apply R0.1 → R0.2 → R0.3 flow → R0.3 integrity in order;
4. test RLS and RPCs using separate learner, teacher, guardian and unauthorized accounts;
5. test revision/re-submit and verify review-event history;
6. perform browser E2E of the golden path;
7. record a deployment receipt and rollback/export plan.

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
