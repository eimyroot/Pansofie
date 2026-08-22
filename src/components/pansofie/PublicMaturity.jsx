import React from "react";
import { CheckCircle2, FlaskConical, CalendarClock, Route } from "lucide-react";
import SectionHeading from "@/components/pansofie/SectionHeading";

const STATES = [
  {
    key: "ready",
    label: "UŽ FUNGUJE",
    icon: CheckCircle2,
    className: "status-success",
    intro: "Co už je postavené a prošlo technickými kontrolami.",
    items: [
      "Veřejný web a krátká interaktivní ukázka PANSOFIEDIT",
      "Digitální postup pro školní zkušenost od zadání po ověření",
      "Postup pro partnerskou výzvu, bezpečný výstup, zpětnou vazbu a rozhodnutí o dalším použití",
      "Oddělené role a pravidla přístupu, která chrání soukromé údaje před zbytečným sdílením",
    ],
  },
  {
    key: "testing",
    label: "POTŘEBUJEME OVĚŘIT",
    icon: FlaskConical,
    className: "status-info",
    intro: "Co může ukázat až skutečné používání, ne samotný software.",
    items: [
      "Zda je celý postup srozumitelný žákům, učitelům a rodinám",
      "Kolik práce navíc znamená pro učitele a jak zapadne do běžného školního dne",
      "Zda zpětná vazba partnerů přináší žákům i škole skutečnou hodnotu",
      "Zda zkušenost vede k užitečnému dalšímu kroku, ne jen k dokončení úkolu",
    ],
  },
  {
    key: "not-yet",
    label: "ZATÍM NEMÁME DŮKAZ",
    icon: CalendarClock,
    className: "status-waiting",
    intro: "Co zatím nevydáváme za prokázaný výsledek.",
    items: [
      "Vyhodnocený pilot v reálné škole",
      "Prokázaný pedagogický nebo dlouhodobý dopad",
      "Ověřenou ochotu škol nebo partnerů za službu platit",
      "Dlouhodobé výsledky potvrzené napříč více školami",
    ],
  },
  {
    key: "plan",
    label: "DALŠÍ KROK",
    icon: Route,
    className: "status-neutral",
    intro: "Co má smysl ověřit jako první.",
    items: [
      "Spustit první řízený školní pilot s jasnými cíli a pravidly ochrany dětí",
      "Měřit průchod zkušeností, zátěž učitelů a fungování spolupráce s partnery",
      "Zjistit, které typy zkušeností přinášejí největší praktickou hodnotu",
      "Rozšiřovat partnerství až podle skutečných dat z pilotu",
    ],
  },
];

export default function PublicMaturity() {
  return (
    <section id="stav" className="py-20 sm:py-28 border-t border-border/60 bg-card/35 scroll-mt-24">
      <div className="container-px max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="04 · KDE PANSOFIE OPRAVDU JE"
          title="Říkáme otevřeně, co už funguje — a co teprve musíme ověřit."
          subtitle="Technicky hotový produkt ještě není důkaz, že dobře funguje ve škole. Proto oddělujeme to, co už umíme doložit, od otázek, na které musí odpovědět reálný provoz."
          center
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATES.map((state) => {
            const Icon = state.icon;
            return (
              <article key={state.key} className="surface-raised p-5 sm:p-6 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className={`status-pill ${state.className}`}>{state.label}</span>
                  <Icon size={19} className="text-muted-foreground" aria-hidden="true" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{state.intro}</p>
                <div className="mt-5 space-y-3 border-t border-border/70 pt-5">
                  {state.items.map((item) => (
                    <div key={item} className="flex gap-2.5 text-sm leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
