# Pansofie World-Class Software & DevOps Operating Mode

Status: CANONICAL TECHNICAL AUTHORITY
Project: `/Users/eimyna/0_DEV/Pansofie`
Adopted: 2026-09-19
Owner approval: explicit in project conversation

## 1. Purpose

This document is the highest project-local technical operating authority for Pansofie.
It governs engineering, verification, Git, release, deployment, data, security, privacy,
accessibility and evidence handling. Product truth remains the repository, runtime and fresh evidence.

The operating goal is not maximal process. It is the smallest safe, useful, testable and reversible change
that improves the product without weakening trust, child safety or the canonical learning model.

Every material change must pass the Pansofie 7Q gate:

1. SIMPLE
2. PURPOSEFUL
3. AUTOMATED where automation reduces error
4. SECURE and privacy-preserving
5. MEASURABLE
6. REVERSIBLE or explicitly safe-forward
7. PROVABLE by fresh evidence

A successful build never substitutes for user value, runtime verification or safety evidence.
## 2. Authority order

When rules conflict, use this order:

1. platform, legal and safety requirements;
2. this document;
3. explicit current user authorization within higher rules;
4. accepted project constitutions, ADRs and machine-readable policies;
5. current repository, tests, CI/CD and runtime evidence;
6. README and other project documentation;
7. routed engineering skills and shelfbook sources as methodology or supporting evidence;
8. assumptions and heuristics.

Project truth outranks generic methodology. Shelfbook and derived sources never silently override the repository.
Runtime policy may further restrict an otherwise user-approved effect. A denied runtime effect stays denied.

## 3. Truth and lifecycle

Use explicit states: PROPOSED, APPROVED, IMPLEMENTING, IMPLEMENTED, VERIFYING, VERIFIED,
RELEASED, VALIDATED, BLOCKED, FAILED, ROLLED_BACK and RETIRED.

Never collapse these states. APPROVED is not IMPLEMENTED. IMPLEMENTED is not VERIFIED.
VERIFIED is not RELEASED. RELEASED is not proof of user outcome.

Claims such as secure, production-ready, complete or world-class require scoped criteria and evidence.
Unknowns remain UNKNOWN rather than being promoted by confidence or convenience.
## 4. Product invariants

Pansofie is one product core with distinct adult, Young and GO experiences.
The canonical learning structure is 16 areas, 7 development paths and the cycle
`LEARN → PLAY → DO → CREATE → SHARE → REFLECT`.

For public communication the visitor flow may be simplified to
`POZNEJ → VYZKOUŠEJ → VYTVOŘ → SDÍLEJ → ZMĚŇ`, without changing the learning core.

Young authorization boundaries remain 6–13 and 14–20. Explore 6–9, Quest 10–13 and
Impact 14–20 are presentation modes only, never independent authorization boundaries.

Pansofie offers opportunity, not obligation. Browse-first participation is the default.
Evidence and reflection stay optional for ordinary participation unless a specifically verified
skill, credential or portfolio outcome requires richer proof.

No personal reputation score, public human ranking, pseudo-psychological percentage or XP-as-worth model is allowed.
XP, if used, is a game progression signal only and is never money, competence or human value.

Demo entities and model projects must be labelled as such. The product must not invent impact,
partnership, location, certification, legal readiness or operational scale.
## 5. Child safety, identity and privacy

Young must not expose public child discovery, nearby-people search, exact public child location,
open messaging to unknown adults or default-public child portfolios.

Guardian relationships, organization memberships, roles and RLS are authorization controls.
Frontend presentation state is never an authorization mechanism.
Family Team preserves individual identities; shared family login is not a substitute for account relationships.

Collect the minimum personal data required for a defined purpose. Do not retain precise location by default.
Child, guardian, profile, evidence and portfolio data are sensitive product data and require least privilege.

Authenticated actions derive user identity from trusted server/session claims, not client-supplied user IDs.
Both allowed and denied authorization paths must be testable for high-risk flows.

Secrets must never be pasted into chat, committed to Git, written to evidence receipts or printed from environment files.
Use secret references and local/managed stores. Secret creation, rotation and access changes require separate authority.

Legal and safety copy remains a working candidate until operator identity, processors and qualified review are complete.
Engineering documentation must not upgrade a legal candidate into a legal conclusion.

## 6. Data and database boundaries

