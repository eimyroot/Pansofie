import React from "react";
import {
  ArrowRight,
  Binoculars,
  BookOpen,
  Lightbulb,
  Recycle,
  Sprout,
  TreePine,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../state/LanguageContext";

const COPY = {
  cs: {
    eyebrow: "VĚTŠÍ SOUVISLOSTI PRO REÁLNÝ SVĚT",
    title: <>Lepší svět<br/>začíná tady.<br/><span>Společně.</span></>,
    lead: "Propojujeme lidi, znalosti a konkrétní činy pro život, který dává smysl — dnes i zítra.",
    join: "PŘIPOJIT SE",
    discover: "OBJEVIT PANSOFII",
    context: ["LIDÉ", "PŘÍRODA", "MĚSTA", "VĚDĚNÍ", "MOŽNOSTI"],
    impact: "MALÉ KROKY · VELKÝ DOPAD",
    actionsLabel: "Co můžete dát do pohybu",
    actions: [
      ["Můžu někomu pomoct", "Najdu příležitosti, kde mohu být užitečný.", "/osobni-rust"],
      ["Můžu něco změnit", "Zapojím se do konkrétních řešení.", "/knihovna"],
      ["Mám přebytek", "Dám věcem druhý život a propojím se s lidmi.", "/digitalni-kompost"],
      ["Mám nápad", "Proměním myšlenku ve skutečný projekt.", "/knihovna"],
      ["Můžu prozkoumat", "Objevím nová místa, komunity a inspiraci.", "/mapa-kolobehu"],
    ],
    pillarsEyebrow: "TŘI PILÍŘE",
    pillarsSub: "CELEK, VZDĚLÁNÍ, NÁPRAVA",
    pillars: [
      ["PANSOFIE", "Vidět celek. Propojovat.", "/vize#pan-sophia"],
      ["PAMPAEDIA", "Učit se celý život.", "/vize#pampaedia"],
      ["PANORTHOSIA", "Jednat moudře.", "/vize#panorthosia"],
    ],
    quote: "„Moudřejší společnost nevzniká náhodou. Vzniká lidmi, kteří se spojují.“",
    quoteBy: "PANSOFIE",
  },
  en: {
    eyebrow: "WIDER CONNECTIONS FOR THE REAL WORLD",
    title: <>A better world<br/>starts here.<br/><span>Together.</span></>,
    lead: "We connect people, knowledge and concrete action for a life that makes sense — today and tomorrow.",
    join: "JOIN IN",
    discover: "DISCOVER PANSOFIE",
    context: ["PEOPLE", "NATURE", "CITIES", "KNOWLEDGE", "POSSIBILITIES"],
    impact: "SMALL STEPS · BIG IMPACT",
    actionsLabel: "What you can set in motion",
    actions: [
      ["I can help someone", "Find opportunities where I can be useful.", "/osobni-rust"],
      ["I can change something", "Join concrete ideas and solutions.", "/knihovna"],
      ["I have something extra", "Give things a second life and connect with people.", "/digitalni-kompost"],
      ["I have an idea", "Turn a thought into a real project.", "/knihovna"],
      ["I can explore", "Discover places, communities and inspiration.", "/mapa-kolobehu"],
    ],
    pillarsEyebrow: "THREE PILLARS",
    pillarsSub: "WHOLE, EDUCATION, IMPROVEMENT",
    pillars: [
      ["PANSOFIA", "See the whole. Connect.", "/vize#pan-sophia"],
      ["PAMPAEDIA", "Learn throughout life.", "/vize#pampaedia"],
      ["PANORTHOSIA", "Act wisely.", "/vize#panorthosia"],
    ],
    quote: "“A wiser society does not happen by accident. It grows through people who connect.”",
    quoteBy: "PANSOFIE",
  },
};

const ACTIONS = [UsersRound, Sprout, Recycle, Lightbulb, Binoculars];
const PILLARS = [TreePine, BookOpen, Sprout];

export default function Home() {
  const { locale } = useLanguage();
  const c = COPY[locale] || COPY.cs;

  return (
    <div className="final-home">
      <section className="final-hero" aria-labelledby="home-title">
        <img
          className="final-hero__image"
          src="/assets/adult-hero-rooftop.png"
          alt=""
          aria-hidden="true"
        />
        <div className="final-hero__wash" aria-hidden="true" />

        <div className="final-hero__copy">
          <p className="final-kicker">{c.eyebrow}</p>
          <h1 id="home-title">{c.title}</h1>
          <p className="final-hero__lead">{c.lead}</p>
          <div className="final-hero__actions">
            <Link className="final-button final-button--primary" to="/pro-koho">
              {c.join}<ArrowRight size={16}/>
            </Link>
            <Link className="final-button final-button--ghost" to="/jak-to-funguje">
              {c.discover}
            </Link>
          </div>
          <div className="final-impact"><Sprout size={18}/><span>{c.impact}</span></div>
        </div>

        <aside className="final-hero__context" aria-label={locale === "en" ? "Pansofie context" : "Souvislosti Pansofie"}>
          {c.context.map((item) => <span key={item}>{item}</span>)}
          <i aria-hidden="true" />
        </aside>
      </section>

      <section className="final-actions" aria-labelledby="final-actions-title">
        <h2 id="final-actions-title" className="sr-only">{c.actionsLabel}</h2>
        <div className="final-actions__grid">
          {c.actions.map(([title, text, to], index) => {
            const Icon = ACTIONS[index];
            return (
              <Link className="final-action-card" to={to} key={title}>
                <div className={`final-action-card__media final-action-card__media--${index + 1}`} aria-hidden="true" />
                <span className="final-card-icon" aria-hidden="true"><Icon size={24}/></span>
                <div className="final-action-card__body">
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="final-round-arrow" aria-hidden="true"><ArrowRight size={16}/></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="final-pillars" aria-labelledby="final-pillars-title">
        <header className="final-pillars__head">
          <h2 id="final-pillars-title">{c.pillarsEyebrow}</h2>
          <p>{c.pillarsSub}</p>
        </header>

        <div className="final-pillars__layout">
          <div className="final-pillars__grid">
            {c.pillars.map(([title, text, to], index) => {
              const Icon = PILLARS[index];
              return (
                <Link className="final-pillar-card" to={to} key={title}>
                  <div className={`final-pillar-card__media final-pillar-card__media--${index + 1}`} aria-hidden="true" />
                  <span className="final-card-icon final-card-icon--pillar" aria-hidden="true"><Icon size={24}/></span>
                  <div className="final-pillar-card__body">
                    <div><h3>{title}</h3><p>{text}</p></div>
                    <span className="final-round-arrow" aria-hidden="true"><ArrowRight size={16}/></span>
                  </div>
                </Link>
              );
            })}
          </div>

          <blockquote className="final-quote">
            <p>{c.quote}</p>
            <footer><span aria-hidden="true" />{c.quoteBy}</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
