# PANSOFIE Learning Core V1 — CANDIDATE

## Purpose

This candidate adds the minimum canonical learning data layer needed to evolve the existing PANSOFIE product from `user → experience → mission → completed` toward `user → context → mission → evidence → skill → portfolio → impact`.

It is intentionally additive. It does not replace the existing `profiles`, `organizations`, `organization_memberships` or `guardian_relationships` model and does not create a competing `spaces`/`memberships` hierarchy.

## Pre-state

The current application already has Supabase authentication, onboarding, six experience routes, organization memberships and an age/context resolver. The public legacy prototype still contains local-first mission state. The live Supabase database was not available for verification when this candidate was prepared, so this migration must not be promoted until it is applied and tested on a non-production database that matches the target schema.

## Canonical entities introduced

- `learning_domains`: the 16 PANSOFIE development areas.
- `skills`: reusable capabilities attached to one learning domain.
- `mission_definitions`: reusable missions using LEARN → PLAY → DO → CREATE → SHARE → REFLECT.
- `mission_skills`: explicit mapping from missions to skills.
- `mission_participations`: a user's concrete attempt at a mission, optionally inside an existing organization context.
- `evidence_items`: private-by-default evidence attached to a mission participation.
- `skill_attestations`: evidence-backed statements that a user demonstrated a skill at a defined level.
- `user_skill_portfolio`: a derived, security-invoker view of the user's evidence-backed portfolio.
- `impact_observations`: individual impact measurements across eight independent dimensions.

## Product rules preserved

1. No public human rating, reputation score or leaderboard is introduced.
2. Mission suitability uses `development_level_*`, `difficulty`, `content_rating` and `supervision_requirement`; fixed age remains an experience/UI concern rather than the learning taxonomy.
3. Evidence is private by default.
4. Guardian/teacher/mentor attestations exist in the data model, but client-side write access is not enabled yet. Those flows require a verified live schema and explicit authorization logic using the existing relationships/membership model.
5. Organization-level impact is structurally possible but is not client-readable in V1; aggregation/privacy rules must be defined before exposing it.

## Green Hope and Urban Family Farm

Both are represented initially as mission `program` values (`green_hope`, `urban_family_farm`) so they can reuse the same mission/skill/evidence/impact engine. Dedicated farm production, inventory, cost, sales or marketplace tables are intentionally deferred until real pilot requirements justify them.

## Family Team

V1 reuses the existing organization/membership architecture. It does not create a second family membership system. A dedicated family-team context marker can be added only after the live `organizations` schema and current organization type constraints are verified.

## Promotion gate

This candidate becomes CANONICAL only after all of the following are true:

- target Supabase schema is readable and backed up;
- migration applies cleanly on a non-production copy/branch;
- generated Supabase types are reviewed;
- RLS behavior is tested for an adult user, child user, unrelated user and organization member;
- existing onboarding and all six experience routes still work;
- CI/test/build checks pass;
- rollback is confirmed as restoring the pre-migration database snapshot rather than destructive ad-hoc down SQL.

Until then the state is CANDIDATE, not deployed production state.
