begin;

create table if not exists public.game_badges (
  badge_key text primary key,
  title text not null,
  description text not null,
  glyph text not null,
  visibility text not null default 'private' check (visibility = 'private'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mission_game_rewards (
  mission_id uuid primary key references public.missions(id) on delete cascade,
  xp_reward smallint not null check (xp_reward between 0 and 500),
  badge_key text references public.game_badges(badge_key) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.game_badges enable row level security;
alter table public.mission_game_rewards enable row level security;

revoke all privileges on table public.game_badges from public, anon, authenticated;
revoke all privileges on table public.mission_game_rewards from public, anon, authenticated;
grant select on public.game_badges to authenticated;
grant select on public.mission_game_rewards to authenticated;
drop trigger if exists game_badges_touch_updated_at on public.game_badges;
create trigger game_badges_touch_updated_at
  before update on public.game_badges
  for each row execute procedure public.pansofie_touch_updated_at();

drop trigger if exists mission_game_rewards_touch_updated_at on public.mission_game_rewards;
create trigger mission_game_rewards_touch_updated_at
  before update on public.mission_game_rewards
  for each row execute procedure public.pansofie_touch_updated_at();

drop policy if exists game_badges_read_authenticated on public.game_badges;
create policy game_badges_read_authenticated
  on public.game_badges
  for select to authenticated
  using (true);

drop policy if exists mission_game_rewards_read_authenticated on public.mission_game_rewards;
create policy mission_game_rewards_read_authenticated
  on public.mission_game_rewards
  for select to authenticated
  using (true);

insert into public.game_badges (badge_key, title, description, glyph) values
  ('ai-verifier', 'AI detektiv', 'Za dokončenou zkušenost s ověřováním AI tvrzení.', 'AI'),
  ('budget-navigator', 'Rozpočtový navigátor', 'Za dokončenou zkušenost s modelovým rozpočtem a prioritami.', 'KČ'),
  ('phishing-guardian', 'Phishing strážce', 'Za dokončenou zkušenost s bezpečným rozpoznáním phishingu.', 'CY'),
  ('grow-starter', 'Pěstitelský start', 'Za dokončenou první pěstitelskou zkušenost Green Hope.', 'RŮ')
on conflict (badge_key) do update set
  title = excluded.title,
  description = excluded.description,
  glyph = excluded.glyph,
  updated_at = now();
insert into public.mission_game_rewards (mission_id, xp_reward, badge_key)
select id, 80, 'ai-verifier' from public.missions where slug = 'ai-detektiv-over-odpoved'
on conflict (mission_id) do update set xp_reward = excluded.xp_reward, badge_key = excluded.badge_key, updated_at = now();

insert into public.mission_game_rewards (mission_id, xp_reward, badge_key)
select id, 80, 'budget-navigator' from public.missions where slug = 'rozpocet-pod-tlakem'
on conflict (mission_id) do update set xp_reward = excluded.xp_reward, badge_key = excluded.badge_key, updated_at = now();

insert into public.mission_game_rewards (mission_id, xp_reward, badge_key)
select id, 80, 'phishing-guardian' from public.missions where slug = 'phishing-pod-lupou'
on conflict (mission_id) do update set xp_reward = excluded.xp_reward, badge_key = excluded.badge_key, updated_at = now();

insert into public.mission_game_rewards (mission_id, xp_reward, badge_key)
select id, 60, 'grow-starter' from public.missions where slug = 'vypestuj-prvni-rostlinu'
on conflict (mission_id) do update set xp_reward = excluded.xp_reward, badge_key = excluded.badge_key, updated_at = now();

comment on table public.game_badges is
  'Private game acknowledgements for concrete completed experiences; never certification or person value.';
comment on table public.mission_game_rewards is
  'Read-only game metadata. XP is derived from canonical completed mission runs and is never a competence score.';

commit;
