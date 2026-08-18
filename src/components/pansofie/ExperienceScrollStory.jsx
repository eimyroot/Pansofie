import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, CheckCircle2, FileCheck2, Lightbulb, MessageSquareText, Route, ShieldCheck, Sparkles, UsersRound } from "lucide-react";

const ICONS = [Lightbulb, ShieldCheck, UsersRound, Sparkles, FileCheck2, MessageSquareText, CheckCircle2, Route, Route, ArrowDown];

export default function ExperienceScrollStory({ path = [], role, problem }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const nodes = useRef([]);

  const stages = useMemo(() => path.map(([number, title, text], index) => ({ number, title, text, Icon: ICONS[index] || Sparkles })), [path]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.dataset?.storyIndex) setActiveIndex(Number(visible.target.dataset.storyIndex));
      },
      { rootMargin: "-28% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    nodes.current.filter(Boolean).forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [stages.length]);

  const active = stages[activeIndex] || stages[0];

  return (
    <section aria-labelledby="experience-scroll-story-title" className="mt-8 rounded-[2rem] border border-border bg-background overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-border bg-card/35">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Scroll storytelling</p>
        <h3 id="experience-scroll-story-title" className="mt-2 text-2xl sm:text-4xl font-semibold font-display tracking-tight">Sledujte, jak se problém mění v Experience.</h3>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">Nejde o dekorativní animaci. Každý krok vysvětluje, proč Pansofie odděluje reálnou práci, důkaz, reflexi, review, Passport a další rozhodnutí.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-24 lg:self-start p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border bg-foreground text-background lg:min-h-[620px] flex flex-col">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-background/50">Aktivní krok</p>
            <div className="mt-5 flex items-start gap-4">
              {active && <span className="h-12 w-12 rounded-2xl bg-background/10 flex items-center justify-center shrink-0"><active.Icon size={22} /></span>}
              <div>
                <p className="text-xs font-semibold text-background/55">{active?.number}</p>
                <h4 className="mt-1 text-2xl sm:text-3xl font-semibold font-display">{active?.title}</h4>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-background/70">{active?.text}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-background/15 bg-background/[0.06] p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-background/45">Váš scénář</p>
            <p className="mt-2 text-sm font-semibold">{role?.label || "Role"} → {problem?.challenge || "Experience"}</p>
            <p className="mt-2 text-xs text-background/55 leading-relaxed">Výstup není skóre člověka. Je to vysvětlení procesu konkrétní Experience.</p>
          </div>

          <div className="mt-auto pt-8">
            <div className="flex gap-1.5" aria-label={`Krok ${activeIndex + 1} z ${stages.length}`}>
              {stages.map((stage, index) => (
                <button
                  key={stage.number}
                  type="button"
                  aria-label={`Přejít na krok ${index + 1}: ${stage.title}`}
                  aria-pressed={activeIndex === index}
                  onClick={() => {
                    setActiveIndex(index);
                    nodes.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`h-2 rounded-full transition-[width,background-color] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background ${activeIndex === index ? "w-8 bg-background" : "w-2 bg-background/25 hover:bg-background/45"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7 lg:p-9 space-y-4 sm:space-y-6">
          {stages.map((stage, index) => {
            const Icon = stage.Icon;
            const isActive = index === activeIndex;
            return (
              <article
                key={stage.number}
                ref={(node) => { nodes.current[index] = node; }}
                data-story-index={index}
                tabIndex={0}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`min-h-[210px] sm:min-h-[240px] rounded-3xl border p-6 sm:p-7 flex flex-col justify-between transition-[border-color,background-color,transform] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isActive ? "border-primary/45 bg-primary/[0.045] sm:translate-x-1" : "border-border bg-card/25"}`}
              >
                <div className="flex items-start justify-between gap-5">
                  <span className={`h-11 w-11 rounded-2xl flex items-center justify-center ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Icon size={20} /></span>
                  <span className="text-xs font-semibold text-muted-foreground">{stage.number}</span>
                </div>
                <div className="mt-8">
                  <h4 className="text-xl sm:text-2xl font-semibold font-display">{stage.title}</h4>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{stage.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
