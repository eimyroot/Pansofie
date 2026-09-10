# PANSOFIE Learning Core V1 — CANDIDATE

## Purpose

This candidate extends the verified canonical PANSOFIE backend from:

`identity → mission → run → evidence → experience → portfolio`

into:

`identity → context → mission → evidence → skill → portfolio → multidimensional impact`.

It is intentionally additive. It does not replace `profiles`, `organizations`, `organization_memberships`, `guardian_relationships`, `missions`, `mission_runs`, `experience_evidence`, `experiences` or `portfolio_items` and does not create a competing membership, mission, execution, evidence or portfolio hierarchy.

## Verified canonical backend

The live PANSOFIE Supabase project was inspected read-only on 2026-09-10. The canonical execution chain already exists and is RLS-protected:

- `missions`: canonical mission catalog.
- `mission_runs`: participant-specific execution state.
- `experience_evidence`: evidence owned by the participant.
- `experience_reflections`: private reflection layer.
- `experiences`: completed documented experiences.
- `portfolio_items`: the existing Experience Passport projection.

The repository had lost the earliest canonical migration files even though they remain recorded in the live Supabase migration ledger. The candidate restores the exact first auth and canonical-experience migration statements for zero-cost local reset/reproduction. It does not copy production data.

## Learning Core entities introduced

- `learning_domains`: the 16 PANSOFIE development areas.
- `skills`: reusable capabilities attached to one learning domain.
- `mission_learning_cycles`: one-to-one pedagogical metadata for an existing `missions` row, using LEARN → PLAY → DO → CREATE → SHARE → REFLECT.
- `mission_skills`: mapping from an existing canonical mission to reusable skills.
- `skill_attestations`: evidence-backed statements tied to canonical `experience_evidence`.
- `user_skill_evidence_summary`: security-invoker summary view over the user's own skill attestations.
- `impact_observations`: separate observations across eight independent impact dimensions.

The candidate deliberately does **not** create `mission_definitions`, `mission_participations`, `evidence_items` or a second portfolio subsystem.

## Product rules preserved

1. No public human rating, reputation score, XP rank or leaderboard is introduced.
2. New mission suitability metadata uses `development_level_*`, `difficulty`, `content_rating` and `supervision_requirement`.
3. Historical `missions.age_min` / `age_max` columns remain untouched for backward compatibility, but the Learning Core does not add or depend on new fixed-age gates.
4. Evidence remains in the existing governed `experience_evidence` model.
5. V1 ordinary clients may create only self-attestations backed by evidence they own from their own run and only for a skill mapped to that run's mission.
6. Guardian/teacher/mentor/system attestations remain modelled but have no ordinary client write grant in V1.
7. Organization-scoped impact writes require an active existing `organization_memberships` row.
8. Organization-level impact may be recorded by governed server/admin flows, but ordinary client read exposure is not introduced in V1.

## Green Hope and Urban Family Farm

They remain program identifiers on the shared canonical mission engine (`missions.program_id`) rather than separate applications or separate mission databases. The application validator recognises `pansofie`, `pansofiego`, `green_hope` and `urban_family_farm` for new Learning Core content.

Dedicated farm production, inventory, cost, sales or marketplace tables stay deferred until real pilot requirements justify them.

## Family and school contexts

Family, school and company experiences reuse the existing identity and organization architecture. A family onboarding context currently maps to an organization row of type `community`, because the verified live `organizations.organization_type` constraint contains `school`, `municipality`, `ngo`, `community` and `company`, not a separate `family` type.

A child remains an individual identity. Guardian access is governed through `guardian_relationships` plus purpose-specific authorization rather than a shared family login.

## Zero-cost verification

Paid Supabase Branching is not required. The candidate includes:

- `supabase/config.toml` for local Supabase;
- restored canonical auth/experience baseline migrations from the live migration ledger;
- pgTAP database tests under `supabase/tests/database`;
- a GitHub Actions local-Supabase workflow that requires no production Supabase credentials;
- `.env.example` for local application wiring.

Expected local gate:

```bash
supabase start
supabase db reset
supabase test db --local
supabase db lint --local --level warning --fail-on error
supabase gen types typescript --local
npm run check
```

Never run `supabase db reset --linked` against production.

## Promotion gate

This candidate becomes CANONICAL only after all of the following are true:

- the final migration set is reviewed against the verified live schema and migration ledger;
- zero-cost local `db reset` succeeds;
- pgTAP RLS tests pass for adult, child, unrelated user and active organization member;
- database lint passes;
- generated Supabase types are reviewed;
- signup, onboarding and all six authenticated experience routes still work;
- full repository tests and production Next build pass on the final head;
- production backup/rollback is confirmed before any remote DDL.

Until then the state is CANDIDATE, not deployed production state.
