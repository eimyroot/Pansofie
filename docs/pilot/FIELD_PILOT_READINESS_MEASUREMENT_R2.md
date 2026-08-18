# FIELD PILOT READINESS + MEASUREMENT R2

Status: implementation contract for the first real PANSOFIE School field pilot.

## Purpose

R2 separates two different questions:

1. **May this cohort start?** — hard readiness gate.
2. **What evidence is the pilot producing?** — measurement layer for later human Evidence Review.

The measurement layer never scores human worth and never makes an automatic GO/STOP decision.

## Activation readiness

A cohort remains `planned` until all conditions are true:

- exactly 3 pinned canonical Experience versions,
- all 6 operational responsibilities are confirmed:
  - pilot lead,
  - safeguarding contact,
  - privacy/data contact,
  - technical incident contact,
  - partner contact,
  - PANSOFIE operator,
- at least one active learner,
- every active learner is in an active Experience team,
- no active learner is missing `school_mission_assignment` processing basis,
- no unresolved S2/S3 incident,
- bounded start/end dates are present.

Only then can a teacher/coordinator explicitly call the activation action. The system does not auto-activate.

## Evidence indicators

Candidate pilot-evaluation thresholds:

- Second Experience Rate (SER) >= 60%,
- at least 70% of active learners complete at least 2 of 3 Experiences,
- median teacher overhead <= 30 minutes/week,
- unresolved S2/S3 incidents = 0.

These thresholds are **candidate evidence gates**, not a claim that the pilot has succeeded and not an automatic business/product decision.

## Teacher load

Teacher-load entries capture weekly operational overhead attributable to the pilot. They are evidence about product/process burden, not teacher performance scoring.

## Incident model

Minimal severities: `S1`, `S2`, `S3`.

Categories: safety, privacy, technical, partner, other.

Readiness fails closed while any S2/S3 incident remains unresolved.

## Non-scope

- no field-pilot success claim,
- no partner challenge/adoption runtime,
- no public child data,
- no open social network or messaging,
- no automated learner/person scoring,
- no production deployment.
