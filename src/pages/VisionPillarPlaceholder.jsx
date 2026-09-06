import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "@/vision-r28.css";

const COPY = {
  vsevychova: {
    eyebrow: "02 · VŠEVÝCHOVA / PAMPAEDIA",
    title: "Růst a učit se celý život.",
    body: "Tahle kapitola má vysvětlit, jak Pansofie chápe celoživotní a mezigenerační učení, proměnlivé role člověka a zkušenost jako prostředek rozvoje. Detailní obsah zatím není canonical a nechceme ho doplňovat odhadem.",
    next: "/vize/vsenaprava",
    nextLabel: "Pokračovat: Všenáprava",
  },
  vsenaprava: {
    eyebrow: "03 · VŠENÁPRAVA / PANORTHOSIA",
    title: "Zlepšovat svět kolem sebe.",
    body: "Tahle kapitola má vysvětlit přechod od poznání a zkušenosti k odpovědnému jednání: opravovat, obnovovat, předávat, vytvářet a měnit konkrétní věci v dosahu člověka. Detailní obsah zatím není canonical a nechceme ho doplňovat odhadem.",
    next: "/jak-funguje",
    nextLabel: "Podívat se, jak Pansofie funguje",
  },
};

export default function VisionPillarPlaceholder({ pillar }) {
  const copy = COPY[pillar];
  return (
    <main className="vision-page vision-detail-page">
      <section className="vision-detail-hero vision-shell vision-placeholder">
        <Link className="vision-back" to="/vize"><ArrowLeft size={16} /> Zpět na vizi</Link>
        <p className="vision-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="vision-lead">{copy.body}</p>
        <div className="vision-placeholder-note">
          <strong>Stav: obsahová kostra připravená, detail čeká na schválený text.</strong>
          <span>Route a navigace jsou záměrně připravené už teď, aby informační architektura byla kompletní bez vymýšlení neověřeného obsahu.</span>
        </div>
        <Link className="vision-card-link" to={copy.next}>{copy.nextLabel} <ArrowRight size={17} /></Link>
      </section>
    </main>
  );
}
