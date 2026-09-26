begin;

alter table public.missions
  add column if not exists topic_key text,
  add column if not exists difficulty smallint,
  add column if not exists learning_cycle jsonb not null default '{}'::jsonb;

alter table public.missions
  drop constraint if exists missions_difficulty_check;
alter table public.missions
  add constraint missions_difficulty_check
  check (difficulty is null or difficulty between 1 and 5);

alter table public.missions
  drop constraint if exists missions_learning_cycle_object_check;
alter table public.missions
  add constraint missions_learning_cycle_object_check
  check (jsonb_typeof(learning_cycle) = 'object');

create table if not exists public.mission_run_cycle_progress (
  run_id uuid primary key references public.mission_runs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  current_phase text not null default 'learn',
  completed_phases text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.mission_run_cycle_progress
  drop constraint if exists mission_run_cycle_current_phase_check;
alter table public.mission_run_cycle_progress
  add constraint mission_run_cycle_current_phase_check
  check (current_phase in ('learn','play','do','create','share','reflect'));

alter table public.mission_run_cycle_progress
  drop constraint if exists mission_run_cycle_completed_phases_check;
alter table public.mission_run_cycle_progress
  add constraint mission_run_cycle_completed_phases_check
  check (completed_phases <@ array['learn','play','do','create','share','reflect']::text[]);

create index if not exists mission_run_cycle_progress_user_idx
  on public.mission_run_cycle_progress(user_id, updated_at desc);

alter table public.mission_run_cycle_progress enable row level security;

drop trigger if exists mission_run_cycle_progress_touch_updated_at
  on public.mission_run_cycle_progress;
create trigger mission_run_cycle_progress_touch_updated_at
  before update on public.mission_run_cycle_progress
  for each row execute procedure public.pansofie_touch_updated_at();

revoke all privileges on table public.mission_run_cycle_progress
  from public, anon, authenticated;
grant select on public.mission_run_cycle_progress to authenticated;
grant insert (run_id, user_id, current_phase, completed_phases)
  on public.mission_run_cycle_progress to authenticated;
grant update (current_phase, completed_phases)
  on public.mission_run_cycle_progress to authenticated;

drop policy if exists mission_cycle_select_own_or_admin
  on public.mission_run_cycle_progress;
create policy mission_cycle_select_own_or_admin
  on public.mission_run_cycle_progress
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists mission_cycle_insert_own_run_or_admin
  on public.mission_run_cycle_progress;
create policy mission_cycle_insert_own_run_or_admin
  on public.mission_run_cycle_progress
  for insert to authenticated
  with check (
    public.is_admin()
    or (
      user_id = auth.uid()
      and exists (
        select 1 from public.mission_runs mr
        where mr.id = run_id and mr.user_id = auth.uid()
      )
    )
  );

drop policy if exists mission_cycle_update_own_run_or_admin
  on public.mission_run_cycle_progress;
create policy mission_cycle_update_own_run_or_admin
  on public.mission_run_cycle_progress
  for update to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (
    public.is_admin()
    or (
      user_id = auth.uid()
      and exists (
        select 1 from public.mission_runs mr
        where mr.id = run_id and mr.user_id = auth.uid()
      )
    )
  );

create or replace function public.advance_mission_learning_cycle(
  target_run_id uuid,
  target_phase text
)
returns table (
  run_status text,
  current_phase text,
  completed_phases text[]
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid := auth.uid();
  phase_order constant text[] := array['learn','play','do','create','share','reflect'];
  existing_completed text[] := array[]::text[];
  expected_phase text;
  next_phase text;
  resolved_status text;
  phase_index integer;
begin
  if actor_id is null then
    raise exception 'Přihlášení je povinné.';
  end if;

  if not exists (
    select 1 from public.mission_runs mr
    where mr.id = target_run_id
      and mr.user_id = actor_id
      and mr.status not in ('completed','cancelled')
  ) then
    raise exception 'Tento mission run nelze posunout.';
  end if;

  select coalesce(mrcp.completed_phases, array[]::text[])
    into existing_completed
  from public.mission_run_cycle_progress mrcp
  where mrcp.run_id = target_run_id;

  expected_phase := phase_order[coalesce(array_length(existing_completed, 1), 0) + 1];
  if expected_phase is null then
    raise exception 'Všechny fáze už jsou označené jako dokončené.';
  end if;
  if target_phase <> expected_phase then
    raise exception 'Fáze musí pokračovat v pořadí LEARN → PLAY → DO → CREATE → SHARE → REFLECT.';
  end if;

  phase_index := coalesce(array_length(existing_completed, 1), 0) + 1;
  existing_completed := array_append(existing_completed, target_phase);
  next_phase := coalesce(phase_order[phase_index + 1], 'reflect');
  update public.mission_runs
  set status = 'in_progress',
      started_at = coalesce(started_at, now())
  where id = target_run_id
  returning status into resolved_status;

  insert into public.mission_run_cycle_progress (
    run_id, user_id, current_phase, completed_phases
  ) values (
    target_run_id, actor_id, next_phase, existing_completed
  )
  on conflict (run_id) do update
    set current_phase = excluded.current_phase,
        completed_phases = excluded.completed_phases
  returning mission_run_cycle_progress.current_phase,
            mission_run_cycle_progress.completed_phases
    into next_phase, existing_completed;

  return query select resolved_status, next_phase, existing_completed;
end;
$$;

revoke execute on function public.advance_mission_learning_cycle(uuid, text)
  from public, anon;
grant execute on function public.advance_mission_learning_cycle(uuid, text)
  to authenticated;

comment on table public.mission_run_cycle_progress is
  'Private participant-owned progress through the canonical six-phase learning cycle.';
comment on function public.advance_mission_learning_cycle(uuid, text) is
  'Advances the authenticated owner through LEARN → PLAY → DO → CREATE → SHARE → REFLECT in order.';
update public.missions
set topic_key = coalesce(topic_key, 'nature'),
    difficulty = coalesce(difficulty, 1),
    learning_cycle = jsonb_build_object(
      'learn', 'Zjisti, co rostlina potřebuje k růstu: světlo, vodu, živiny a čas.',
      'play', 'Vyber vhodné místo a porovnej, kde má rostlina nejlepší podmínky.',
      'do', 'Zasaď semeno nebo sazenici a pečuj o ni v průběhu růstu.',
      'create', 'Vytvoř jednoduchý záznam růstu pomocí poznámek, kresby nebo fotografie.',
      'share', 'Sdílej bezpečně výsledek s rodinou, týmem nebo skupinou, se kterou misi plníš.',
      'reflect', 'Popiš, co rostlině pomáhalo, co nefungovalo a co příště uděláš jinak.'
    )
where slug = 'vypestuj-prvni-rostlinu';

insert into public.missions (
  slug, title, summary, why, program_id, path_ids, status,
  estimated_minutes, evidence_prompt, reflection_prompt,
  transfer_prompt, contribution_prompt, safety_notes,
  curriculum_mapping, teacher_load, topic_key, difficulty, learning_cycle
) values (
  'ai-detektiv-over-odpoved',
  'AI detektiv: Ověř odpověď',
  'Prověř tvrzení vytvořené generativní AI a zjisti, co je fakt, odhad a co ještě chybí ověřit.',
  'AI může být užitečný partner, pokud člověk umí rozpoznat nejistotu, hledat zdroje a převzít odpovědnost za závěr.',
  'pansofiego', array['mind','character'], 'published', 45,
  'Ulož si jednu větu, kterou jsi ověřil/a, a stručně popiš jak.',
  'Co tě při ověřování překvapilo a co příště uděláš dřív, než AI odpověď použiješ?',
  'Jak stejný postup použiješ u jiné AI odpovědi nebo školního úkolu?',
  'Sdílej s třídou jeden praktický tip pro bezpečné ověřování AI výstupů.',
  'Nevkládej do veřejných AI služeb osobní, citlivé nebo neveřejné školní údaje.',
  '{"topic":"ai_education","audience":"secondary_school"}'::jsonb,
  '{"prep_minutes":10}'::jsonb,
  'ai_education', 2,
  jsonb_build_object(
    'learn', 'Zjisti, proč generativní AI někdy sebejistě vytvoří nepřesnou nebo neúplnou odpověď.',
    'play', 'Najdi v připravené AI odpovědi tři tvrzení a tipni si, které z nich potřebuje ověřit nejdřív.',
    'do', 'Ověř vybrané tvrzení alespoň ve dvou nezávislých důvěryhodných zdrojích a porovnej rozdíly.',
    'create', 'Vytvoř krátkou kartu: tvrzení → zdroj → co je jisté → co zůstává nejisté.',
    'share', 'Bez osobních údajů sdílej s třídou jeden signál, podle kterého poznáš, že AI výstup potřebuje kontrolu.',
    'reflect', 'Popiš, co ses při ověřování naučil/a o odpovědnosti člověka při práci s AI.'
  )
), (
  'rozpocet-pod-tlakem',
  'Rozpočet pod tlakem',
  'Rozhodni, jak upravit modelový měsíční rozpočet, když přijde neočekávaný výdaj a peněz není nekonečno.',
  'Finanční gramotnost není jen počítání. Je to schopnost vidět omezení, priority, rezervu a důsledky rozhodnutí.',
  'pansofiego', array['prosperity','mind'], 'published', 50,
  'Ulož modelový rozpočet nebo stručnou poznámku s rozhodnutím a jeho důvodem.',
  'Která priorita byla nejtěžší a co by ti pomohlo rozhodnout lépe příště?',
  'Jak by se tvoje rozhodnutí změnilo, kdyby neočekávaný výdaj byl dvojnásobný?',
  'Sdílej jeden princip, který pomůže třídě rozlišit nutný výdaj, přání a rezervu.',
  'Pracuj pouze s modelovými částkami. Nezadávej skutečné bankovní údaje, zůstatky ani rodinné finance.',
  '{"topic":"financial_literacy","audience":"secondary_school"}'::jsonb,
  '{"prep_minutes":10}'::jsonb,
  'financial_literacy', 2,
  jsonb_build_object(
    'learn', 'Rozliš příjem, pevné výdaje, proměnlivé výdaje, rezervu a dluh a zjisti, proč každá položka mění prostor pro rozhodnutí.',
    'play', 'Rozděl modelové výdaje do tří skupin: musím, chci, můžu odložit. Pak porovnej své pořadí s jiným možným pohledem.',
    'do', 'Uprav modelový měsíční rozpočet po neočekávaném výdaji tak, aby zůstal realistický a nevytvářel skrytý problém příští měsíc.',
    'create', 'Vytvoř jednoduchý plán: co ponechat, co omezit, co odložit a jak obnovit rezervu.',
    'share', 'Sdílej princip rozhodnutí, ne osobní finance. Vysvětli, který kompromis považuješ za nejrozumnější.',
    'reflect', 'Popiš, jak se změnil tvůj pohled na rezervu, priority a cenu krátkodobého pohodlí.'
  )
), (
  'phishing-pod-lupou',
  'Phishing pod lupou',
  'Rozlož podezřelou modelovou zprávu na signály a rozhodni, jak ověřit její pravost bez klikání na rizikový odkaz.',
  'Kyberbezpečnost stojí na návyku zpomalit, ověřit kontext a nepředat útočníkovi rozhodnutí jen proto, že zpráva působí naléhavě.',
  'pansofiego', array['mind','character'], 'published', 40,
  'Ulož si seznam signálů, podle kterých jsi zprávu vyhodnotil/a.',
  'Který signál by tě mohl příště zmást a jak si vytvoříš bezpečný ověřovací návyk?',
  'Jak bys bezpečně ověřil/a podobnou zprávu od školy, banky nebo služby, kterou používáš?',
  'Sdílej s třídou jeden ověřovací krok, který nevyžaduje kliknout na odkaz ve zprávě.',
  'Pracuj jen se syntetickými ukázkami. Neklikej na podezřelé odkazy a nesdílej přihlašovací údaje ani kódy.',
  '{"topic":"cyber_security","audience":"secondary_school"}'::jsonb,
  '{"prep_minutes":5}'::jsonb,
  'cyber_security', 2,
  jsonb_build_object(
    'learn', 'Poznej běžné signály phishingu: naléhavost, nečekaná žádost, nesoulad odesílatele, podivná adresa a tlak na rychlou akci.',
    'play', 'Seřaď syntetické signály od nejméně po nejvíce podezřelé a vysvětli, proč jeden znak sám o sobě nemusí stačit.',
    'do', 'Navrhni bezpečný postup ověření zprávy bez kliknutí na odkaz: jiný kanál, známá adresa, oficiální web nebo přímý kontakt.',
    'create', 'Vytvoř krátký checklist „STOP → ZKONTROLUJ → OVĚŘ → AŽ POTOM JEDNEJ“ pro sebe nebo třídu.',
    'share', 'Na modelové zprávě ukaž spolužákovi jeden varovný signál a jeden bezpečný ověřovací krok.',
    'reflect', 'Popiš, který bezpečnostní návyk chceš používat automaticky a proč.'
  )
)
on conflict (slug) do update set
  topic_key = excluded.topic_key,
  difficulty = excluded.difficulty,
  learning_cycle = excluded.learning_cycle,
  updated_at = now();

commit;
