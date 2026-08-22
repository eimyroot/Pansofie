import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const STEPS = [
  { number: "01", title: "Potřeba", text: "Tým najde konkrétní problém ve škole, který stojí za prozkoumání.", signal: "Skutečný kontext", icon: Lightbulb },
  { number: "02", title: "Akce", text: "Zjistí souvislosti, navrhne dosažitelnou změnu a vyzkouší ji v malém.", signal: "Práce v realitě", icon: Sparkles },
  { number: "03", title: "Důkaz", text: "Doloží, co skutečně udělal — například měřením, výstupem nebo dokumentací.", signal: "Doložitelný výstup", icon: FileCheck2 },
  { number: "04", title: "Reflexe", text: "Každý pojmenuje, co fungovalo, co ne a co si ze zkušenosti odnáší.", signal: "Vlastní význam", icon: MessageSquareText },
  { number: "05", title: "Ověření", text: "Učitel samostatně posoudí doloženou práci a případně ji vrátí k doplnění.", signal: "Oddělené ověření", icon: CheckCircle2 },
  { number: "06", title: "Experience Passport", text: "Po ověřeném dokončení zůstává soukromý záznam skutečné zkušenosti a jejího dalšího kroku.", signal: "Soukromý záznam", icon: GraduationCap },
];

export default function ExperienceStory() {
  const shellRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [autoMotion, setAutoMotion] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const active = STEPS[activeStep];
  const ActiveIcon = active.icon;
  const progress = ((activeStep + 1) / STEPS.length) * 100;
  const running = autoMotion && inView && !reduceMotion;

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const reduced = Boolean(media?.matches);
      setReduceMotion(reduced);
      if (reduced) setAutoMotion(false);
    };
    sync();
    media?.addEventListener?.("change", sync);
    return () => media?.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const element = shellRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.18),
      { threshold: [0, 0.18, 0.42] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % STEPS.length);
    }, 1850);
    return () => window.clearInterval(interval);
  }, [running]);

  const chooseStep = (index) => {
    setAutoMotion(false);
    setActiveStep(index);
  };

  return (
    <section id="experience" className="experience-section py-20 sm:py-28 border-t border-border/60 bg-card/40 scroll-mt-24">
      <div className="container-px max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[0.72fr_1.28fr] gap-10 xl:gap-16 items-start">
          <div className="xl:sticky xl:top-28">
            <p className="eyebrow">01 · JAK VYPADÁ JEDNA SKUTEČNÁ ZKUŠENOST</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Nejdřív něco skutečně uděláš. Teprve potom má smysl zapisovat, co sis z toho odnesl.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">Ukázka <strong className="text-foreground font-semibold">Zlepši svou školu</strong> vede od konkrétní potřeby přes práci a důkaz až k ověřenému záznamu zkušenosti.</p>

            <div className="mt-6 flex items-start gap-3 border-l-2 border-primary/30 pl-4">
              <ShieldCheck size={19} className="text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">Jde o <strong className="text-foreground font-semibold">modelový pilotní scénář</strong>, ne o zveřejněnou případovou studii. Skutečné výsledky můžeme doplnit až po ověření v reálné škole.</p>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link to="/zapojit-se?mode=simulator" className="action-primary w-full sm:w-auto px-5 py-3">Vyzkoušet Pansofii za 60 sekund <ArrowRight size={17} /></Link>
              <Link to="/pilot" className="action-quiet text-primary">Jak vypadá školní pilot <ArrowRight size={16} /></Link>
            </div>
          </div>

          <div
            ref={shellRef}
            className="experience-interactive-shell"
            data-auto-running={running}
            aria-label="Interaktivní průběh jedné zkušenosti"
          >
            <div className="experience-ambient" aria-hidden="true" />

            <div className="relative z-10 p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <p className="eyebrow">Jak zkušenost postupuje</p>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-semibold font-display">Zlepši svou školu</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xl">Ukázka se sama pohybuje jednotlivými kroky. Kdykoli si můžete vybrat krok a projít si ho vlastním tempem.</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="status-pill status-neutral">Ukázkový scénář</span>
                  <button
                    type="button"
                    className="experience-motion-toggle"
                    aria-pressed={!autoMotion}
                    onClick={() => setAutoMotion((value) => !value)}
                    disabled={reduceMotion}
                    title={reduceMotion ? "Pohyb je vypnutý podle nastavení zařízení" : undefined}
                  >
                    {running ? <Pause size={14} /> : <Play size={14} />}
                    {running ? "Pozastavit" : "Spustit"}
                  </button>
                </div>
              </div>

              <div className="experience-progress mt-6" aria-hidden="true">
                <span className="experience-progress-fill" style={{ width: `${progress}%` }} />
                {running && <i className="experience-progress-packet" />}
              </div>

              <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2" aria-label="Kroky zkušenosti">
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
                      onMouseEnter={() => chooseStep(index)}
                      onFocus={() => chooseStep(index)}
                      onClick={() => chooseStep(index)}
                      className="experience-step"
                    >
                      <span className="experience-step-icon"><Icon size={17} /></span>
                      <span className="mt-2 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">{step.number}</span>
                      <span className="mt-1 text-xs sm:text-sm font-semibold leading-tight">{step.title}</span>
                    </button>
                  );
                })}
              </div>

              <div key={active.number} className="experience-detail mt-5" aria-live={running ? "off" : "polite"}>
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
                  <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground">Začátek</span>
                  <p className="mt-1 text-sm font-semibold">Skutečná potřeba a práce</p>
                </div>
                <div className="experience-signal" aria-hidden="true"><span>→</span></div>
                <div className="experience-boundary-card experience-boundary-card--verified">
                  <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-primary">Co zůstává</span>
                  <p className="mt-1 text-sm font-semibold">Ověřená zkušenost, ne skóre člověka</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-primary/[0.055] border border-primary/15 px-5 py-4 flex items-start gap-3">
                <ShieldCheck size={19} className="text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed"><strong className="text-foreground font-semibold">Samotná aktivita není totéž co výstup ani skutečný dopad.</strong> Pansofie tyto věci rozlišuje, aby bylo jasné, co opravdu víme a co teprve musíme ověřit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
