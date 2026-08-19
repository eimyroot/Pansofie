import React, { useState } from "react";
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
  { number: "01", title: "Potřeba", text: "Tým najde konkrétní problém ve škole, který stojí za prozkoumání.", signal: "Skutečný kontext", icon: Lightbulb },
  { number: "02", title: "Akce", text: "Zjistí souvislosti, navrhne dosažitelnou změnu a provede malý pilot.", signal: "Práce v realitě", icon: Sparkles },
  { number: "03", title: "Důkaz", text: "Doloží, co skutečně udělal — například měřením, výstupem nebo dokumentací.", signal: "Doložitelný výstup", icon: FileCheck2 },
  { number: "04", title: "Reflexe", text: "Každý pojmenuje, co fungovalo, co ne a co si z Experience odnáší.", signal: "Vlastní význam", icon: MessageSquareText },
  { number: "05", title: "Ověření", text: "Učitel odděleně posoudí doloženou práci a případně vrátí Experience k doplnění.", signal: "Oddělené ověření", icon: CheckCircle2 },
  { number: "06", title: "Experience Passport", text: "Po ověřeném dokončení zůstává soukromý záznam skutečné zkušenosti a jejího dalšího kroku.", signal: "Soukromý záznam", icon: GraduationCap },
];

export default function ExperienceStory() {
  const [activeStep, setActiveStep] = useState(0);
  const active = STEPS[activeStep];
  const ActiveIcon = active.icon;
  const progress = ((activeStep + 1) / STEPS.length) * 100;

  return (
    <section id="experience" className="experience-section py-20 sm:py-28 border-t border-border/60 bg-card/40 scroll-mt-24">
      <div className="container-px max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[0.72fr_1.28fr] gap-10 xl:gap-16 items-start">
          <div className="xl:sticky xl:top-28">
            <p className="eyebrow">01 · JAK VYPADÁ JEDNA EXPERIENCE</p>
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

          <div className="experience-interactive-shell" aria-label="Interaktivní průběh jedné Experience">
            <div className="experience-ambient" aria-hidden="true" />

            <div className="relative z-10 p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <p className="eyebrow">Living Experience Flow</p>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-semibold font-display">Zlepši svou školu</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xl">Přejeďte, zaostřete nebo klepněte na krok. Tok ukáže, kde právě vzniká práce, důkaz nebo ověření.</p>
                </div>
                <span className="status-pill status-neutral shrink-0">Ukázkový scénář</span>
              </div>

              <div className="experience-progress mt-6" aria-hidden="true">
                <span className="experience-progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2" aria-label="Kroky Experience">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const selected = activeStep === index;
                  const completed = index <= activeStep;
                  return (
                    <button
                      key={step.number}
                      type="button"
                      data-active={selected}
                      data-complete={completed}
                      aria-current={selected ? "step" : undefined}
                      aria-label={`${step.number} · ${step.title}`}
                      onMouseEnter={() => setActiveStep(index)}
                      onFocus={() => setActiveStep(index)}
                      onClick={() => setActiveStep(index)}
                      className="experience-step"
                    >
                      <span className="experience-step-icon"><Icon size={17} /></span>
                      <span className="mt-2 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">{step.number}</span>
                      <span className="mt-1 text-xs sm:text-sm font-semibold leading-tight">{step.title}</span>
                    </button>
                  );
                })}
              </div>

              <div key={active.number} className="experience-detail mt-5" aria-live="polite">
                <div className="experience-detail-icon"><ActiveIcon size={23} /></div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-primary">{active.number}</span>
                    <h4 className="text-xl sm:text-2xl font-semibold font-heading">{active.title}</h4>
                    <span className="role-chip" data-role="learner">{active.signal}</span>
                  </div>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">{active.text}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
                <div className="experience-boundary-card">
                  <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground">Vstup</span>
                  <p className="mt-1 text-sm font-semibold">Skutečná potřeba a práce</p>
                </div>
                <div className="experience-signal" aria-hidden="true"><span>→</span></div>
                <div className="experience-boundary-card experience-boundary-card--verified">
                  <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-primary">Výstup toku</span>
                  <p className="mt-1 text-sm font-semibold">Ověřená zkušenost, ne skóre člověka</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-primary/[0.055] border border-primary/15 px-5 py-4 flex items-start gap-3">
                <ShieldCheck size={19} className="text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed"><strong className="text-foreground font-semibold">Aktivita ≠ výstup ≠ outcome ≠ impact.</strong> Animovaný tok vysvětluje proces, ale nemění důkazní pravidla produktu.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
