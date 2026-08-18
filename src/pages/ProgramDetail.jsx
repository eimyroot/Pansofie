import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { PROGRAMS } from "@/lib/pansofieData";

const PROGRAM_META = {
  school: {
    status: "Připraveno pro první pilot",
    description: "Školní Experiences, učitelský workflow, RVP návaznost, soukromý Passport a pilotní evidence.",
    title: "První reálně otestovaný digitální program Pansofie",
    note: "Pansofie School má funkční a otestovaný digitální Experience flow na stagingu. Skutečný školní field pilot je další krok — pedagogický efekt ani ochotu škol platit zatím neprezentujeme jako ověřený fakt.",
    receives: [
      "3 pilotní Experiences s důkazem, reflexí a odděleným review",
      "učitelský workflow pro přiřazení, kontrolu, revizi a finalizaci",
      "soukromý Experience Passport po ověřeném dokončení",
      "RVP návaznost, safeguarding baseline a podklady pro vyhodnocení pilotu",
    ],
    contributes: [
      "bezpečné prostředí a pedagogické vedení",
      "kohortu a reálné školní potřeby",
      "evidence o použitelnosti, učitelské zátěži a opakování Experience",
      "prostor propojit rodiny a reálné partnery pod školním dohledem",
    ],
    ctaTo: "/pilot",
    ctaLabel: "Prozkoumat první pilot",
  },
  family: {
    status: "Zapojení v prvním pilotu",
    description: "Bezpečné a dobrovolné rodinné zapojení kolem konkrétních Experiences. Samostatný Family runtime ještě není live.",
    title: "Rodina má konkrétní roli kolem Experience, ne jen administrativní souhlas",
    note: "V prvním pilotu může rodina přidat reálný kontext — například podnět, zkušenost z běžného života, doporučení člověka nebo zdroje — bez přebírání práce dítěte.",
    receives: [
      "srozumitelné vysvětlení, co dítě dělá a proč",
      "bezpečný přehled o pilotu, termínech a kontaktech",
      "možnost dobrovolně přidat jeden užitečný vstup do vybraných Experiences",
      "povolený Passport summary pouze tam, kde je pro to vyjasněný účel a oprávnění",
    ],
    contributes: [
      "podnět nebo pozorování z reálného života bez přebírání práce dítěte",
      "doporučení člověka, lokálního kontextu nebo bezpečného zdroje, když se to k Experience hodí",
      "dobrovolnou zpětnou vazbu k hodnotě a zátěži programu",
      "důvěru a kontinuitu mezi školou a životem mimo školu",
    ],
    ctaTo: "/pilot",
    ctaLabel: "Prozkoumat první pilot",
  },
  community: {
    status: "Zapojení podle Experience",
    description: "Obce, spolky a místní organizace jako zdroj reálného kontextu, veřejných potřeb a případné adopce výsledku.",
    title: "Komunita může přinést skutečný kontext a možnost změny",
    note: "Samostatný Community runtime ještě není live. Obec, spolek nebo místní organizace mohou v prvním pilotu fungovat jako ohraničený problem-owner, knowledge nebo adoption partner podle konkrétní Experience.",
    receives: [
      "pozornost k reálnému místnímu problému",
      "výstupy týmů navázané na konkrétní veřejnou nebo komunitní potřebu",
      "možnost odděleně posoudit, zda má řešení smysl pilotovat nebo použít",
      "evidence o procesu bez automatického nároku na soukromá data dětí",
    ],
    contributes: [
      "lokální problém, data nebo kontext pouze v potřebném rozsahu",
      "prostředí, kontakty a odbornou znalost",
      "zpětnou vazbu k výstupu",
      "pokud je to vhodné, možnost adopce nebo dalšího pilotu",
    ],
    ctaTo: "/pilot",
    ctaLabel: "Prozkoumat první pilot",
  },
  youth: {
    status: "Připravujeme",
    description: "Směr pro 15+ zaměřený na samostatnost, práci, projekty, mentoring a občanskou zkušenost. Samostatný runtime ještě není live.",
    title: "Pokračování pro 15+ zůstává součástí směru, ale není první pilot",
    note: "Pansofie Youth je budoucí pokračování stejného Experience principu. Není prezentován jako hotový produkt a první validační krok zůstává School pilot.",
    receives: [
      "budoucí návaznost na skutečné Experiences a Passport",
      "prostor pro větší samostatnost a vlastní projekty",
      "kontakt s odborníky a reálným světem pod jasnými pravidly",
      "přenos zkušeností směrem k práci, občanství a podnikavosti",
    ],
    contributes: [
      "vlastní projekty, iniciativu a větší odpovědnost",
      "zpětnou vazbu k přechodu mezi školou a samostatností",
      "peer spolupráci bez popularity a human scoringu",
      "reálné výstupy s možným komunitním nebo partnerským přínosem",
    ],
    ctaTo: "/jak-funguje",
    ctaLabel: "Jak Pansofie funguje",
  },
};

