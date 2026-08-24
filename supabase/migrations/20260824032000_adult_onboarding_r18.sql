begin;

alter table public.profiles
  add column if not exists onboarding_track text,
  add column if not exists terms_accepted_at timestamptz,
  add column if not exists terms_accepted_version text,
  add column if not exists dialogue_code_accepted_at timestamptz,
  add column if not exists dialogue_code_accepted_version text;

alter table public.profiles drop constraint if exists profiles_onboarding_track_r18_check;
alter table public.profiles add constraint profiles_onboarding_track_r18_check
  check (onboarding_track is null or onboarding_track in ('education','wise_business','circular_ecology'));

create or replace function public.pansofie_complete_adult_onboarding(
  p_full_name text,
  p_location text,
  p_track text,
  p_offers_text text default null,
  p_seeks_text text default null
)
returns table (
  id uuid,
  onboarding_track text,
  network_role text,
  onboarding_completed_at timestamptz,
  terms_accepted_at timestamptz,
  dialogue_code_accepted_at timestamptz
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
  v_inferred_role text;
begin
  if v_user_id is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  if nullif(btrim(coalesce(p_full_name, '')), '') is null then
    raise exception 'FULL_NAME_REQUIRED';
  end if;

  if nullif(btrim(coalesce(p_location, '')), '') is null then
    raise exception 'LOCATION_REQUIRED';
  end if;

  if p_track not in ('education','wise_business','circular_ecology') then
    raise exception 'INVALID_ONBOARDING_TRACK';
  end if;

  v_inferred_role := case p_track
    when 'education' then 'educator'
    when 'wise_business' then 'company'
    when 'circular_ecology' then 'community'
  end;

  return query
  update public.profiles p
  set
    full_name = left(btrim(p_full_name), 120),
    location = left(btrim(p_location), 160),
    onboarding_track = p_track,
    network_role = case
      when p.network_role is null or p.network_role = '' then v_inferred_role
      else p.network_role
    end,
    offers_text = nullif(left(btrim(coalesce(p_offers_text, '')), 800), ''),
    seeks_text = nullif(left(btrim(coalesce(p_seeks_text, '')), 800), ''),
    terms_accepted_at = coalesce(p.terms_accepted_at, now()),
    terms_accepted_version = coalesce(p.terms_accepted_version, '2026-08-24-r18'),
    dialogue_code_accepted_at = coalesce(p.dialogue_code_accepted_at, now()),
    dialogue_code_accepted_version = coalesce(p.dialogue_code_accepted_version, '2026-08-24-r18'),
    onboarding_completed_at = now(),
    updated_at = now()
  where p.id = v_user_id
  returning
    p.id,
    p.onboarding_track,
    p.network_role,
    p.onboarding_completed_at,
    p.terms_accepted_at,
    p.dialogue_code_accepted_at;

  if not found then
    raise exception 'PROFILE_NOT_FOUND';
  end if;
end;
$$;

revoke all on function public.pansofie_complete_adult_onboarding(text, text, text, text, text) from public;
grant execute on function public.pansofie_complete_adult_onboarding(text, text, text, text, text) to authenticated;

comment on function public.pansofie_complete_adult_onboarding(text, text, text, text, text) is
  'R18 authenticated first-login completion. Server-stamps current terms/dialogue-code acknowledgement, preserves any more-specific invited network_role, records one of three onboarding tracks, and completes onboarding without accepting a caller-supplied user id.';

commit;
