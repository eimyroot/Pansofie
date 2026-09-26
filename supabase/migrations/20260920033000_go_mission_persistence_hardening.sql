begin;

-- M8.2 hardens the canonical experience chain before GO writes account data.
drop policy if exists "evidence_update_own_run_or_admin" on public.experience_evidence;
create policy "evidence_update_own_run_or_admin"
  on public.experience_evidence for update
  to authenticated
  using (
    public.is_admin()
    or (owner_id = auth.uid() and exists (
      select 1 from public.mission_runs r where r.id = run_id and r.user_id = auth.uid()
    ))
  )
  with check (
    public.is_admin()
    or (owner_id = auth.uid() and exists (
      select 1 from public.mission_runs r where r.id = run_id and r.user_id = auth.uid()
    ))
  );

drop policy if exists "reflections_update_own_or_admin" on public.experience_reflections;
create policy "reflections_update_own_or_admin"
  on public.experience_reflections for update
  to authenticated
  using (
    public.is_admin()
    or (user_id = auth.uid() and exists (
      select 1 from public.mission_runs r where r.id = run_id and r.user_id = auth.uid()
    ))
  )
  with check (
    public.is_admin()
    or (user_id = auth.uid() and exists (
      select 1 from public.mission_runs r where r.id = run_id and r.user_id = auth.uid()
    ))
  );

drop policy if exists "reflections_delete_own_or_admin" on public.experience_reflections;
create policy "reflections_delete_own_or_admin"
  on public.experience_reflections for delete
  to authenticated
  using (
    public.is_admin()
    or (user_id = auth.uid() and exists (
      select 1 from public.mission_runs r where r.id = run_id and r.user_id = auth.uid()
    ))
  );

drop policy if exists "experiences_insert_own_or_admin" on public.experiences;
create policy "experiences_insert_own_or_admin"
  on public.experiences for insert
  to authenticated
  with check (
    public.is_admin()
    or (
      user_id = auth.uid()
      and exists (
        select 1 from public.mission_runs r
        where r.id = run_id
          and r.user_id = auth.uid()
          and r.mission_id = mission_id
          and r.status = 'completed'
      )
    )
  );

drop policy if exists "portfolio_insert_own_or_admin" on public.portfolio_items;
create policy "portfolio_insert_own_or_admin"
  on public.portfolio_items for insert
  to authenticated
  with check (
    public.is_admin()
    or (
      user_id = auth.uid()
      and exists (
        select 1 from public.experiences e
        where e.id = experience_id and e.user_id = auth.uid()
      )
    )
  );

drop policy if exists "portfolio_update_own_or_admin" on public.portfolio_items;
create policy "portfolio_update_own_or_admin"
  on public.portfolio_items for update
  to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (
    public.is_admin()
    or (
      user_id = auth.uid()
      and exists (
        select 1 from public.experiences e
        where e.id = experience_id and e.user_id = auth.uid()
      )
    )
  );

commit;
