# PANSOFIE R16 — Svědci nápravy / Witness Verification

**Status:** PROPOSED until merged and the server-side migration/function are deployed to the canonical PANSOFIE Supabase project.

## Purpose

R16 lets an external adult witness confirm or challenge one concrete real-world action without requiring a Pansofie account. It is a supporting evidence mechanism, not a rating system.

## Canonical flow

`email invitation → review page → explicit human decision → one-time token consume → audit event → thank-you page`

Opening an email link never changes state. Email security scanners and link previews may follow GET requests automatically, so mutation requires an explicit POST decision from the review page.

## Token contract

- raw bearer token exists only in the invitation URL/browser session;
- Postgres stores only a SHA-256 hash;
- requests have a hard expiry;
- tokens are one-time use;
- after a decision, the frontend replaces the browser URL so the raw token is no longer visible;
- witness tables have RLS enabled and no anon/authenticated browser policy;
- preview/consume RPCs are executable only by `service_role` through the Edge Function.

## What a witness confirms

A witness confirms only whether the described action/output can be attested from their direct knowledge. The witness does **not**:

- grade the person;
- assign XP, points, badges, or a person score;
- set an `experienceLevel`;
- directly mutate R15 Experience Fan depth;
- directly set `portfolio_items.verified_at`;
- replace the governed school review/finalization flow.

A `needs_revision` decision records why the described evidence needs clarification. It does not mark the participant as having failed.

## UI states

Public route: `/potvrzeni-zkusenosti`

The mobile-first page supports:

- secure loading / preview;
- pending review with Mission, evidence description and participant reflection;
- explicit **Confirm** action;
- explicit **Return for clarification** action with bounded note;
- confirmed thank-you;
- returned-for-clarification thank-you;
- expired token;
- already-used token;
- invalid/revoked token;
- backend-unavailable fail-closed state.

The result page invites an adult to learn more or join the pilot, but does not require registration and does not claim that public account creation is open.

## Runtime

Pansofie remains **React/Vite + Supabase/Postgres**. R16 adds one Supabase Edge Function (`evidence-witness`); it does not introduce Next.js, Prisma, or a second evidence database.

## Deployment boundary

Repository merge is not proof that witness verification is live. Production claims require all of the following:

1. R16 SQL migration applied to the canonical PANSOFIE Supabase project;
2. `evidence-witness` Edge Function deployed;
3. `PANSOFIE_PUBLIC_ORIGIN` configured;
4. an email delivery/provider path configured separately;
5. end-to-end token preview + explicit decision verified against staging.

Email delivery and request issuance are intentionally not claimed complete by this page-only release.
