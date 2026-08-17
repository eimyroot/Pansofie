import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Handshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";

const EXPERIENCES = [
  {
    number: "01",
    title: "Zlepši svou školu",
    hypothesis: "Agency · místní účast · řešení problému",
    text: "Žáci identifikují konkrétní problém ve škole, navrhnou dosažitelnou změnu, provedou malý pilot a doloží, co se skutečně změnilo.",
    icon: GraduationCap,
  },
  {
    number: "02",
    title: "Digitální most",
    hypothesis: "Spolupráce generací · bezpečné digitální dovednosti",
    text: "Žáci připraví bezpečnou a praktickou pomoc člověku z jiné generace. Výsledkem není test, ale doložená služba a reflexe toho, co fungovalo.",
    icon: Users,
  },
  {
    number: "03",
    title: "Circular Challenge",
    hypothesis: "Reálná výzva · zdroje · adopce výsledku",
    text: "Škola, komunita nebo partner dodá ohraničenou výzvu. Tým změří výchozí stav, vytvoří řešení a oddělí výstup od skutečné adopce a dopadu.",
    icon: Leaf,
  },
];

const SPINE = [
  "Onboarding školy",
  "3 Experiences",
  "Důkaz",
  "Reflexe",
  "Učitelský review",
  "Passport",
  "PANSOFIE DAY",
  "Evidence Review",
];

const ROLES = [
  {
    title: "Žák",
    icon: Sparkles,
    text: "Dělá skutečnou činnost, ukládá důkaz a vlastní reflexi. Nemůže si sám ověřit dokončení ani Passport.",
  },
  {
    title: "Učitel / koordinátor",
    icon: BookOpenCheck,
    text: "Přiřazuje mise, kontroluje pouze povolený scope a odděleně potvrzuje výsledek. Nemění žákovu reflexi.",
  },
  {
    title: "Škola",
    icon: Building2,
    text: "Drží organizační rámec, kontaktní osoby, účel zpracování a bezpečný provoz pilotu.",
  },
  {
    title: "Partner",
    icon: Handshake,
    text: "Může dodat vhodnou Challenge a zpětnou vazbu k práci. Nekupuje hodnocení žáka, adopci ani pozitivní impact claim.",
  },
];

const BOUNDARIES = [
  "Žádný veřejný dětský profil ani otevřená dětská síť.",
  "Žádné AI hodnocení člověka, osobnosti nebo budoucí kariéry.",
  "Žádný jediný lidský score; hodnotí se doložená práce a proces.",
  "Partner nemá neomezené soukromé zprávy směrem k dětem.",
  "Účast ve vzdělávání není podmíněná marketingovým souhlasem.",
  "Výstup, adopce, outcome a impact jsou vedené jako rozdílné věci.",
];

export default function Pilot() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-7xl mx-auto py-12 sm:py-20">
          <div className="max-w-4xl">
            <span className="chip bg-primary/10 text-primary mb-5">
              <GraduationCap size={14} /> PANSOFIE SCHOOL · PILOT R1
            </span>
            <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">
              Ne další školní aplikace. <span className="text-primary">Tři skutečné zkušenosti, které se dají doložit.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Pilot převádí PANSOFIE Method do malého, měřitelného školního provozu: reálná činnost → důkaz → reflexe → oddělené ověření → Passport.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/login?returnTo=%2Fskola"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:opacity-90"
              >
                Vstoupit do školního pilotu <ArrowRight size={18} />
              </Link>
              <Link
                to="/jak-funguje"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 font-semibold hover:bg-muted/60"
              >
                Jak funguje Pansofie
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-20">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">
              <div>
                <p className="text-sm font-semibold text-primary">PILOTNÍ PÁTEŘ</p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Jeden uzavřený osmitýdenní cyklus</h2>
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays size={17} /> menší rozsah, měřitelný provoz, jasný GO / CHANGE / STOP
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
              {SPINE.map((item, index) => (
                <div key={item} className="card-soft p-4 min-h-28 flex flex-col justify-between">
                  <span className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-medium leading-snug mt-5">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold text-primary">3 EXPERIENCES</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Tři různé hypotézy hodnoty</h2>
            <p className="mt-4 text-muted-foreground">Pilot záměrně netestuje všechno. Každá Experience má jiný důvod existence a musí skončit konkrétním dokladem práce.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {EXPERIENCES.map((experience) => {
              const Icon = experience.icon;
              return (
                <article key={experience.number} className="card-soft p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={23} /></span>
                    <span className="text-xs font-semibold text-muted-foreground">EXPERIENCE {experience.number}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold font-heading">{experience.title}</h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">{experience.hypothesis}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{experience.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-8">
              <div>
                <p className="text-sm font-semibold text-primary">ROLE A ODPOVĚDNOST</p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Každý vidí a dělá jen to, co má</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ROLES.map((role) => {
                    const Icon = role.icon;
                    return (
                      <div key={role.title} className="card-soft p-5 bg-background">
                        <div className="flex items-center gap-3"><Icon size={18} className="text-primary" /><h3 className="font-semibold">{role.title}</h3></div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{role.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className="card-soft p-6 sm:p-7 border-primary/20 bg-primary/[0.025]">
                <div className="flex items-center gap-3"><ShieldCheck size={22} className="text-primary" /><h2 className="text-xl font-semibold font-heading">Pilotní hranice</h2></div>
                <p className="mt-3 text-sm text-muted-foreground">Co PANSOFIE v tomto pilotu záměrně nedělá:</p>
                <div className="mt-5 space-y-3">
                  {BOUNDARIES.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-relaxed">
                      <CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="card-soft p-6">
              <FileCheck2 size={22} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Evidence místo dojmu</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Dokončení není kliknutí. Běh potřebuje skutečný důkaz, reflexi a samostatný review záznam.</p>
            </div>
            <div className="card-soft p-6">
              <BadgeCheck size={22} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Passport až po ověření</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Passport reprezentuje dokončenou zkušenost. Žák si jej nemůže sám označit jako ověřený.</p>
            </div>
            <div className="card-soft p-6">
              <ShieldCheck size={22} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Soukromí podle účelu</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Oprávnění k jednomu typu review automaticky neotevírá soukromou reflexi nebo jiný scope.</p>
            </div>
          </div>

          <div className="mt-12 card-soft p-7 sm:p-9 bg-primary/[0.03] border-primary/20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary">STAGING PILOT</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display">Produkt už má skutečný School runtime. Tohle je jeho veřejná pilotní tvář.</h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground">Přihlášený žák a učitel pokračují v PANSOFIE SCHOOL, kde běží přiřazení mise, evidence, reflexe, review, revize a finalizace Experience.</p>
            </div>
            <Link
              to="/login?returnTo=%2Fskola"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:opacity-90"
            >
              Otevřít PANSOFIE SCHOOL <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-border/60">
        <div className="container-px max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-heading font-bold"><span className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={15} /></span>Pansofie</div>
          <p className="text-sm text-muted-foreground">Poznej sebe. Tvoř s druhými. Zlepšuj svět.</p>
        </div>
      </footer>
    </div>
  );
}
