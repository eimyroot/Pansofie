import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Info, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

const PAGES = {
  about: {
    eyebrow: "O projektu",
    icon: Info,
    title: "Pansofie staví učení kolem skutečných Experiences.",
    intro: "Pansofie propojuje mladého člověka, školu, rodinu a podle konkrétní Experience také komunitu, firmu, obec nebo odborníka. Centrem není instituce ani profil člověka, ale skutečná činnost, důkaz, reflexe, ověření a další smysluplný krok.",
    sections: [
      ["Co je dnes skutečné", "Canonical metoda, Experience-first veřejný produkt a digitální School workflow jsou připravené a browserově ověřené na stagingu. Reálný školní field pilot ještě neproběhl."],
      ["Co musí ověřit pilot", "Pedagogickou hodnotu v provozu, učitelskou zátěž, opakování Experiences, rodinnou a partnerskou hodnotu, bezpečnostní provoz a reálný zájem pokračovat."],
      ["Co Pansofie není", "Není to otevřená dětská sociální síť, lidské skóre, AI diagnostika osobnosti, marketplace dětské práce ani marketingový kanál firem k dětem."],
    ],
  },
  privacy: {
    eyebrow: "Soukromí",
    icon: ShieldCheck,
    title: "Soukromí podle účelu, ne podle toho, kdo je nejblíž.",
    intro: "Pansofie používá privacy-by-default přístup: role sama o sobě neznamená přístup ke všemu. Soukromá reflexe, evidence, Passport a partner interaction mají oddělené účely a oprávnění.",
    sections: [
      ["Veřejný web", "Veřejná pre-field-pilot verze nepoužívá behaviorální reklamu dětem ani neprodává uživatelská data. Formulář Zapojit se je zatím záměrně neaktivní a nic neodesílá ani neukládá."],
      ["Pilotní data", "Pilot má sbírat pouze data potřebná pro roli, členství školy, běh Experience, důkaz, reflexi, review, Passport a předem definované vyhodnocení. Přístupy musí být účelově omezené."],
      ["Controller-specific informace", "Před prvním reálným field pilotem musí být zveřejněn právní provozovatel, controller/processor role pro konkrétní nasazení, kontakty pro ochranu údajů, retenční pravidla a proces exportu/smazání."],
    ],
  },
  safety: {
    eyebrow: "Bezpečnost dětí",
    icon: ShieldCheck,
    title: "Bezpečnost není disclaimer. Je součást produktu.",
    intro: "První pilot musí mít pojmenované odpovědné osoby, účelově omezené přístupy, dohled nad partner interaction a jasný incident process. Dítě nesmí být cenou za hodnotu, kterou získává škola nebo partner.",
    sections: [
      ["Child Promise", "Žádný prodej dat, behaviorální reklama dětem, human-worth score, emotion recognition, tajné profilování, AI diagnóza osobnosti ani nekontrolované soukromé kanály dospělý → dítě."],
      ["Partner interaction", "Povoleny jsou školou řízené nebo moderované formy spolupráce. Partner nemá automatický přístup k identitě, soukromé reflexi nebo raw evidence dítěte a nesmí podmiňovat účast marketingem."],
      ["Před prvním účtem", "Škola a Pansofie musí určit pilot lead, safeguarding kontakt, privacy/data kontakt, technical incident kontakt a partner kontakt a ověřit proces incidentu, smazání a exportu."],
    ],
  },
  terms: {
    eyebrow: "Podmínky veřejného webu",
    icon: FileText,
    title: "Veřejný web popisuje připravovaný produkt, ne hotový komerční slib.",
    intro: "Tato verze slouží k transparentnímu vysvětlení Pansofie a připravovaného prvního field pilotu. Nejde o veřejnou nabídku garantovaného programu ani o důkaz pedagogického, obchodního nebo dlouhodobého dopadu.",
    sections: [
      ["Pilotní přijetí", "O zapojení školy, partnera nebo komunity rozhoduje konkrétní pilotní screening, kapacita, bezpečnost, účel a vzájemná hodnota. Vyplnění nebo příprava zájmu nezakládá nárok na účast."],
      ["Výstupy a IP", "Partnerství ani financování automaticky nepřevádí vlastnictví žákovského nebo týmového výstupu. Případné komerční užití potřebuje samostatně vyjasněná práva a souhlasy."],
      ["Před veřejnou aktivací", "Před reálným field pilotem musí být doplněna právní identifikace provozovatele, veřejný kontakt, privacy/controller informace a konkrétní smluvní podmínky pro zapojené školy a partnery."],
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
            <div><p className="text-sm font-semibold">Potřebujete se zapojit nebo připravit konkrétní pilot?</p><p className="mt-1 text-sm text-muted-foreground">Vstup začíná rolí a účelem — ne otevřenou registrací.</p></div>
            <Link to="/zapojit-se" className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground">Zapojit se <ArrowRight size={17} /></Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
