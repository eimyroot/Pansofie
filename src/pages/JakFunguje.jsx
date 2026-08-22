import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { LABS, PATHS, PROCESS_STEPS } from "@/lib/pansofieData";

const EXPERIENCE_ANATOMY = [
  ["Potřeba", "Začíná skutečným problémem, otázkou nebo příležitostí, která dává celé zkušenosti smysl."],
  ["Akce", "Člověk nebo tým něco prozkoumá, navrhne, vytvoří, vyzkouší nebo udělá pro druhé."],
  ["Důkaz", "Zůstane přiměřený doklad práce — například výstup, měření, dokumentace, fotografie nebo jiná ověřitelná stopa."],
  ["Reflexe", "Člověk vlastními slovy pojmenuje, co fungovalo, co ne, co pochopil a co by příště udělal jinak."],
  ["Ověření", "Oprávněný člověk zkontroluje doloženou práci a může zkušenost vrátit k doplnění. Člověk si dokončení nepotvrzuje sám."],
  ["Experience Passport", "Po dokončení zůstává soukromý záznam ověřené zkušenosti. Není to veřejný profil ani žebříček člověka."],
  ["Přenos", "To, co se člověk naučil, může použít v další misi, projektu, službě nebo nové reálné situaci."],
];

const HANDOFFS = [
  ["Mladý člověk", "pracuje → dokládá → reflektuje", "Vlastní svou reflexi a vlastní cestu zkušeností."],
  ["Učitel / škola", "vytváří rámec → vede → ověřuje", "Ověřuje doloženou práci, ne lidskou hodnotu."],
  ["Rodina / mentor", "přidává kontext → podporuje → zpřesňuje", "Pomáhá jen v rozsahu, který má pro konkrétní zkušenost smysl."],
  ["Partner / komunita", "přináší potřebu → reaguje na výstup → rozhoduje o dalším kroku", "Vidí jen výstup určený ke spolupráci, ne soukromý profil člověka."],
];

const TRUST = [
  "Žádné hodnocení lidské hodnoty, osobnosti nebo předurčení kariéry.",
  "Žádný veřejný dětský profil ani otevřená sociální síť dětí.",
  "Soukromá reflexe není automaticky dostupná rodiči, mentorovi ani partnerovi.",
  "Partnerství neznamená přístup k neveřejným podkladům žáka, jeho soukromé reflexi nebo Passportu.",
  "Rozlišujeme mezi samotnou činností, vytvořeným výstupem, jeho pozdějším použitím a skutečným dlouhodobým dopadem.",
  "AI může pomáhat s otázkami, strukturou nebo shrnutím, ale důležitá rozhodnutí zůstávají na lidech.",
];

