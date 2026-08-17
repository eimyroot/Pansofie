-- PANSOFIE staging runtime fix discovered by the multi-role golden-path test.
--
-- `pansofie_finalize_school_experience` used a PL/pgSQL variable named
-- `experience_id` and `ON CONFLICT (experience_id)`, which PostgreSQL resolves
-- ambiguously inside PL/pgSQL. Use a distinct local variable and the named
-- unique constraint for the Passport insert.

create or replace function public.pansofie_finalize_school_experience(target_run_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  run_row public.mission_runs%rowtype;
  mission_row public.missions%rowtype;
  reflection_row public.experience_reflections%rowtype;
  existing_experience_id uuid;
  created_experience_id uuid;
  final_reviewer uuid;
begin
  select * into run_row
  from public.mission_runs
  where id = target_run_id
  for update;

  if run_row.id is null then
    raise exception 'run not found';
  end if;

  if run_row.status = 'completed' then
    select e.id into existing_experience_id
    from public.experiences e
    where e.run_id = target_run_id;
    return existing_experience_id;
  end if;

  if run_row.status <> 'submitted' then
    raise exception 'run must be submitted before finalization';
  end if;

  if not public.pansofie_can_review_run(target_run_id, 'school_mission_review')
     and not public.is_admin() then
    raise exception 'mission review access required';
  end if;

  select r.reviewer_id into final_reviewer
  from public.experience_reviews r
  where r.run_id = target_run_id
    and r.review_scope = 'mission'
    and r.status = 'confirmed'
  order by r.updated_at desc
  limit 1;

  if final_reviewer is null then
    raise exception 'confirmed mission review required';
  end if;

  if not exists (
    select 1 from public.experience_evidence e
    where e.run_id = target_run_id
  ) then
    raise exception 'evidence required';
  end if;

  select * into reflection_row
  from public.experience_reflections x
  where x.run_id = target_run_id;

  if reflection_row.id is null
     or nullif(btrim(coalesce(reflection_row.what_learned, '')), '') is null then
    raise exception 'completed reflection required';
  end if;

  select * into mission_row
  from public.missions m
  where m.id = run_row.mission_id;

  if mission_row.id is null then
    raise exception 'mission not found';
  end if;

  select e.id into existing_experience_id
  from public.experiences e
  where e.run_id = target_run_id;

  if existing_experience_id is null then
    insert into public.experiences (
      run_id, mission_id, user_id, title, path_ids,
      program_id, lab_id, impact_summary, occurred_at
    ) values (
      run_row.id, mission_row.id, run_row.user_id, mission_row.title,
      mission_row.path_ids, mission_row.program_id, mission_row.lab_id,
      nullif(btrim(coalesce(reflection_row.contribution, '')), ''), now()
    ) returning id into created_experience_id;
  else
    created_experience_id := existing_experience_id;
  end if;

  insert into public.portfolio_items (
    experience_id, user_id, title, summary, visibility, verified_by, verified_at
  ) values (
    created_experience_id,
    run_row.user_id,
    mission_row.title,
    nullif(btrim(coalesce(reflection_row.what_learned, '')), ''),
    'private',
    final_reviewer,
    now()
  )
  on conflict on constraint portfolio_items_experience_id_key
  do nothing;

  update public.mission_runs
  set status = 'completed', completed_at = now()
  where id = target_run_id;

  return created_experience_id;
end;
$$;

-- Preserve the explicit browser boundary after CREATE OR REPLACE.
revoke execute on function public.pansofie_finalize_school_experience(uuid) from public, anon;
grant execute on function public.pansofie_finalize_school_experience(uuid) to authenticated;

comment on function public.pansofie_finalize_school_experience(uuid)
  is 'Creates one Experience and one private Passport after current confirmed mission review; conflict target is explicitly disambiguated.';