export default function ProgramDetail() {
  const { id } = useParams();
  const program = PROGRAMS.find((item) => item.id === id) || PROGRAMS[0];
  const meta = PROGRAM_META[program.id] || PROGRAM_META.school;
  const Icon = program.icon;

  return (
    <div className="min-h-screen bg-background">
      <main className="px-5 sm:px-8 lg:px-12 py-8 max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"><ArrowLeft size={16} /> Zpět na veřejný web</Link>

        <div className="rounded-[2rem] border border-primary/20 bg-primary/[0.035] p-7 sm:p-10">
          <div className="max-w-4xl">
            <span className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5"><Icon size={24} /></span>
            <div className="inline-flex rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-muted-foreground mb-3">{meta.status}</div>
            <h1 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight">{program.name}</h1>
            <p className="text-muted-foreground mt-3 text-lg max-w-3xl leading-relaxed">{meta.description}</p>
            <div className="mt-7 rounded-2xl border border-border bg-background p-5 sm:p-6"><h2 className="text-lg font-semibold">{meta.title}</h2><p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{meta.note}</p></div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <section className="rounded-3xl border border-border bg-card/40 p-6 sm:p-7">
            <p className="text-xs font-semibold tracking-wide text-primary">CO ZÍSKÁVÁ</p>
            <h2 className="mt-2 text-xl font-semibold font-heading">Hodnota pro tuto roli</h2>
            <div className="mt-5 space-y-3">{meta.receives.map((item) => <div key={item} className="flex items-start gap-3 text-sm leading-relaxed"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /><span>{item}</span></div>)}</div>
          </section>

          <section className="rounded-3xl border border-border bg-card/40 p-6 sm:p-7">
            <p className="text-xs font-semibold tracking-wide text-primary">CO PŘINÁŠÍ</p>
            <h2 className="mt-2 text-xl font-semibold font-heading">Přínos pro celý ekosystém</h2>
            <div className="mt-5 space-y-3">{meta.contributes.map((item) => <div key={item} className="flex items-start gap-3 text-sm leading-relaxed"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /><span>{item}</span></div>)}</div>
          </section>
        </div>

        <div className="mt-6 rounded-3xl border border-primary/20 bg-primary/[0.025] p-6 sm:p-7 flex items-start gap-3">
          <ShieldCheck size={21} className="text-primary shrink-0 mt-0.5" />
          <div>
            <h2 className="font-semibold">Reciprocity & safety boundary</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Účast má vytvářet skutečnou hodnotu pro zapojené strany, ale nikdy se nepřevádí na skóre člověka. Dítě není zdroj bezplatné práce, dat ani reklamy; partner nekupuje pozitivní výsledek a přístup k soukromým dětským datům nevzniká automaticky z žádné role.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to={meta.ctaTo} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold">{meta.ctaLabel} <ArrowRight size={17} /></Link>
          <Link to="/#ekosystem" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-card border border-border rounded-2xl font-semibold">Zobrazit celý ekosystém</Link>
        </div>
      </main>
    </div>
  );
}
