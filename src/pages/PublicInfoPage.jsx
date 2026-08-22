import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Info, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

const PAGES = {
  about: {
    eyebrow: "Stav produktu",
    icon: Info,
    title: "Pansofie funguje jako digitální produkt. Její skutečnou hodnotu ale musí potvrdit reálné používání.",
    intro: "Pansofie staví učení kolem skutečných zkušeností: člověk řeší konkrétní potřebu, něco udělá, doloží svou práci, zamyslí se nad ní a projde ověřením. Otevřeně rozlišujeme mezi tím, co už technicky funguje, a tím, co může ukázat až pilot v reálné škole.",
    sections: [
      ["CO UŽ FUNGUJE", "Veřejný web, interaktivní ukázka, školní postup od zadání po ověření i bezpečný proces spolupráce s partnerem jsou implementované a technicky otestované. Partner dostává jen výstup určený ke zpětné vazbě, ne soukromé podklady, reflexi nebo Passport žáka."],
      ["CO POTŘEBUJEME OVĚŘIT", "Zda je postup srozumitelný pro žáky, učitele a rodiny, kolik práce znamená pro učitele, jak kvalitní je spolupráce s partnery a zda zkušenost vede k opravdu užitečnému dalšímu kroku."],
      ["CO ZATÍM NEMÁME PROKÁZANÉ", "Nemáme za sebou vyhodnocený pilot v reálné škole, prokázaný pedagogický nebo dlouhodobý dopad, ověřenou ochotu škol či partnerů za službu platit ani dlouhodobé výsledky z více škol."],
      ["CO NÁSLEDUJE", "První řízený školní pilot s jasnými cíli, odpovědnostmi za ochranu dětí a pravidly pro soukromí. Teprve výsledky z reálného provozu mají rozhodnout, co rozšiřovat, co upravit a co případně zastavit."],
    ],
  },
  privacy: {
    eyebrow: "Soukromí",
    icon: ShieldCheck,
    title: "Každý má vidět jen to, co skutečně potřebuje pro svou roli.",
    intro: "V Pansofii neplatí, že rodič, škola nebo partner automaticky vidí všechno. Soukromá reflexe, důkazy práce, Experience Passport i spolupráce s partnerem mají rozdílný účel a rozdílná oprávnění.",
    sections: [
      ["VEŘEJNÁ UKÁZKA", "PANSOFIEDIT nic neodesílá ani neukládá na server a nepředstírá, že odeslal přihlášku nebo kontakt. Veřejná část produktu nepoužívá behaviorální reklamu zaměřenou na děti ani model založený na prodeji uživatelských dat."],
      ["DATA V PILOTU", "Pilot má sbírat jen údaje potřebné pro konkrétní roli, školní zapojení, průběh zkušenosti, důkaz práce, reflexi, ověření, Passport a předem dohodnuté vyhodnocení. Přístup k nim má být omezený podle skutečného účelu."],
      ["CO MUSÍ BÝT DOŘEŠENO PŘED REÁLNÝM PILOTEM", "Musí být přesně uveden právní provozovatel, odpovědnosti za zpracování dat, veřejný kontakt pro soukromí a data, doba uchování údajů a postup pro jejich export nebo smazání. Tyto informace nebudeme nahrazovat smyšlenými údaji."],
    ],
  },
  safety: {
    eyebrow: "Bezpečnost dětí",
    icon: ShieldCheck,
    title: "Bezpečnost dětí není poznámka pod čarou. Je součástí toho, jak Pansofie funguje.",
    intro: "Před reálným pilotem musí být jasné, kdo za co odpovídá, kdo smí k jakým informacím a jak probíhá kontakt s dospělými mimo školu. Hodnota pro školu nebo partnera nikdy nesmí vznikat na úkor bezpečí dítěte.",
    sections: [
      ["CO PANSOFIE NECHCE DĚLAT", "Žádný prodej dětských dat, behaviorální reklama dětem, skórování lidské hodnoty, automatické rozpoznávání emocí, tajné profilování, AI diagnóza osobnosti ani nekontrolovaný soukromý kontakt dospělého s dítětem."],
      ["SPOLUPRÁCE S PARTNEREM", "Spolupráci vede nebo kontroluje škola. Partner nemá automatický přístup k identitě dítěte, soukromé reflexi, neveřejným podkladům ani Experience Passportu a nesmí podmiňovat vzdělávací účast marketingovým souhlasem."],
      ["PŘED PRVNÍM REÁLNÝM ÚČTEM", "Škola a Pansofie musí určit odpovědnou osobu za pilot, ochranu dětí, soukromí a data, technické incidenty a komunikaci s partnerem. Současně musí být ověřený postup pro řešení incidentu, export a smazání dat."],
    ],
  },
  terms: {
    eyebrow: "Podmínky veřejného webu",
    icon: FileText,
    title: "Veřejný web vysvětluje Pansofii a připravovaný pilot. Neslibuje výsledek, který ještě nebyl ověřen.",
    intro: "Tato verze webu slouží k transparentnímu vysvětlení produktu a přípravě prvního reálného školního ověření. Sama o sobě není důkazem pedagogického, obchodního ani dlouhodobého dopadu.",
    sections: [
      ["ZAPOJENÍ DO PILOTU", "O zapojení školy, partnera nebo komunity rozhoduje konkrétní posouzení vhodnosti, kapacity, bezpečnosti, účelu a vzájemné hodnoty. Průchod veřejnou ukázkou nezakládá nárok na účast a nevytváří uloženou přihlášku."],
      ["VÝSTUPY A PRÁVA", "Partnerství ani financování automaticky nepřevádí vlastnictví žákovského nebo týmového výstupu. Případné komerční využití musí mít zvlášť vyjasněná práva, pravidla a potřebné souhlasy."],
      ["PŘED REÁLNÝM SPUŠTĚNÍM", "Musí být doplněna právní identifikace provozovatele, veřejný kontakt, informace o odpovědnosti za zpracování dat a konkrétní smluvní podmínky pro zapojené školy a partnery. Do té doby tyto údaje nevymýšlíme."],
    ],
  },
};

export default function PublicInfoPage({ kind = "about" }) {
  const page = PAGES[kind] || PAGES.about;
  const Icon = page.icon || Sparkles;
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-6xl mx-auto py-12 sm:py-20">
          <div className="max-w-4xl">
            <span className="chip bg-primary/10 text-primary mb-5"><Icon size={14} /> {page.eyebrow}</span>
            <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">{page.title}</h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-4xl">{page.intro}</p>
          </div>

          <div className="mt-12 divide-y divide-border rounded-[2rem] border border-border overflow-hidden bg-card/30">
            {page.sections.map(([title, text], index) => (
              <section key={title} className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6 p-6 sm:p-8 bg-background/70">
                <span className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">{String(index + 1).padStart(2, "0")}</span>
                <div><h2 className="text-xl font-semibold font-heading">{title}</h2><p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{text}</p></div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-primary/20 bg-primary/[0.035] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div><p className="text-sm font-semibold">Chcete si princip projít z vlastní role?</p><p className="mt-1 text-sm text-muted-foreground">Začněte tím, kdo jste a co chcete řešit. Ukázka nic neodesílá a není skrytou registrací.</p></div>
            <Link to="/zapojit-se" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground">Vyzkoušet PANSOFIEDIT <ArrowRight size={17} /></Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
