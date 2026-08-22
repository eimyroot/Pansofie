import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  FileCheck2,
  HeartHandshake,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

const WHY = [
  ["Zkušenost před simulací", "Mladý člověk má něco skutečně udělat, vytvořit nebo zlepšit — ne jen splnit další úkol na obrazovce.", Compass],
  ["Důkaz před dojmem", "Rozlišujeme mezi tím, že člověk něco dělal, co skutečně vytvořil, co se potom použilo a jaký to mělo dopad.", FileCheck2],
  ["Souvislosti před izolací", "Škola, rodina, mentor, partner i komunita mohou přinést jinou část reality. Nemusí přitom všichni vidět stejné informace.", Network],
  ["Důvěra před růstem", "Ochrana dětí, soukromí a lidská odpovědnost mají být vyřešené dřív, než se Pansofie začne rozšiřovat.", ShieldCheck],
];

const STATUS = [
  ["UŽ FUNGUJE", "Veřejný web, PANSOFIEDIT, digitální postup pro školní zkušenost a bezpečně oddělená spolupráce s partnerem jsou implementované a technicky otestované."],
  ["POTŘEBUJEME OVĚŘIT", "Zda je Pansofie srozumitelná žákům, učitelům a rodinám, kolik práce znamená pro pedagogy, jak funguje spolupráce s partnery a zda zkušenosti vedou k užitečnému dalšímu kroku."],
  ["ZATÍM NEMÁME DŮKAZ", "Nemáme za sebou vyhodnocený pilot v reálné škole, prokázaný pedagogický nebo dlouhodobý dopad, ověřenou ochotu škol či partnerů platit ani dlouhodobé výsledky napříč více školami."],
  ["DALŠÍ KROK", "První řízený školní pilot s jasnými cíli, odpovědností za ochranu dětí a pravidly soukromí. Teprve reálná data mají rozhodnout, co rozšiřovat, upravit nebo zastavit."],
];

const LOOKING_FOR = [
  ["Škola a pedagogové", "První reálné ověření, které ukáže, zda je Pansofie použitelná v běžné výuce a co učitelům skutečně přináší nebo bere.", Building2, "/zapojit-se?role=school"],
  ["Mladí lidé a rodiny", "Zpětná vazba k tomu, zda zkušenosti dávají smysl člověku a zda hranice soukromí fungují i mimo diagram.", HeartHandshake, "/zapojit-se?role=family"],
  ["Mentoři a odborníci", "Praktické zkušenosti, dobré otázky a pohled z reálného oboru — bez přebírání role učitele a bez nekontrolovaného kontaktu s dítětem.", UsersRound, "/zapojit-se?role=mentor"],
  ["Firmy, organizace a obce", "Skutečné výzvy, kontext, zdroje a možnost dobrý výstup bezpečně vyzkoušet nebo rozvíjet dál.", Target, "/zapojit-se?role=partner"],
];

