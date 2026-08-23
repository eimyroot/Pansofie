import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Leaf,
  Lightbulb,
  MessageCircleQuestion,
  RotateCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { getMission } from "@/lib/pansofieData";
import { IMPACT_LAYERS, QUESTS, computeScenarioHarmony } from "@/lib/pansofieQuestEngine";

const STEP_LABELS = ["Analýza", "Rozhodnutí", "Důsledky", "Reflexe"];
const LAYER_ICONS = {
  priroda: Leaf,
  spolecnost: Users,
  technologie: Cpu,
  vedomi: BrainCircuit,
};

function StepRail({ step, onStep }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" aria-label="Kroky rozhodovacího scénáře">
      {STEP_LABELS.map((label, index) => {
        const complete = index < step;
        const active = index === step;
        return (
          <button
            key={label}
            type="button"
            onClick={() => index <= step && onStep(index)}
            disabled={index > step}
            aria-current={active ? "step" : undefined}
            className={`min-h-12 rounded-2xl border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : complete
                  ? "border-primary/20 bg-primary/[0.06] text-foreground"
                  : "border-border bg-card text-muted-foreground"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] opacity-75">0{index + 1}</span>
            <span className="mt-1 block text-sm font-semibold">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function ImpactMeter({ layer, value }) {
  const Icon = LAYER_ICONS[layer.id] || Scale;
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="h-9 w-9 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Icon size={18} />
          </span>
          <div>
            <p className="font-semibold">{layer.label}</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{layer.description}</p>
          </div>
        </div>
        <span className="text-sm font-semibold tabular-nums">{value}/100</span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden" aria-label={`${layer.label}: ${value} ze 100`}>
        <div className="h-full rounded-full bg-primary transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function PansofieGo() {
  const quest = QUESTS[0];
  const mission = getMission(quest.missionId);
  const [step, setStep] = useState(0);
  const [choiceId, setChoiceId] = useState("");
  const [reflection, setReflection] = useState("");

  const choice = useMemo(
    () => quest.choices.find((item) => item.id === choiceId) || null,
    [choiceId, quest.choices],
  );
  const harmony = choice ? computeScenarioHarmony(choice.impact) : null;

  const reset = () => {
    setStep(0);
    setChoiceId("");
    setReflection("");
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main>
        <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 border-b border-border/60">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute top-[-260px] left-[10%] h-[760px] w-[940px] max-w-[120vw] bg-[radial-gradient(ellipse_at_center,_rgba(23,97,73,0.14),_transparent_68%)]" />
          </div>
          <div className="container-px max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <div>
              <span className="chip border border-primary/15 bg-card/70 text-primary mb-6 shadow-sm">
                <Sparkles size={14} /> PansofieGO · experimentální vrstva
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold font-display tracking-tight text-balance leading-[1.04]">
                Rozhoduj se v souvislostech. <span className="text-primary">Pak to ověř v realitě.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed text-balance">
                PansofieGO je bezpečný prostor pro nácvik rozhodování před skutečnou zkušeností. Neříká, jaký jsi člověk. Ukazuje, co může způsobit konkrétní volba.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <span className="status-pill status-neutral"><ShieldCheck size={14} /> nic se neukládá</span>
                <span className="status-pill status-neutral"><Scale size={14} /> hodnotí se scénář, ne člověk</span>
                <span className="status-pill status-neutral"><MessageCircleQuestion size={14} /> bez AI verdiktu</span>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#rozhodovaci-lab" className="action-primary px-7 py-3.5">Spustit scénář <ArrowRight size={18} /></a>
                <Link to="/jak-funguje" className="action-secondary px-7 py-3.5">Jak funguje Pansofie</Link>
              </div>
            </div>

            <div className="surface-raised rounded-[2rem] border border-primary/20 p-6 sm:p-8 shadow-[0_28px_80px_-46px_rgba(23,97,73,0.55)]">
              <p className="eyebrow">OD CHAOSU K ODPOVĚDNÉMU KROKU</p>
              <div className="mt-5 space-y-4">
                {[
                  ["01", "Analýza", "Co víme, co nevíme a kde je skutečné napětí?"],
                  ["02", "Rozhodnutí", "Vyber jednu strategii a přijmi její kompromisy."],
                  ["03", "Důsledky", "Sleduj krátký i dlouhý dopad napříč čtyřmi vrstvami."],
                  ["04", "Reflexe", "Polož si otázky, které vrátí simulaci zpět do reality."],
                ].map(([number, title, detail]) => (
                  <div key={number} className="grid grid-cols-[auto_1fr] gap-4 items-start border-b border-border/70 pb-4 last:border-b-0 last:pb-0">
                    <span className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">{number}</span>
                    <div><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-muted-foreground leading-relaxed">{detail}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-primary/[0.055] border border-primary/15 px-5 py-4 flex items-start gap-3">
                <Lightbulb size={18} className="text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed"><strong className="text-foreground">Simulace není důkaz.</strong> Smyslem je připravit lepší otázky a rozhodnutí pro skutečnou misi.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="rozhodovaci-lab" className="py-16 sm:py-24 scroll-mt-24">
          <div className="container-px max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <p className="eyebrow">PANSOFIEGO · DECISION LAB R0</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">{quest.title}</h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{quest.intro}</p>
              {mission && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Navazuje na modelovou misi <strong className="text-foreground">{mission.name}</strong>. Scénář je doplněk k reálné akci, ne její náhrada.
                </p>
              )}
            </div>

            <div className="mt-10">
              <StepRail step={step} onStep={setStep} />
            </div>

            <div className="mt-5 surface-raised rounded-[2rem] border border-border overflow-hidden">
              {step === 0 && (
                <div className="p-6 sm:p-9">
                  <div className="flex items-start gap-3">
                    <span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><BrainCircuit size={22} /></span>
                    <div><p className="eyebrow">KROK 1 · ANALÝZA</p><h3 className="mt-1 text-2xl sm:text-3xl font-semibold font-heading">Nejdřív odděl fakta od přání.</h3></div>
                  </div>
                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="surface-subtle rounded-2xl p-5">
                      <h4 className="font-semibold">Co víme</h4>
                      <ul className="mt-4 space-y-3">
                        {quest.analysis.facts.map((fact) => <li key={fact} className="flex gap-3 text-sm text-muted-foreground leading-relaxed"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /><span>{fact}</span></li>)}
                      </ul>
                    </div>
                    <div className="surface-subtle rounded-2xl p-5">
                      <h4 className="font-semibold">Kde je napětí</h4>
                      <ul className="mt-4 space-y-3">
                        {quest.analysis.tensions.map((tension) => <li key={tension} className="flex gap-3 text-sm text-muted-foreground leading-relaxed"><Scale size={16} className="text-primary shrink-0 mt-0.5" /><span>{tension}</span></li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/[0.045] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Rozhodovací otázka</p>
                    <p className="mt-2 text-lg font-medium leading-relaxed">{quest.analysis.question}</p>
                  </div>
                  <div className="mt-8 flex justify-end"><button type="button" className="action-primary" onClick={() => setStep(1)}>Jdu rozhodnout <ChevronRight size={17} /></button></div>
                </div>
              )}

              {step === 1 && (
                <div className="p-6 sm:p-9">
                  <p className="eyebrow">KROK 2 · ROZHODNUTÍ</p>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-semibold font-heading">Vyber jednu strategii. Žádná není bez ceny.</h3>
                  <p className="mt-3 text-muted-foreground">Neexistuje skrytá „správná osobnostní odpověď“. Porovnáváme pouze důsledky konkrétní volby.</p>
                  <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {quest.choices.map((item) => {
                      const selected = item.id === choiceId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setChoiceId(item.id)}
                          aria-pressed={selected}
                          className={`rounded-2xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${selected ? "border-primary bg-primary/[0.06]" : "border-border bg-card hover:border-primary/30"}`}
                        >
                          <div className="flex items-start justify-between gap-3"><h4 className="font-semibold text-lg">{item.title}</h4>{selected && <CheckCircle2 size={20} className="text-primary shrink-0" />}</div>
                          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                          <p className="mt-4 text-xs font-semibold text-primary leading-relaxed">{item.rationale}</p>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                    <button type="button" className="action-quiet" onClick={() => setStep(0)}><ChevronLeft size={17} /> Zpět k analýze</button>
                    <button type="button" className="action-primary" disabled={!choice} onClick={() => choice && setStep(2)}>Ukázat důsledky <ChevronRight size={17} /></button>
                  </div>
                </div>
              )}

              {step === 2 && choice && (
                <div className="p-6 sm:p-9">
                  <p className="eyebrow">KROK 3 · DŮSLEDKY</p>
                  <div className="mt-2 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
                    <div><h3 className="text-2xl sm:text-3xl font-semibold font-heading">{choice.title}</h3><p className="mt-2 text-muted-foreground max-w-2xl">{choice.summary}</p></div>
                    <div className="rounded-2xl border border-primary/20 bg-primary/[0.055] px-5 py-4 min-w-48">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Harmony scénáře</p>
                      <p className="mt-1 text-3xl font-semibold font-display tabular-nums">{harmony}/100</p>
                      <p className="mt-1 text-xs text-muted-foreground">Rovnováha této volby, ne hodnocení člověka.</p>
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {IMPACT_LAYERS.map((layer) => <ImpactMeter key={layer.id} layer={layer} value={choice.impact[layer.id]} />)}
                  </div>
                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="surface-subtle rounded-2xl p-5"><p className="text-xs font-semibold uppercase tracking-wide text-primary">Teď</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{choice.shortTerm}</p></div>
                    <div className="surface-subtle rounded-2xl p-5"><p className="text-xs font-semibold uppercase tracking-wide text-primary">Později</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{choice.longTerm}</p></div>
                    <div className="surface-subtle rounded-2xl p-5"><p className="text-xs font-semibold uppercase tracking-wide text-primary">Cena volby</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{choice.tradeoff}</p></div>
                  </div>
                  <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                    <button type="button" className="action-quiet" onClick={() => setStep(1)}><ChevronLeft size={17} /> Změnit rozhodnutí</button>
                    <button type="button" className="action-primary" onClick={() => setStep(3)}>Jdu reflektovat <ChevronRight size={17} /></button>
                  </div>
                </div>
              )}

              {step === 3 && choice && (
                <div className="p-6 sm:p-9">
                  <div className="flex items-start gap-3">
                    <span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><MessageCircleQuestion size={22} /></span>
                    <div><p className="eyebrow">KROK 4 · REFLEXE</p><h3 className="mt-1 text-2xl sm:text-3xl font-semibold font-heading">Mentor se ptá. Nerozhoduje za tebe.</h3></div>
                  </div>
                  <div className="mt-7 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5">
                    <div className="space-y-3">
                      {quest.reflectionPrompts.map((prompt, index) => (
                        <div key={prompt} className="surface-subtle rounded-2xl p-5">
                          <p className="text-xs font-semibold text-primary">OTÁZKA {index + 1}</p>
                          <p className="mt-2 text-sm leading-relaxed">{prompt}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <label htmlFor="go-reflection" className="font-semibold">Moje pracovní reflexe</label>
                      <p className="mt-1 text-xs text-muted-foreground">Zůstává pouze v tomto prohlížeči po dobu otevřené stránky. Nic neposíláme na server.</p>
                      <textarea
                        id="go-reflection"
                        value={reflection}
                        onChange={(event) => setReflection(event.target.value)}
                        rows={9}
                        placeholder="Např. změnil bych... protože... a v realitě bych ověřil..."
                        className="mt-4 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-y"
                      />
                    </div>
                  </div>
                  <div className="mt-7 rounded-2xl bg-foreground text-background p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-background/60">SIMULACE KONČÍ, REALITA ZAČÍNÁ</p><h4 className="mt-2 text-xl sm:text-2xl font-semibold font-heading">Dobrá odpověď není konec. Je to lepší první krok.</h4><p className="mt-2 text-sm text-background/70 leading-relaxed">PansofieGO má smysl jen tehdy, když se otázky vrátí do skutečné zkušenosti, důkazu a další reflexe.</p></div>
                    <Link to="/zapojit-se?mode=simulator" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground">Pokračovat do Pansofie <ArrowRight size={17} /></Link>
                  </div>
                  <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                    <button type="button" className="action-quiet" onClick={() => setStep(2)}><ChevronLeft size={17} /> Zpět k důsledkům</button>
                    <button type="button" className="action-secondary" onClick={reset}><RotateCcw size={16} /> Spustit znovu</button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground leading-relaxed">
              <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
              <p><strong className="text-foreground">Hranice experimentu:</strong> žádný účet, žádný psychologický profil, žádné ukládání odpovědí, žádné automatické hodnocení dítěte a žádné tvrzení, že simulovaný výsledek dokazuje skutečný dopad.</p>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
