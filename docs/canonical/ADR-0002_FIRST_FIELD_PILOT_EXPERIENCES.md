# ADR-0002 — First Field Pilot Experiences

Status: ACCEPTED
Date: 2026-08-18

## Decision

The first real PANSOFIE School field pilot uses exactly these three canonical Experiences, in this order:

1. **Zlepši svou školu**
2. **Digitální most**
3. **Circular Challenge**

Their canonical database slugs are:

- `zlepsi-svou-skolu`
- `digitalni-most`
- `circular-challenge`

`PANSOFIE GO`, including earlier candidate wording such as **Budoucnost města**, is **not** Pilot Experience 03. It remains a later Systems & Futures direction and must not be silently substituted into the first field pilot.

## Runtime consequence

Published Missions are still editable source records for administration, but every governed `mission_run` created after Field Pilot Operationalization R1 binds to an immutable `mission_versions` snapshot. A later Mission edit therefore does not retroactively alter the Experience that a learner actually performed.

For team work, one Experience team groups execution context and may own shared team artifacts. Each learner still receives a separate `mission_run`, keeps an individual reflection, and receives an individual private Experience Passport entry after governed finalization.

## Why

The first pilot needs a small fixed content set so that usability, teacher load, completion, Second Experience Rate, safety and stakeholder value can be compared across cohorts. Content drift during the pilot would make the evidence ambiguous.

## Non-goals

- no open social team space
- no team-owned human score
- no shared replacement for individual reflection
- no automatic partner access to child data
- no claim that output equals adoption, outcome or impact

## Change rule

Changing any of the three canonical pilot Experiences requires a new ADR and an explicit explanation of how evidence comparability across the field pilot will be preserved.