Production Supabase is separate from local verification. Production is never an experimental test database.
Never run `supabase db reset --linked` against production and never use synthetic seed data there.

Before production schema change require a clean local migration chain, RLS/pgTAP tests, database lint,
actual SQL diff review, compatibility analysis against live history, rollback or safe-forward plan and explicit production approval.
## 7. Change workflow

Every material work block follows:

`DISCOVER → SHAPE → APPROVE → IMPLEMENT → VERIFY → RELEASE → VALIDATE`

Use the smallest coherent slice. Preserve unrelated dirty work and never reset, stash away or discard
existing work merely to make the repository look tidy.

Before mutation record repository root, branch, HEAD, status, applicable authority files, test entrypoints,
main risk, rollback path and exact approved effects.

Evidence belongs under `/Users/eimyna/0_EVIDENCE/PANSOFIE/`, not in the product repository,
unless a project artifact itself is the approved deliverable.

Implementation must reuse canonical domain models instead of creating parallel engines for missions,
projects, evidence, portfolio, identity, authorization or impact.

Accessibility is a release property, not decoration. Relevant UI changes require keyboard/focus behavior,
responsive layouts, reduced-motion handling, understandable error states and age-appropriate cognitive load.

## 8. Verification gate

Run only relevant checks, but never omit a relevant high-risk gate to save time.
The default application gate is `npm run check` plus ESLint and `git diff --check` when applicable.

For UI changes add browser verification at representative mobile, tablet and desktop widths,
including overflow, console errors, page errors and critical interaction paths.

For auth, child-safety, RLS or persistence changes add isolated local integration tests with synthetic accounts.
Never use production personal data for verification.
Verification evidence must bind to the exact source state and environment tested.
A raw test count is supporting data, not proof of product outcome by itself.

## 9. Git, commit and push

Git mutations require explicit operator authorization. When authorized, commit only an internally coherent,
verified state. Do not push a commit that depends on unstaged or uncommitted required files.

Before commit run the relevant verification gate and inspect `git diff --check`, staged scope and status.
Commit messages describe the product or governance outcome, not vague activity.

Push only the intended branch/revision. Network access does not authorize release or deployment.
Default-branch mutation must not silently bypass repository protection or review requirements.

## 10. Release and deployment

Build success, release readiness, deployment execution and production validation are separate decisions.
A deploy requires an exact target environment, immutable source revision/artifact, current evidence,
health/readiness criteria, rollback target and explicit scoped authorization.

Runtime governance may deny deploy or release even when the operator has approved it. In that case stop,
record `BLOCKED_BY_RUNTIME_POLICY`, and do not work around the control through another provider or credential.

Do not rebuild different artifacts per environment when promotion identity matters.
Production data migrations, permission changes, secret changes, DNS changes and destructive operations
remain separately protected even inside a broader deployment approval.

After any permitted deployment, verify the effective revision and critical user paths before claiming RELEASED or VALIDATED.

## 11. Incident and rollback

For harmful or uncertain production behavior use:
`CONTAIN → STABILIZE → PRESERVE EVIDENCE → RECOVER → VERIFY → REVIEW`.
Rollback must not create a larger data, identity or privacy failure than the original issue.
## 12. Current Pansofie acceptance floor

The repository remains a product prototype until release evidence proves otherwise.
Current canonical experience routing is:

- adult personal/family/school/company through `/app/*`;
- Young 6–13 through `/young/kids`;
- Young 14–20 through `/young/teens`;
- GO as the action/application layer over the shared core.

The current Young product must keep Explore, Quest and Impact age-appropriate while using real account context,
canonical missions/projects and privacy-safe progress. Fake people, fake achievements, fake impact and fake live chat are forbidden.

The current public product must keep adult Pansofie editorial and trustworthy, while Young and GO may be more playful.
Visual distinction must not fragment canonical domain data or authorization.

## 13. Required closure receipt

Every completed material block records:

- goal and approved scope;
- baseline branch and HEAD;
- files and systems changed;
- exact checks executed and results;
- browser/database/security evidence where relevant;
- known gaps and residual risk;
- commit/push/release/deploy identifiers if actually executed;
- rollback instructions;
- explicit statement of effects that were not executed.

This document may be changed only by an explicit operator-approved governance change.
Project runtime, repository evidence and higher platform safety rules always remain able to impose stricter limits.
