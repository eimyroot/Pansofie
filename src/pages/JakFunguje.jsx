import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { LABS, PATHS, PROCESS_STEPS } from "@/lib/pansofieData";

const EXPERIENCE_ANATOMY = [
  ["Potřeba", "Skutečný problém, otázka nebo příležitost, která dává Experience důvod."],
  ["Akce", "Člověk nebo tým něco reálně prozkoumá, navrhne, vytvoří, zkusí nebo poskytne."],
  ["Důkaz", "Vznikne přiměřený doklad práce — výstup, měření, dokumentace nebo jiná ověřitelná stopa."],
  ["Reflexe", "Člověk pojmenuje, co fungovalo, co ne, co pochopil a co by příště udělal jinak."],
  ["Ověření", "Oprávněný člověk odděleně zkontroluje doloženou práci a může ji vrátit k doplnění."],
  ["Experience Passport", "Po dokončení zůstává soukromý záznam Experience, ne veřejný profil ani žebříček člověka."],
  ["Přenos", "Zkušenost může navázat na další misi, projekt, službu, pilot nebo skutečné použití výsledku."],
];

const HANDOFFS = [
  ["Mladý člověk", "dělá práci → dokládá → reflektuje", "Vlastní reflexi a vlastní cestu zkušeností."],
  ["Učitel / škola", "drží rámec → vede → ověřuje", "Ověřuje doloženou práci, ne lidskou hodnotu."],
  ["Rodina / mentor", "přidává kontext → podporuje → zpřesňuje", "Pomáhá jen v rozsahu, který má pro Experience účel."],
  ["Partner / komunita", "přináší potřebu → reviewuje výstup → rozhoduje o dalším kroku", "Vidí bounded výstup, ne soukromý profil člověka."],
];

const TRUST = [
  "Žádné hodnocení lidské hodnoty, osobnosti nebo předurčení kariéry.",
  "Žádný veřejný dětský profil ani otevřená sociální síť dětí.",
  "Soukromá reflexe není automaticky dostupná rodiči, mentorovi nebo partnerovi.",
  "Partnerství neznamená přístup k learner raw evidence, soukromé reflexi nebo Passportu.",
  "Aktivita, Output, Adoption, Outcome a Impact jsou oddělené vrstvy a nesmějí se zaměňovat.",
  "AI může pomáhat s otázkami, strukturou nebo shrnutím, ale nenahrazuje člověka u důležitých rozhodnutí.",
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
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">Pansofie není katalog obsahu ani sbírání bodů. Organizuje skutečnou práci tak, aby člověk věděl, co udělal, jak to doložil, co z toho pochopil a co má smysl udělat dál.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/zapojit-se?mode=simulator" className="action-primary w-full sm:w-auto px-6 py-3.5">Vyzkoušet Pansofii za 60 sekund <ArrowRight size={18} /></Link>
              <Link to="/pro-koho" className="action-secondary w-full sm:w-auto px-6 py-3.5">Podívat se podle role <UsersRound size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow">01 · METODA</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Čtyři jednoduché otázky, které drží Experience při zemi.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">Čtyři metodické kroky dávají člověku orientaci. Produktový lifecycle pod nimi navíc odděluje důkaz, ověření a Passport, aby se dojem nezaměnil za doloženou zkušenost.</p>
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
              <p className="eyebrow">02 · ANATOMIE EXPERIENCE</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Zážitek nestačí. Experience musí zanechat smysluplnou stopu.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Nejde o sbírání aktivit. Každá Experience má jasný důvod, práci, důkaz, vlastní reflexi, oddělené ověření a další krok.</p>
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
              <p className="eyebrow">03 · PŘEDÁVÁNÍ MEZI ROLEMI</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Každý přebírá jen tu část, kterou potřebuje.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">Pansofie není jedna sdílená databáze „o dítěti“. Je to řízený tok práce, ve kterém každá role dostává jen účelově potřebný kontext.</p>
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
          <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Experience je jádro. Ostatní vrstvy ji pouze popisují.</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-3xl border border-primary/30 bg-primary/[0.04] p-6"><h3 className="text-xl font-semibold">Experience</h3><p className="mt-2 text-sm text-muted-foreground">Co člověk skutečně udělá, doloží a reflektuje.</p></div>
            <div className="rounded-3xl border border-border p-6"><h3 className="text-xl font-semibold">7 cest rozvoje</h3><div className="mt-3 flex flex-wrap gap-2">{PATHS.map((path) => <span key={path.id} className="rounded-full border border-border px-2.5 py-1 text-xs">{path.name}</span>)}</div></div>
            <div className="rounded-3xl border border-border p-6"><h3 className="text-xl font-semibold">5 tematických prostředí</h3><div className="mt-3 flex flex-wrap gap-2">{LABS.map((lab) => <span key={lab.id} className="rounded-full border border-border px-2.5 py-1 text-xs">{lab.name}</span>)}</div></div>
          </div>
        </section>

        <section id="duvera" className="container-px max-w-6xl mx-auto py-16 sm:py-24">
          <div className="rounded-[2rem] bg-foreground text-background p-8 sm:p-12">
            <div className="flex items-start gap-4">
              <ShieldCheck size={23} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">05 · DŮVĚRA OD NÁVRHU</p>
                <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Důvěra vzniká oddělením rolí, účelů a důkazů.</h2>
                <div className="mt-7 space-y-4">{TRUST.map((item) => <div key={item} className="flex gap-3 text-sm sm:text-base text-background/75"><CheckCircle2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></div>)}</div>
                <div className="mt-7 flex flex-wrap gap-4"><Link to="/bezpecnost" className="inline-flex items-center gap-2 font-semibold text-sm">Bezpečnost dětí <ArrowRight size={16} /></Link><Link to="/soukromi" className="inline-flex items-center gap-2 font-semibold text-sm text-background/75">Soukromí <ArrowRight size={16} /></Link></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/40">
          <div className="container-px max-w-5xl mx-auto py-20 sm:py-28 text-center">
            <Sparkles className="mx-auto text-primary" size={28} />
            <h2 className="mt-5 text-3xl sm:text-5xl font-semibold font-display tracking-tight">Rozumíte mechanismu. Teď si vyberte roli nebo školní použití.</h2>
            <p className="mt-5 text-lg text-muted-foreground">Stejný Experience lifecycle se mění podle toho, kdo se zapojuje a za jakým účelem.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/pro-koho" className="action-primary w-full sm:w-auto px-7 py-3.5">Pro koho je Pansofie <ArrowRight size={18} /></Link>
              <Link to="/pilot" className="action-secondary w-full sm:w-auto px-7 py-3.5">Školní pilot <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
