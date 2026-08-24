# PANSOFIE Navigation Contract v1.0

Status: CANONICAL DRAFT FOR IMPLEMENTED SURFACES
Release: R23

## Purpose

This document separates three things that must never be mixed in public copy or implementation:

1. a route that exists now,
2. an action that is implemented now,
3. a future product idea.

A button must not imply a database mutation, account state, verification result, reward, geolocation capability or child-access flow that the current implementation cannot prove.

## 1. Public entry and demos

### `/`

Current public home.

- The public navigation CTA `Vyzkoušet 60 s` uses `/pro-koho#ochutnejte`.
- The older home Experience Story may still expose the bounded `/zapojit-se?mode=simulator` path. This remains a compatibility path, not a verified Experience.
- Neither public demo writes a verified Experience or Passport record.

Canonical public Taste destination for new CTAs: `/pro-koho#ochutnejte`.

### `/jak-funguje`

Explains the evidence cycle and the Experience Fan. The Fan on the public page is illustrative and is not a real profile.

### `/pansofiego`

Current PansofieGO is a bounded decision lab:

`analysis -> decision -> consequences -> reflection`

It does not currently provide GPS school search, a live school map, a school social feed, marketplace rewards or automatic Passport writes.

## 2. Authentication and participation

### Canonical sign-in

- canonical route: `/login`
- Czech compatibility alias: `/prihlaseni` -> `/login`
- authentication: Supabase email/password
- successful sign-in: safe `returnTo`, otherwise `/dashboard`
- incomplete onboarding: `/onboarding` first

The application does not use a Next.js `/api/auth/login` route.

### Registration

- canonical informational route: `/register`
- Czech compatibility alias: `/registrace` -> `/register`
- public self-service registration is closed during the governed pilot
- public participation request: `/zapojit-se`

The current product must not promise that submitting a public form creates an account.

### Dashboard routing

The authenticated landing route is `/dashboard`. Role-specific content is based on real memberships and permissions. The sign-in form must not hard-code a claim that every teacher, manager or environmental participant is automatically redirected into a fully operational specialist dashboard.

## 3. Member routes

Current authenticated routes include:

- `/dashboard`
- `/skola`
- `/skola/mise/:runId`
- `/skola/challenges`
- `/rodina`
- `/partner-workspace`
- `/materialovy-most/workspace`
- `/portfolio`
- `/profil`

### Not implemented as canonical routes yet

- `/profil/nastaveni`
- `/young/login`
- `/young/register`

The absence of these routes is intentional until their permissions, identity model and safety contract exist.

## 4. Material Bridge

### Public

- `/materialovy-most` explains the workflow.
- `/materialovy-most/zapojit-se` is the moderated public intake path.
- anonymous public intake does not automatically create an `AVAILABLE` listing.

### Authenticated workspace

`/materialovy-most/workspace`

Implemented lifecycle:

`AVAILABLE -> RESERVED -> HANDED_OVER`

or

`AVAILABLE/RESERVED -> CANCELLED`

Authenticated listing creation can create `AVAILABLE` after the membership and backend rules allow it.

Reservation uses the governed database RPC. Handover is recorded separately. The canonical status is `HANDED_OVER`, not `COMPLETED`.

A handover is not automatically evidence of later use or follow-up impact. Public stories require a real handover and explicit publication consent.

Material Bridge must not automatically increase a person's Experience Fan simply because a listing was offered, reserved or handed over.

## 5. Witness verification

Canonical route:

`/potvrzeni-zkusenosti?token=...`

Flow:

`email link -> review page -> explicit confirm / needs revision -> POST Edge Function -> one-time token consumption -> result page`

Security boundary:

- opening a link must not mutate verification state,
- the external witness token is time-limited and one-time,
- a witness confirms a concrete event or output, not a person,
- witness confirmation is supporting evidence,
- witness confirmation does not directly approve the Passport,
- witness confirmation does not directly change Experience Fan depth,
- witness confirmation does not award points, grain, badges or school currency.

The implementation must not be described as `Evidence.isVerified = true` from a click.

## 6. Profile, family and child identity

The following ideas are valid product candidates but are NOT current capabilities:

- one-hour parent/child pairing code,
- child picture/symbol login,
- class QR poster linking children into an Alliance,
- full JSON account export from `/profil/nastaveni`,
- self-service permanent account deletion from that same settings route.

Before implementation they require a separate child identity, consent, recovery, role-binding and abuse-prevention contract.

## 7. Location and school discovery

Future PansofieGO school discovery may include explicit geolocation permission and regional discovery, but it is not live today.

A future implementation must require:

- explicit browser location consent,
- a verified school/Alliance dataset,
- no exposure of child presence or live child counts,
- no public statement such as `34 classmates are online`,
- location minimization and safe distance presentation,
- a non-GPS fallback.

## 8. Private inspiration signal

`Tohle mě inspiruje` is a possible future interaction only if it remains non-competitive.

If implemented it must:

- expose no public count,
- create no ranking,
- create no Experience Fan depth,
- create no currency or reward points,
- be private to the recipient,
- include rate limits and abuse controls,
- never expose child-to-child private messaging as a side effect.

## 9. Explicitly rejected mechanics

The canonical product does not adopt:

- `zrnka moudrosti` as currency,
- school wallets based on child activity,
- reward marketplaces tied to Experience evidence,
- likes/hearts with public counters,
- person-level scores,
- automatic avatar rewards derived from hidden thresholds.

A visual symbol may only be considered when it is transparently linked to a concrete governed event and cannot be mistaken for a score of the person.

## 10. Current route truth table

| User intention | Canonical destination | Current truth |
| --- | --- | --- |
| Try Pansofie publicly | `/pro-koho#ochutnejte` | Public model flow, no verified write |
| Sign in | `/login` | Live frontend route; Supabase-backed when environment is configured |
| Czech sign-in link | `/prihlaseni` | Redirect to `/login` |
| Register | `/register` | Invitation-only information page |
| Czech registration link | `/registrace` | Redirect to `/register` |
| Ask to participate | `/zapojit-se` | Public intake / participation path |
| Learn methodology | `/jak-funguje` | Public method + illustrative Fan |
| Decision lab | `/pansofiego` | Bounded simulation only |
| Material Bridge public | `/materialovy-most` | Public explanation / verified-story surface |
| Material Bridge intake | `/materialovy-most/zapojit-se` | Moderated public intake |
| Material Bridge member workflow | `/materialovy-most/workspace` | Authenticated workflow; backend activation still environment-dependent |
| Witness one Experience | `/potvrzeni-zkusenosti` | R16 frontend; Edge Function required for live decision |
| Member dashboard | `/dashboard` | Authenticated role-aware surface |
| School workspace | `/skola` | Authenticated school surface |
| Profile | `/profil` | Authenticated profile surface |
| Child symbol login | none | Not implemented |
| GPS school discovery | none | Not implemented |

## Release rule

No navigation map, sales copy or demo may label a future route or proposed mutation as `hotovo`, `live`, `fully functional` or `production-ready` until browser, backend and environment verification all support that statement.
