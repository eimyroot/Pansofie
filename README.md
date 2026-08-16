# PANSOFIE

> Poznej sebe. Tvoř s druhými. Zlepšuj svět.

PANSOFIE is a system of lifelong development through real-world experiences that connects school, family and community so that a person can discover, act, document, reflect, transfer learning and contribute.

## Canonical product baseline

The governed product Source of Truth is in [`docs/canonical/`](docs/canonical/README.md).

Canonical product loop:

```text
ČLOVĚK → MISE → SKUTEČNÁ ZKUŠENOST → DŮKAZ → REFLEXE → PORTFOLIO → SPOLUPRÁCE → DOPAD
```

Technology supports the method; it does not define the method. Older product concepts are historical/exploratory when they conflict with the canonical V1.0 baseline unless explicitly promoted through a governed decision.

## Stack

- React + React Router
- Vite
- Tailwind CSS
- Supabase Auth + PostgreSQL/RLS
- TanStack Query
- Recharts
- Lucide React

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Set these public browser variables in `.env.local`:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Never commit the Supabase service-role key or other server secrets.

## Authentication

Member login:

```text
/login
```

Admin login:

```text
/admin/login
```

Member routes are protected by an authenticated Supabase session. Admin routes additionally require `user_roles.role = 'admin'`.

Apply the SQL migration in `supabase/migrations/20260808130500_auth_profiles_roles.sql` before using authentication.

To promote a trusted account to administrator, use a trusted SQL/admin environment after that user has registered:

```sql
insert into public.user_roles (user_id, role)
values ('USER_UUID', 'admin')
on conflict (user_id) do update set role = excluded.role;
```

Do not expose an admin-role write operation to normal browser clients.

## Build

```bash
npm run build
```

## Deployment

`render.yaml` defines the static frontend deployment and expects `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to be configured in the hosting environment.

## Product-data status

The current mission, project, event and network catalog in `src/lib/pansofieData.js` is prototype/sample content. Authenticated identity is no longer taken from the sample user: dashboard, development view and profile use the real signed-in account.
