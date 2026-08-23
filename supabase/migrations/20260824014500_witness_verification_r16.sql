-- PANSOFIE R16 — Svědci nápravy / witness verification
--
-- ADDITIVE ONLY. Stacks after R15 Experience Passport.
--
-- Security / truth contract:
-- - raw bearer tokens are NEVER stored in Postgres; only SHA-256 hashes
-- - opening an email link MUST NOT mutate state (email scanners can follow GETs)
-- - an explicit POST decision is required
-- - one request can be consumed only once and has a hard expiry
-- - witness confirmation is supporting evidence, NOT an automatic Passport grade,
--   person score, Experience verification, or Fan-depth shortcut
-- - existing governed school review remains authoritative for school Passport flow

create extension if not exists pgcrypto;

create table if not exists public.experience_witness_requests (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.mission_runs(id) on delete cascade,
  evidence_id uuid references public.experience_evidence(id) on delete set null,
  subject_user_id uuid not null references auth.users(id) on delete cascade,
  requested_by uuid references auth.users(id) on delete set null,
  witness_role text not null check (witness_role in (
    'guardian',
    'teacher',
    'mentor',
    'partner',
    'community_witness',
    'other'
  )),
  witness_email text not null,
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  token_hint text,
  status text not null default 'pending' check (status in (
    'pending',
    'confirmed',
    'needs_revision',
    'expired',
    'revoked'
  )),
  expires_at timestamptz not null,
  decided_at timestamptz,
  decision_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (expires_at > created_at),
  check (
    (status = 'pending' and decided_at is null)
    or (status in ('confirmed', 'needs_revision') and decided_at is not null)
    or status in ('expired', 'revoked')
  )
);

create index if not exists experience_witness_requests_run_idx
  on public.experience_witness_requests(run_id, created_at desc);
create index if not exists experience_witness_requests_subject_idx
  on public.experience_witness_requests(subject_user_id, created_at desc);
create index if not exists experience_witness_requests_expiry_idx
  on public.experience_witness_requests(status, expires_at);

drop trigger if exists experience_witness_requests_touch_updated_at on public.experience_witness_requests;
create trigger experience_witness_requests_touch_updated_at
  before update on public.experience_witness_requests
  for each row execute procedure public.pansofie_touch_updated_at();

