import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { PROGRAMS } from "@/lib/pansofieData";

const PROGRAM_META = {
  school: {
    status: "PILOT NOW",
    title: "První reálně ověřený program PANSOFIE",
    note: "PANSOFIE School má ověřený digitální Experience flow na stagingu. Skutečný školní field pilot je další krok — pedagogický efekt ani willingness-to-pay zatím netvrdíme jako validované.",
    receives: [
      "3 pilotní Experiences s důkazem, reflexí a odděleným review",
      "učitelský workflow pro přiřazení, kontrolu, revizi a finalizaci",
      "soukromý Experience Passport po ověřeném dokončení",
      "RVP návaznost, safeguarding baseline a měřitelný pilotní rámec",
    ],
    contributes: [
      "bezpečné prostředí a pedagogické vedení",
      "kohortu a reálné školní potřeby",
      "evidence o použitelnosti, učitelské zátěži a opakování Experience",
      "příležitost propojit rodiny a reálné partnery pod školním dohledem",
    ],
    ctaTo: "/pilot",
    ctaLabel: "Otevřít školní pilot",
  },
  family: {
    status: "PILOT PARTICIPATION",
    title: "Rodina je first-class součást Experience, ne jen souhlas",
    note: "Samostatný PANSOFIE Family produkt ještě není live. V první reálné verzi má rodina jasnou, bezpečnou a dobrovolnou roli kolem školních Experiences.",
    receives: [
      "srozumitelné vysvětlení, co dítě dělá a proč",
      "bezpečný přehled o pilotu a kontaktech",
      "možnost zapojit se do vybraných rodinných částí Experience",
      "povolený Passport summary pouze tam, kde je pro to správný účel",
    ],
    contributes: [
      "podporu dítěte bez přebírání jeho práce",
      "zkušenost z každodenního života a lokální kontext",
      "dobrovolnou zpětnou vazbu k hodnotě a zátěži programu",
      "důvěru a kontinuitu mezi školou a životem mimo školu",
    ],
    ctaTo: "/pilot",
    ctaLabel: "Podívat se na pilotní rámec",
  },
  community: {
    status: "PILOT PARTICIPATION",
    title: "Komunita přináší skutečný kontext a možnost změny",
    note: "Samostatný Community runtime ještě není live. Obec, spolek nebo místní organizace mohou v pilotu fungovat jako ohraničený problem-owner, knowledge nebo adoption partner.",
    receives: [
      "pozornost k reálnému místnímu problému",
      "výstupy týmů navázané na konkrétní potřebu",
      "možnost odděleně posoudit, zda má řešení smysl pilotovat nebo použít",
      "evidence o procesu bez nároku na soukromá data dětí",
    ],
    contributes: [
      "lokální problém, data nebo kontext",
      "prostředí, kontakty a odbornou znalost",
      "zpětnou vazbu k výstupu",
      "pokud je to vhodné, možnost adopce nebo dalšího pilotu",
    ],
    ctaTo: "/#ekosystem",
    ctaLabel: "Jak funguje ekosystém",
  },
  youth: {
    status: "DEVELOPING",
    title: "15+ pokračování zůstává součástí vize, ale není první pilot",
    note: "PANSOFIE Youth je canonical směr pro samostatnost, práci, finance, mentoring, projekty a občanskou zkušenost. Samostatný Youth runtime zatím není live a nesmí být prezentován jako hotový produkt.",
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
      "reálné výstupy, které mohou mít komunitní nebo partnerský přínos",
    ],
    ctaTo: "/jak-funguje",
    ctaLabel: "Poznat PANSOFIE Method",
  },
};

export default function ProgramDetail() {
  const { id } = useParams();
  const program = PROGRAMS.find((item) => item.id === id) || PROGRAMS[0];
  const meta = PROGRAM_META[program.id] || PROGRAM_META.school;
  const Icon = program.icon;

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft size={16} /> Zpět na web
      </Link>

      <div className="card-soft p-7 sm:p-10 bg-primary/[0.03] border-primary/20">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div className="max-w-3xl">
            <span className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5"><Icon size={24} /></span>
            <div className="inline-flex rounded-full bg-muted px-3 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground mb-3">{meta.status}</div>
            <h1 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight">{program.name}</h1>
            <p className="text-muted-foreground mt-3 text-lg max-w-2xl">{program.desc}</p>
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-border bg-background p-5 sm:p-6">
          <h2 className="text-lg font-semibold">{meta.title}</h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{meta.note}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="card-soft p-6 sm:p-7">
          <p className="text-xs font-semibold tracking-wide text-primary">CO ZÍSKÁVÁ</p>
          <h2 className="mt-2 text-xl font-semibold font-heading">Hodnota pro tuto roli</h2>
          <div className="mt-5 space-y-3">
            {meta.receives.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                <CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card-soft p-6 sm:p-7">
          <p className="text-xs font-semibold tracking-wide text-primary">CO PŘINÁŠÍ</p>
          <h2 className="mt-2 text-xl font-semibold font-heading">Přínos pro celý ekosystém</h2>
          <div className="mt-5 space-y-3">
            {meta.contributes.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                <CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 card-soft p-6 sm:p-7 border-primary/20 bg-primary/[0.025] flex items-start gap-3">
        <ShieldCheck size={21} className="text-primary shrink-0 mt-0.5" />
        <div>
          <h2 className="font-semibold">Reciprocity & safety boundary</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Účast musí vytvářet skutečnou hodnotu pro zapojené strany, ale nikdy se nepřevádí na skóre člověka. Dítě není zdroj bezplatné práce, dat ani reklamy; partner nekupuje pozitivní výsledek a přístup k soukromým dětským datům nevzniká automaticky z partnerství.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a href={meta.ctaTo} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold">
          {meta.ctaLabel} <ArrowRight size={17} />
        </a>
        <a href="/#ekosystem" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-card border border-border rounded-2xl font-semibold">
          Zobrazit všechny role
        </a>
      </div>
    </div>
  );
}
