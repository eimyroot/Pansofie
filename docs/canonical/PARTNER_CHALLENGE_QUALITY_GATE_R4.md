# PARTNER CHALLENGE + QUALITY GATE R4

Status: implementation contract for the first PANSOFIE ecosystem field pilot.

## Purpose

R4 makes a verified company / organization a real actor in the Experience engine without turning PANSOFIE into an open marketplace or giving a partner access to learner-private data.

The first operational loop is:

`VERIFIED PARTNER → DRAFT CHALLENGE → SUBMIT → QUALITY GATE → READY → MANAGED MATCH → SCHOOL ACCEPT → CIRCULAR CHALLENGE RUNS`

R4 stops before partner access to learner outputs. Structured output review, adoption decision and outcome evidence belong to R5.

## Managed-marketplace principle

The first pilot is intentionally concierge / managed:

- partner organization must be verified,
- partner contact must have an active organization membership,
- every Challenge is screened by PANSOFIE/admin,
- READY does not mean publicly listed,
- PANSOFIE/admin proposes a specific school/cohort/team match,
- teacher/coordinator explicitly accepts,
- no algorithm auto-matches children to employers,
- no partner can browse learner profiles.

## Challenge fields

A Challenge captures business/community context rather than learner data:

- title,
- problem statement,
- beneficiary,
- context,
- desired output,
- available resources,
- data requirements,
- age range,
- timeframe,
- IP expectations,
- safety notes,
- feedback commitment,
- adoption possibility.

The partner does not enter child names, learner profiles, raw learner evidence or private reflection.

## Challenge Quality Gate

No numeric quality score is produced. Each dimension is one of:

`PASS | NEEDS_WORK | BLOCKED | NOT_APPLICABLE`

Dimensions:

1. educational fit,
2. age fit,
3. scope,
4. data/privacy,
5. safeguarding,
6. IP,
7. deliverable,
8. feedback plan,
9. adoption possibility.

Challenge decision:

`NEEDS_WORK | READY | BLOCKED`

READY requires the consequential dimensions to pass and adoption possibility to be either PASS or explicitly NOT_APPLICABLE.

Screening records are immutable evidence. A revised Challenge is resubmitted and receives a new screening record rather than rewriting history.

## Pilot binding

R4 is bounded to the canonical first-pilot Partner Experience:

`CIRCULAR CHALLENGE`

A managed assignment pins:

- Challenge,
- verified partner organization,
- target school,
- pilot cohort,
- Experience team,
- canonical `circular-challenge` Mission,
- immutable Mission version.

School acceptance fails closed if the Mission version changed after the match was proposed. The assignment must then be recreated/rescreened against the current version.

Teacher/coordinator acceptance creates or reuses only not-yet-started learner runs and binds the Challenge provenance to those individual runs. Learner reflection and Passport remain individual.

## Partner view in R4

Partner can see:

- its own verified partner organizations,
- its own Challenge draft/submission state,
- the latest Quality Gate result,
- whether a READY Challenge has a managed match,
- school/cohort/team names after a match exists,
- whether the School accepted and the Challenge became active.

Partner cannot see:

- learner names,
- learner profiles,
- raw evidence,
- private reflection,
- teacher review notes about a learner,
- Experience Passport entries.

## School view in R4

Teacher/coordinator can see a bounded managed assignment targeted to their organization:

- partner organization name,
- Challenge brief,
- Quality Gate decision,
- target cohort/team,
- pinned Circular Challenge version,
- action: accept / do not accept.

Acceptance does not make the partner a learner reviewer.

## Admin / intermediary role

PANSOFIE/admin acts as the intermediary that reduces coordination friction and protects quality:

- verify/suspend partner organizations,
- screen submitted Challenges,
- request revision or block unsafe/poor-fit Challenges,
- propose a school/team match only after READY,
- never infer legal/safety approval from payment or brand status.

## Status model

Challenge:

`DRAFT → SUBMITTED → NEEDS_WORK | READY | BLOCKED → ACTIVE → COMPLETED | ARCHIVED`

Assignment:

`PROPOSED → ACTIVE → COMPLETED | CANCELLED`

R4 implements through ACTIVE. Completion/review/adoption are R5 concerns.

## Security boundaries

- new Partner tables are RLS-enabled;
- no browser role gets direct table CRUD;
- browser access is projection/RPC-only;
- private authorization helpers are not browser-executable;
- anon has no Partner RPC execution;
- partner-facing projections never join learner raw evidence or private reflection;
- partner membership and verification are checked at execution time, not only when a Challenge was first created;
- School acceptance requires existing `school_mission_assignment` processing basis for every learner through the governed team-assignment function.

## UX rule

Partner and School surfaces follow PANSOFIEDIT Professional Product Polish R1:

`CONTEXT → CO JE TEĎ NA MNĚ? → ONE PRIMARY ACTION → STATE → DETAIL → BOUNDARY`

Partner color is an orientation cue only. READY / WAITING / BLOCKED remain semantic states rather than brand colors.

## Non-scope

- open marketplace,
- automated matching,
- partner browsing learners,
- adult-child private messaging,
- partner review of learner worth,
- partner access to raw evidence/reflection,
- adoption decision,
- outcome/impact claim,
- payments,
- production deployment,
- field-pilot success claim.
