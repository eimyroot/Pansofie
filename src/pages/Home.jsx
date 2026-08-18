import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import RoleEntry from "@/components/pansofie/RoleEntry";
import ExperienceStory from "@/components/pansofie/ExperienceStory";
import { LABS, PATHS, PROCESS_STEPS, PROGRAMS } from "@/lib/pansofieData";

const PROGRAM_STATE = {
  school: { label: "Připraveno pro první pilot", detail: "Digitální School flow je otestovaný na stagingu. Reálný školní field pilot je další krok." },
  family: { label: "Zapojení v prvním pilotu", detail: "Rodina dostává bezpečnou a dobrovolnou roli kolem konkrétní Experience; samostatný Family produkt ještě není live." },
  community: { label: "Zapojení podle Experience", detail: "Obec, spolek nebo komunita mohou přinést lokální potřebu, kontext a možnost výsledek použít. Samostatný runtime ještě není live." },
  youth: { label: "Připravujeme", detail: "Youth je směr pro 15+, samostatnost, práci, projekty a mentoring. Není prezentován jako hotový produkt." },
};

const HERO_TRUST = [
  "Škola drží bezpečný rámec",
  "Rodina přidává reálný kontext",
  "Firma nebo obec může přinést skutečný problém",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main>
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 h-[760px] w-[1160px] max-w-[125vw] bg-[radial-gradient(ellipse_at_center,_rgba(23,97,73,0.12),_transparent_64%)]" />
          </div>
          <div className="container-px max-w-7xl mx-auto text-center">
            <span className="chip border border-primary/15 bg-card/70 text-primary mb-6 shadow-sm"><Sparkles size={14} /> Experience-first ekosystém</span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold font-display tracking-tight text-balance leading-[1.04]">Poznej sebe.<br />Tvoř s druhými. <span className="text-primary">Zlepšuj svět.</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">Pansofie převádí skutečné potřeby do bezpečných Experiences, ve kterých mladý člověk něco opravdu udělá, doloží, pochopí a může na to navázat.</p>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">Jedna Experience propojuje žáka, školu, rodinu a podle potřeby firmu, obec nebo odborníka — bez otevřené sociální sítě a bez skórování člověka.</p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/zapojit-se?mode=simulator" className="action-primary w-full sm:w-auto px-7 py-3.5">Vyzkoušet Pansofii za 60 sekund <ArrowRight size={18} /></Link>
              <Link to="/pilot" className="action-secondary w-full sm:w-auto px-7 py-3.5">Prozkoumat první pilot <ArrowRight size={17} /></Link>
              <Link to="/jak-funguje" className="action-quiet">Jak Pansofie funguje <ArrowRight size={15} /></Link>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-muted-foreground">Interaktivní průvodce běží pouze v tomto prohlížeči a v současné pre-field-pilot verzi nic neposílá na server.</p>

            <div className="mt-9 mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-2.5 text-left">
              {HERO_TRUST.map((item) => (
                <div key={item} className="surface-subtle px-4 py-3.5 text-sm text-muted-foreground flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ExperienceStory />
        <RoleEntry />

        <section id="jak-funguje" className="py-20 sm:py-28 border-t border-border/60 bg-card/35 scroll-mt-24">
          <div className="container-px max-w-7xl mx-auto">
            <div className="max-w-3xl"><p className="eyebrow">PANSOFIE METHOD</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Čtyři kroky, které vracejí učení do reality.</h2><p className="mt-5 text-lg text-muted-foreground leading-relaxed">Metoda je jednoduchá na povrchu. Hloubka vzniká v tom, co člověk skutečně udělá, doloží, pochopí a přenese dál.</p></div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4">{PROCESS_STEPS.map((step, index) => <div key={step.title} className="relative border-l md:border-l-0 md:border-t border-primary/30 pl-6 md:pl-0 md:pt-6 pb-8 md:pb-0"><span className="absolute -left-[5px] top-1 md:left-0 md:-top-[5px] h-2.5 w-2.5 rounded-full bg-primary" /><p className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 text-xl font-semibold font-heading">{step.title}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p></div>)}</div>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border pt-6"><div><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tematická prostředí Experiences</p><div className="mt-3 flex flex-wrap gap-2">{LABS.map((lab) => <span key={lab.id} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold">{lab.name}</span>)}</div></div><Link to="/jak-funguje" className="action-quiet shrink-0 text-primary">Celý postup <ArrowRight size={16} /></Link></div>
          </div>
        </section>

        <section id="programy" className="py-20 sm:py-28 border-t border-border/60 scroll-mt-24">
          <div className="container-px max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-16 items-start">
            <div><p className="eyebrow">Co je připravené dnes</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Jedna metoda. Různé životní kontexty. Různá zralost.</h2><p className="mt-5 text-muted-foreground leading-relaxed">Veřejný web záměrně odděluje to, co je připravené k prvnímu pilotu, od toho, co teprve rozvíjíme.</p></div>
            <div className="divide-y divide-border rounded-3xl border border-border bg-card overflow-hidden shadow-sm">{PROGRAMS.map((program) => { const Icon = program.icon; const state = PROGRAM_STATE[program.id] || { label: "Připravujeme", detail: program.desc }; return <Link key={program.id} to={`/program/${program.id}`} className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 items-start p-5 sm:p-6 hover:bg-background/70"><span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={21} /></span><div><h3 className="font-semibold font-heading">{program.name}</h3><p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{state.detail}</p></div><span className="col-start-2 sm:col-start-auto status-pill status-neutral">{state.label}</span></Link>; })}</div>
          </div>
        </section>

        <section id="sedm-cest" className="py-16 sm:py-20 border-t border-border/60 bg-card/35 scroll-mt-24"><div className="container-px max-w-7xl mx-auto"><div className="max-w-2xl"><p className="eyebrow">7 cest rozvoje</p><h2 className="mt-2 text-2xl sm:text-4xl font-semibold font-display tracking-tight">Co se v Experiences může rozvíjet.</h2><p className="mt-3 text-sm sm:text-base text-muted-foreground">Cesty dávají Experiences společný jazyk. Nejsou to skóre člověka ani žebříček hodnoty.</p></div><div className="mt-8 flex flex-wrap gap-2.5">{PATHS.map((path) => { const Icon = path.icon; return <span key={path.id} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium"><Icon size={16} style={{ color: path.color }} /> {path.name}</span>; })}</div></div></section>

        <section id="duvera" className="py-20 sm:py-24 border-t border-border/60 scroll-mt-24"><div className="container-px max-w-6xl mx-auto"><div className="rounded-[2rem] bg-foreground text-background p-8 sm:p-12 lg:p-14 shadow-[0_30px_80px_-48px_rgba(23,32,28,0.9)]"><div className="flex items-start gap-4"><span className="h-12 w-12 rounded-2xl bg-background/10 flex items-center justify-center shrink-0"><ShieldCheck size={23} /></span><div className="max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">Důvěra není doplněk</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Přínos není skóre člověka.</h2><div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm sm:text-base text-background/75"><p>Žádné hodnocení lidské hodnoty, osobnosti nebo budoucí kariéry.</p><p>Žádný veřejný dětský profil ani otevřená dětská sociální síť.</p><p>Firma nekupuje pozitivní výsledek ani přístup k soukromým datům dítěte.</p><p>Rodina automaticky nevidí soukromou reflexi a mentor nemá neomezený soukromý kanál.</p></div><Link to="/bezpecnost" className="mt-7 inline-flex items-center gap-2 text-background font-semibold text-sm">Bezpečnost dětí <ArrowRight size={16} /></Link></div></div></div></div></section>

        <section className="py-20 sm:py-28 border-t border-border/60 bg-card/35"><div className="container-px max-w-5xl mx-auto text-center"><h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">První pilot má ověřit celý vztah, ne jen software.</h2><p className="mt-5 text-lg text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">Žák má získat skutečnou zkušenost. Učitel zvládnutelný workflow. Rodina bezpečnou a smysluplnou roli. Partner nebo komunita reálný důvod se zapojit.</p><div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"><Link to="/zapojit-se?role=school" className="action-primary w-full sm:w-auto px-7 py-3.5">Chci zapojit školu <ArrowRight size={18} /></Link><Link to="/zapojit-se?role=partner" className="action-secondary w-full sm:w-auto">Jsem partner / organizace <ArrowRight size={15} /></Link></div></div></section>
      </main>
      <PublicFooter />
    </div>
  );
}
