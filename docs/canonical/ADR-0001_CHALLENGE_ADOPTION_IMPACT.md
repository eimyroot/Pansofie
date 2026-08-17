# ADR-0001 — Challenge → Adoption → Impact

Status: **ACCEPTED**
Date: 2026-08-17
Decision source: explicit user approval in the project conversation.

## Context

The canonical PANSOFIE loop ends in `SPOLUPRÁCE → DOPAD`, but V1.0 did not yet define how real problems from firms, municipalities, NGOs or communities become governed Experiences, how external partners may adopt outputs, or how adoption differs from measured impact.

The project also contains practical circularity ideas such as compostable/recyclable materials, reuse, repair and company/community participation. Without a canonical layer these ideas risk becoming disconnected projects, marketing partnerships or unsafe material experiments.

## Decision

Add a canonical **Challenge → Adoption → Impact** layer as an extension of the existing Master Architecture.

The layer shall:
1. translate global/systemic challenges into bounded local action;
2. allow verified organizations to contribute problems, materials, expertise, facilities, adoption capacity or funding;
3. keep learning success separate from corporate adoption;
4. separate `ACTIVITY`, `OUTPUT`, `ADOPTION`, `OUTCOME` and `IMPACT`;
5. introduce `PANSOFIE CIRCULAR` as a cross-Lab vertical under `NATURE × MAKER × LIFE`, not a new top-level Lab;
6. require material/facility safety screening before child-facing use;
7. prohibit partner advertising, hidden product placement, child commercial profiling and unrestricted partner-to-child private messaging;
8. keep the future Challenge Network a network of verified problems/capabilities/solutions/outcomes, not an open child social network.

## Consequences

Positive:
- makes `SPOLUPRÁCE → DOPAD` operational;
- gives firms and municipalities a useful role beyond sponsorship;
- creates stronger real-world Experiences;
- enables measurable adoption/outcome evidence;
- strengthens the potential partner network and data moat;
- gives circularity/recycling/composting ideas a governed home.

Costs/risks:
- partner onboarding and verification become necessary;
- material provenance and safety become first-class requirements;
- impact attribution must be conservative;
- corporate incentives can conflict with educational value;
- partner access controls must remain separate from school/guardian access controls.

## Non-decision

This ADR does **not** authorize:
- live partner marketplace implementation;
- direct company access to learner data;
- live Supabase schema changes;
- automatic impact claims;
- public child profiles;
- paid product placement;
- hazardous material experiments;
- production deployment.

## Implementation sequence

1. canonical documentation and Challenge Standard;
2. one bounded low-risk Challenge in pilot design;
3. validate teacher load, partner usefulness, safety and evidence quality;
4. only then design persistent Challenge/Adoption/Impact entities in the production data model.