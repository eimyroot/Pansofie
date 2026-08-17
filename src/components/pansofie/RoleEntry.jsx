import React from "react";
import {
  ArrowRight,
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
    icon: GraduationCap,
    status: "PILOT NOW",
    receives: "Skutečnou zkušenost, vedení, zpětnou vazbu a soukromý Experience Passport.",
    contributes: "Pohled, otázky, práci v týmu, konkrétní výstup, důkaz a vlastní reflexi.",
  },
  {
    id: "family",
    label: "Rodina",
    icon: HeartHandshake,
    status: "PILOT PARTICIPATION",
    receives: "Srozumitelný kontext, důvěru, bezpečný přehled a možnost podpořit skutečné učení.",
    contributes: "Podporu, zkušenost z běžného života, dobrovolný rodinný vstup a zpětnou vazbu.",
  },
  {
    id: "school",
    label: "Škola",
    icon: Building2,
    status: "PILOT NOW",
    receives: "Experience metodiku, učitelský review flow, RVP návaznost, Passport a pilotní evidence.",
    contributes: "Bezpečný rámec, pedagogy, kohortu, skutečné školní potřeby a ověření použitelnosti.",
  },
  {
    id: "partner",
    label: "Firma / organizace",
    icon: BriefcaseBusiness,
    status: "BOUNDED PARTNER",
    receives: "Kvalitní pohled na reálný problém, výstupy týmů a možnost odděleného adoption rozhodnutí.",
    contributes: "Reálnou Challenge, expertizu, kontext, zdroje, feedback a případně možnost výsledek pilotovat.",
  },
  {
    id: "community",
    label: "Obec / komunita",
    icon: Landmark,
    status: "PILOT PARTICIPATION",
    receives: "Lokální aktivitu, návrhy a výsledky navázané na skutečnou veřejnou nebo komunitní potřebu.",
    contributes: "Místní problém, prostředí, znalost kontextu, kontakty a možnost výsledky použít.",
  },
  {
    id: "mentor",
    label: "Mentor / odborník",
    icon: UserRoundCheck,
    status: "SUPERVISED",
    receives: "Smysluplné zapojení do konkrétní práce a jasně ohraničenou roli bez sociálního feedu.",
    contributes: "Know-how, otázky, odbornou zpětnou vazbu a realistický pohled na kvalitu výstupu.",
  },
];

const FLOW = [
  "Reálná potřeba",
  "Experience",
  "Důkaz",
  "Reflexe & review",
  "Skutečný přínos",
  "Další krok / adopce",
];

export default function RoleEntry() {
  return (
    <section id="ekosystem" className="py-20 sm:py-28 border-t border-border/60 bg-card/40">
      <div className="container-px max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="PANSOFIE EKOSYSTÉM"
          title="Jeden systém. Každá role má důvod."
          subtitle="Pansofie nepropojuje účty jen proto, aby rostla síť. Propojuje lidi a organizace kolem skutečné Experience pouze tehdy, když je jasné, co získávají, co přinášejí a komu tím vzniká hodnota."
          center
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ACTORS.map((actor) => {
            const Icon = actor.icon;
            return (
              <article key={actor.id} className="card-soft p-6 sm:p-7 bg-background flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon size={21} />
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold tracking-wide text-muted-foreground">
                    {actor.status}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold font-heading">{actor.label}</h3>

                <div className="mt-5 space-y-4 text-sm leading-relaxed">
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-primary">ZÍSKÁVÁ</p>
                    <p className="mt-1.5 text-muted-foreground">{actor.receives}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-primary">PŘINÁŠÍ</p>
                    <p className="mt-1.5 text-muted-foreground">{actor.contributes}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 card-soft p-6 sm:p-8 border-primary/20 bg-primary/[0.025]">
          <div className="flex items-start gap-3">
            <ShieldCheck size={22} className="text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg">Společná hranice</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-4xl">
                Přínos není skóre člověka. Firma nekupuje hodnocení žáka ani přístup k jeho soukromým datům, rodina automaticky nevidí soukromou reflexi a mentor nemá neomezený soukromý kanál k dítěti. Každá role vidí a dělá jen to, co má pro konkrétní Experience bezpečný a doložitelný účel.
              </p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5">
            {FLOW.map((step, index) => (
              <div key={step} className="rounded-xl border border-border bg-background px-3 py-4 min-h-24 flex flex-col justify-between">
                <span className="text-[10px] font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <div className="mt-3 flex items-end justify-between gap-2">
                  <span className="text-xs font-medium leading-snug">{step}</span>
                  {index < FLOW.length - 1 && <ArrowRight size={13} className="text-muted-foreground shrink-0" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
