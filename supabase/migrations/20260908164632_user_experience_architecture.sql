create type public.space_type as enum ('personal', 'family', 'school', 'company');
create type public.membership_role as enum ('owner', 'parent', 'child', 'teacher', 'student', 'employee', 'member', 'admin');
create type public.membership_status as enum ('invited', 'active', 'suspended');
create type public.guardian_status as enum ('pending', 'accepted', 'revoked');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 80),
  date_of_birth date check (date_of_birth <= current_date),
  active_space_id uuid,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.spaces (
  id uuid primary key default gen_random_uuid(),
  type public.space_type not null,
  name text not null check (char_length(name) between 1 and 120),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.memberships (
  user_id uuid not null references auth.users(id) on delete cascade,
  space_id uuid not null references public.spaces(id) on delete cascade,
  role public.membership_role not null,
  status public.membership_status not null default 'invited',
  created_at timestamptz not null default now(),
  primary key (user_id, space_id)
);

alter table public.profiles add constraint profiles_active_space_fk
  foreign key (active_space_id) references public.spaces(id) on delete set null;

create table public.guardian_links (
  guardian_user_id uuid not null references auth.users(id) on delete cascade,
  child_user_id uuid not null references auth.users(id) on delete cascade,
  status public.guardian_status not null default 'pending',
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  primary key (guardian_user_id, child_user_id),
  check (guardian_user_id <> child_user_id)
);

create index memberships_space_id_idx on public.memberships(space_id);
create index guardian_links_child_user_id_idx on public.guardian_links(child_user_id);

alter table public.profiles enable row level security;
alter table public.spaces enable row level security;
alter table public.memberships enable row level security;
alter table public.guardian_links enable row level security;

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create function private.is_active_space_member(requested_space_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.memberships m where m.space_id = requested_space_id and m.user_id = (select auth.uid()) and m.status = 'active');
$$;

create function private.is_accepted_guardian(requested_child_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.guardian_links g where g.child_user_id = requested_child_id and g.guardian_user_id = (select auth.uid()) and g.status = 'accepted');
$$;

revoke all on function private.is_active_space_member(uuid) from public, anon;
revoke all on function private.is_accepted_guardian(uuid) from public, anon;
grant execute on function private.is_active_space_member(uuid) to authenticated;
grant execute on function private.is_accepted_guardian(uuid) to authenticated;

create policy "profiles_select_self_or_guardian" on public.profiles for select to authenticated
using ((select auth.uid()) = id or private.is_accepted_guardian(id));
create policy "profiles_update_self" on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id and (active_space_id is null or private.is_active_space_member(active_space_id)));
create policy "spaces_select_member" on public.spaces for select to authenticated
using (private.is_active_space_member(id));
create policy "memberships_select_self_or_peer" on public.memberships for select to authenticated
using ((select auth.uid()) = user_id or private.is_active_space_member(space_id));
create policy "guardian_links_select_participant" on public.guardian_links for select to authenticated
using ((select auth.uid()) in (guardian_user_id, child_user_id));

create function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

create function public.complete_onboarding(
  requested_space_type public.space_type,
  requested_space_name text,
  requested_display_name text,
  requested_date_of_birth date default null
) returns uuid language plpgsql security definer set search_path = '' as $$
declare
  current_user_id uuid := (select auth.uid());
  new_space_id uuid;
  initial_role public.membership_role;
begin
  if current_user_id is null then raise exception 'authentication required'; end if;
  if char_length(trim(requested_display_name)) not between 1 and 80 then raise exception 'invalid display name'; end if;
  if requested_date_of_birth > current_date then raise exception 'invalid date of birth'; end if;
  if exists (select 1 from public.profiles where id = current_user_id and onboarding_completed) then raise exception 'onboarding already completed'; end if;

  initial_role := case requested_space_type when 'family' then 'parent'::public.membership_role else 'owner'::public.membership_role end;
  insert into public.spaces (type, name, created_by)
  values (requested_space_type, coalesce(nullif(trim(requested_space_name), ''), case requested_space_type when 'personal' then trim(requested_display_name) else 'Můj prostor' end), current_user_id)
  returning id into new_space_id;
  insert into public.memberships (user_id, space_id, role, status) values (current_user_id, new_space_id, initial_role, 'active');
  update public.profiles set display_name = trim(requested_display_name), date_of_birth = requested_date_of_birth,
    active_space_id = new_space_id, onboarding_completed = true, updated_at = now() where id = current_user_id;
  return new_space_id;
end;
$$;

revoke all on function public.complete_onboarding(public.space_type, text, text, date) from public, anon;
grant execute on function public.complete_onboarding(public.space_type, text, text, date) to authenticated;

grant select, update on public.profiles to authenticated;
grant select on public.spaces, public.memberships, public.guardian_links to authenticated;
