import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import SectionHeading from "@/components/pansofie/SectionHeading";
import RoleEntry from "@/components/pansofie/RoleEntry";
import PansofieIdea from "@/components/pansofie/PansofieIdea";
import PathPillar from "@/components/pansofie/PathPillar";
import { PATHS, LABS, PROGRAMS } from "@/lib/pansofieData";

const PROGRAM_STATE = {
  school: {
    label: "PILOT NOW",
    detail: "School má ověřený digitální Experience flow. Teď připravujeme skutečný field pilot se školou, rodinami a reálným světem.",
  },
  family: {
    label: "PILOT PARTICIPATION",
    detail: "Rodina je součást prvního pilotu jako bezpečný a dobrovolný participant. Samostatný Family produkt zatím není live.",
  },
  community: {
    label: "PILOT PARTICIPATION",
    detail: "Obec, spolek nebo komunita mohou přinést lokální potřebu, kontext a možnost využít výsledek. Standalone runtime přijde až po validaci.",
  },
  youth: {
    label: "DEVELOPING",
    detail: "Youth zůstává canonical směrem pro 15+, samostatnost, práci a mentoring. Není součástí prvního School pilotu jako hotový produkt.",
  },
};

const HERO_POINTS = [
  "Škola drží bezpečný rámec",
  "Rodina propojuje Experience s reálným životem",
  "Firma nebo obec přináší skutečný problém",
];

