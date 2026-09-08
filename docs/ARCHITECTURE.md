# Pansofie — canonical experience architecture

## Core principle

Pansofie is one Next.js application backed by one Supabase project. It exposes six distinct UX experiences while keeping permissions independent from presentation.

```text
auth.users
   │
   ▼
profiles + organization_memberships + guardian_relationships
   │
   ▼
resolveExperience()
   │
   ├── adult_personal  → /app/personal
   ├── adult_family    → /app/family
   ├── adult_school    → /app/school
   ├── adult_company   → /app/company
   ├── young_kids      → /young/kids
   └── young_teens     → /young/teens
```

## Canonical age split

- Young Kids: 6–13
- Young Teens: 14–20
- Adult experiences: 21+

Age is evaluated before adult account context so a young user does not fall into an adult UI merely because their account is related to a family, school or company.

## Experience is not authorization

`Experience` determines which UX layer is rendered. It does not grant access to data.

Authorization depends on the canonical database state and RLS policies. For example, rendering `adult_school` does not itself authorize access to school data; the user must also have an active membership in the relevant organization and the database policy must allow the requested operation.

## Current Supabase model

The deployed project uses the existing canonical schema instead of introducing duplicate `spaces`/`memberships` tables:

- `profiles`
- `organizations`
- `organization_memberships`
- `guardian_relationships`

The onboarding flow stores profile context in the canonical tables and uses `public.complete_onboarding` for controlled onboarding writes.

## Server routing

The server reads the authenticated identity with Supabase SSR, loads the current profile and active organization membership, resolves the experience, then redirects from `/app` to the matching route.

Protected experience layouts call `requireUserContext(expectedExperience)` before rendering their UX shell.

## UX shells

Adult experiences currently use the shared experience infrastructure where appropriate.

Young experiences use dedicated shells:

- `KidsShell` for `/young/kids`
- `TeensShell` for `/young/teens`

The two Young shells have separate navigation, typography, composition, page framing and responsive behavior while reusing the same auth and data infrastructure.

## Environment

The server/client Supabase integration uses:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

No service-role key is required in the browser or for the ordinary user-facing Next.js runtime.

## Deployment policy

Changes progress through:

```text
candidate branch
  → build/tests
  → preview / smoke test
  → merge to main
  → Vercel deployment
  → route + auth verification
```

A visual change must not weaken RLS, membership verification, guardian relationships or onboarding security.
