import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Building2, CalendarDays, CheckCircle2, FileCheck2, GraduationCap, Handshake, HeartHandshake, Landmark, ShieldCheck, Sparkles, Users } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

const EXPERIENCES = [
  ["01", "Zlepši svou školu", "Vlastní iniciativa · místní účast · řešení problému", "Žáci najdou konkrétní problém ve škole, navrhnou dosažitelnou změnu, vyzkoušejí ji v malém a doloží, co se skutečně stalo.", GraduationCap],
  ["02", "Digitální most", "Spolupráce generací · bezpečné digitální dovednosti", "Žáci připraví bezpečnou a praktickou pomoc člověku z jiné generace v předem vyjasněném a dohlíženém rámci.", Users],
  ["03", "Circular Challenge", "Reálná výzva · zdroje · použití výsledku", "Škola, komunita nebo partner přinese konkrétní výzvu. Tým změří výchozí stav, vytvoří řešení a zvlášť sleduje, co vzniklo, zda se to použilo a co se potom změnilo.", Sparkles],
];

const SPINE = ["Příprava školy", "3 zkušenosti", "Důkaz práce", "Reflexe", "Ověření učitelem", "Experience Passport", "PANSOFIE DAY", "Vyhodnocení pilotu"];

const ROLES = [
  ["Žák", Sparkles, "Dělá skutečnou činnost, ukládá důkaz a píše vlastní reflexi. Nemůže si sám potvrdit dokončení ani vydat ověřený Experience Passport."],
  ["Učitel / koordinátor", GraduationCap, "Přiřazuje mise, hlídá bezpečný rozsah a samostatně ověřuje výsledek. Žákovu vlastní reflexi nepřepisuje."],
  ["Škola", Building2, "Zajišťuje organizační rámec, kontaktní osoby, pedagogické vedení a bezpečný průběh pilotu."],
  ["Rodina", HeartHandshake, "U vybraných zkušeností může dobrovolně přidat podnět, zkušenost nebo kontakt, ale nepřebírá práci dítěte."],
  ["Partner", Handshake, "Může přinést vhodnou výzvu, expertizu a zpětnou vazbu k výsledku. Nekupuje hodnocení žáka, použití výsledku ani tvrzení o pozitivním dopadu."],
  ["Obec / komunita", Landmark, "Může přinést místní potřebu, veřejný kontext a možnost výsledek vyzkoušet nebo použít bez nároku na soukromá data dětí."],
];

const BOUNDARIES = [
  "Žádný veřejný dětský profil ani otevřená sociální síť dětí.",
  "Žádné AI hodnocení člověka, osobnosti nebo budoucí kariéry.",
  "Žádné jedno souhrnné skóre člověka; hodnotí se doložená práce v konkrétní situaci.",
  "Partner nemá neomezené soukromé zprávy směrem k dětem.",
  "Účast ve vzdělávání není podmíněná marketingovým souhlasem.",
  "Samotná činnost, vytvořený výstup, jeho použití a skutečný dopad jsou vedené odděleně.",
];