create table if not exists public.experience_witness_events (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.experience_witness_requests(id) on delete restrict,
  run_id uuid not null references public.mission_runs(id) on delete cascade,
  event_type text not null check (event_type in (
    'created',
    'previewed',
    'confirmed',
    'needs_revision',
    'expired',
    'revoked'
  )),
  note text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists experience_witness_events_request_idx
  on public.experience_witness_events(request_id, created_at desc);
create index if not exists experience_witness_events_run_idx
  on public.experience_witness_events(run_id, created_at desc);

alter table public.experience_witness_requests enable row level security;
alter table public.experience_witness_events enable row level security;

-- No anon/authenticated browser policy is intentionally created. The bearer
-- token path is handled only by the server-side Edge Function using service_role.
-- A participant/admin may inspect request STATUS through explicit projections in
-- a later release; witness_email and token_hash must never be public projection fields.

-- ---------------------------------------------------------------------------
-- Server-only preview. Returns only the minimum review context needed by the
-- witness page. Raw token hashing happens in the Edge Function; only hash enters DB.
-- ---------------------------------------------------------------------------
create or replace function public.pansofie_preview_witness_request(target_token_hash text)
returns table (
  request_id uuid,
  request_status text,
  expires_at timestamptz,
  witness_role text,
  mission_title text,
  evidence_kind text,
  evidence_description text,
  reflection_text text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  req public.experience_witness_requests%rowtype;
begin
  if target_token_hash is null or target_token_hash !~ '^[0-9a-f]{64}$' then
    return;
  end if;

  select * into req
  from public.experience_witness_requests r
  where r.token_hash = target_token_hash
  limit 1;

  if req.id is null then
    return;
  end if;

  if req.status = 'pending' and req.expires_at <= now() then
    update public.experience_witness_requests
    set status = 'expired', updated_at = now()
    where id = req.id and status = 'pending';

    insert into public.experience_witness_events (request_id, run_id, event_type)
    values (req.id, req.run_id, 'expired');

    req.status := 'expired';
  end if;

  -- Preview logging contains no IP address, raw token, email, or user-agent.
  insert into public.experience_witness_events (request_id, run_id, event_type)
  values (req.id, req.run_id, 'previewed');

  return query
  select
    req.id,
    req.status,
    req.expires_at,
    req.witness_role,
    m.title,
    ev.kind,
    ev.description,
    ref.what_learned
  from public.mission_runs mr
  join public.missions m on m.id = mr.mission_id
  left join public.experience_evidence ev on ev.id = req.evidence_id
  left join public.experience_reflections ref on ref.run_id = mr.id
  where mr.id = req.run_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Atomic one-time decision. The external witness confirms only that the
-- described real-world event/output can be attested. It does not update
-- portfolio_items.verified_at and does not alter R15 Fan depth directly.
-- ---------------------------------------------------------------------------
create or replace function public.pansofie_consume_witness_request(
  target_token_hash text,
  target_decision text,
  target_note text default null
)
returns table (
  request_id uuid,
  decision text,
  run_id uuid
)
language plpgsql
security definer
set search_path = public
as $$
declare
  req public.experience_witness_requests%rowtype;
  clean_note text := nullif(btrim(coalesce(target_note, '')), '');
begin
  if target_token_hash is null or target_token_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid token';
  end if;

  if target_decision not in ('confirmed', 'needs_revision') then
    raise exception 'unsupported witness decision';
  end if;

  select * into req
  from public.experience_witness_requests r
  where r.token_hash = target_token_hash
  for update;

  if req.id is null then
    raise exception 'witness request not found';
  end if;

  if req.status <> 'pending' then
    raise exception 'witness request already consumed';
  end if;

  if req.expires_at <= now() then
    update public.experience_witness_requests
    set status = 'expired', updated_at = now()
    where id = req.id;

    insert into public.experience_witness_events (request_id, run_id, event_type)
    values (req.id, req.run_id, 'expired');

    raise exception 'witness request expired';
  end if;

  update public.experience_witness_requests
  set status = target_decision,
      decided_at = now(),
      decision_note = clean_note,
      updated_at = now()
  where id = req.id;

  insert into public.experience_witness_events (
    request_id,
    run_id,
    event_type,
    note
  ) values (
    req.id,
    req.run_id,
    target_decision,
    clean_note
  );

  return query select req.id, target_decision, req.run_id;
end;
$$;

revoke all on function public.pansofie_preview_witness_request(text) from public;
revoke all on function public.pansofie_preview_witness_request(text) from anon;
revoke all on function public.pansofie_preview_witness_request(text) from authenticated;
revoke all on function public.pansofie_consume_witness_request(text, text, text) from public;
revoke all on function public.pansofie_consume_witness_request(text, text, text) from anon;
revoke all on function public.pansofie_consume_witness_request(text, text, text) from authenticated;

grant execute on function public.pansofie_preview_witness_request(text) to service_role;
grant execute on function public.pansofie_consume_witness_request(text, text, text) to service_role;

comment on table public.experience_witness_requests
  is 'R16 one-time external witness requests. Stores SHA-256 token hash only; witness confirmation is supporting evidence, not a Passport grade or automatic verification.';
comment on table public.experience_witness_events
  is 'Append-only audit trail for external witness request lifecycle. Never stores raw bearer token.';
comment on function public.pansofie_consume_witness_request(text, text, text)
  is 'Server-only atomic witness decision. Does not mutate Passport verification or Experience Fan depth.';
