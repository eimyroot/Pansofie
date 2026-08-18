-- PANSOFIE FIELD PILOT FAMILY R3 — execute + visibility hardening
-- Explicitly defeats PostgreSQL/Supabase default function EXECUTE inheritance.

-- Staff-side visibility remains purpose-bound at read time. If Family
-- participation authorization is withdrawn/expired, the operational inbox stops
-- projecting the contribution even though the retained audit row still exists.
create or replace function public.pansofie_list_staff_family_contributions()
returns table (
  id uuid,
  run_id uuid,
  child_user_id uuid,
  child_name text,
  organization_id uuid,
  organization_name text,
  mission_title text,
  contribution_kind text,
  content text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    fc.id,
    fc.run_id,
    fc.child_user_id,
    coalesce(nullif(btrim(p.full_name), ''), 'Learner') as child_name,
    r.organization_id,
    o.name,
    m.title,
    fc.contribution_kind,
    fc.content,
    fc.created_at
  from public.family_contributions fc
  join public.mission_runs r on r.id = fc.run_id
  join public.organizations o on o.id = r.organization_id
  join public.missions m on m.id = r.mission_id
  left join public.profiles p on p.id = fc.child_user_id
  where fc.status = 'active'
    and public.pansofie_is_active_org_member(
      r.organization_id,
      array['teacher', 'coordinator']::text[],
      auth.uid()
    )
    and public.pansofie_has_processing_basis(
      fc.child_user_id,
      r.organization_id,
      'school_mission_review'
    )
    and public.pansofie_has_processing_basis(
      fc.child_user_id,
      r.organization_id,
      'guardian_family_participation'
    )
  order by fc.created_at desc;
$$;

revoke all on table public.family_contributions from public;
revoke all on table public.family_contributions from anon;
revoke all on table public.family_contributions from authenticated;

-- Private helper: no browser role may call it directly.
revoke all on function public.pansofie_can_guardian_participate_in_run(uuid) from public;
revoke execute on function public.pansofie_can_guardian_participate_in_run(uuid) from anon;
revoke execute on function public.pansofie_can_guardian_participate_in_run(uuid) from authenticated;

-- Authenticated-only projections/actions. Revoke PUBLIC and anon first because
-- PUBLIC EXECUTE otherwise propagates to anon.
revoke all on function public.pansofie_family_access_summary() from public;
revoke execute on function public.pansofie_family_access_summary() from anon;
grant execute on function public.pansofie_family_access_summary() to authenticated;

revoke all on function public.pansofie_list_my_family_context() from public;
revoke execute on function public.pansofie_list_my_family_context() from anon;
grant execute on function public.pansofie_list_my_family_context() to authenticated;

revoke all on function public.pansofie_list_my_guardian_passport_summaries() from public;
revoke execute on function public.pansofie_list_my_guardian_passport_summaries() from anon;
grant execute on function public.pansofie_list_my_guardian_passport_summaries() to authenticated;

revoke all on function public.pansofie_add_family_contribution(uuid, text, text) from public;
revoke execute on function public.pansofie_add_family_contribution(uuid, text, text) from anon;
grant execute on function public.pansofie_add_family_contribution(uuid, text, text) to authenticated;

revoke all on function public.pansofie_list_my_family_contributions() from public;
revoke execute on function public.pansofie_list_my_family_contributions() from anon;
grant execute on function public.pansofie_list_my_family_contributions() to authenticated;

revoke all on function public.pansofie_withdraw_family_contribution(uuid) from public;
revoke execute on function public.pansofie_withdraw_family_contribution(uuid) from anon;
grant execute on function public.pansofie_withdraw_family_contribution(uuid) to authenticated;

revoke all on function public.pansofie_list_staff_family_contributions() from public;
revoke execute on function public.pansofie_list_staff_family_contributions() from anon;
grant execute on function public.pansofie_list_staff_family_contributions() to authenticated;

revoke all on function public.pansofie_enable_guardian_family_participation(uuid, uuid, text, text, text, timestamptz) from public;
revoke execute on function public.pansofie_enable_guardian_family_participation(uuid, uuid, text, text, text, timestamptz) from anon;
grant execute on function public.pansofie_enable_guardian_family_participation(uuid, uuid, text, text, text, timestamptz) to authenticated;
