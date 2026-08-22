import React, { useState } from "react";
import { Building2, GraduationCap, HeartHandshake, Landmark, Sparkles, UsersRound } from "lucide-react";

const ACTORS = {
  learner: { label: "Žák / tým", Icon: Sparkles, text: "dělá skutečnou činnost, ukládá důkaz práce a vlastní reflexi" },
  teacher: { label: "Učitel", Icon: GraduationCap, text: "drží pedagogický rámec a samostatně ověřuje doloženou práci" },
  family: { label: "Rodina", Icon: HeartHandshake, text: "může dobrovolně přidat užitečný kontext, kontakt nebo zkušenost" },
  partner: { label: "Firma / organizace", Icon: Building2, text: "přináší reálnou výzvu, odbornost, zdroje nebo možnost dobrý výsledek vyzkoušet" },
  community: { label: "Obec / komunita", Icon: Landmark, text: "přináší místní potřebu, prostředí nebo možnost navazujícího použití" },
  mentor: { label: "Mentor / odborník", Icon: UsersRound, text: "přidává odbornou zkušenost pod dohledem a pro jasně vymezený účel" },
};

export default function EcosystemMap({ participants = [], roleId }) {
  const [active, setActive] = useState(roleId || "learner");
  const activeActor = ACTORS[active] || ACTORS.learner;

  return (
    <section aria-labelledby="ecosystem-map-title" className="rounded-[2rem] border border-border bg-card/35 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Lidé kolem zkušenosti</p>
          <h3 id="ecosystem-map-title" className="mt-2 text-2xl font-semibold font-display">Uprostřed je společná práce. Každý kolem ní má jiný úkol.</h3>
        </div>
        <p className="text-xs text-muted-foreground max-w-sm">Klikněte na roli. Uvidíte, co v této zkušenosti konkrétně dělá.</p>
      </div>

      <div className="mt-7 grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(ACTORS).map(([id, actor]) => {
          const enabled = participants.includes(id) || id === roleId || id === "learner" || id === "teacher";
          const Icon = actor.Icon;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active === id}
              onClick={() => enabled && setActive(id)}
              disabled={!enabled}
              className={`rounded-2xl border p-4 text-left transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${active === id ? "border-primary/50 bg-primary/[0.07]" : enabled ? "border-border bg-background hover:bg-card" : "border-border/50 bg-muted/30 opacity-45 cursor-not-allowed"}`}
            >
              <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={18} /></span>
              <span className="mt-3 block text-sm font-semibold">{actor.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-3xl bg-foreground text-background p-6 sm:p-7">
        <p className="text-xs uppercase tracking-[0.18em] text-background/55">Vybraná role</p>
        <h4 className="mt-2 text-xl font-semibold">{activeActor.label}</h4>
        <p className="mt-2 text-sm sm:text-base text-background/75 leading-relaxed">{activeActor.text}.</p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs font-semibold">
          {["POTŘEBA", "AKCE", "DŮKAZ", "REFLEXE", "DALŠÍ KROK"].map((item, index) => (
            <div key={item} className={`rounded-xl px-3 py-2.5 border ${index === 1 || index === 4 ? "border-background/35 bg-background/10" : "border-background/15"}`}>{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
