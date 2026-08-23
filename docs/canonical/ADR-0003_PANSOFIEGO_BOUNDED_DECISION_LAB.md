# ADR-0003 — PansofieGO bounded decision lab

Status: ACCEPTED — BOUNDED EXPERIMENT
Date: 2026-08-23

## Decision

PansofieGO R0 is introduced inside the existing PANSOFIE React/Vite application as a **public, non-persistent, optional decision-scenario experiment** at `/pansofiego`.

It is not a separate application, not a replacement for real-world Experiences, not a field-pilot Experience, and not an assessment of a person.

The first implementation contains:

- one scenario bound to existing legacy mission `m3` (`Zorganizuj komunitní úklid v okolí`),
- four steps: Analýza → Rozhodnutí → Důsledky → Reflexe,
- four scenario-impact layers: Příroda / Společnost / Technologie / Vědomí,
- a Harmony value computed from the selected scenario only,
- static Socratic reflection questions,
- no LLM call,
- no Supabase write,
- no account requirement,
- no persistence of the reflection textarea,
- no personality, consciousness-level, trait-XP or human-worth fields.

## Why this shape now

The repository's current authenticated pilot UI intentionally fail-closes prototype `/mise/:id` surfaces to `/skola`. Shipping PansofieGO directly into those legacy surfaces would therefore create a hidden or misleading integration.

A bounded public route is the smallest deployable vertical slice that can validate interaction, language, visual fit and the decision model without changing the governed first school-pilot Experience set or storing child data.

This does **not** supersede ADR-0002. `PANSOFIE GO` remains outside the first three canonical field-pilot Experiences.

## New-idea gate

1. **Human need** — practice weighing trade-offs before acting in the real world.
2. **Development paths** — primarily Poznání, Charakter and Samostatnost; the scenario may touch Přínos and Vztahy.
3. **Real experience enabled** — preparation/reflection around an existing real-world Mission; simulation is never sufficient by itself.
4. **Evidence** — browser acceptance, repository checks, and later real-world evidence from the underlying Experience if used in practice.
5. **Reflection/transfer** — every run ends with explicit Socratic reflection and a return to real-world action.
6. **Contribution/value** — helps a learner or family see consequences across several system layers before committing to a plan.
7. **User** — public visitor for R0; later possibly learner/family/teacher under governed authenticated flows.
8. **Payer** — none for R0; no new commercial claim is introduced.
9. **Risk** — accidental profiling, gamified human ranking, simulation replacing reality, or false claims of impact. Mitigated by no persistence, scenario-only scoring, static prompts and explicit public boundaries.
10. **Why inside PANSOFIE** — it translates the existing method of action → evidence → reflection into a decision-preparation layer connected to Missions.
11. **Reciprocity** — participant receives a safe decision exercise and contributes no protected data; PANSOFIE receives only deploy/test evidence in R0; no third party receives learner data.

## Safety invariants

- Scores describe a scenario, never a person.
- No person-level typology is persisted or inferred.
- No AI-generated verdict is shown.
- Reflection stays in component memory and disappears on reload.
- Simulation must be described as preparation, not proof.
- Public language must remain compatible with the R8 human-first copy gate.
- Any future persistence requires a new database/security review and RLS design.
- Any future LLM mentor requires a separate safety review and explicit feature gate.

## Acceptance gates

R0 may merge only when:

1. `npm run check:pansofiego-r0` passes,
2. the full repository `npm run check` passes,
3. browser proof covers `/pansofiego` on desktop and mobile,
4. no runtime console/page errors appear in that proof,
5. the public route makes the non-persistent and scenario-only boundaries visible,
6. Vercel preview is READY,
7. independent diff review finds no change to the canonical first field-pilot Experience set.

## Deferred

- Supabase `quest_attempts`,
- authenticated MissionDetail integration,
- LLM Socratic mentor,
- teacher/guardian views,
- persistence and history,
- any claim that PansofieGO improves learning or real-world outcomes before evidence exists.
