import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Boxes, Handshake, Leaf, MapPin, PackageCheck, ShieldCheck, UsersRound } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { useLanguage } from "@/lib/LanguageContext";
import { listPublicMaterialStories } from "@/lib/pansofieParticipationFlow";

const ACTORS = {
  cs: ["Jednotlivec", "Rodina", "Škola", "Firma", "Spolek", "Obec", "Komunita"],
  en: ["Individual", "Family", "School", "Company", "Non-profit", "Municipality", "Community"],
};

export default function MaterialBridgeLanding() {
  const { locale } = useLanguage();
  const en = locale === "en";
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendUnavailable, setBackendUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    listPublicMaterialStories()
      .then((rows) => { if (active) setStories(rows); })
      .catch(() => { if (active) setBackendUnavailable(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen r14-material-public">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="r14-material-hero">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <span className="r14-material-kicker"><Boxes size={18} /> {en ? "MATERIAL BRIDGE · FOR EVERYONE" : "MATERIÁLOVÝ MOST · PRO VŠECHNY"}</span>
            <h1>{en ? "Useful things should find the next person who can use them." : "Užitečné věci mají najít dalšího člověka, který je dokáže využít."}</h1>
            <p>{en ? "Offer what you no longer need or ask for something that would unlock a meaningful project. You do not need to be a company or a school to start." : "Nabídněte to, co už nevyužijete, nebo poptejte něco, co odemkne smysluplný projekt. Nemusíte být firma ani škola, abyste mohli začít."}</p>
            <div className="r14-material-actor-strip" aria-label={en ? "Who can participate" : "Kdo se může zapojit"}>{ACTORS[en ? "en" : "cs"].map((actor) => <span key={actor}>{actor}</span>)}</div>
            <div className="r14-material-actions">
              <Link to="/materialovy-most/zapojit-se" className="action-primary">{en ? "Offer or request material" : "Nabídnout nebo poptat materiál"} <ArrowRight size={17} /></Link>
              <Link to="/login?returnTo=/materialovy-most/workspace" className="action-secondary">{en ? "I already have a pilot account" : "Mám pilotní účet"}</Link>
              <a href="#feed" className="action-secondary">{en ? "See verified handovers" : "Ověřená předání"}</a>
            </div>
            <p className="r14-material-public-boundary"><ShieldCheck size={16} /> {en ? "Public submissions are moderated first. They are never published, reserved or matched automatically." : "Veřejná podání nejdřív procházejí moderací. Nikdy se automaticky nezveřejní, nerezervují ani nespárují."}</p>
          </div>
        </section>

        <section className="r14-material-how">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-20">
            <div className="r14-material-steps">
              <article><span>01</span><UsersRound size={22} /><h2>{en ? "Anyone can start" : "Začít může kdokoli"}</h2><p>{en ? "Individual, family, school, company, non-profit, municipality or community." : "Jednotlivec, rodina, škola, firma, spolek, obec nebo komunita."}</p></article>
              <article><span>02</span><Boxes size={22} /><h2>{en ? "Offer or request" : "Nabídka nebo poptávka"}</h2><p>{en ? "Describe the thing, amount, condition and purpose. Contact details stay private." : "Popište věc, množství, stav a účel. Kontaktní údaje zůstávají neveřejné."}</p></article>
              <article><span>03</span><MapPin size={22} /><h2>{en ? "Keep it local" : "Hledejte blízko"}</h2><p>{en ? "Region and handover method help avoid turning reuse into unnecessary transport." : "Kraj a způsob předání pomáhají, aby opětovné využití nevytvářelo zbytečnou dopravu."}</p></article>
              <article><span>04</span><PackageCheck size={22} /><h2>{en ? "Prove the handover" : "Doložte předání"}</h2><p>{en ? "A verified member can move a real listing through AVAILABLE → RESERVED → HANDED OVER." : "Ověřený člen může skutečnou položku provést stavy AVAILABLE → RESERVED → HANDED OVER."}</p></article>
            </div>
          </div>
        </section>

        <section id="feed" className="r14-material-feed scroll-mt-28">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <span className="r14-material-kicker"><Handshake size={18} /> {en ? "REPAIR FEED" : "FEED NÁPRAVY"}</span>
            <h2>{en ? "Only real handovers. No illustrative success stories disguised as reality." : "Jen skutečná předání. Žádné ilustrační úspěchy vydávané za realitu."}</h2>
            <p className="r14-material-feed-lead">{en ? "A story can appear here only after a real handover, an impact note and explicit consent to publish." : "Příběh se zde může objevit až po skutečném předání, stručném doložení výsledku a výslovném souhlasu se zveřejněním."}</p>
            {loading ? <p className="r14-material-empty">{en ? "Loading verified handovers…" : "Načítám ověřená předání…"}</p> : stories.length ? (
              <div className="r14-story-grid">{stories.map((story) => <article key={story.listing_id}><span>{story.region}</span><h3>{story.title}</h3><p>{story.impact_summary}</p><small>{new Date(story.handed_over_at).toLocaleDateString(en ? "en-GB" : "cs-CZ")}</small></article>)}</div>
            ) : (
              <div className="r14-material-empty"><Leaf size={25} /><h3>{en ? "No verified public handover yet." : "Zatím žádné ověřené veřejné předání."}</h3><p>{backendUnavailable ? (en ? "The R14 backend is not enabled in this environment. We therefore show no synthetic examples." : "R14 backend v tomto prostředí není aktivní. Proto nezobrazujeme žádné smyšlené příklady.") : (en ? "The feed will begin with the first real, consented handover." : "Feed začne prvním skutečným předáním, ke kterému bude souhlas se zveřejněním.")}</p></div>
            )}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
