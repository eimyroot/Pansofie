import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Building2, CalendarDays, CheckCircle2, FileCheck2, GraduationCap, Handshake, HeartHandshake, Landmark, ShieldCheck, Sparkles, Users } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

const EXPERIENCES = [
  ["01", "Zlepši svou školu", "Agency · místní účast · řešení problému", "Žáci identifikují konkrétní problém ve škole, navrhnou dosažitelnou změnu, provedou malý pilot a doloží, co se skutečně změnilo.", GraduationCap],
  ["02", "Digitální most", "Spolupráce generací · bezpečné digitální dovednosti", "Žáci připraví bezpečnou a praktickou pomoc člověku z jiné generace v předem vyjasněném a dohlíženém rámci.", Users],
  ["03", "Circular Challenge", "Reálná výzva · zdroje · adopce výsledku", "Škola, komunita nebo partner dodá ohraničenou výzvu. Tým změří výchozí stav, vytvoří řešení a oddělí výstup od adopce a dopadu.", Sparkles],
];

const SPINE = ["Onboarding školy", "3 Experiences", "Důkaz", "Reflexe", "Učitelský review", "Passport", "PANSOFIE DAY", "Evidence Review"];

const ROLES = [
  ["Žák", Sparkles, "Dělá skutečnou činnost, ukládá důkaz a vlastní reflexi. Nemůže si sám ověřit dokončení ani Passport."],
  ["Učitel / koordinátor", GraduationCap, "Přiřazuje mise, kontroluje povolený scope a odděleně potvrzuje výsledek. Nemění žákovu reflexi."],
  ["Škola", Building2, "Drží organizační rámec, kontaktní osoby, pedagogické vedení a bezpečný provoz pilotu."],
  ["Rodina", HeartHandshake, "U vybraných Experiences může dobrovolně přidat reálný podnět, zkušenost nebo kontakt bez přebírání práce dítěte."],
  ["Partner", Handshake, "Může dodat vhodnou Challenge, expertizu a feedback k práci. Nekupuje hodnocení žáka, adopci ani pozitivní impact claim."],
  ["Obec / komunita", Landmark, "Může přinést lokální potřebu, veřejný kontext a možnost výsledek vyzkoušet nebo použít bez nároku na soukromá data dětí."],
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
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/zapojit-se?role=school" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground">Chci zapojit školu <ArrowRight size={18} /></Link>
              <Link to="/login?returnTo=%2Fskola" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 font-semibold">Mám pilotní účet</Link>
              <Link to="/partneri" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">Jak se zapojí partner <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40"><div className="container-px max-w-7xl mx-auto py-16 sm:py-20"><div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10"><div><p className="text-sm font-semibold text-primary">PILOTNÍ PÁTEŘ</p><h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Jeden uzavřený osmitýdenní cyklus</h2></div><div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays size={17} /> menší rozsah · měřitelný provoz · jasný GO / CHANGE / STOP</div></div><div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">{SPINE.map((item, index) => <div key={item} className="rounded-2xl border border-border bg-background p-4 min-h-28 flex flex-col justify-between"><span className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-medium leading-snug mt-5">{item}</span></div>)}</div></div></section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24"><div className="max-w-3xl mb-10"><p className="text-sm font-semibold text-primary">3 EXPERIENCES</p><h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Tři skutečné zkušenosti</h2><p className="mt-4 text-muted-foreground">Každá Experience má jiný důvod existence a musí skončit konkrétním dokladem práce.</p></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-5">{EXPERIENCES.map(([number, title, hypothesis, text, Icon]) => <article key={number} className="rounded-3xl border border-border bg-card/40 p-6 sm:p-7"><div className="flex justify-between"><span className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={23} /></span><span className="text-xs font-semibold text-muted-foreground">EXPERIENCE {number}</span></div><h3 className="mt-6 text-xl font-semibold font-heading">{title}</h3><p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">{hypothesis}</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></section>

        <section className="border-y border-border/60 bg-card/40"><div className="container-px max-w-7xl mx-auto py-16 sm:py-24"><div className="max-w-3xl"><p className="text-sm font-semibold text-primary">KDO SE ZAPOJUJE</p><h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Každá role má účel, přínos a hranici</h2><p className="mt-4 text-muted-foreground">Škola je bezpečný organizační host. Centrem Pansofie zůstává konkrétní Experience.</p></div><div className="mt-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{ROLES.map(([title, Icon, text]) => <article key={title} className="rounded-3xl border border-border bg-background p-6"><span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={20} /></span><h3 className="mt-5 font-semibold text-lg font-heading">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></div></section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24"><div className="grid grid-cols-1 xl:grid-cols-[1fr_0.85fr] gap-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="rounded-3xl border border-border p-6"><FileCheck2 size={22} className="text-primary" /><h3 className="mt-4 text-lg font-semibold">Evidence místo dojmu</h3><p className="mt-2 text-sm text-muted-foreground">Dokončení potřebuje skutečný důkaz, reflexi a samostatný review záznam.</p></div><div className="rounded-3xl border border-border p-6"><BadgeCheck size={22} className="text-primary" /><h3 className="mt-4 text-lg font-semibold">Passport až po ověření</h3><p className="mt-2 text-sm text-muted-foreground">Žák si dokončení ani ověřený Passport nepotvrzuje sám.</p></div></div><aside className="rounded-[2rem] bg-foreground text-background p-7 sm:p-9"><div className="flex items-center gap-3"><ShieldCheck size={22} /><h2 className="text-xl font-semibold">Pilotní hranice</h2></div><div className="mt-5 space-y-3">{BOUNDARIES.map((item) => <div key={item} className="flex gap-3 text-sm leading-relaxed text-background/80"><CheckCircle2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></div>)}</div></aside></div></section>

        <section className="border-t border-border/60 bg-card/40"><div className="container-px max-w-5xl mx-auto py-20 sm:py-24 text-center"><p className="text-sm font-semibold text-primary">STAGING VERIFIED · FIELD PILOT NEXT</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Digitální workflow je připravený. Teď musí obstát v realitě.</h2><p className="mt-5 text-muted-foreground max-w-3xl mx-auto">Reálnou pedagogickou hodnotu, zátěž učitelů a hodnotu pro rodiny a partnery ověří až první field pilot.</p><div className="mt-8 flex flex-col sm:flex-row justify-center gap-3"><Link to="/zapojit-se?role=school" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground">Chci zapojit školu <ArrowRight size={18} /></Link><Link to="/login?returnTo=%2Fskola" className="inline-flex items-center justify-center rounded-2xl border border-border px-7 py-3.5 font-semibold">Přihlásit pilotní účet</Link></div></div></section>
      </main>
      <PublicFooter />
    </div>
  );
}
