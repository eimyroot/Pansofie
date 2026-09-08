alter table public.profiles
  add column if not exists display_name text,
  add column if not exists date_of_birth date,
  add column if not exists account_context text not null default 'personal',
  add column if not exists active_organization_id uuid references public.organizations(id) on delete set null,
  add column if not exists onboarding_completed_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_account_context_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_account_context_check
      check (account_context in ('personal', 'family', 'school', 'company', 'young'))
      not valid;
  end if;
end $$;

alter table public.profiles validate constraint profiles_account_context_check;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_date_of_birth_not_future_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_date_of_birth_not_future_check
      check (date_of_birth is null or date_of_birth <= current_date)
      not valid;
  end if;
end $$;

alter table public.profiles validate constraint profiles_date_of_birth_not_future_check;

create index if not exists profiles_active_organization_id_idx on public.profiles(active_organization_id);

create or replace function public.complete_onboarding(
  requested_space_type text,
  requested_space_name text,
  requested_display_name text,
  requested_date_of_birth date default null
) returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  normalized_context text := lower(trim(requested_space_type));
  normalized_name text := nullif(trim(coalesce(requested_space_name, '')), '');
  normalized_display_name text := nullif(trim(coalesce(requested_display_name, '')), '');
  target_organization_id uuid;
  target_organization_type text;
  target_membership_role text;
  slug_base text;
begin
  if current_user_id is null then
    raise exception 'authentication required';
  end if;

  if normalized_context not in ('personal', 'family', 'school', 'company', 'young') then
    raise exception 'invalid account context';
  end if;

  if normalized_display_name is null or char_length(normalized_display_name) > 80 then
    raise exception 'invalid display name';
  end if;

  if requested_date_of_birth > current_date then
    raise exception 'invalid date of birth';
  end if;

  insert into public.profiles (id)
  values (current_user_id)
  on conflict (id) do nothing;

  if exists (
    select 1
    from public.profiles
    where id = current_user_id
      and onboarding_completed_at is not null
  ) then
    raise exception 'onboarding already completed';
  end if;

  if normalized_context in ('family', 'school', 'company') then
    target_organization_type := case normalized_context
      when 'family' then 'community'
      when 'school' then 'school'
      when 'company' then 'company'
    end;

    target_membership_role := case normalized_context
      when 'company' then 'staff'
      else 'coordinator'
    end;

    normalized_name := coalesce(normalized_name, normalized_display_name || ' - Pansofie');
    slug_base := lower(regexp_replace(normalized_name, '[^a-zA-Z0-9]+', '-', 'g'));
    slug_base := trim(both '-' from slug_base);
    if slug_base = '' then
      slug_base := 'pansofie';
    end if;

    insert into public.organizations (slug, name, organization_type, country_code, status, created_by)
    values (
      slug_base || '-' || substr(replace(current_user_id::text, '-', ''), 1, 8),
      normalized_name,
      target_organization_type,
      'CZ',
      'active',
      current_user_id
    )
    returning id into target_organization_id;

    insert into public.organization_memberships (organization_id, user_id, role, status, joined_at, created_by)
    values (target_organization_id, current_user_id, target_membership_role, 'active', now(), current_user_id)
    on conflict (organization_id, user_id, role) do nothing;
  end if;

  update public.profiles
  set display_name = normalized_display_name,
      full_name = coalesce(nullif(full_name, ''), normalized_display_name),
      date_of_birth = requested_date_of_birth,
      account_context = normalized_context,
      active_organization_id = target_organization_id,
      onboarding_completed_at = now(),
      updated_at = now()
  where id = current_user_id;

  return target_organization_id;
end;
$$;

revoke all on function public.complete_onboarding(text, text, text, date) from public, anon;
grant execute on function public.complete_onboarding(text, text, text, date) to authenticated;

grant select, update on public.profiles to authenticated;
grant select on public.organizations, public.organization_memberships, public.guardian_relationships to authenticated;
