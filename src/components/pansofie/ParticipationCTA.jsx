import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const COPY = {
  cs: {
    eyebrow: "JAK S NÁMI ZAČÍT",
    title: "Udělejte první krok k nápravě.",
    lead: "Vyberte si cestu, která odpovídá tomu, co můžete skutečně přinést. Nejdřív malý ověřitelný krok — teprve potom větší sliby.",
    school: {
      title: "Chci Pansofii do školy",
      text: "Proměňte konkrétní potřebu třídy v bezpečně ohraničenou zkušenost. Začněte ukázkovou lekcí a školním pilotním intake.",
      action: "Otevřít školní intake",
      secondary: "Stáhnout ukázkovou lekci",
    },
    company: {
      title: "Chci rozvíjet svůj tým",
      text: "Přineste skutečnou výzvu v oblasti kritického myšlení, dialogu, AI nebo odpovědné inovace. Neprodáváme instantní certifikát.",
      action: "Nezávazně popsat výzvu",
    },
    ecology: {
      title: "Chci podpořit zelené projekty",
      text: "Propojte školu, firmu a komunitu přes materiál, který může dostat druhý život. Nabídky, rezervace a předání jsou dohledatelné.",
      action: "Otevřít Materiálový most",
    },
  },
  en: {
    eyebrow: "HOW TO START",
    title: "Take the first step toward repair.",
    lead: "Choose the path that matches what you can genuinely contribute. Start with one verifiable step before making bigger promises.",
    school: {
      title: "Bring Pansofie to my school",
      text: "Turn one concrete classroom need into a safely bounded Experience. Start with a sample lesson and school pilot intake.",
      action: "Open school intake",
      secondary: "Download sample lesson",
    },
    company: {
      title: "Develop my team",
      text: "Bring a real challenge around critical thinking, dialogue, AI or responsible innovation. We do not sell an instant certificate.",
      action: "Describe the challenge",
    },
    ecology: {
      title: "Support green projects",
      text: "Connect schools, companies and communities through material that can have a second life. Offers, reservations and handovers are traceable.",
      action: "Open Material Bridge",
    },
  },
};

export default function ParticipationCTA() {
  const { locale } = useLanguage();
  const copy = COPY[locale] || COPY.cs;

  return (
    <section className="r14-participation-cta">
      <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
        <div className="r14-participation-head">
          <span>{copy.eyebrow}</span>
          <h2>{copy.title}</h2>
          <p>{copy.lead}</p>
        </div>
        <div className="r14-participation-grid">
          <article className="r14-participation-card r14-participation-card--school">
            <School size={28} />
            <h3>{copy.school.title}</h3>
            <p>{copy.school.text}</p>
            <div className="r14-participation-actions">
              <Link to="/zapojit-se/skola" className="action-primary">{copy.school.action} <ArrowRight size={16} /></Link>
              <a href="/materials/pansofie-ukazkova-lekce-kriticke-mysleni.md" download className="action-secondary"><Download size={16} /> {copy.school.secondary}</a>
            </div>
          </article>
          <article className="r14-participation-card r14-participation-card--company">
            <BriefcaseBusiness size={28} />
            <h3>{copy.company.title}</h3>
            <p>{copy.company.text}</p>
            <div className="r14-participation-actions"><Link to="/zapojit-se/firma" className="action-primary">{copy.company.action} <ArrowRight size={16} /></Link></div>
          </article>
          <article className="r14-participation-card r14-participation-card--ecology">
            <Boxes size={28} />
            <h3>{copy.ecology.title}</h3>
            <p>{copy.ecology.text}</p>
            <div className="r14-participation-actions"><Link to="/materialovy-most" className="action-primary">{copy.ecology.action} <ArrowRight size={16} /></Link></div>
          </article>
        </div>
      </div>
    </section>
  );
}
