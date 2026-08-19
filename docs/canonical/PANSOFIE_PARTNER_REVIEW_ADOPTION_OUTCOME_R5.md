# PANSOFIE PARTNER REVIEW / ADOPTION / OUTCOME R5

Status: governed implementation contract for R5.

## Purpose

Extend the verified R4 Partner Challenge flow after a School has accepted a Challenge and a team has a bounded output ready for Partner review.

R5 does **not** give a Partner access to learner evidence, private reflection, Passport data, teacher assessment, or unnecessary learner identity.

## Canonical separation

`ACTIVITY != OUTPUT != ADOPTION != OUTCOME != IMPACT`

Participation is not Impact. Payment is not Impact. Partner approval is not Impact.

## Bounded output projection

A School teacher/coordinator explicitly creates a `challenge_deliverable` projection for an active/completed managed Challenge assignment.

The projection contains only:

- exact Challenge + Challenge revision provenance,
- exact assignment, team and immutable Mission version provenance,
- safe team label,
- agreed deliverable snapshot,
- deliverable title / summary / optional URI,
- immutable deliverable revision.

It does not copy learner raw evidence or private reflection.

## Partner review

A verified active `partner_contact` may review only a bounded deliverable belonging to its own organization.

The review asks:

1. Did the output address the brief? `YES | PARTIAL | NO`
2. What is useful?
3. What would need to change?
4. What should happen next? `NOT_ADOPT | EXPLORE_FURTHER | PILOT`

The Partner reviews the **output**, never the human.

A review and its adoption decision are immutable evidence.

## Outcome evidence

Outcome is separate from the adoption decision. A Partner may report bounded outcome evidence only after a `PILOT` decision.

Initial Partner-reported outcome evidence is explicitly `REPORTED / UNVERIFIED`. R5 does not infer or claim Impact.

## Security contract

- New R5 tables have RLS enabled.
- Browser roles have no direct table CRUD.
- Browser access is via explicit governed RPC projections only.
- `SECURITY DEFINER` helpers are not executable by `PUBLIC`, `anon`, or `authenticated` unless they are an intended public RPC.
- Intended user RPCs are granted only to `authenticated` (plus service role/owner).
- Partner projections do not join learner evidence/reflection/Passport tables.
- School submission requires active teacher/coordinator membership in the assignment School.
- Partner review/report requires verified active `partner_contact` membership in the owning Partner organization.
- No numeric learner, talent, personality, human-worth, or hireability score exists.

## Lifecycle

`READY CHALLENGE -> MANAGED MATCH -> SCHOOL ACCEPT -> EXPERIENCE -> BOUNDED OUTPUT -> PARTNER REVIEW -> NOT_ADOPT | EXPLORE_FURTHER | PILOT -> OUTCOME EVIDENCE`

`PILOT` is not equivalent to `ADOPTED`.

## UI

Use the existing Professional Product Polish and Next Action Engine.

Partner:

`PANSOFIE PARTNER -> CO JE TEĎ NA MNĚ? -> OUTPUT READY -> REVIEW OUTPUT`

School:

- create/revise bounded Partner deliverable,
- see Partner review,
- see adoption decision,
- see bounded reported outcome status.

No giant CRM, HR dashboard, child scoring, or second visual language.

## Evidence / acceptance

R5 is not promotable until:

- static/security contract PASS,
- exact-head CI PASS,
- staging migration applied,
- full role-based staging runtime proof PASS,
- synthetic `.invalid` cleanup leaves zero residue,
- browser acceptance passes on exact head/staging,
- review threads are resolved,
- merge uses expected exact head SHA,
- post-merge state is verified,
- CASER/PANSOFIEDIT receipt is persisted.

Production remains out of scope.