export default function Pilot() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-7xl mx-auto py-12 sm:py-20">
          <div className="max-w-4xl">
            <span className="chip bg-primary/10 text-primary mb-5"><GraduationCap size={14} /> PANSOFIE SCHOOL · PŘIPRAVENO K PRVNÍMU OVĚŘENÍ VE ŠKOLE</span>
            <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Ne další školní aplikace. <span className="text-primary">Tři skutečné zkušenosti, které se dají doložit.</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">Pilot převádí princip Pansofie do malého a měřitelného školního provozu: skutečná činnost → důkaz → reflexe → ověření učitelem → soukromý záznam zkušenosti.</p>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">Digitální cesta je funkční a otestovaná. Pilot v reálné škole ale ještě neproběhl. Právě ten má ukázat, zda je Pansofie srozumitelná, zvládnutelná pro učitele a užitečná pro žáky.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/zapojit-se?role=school" className="action-primary w-full sm:w-auto px-6 py-3.5">Chci zapojit školu <ArrowRight size={18} /></Link>
              <Link to="/login?returnTo=%2Fskola" className="action-secondary w-full sm:w-auto px-6 py-3.5">Mám pilotní účet</Link>
              <Link to="/partneri" className="action-quiet sm:self-center">Jak se zapojí partner <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40"><div className="container-px max-w-7xl mx-auto py-16 sm:py-20"><div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10"><div><p className="eyebrow">Jak pilot postupuje</p><h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Jeden uzavřený osmitýdenní cyklus</h2></div><div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays size={17} /> menší rozsah · jasné cíle · na konci rozhodnutí pokračovat / upravit / zastavit</div></div><div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">{SPINE.map((item, index) => <div key={item} className="border-t border-primary/30 pt-4 min-h-24 flex flex-col justify-between"><span className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-medium leading-snug mt-5">{item}</span></div>)}</div></div></section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24"><div className="max-w-3xl mb-10"><p className="eyebrow">3 skutečné zkušenosti</p><h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Tři různé situace, na kterých lze ověřit stejný princip</h2><p className="mt-4 text-muted-foreground">Každá má jiný důvod, jiné lidi a jiný výsledek. Společné mají to, že musí skončit konkrétní prací, důkazem a reflexí.</p></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-5">{EXPERIENCES.map(([number, title, hypothesis, text, Icon]) => <article key={number} className="rounded-3xl border border-border bg-card/40 p-6 sm:p-7"><div className="flex justify-between"><span className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={23} /></span><span className="text-xs font-semibold text-muted-foreground">EXPERIENCE {number}</span></div><h3 className="mt-6 text-xl font-semibold font-heading">{title}</h3><p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">{hypothesis}</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></section>

        <section className="border-y border-border/60 bg-card/40"><div className="container-px max-w-7xl mx-auto py-16 sm:py-24"><div className="max-w-3xl"><p className="eyebrow">Kdo se zapojuje</p><h2 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Každý má vlastní úkol a vlastní hranici</h2><p className="mt-4 text-muted-foreground">Škola drží bezpečný rámec. Uprostřed ale zůstává konkrétní práce a zkušenost mladého člověka.</p></div><div className="mt-9 divide-y divide-border border-y border-border">{ROLES.map(([title, Icon, text]) => <article key={title} className="grid grid-cols-[auto_1fr] gap-4 py-5 sm:py-6"><span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={20} /></span><div><h3 className="font-semibold text-lg font-heading">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-4xl">{text}</p></div></article>)}</div></div></section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24"><div className="grid grid-cols-1 xl:grid-cols-[1fr_0.85fr] gap-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="rounded-3xl border border-border p-6"><FileCheck2 size={22} className="text-primary" /><h3 className="mt-4 text-lg font-semibold">Důkaz místo dojmu</h3><p className="mt-2 text-sm text-muted-foreground">Za dokončenou zkušenost nestačí označit účast. Potřebuje konkrétní doklad práce, vlastní reflexi a samostatné ověření.</p></div><div className="rounded-3xl border border-border p-6"><BadgeCheck size={22} className="text-primary" /><h3 className="mt-4 text-lg font-semibold">Passport až po ověření</h3><p className="mt-2 text-sm text-muted-foreground">Žák si dokončení ani ověřený Experience Passport nepotvrzuje sám.</p></div></div><aside className="rounded-[2rem] bg-foreground text-background p-7 sm:p-9"><div className="flex items-center gap-3"><ShieldCheck size={22} /><h2 className="text-xl font-semibold">Bezpečné hranice pilotu</h2></div><div className="mt-5 space-y-3">{BOUNDARIES.map((item) => <div key={item} className="flex gap-3 text-sm leading-relaxed text-background/80"><CheckCircle2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></div>)}</div></aside></div></section>

        <section className="border-t border-border/60 bg-card/40"><div className="container-px max-w-5xl mx-auto py-20 sm:py-24 text-center"><p className="eyebrow">Digitální cesta je připravená · reálné ověření je další krok</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Teď musí Pansofie obstát v běžném školním dni.</h2><p className="mt-5 text-muted-foreground max-w-3xl mx-auto">Až reálný provoz ukáže, jestli Pansofie přináší žákům hodnotnou zkušenost, nezatěžuje učitele víc, než je únosné, a vytváří bezpečný prostor pro zapojení rodin a partnerů.</p><div className="mt-8 flex flex-col sm:flex-row justify-center gap-3"><Link to="/zapojit-se?role=school" className="action-primary w-full sm:w-auto px-7 py-3.5">Chci zapojit školu <ArrowRight size={18} /></Link><Link to="/login?returnTo=%2Fskola" className="action-secondary w-full sm:w-auto px-7 py-3.5">Přihlásit pilotní účet</Link></div></div></section>
      </main>
      <PublicFooter />
    </div>
  );
}
