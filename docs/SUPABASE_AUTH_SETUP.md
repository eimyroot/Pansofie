# PANSOFIE — Supabase Auth Setup

## 1. Create or select a Supabase project

Copy these two public values from Supabase project settings:

- Project URL
- anon/public key

Put them in local `.env.local`:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Never place the service-role key in a Vite environment variable or browser code.

## 2. Apply the database migration

Run:

```text
supabase/migrations/20260808130500_auth_profiles_roles.sql
```

The migration creates:

- `profiles`
- `user_roles`
- RLS policies
- `is_admin()` authorization helper
- automatic profile/member-role creation for newly registered users

## 3. Configure Auth URLs

For local development allow:

```text
http://localhost:5173
http://localhost:5173/**
```

For production add the real PANSOFIE web origin and its callback paths.

If Google sign-in is enabled, configure the Google provider in Supabase Auth and add the callback URL supplied by Supabase to the Google OAuth client.

## 4. Create the first administrator

Register the administrator as a normal user first. Then retrieve the UUID in a trusted Supabase SQL/admin environment:

```sql
select id, email, created_at
from auth.users
order by created_at desc;
```

Promote only the intended account:

```sql
insert into public.user_roles (user_id, role)
values ('USER_UUID', 'admin')
on conflict (user_id)
do update set role = excluded.role;
```

Admin login is intentionally separate:

```text
/admin/login
```

A normal member account is rejected by the admin login and cannot access `/admin/*`.

## 5. Expected access model

```text
PUBLIC
/                 public website
/login            member login
/register         member registration
/admin/login      admin login

MEMBER ONLY
/dashboard
/mise/*
/rozvoj
/portfolio
/projekty/*
/sit
/udalosti
/zpravy
/profil

ADMIN ONLY
/admin/*
```

## 6. Acceptance checks

1. Anonymous user opening `/dashboard` is redirected to `/login`.
2. Anonymous user opening `/admin` is redirected to `/admin/login`.
3. New member account sees its real name/e-mail and zeroed personal development profile, not demo identity data.
4. Member account cannot open `/admin`.
5. Admin account can sign in at `/admin/login` and open `/admin`.
6. Password reset works through Supabase recovery e-mail.
7. No service-role key is present in the repository or browser bundle.