export default function JakFunguje() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-7xl mx-auto py-12 sm:py-20">
          <div className="max-w-4xl">
            <span className="chip bg-primary/10 text-primary mb-5"><Compass size={14} /> Jak Pansofie funguje</span>
            <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Od skutečné potřeby k <span className="text-primary">ověřené zkušenosti.</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">Pansofie nezačíná u bodů ani u dalšího katalogu učiva. Začíná otázkou: <strong className="text-foreground font-semibold">Co stojí za to opravdu udělat?</strong> Člověk pak svou práci doloží, zamyslí se nad ní a získá zpětnou vazbu i další smysluplný krok.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/zapojit-se?mode=simulator" className="action-primary w-full sm:w-auto px-6 py-3.5">Vyzkoušet Pansofii za 60 sekund <ArrowRight size={18} /></Link>
              <Link to="/pro-koho" className="action-secondary w-full sm:w-auto px-6 py-3.5">Podívat se podle role <UsersRound size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow">01 · ČTYŘI KROKY</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Objev. Udělej. Pochop. Přispěj.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">Čtyři jednoduché kroky dávají zkušenosti směr. Pod nimi Pansofie navíc hlídá důkaz, ověření a soukromý záznam, aby se dobrý pocit nezaměnil za doloženou práci.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.title} className="relative border-l md:border-l-0 md:border-t border-primary/30 pl-6 md:pl-0 md:pt-6 pb-8 md:pb-0">
                  <span className="absolute -left-[5px] top-1 md:left-0 md:-top-[5px] h-2.5 w-2.5 rounded-full bg-primary" />
                  <p className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience-standard" className="container-px max-w-7xl mx-auto py-16 sm:py-24">
          <div className="grid grid-cols-1 xl:grid-cols-[0.7fr_1.3fr] gap-10">
            <div>
              <p className="eyebrow">02 · CO TVOŘÍ JEDNU EXPERIENCE</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Nestačí něco zažít. Důležité je pochopit, co člověk udělal a co si z toho odnáší.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Experience je naše označení pro skutečnou zkušenost, která má jasný důvod, konkrétní práci, důkaz, vlastní reflexi, oddělené ověření a další krok.</p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {EXPERIENCE_ANATOMY.map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[auto_1fr] gap-4 py-5 sm:py-6">
                  <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="font-semibold">{title}</h3><p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow">03 · KDO DĚLÁ CO</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Každý má jasnou roli. Nikdo nepotřebuje vidět všechno.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">Pansofie nevytváří jednu velkou databázi „o dítěti“. Informace se sdílejí jen tehdy, když je konkrétní role potřebuje pro svou práci, podporu nebo ověření.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {HANDOFFS.map(([title, flow, boundary]) => (
                <article key={title} className="surface-raised p-5 sm:p-6">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm font-semibold text-primary leading-relaxed">{flow}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{boundary}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center"><Link to="/pro-koho" className="action-secondary inline-flex">Všechny role a jejich hranice <ArrowRight size={16} /></Link></div>
          </div>
        </section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24">
          <p className="eyebrow">04 · JEDNODUCHÝ MODEL</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Uprostřed je skutečná zkušenost. Ostatní vrstvy jí dávají směr a kontext.</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-3xl border border-primary/30 bg-primary/[0.04] p-6"><h3 className="text-xl font-semibold">Experience</h3><p className="mt-2 text-sm text-muted-foreground">Co člověk skutečně udělá, doloží, pochopí a použije dál.</p></div>
            <div className="rounded-3xl border border-border p-6"><h3 className="text-xl font-semibold">7 cest rozvoje</h3><div className="mt-3 flex flex-wrap gap-2">{PATHS.map((path) => <span key={path.id} className="rounded-full border border-border px-2.5 py-1 text-xs">{path.name}</span>)}</div></div>
            <div className="rounded-3xl border border-border p-6"><h3 className="text-xl font-semibold">5 tematických prostředí</h3><div className="mt-3 flex flex-wrap gap-2">{LABS.map((lab) => <span key={lab.id} className="rounded-full border border-border px-2.5 py-1 text-xs">{lab.name}</span>)}</div></div>
          </div>
        </section>

        <section id="duvera" className="container-px max-w-6xl mx-auto py-16 sm:py-24">
          <div className="rounded-[2rem] bg-foreground text-background p-8 sm:p-12">
            <div className="flex items-start gap-4">
              <ShieldCheck size={23} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">05 · DŮVĚRA OD ZAČÁTKU</p>
                <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Bezpečí stojí na jasných rolích, omezeném přístupu a ověřitelných pravidlech.</h2>
                <div className="mt-7 space-y-4">{TRUST.map((item) => <div key={item} className="flex gap-3 text-sm sm:text-base text-background/75"><CheckCircle2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></div>)}</div>
                <div className="mt-7 flex flex-wrap gap-4"><Link to="/bezpecnost" className="inline-flex items-center gap-2 font-semibold text-sm">Bezpečnost dětí <ArrowRight size={16} /></Link><Link to="/soukromi" className="inline-flex items-center gap-2 font-semibold text-sm text-background/75">Soukromí <ArrowRight size={16} /></Link></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/40">
          <div className="container-px max-w-5xl mx-auto py-20 sm:py-28 text-center">
            <Sparkles className="mx-auto text-primary" size={28} />
            <h2 className="mt-5 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Princip znáte. Teď se podívejte, jak vypadá z vaší role.</h2>
            <p className="mt-5 text-lg text-muted-foreground">Stejná zkušenost vypadá jinak pro žáka, učitele, rodinu, mentora i partnera. Každý má jiný úkol a jinou hranici.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/pro-koho" className="action-primary w-full sm:w-auto px-7 py-3.5">Pro koho je Pansofie <ArrowRight size={18} /></Link>
              <Link to="/pilot" className="action-secondary w-full sm:w-auto px-7 py-3.5">Jak vypadá školní pilot <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
