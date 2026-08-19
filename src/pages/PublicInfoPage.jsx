import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Info, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

const PAGES = {
  about: {
    eyebrow: "Stav produktu",
    icon: Info,
    title: "Pansofie je funkční digitální produkt. Skutečnou hodnotu musí potvrdit reálný pilot.",
    intro: "Pansofie staví učení kolem Experiences: skutečné potřeby, práce, důkazu, reflexe, ověření a dalšího kroku. Veřejně oddělujeme technickou připravenost od tvrzení, která mohou vzniknout až po skutečném školním provozu.",
    sections: [
      ["FUNKČNÍ / TECHNICKY OVĚŘENÉ", "Veřejný Experience-first web, role-aware PANSOFIEDIT, školní Experience workflow a Partner Challenge → bounded output → Review → adoption decision → Outcome evidence jsou implementované a technicky ověřené. Role a přístupy jsou navržené tak, aby Partner nečetl learner raw evidence, soukromou reflexi ani Passport."],
      ["TESTUJEME", "Srozumitelnost pro žáka, učitele a rodinu; reálnou učitelskou zátěž; kvalitu Partner feedbacku; provozní bezpečnost a to, zda Experience opravdu vede k použitelnému dalšímu kroku."],
      ["JEŠTĚ NEPROBĚHLO", "Plnohodnotný reálný školní field pilot s vyhodnocením, důkaz pedagogického nebo dlouhodobého Impactu, prokázaná willingness-to-pay a dlouhodobé outcomes napříč více školami."],
      ["DALŠÍ KROK", "Řízený školní pilot s jasnou metrikou, safeguardingem a privacy odpovědnostmi. Teprve data z tohoto provozu mají rozhodnout, co rozšiřovat, měnit nebo zastavit."],
    ],
  },
  privacy: {
    eyebrow: "Soukromí",
    icon: ShieldCheck,
    title: "Soukromí podle účelu, ne podle toho, kdo je nejblíž.",
    intro: "Pansofie používá privacy-by-default přístup: role sama o sobě neznamená přístup ke všemu. Soukromá reflexe, evidence, Passport a Partner interaction mají oddělené účely a oprávnění.",
    sections: [
      ["Veřejná ukázka", "PANSOFIEDIT nic neodesílá ani neukládá na server a nesimuluje úspěšné odeslání zájmu. Veřejný produkt nepoužívá dětskou behaviorální reklamu ani neprodává uživatelská data."],
      ["Pilotní data", "Pilot má sbírat pouze data potřebná pro roli, členství školy, běh Experience, důkaz, reflexi, review, Passport a předem definované vyhodnocení. Přístupy musí být účelově omezené."],
      ["Co musí být doplněno před reálným pilotem", "Faktický právní provozovatel, controller/processor role pro konkrétní nasazení, veřejný privacy/data kontakt, retenční pravidla a proces exportu/smazání. Tyto údaje nesmí být nahrazené smyšlenými placeholdery."],
    ],
  },
  safety: {
    eyebrow: "Bezpečnost dětí",
    icon: ShieldCheck,
    title: "Bezpečnost není disclaimer. Je součást produktu.",
    intro: "Pilot musí mít pojmenované odpovědné osoby, účelově omezené přístupy, dohled nad Partner interaction a jasný incident process. Dítě nesmí být cenou za hodnotu, kterou získává škola nebo Partner.",
    sections: [
      ["Child Promise", "Žádný prodej dat, behaviorální reklama dětem, human-worth score, emotion recognition, tajné profilování, AI diagnóza osobnosti ani nekontrolované soukromé kanály dospělý → dítě."],
      ["Partner interaction", "Povoleny jsou školou řízené nebo moderované formy spolupráce. Partner nemá automatický přístup k identitě, soukromé reflexi, learner raw evidence nebo Passportu a nesmí podmiňovat účast marketingem."],
      ["Před prvním reálným účtem", "Škola a Pansofie musí určit pilot lead, safeguarding kontakt, privacy/data kontakt, technical incident kontakt a Partner kontakt a ověřit proces incidentu, smazání a exportu."],
    ],
  },
  terms: {
    eyebrow: "Podmínky veřejného webu",
    icon: FileText,
    title: "Veřejný web vysvětluje produkt a připravovaný pilot. Negarantuje výsledek.",
    intro: "Tato verze slouží k transparentnímu vysvětlení Pansofie a přípravě prvního reálného školního ověření. Není důkazem pedagogického, obchodního nebo dlouhodobého Impactu.",
    sections: [
      ["Pilotní zapojení", "O zapojení školy, partnera nebo komunity rozhoduje konkrétní pilotní screening, kapacita, bezpečnost, účel a vzájemná hodnota. Průchod veřejnou ukázkou nezakládá nárok na účast a není uloženým leadem."],
      ["Výstupy a IP", "Partnerství ani financování automaticky nepřevádí vlastnictví žákovského nebo týmového výstupu. Případné komerční užití potřebuje samostatně vyjasněná práva a souhlasy."],
      ["Před reálnou aktivací", "Musí být doplněna právní identifikace provozovatele, veřejný kontakt, privacy/controller informace a konkrétní smluvní podmínky pro zapojené školy a partnery. Do té doby tyto údaje nevymýšlíme."],
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
            <div><p className="text-sm font-semibold">Chcete si princip projít z vlastní role?</p><p className="mt-1 text-sm text-muted-foreground">Vstup začíná rolí a účelem — ne otevřenou registrací ani falešným kontaktním formulářem.</p></div>
            <Link to="/zapojit-se" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground">Vyzkoušet PANSOFIEDIT <ArrowRight size={17} /></Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
