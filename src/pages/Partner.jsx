import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, FileCheck2, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

const FLOW = [
  ["01", "Reálná potřeba", "Partner přinese ohraničený problém, který má vzdělávací smysl a skutečný kontext."],
  ["02", "Screening", "Škola a Pansofie ověří bezpečnost, vzdělávací účel, rozsah, data a očekávaný výstup."],
  ["03", "Experience", "Tým pracuje na problému v bezpečném školním rámci. Partner není skrytý zaměstnavatel ani hodnotitel člověka."],
  ["04", "Výstup + review", "Žáci doloží práci, reflektují ji a škola odděleně ověří Experience. Partner dává feedback k výstupu."],
  ["05", "Adoption decision", "Partner odděleně rozhodne, zda chce výsledek dál zkoumat, pilotovat nebo nepoužít."],
  ["06", "Outcome / další krok", "Použití výstupu se sleduje odděleně od studentské práce a od tvrzení o dopadu."],
];

const RECEIVES = ["nový pohled na konkrétní, předem ohraničený problém", "týmové výstupy vzniklé v transparentním vzdělávacím procesu", "možnost dát odbornou zpětnou vazbu k práci, ne k lidské hodnotě", "oddělené rozhodnutí, zda má smysl výsledek dál pilotovat nebo rozvíjet"];
const CONTRIBUTES = ["reálnou Challenge a dostatek kontextu", "čas odborníka, know-how, data nebo zdroje v bezpečném rozsahu", "jasná omezení, kritéria výstupu a realistickou zpětnou vazbu", "pokud to dává smysl, možnost navazujícího pilotu, adopce nebo podpory"];
const BOUNDARIES = [
  "Partner nezískává automaticky přístup k identitě, soukromým důkazům nebo reflexi dítěte.",
  "Platba nebo partnerství nekupuje pozitivní hodnocení, adopci ani tvrzení o dopadu.",
  "Výstup se nepovažuje za automaticky převedené vlastnictví partnera; komerční využití musí mít samostatně vyjasněná pravidla a souhlasy.",
  "Žádné neomezené soukromé zprávy zaměstnance partnera směrem k dítěti.",
  "Marketingový nebo mediální souhlas není podmínkou účasti ve vzdělávací Experience.",
];

export default function Partner() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-7xl mx-auto py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <div>
              <span className="chip bg-primary/10 text-primary mb-5"><BriefcaseBusiness size={14} /> Partnerství v Pansofii</span>
              <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Přineste skutečný problém. <span className="text-primary">Pomozte vytvořit skutečnou zkušenost.</span></h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">Firma, obec nebo organizace může být zdrojem reálné Challenge, odborného kontextu a možnosti výsledek skutečně vyzkoušet. Nejde o přístup k dětem ani o bezplatnou zakázkovou práci.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4"><Link to="/zapojit-se?role=partner" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground">Navrhnout Challenge <ArrowRight size={18} /></Link><Link to="/pilot" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">Prozkoumat pilot <ArrowRight size={15} /></Link></div>
            </div>
            <div className="rounded-[2rem] border border-primary/20 bg-primary/[0.035] p-7 sm:p-9"><div className="flex items-center gap-3"><Handshake size={22} className="text-primary" /><p className="font-semibold">Reciprocity principle</p></div><h2 className="mt-5 text-2xl sm:text-3xl font-semibold font-display tracking-tight">Partner musí přinášet víc než logo nebo peníze.</h2><p className="mt-4 text-muted-foreground leading-relaxed">Dobré partnerství přidává problém, expertizu, čas, kontext, zdroje, feedback nebo možnost adopce. Pansofie na oplátku vytváří bezpečný rámec, metodiku a transparentní proces Experience.</p></div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40"><div className="container-px max-w-7xl mx-auto py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-5"><div className="rounded-3xl border border-border bg-background p-6 sm:p-8"><p className="text-xs font-semibold tracking-wide text-primary">PARTNER ZÍSKÁVÁ</p><h2 className="mt-2 text-2xl font-semibold font-heading">Hodnotu z reálného problému, ne z přístupu k dítěti</h2><div className="mt-6 space-y-4">{RECEIVES.map((item) => <div key={item} className="flex items-start gap-3 text-sm"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /><span>{item}</span></div>)}</div></div><div className="rounded-3xl border border-border bg-background p-6 sm:p-8"><p className="text-xs font-semibold tracking-wide text-primary">PARTNER PŘINÁŠÍ</p><h2 className="mt-2 text-2xl font-semibold font-heading">Kontext, expertizu a možnost skutečného dalšího kroku</h2><div className="mt-6 space-y-4">{CONTRIBUTES.map((item) => <div key={item} className="flex items-start gap-3 text-sm"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /><span>{item}</span></div>)}</div></div></div></section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24"><div className="max-w-3xl"><p className="text-sm font-semibold text-primary uppercase tracking-wide">Od Challenge k adopci</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Výstup žáků není totéž jako firemní rozhodnutí ho použít.</h2><p className="mt-5 text-muted-foreground leading-relaxed">Pansofie drží vzdělávací proces a případnou adopci odděleně.</p></div><div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{FLOW.map(([number, title, text]) => <article key={number} className="rounded-3xl border border-border bg-card/40 p-6 min-h-52"><span className="text-xs font-semibold text-primary">{number}</span><h3 className="mt-6 text-xl font-semibold font-heading">{title}</h3><p className="mt-3 text-sm text-muted-foreground leading-relaxed">{text}</p></article>)}</div></section>

        <section className="border-y border-border/60 bg-card/40"><div className="container-px max-w-6xl mx-auto py-16 sm:py-20"><div className="rounded-[2rem] bg-foreground text-background p-8 sm:p-11"><div className="flex items-start gap-4"><ShieldCheck size={24} className="shrink-0 mt-1" /><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">IP, data a bezpečnost</p><h2 className="mt-3 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Partnerství nesmí změnit vzdělávací Experience na extraktivní vztah.</h2><div className="mt-6 space-y-3">{BOUNDARIES.map((item) => <div key={item} className="flex gap-3 text-sm sm:text-base text-background/75"><FileCheck2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></div>)}</div><p className="mt-6 text-xs text-background/55">Tato veřejná pravidla popisují produktový princip. Nenahrazují konkrétní smluvní, autorskoprávní nebo datové ujednání.</p></div></div></div></div></section>

        <section className="container-px max-w-5xl mx-auto py-20 sm:py-28 text-center"><span className="inline-flex h-14 w-14 rounded-2xl bg-primary text-primary-foreground items-center justify-center mb-6"><Sparkles size={25} /></span><h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">První partnerství má ověřit, že hodnota vzniká na obou stranách.</h2><p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">Partnerství zatím není otevřený marketplace ani samoobslužný portál. Musí projít vzdělávacím a bezpečnostním screeningem.</p><Link to="/zapojit-se?role=partner" className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground">Navrhnout Challenge <ArrowRight size={18} /></Link></section>
      </main>
      <PublicFooter />
    </div>
  );
}
