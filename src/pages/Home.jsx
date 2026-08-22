import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import ExperienceStory from "@/components/pansofie/ExperienceStory";
import RoleEntry from "@/components/pansofie/RoleEntry";
import PublicMaturity from "@/components/pansofie/PublicMaturity";
import { LABS, PATHS, PROCESS_STEPS, PROGRAMS } from "@/lib/pansofieData";

const PROGRAM_STATE = {
  school: {
    label: "Připraveno k reálnému ověření",
    detail: "Digitální postup pro školu je hotový a technicky otestovaný. Teď potřebujeme zjistit, jak funguje v běžné škole.",
  },
  family: {
    label: "Připraveno pro pilotní zapojení",
    detail: "Rodina může přidat užitečný kontext nebo podnět, aniž by přebírala práci dítěte nebo jeho soukromou reflexi.",
  },
  community: {
    label: "Zapojení podle konkrétní zkušenosti",
    detail: "Obec, spolek nebo komunita mohou přinést místní potřebu, znalost prostředí a možnost dobrý výsledek skutečně vyzkoušet.",
  },
  youth: {
    label: "Rozvíjíme",
    detail: "Připravovaná větev pro mladé 15+ má navazovat na samostatnost, práci, projekty, mentoring a zkušenosti z reálného světa.",
  },
};

