# PanSofie — UX evolution implementation plan (2026-10-21)

Status: proposed; no production changes.

## Source of truth
- `docs/PANSOFIE_DESIGN_CONTRACT_01.md` is LOCKED; Mockup 01 wins on visual fidelity except necessary accessible/functional adaptations.
- Preserve 7 paths and 16 areas as recurring ecosystem grammar.
- Palette: #1B4D3A, #6B8B58, #A7B99A, #D7B899, #FAF7EF, #2F2F2F.
- Fraunces + Inter; editorial atlas, nodes, relationships, documentary imagery. No generic SaaS cards or unrelated stock.

## Workstreams and acceptance gates
1. **Route and persona inventory (P0):** Map public, adult, family, school, organisation, Young, GO journeys. Record route, persona, auth requirements, primary CTA, empty/error/loading states and current design generation. Gate: every shipped route has an owner and primary next action.
2. **Visual baseline (P0):** Capture desktop/tablet/mobile viewport matrix and compare to Mockup 01; record deviations and evidence. Gate: no undocumented legacy fallback, no horizontal overflow, accessible contrast and keyboard navigation.
3. **Navigation and onboarding (P1):** Shared ecosystem IA with contextual entry points; avoid mixing institutional and personal navigation. Gate: representative journeys can be completed without dead ends.
4. **Component consolidation (P1):** Inventory mockup01/public-v2/r8/r9/young/go usages before removal; create shared tokens and primitives while keeping Young age-appropriate. Gate: no accidental regression in visual identity or behavior.
5. **Functionality (P1):** Validate sign-in, persistence, authorization boundaries, maps, missions, compost and institutional flows against test accounts. Gate: E2E happy paths + denial/error cases pass.
6. **Release (P1):** Run `npm run lint`, `npm run check`, viewport captures and manual visual fidelity review; deploy preview, review, then merge. Never auto-promote to production.

## Risks
- Next.js App Router and react-router-dom coexist: establish actual runtime usage before refactoring.
- Supabase authorization and child-facing Young features need explicit access-control and privacy tests.
- Vercel staging has SSO protection; READY means build deployment status, not successful UX verification.

## First implementation slice
After collecting route/component inventory and screenshots, update the public homepage navigation and entry CTAs in the existing visual language, with a minimal regression test. Separate follow-up PRs for Young, institutional journeys and account flows.

## Rollback
Each slice stays in an isolated PR; no direct edits to main or production. Revert the relevant merge commit if a regression escapes review.
