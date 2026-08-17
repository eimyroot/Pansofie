# PANSOFIE SCHOOL R1 — AUTHENTICATED STAGING VERIFIED

Date: 2026-08-17
Environment: staging only
Canonical app baseline verified: `a91bc3fd6ae8d20938c718e85f27370d4cbcb778`
Staging app: `https://pansofie-staging.vercel.app`
Staging Supabase project: `zngojpdmbuktwfuezmxc`
Production: NOT TOUCHED

## Verdict

**AUTHENTICATED STAGING VERIFIED**

The first real PANSOFIE SCHOOL product loop has passed browser-level acceptance on the isolated staging environment.

Verified lifecycle:

`/pilot → login → /skola → teacher assignment → learner start → evidence → reflection → submit → teacher review → needs_revision → learner feedback/revision → resubmit → evidence/reflection confirmation → mission confirmation → Experience finalization → private Passport`

## Acceptance evidence

### Public/auth boundary

PR #16 introduced reproducible Playwright staging acceptance and verified:

- direct `/pilot` deep-link;
- primary CTA to governed login return path;
- unauthenticated `/skola` fail-closed redirect;
- mobile viewport without horizontal overflow;
- zero observed page errors / governed HTTP 5xx on the tested public/auth path.

### Authenticated School flow

Real Chromium E2E used isolated synthetic `teacher` and `learner` identities and exercised the complete learner/teacher lifecycle.

The browser acceptance uncovered and closed two real product defects before final verification:

1. PR #17 — purpose-scoped assignable learner directory. Generic `profiles` RLS remained private; the fix added a minimal governed RPC instead of broadening profile access.
2. PR #18 — teacher review content visibility. Existing purpose-scoped RLS was already correct; the frontend was changed so a teacher can actually see the evidence/reflection returned by those policies. Product-facing review language and learner revision feedback were also improved.

Final browser run:

- workflow: `Authenticated School E2E Ephemeral R3`;
- run id: `31998857995`;
- conclusion: `success`;
- runtime target: staging deployment of canonical `main` baseline `a91bc3fd6ae8d20938c718e85f27370d4cbcb778`.

## Security and privacy boundaries preserved

- generic `profiles` RLS was not relaxed;
- evidence and reflection review remain separate purpose-scoped capabilities;
- teacher feedback is a separate review record and does not overwrite learner-authored content;
- `needs_revision` reopens the run through the governed lifecycle and invalidates stale positive review state;
- final Passport entry is private by default;
- no human score or AI evaluation of the learner was introduced;
- production deployment remained out of scope.

## Synthetic fixture cleanup

After the successful R3 acceptance run, all temporary staging fixture data was removed atomically under fixed reserved E2E identifiers.

Post-cleanup verification returned zero rows for:

- synthetic `auth.users` and `auth.identities`;
- synthetic profiles;
- organization memberships;
- processing-basis records;
- mission runs;
- Experiences;
- Passport items;
- E2E mission;
- E2E organization.

The temporary `pansofie_private.staging_e2e_credentials` table was dropped. Therefore all credentials used by the ephemeral browser runs are invalid.

Cleanup operation: `staging_e2e_acceptance_cleanup_20260817` on staging only.

## Ephemeral Git refs

The GitHub connector available during closeout did not expose branch-ref deletion. To remove active credential-bearing test tips, these refs were force-reset to the exact canonical `main` SHA:

- `test/authenticated-school-e2e-ephemeral-r1`
- `test/authenticated-school-e2e-ephemeral-r2`
- `test/authenticated-school-e2e-ephemeral-r3`

All three compare as `identical` to `main` (`ahead_by=0`, `behind_by=0`). The historical test credentials are additionally unusable because the synthetic Auth users were deleted.

Physical deletion of those now-neutral branch names is optional repository hygiene, not an acceptance or security blocker.

## R1 gate status

| Gate | Status |
| --- | --- |
| Public `/pilot` | PASS |
| CTA → login | PASS |
| Auth redirect | PASS |
| Unauthorized `/skola` boundary | PASS |
| Mobile public layout | PASS |
| Teacher assignment | PASS |
| Learner start | PASS |
| Evidence | PASS |
| Reflection | PASS |
| Submit | PASS |
| Teacher evidence/reflection visibility | PASS |
| Needs-revision loop | PASS |
| Learner feedback visibility | PASS |
| Resubmit | PASS |
| Teacher confirmation | PASS |
| Experience finalization | PASS |
| Private Passport | PASS |
| Synthetic fixture cleanup | PASS |
| Production untouched | PASS |

## Next product gate

R1 is closed for authenticated staging acceptance. The next slice should be chosen as product work, not additional acceptance infrastructure, unless new pilot requirements introduce a new risk boundary.