const HERO_FLOW = ["Potřeba", "Akce", "Důkaz", "Reflexe", "Ověření", "Experience Passport"];
const HERO_TRUST = [
  "Škola drží bezpečný rámec",
  "Rodina přidává životní kontext",
  "Partner hodnotí výstup, nikdy člověka",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main>
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute top-[-220px] left-[18%] h-[720px] w-[920px] max-w-[120vw] bg-[radial-gradient(ellipse_at_center,_rgba(23,97,73,0.12),_transparent_66%)]" />
          </div>

          <div className="container-px max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="chip border border-primary/15 bg-card/70 text-primary mb-6 shadow-sm"><Sparkles size={14} /> Učení, které pokračuje v reálném světě</span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold font-display tracking-tight text-balance leading-[1.04]">Poznej sebe.<br />Tvoř s druhými. <span className="text-primary">Zlepšuj svět.</span></h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed text-balance">Pansofie propojuje učení se skutečnou zkušeností. Mladý člověk řeší konkrétní problém, něco udělá nebo vytvoří, doloží svou práci, zamyslí se nad ní a zjistí, co může udělat dál.</p>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">Takové zkušenosti říkáme v Pansofii <strong className="text-foreground font-semibold">Experience</strong>. Kolem jedné mohou spolupracovat žák, škola, rodina, odborník, partner nebo komunita. Každý má jinou roli a vidí jen informace, které pro ni potřebuje.</p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link to="/zapojit-se?mode=simulator" className="action-primary w-full sm:w-auto px-7 py-3.5">Vyzkoušet Pansofii za 60 sekund <ArrowRight size={18} /></Link>
                <Link to="/jak-funguje" className="action-secondary w-full sm:w-auto px-7 py-3.5">Jak to funguje <ArrowRight size={17} /></Link>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-muted-foreground">Interaktivní ukázka nic neodesílá ani neukládá na server.</p>

              <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-2.5">
                {HERO_TRUST.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:pl-4">
              <div className="absolute -inset-5 -z-10 rounded-[3rem] bg-primary/[0.035] blur-2xl" aria-hidden="true" />
              <div className="surface-raised overflow-hidden rounded-[2rem] border border-primary/20 shadow-[0_28px_80px_-46px_rgba(23,97,73,0.55)]">
                <div className="flex items-start justify-between gap-5 px-6 py-5 sm:px-8 sm:py-6 border-b border-border/70">
                  <div>
                    <p className="eyebrow">Jedna skutečná zkušenost</p>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display">Zlepši svou školu</h2>
                  </div>
                  <span className="status-pill status-neutral shrink-0">Ukázkový scénář</span>
                </div>

                <div className="px-6 sm:px-8">
                  {HERO_FLOW.map((item, index) => (
                    <div key={item} className="grid grid-cols-[auto_1fr_auto] gap-4 items-center py-4 border-b border-border/70 last:border-b-0">
                      <span className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold ${index === HERO_FLOW.length - 1 ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="font-semibold text-sm sm:text-base">{item}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{index === 0 ? "Začíná konkrétní potřebou." : index === HERO_FLOW.length - 1 ? "Zůstává soukromý záznam ověřené zkušenosti." : "Navazuje na předchozí krok."}</p>
                      </div>
                      {index < HERO_FLOW.length - 1 ? <span className="text-xs font-semibold text-muted-foreground">→</span> : <CheckCircle2 size={18} className="text-primary" />}
                    </div>
                  ))}
                </div>

                <div className="m-4 sm:m-5 rounded-2xl bg-primary/[0.055] border border-primary/15 px-5 py-4 flex items-start gap-3">
                  <ShieldCheck size={19} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed"><strong className="text-foreground font-semibold">Dokončená aktivita ještě není důkaz skutečného dopadu.</strong> Pansofie zvlášť sleduje, co člověk udělal, co vytvořil, zda se výsledek použil a co se potom opravdu změnilo.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ExperienceStory />
        <RoleEntry />

        <section id="jak-funguje" className="py-20 sm:py-28 border-t border-border/60 bg-card/35 scroll-mt-24">
          <div className="container-px max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="eyebrow">03 · METODA PANSOFIE</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Jednoduchá logika: něco objevit, udělat, pochopit a posunout dál.</h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">Každá Experience má být srozumitelná člověku a zároveň dost přesná na to, aby škola dokázala odlišit skutečnou práci od pouhého dojmu.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.title} className="relative border-l md:border-l-0 md:border-t border-primary/30 pl-6 md:pl-0 md:pt-6 pb-8 md:pb-0">
                  <span className="absolute -left-[5px] top-1 md:left-0 md:-top-[5px] h-2.5 w-2.5 rounded-full bg-primary" />
                  <p className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-xl font-semibold font-heading">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border pt-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tematická prostředí pro zkušenosti</p>
                <div className="mt-3 flex flex-wrap gap-2">{LABS.map((lab) => <span key={lab.id} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold">{lab.name}</span>)}</div>
              </div>
              <Link to="/jak-funguje" className="action-quiet shrink-0 text-primary">Celý postup <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <PublicMaturity />

        <section id="programy" className="py-20 sm:py-28 border-t border-border/60 scroll-mt-24">
          <div className="container-px max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="eyebrow">05 · KDE SE ZKUŠENOSTI ODEHRÁVAJÍ</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Jedna metoda. Různé životní situace.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Jednotlivé programy nejsou oddělené produkty. Jsou to různá prostředí, ve kterých se stejný princip skutečné zkušenosti používá pro jiné potřeby a jiné skupiny lidí.</p>
            </div>
            <div className="divide-y divide-border border-y border-border bg-card">
              {PROGRAMS.map((program) => {
                const Icon = program.icon;
                const state = PROGRAM_STATE[program.id] || { label: "Rozvíjíme", detail: program.desc };
                return (
                  <Link key={program.id} to={`/program/${program.id}`} className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 items-start py-5 sm:py-6 hover:bg-background/70 px-4 sm:px-5">
                    <span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={21} /></span>
                    <div><h3 className="font-semibold font-heading">{program.name}</h3><p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{state.detail}</p></div>
                    <span className="col-start-2 sm:col-start-auto status-pill status-neutral">{state.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="sedm-cest" className="py-16 sm:py-20 border-t border-border/60 bg-card/35 scroll-mt-24">
          <div className="container-px max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <p className="eyebrow">06 · CO SE MŮŽE ROZVÍJET</p>
              <h2 className="mt-2 text-2xl sm:text-4xl font-semibold font-display tracking-tight">Sedm cest pomáhá pojmenovat, v čem se člověk během zkušenosti posouvá.</h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground">Nejsou to body ani žebříček člověka. Jsou to oblasti, kterých se konkrétní zkušenost může dotknout.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {PATHS.map((path) => {
                const Icon = path.icon;
                return <span key={path.id} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium"><Icon size={16} style={{ color: path.color }} /> {path.name}</span>;
              })}
            </div>
          </div>
        </section>

        <section id="duvera" className="py-20 sm:py-24 border-t border-border/60 scroll-mt-24">
          <div className="container-px max-w-6xl mx-auto">
            <div className="rounded-[2rem] bg-foreground text-background p-8 sm:p-12 lg:p-14 shadow-[0_30px_80px_-48px_rgba(23,32,28,0.9)]">
              <div className="flex items-start gap-4">
                <span className="h-12 w-12 rounded-2xl bg-background/10 flex items-center justify-center shrink-0"><ShieldCheck size={23} /></span>
                <div className="max-w-4xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">07 · DŮVĚRA JE SOUČÁST PRODUKTU</p>
                  <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Pansofie nehodnotí hodnotu člověka. A soukromí není dekorace.</h2>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm sm:text-base text-background/75">
                    <p>Žádné hodnocení lidské hodnoty, osobnosti nebo budoucí kariéry.</p>
                    <p>Žádný veřejný dětský profil ani otevřená sociální síť dětí.</p>
                    <p>Partner nekupuje pozitivní výsledek ani přístup k soukromým údajům dítěte.</p>
                    <p>Rodina automaticky nevidí soukromou reflexi a mentor nemá neomezený soukromý kontakt.</p>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link to="/bezpecnost" className="inline-flex items-center gap-2 text-background font-semibold text-sm">Bezpečnost dětí <ArrowRight size={16} /></Link>
                    <Link to="/soukromi" className="inline-flex items-center gap-2 text-background/75 font-semibold text-sm">Soukromí <ArrowRight size={16} /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 border-t border-border/60 bg-card/35">
          <div className="container-px max-w-5xl mx-auto text-center">
            <p className="eyebrow">08 · TEĎ MUSÍ PŘIJÍT REALITA</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">První pilot má ověřit celý způsob spolupráce, ne jen software.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">Žák má získat skutečnou zkušenost. Učitel zvládnutelný postup. Rodina bezpečnou roli. Partner nebo komunita reálný důvod se zapojit. Teprve potom můžeme poctivě říct, co Pansofie skutečně přináší.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/zapojit-se?role=school" className="action-primary w-full sm:w-auto px-7 py-3.5">Chci projít školní cestu <ArrowRight size={18} /></Link>
              <Link to="/zapojit-se?role=partner" className="action-secondary w-full sm:w-auto">Jsem partner / organizace <ArrowRight size={15} /></Link>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">Tato veřejná verze zatím nesbírá kontaktní údaje. Další krok se přizpůsobí zvolené roli; nejde o skrytý kontaktní formulář.</p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
