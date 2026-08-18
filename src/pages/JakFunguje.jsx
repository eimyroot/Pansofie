import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  FileCheck2,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
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

const LAYERS = [
  ["Experience", "Co člověk skutečně udělá — centrální jednotka Pansofie."],
  ["Cesta", "Co se při Experience může rozvíjet. Sedm cest není lidské skóre."],
  ["Lab", "Tematické prostředí nebo typ činnosti: LIFE, MAKER, NATURE, COMMUNITY, CHALLENGE."],
  ["Program", "Životní a organizační kontext — například School, Family, Community nebo později Youth."],
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
        <section className="container-px max-w-7xl mx-auto py-12 sm:py-20">
          <div className="max-w-4xl">
            <span className="chip bg-primary/10 text-primary mb-5"><Compass size={14} /> Jak Pansofie funguje</span>
            <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Od skutečné potřeby k <span className="text-primary">ověřené zkušenosti.</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">Pansofie není katalog obsahu ani sbírání bodů. Digitální vrstva organizuje to, co člověk skutečně udělá, doloží, pochopí a přenese dál.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/pilot" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:opacity-90">Prozkoumat první pilot <ArrowRight size={18} /></Link>
              <a href="#experience-standard" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Anatomie Experience <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">PANSOFIE METHOD</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Čtyři kroky, které se opakují celý život.</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.title} className="relative border-l md:border-l-0 md:border-t border-primary/30 pl-6 md:pl-0 md:pt-6 pb-8 md:pb-0">
                  <span className="absolute -left-[5px] top-1 md:left-0 md:-top-[5px] h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                  <p className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-xl font-semibold font-heading">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience-standard" className="container-px max-w-7xl mx-auto py-16 sm:py-24 scroll-mt-28">
          <div className="grid grid-cols-1 xl:grid-cols-[0.7fr_1.3fr] gap-10 xl:gap-14 items-start">
            <div className="xl:sticky xl:top-28">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Experience Standard</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Zážitek nestačí. Experience musí zanechat smysluplnou stopu.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Pansofie odděluje činnost, důkaz, reflexi a ověření. Tím se z jednorázové aktivity stává zkušenost, která může navázat na další skutečný krok.</p>
            </div>
            <div className="divide-y divide-border rounded-3xl border border-border overflow-hidden">
              {EXPERIENCE_ANATOMY.map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[auto_1fr] gap-4 p-5 sm:p-6 bg-background">
                  <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="font-semibold font-heading">{title}</h3><p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Jednoduchá ontologie</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Experience je jádro. Ostatní vrstvy ji pouze popisují.</h2>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {LAYERS.map(([title, text], index) => (
                <article key={title} className={`rounded-3xl border p-6 ${index === 0 ? "border-primary/30 bg-primary/[0.045]" : "border-border bg-background"}`}>
                  <p className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 text-xl font-semibold font-heading">{title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{text}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">7 cest</p>
                <div className="mt-3 flex flex-wrap gap-2">{PATHS.map((path) => <span key={path.id} className="rounded-full border border-border bg-background px-3 py-2 text-xs font-medium">{path.name}</span>)}</div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">5 Labs</p>
                <div className="mt-3 flex flex-wrap gap-2">{LABS.map((lab) => <span key={lab.id} className="rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold">{lab.name}</span>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="duvera" className="container-px max-w-6xl mx-auto py-16 sm:py-24 scroll-mt-28">
          <div className="rounded-[2rem] bg-foreground text-background p-8 sm:p-12">
            <div className="flex items-start gap-4">
              <span className="h-12 w-12 rounded-2xl bg-background/10 flex items-center justify-center shrink-0"><ShieldCheck size={23} /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">Trust by design</p>
                <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Důvěra vzniká oddělením rolí a účelů.</h2>
                <div className="mt-7 space-y-4">{TRUST.map((item) => <div key={item} className="flex gap-3 text-sm sm:text-base text-background/75 leading-relaxed"><CheckCircle2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></div>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/40">
          <div className="container-px max-w-5xl mx-auto py-20 sm:py-28 text-center">
            <span className="inline-flex h-14 w-14 rounded-2xl bg-primary text-primary-foreground items-center justify-center mb-6"><Sparkles size={25} /></span>
            <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Teorie končí tam, kde začíná první skutečný pilot.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">Digitální School flow je otestovaný. Další krok je ověřit metodu, zátěž, bezpečnost a hodnotu v reálném školním provozu.</p>
            <Link to="/pilot" className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90">Prozkoumat první pilot <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border/60"><div className="container-px max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"><div className="flex items-center gap-2 font-heading font-bold"><span className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={15} strokeWidth={2.4} /></span>Pansofie</div><p className="text-sm text-muted-foreground">Poznej sebe. Tvoř s druhými. Zlepšuj svět.</p></div></footer>
    </div>
  );
}
