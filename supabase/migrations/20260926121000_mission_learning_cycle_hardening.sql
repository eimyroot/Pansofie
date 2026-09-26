begin;

-- Learning-cycle progress is participant-visible but mutation is RPC-only.
-- This prevents clients from forging completed phases and bypassing the
-- canonical LEARN → PLAY → DO → CREATE → SHARE → REFLECT sequence.

revoke insert, update, delete
  on public.mission_run_cycle_progress
  from authenticated;

drop policy if exists mission_cycle_insert_own_run_or_admin
  on public.mission_run_cycle_progress;
drop policy if exists mission_cycle_update_own_run_or_admin
  on public.mission_run_cycle_progress;

-- Read access remains participant-owned. The security-definer RPC is the
-- only authenticated mutation path and derives identity from auth.uid().
grant select on public.mission_run_cycle_progress to authenticated;

comment on table public.mission_run_cycle_progress is
  'Private participant-owned canonical cycle progress. Authenticated mutation is RPC-only.';

comment on function public.advance_mission_learning_cycle(uuid, text) is
  'Only authenticated participant mutation path for ordered LEARN → PLAY → DO → CREATE → SHARE → REFLECT progress.';

commit;
