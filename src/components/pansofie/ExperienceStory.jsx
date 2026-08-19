import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const STEPS = [
  { number: "01", title: "Potřeba", text: "Tým najde konkrétní problém ve škole, který stojí za prozkoumání.", icon: Lightbulb },
  { number: "02", title: "Akce", text: "Zjistí souvislosti, navrhne dosažitelnou změnu a provede malý pilot.", icon: Sparkles },
  { number: "03", title: "Důkaz", text: "Doloží, co skutečně udělal — například měřením, výstupem nebo dokumentací.", icon: FileCheck2 },
  { number: "04", title: "Reflexe", text: "Každý pojmenuje, co fungovalo, co ne a co si z Experience odnáší.", icon: MessageSquareText },
  { number: "05", title: "Ověření", text: "Učitel odděleně posoudí doloženou práci a případně vrátí Experience k doplnění.", icon: CheckCircle2 },
  { number: "06", title: "Experience Passport", text: "Po ověřeném dokončení zůstává soukromý záznam skutečné zkušenosti a jejího dalšího kroku.", icon: GraduationCap },
];

export default function ExperienceStory() {
  return (
    <section id="experience" className="py-20 sm:py-28 border-t border-border/60 bg-card/40 scroll-mt-24">
      <div className="container-px max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[0.74fr_1.26fr] gap-10 xl:gap-16 items-start">
          <div className="xl:sticky xl:top-28">
            <p className="eyebrow">Jak vypadá jedna Experience</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Nejdřív něco skutečně uděláš. Až potom vzniká záznam o rozvoji.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">Experience <strong className="text-foreground font-semibold">Zlepši svou školu</strong> ukazuje princip Pansofie od konkrétní potřeby až po ověřený Experience Passport.</p>

            <div className="mt-6 flex items-start gap-3 border-l-2 border-primary/30 pl-4">
              <ShieldCheck size={19} className="text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">Toto je <strong className="text-foreground font-semibold">pilotní scénář</strong>, ne zveřejněná případová studie. Reálné výsledky doplníme až po skutečném ověření ve škole.</p>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link to="/zapojit-se?mode=simulator" className="action-primary w-full sm:w-auto px-5 py-3">Vyzkoušet Pansofii za 60 sekund <ArrowRight size={17} /></Link>
              <Link to="/pilot" className="action-quiet text-primary">Prozkoumat školní pilot <ArrowRight size={16} /></Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-background overflow-hidden shadow-sm" aria-label="Průběh jedné Experience">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === STEPS.length - 1;
              return (
                <article key={step.number} className={`grid grid-cols-[auto_1fr_auto] gap-4 sm:gap-5 items-start p-5 sm:p-6 ${isLast ? "bg-primary/[0.045]" : "border-b border-border"}`}>
                  <span className={`h-11 w-11 rounded-2xl flex items-center justify-center ${isLast ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}><Icon size={20} /></span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-semibold font-heading">{step.title}</h3>
                      {isLast && <span className="status-pill status-neutral">zůstává jako záznam zkušenosti</span>}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">{step.text}</p>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground pt-1">{step.number}</span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
