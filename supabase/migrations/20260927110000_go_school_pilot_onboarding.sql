begin;

-- Pilot onboarding keeps identity in auth.users and canonical memberships.
-- Invite links are single-use bearer tokens; only their SHA-256 digest is stored.
create table if not exists public.school_class_invites (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.organizations(id) on delete restrict,
  class_id uuid not null,
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  status text not null default 'active' check (status in ('active', 'accepted', 'revoked', 'expired')),
  expires_at timestamptz not null,
  created_by uuid not null references auth.users(id) on delete restrict,
  accepted_by uuid references auth.users(id) on delete restrict,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  foreign key (class_id, school_id)
    references public.school_classes(id, school_id) on delete restrict,
  constraint school_class_invites_acceptance_check check (
    (status = 'accepted' and accepted_by is not null and accepted_at is not null)
    or (status <> 'accepted' and accepted_by is null and accepted_at is null)
  )
);

create index if not exists school_class_invites_class_status_idx
  on public.school_class_invites(class_id, status, expires_at);
create index if not exists school_class_invites_school_status_idx
  on public.school_class_invites(school_id, status, expires_at);

alter table public.school_class_invites enable row level security;
revoke all privileges on table public.school_class_invites from public, anon, authenticated;

create or replace function public.create_school_class_invite(target_class_id uuid)
returns table (
  invite_token text,
  invite_expires_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid := auth.uid();
  resolved_school_id uuid;
  raw_token text;
  token_digest text;
  expiry timestamptz := now() + interval '48 hours';
begin
  if actor_id is null then
    raise exception 'Přihlášení je povinné.';
  end if;

  select sc.school_id
    into resolved_school_id
  from public.school_classes sc
  join public.organizations o on o.id = sc.school_id
  where sc.id = target_class_id
    and sc.status = 'active'
    and o.organization_type = 'school'
    and o.status = 'active';

  if resolved_school_id is null then
    raise exception 'Třída není dostupná.';
  end if;

  if not (
    public.is_admin()
    or public.is_school_class_coordinator(target_class_id)
    or public.is_school_class_staff(target_class_id)
  ) then
    raise exception 'Nemáš oprávnění vytvářet pozvánku do této třídy.';
  end if;

  raw_token := encode(extensions.gen_random_bytes(24), 'hex');
  token_digest := encode(extensions.digest(raw_token, 'sha256'), 'hex');

  insert into public.school_class_invites (
    school_id, class_id, token_hash, expires_at, created_by
  ) values (
    resolved_school_id, target_class_id, token_digest, expiry, actor_id
  );

  return query select raw_token, expiry;
end;
$$;

create or replace function public.accept_school_class_invite(invite_token text)
returns table (
  accepted_school_id uuid,
  accepted_class_id uuid,
  onboarding_required boolean
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid := auth.uid();
  normalized_token text := lower(trim(coalesce(invite_token, '')));
  token_digest text;
  invite_row public.school_class_invites%rowtype;
  needs_onboarding boolean;
begin
  if actor_id is null then
    raise exception 'Přihlášení je povinné.';
  end if;

  if normalized_token !~ '^[0-9a-f]{48}$' then
    raise exception 'Pozvánka není platná.';
  end if;

  token_digest := encode(extensions.digest(normalized_token, 'sha256'), 'hex');

  select * into invite_row
  from public.school_class_invites sci
  where sci.token_hash = token_digest
  for update;

  if invite_row.id is null then
    raise exception 'Pozvánka není platná.';
  end if;

  if invite_row.status = 'accepted' and invite_row.accepted_by = actor_id then
    select p.onboarding_completed_at is null
      into needs_onboarding
    from public.profiles p
    where p.id = actor_id;
    return query select invite_row.school_id, invite_row.class_id, coalesce(needs_onboarding, true);
    return;
  end if;

  if invite_row.status <> 'active' or invite_row.expires_at <= now() then
    if invite_row.status = 'active' and invite_row.expires_at <= now() then
      update public.school_class_invites
      set status = 'expired'
      where id = invite_row.id;
    end if;
    raise exception 'Pozvánka už není aktivní.';
  end if;

  if exists (
    select 1
    from public.organization_memberships om
    where om.organization_id = invite_row.school_id
      and om.user_id = actor_id
      and om.status = 'active'
      and om.role <> 'learner'
  ) then
    raise exception 'Tento účet už má ve škole jinou aktivní roli.';
  end if;

  insert into public.organization_memberships (
    organization_id, user_id, role, status, joined_at, created_by
  ) values (
    invite_row.school_id, actor_id, 'learner', 'active', now(), invite_row.created_by
  )
  on conflict (organization_id, user_id, role)
  do update set
    status = 'active',
    joined_at = coalesce(public.organization_memberships.joined_at, excluded.joined_at),
    ended_at = null,
    updated_at = now();

  insert into public.school_class_memberships (
    class_id, user_id, role, status, joined_at, ended_at, created_by
  ) values (
    invite_row.class_id, actor_id, 'learner', 'active', now(), null, invite_row.created_by
  )
  on conflict (class_id, user_id, role)
  do update set
    status = 'active',
    joined_at = coalesce(public.school_class_memberships.joined_at, excluded.joined_at),
    ended_at = null,
    updated_at = now();

  update public.profiles
  set account_context = 'school',
      active_organization_id = invite_row.school_id,
      updated_at = now()
  where id = actor_id;

  update public.school_class_invites
  set status = 'accepted',
      accepted_by = actor_id,
      accepted_at = now()
  where id = invite_row.id;

  select p.onboarding_completed_at is null
    into needs_onboarding
  from public.profiles p
  where p.id = actor_id;

  return query select invite_row.school_id, invite_row.class_id, coalesce(needs_onboarding, true);
end;
$$;

revoke all on function public.create_school_class_invite(uuid) from public, anon;
revoke all on function public.accept_school_class_invite(text) from public, anon;
grant execute on function public.create_school_class_invite(uuid) to authenticated;
grant execute on function public.accept_school_class_invite(text) to authenticated;

-- Reuse an already accepted school invitation during first-time onboarding
-- instead of creating a duplicate school organization.
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

  if normalized_context = 'school' then
    select om.organization_id
      into target_organization_id
    from public.organization_memberships om
    join public.organizations o on o.id = om.organization_id
    left join public.profiles p on p.id = current_user_id
    where om.user_id = current_user_id
      and om.status = 'active'
      and om.role in ('learner', 'teacher', 'coordinator', 'mentor')
      and o.organization_type = 'school'
      and o.status = 'active'
    order by case when om.organization_id = p.active_organization_id then 0 else 1 end,
             om.created_at asc
    limit 1;
  end if;

  if normalized_context in ('family', 'school', 'company') and target_organization_id is null then
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

commit;
