import React, { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import SectionHeading from "@/components/pansofie/SectionHeading";

const ACTORS = [
  {
    id: "learner",
    label: "Žák / mladý člověk",
    short: "Žák",
    icon: GraduationCap,
    status: "Součást prvního pilotu",
    receives: "Skutečnou zkušenost, vedení, zpětnou vazbu a soukromý Experience Passport.",
    contributes: "Pohled, otázky, práci v týmu, konkrétní výstup, důkaz a vlastní reflexi.",
    boundary: "Přínos se nikdy nepřevádí na skóre člověka ani na předpověď jeho budoucnosti.",
  },
  {
    id: "family",
    label: "Rodina",
    short: "Rodina",
    icon: HeartHandshake,
    status: "Zapojení v prvním pilotu",
    receives: "Srozumitelný kontext, bezpečný přehled a možnost podpořit skutečné učení bez přebírání práce dítěte.",
    contributes: "Dobrovolný podnět, zkušenost z běžného života, doporučení člověka nebo zdroje a zpětnou vazbu k pilotu.",
    boundary: "Rodina automaticky nevidí soukromou reflexi dítěte a její účast není podmínkou pro dokončení Experience.",
  },
  {
    id: "school",
    label: "Škola",
    short: "Škola",
    icon: Building2,
    status: "Připraveno pro první pilot",
    receives: "Experience metodiku, učitelský workflow, RVP návaznost, Passport a podklady pro vyhodnocení pilotu.",
    contributes: "Bezpečný rámec, pedagogy, kohortu, skutečné školní potřeby a ověření použitelnosti v reálném provozu.",
    boundary: "Škola ověřuje doloženou práci, ale nemění žákovu vlastní reflexi ani nevytváří jeden lidský score.",
  },
  {
    id: "partner",
    label: "Firma / organizace",
    short: "Firma",
    icon: BriefcaseBusiness,
    status: "Hledáme pilotní partnery",
    receives: "Kvalitní pohled na ohraničený reálný problém, týmové výstupy a možnost odděleně rozhodnout o dalším pilotu nebo adopci.",
    contributes: "Reálnou Challenge, expertizu, kontext, zdroje, čas odborníka, zpětnou vazbu a případně možnost výsledek vyzkoušet.",
    boundary: "Partner nekupuje hodnocení žáka, child data ani automatické vlastnictví výstupu.",
  },
  {
    id: "community",
    label: "Obec / komunita",
    short: "Obec",
    icon: Landmark,
    status: "Zapojení podle Experience",
    receives: "Pozornost k reálnému místnímu problému, návrhy a výsledky navázané na konkrétní veřejnou nebo komunitní potřebu.",
    contributes: "Místní problém, prostředí, znalost kontextu, kontakty, data v bezpečném rozsahu a možnost výsledek použít.",
    boundary: "Veřejný přínos se odděluje od tvrzení o dopadu; output není automaticky impact.",
  },
  {
    id: "mentor",
    label: "Mentor / odborník",
    short: "Mentor",
    icon: UserRoundCheck,
    status: "Zapojení pod dohledem",
    receives: "Smysluplné zapojení do konkrétní práce a jasně ohraničenou roli bez sociálního feedu.",
    contributes: "Know-how, otázky, odbornou zpětnou vazbu a realistický pohled na kvalitu výstupu.",
    boundary: "Mentor nemá neomezený soukromý komunikační kanál k dítěti.",
  },
];

const FLOW = ["Reálná potřeba", "Akce", "Důkaz", "Reflexe", "Ověření", "Přínos / další krok"];

function ActorButton({ actor, selected, onSelect }) {
  const Icon = actor.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(actor.id)}
      aria-pressed={selected}
      className={`w-full text-left rounded-2xl border p-4 transition-all ${selected ? "border-primary bg-primary/[0.06] shadow-sm" : "border-border bg-background hover:border-primary/40 hover:bg-card"}`}
    >
      <div className="flex items-center gap-3">
        <span className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}><Icon size={19} /></span>
        <div className="min-w-0">
          <p className="font-semibold text-sm leading-snug">{actor.label}</p>
          <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{actor.status}</p>
        </div>
      </div>
    </button>
  );
}

export default function RoleEntry() {
  const [selectedId, setSelectedId] = useState("learner");
  const selected = useMemo(() => ACTORS.find((actor) => actor.id === selectedId) || ACTORS[0], [selectedId]);
  const SelectedIcon = selected.icon;

  return (
    <section id="ekosystem" className="py-20 sm:py-28 border-t border-border/60 scroll-mt-24">
      <div className="container-px max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="PANSOFIE EKOSYSTÉM"
          title="Jedna Experience uprostřed. Každá role má skutečný důvod."
          subtitle="Pansofie nepropojuje účty. Propojuje lidi a organizace kolem konkrétní zkušenosti pouze tehdy, když je jasné, co získávají, co přinášejí a jaká hranice jejich roli chrání."
          center
        />

        <div className="mt-10 lg:hidden overflow-x-auto -mx-5 px-5 pb-2">
          <div className="flex gap-2 min-w-max">
            {ACTORS.map((actor) => {
              const Icon = actor.icon;
              const active = actor.id === selected.id;
              return (
                <button
                  key={actor.id}
                  type="button"
                  onClick={() => setSelectedId(actor.id)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}
                >
                  <Icon size={16} /> {actor.short}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 lg:mt-12 grid grid-cols-1 lg:grid-cols-[0.8fr_1.35fr_0.8fr] gap-4 items-stretch">
          <div className="hidden lg:grid gap-3">
            {ACTORS.slice(0, 3).map((actor) => <ActorButton key={actor.id} actor={actor} selected={actor.id === selected.id} onSelect={setSelectedId} />)}
          </div>

          <article className="rounded-[2rem] border border-primary/25 bg-primary/[0.035] p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[430px] shadow-sm">
            <div>
              <div className="flex items-start justify-between gap-4">
                <span className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center"><SelectedIcon size={25} /></span>
                <span className="rounded-full border border-primary/20 bg-background px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">{selected.status}</span>
              </div>

              <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-primary uppercase">Experience je centrum</p>
              <h3 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">{selected.label}</h3>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-[11px] font-semibold tracking-wide text-primary">ZÍSKÁVÁ</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{selected.receives}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-[11px] font-semibold tracking-wide text-primary">PŘINÁŠÍ</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{selected.contributes}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/80 bg-background/80 p-4">
              <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{selected.boundary}</p>
            </div>
          </article>

          <div className="hidden lg:grid gap-3">
            {ACTORS.slice(3).map((actor) => <ActorButton key={actor.id} actor={actor} selected={actor.id === selected.id} onSelect={setSelectedId} />)}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
          {FLOW.map((item, index) => (
            <div key={item} className="rounded-xl border border-border bg-card/40 px-3 py-3.5">
              <span className="text-[10px] font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-2 text-xs font-medium leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
