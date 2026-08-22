import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, FileCheck2, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

const FLOW = [
  ["01", "Reálná potřeba", "Partner přinese konkrétní problém, který má skutečný kontext a zároveň dává smysl pro vzdělávání."],
  ["02", "Posouzení vhodnosti", "Škola a Pansofie zkontrolují bezpečnost, vzdělávací smysl, rozsah, potřebná data a očekávaný výstup."],
  ["03", "Práce týmu", "Žáci pracují na problému v bezpečném školním rámci. Partner není skrytý zaměstnavatel ani hodnotitel člověka."],
  ["04", "Výstup a zpětná vazba", "Žáci doloží práci a reflektují ji, škola ověří dokončení a partner se vyjádří k výstupu proti původnímu zadání."],
  ["05", "Rozhodnutí o dalším kroku", "Partner samostatně rozhodne, zda chce výsledek nepoužít, dál prozkoumat nebo bezpečně vyzkoušet v praxi."],
  ["06", "Co se stalo potom", "Pokud se výsledek skutečně použije, sleduje se zvlášť, co přinesl. To se nezaměňuje se samotnou studentskou prací ani s dlouhodobým dopadem."],
];

const RECEIVES = [
  "nový pohled na konkrétní, předem vymezený problém",
  "týmové výstupy vzniklé v transparentním vzdělávacím procesu",
  "možnost dát odbornou zpětnou vazbu k práci, ne k lidské hodnotě",
  "možnost samostatně rozhodnout, zda má smysl výsledek dál zkoumat nebo vyzkoušet",
];

const CONTRIBUTES = [
  "reálnou výzvu a dostatek kontextu",
  "čas odborníka, know-how, data nebo zdroje v bezpečném rozsahu",
  "jasná omezení, kritéria výsledku a realistickou zpětnou vazbu",
  "pokud to dává smysl, možnost navazujícího ověření, pilotního použití nebo jiné podpory",
];

const BOUNDARIES = [
  "Partner nezískává automaticky přístup k identitě dítěte, jeho neveřejným podkladům, soukromé reflexi ani Experience Passportu.",
  "Platba nebo partnerství nekupuje pozitivní hodnocení, použití výsledku ani tvrzení o jeho dopadu.",
  "Výstup se nestává automaticky vlastnictvím partnera. Komerční využití musí mít samostatně vyjasněná pravidla, práva a souhlasy.",
  "Zaměstnanec partnera nemá neomezený soukromý komunikační kanál směrem k dítěti.",
  "Marketingový nebo mediální souhlas není podmínkou účasti ve vzdělávací zkušenosti.",
];

