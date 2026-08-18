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
  {
    number: "01",
    title: "Potřeba",
    text: "Tým najde konkrétní problém ve škole, který stojí za prozkoumání.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Akce",
    text: "Zjistí souvislosti, navrhne dosažitelnou změnu a provede malý pilot.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Důkaz",
    text: "Doloží, co skutečně udělal — například měřením, výstupem nebo dokumentací.",
    icon: FileCheck2,
  },
  {
    number: "04",
    title: "Reflexe",
    text: "Každý pojmenuje, co fungovalo, co ne a co si z Experience odnáší.",
    icon: MessageSquareText,
  },
  {
    number: "05",
    title: "Ověření",
    text: "Učitel odděleně posoudí doloženou práci a případně vrátí Experience k doplnění.",
    icon: CheckCircle2,
  },
  {
    number: "06",
    title: "Passport",
    text: "Po ověřeném dokončení zůstává soukromý záznam skutečné zkušenosti a jejího dalšího kroku.",
    icon: GraduationCap,
  },
];

export default function ExperienceStory() {
  return (
    <section id="experience" className="py-20 sm:py-28 border-t border-border/60 bg-card/40 scroll-mt-24">
      <div className="container-px max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[0.72fr_1.28fr] gap-10 xl:gap-14 items-start">
          <div className="xl:sticky xl:top-28">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">Jak vypadá jedna Experience</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">
              Nejdřív něco skutečně uděláš. Až potom vzniká záznam o rozvoji.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Pilotní Experience <strong className="text-foreground font-semibold">Zlepši svou školu</strong> ukazuje princip Pansofie od potřeby až po ověřený Passport.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-background p-5 flex items-start gap-3">
              <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Toto je <strong className="text-foreground font-semibold">pilotní scénář</strong>, ne zveřejněná případová studie. Reálné výsledky doplníme až po skutečném field pilotu.
              </p>
            </div>
            <Link to="/pilot" className="mt-7 inline-flex items-center gap-2 text-primary font-semibold hover:opacity-80">
              Prozkoumat celý pilot <ArrowRight size={17} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-7 bottom-7 w-px bg-border md:hidden" aria-hidden="true" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="relative rounded-3xl border border-border bg-background p-6 sm:p-7 min-h-56 flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center relative z-10"><Icon size={22} /></span>
                      <span className="text-xs font-semibold text-muted-foreground">{step.number}</span>
                    </div>
                    <h3 className="mt-7 text-xl font-semibold font-heading">{step.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
