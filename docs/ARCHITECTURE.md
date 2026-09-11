# Pansofie - canonical experience architecture

Date: 2026-09-08
Deployment: https://pansofie-staging.vercel.app
Vercel project: `voodoo-caser/pansofie-staging`
Supabase project: `zngojpdmbuktwfuezmxc`

Pansofie is one Next.js 16 App Router application backed by one Supabase project. It exposes six distinct UX experiences while keeping presentation independent from authorization.

```text
auth.users
   |
   v
profiles + organization_memberships + guardian_relationships
   |
   v
resolveExperience()
   |
   |-- adult_personal  -> /app/personal
   |-- adult_family    -> /app/family
   |-- adult_school    -> /app/school
   |-- adult_company   -> /app/company
   |-- young_kids      -> /young/kids
   `-- young_teens     -> /young/teens
```

## Canonical age split

- Young Kids: 6-13
- Young Teens: 14-20
- Adult experiences: 21+

Age is evaluated before adult account context so a young user does not fall into an adult UI merely because the account is related to a family, school, or company.

## Experience is not authorization

`Experience` determines which UX layer is rendered. It does not grant access to data. Authorization remains controlled by canonical database state, memberships/guardian relationships, and Supabase RLS.

No authorization decisions are made from `user_metadata`.

## UX modes

| UX mode | Route | Resolution source |
| --- | --- | --- |
| `adult_personal` | `/app/personal` | Adult user with `account_context = 'personal'` |
| `adult_family` | `/app/family` | Adult user with `account_context = 'family'` |
| `adult_school` | `/app/school` | Adult user with `account_context = 'school'` or active school organization |
| `adult_company` | `/app/company` | Adult user with `account_context = 'company'` or active company organization |
| `young_kids` | `/young/kids` | User aged 6-13 |
| `young_teens` | `/young/teens` | User aged 14-20 |

## Public routes

The original React prototype is preserved as a client-only legacy layer under `src/legacy-pages` and loaded through `src/app/[[...legacy]]/page.jsx`.

Important public routes include:

| Route | Purpose |
| --- | --- |
| `/` | Public Pansofie homepage |
| `/young` | Public Pansofie Young landing page |
| `/young/mise` | Public Young missions prototype |
| `/vize`, `/knihovna`, `/osobni-rust`, `/digitalni-kompost`, `/mapa-kolobehu` | Existing public prototype routes |

## Auth flow

Supabase SSR is implemented with `@supabase/ssr`.

Key files:

| File | Purpose |
| --- | --- |
| `proxy.js` | Protects authenticated routes and refreshes Supabase auth state with `getClaims()` |
| `src/lib/supabase/server.js` | Creates the server Supabase client with Next cookies |
| `src/lib/supabase/client.js` | Creates the browser Supabase client |
| `src/lib/supabase/proxy.js` | Creates the proxy Supabase client |
| `src/app/login/actions.js` | Login and signup server actions |
| `src/app/onboarding/actions.js` | Calls `complete_onboarding` after first login |
| `src/domain/user-context.js` | Loads profile, organization, membership and resolves UX |
| `src/domain/experience.js` | Contains age and UX resolution rules |

Protected routes redirect unauthenticated users to `/login`. After login, `/app` resolves the user's profile and redirects to the correct UX route.

## Current Supabase model

The deployed project uses the existing schema rather than duplicate `spaces` tables:

- `profiles`
- `organizations`
- `organization_memberships`
- `guardian_relationships`
- `user_roles`

Added profile fields:

| Column | Purpose |
| --- | --- |
| `display_name` | User-facing short name |
| `date_of_birth` | Used only to resolve age-appropriate UX |
| `account_context` | `personal`, `family`, `school`, `company`, or `young` |
| `active_organization_id` | Active organization context for school/company/family-style spaces |
| `onboarding_completed_at` | Marks onboarding completion |

## Onboarding RPC

`public.complete_onboarding(text, text, text, date)` is a controlled `SECURITY DEFINER` function.

It is required because the existing RLS model allows only admins to create organizations and memberships directly. The RPC grants authenticated users a narrow onboarding path:

- validates the current authenticated user with `auth.uid()`
- validates account context and date of birth
- creates a profile if missing
- creates an organization only for `family`, `school`, and `company`
- creates one active membership for that organization
- marks onboarding as complete
- is executable by `authenticated`
- is not executable by `anon` or `public`

## Server routing

The server uses Supabase SSR, loads the authenticated profile and active organization membership, resolves the experience, and redirects `/app` to the matching route. Protected layouts call `requireUserContext(expectedExperience)` before rendering.

## Young UX shells

Authenticated Young experiences use dedicated shells:

- `KidsShell` for `/young/kids`
- `TeensShell` for `/young/teens`

They have distinct navigation, typography, composition, and responsive behavior while sharing the same authentication/data infrastructure.

## Environment

Vercel production uses:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable browser/server SSR key |

A service-role key is not required in the browser or ordinary user-facing runtime. `SUPABASE_SERVICE_ROLE_KEY` should not be exposed to the frontend.

## Deployment

The project is deployed from GitHub:

| Setting | Value |
| --- | --- |
| GitHub repo | `eimyroot/Pansofie` |
| Branch | `main` |
| Vercel framework | `nextjs` |
| Build command | `npm run build` |
| Output directory | automatic |
| Node version | `24.x` |

The old Vite `vercel.json` rewrite to `/index.html` was removed because it is incompatible with Next.js App Router.

## Verification status

Verified on 2026-09-08:

| Check | Result |
| --- | --- |
| Local `npm run check` | Pass |
| Unit tests | 6/6 pass |
| Next production build | Pass |
| Vercel deployment from commit `8cb3ceb` | Ready |
| `/` | `200` |
| `/login` | `200` |
| `/young` | `200` |
| `/app` without session | `307` to `/login` |
| `/young/kids` without session | `307` to `/login` |
| `/young/teens` without session | `307` to `/login` |
| Adult personal onboarding data flow | Pass |
| Adult family onboarding data flow | Pass |
| Adult school onboarding data flow | Pass |
| Adult company onboarding data flow | Pass |
| Young kids onboarding data flow | Pass |
| Young teens onboarding data flow | Pass |
| Authenticated `/app` resolver for all six modes | Pass |
| Target UX route for all six modes | `200` |
| Vercel runtime errors after deployment | None observed |

## Test accounts

Six confirmed staging test accounts were created on 2026-09-08 with the email pattern:

`no-reply+<mode>-1788892525220@pansofie.cz`

Created modes:

- `adult_personal`
- `adult_family`
- `adult_school`
- `adult_company`
- `young_kids`
- `young_teens`

These are staging verification accounts and should not be used as real user accounts.

## Remaining work

- Add a product-level UI for switching active organization contexts.
- Add guardian invitation and verification flows on top of `guardian_relationships`.
- Add a logout action in the authenticated shell.
- Add browser-level regression tests when Playwright or another browser runner is available.
- Decide whether staging test accounts should be retained or removed after QA.
