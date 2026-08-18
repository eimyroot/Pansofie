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
  HeartHandshake,
  Landmark,
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
    text: "Žáci připraví bezpečnou a praktickou pomoc člověku z jiné generace v předem vyjasněném a dohlíženém rámci. Výsledkem není test, ale doložená služba a reflexe toho, co fungovalo.",
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
    status: "Součást pilotu",
    text: "Dělá skutečnou činnost, ukládá důkaz a vlastní reflexi. Nemůže si sám ověřit dokončení ani Passport.",
  },
  {
    title: "Učitel / koordinátor",
    icon: BookOpenCheck,
    status: "Řídí školní workflow",
    text: "Přiřazuje mise, kontroluje pouze povolený scope a odděleně potvrzuje výsledek. Nemění žákovu reflexi.",
  },
  {
    title: "Škola",
    icon: Building2,
    status: "Bezpečný host pilotu",
    text: "Drží organizační rámec, kontaktní osoby, účel zpracování, pedagogické vedení a bezpečný provoz pilotu.",
  },
  {
    title: "Rodina",
    icon: HeartHandshake,
    status: "Dobrovolné zapojení",
    text: "Dostává srozumitelný kontext a u vybraných Experiences může přidat reálný podnět, zkušenost nebo kontakt bez přebírání práce dítěte.",
  },
  {
    title: "Partner",
    icon: Handshake,
    status: "Ohraničená Challenge",
    text: "Může dodat vhodnou Challenge, expertizu a zpětnou vazbu k práci. Nekupuje hodnocení žáka, adopci ani pozitivní impact claim.",
  },
  {
    title: "Obec / komunita",
    icon: Landmark,
    status: "Podle konkrétní Experience",
    text: "Může přinést lokální potřebu, veřejný kontext a možnost výsledek vyzkoušet nebo použít bez nároku na soukromá data dětí.",
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
            <span className="chip bg-primary/10 text-primary mb-5"><GraduationCap size={14} /> PANSOFIE SCHOOL · PŘIPRAVENO PRO PRVNÍ FIELD PILOT</span>
            <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Ne další školní aplikace. <span className="text-primary">Tři skutečné zkušenosti, které se dají doložit.</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">Pilot převádí PANSOFIE Method do malého, měřitelného školního provozu: reálná činnost → důkaz → reflexe → oddělené ověření → Passport.</p>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">Digitální School flow je funkční a otestovaný na stagingu. Reálný field pilot ve škole ještě neproběhl — právě ten je dalším validačním krokem.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/login?returnTo=%2Fskola" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:opacity-90">Mám pilotní účet <ArrowRight size={18} /></Link>
              <Link to="/partneri" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Jak se zapojí partner <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-20">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">
              <div><p className="text-sm font-semibold text-primary">PILOTNÍ PÁTEŘ</p><h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Jeden uzavřený osmitýdenní cyklus</h2></div>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays size={17} /> menší rozsah · měřitelný provoz · jasný GO / CHANGE / STOP</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
              {SPINE.map((item, index) => <div key={item} className="rounded-2xl border border-border bg-background p-4 min-h-28 flex flex-col justify-between"><span className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-medium leading-snug mt-5">{item}</span></div>)}
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
                <article key={experience.number} className="rounded-3xl border border-border bg-card/40 p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4"><span className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={23} /></span><span className="text-xs font-semibold text-muted-foreground">EXPERIENCE {experience.number}</span></div>
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
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary">KDO SE ZAPOJUJE</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Každá role má účel, přínos a hranici</h2>
              <p className="mt-4 text-muted-foreground">Škola je v prvním pilotu bezpečný organizační host. Centrem Pansofie ale zůstává konkrétní Experience — ne instituce sama.</p>
            </div>
            <div className="mt-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {ROLES.map((role) => {
                const Icon = role.icon;
                return (
                  <article key={role.title} className="rounded-3xl border border-border bg-background p-6">
                    <div className="flex items-start justify-between gap-4"><span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={20} /></span><span className="text-[10px] font-semibold text-muted-foreground rounded-full border border-border px-2.5 py-1">{role.status}</span></div>
                    <h3 className="mt-5 font-semibold text-lg font-heading">{role.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{role.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.9fr] gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-3xl border border-border p-6"><FileCheck2 size={22} className="text-primary" /><h3 className="mt-4 text-lg font-semibold">Evidence místo dojmu</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">Dokončení není kliknutí. Běh potřebuje skutečný důkaz, reflexi a samostatný review záznam.</p></div>
              <div className="rounded-3xl border border-border p-6"><BadgeCheck size={22} className="text-primary" /><h3 className="mt-4 text-lg font-semibold">Passport až po ověření</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">Passport reprezentuje dokončenou zkušenost. Žák si jej nemůže sám označit jako ověřený.</p></div>
              <div className="rounded-3xl border border-border p-6"><ShieldCheck size={22} className="text-primary" /><h3 className="mt-4 text-lg font-semibold">Soukromí podle účelu</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">Oprávnění k jednomu typu review automaticky neotevírá soukromou reflexi nebo jiný scope.</p></div>
            </div>

            <aside className="rounded-[2rem] bg-foreground text-background p-7 sm:p-9">
              <div className="flex items-center gap-3"><ShieldCheck size={22} /><h2 className="text-xl font-semibold font-heading">Pilotní hranice</h2></div>
              <p className="mt-3 text-sm text-background/65">Co Pansofie v tomto pilotu záměrně nedělá:</p>
              <div className="mt-5 space-y-3">{BOUNDARIES.map((item) => <div key={item} className="flex gap-3 text-sm leading-relaxed text-background/80"><CheckCircle2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></div>)}</div>
            </aside>
          </div>

          <div className="mt-12 rounded-[2rem] border border-primary/20 bg-primary/[0.035] p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl"><p className="text-sm font-semibold text-primary">STAGING VERIFIED · FIELD PILOT NEXT</p><h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display">Digitální School workflow je připravený. Teď musí obstát v realitě.</h2><p className="mt-3 text-sm sm:text-base text-muted-foreground">Přihlášený žák a učitel mají na stagingu ověřený flow přiřazení mise, evidence, reflexe, review, revize a finalizace Experience. Reálnou pedagogickou hodnotu ověří až field pilot.</p></div>
            <Link to="/login?returnTo=%2Fskola" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:opacity-90">Přihlásit se do pilotu <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-border/60"><div className="container-px max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3"><div className="flex items-center gap-2 font-heading font-bold"><span className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={15} /></span>Pansofie</div><p className="text-sm text-muted-foreground">Poznej sebe. Tvoř s druhými. Zlepšuj svět.</p></div></footer>
    </div>
  );
}
