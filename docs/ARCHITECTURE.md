# Pansofie — canonical experience architecture

Pansofie is one Next.js application backed by one Supabase project. It exposes six distinct UX experiences while keeping presentation independent from authorization.

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

Age is evaluated before adult account context so a young user does not fall into an adult UI merely because the account is related to a family, school or company.

## Experience is not authorization

`Experience` determines which UX layer is rendered. It does not grant access to data. Authorization remains controlled by canonical database state, memberships/guardian relationships and Supabase RLS.

## Current Supabase model

The deployed project uses the existing schema rather than duplicate `spaces` tables:

- `profiles`
- `organizations`
- `organization_memberships`
- `guardian_relationships`

## Server routing

The server uses Supabase SSR, loads the authenticated profile and active organization membership, resolves the experience and redirects `/app` to the matching route. Protected layouts call `requireUserContext(expectedExperience)` before rendering.

## Young UX shells

Authenticated Young experiences use dedicated shells:

- `KidsShell` for `/young/kids`
- `TeensShell` for `/young/teens`

They have distinct navigation, typography, composition and responsive behavior while sharing the same authentication/data infrastructure.

## Environment

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

A service-role key is not required in the browser or ordinary user-facing runtime.
