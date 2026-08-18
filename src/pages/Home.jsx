import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import RoleEntry from "@/components/pansofie/RoleEntry";
import ExperienceStory from "@/components/pansofie/ExperienceStory";
import { LABS, PATHS, PROCESS_STEPS, PROGRAMS } from "@/lib/pansofieData";

const PROGRAM_STATE = {
  school: {
    label: "Připraveno pro první pilot",
    detail: "Digitální School flow je otestovaný na stagingu. Reálný školní field pilot je další krok.",
  },
  family: {
    label: "Zapojení v prvním pilotu",
    detail: "Rodina dostává bezpečnou a dobrovolnou roli kolem konkrétní Experience; samostatný Family produkt ještě není live.",
  },
  community: {
    label: "Zapojení podle Experience",
    detail: "Obec, spolek nebo komunita mohou přinést lokální potřebu, kontext a možnost výsledek použít. Samostatný runtime ještě není live.",
  },
  youth: {
    label: "Připravujeme",
    detail: "Youth je směr pro 15+, samostatnost, práci, projekty a mentoring. Není prezentován jako hotový produkt.",
  },
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
            <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 h-[720px] w-[1100px] max-w-[120vw] bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.13),_transparent_62%)]" />
          </div>

          <div className="container-px max-w-7xl mx-auto text-center">
            <span className="chip bg-primary/10 text-primary mb-6"><Sparkles size={14} /> Ekosystém skutečných zkušeností</span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold font-display tracking-tight text-balance leading-[1.05]">
              Poznej sebe.<br />Tvoř s druhými. <span className="text-primary">Zlepšuj svět.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
              Mladí lidé se učí spoustu důležitých věcí. Pansofie jim dává prostor je skutečně použít — s lidmi, na reálném problému a s výsledkem, který má smysl.
            </p>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Z reálné činnosti vzniká důkaz, reflexe, ověřená Experience a další krok.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/pilot" className="w-full sm:w-auto px-7 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Prozkoumat první pilot <ArrowRight size={18} />
              </Link>
              <Link to="/jak-funguje" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                Jak Pansofie funguje <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {HERO_TRUST.map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-primary" />{item}</span>
              ))}
            </div>
          </div>
        </section>

        <ExperienceStory />
        <RoleEntry />

        <section id="jak-funguje" className="py-20 sm:py-28 border-t border-border/60 bg-card/40 scroll-mt-24">
          <div className="container-px max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">PANSOFIE METHOD</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Čtyři kroky, které vracejí učení do reality.</h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">Metoda je jednoduchá na povrchu. Hloubka vzniká v tom, co člověk skutečně udělá, doloží, pochopí a přenese dál.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.title} className="relative border-l md:border-l-0 md:border-t border-primary/30 pl-6 md:pl-0 md:pt-6 pb-8 md:pb-0">
                  <span className="absolute -left-[5px] top-1 md:left-0 md:-top-[5px] h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                  <p className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-xl font-semibold font-heading">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border pt-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tematická prostředí Experiences</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {LABS.map((lab) => (
                    <span key={lab.id} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold">{lab.name}</span>
                  ))}
                </div>
              </div>
              <Link to="/jak-funguje" className="shrink-0 inline-flex items-center gap-2 text-primary font-semibold text-sm hover:opacity-80">Celý postup <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section id="programy" className="py-20 sm:py-28 border-t border-border/60 scroll-mt-24">
          <div className="container-px max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-16 items-start">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Co je připravené dnes</p>
                <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Jedna metoda. Různé životní kontexty. Různá zralost.</h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">Veřejný web záměrně odděluje to, co je připravené k prvnímu pilotu, od toho, co teprve rozvíjíme.</p>
              </div>

              <div className="divide-y divide-border rounded-3xl border border-border bg-card/40 overflow-hidden">
                {PROGRAMS.map((program) => {
                  const Icon = program.icon;
                  const state = PROGRAM_STATE[program.id] || { label: "Připravujeme", detail: program.desc };
                  return (
                    <Link key={program.id} to={`/program/${program.id}`} className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 items-start p-5 sm:p-6 hover:bg-background transition-colors">
                      <span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={21} /></span>
                      <div>
                        <h3 className="font-semibold font-heading">{program.name}</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{state.detail}</p>
                      </div>
                      <span className="col-start-2 sm:col-start-auto justify-self-start sm:justify-self-end rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">{state.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="sedm-cest" className="py-16 sm:py-20 border-t border-border/60 bg-card/40 scroll-mt-24">
          <div className="container-px max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">7 cest rozvoje</p>
                <h2 className="mt-2 text-2xl sm:text-4xl font-semibold font-display tracking-tight">Co se v Experiences může rozvíjet.</h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground">Cesty dávají Experiences společný jazyk. Nejsou to skóre člověka ani žebříček hodnoty.</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {PATHS.map((path) => {
                const Icon = path.icon;
                return (
                  <span key={path.id} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium">
                    <Icon size={16} style={{ color: path.color }} /> {path.name}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section id="duvera" className="py-20 sm:py-24 border-t border-border/60 scroll-mt-24">
          <div className="container-px max-w-6xl mx-auto">
            <div className="rounded-[2rem] bg-foreground text-background p-8 sm:p-12 lg:p-14">
              <div className="flex items-start gap-4">
                <span className="h-12 w-12 rounded-2xl bg-background/10 flex items-center justify-center shrink-0"><ShieldCheck size={23} /></span>
                <div className="max-w-4xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">Důvěra není doplněk</p>
                  <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Přínos není skóre člověka.</h2>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm sm:text-base text-background/75 leading-relaxed">
                    <p>Žádné hodnocení lidské hodnoty, osobnosti nebo budoucí kariéry.</p>
                    <p>Žádný veřejný dětský profil ani otevřená dětská sociální síť.</p>
                    <p>Firma nekupuje pozitivní výsledek ani přístup k soukromým datům dítěte.</p>
                    <p>Rodina automaticky nevidí soukromou reflexi a mentor nemá neomezený soukromý kanál.</p>
                  </div>
                  <Link to="/jak-funguje#duvera" className="mt-7 inline-flex items-center gap-2 text-background font-semibold text-sm hover:opacity-80">Jak chráníme Experience <ArrowRight size={16} /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 border-t border-border/60 bg-card/40">
          <div className="container-px max-w-5xl mx-auto text-center">
            <span className="inline-flex h-14 w-14 rounded-2xl bg-primary text-primary-foreground items-center justify-center mb-6"><Leaf size={26} strokeWidth={2.4} /></span>
            <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">První pilot má ověřit celý vztah, ne jen software.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">Žák má získat skutečnou zkušenost. Učitel zvládnutelný workflow. Rodina bezpečnou a smysluplnou roli. Partner nebo komunita reálný důvod se zapojit. A Pansofie musí umět doložit, co fungovalo — i co ne.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/pilot" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90">Prozkoumat první pilot <ArrowRight size={18} /></Link>
              <Link to="/partneri" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Jak se zapojí partner <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border/60">
        <div className="container-px max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-heading font-bold"><span className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={15} strokeWidth={2.4} /></span>Pansofie</div>
          <div className="text-sm text-muted-foreground">Poznej sebe. Tvoř s druhými. Zlepšuj svět.</div>
        </div>
      </footer>
    </div>
  );
}