const NOT_THIS = [
  "Nejsme systém pro skórování lidské hodnoty, osobnosti nebo budoucí kariéry.",
  "Nejsme otevřená sociální síť dětí a dospělých.",
  "Nejsme tržiště, kde si partner kupuje pozitivní výsledek nebo přístup k dítěti.",
  "Netvrdíme, že máme prokázaný pedagogický dopad, dokud ho neověří reálný provoz.",
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-7xl mx-auto py-12 sm:py-20">
          <div className="max-w-5xl">
            <span className="chip bg-primary/10 text-primary mb-5"><Sparkles size={14} /> O Pansofii</span>
            <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Učení má větší smysl, když se propojí se skutečným životem.</h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-4xl">Pansofie vzniká kolem jednoduché otázky: co kdyby mladému člověku po učení nezůstala jen známka nebo splněný úkol, ale také zkušenost, konkrétní výsledek, vlastní reflexe a jasný další krok?</p>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl">Digitální část už funguje a prošla technickými kontrolami. Teď musí Pansofie ukázat svou hodnotu v reálné škole.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/zapojit-se" className="action-primary w-full sm:w-auto px-7 py-3.5">Jak se můžu zapojit <ArrowRight size={18} /></Link>
              <Link to="/jak-funguje" className="action-secondary w-full sm:w-auto px-7 py-3.5">Jak Pansofie funguje</Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/35">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow">Proč Pansofie vzniká</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Chceme, aby vzdělávání mělo víc míst, kde se člověk potká s realitou.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Nechceme nahradit školu platformou. Chceme vytvořit bezpečný způsob, jak propojit skutečnou práci, lidi kolem ní, důkaz, reflexi a další krok.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {WHY.map(([title, text, Icon]) => (
                <article key={title} className="rounded-3xl border border-border bg-background p-6 sm:p-7">
                  <span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={21} /></span>
                  <h3 className="mt-5 text-xl font-semibold font-heading">{title}</h3>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container-px max-w-7xl mx-auto py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="eyebrow">Odkud přichází název a inspirace</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Nestačí znát jednotlivé věci. Potřebujeme vidět, jak spolu souvisejí.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Pansofie se inspiruje pansofickou snahou Jana Amose Komenského spojovat poznání do souvislostí, vztahovat je k celku lidského života a hledat cestu od poznání k odpovědnému jednání.</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">Dnešní Pansofie je ale náš současný produkt, ne digitální rekonstrukce Komenského díla. Historickou inspiraci převádíme do vlastní metody práce se skutečnou zkušeností, důkazem, reflexí, spoluprací a dalším krokem.</p>
            </div>
            <aside className="rounded-[2rem] border border-primary/20 bg-primary/[0.035] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Historie ≠ dnešní produkt</p>
              <h3 className="mt-3 text-2xl font-semibold font-display tracking-tight">Inspiraci a vlastní návrh držíme odděleně.</h3>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">Komenskému nepřipisujeme dnešní software, umělou inteligenci, herní mechaniky, skóre ani současnou architekturu Pansofie. Když používáme moderní interpretaci, říkáme to jako moderní interpretaci.</p>
            </aside>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/35">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-16 items-start">
              <div>
                <p className="eyebrow">Kdo jsme</p>
                <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Jsme ve fázi, kdy se produkt musí potkat s realitou — ne si vymyslet větší příběh.</h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">Pansofie je dnes vývojový projekt a funkční digitální produkt připravovaný k prvnímu reálnému školnímu ověření. Veřejně ukazujeme, co už funguje, co teprve testujeme a kde zatím důkaz nemáme.</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">Jména lidí za projektem, právního provozovatele a veřejný kontaktní kanál zveřejníme až ve chvíli, kdy je můžeme uvést přesně a schváleně. Nechceme je nahrazovat zástupnými nebo smyšlenými údaji.</p>
              </div>

              <aside className="rounded-[2rem] bg-foreground text-background p-7 sm:p-9">
                <div className="flex items-center gap-3"><ShieldCheck size={22} /><p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">Co Pansofie není</p></div>
                <div className="mt-6 space-y-4">
                  {NOT_THIS.map((item) => <p key={item} className="flex gap-3 text-sm sm:text-base text-background/78 leading-relaxed"><CheckCircle2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></p>)}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="stav" className="scroll-mt-28">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow">Kde jsme dnes</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">To, že produkt funguje technicky, ještě nedokazuje, že funguje dobře ve škole.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Proto u každého tvrzení rozlišujeme, co je implementované, co jsme technicky otestovali, co musí ověřit pilot a co lze označit za skutečný dopad až s odstupem.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {STATUS.map(([title, text], index) => (
                <article key={title} className="rounded-3xl border border-border bg-background p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4"><span className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><span className="status-pill status-neutral">{title}</span></div>
                  <h3 className="mt-5 text-xl sm:text-2xl font-semibold font-heading">{title}</h3>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/35">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-28">
            <div className="max-w-3xl">
              <p className="eyebrow">Koho právě hledáme</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Ne publikum. Lidi, kteří nám pomohou zjistit, co je opravdu užitečné.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Každé zapojení má mít jasný účel, přínos pro obě strany a bezpečnou hranici. Pansofie se má učit z reálného používání, ne z počtu registrací.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {LOOKING_FOR.map(([title, text, Icon, to]) => (
                <Link key={title} to={to} className="group rounded-[2rem] border border-border bg-card/40 p-6 sm:p-7 hover:border-primary/30 hover:bg-primary/[0.025] transition-colors">
                  <div className="flex items-start gap-4"><span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Icon size={21} /></span><div><h3 className="text-xl font-semibold font-heading">{title}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Podívat se na svou cestu <ArrowRight size={15} /></span></div></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/35">
          <div className="container-px max-w-5xl mx-auto py-20 sm:py-24 text-center">
            <span className="inline-flex h-14 w-14 rounded-2xl bg-primary text-primary-foreground items-center justify-center mb-6"><Network size={25} /></span>
            <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Pansofie má smysl jen tehdy, když do ní vstoupí skuteční lidé se skutečnými potřebami.</h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">Podívejte se, jak můžete pomoct, nebo si během 60–90 sekund projděte PANSOFIEDIT z vlastní role.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/zapojit-se" className="action-primary w-full sm:w-auto px-7 py-3.5">Jak se můžu přidat <ArrowRight size={18} /></Link>
              <Link to="/zapojit-se?mode=simulator" className="action-secondary w-full sm:w-auto px-7 py-3.5">Vyzkoušet PANSOFIEDIT</Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
