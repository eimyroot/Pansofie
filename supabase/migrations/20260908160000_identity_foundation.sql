begin;

-- Canonical identity/organization foundation for zero-cost local resets.
-- The table shapes below are aligned with the verified live PANSOFIE schema.
-- Existing production tables are never replaced because every create is
-- guarded by IF NOT EXISTS.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  location text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  organization_type text not null
    check (organization_type in ('school', 'municipality', 'ngo', 'community', 'company')),
  country_code text not null default 'CZ'
    check (char_length(country_code) = 2),
  status text not null default 'active'
    check (status in ('pending', 'active', 'suspended', 'archived')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null
    check (role in ('learner', 'teacher', 'coordinator', 'mentor', 'staff', 'partner_contact')),
  status text not null default 'invited'
    check (status in ('invited', 'active', 'suspended', 'ended')),
  joined_at timestamptz,
  ended_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, user_id, role)
);

create table if not exists public.guardian_relationships (
  id uuid primary key default gen_random_uuid(),
  child_user_id uuid not null references auth.users(id) on delete cascade,
  guardian_user_id uuid not null references auth.users(id) on delete cascade,
  relationship_kind text not null
    check (relationship_kind in ('parental_responsibility_holder', 'guardian', 'caregiver', 'other')),
  status text not null default 'pending'
    check (status in ('pending', 'verified', 'revoked')),
  verification_method text
    check (verification_method in ('email_link', 'school_attestation', 'manual_admin', 'other')),
  verified_by uuid references auth.users(id) on delete set null,
  verified_at timestamptz,
  revoked_at timestamptz,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (child_user_id <> guardian_user_id),
  check (status <> 'verified' or verified_at is not null),
  check (status <> 'revoked' or revoked_at is not null),
  unique (child_user_id, guardian_user_id)
);

create index if not exists organizations_type_status_idx
  on public.organizations(organization_type, status);
create index if not exists organization_memberships_user_status_idx
  on public.organization_memberships(user_id, status);
create index if not exists organization_memberships_org_status_idx
  on public.organization_memberships(organization_id, status);
create index if not exists guardian_relationships_guardian_status_idx
  on public.guardian_relationships(guardian_user_id, status);
create index if not exists guardian_relationships_child_status_idx
  on public.guardian_relationships(child_user_id, status);

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.guardian_relationships enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'profiles_owner_read'
  ) then
    create policy profiles_owner_read
      on public.profiles
      for select
      to authenticated
      using (id = (select auth.uid()));
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'organization_memberships'
      and policyname = 'organization_memberships_self_read'
  ) then
    create policy organization_memberships_self_read
      on public.organization_memberships
      for select
      to authenticated
      using (user_id = (select auth.uid()));
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'organizations'
      and policyname = 'organizations_active_member_read'
  ) then
    create policy organizations_active_member_read
      on public.organizations
      for select
      to authenticated
      using (
        exists (
          select 1
          from public.organization_memberships membership
          where membership.organization_id = organizations.id
            and membership.user_id = (select auth.uid())
            and membership.status = 'active'
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'guardian_relationships'
      and policyname = 'guardian_relationships_party_read'
  ) then
    create policy guardian_relationships_party_read
      on public.guardian_relationships
      for select
      to authenticated
      using (
        guardian_user_id = (select auth.uid())
        or child_user_id = (select auth.uid())
      );
  end if;
end
$$;

-- Ordinary clients only need reads at this layer. Creation/mutation is routed
-- through reviewed RPCs such as complete_onboarding or later governed flows.
revoke all on public.profiles from anon, authenticated;
revoke all on public.organizations from anon, authenticated;
revoke all on public.organization_memberships from anon, authenticated;
revoke all on public.guardian_relationships from anon, authenticated;

grant select on public.profiles to authenticated;
grant select on public.organizations to authenticated;
grant select on public.organization_memberships to authenticated;
grant select on public.guardian_relationships to authenticated;

commit;
