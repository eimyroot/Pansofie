import React from "react";
import { CheckCircle2, FlaskConical, CalendarClock, Route } from "lucide-react";
import SectionHeading from "@/components/pansofie/SectionHeading";

const STATES = [
  {
    key: "ready",
    label: "FUNKČNÍ",
    icon: CheckCircle2,
    className: "status-success",
    intro: "Co už existuje a prošlo technickým ověřením.",
    items: [
      "Veřejný Experience-first web a 60–90s PANSOFIEDIT ukázka",
      "Školní digitální workflow pro Experience",
      "Partner Challenge → bounded output → Review → adoption decision → Outcome evidence",
      "Role, privacy a safety hranice oddělující soukromá data od partner výstupu",
    ],
  },
  {
    key: "testing",
    label: "TESTUJEME",
    icon: FlaskConical,
    className: "status-info",
    intro: "Co musí potvrdit reálné používání, ne jen software.",
    items: [
      "Srozumitelnost celého postupu pro žáka, učitele a rodinu",
      "Reálnou učitelskou zátěž a provoz ve škole",
      "Kvalitu Partner feedbacku a hodnotu Challenge workflow",
      "Jak dobře Experience navazuje na další skutečný krok",
    ],
  },
  {
    key: "not-yet",
    label: "JEŠTĚ NEPROBĚHLO",
    icon: CalendarClock,
    className: "status-waiting",
    intro: "Co zatím nemáme právo vydávat za prokázaný výsledek.",
    items: [
      "Plnohodnotný reálný školní field pilot s vyhodnocením",
      "Důkaz pedagogického nebo dlouhodobého dopadu",
      "Prokázaná willingness-to-pay partnerů nebo škol",
      "Dlouhodobá outcome / impact evidence napříč více školami",
    ],
  },
  {
    key: "plan",
    label: "DALŠÍ KROK",
    icon: Route,
    className: "status-neutral",
    intro: "Co má smysl ověřit po technickém základu.",
    items: [
      "První řízený školní pilot s jasnou metrikou a safeguardingem",
      "Měření Experience progression, teacher load a Partner pipeline",
      "Ověření, které typy Experiences přinášejí největší praktickou hodnotu",
      "Rozšiřování partnerství až podle skutečných pilotních dat",
    ],
  },
];

export default function PublicMaturity() {
  return (
    <section id="stav" className="py-20 sm:py-28 border-t border-border/60 bg-card/35 scroll-mt-24">
      <div className="container-px max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="04 · KDE PANSOFIE OPRAVDU JE"
          title="Ukazujeme hotové věci i nejistoty. Bez marketingového přeskakování reality."
          subtitle="Technicky funkční produkt není totéž co prokázaný dopad. Proto veřejně oddělujeme, co už funguje, co právě ověřujeme a co teprve musí ukázat reálný pilot."
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
