import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { LABS, PATHS, PROCESS_STEPS } from "@/lib/pansofieData";

const EXPERIENCE_ANATOMY = [
  ["Potřeba", "Skutečný problém, otázka nebo příležitost, která dává Experience důvod."],
  ["Akce", "Člověk nebo tým něco reálně prozkoumá, navrhne, vytvoří, zkusí nebo poskytne."],
  ["Důkaz", "Vznikne přiměřený doklad práce — výstup, měření, dokumentace nebo jiná ověřitelná stopa."],
  ["Reflexe", "Člověk pojmenuje, co fungovalo, co ne, co pochopil a co by příště udělal jinak."],
  ["Review", "Oprávněný člověk odděleně zkontroluje doloženou práci a může ji vrátit k doplnění."],
  ["Passport", "Po dokončení zůstává soukromý záznam Experience, ne veřejný profil ani žebříček člověka."],
  ["Přenos", "Zkušenost může navázat na další misi, projekt, službu, pilot nebo adopci výsledku."],
];

const TRUST = [
  "Žádné hodnocení lidské hodnoty, osobnosti nebo předurčení kariéry.",
  "Žádný veřejný dětský profil ani otevřená sociální síť dětí.",
  "Soukromá reflexe není automaticky dostupná rodiči, mentorovi nebo partnerovi.",
  "Partnerství neznamená přístup k child datům, automatické vlastnictví výstupu ani pozitivní hodnocení.",
  "AI může pomáhat s otázkami, strukturou nebo shrnutím, ale nenahrazuje člověka u důležitých rozhodnutí.",
];

export default function JakFunguje() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-7xl mx-auto py-12 sm:py-20"><div className="max-w-4xl"><span className="chip bg-primary/10 text-primary mb-5"><Compass size={14} /> Jak Pansofie funguje</span><h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Od skutečné potřeby k <span className="text-primary">ověřené zkušenosti.</span></h1><p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">Pansofie není katalog obsahu ani sbírání bodů. Digitální vrstva organizuje to, co člověk skutečně udělá, doloží, pochopí a přenese dál.</p><div className="mt-8 flex flex-col sm:flex-row gap-4"><Link to="/pilot" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground">Prozkoumat první pilot <ArrowRight size={18} /></Link><Link to="/zapojit-se" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">Zapojit se <ArrowRight size={15} /></Link></div></div></section>

        <section className="border-y border-border/60 bg-card/40"><div className="container-px max-w-7xl mx-auto py-16 sm:py-24"><div className="max-w-3xl"><p className="text-sm font-semibold text-primary uppercase tracking-wide">PANSOFIE METHOD</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Čtyři kroky, které se opakují celý život.</h2></div><div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">{PROCESS_STEPS.map((step, index) => <div key={step.title} className="border-t border-primary/30 pt-6"><p className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 text-xl font-semibold">{step.title}</h3><p className="mt-2 text-sm text-muted-foreground">{step.detail}</p></div>)}</div></div></section>

        <section id="experience-standard" className="container-px max-w-7xl mx-auto py-16 sm:py-24"><div className="grid grid-cols-1 xl:grid-cols-[0.7fr_1.3fr] gap-10"><div><p className="text-sm font-semibold text-primary uppercase tracking-wide">Experience Standard</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Zážitek nestačí. Experience musí zanechat smysluplnou stopu.</h2></div><div className="divide-y divide-border rounded-3xl border border-border overflow-hidden">{EXPERIENCE_ANATOMY.map(([title,text],index) => <div key={title} className="grid grid-cols-[auto_1fr] gap-4 p-5 sm:p-6"><span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">{String(index + 1).padStart(2,"0")}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1.5 text-sm text-muted-foreground">{text}</p></div></div>)}</div></div></section>

        <section className="border-y border-border/60 bg-card/40"><div className="container-px max-w-7xl mx-auto py-16 sm:py-24"><p className="text-sm font-semibold text-primary uppercase tracking-wide">Jednoduchá ontologie</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Experience je jádro. Ostatní vrstvy ji pouze popisují.</h2><div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5"><div className="rounded-3xl border border-primary/30 bg-primary/[0.04] p-6"><h3 className="text-xl font-semibold">Experience</h3><p className="mt-2 text-sm text-muted-foreground">Co člověk skutečně udělá.</p></div><div className="rounded-3xl border border-border p-6"><h3 className="text-xl font-semibold">7 cest</h3><div className="mt-3 flex flex-wrap gap-2">{PATHS.map((path) => <span key={path.id} className="rounded-full border border-border px-2.5 py-1 text-xs">{path.name}</span>)}</div></div><div className="rounded-3xl border border-border p-6"><h3 className="text-xl font-semibold">5 Labs</h3><div className="mt-3 flex flex-wrap gap-2">{LABS.map((lab) => <span key={lab.id} className="rounded-full border border-border px-2.5 py-1 text-xs">{lab.name}</span>)}</div></div></div></div></section>

        <section id="duvera" className="container-px max-w-6xl mx-auto py-16 sm:py-24"><div className="rounded-[2rem] bg-foreground text-background p-8 sm:p-12"><div className="flex items-start gap-4"><ShieldCheck size={23} /><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">Trust by design</p><h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Důvěra vzniká oddělením rolí a účelů.</h2><div className="mt-7 space-y-4">{TRUST.map((item) => <div key={item} className="flex gap-3 text-sm sm:text-base text-background/75"><CheckCircle2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></div>)}</div><Link to="/bezpecnost" className="mt-7 inline-flex items-center gap-2 font-semibold text-sm">Bezpečnost dětí <ArrowRight size={16} /></Link></div></div></div></section>

        <section className="border-t border-border/60 bg-card/40"><div className="container-px max-w-5xl mx-auto py-20 sm:py-28 text-center"><Sparkles className="mx-auto text-primary" size={28} /><h2 className="mt-5 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Teorie končí tam, kde začíná první skutečný pilot.</h2><p className="mt-5 text-lg text-muted-foreground">Digitální School flow je otestovaný. Další krok je ověřit metodu, zátěž, bezpečnost a hodnotu v reálném školním provozu.</p><Link to="/zapojit-se?role=school" className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground">Chci zapojit školu <ArrowRight size={18} /></Link></div></section>
      </main>
      <PublicFooter />
    </div>
  );
}
