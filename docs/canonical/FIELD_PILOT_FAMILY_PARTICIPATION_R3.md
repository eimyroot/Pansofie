# FIELD PILOT FAMILY PARTICIPATION R3

Status: implementation contract for bounded Family participation in the first real PANSOFIE field pilot.

## Purpose

R3 makes Family a real ecosystem participant without turning a guardian relationship into unrestricted learner-data access.

Canonical rule:

> A guardian relationship identifies a relationship. It does not itself grant content access.

## Family receives

For an explicitly authorized active School Experience, Family may receive only a bounded projection:

- learner name,
- school/organization,
- Experience title and purpose,
- safe summary,
- contribution prompt,
- safety notes,
- run state,
- pilot start/end window.

A separate `guardian_passport_view` purpose may expose completed Passport summary.

## Family contributes

A guardian with verified relationship + active purpose-specific `guardian_family_participation` basis may add a bounded contribution:

- `context` — useful family/local context,
- `contact` — a person/contact that may help,
- `resource` — a resource, place or opportunity,
- `observation` — a factual observation relevant to the Experience.

The contribution is a separate system object. It is **not** learner evidence, learner reflection, teacher verification, a Passport record or a human-worth score.

## School receives

Teacher/coordinator may receive active family contributions only inside their organization and only when the learner has active `school_mission_review` processing basis.

No uncontrolled adult → child private messaging is introduced.

## Privacy boundary

R3 does not expose through Family projections:

- `experience_evidence`,
- `experience_reflections`,
- private teacher review notes,
- direct child contact channel,
- raw guardian verification evidence,
- age-assurance evidence,
- legal-basis metadata beyond what is operationally necessary.

## Purpose-specific authorization

New processing purpose:

`guardian_family_participation`

It is organization-scoped and separate from:

`guardian_passport_view`

PANSOFIE does not infer the lawful basis. Trusted admin provisioning must receive the controller-approved legal basis and policy version. If consent is used, a consent timestamp is mandatory and the existing verified guardian relationship is referenced.

This technical model is not a substitute for a controller-specific legal assessment/DPIA.

## Navigation

The authenticated Family workspace appears only when either:

- the user has actual Family access, or
- the user is teacher/coordinator and therefore may need the school-side Family contribution inbox.

A generic member does not receive a Family navigation item merely because the route exists.

## Non-scope

- no guardian access to raw evidence,
- no guardian access to private learner reflection,
- no guardian completion of learner work,
- no guardian verification of learner worth/performance,
- no social feed or direct messaging,
- no automatic legal-basis selection,
- no synthetic family/child pilot data,
- no production deployment.