export default function Partner() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-7xl mx-auto py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <div>
              <span className="chip bg-primary/10 text-primary mb-5"><BriefcaseBusiness size={14} /> Pro firmy, organizace a obce</span>
              <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Přineste skutečný problém. <span className="text-primary">Pomozte z něj vytvořit skutečnou zkušenost.</span></h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">Firma, obec nebo organizace může přinést reálnou výzvu, odborné znalosti, data, prostor nebo možnost dobrý výsledek vyzkoušet. Nejde o přístup k dětem ani o levnou zakázkovou práci.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4"><Link to="/zapojit-se?role=partner" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground">Přinést reálnou výzvu <ArrowRight size={18} /></Link><Link to="/pilot" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">Jak funguje školní pilot <ArrowRight size={15} /></Link></div>
            </div>
            <div className="rounded-[2rem] border border-primary/20 bg-primary/[0.035] p-7 sm:p-9"><div className="flex items-center gap-3"><Handshake size={22} className="text-primary" /><p className="font-semibold">Partnerství musí dávat smysl oběma stranám</p></div><h2 className="mt-5 text-2xl sm:text-3xl font-semibold font-display tracking-tight">Dobré partnerství přináší víc než logo nebo peníze.</h2><p className="mt-4 text-muted-foreground leading-relaxed">Partner přidává problém, expertizu, čas, kontext, zdroje, zpětnou vazbu nebo možnost výsledku pokračovat v praxi. Pansofie na oplátku vytváří bezpečný a srozumitelný rámec pro práci žáků a školy.</p></div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40"><div className="container-px max-w-7xl mx-auto py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-5"><div className="rounded-3xl border border-border bg-background p-6 sm:p-8"><p className="text-xs font-semibold tracking-wide text-primary">CO PARTNER ZÍSKÁVÁ</p><h2 className="mt-2 text-2xl font-semibold font-heading">Hodnotu z reálného problému, ne z přístupu k dítěti</h2><div className="mt-6 space-y-4">{RECEIVES.map((item) => <div key={item} className="flex items-start gap-3 text-sm"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /><span>{item}</span></div>)}</div></div><div className="rounded-3xl border border-border bg-background p-6 sm:p-8"><p className="text-xs font-semibold tracking-wide text-primary">CO PARTNER PŘINÁŠÍ</p><h2 className="mt-2 text-2xl font-semibold font-heading">Kontext, expertizu a možnost skutečného dalšího kroku</h2><div className="mt-6 space-y-4">{CONTRIBUTES.map((item) => <div key={item} className="flex items-start gap-3 text-sm"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /><span>{item}</span></div>)}</div></div></div></section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24"><div className="max-w-3xl"><p className="text-sm font-semibold text-primary uppercase tracking-wide">Od reálné výzvy k případnému použití</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">To, že žáci něco vytvoří, ještě neznamená, že to partner musí použít.</h2><p className="mt-5 text-muted-foreground leading-relaxed">Pansofie odděluje vzdělávací práci od pozdějšího rozhodnutí partnera. Díky tomu lze poctivě rozlišit kvalitní výstup, skutečné použití a až následný dopad.</p></div><div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{FLOW.map(([number, title, text]) => <article key={number} className="rounded-3xl border border-border bg-card/40 p-6 min-h-52"><span className="text-xs font-semibold text-primary">{number}</span><h3 className="mt-6 text-xl font-semibold font-heading">{title}</h3><p className="mt-3 text-sm text-muted-foreground leading-relaxed">{text}</p></article>)}</div></section>

        <section className="border-y border-border/60 bg-card/40"><div className="container-px max-w-6xl mx-auto py-16 sm:py-20"><div className="rounded-[2rem] bg-foreground text-background p-8 sm:p-11"><div className="flex items-start gap-4"><ShieldCheck size={24} className="shrink-0 mt-1" /><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">Práva, data a bezpečnost</p><h2 className="mt-3 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Partnerství nesmí proměnit vzdělávání v obchod s přístupem k dětem nebo jejich datům.</h2><div className="mt-6 space-y-3">{BOUNDARIES.map((item) => <div key={item} className="flex gap-3 text-sm sm:text-base text-background/75"><FileCheck2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></div>)}</div><p className="mt-6 text-xs text-background/55">Tato veřejná pravidla popisují princip produktu. Nenahrazují konkrétní smluvní, autorskoprávní ani datová ujednání.</p></div></div></div></div></section>

        <section className="container-px max-w-5xl mx-auto py-20 sm:py-28 text-center"><span className="inline-flex h-14 w-14 rounded-2xl bg-primary text-primary-foreground items-center justify-center mb-6"><Sparkles size={25} /></span><h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">První partnerství má ukázat, jestli spolupráce přináší skutečnou hodnotu žákům, škole i partnerovi.</h2><p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">Partnerství zatím není otevřené tržiště ani samoobslužný portál. Každá výzva musí projít posouzením vzdělávacího smyslu, bezpečnosti a rozsahu.</p><Link to="/zapojit-se?role=partner" className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground">Přinést reálnou výzvu <ArrowRight size={18} /></Link></section>
      </main>
      <PublicFooter />
    </div>
  );
}
