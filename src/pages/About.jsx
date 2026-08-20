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
  ["Skutečnost před simulací", "Mladý člověk má něco skutečně udělat, vytvořit nebo zlepšit — ne jen dokončit další abstraktní úkol.", Compass],
  ["Důkaz před dojmem", "Aktivita, výstup, Outcome a Impact nejsou totéž. Pansofie je drží oddělené a vyžaduje doložitelnou stopu práce.", FileCheck2],
  ["Síť před izolací", "Škola, rodina, mentor, partner a komunita mohou přinášet různé části reality, aniž by každý viděl všechno.", Network],
  ["Důvěra před růstem", "Soukromí, safeguarding a lidský review mají být součástí produktu dřív, než se systém začne škálovat.", ShieldCheck],
];

const STATUS = [
  ["FUNKČNÍ / TECHNICKY OVĚŘENÉ", "Veřejný Experience-first web, role-aware PANSOFIEDIT, školní Experience workflow a Partner Challenge → bounded output → Review → adoption decision → Outcome evidence jsou implementované a technicky ověřené."],
  ["TESTUJEME", "Srozumitelnost pro žáka, učitele a rodinu; reálnou učitelskou zátěž; kvalitu Partner feedbacku; provozní bezpečnost a to, zda Experience opravdu vede k použitelnému dalšímu kroku."],
  ["JEŠTĚ NEPROBĚHLO", "Plnohodnotný reálný školní field pilot s vyhodnocením, důkaz pedagogického nebo dlouhodobého Impactu, prokázaná willingness-to-pay a dlouhodobé outcomes napříč více školami."],
  ["DALŠÍ KROK", "Řízený školní pilot s jasnou metrikou, safeguardingem a privacy odpovědnostmi. Teprve data z tohoto provozu mají rozhodnout, co rozšiřovat, měnit nebo zastavit."],
];

const LOOKING_FOR = [
  ["Škola a pedagogové", "První reálné ověření, které ukáže použitelnost, zátěž a hodnotu pro běžný provoz.", Building2, "/zapojit-se?role=school"],
  ["Mladí lidé a rodiny", "Zpětná vazba k tomu, zda Experience dává smysl člověku a zda hranice soukromí fungují i mimo diagram.", HeartHandshake, "/zapojit-se?role=family"],
  ["Mentoři a odborníci", "Ohraničená expertiza, otázky a pracovní realita bez přebírání role učitele nebo nekontrolovaného kontaktu.", UsersRound, "/zapojit-se?role=mentor"],
  ["Firmy, organizace a obce", "Reálné Challenge, kontext, zdroje a možnost dobrý výstup bezpečně vyzkoušet nebo dál pilotovat.", Target, "/zapojit-se?role=partner"],
];

const NOT_THIS = [
  "Nejsme systém pro skórování lidské hodnoty, osobnosti nebo budoucí kariéry.",
  "Nejsme otevřená sociální síť dětí a dospělých.",
  "Nejsme marketplace, kde si partner kupuje pozitivní výsledek nebo přístup k dítěti.",
  "Nejsme hotová pedagogická autorita s tvrzením o Impactu bez reálného pilotu.",
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-7xl mx-auto py-12 sm:py-20">
          <div className="max-w-5xl">
            <span className="chip bg-primary/10 text-primary mb-5"><Sparkles size={14} /> O Pansofii</span>
            <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Pansofie je funkční digitální produkt. Skutečnou hodnotu musí potvrdit reálný pilot.</h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-4xl">Pansofie vzniká kolem jednoduché otázky: co kdyby mladému člověku po učení nezůstala jen známka nebo dokončený úkol, ale skutečná zkušenost, důkaz práce, vlastní reflexe a ověřený další krok?</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/zapojit-se" className="action-primary w-full sm:w-auto px-7 py-3.5">Přidat se k síti <ArrowRight size={18} /></Link>
              <Link to="/jak-funguje" className="action-secondary w-full sm:w-auto px-7 py-3.5">Jak Pansofie funguje</Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/35">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow">Proč Pansofie vzniká</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Chceme, aby vzdělávání mělo víc míst, kde se člověk potká s realitou.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Nechceme nahradit školu platformou. Chceme jí dát bezpečný způsob, jak kolem jedné skutečné Experience propojit lidi, práci, důkaz, reflexi a další krok.</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="eyebrow">Kdo jsme</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Jsme ve fázi, kdy se produkt musí potkat s realitou — ne si vymyslet větší příběh.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Pansofie je dnes vývojový projekt a funkční digitální produkt připravovaný k prvnímu reálnému školnímu ověření. Veřejně ukazujeme, co už funguje, co teprve testujeme a kde zatím důkaz nemáme.</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">Jména lidí za projektem, právního provozovatele a faktický veřejný kontaktní kanál zveřejníme až ve chvíli, kdy je můžeme uvést přesně a schváleně. Nechceme je nahrazovat placeholdery nebo smyšlenou autoritou.</p>
            </div>

            <aside className="rounded-[2rem] bg-foreground text-background p-7 sm:p-9">
              <div className="flex items-center gap-3"><ShieldCheck size={22} /><p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">Co Pansofie není</p></div>
              <div className="mt-6 space-y-4">
                {NOT_THIS.map((item) => <p key={item} className="flex gap-3 text-sm sm:text-base text-background/78 leading-relaxed"><CheckCircle2 size={17} className="shrink-0 mt-0.5" /><span>{item}</span></p>)}
              </div>
            </aside>
          </div>
        </section>

        <section id="stav" className="border-y border-border/60 bg-card/35 scroll-mt-28">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow">Kde jsme dnes</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Technická připravenost není důkaz dopadu.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Proto oddělujeme implementaci, testování, pilotní ověření, Outcome a Impact. Každá vrstva potřebuje vlastní důkaz.</p>
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

        <section className="container-px max-w-7xl mx-auto py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow">Koho právě hledáme</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Ne publikum. První síť lidí, která nám pomůže zjistit, co je opravdu užitečné.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">Každý vstup má mít konkrétní přínos a zároveň jasnou hranici. Pansofie se má učit z reálného použití, ne z počtu registrací.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {LOOKING_FOR.map(([title, text, Icon, to]) => (
              <Link key={title} to={to} className="group rounded-[2rem] border border-border bg-card/40 p-6 sm:p-7 hover:border-primary/30 hover:bg-primary/[0.025] transition-colors">
                <div className="flex items-start gap-4"><span className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Icon size={21} /></span><div><h3 className="text-xl font-semibold font-heading">{title}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Podívat se na svou cestu <ArrowRight size={15} /></span></div></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/35">
          <div className="container-px max-w-5xl mx-auto py-20 sm:py-24 text-center">
            <span className="inline-flex h-14 w-14 rounded-2xl bg-primary text-primary-foreground items-center justify-center mb-6"><Network size={25} /></span>
            <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Pansofie má smysl jen tehdy, když do sítě vstoupí skuteční lidé se skutečnými potřebami.</h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">Podívejte se na všechny možnosti pomoci nebo si během 60–90 sekund projděte PANSOFIEDIT z vlastní role.</p>
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