export default function Home() {
  return (
    <div>
      <PublicNav />

      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[620px] w-[960px] bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12),_transparent_60%)]" />
          {PATHS.map((path, index) => (
            <div
              key={path.id}
              className="absolute h-3 w-3 rounded-full blur-[2px] opacity-70 animate-pulse"
              style={{
                backgroundColor: path.color,
                top: `${15 + (index % 4) * 18}%`,
                left: `${10 + (index * 13) % 80}%`,
                animationDelay: `${index * 0.4}s`,
              }}
            />
          ))}
        </div>

        <div className="container-px max-w-7xl mx-auto text-center">
          <span className="chip bg-primary/10 text-primary mb-6"><Sparkles size={14} /> Ekosystém skutečných zkušeností</span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold font-display tracking-tight text-balance leading-[1.05]">
            Poznej sebe.<br />Tvoř s druhými. <span className="text-primary">Zlepšuj svět.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
            Pansofie propojuje děti a mladé lidi, rodiny, školy, firmy, obce, odborníky a komunity kolem skutečných Experiences — tak, aby každý vztah měl jasný účel a zanechal reálný přínos.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/pilot" className="w-full sm:w-auto px-6 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              Prozkoumat první pilot <ArrowRight size={18} />
            </Link>
            <a href="/#ekosystem" className="w-full sm:w-auto px-6 py-3.5 bg-card border border-border rounded-2xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-muted/60 transition-colors">
              Kdo se zapojuje
            </a>
            <Link to="/jak-funguje" className="w-full sm:w-auto px-6 py-3.5 text-muted-foreground rounded-2xl font-semibold inline-flex items-center justify-center gap-2 hover:text-foreground transition-colors">
              <Compass size={18} /> Jak to funguje
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto text-left">
            {HERO_POINTS.map((item, index) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-background/70 backdrop-blur px-4 py-4 flex items-start gap-3">
                <span className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">{index + 1}</span>
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PansofieIdea />
      <RoleEntry />

      <section id="vzajemny-prinos" className="py-20 sm:py-24 border-t border-border/60">
        <div className="container-px max-w-6xl mx-auto">
          <div className="card-soft p-8 sm:p-12 bg-primary/[0.03] border-primary/20">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Vzájemný přínos</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Každý vztah v Pansofii musí mít skutečný důvod existence.</h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Každý něco získává — zkušenost, podporu, příležitost nebo řešení — a zároveň přináší něco užitečného druhým: čas, znalost, péči, reálný problém, zdroje, zpětnou vazbu nebo možnost něco skutečně změnit.
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Přínos nikdy není skóre člověka ani povinnost „být užitečný“. Hodnotíme konkrétní výsledek spolupráce, ne lidskou hodnotu. Každý tvrzený přínos má mít příjemce, být férový, bezpečný a pokud možno doložitelný.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">1 · Získávám</p>
                <h3 className="mt-2 font-semibold text-lg">Skutečnou hodnotu</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Učení, podporu, zkušenost, vztahy, příležitost, řešení nebo přístup ke světu mimo vlastní bublinu.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">2 · Přináším</p>
                <h3 className="mt-2 font-semibold text-lg">Něco užitečného</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Nápad, práci, zkušenost, péči, expertizu, problém k řešení, prostředí, zdroj nebo zpětnou vazbu.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">3 · Zůstává</p>
                <h3 className="mt-2 font-semibold text-lg">Doložitelný přínos</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Výsledek, zkušenost, změna, adopce nebo poznatek, který může pomoci člověku, škole, rodině, organizaci či komunitě.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="jak-funguje" className="py-16 sm:py-20 border-t border-border/60 bg-card/40">
        <div className="container-px max-w-4xl mx-auto">
          <div className="card-soft p-8 sm:p-10 bg-background border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold font-display tracking-tight">Jak Pansofie funguje?</h2>
              <p className="text-muted-foreground mt-2">Není to obsah ke čtení. Je to systém zkušeností — od skutečné potřeby přes činnost, důkaz a reflexi k přínosu a dalšímu kroku.</p>
            </div>
            <Link to="/jak-funguje" className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity">
              Otevřít stránku <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section id="sedm-cest" className="py-20 sm:py-28 border-t border-border/60">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="7 pilířů rozvoje"
            title="Sedm pilířů, kterými se rozvíjíš"
            subtitle="Konzistentní rámec napříč celou platformou. Každý pilíř dává Experiences společný jazyk, ale nevytváří skóre člověka."
            center
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PATHS.map((path) => <PathPillar key={path.id} path={path} />)}
          </div>
        </div>
      </section>

      <section id="programy" className="py-20 sm:py-28 border-t border-border/60 bg-card/40">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Programy"
            title="Jedna metoda, různé životní kontexty"
            subtitle="Program není nový engine. Je to kontext, ve kterém stejný Experience Standard propojuje člověka, lidi kolem něj a skutečný svět. Stav každého programu uvádíme otevřeně."
            center
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRAMS.map((program) => {
              const Icon = program.icon;
              const state = PROGRAM_STATE[program.id] || { label: "DEVELOPING", detail: program.desc };
              return (
                <Link key={program.id} to={`/program/${program.id}`} className="card-soft p-6 transition-all duration-300 hover:-translate-y-1 block bg-background">
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={22} strokeWidth={2} /></div>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold tracking-wide text-muted-foreground">{state.label}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold font-heading">{program.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{program.desc}</p>
                  <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border leading-relaxed">{state.detail}</p>
                  <div className="mt-5 text-sm text-primary font-medium inline-flex items-center gap-1">Detail programu <ArrowRight size={14} /></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="labs" className="py-20 sm:py-28 border-t border-border/60">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Projects & Labs"
            title="Labs — kde se skutečná práce odehrává"
            subtitle="Lab není schopnost ani samostatná firma. Je to prostředí aktivity, ve kterém vzniká výstup, důkaz, reflexe a přínos."
            center
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LABS.map((lab) => {
              const Icon = lab.icon;
              return (
                <div key={lab.id} className="card-soft p-6 group transition-all duration-300 hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${lab.color}18`, color: lab.color }}>
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold font-heading">{lab.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{lab.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-border/60 bg-card/40">
        <div className="container-px max-w-5xl mx-auto">
          <div className="card-soft p-8 sm:p-11 bg-primary/[0.03] border-primary/20 text-center">
            <span className="inline-flex h-14 w-14 rounded-2xl bg-primary text-primary-foreground items-center justify-center mb-6"><Leaf size={26} strokeWidth={2.4} /></span>
            <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">První pilot má ověřit celý vztah, ne jen software.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
              Žák má získat skutečnou zkušenost. Učitel zvládnutelný workflow. Rodina smysluplnou a bezpečnou roli. Partner nebo komunita skutečný výstup. A Pansofie musí umět doložit, co fungovalo — i co ne.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/pilot" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity">
                Otevřít pilot <ArrowRight size={18} />
              </Link>
              <a href="/#ekosystem" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-background border border-border rounded-2xl font-semibold">
                Zobrazit ekosystém
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/60">
        <div className="container-px max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-heading font-bold"><span className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={15} strokeWidth={2.4} /></span>Pansofie</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck size={15} /> Poznej sebe. Tvoř s druhými. Zlepšuj svět.</div>
        </div>
      </footer>
    </div>
  );
}
