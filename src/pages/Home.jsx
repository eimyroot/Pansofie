import React from "react";
import { ArrowRight, Leaf, Search, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import DevelopmentPaths from "../components/DevelopmentPaths";
import { useLanguage } from "../state/LanguageContext";

const COPY = {
  cs: {
    eyebrow: "Lepší souvislosti pro reálný svět",
    title1: "Lepší svět",
    title2: "začíná tady.",
    title3: "Společně.",
    lead: "Propojujeme lidi, znalosti a konkrétní činy pro živoucí, moudrou a udržitelnou budoucnost.",
    join: "Přidejte se k nám",
    how: "Podívejte se, jak to funguje",
    sideTitle: "Život v souvislostech",
    sideLead: "Pansofie je otevřená platforma pro všechny, kdo chtějí rozumět světu a aktivně ho zlepšovat.",
    sideWords: ["Lidé", "Příroda", "Města", "Vědění", "Možnosti"],
    tags: [
      ["Vševěda", "Porozumět světu v souvislostech."],
      ["Vševýchova", "Růst a učit se po celý život."],
      ["Všenáprava", "Zlepšovat svět kolem sebe."],
    ],
    moveTitle: "Co byste dnes chtěli dát do pohybu?",
    moveLead: "Vyberte si směr, který vás dnes volá. Bez závazků. Podle vás.",
    choices: [
      ["Můžu někomu pomoct", "Najdu příležitosti, kde mohu být užitečný."],
      ["Chci něco změnit", "Objevím nápady a projekty, které dávají smysl."],
      ["Mám něco navíc", "Sdílím věci a materiál, které mohou ještě někomu posloužit."],
      ["Mám nápad", "Přidám myšlenku nebo projekt, který může inspirovat ostatní."],
      ["Jen se chci rozhlédnout", "Prozkoumám, co se děje kolem mě. Bez závazku."],
    ],
    pillarsTitle: "Tři pilíře Pansofie",
    pillarsLead: "Komenského myšlenky přeložené do dnešního života.",
    pillars: [
      ["Vševěda", "Pansofia", "Rozumět sobě, lidem a světu kolem nás.", ["Objevovat", "Rozumět souvislostem", "Propojovat"]],
      ["Vševýchova", "Pampaedia", "Růst celý život — a jeden od druhého.", ["Sdílet znalosti", "Rozvíjet se", "Učit se navzájem"]],
      ["Všenáprava", "Panorthosia", "Když něco může být lepší, můžeme s tím něco udělat.", ["Pomáhat", "Tvořit změnu", "Pečovat o svět"]],
    ],
    more: "Zjistit více",
    noteTitle: "Pansofie nic nepřikazuje.",
    note: "Ukazuje možnosti. Můžete se jen rozhlédnout, nechat se inspirovat — a zapojit se teprve ve chvíli, kdy sami budete chtít.",
  },
  en: {
    eyebrow: "Better connections for the real world",
    title1: "A better world",
    title2: "starts here.",
    title3: "Together.",
    lead: "We connect people, knowledge and concrete action for a living, wise and sustainable future.",
    join: "Find my way in",
    how: "See how it works",
    sideTitle: "Life in context",
    sideLead: "Pansofie is an open platform for everyone who wants to understand the world and actively improve it.",
    sideWords: ["People", "Nature", "Cities", "Knowledge", "Possibilities"],
    tags: [
      ["Universal knowledge", "Understand the world in context."],
      ["Lifelong education", "Keep growing and learning throughout life."],
      ["Improvement", "Make the world around us a little better."],
    ],
    moveTitle: "What would you like to set in motion today?",
    moveLead: "Choose what feels meaningful today. No obligation. On your terms.",
    choices: [
      ["I can help someone", "Find a small opportunity where my time or skill can be useful."],
      ["I want to change something", "Explore ideas and projects that feel worth doing."],
      ["I have something extra", "Share a thing or material that can still be useful to someone else."],
      ["I have an idea", "Add a thought or project that might inspire other people."],
      ["I just want to look around", "Explore what is happening around me. No commitment."],
    ],
    pillarsTitle: "Three pillars of Pansofie",
    pillarsLead: "Comenius' ideas translated into contemporary life.",
    pillars: [
      ["Universal knowledge", "Pansofia", "Understand ourselves, other people and the world in context.", ["Discover", "Understand connections", "Connect"]],
      ["Lifelong education", "Pampaedia", "Grow throughout life — and learn from one another.", ["Share knowledge", "Develop", "Learn mutually"]],
      ["Improvement", "Panorthosia", "When something can be better, we can choose to do something about it.", ["Help", "Create change", "Care for the world"]],
    ],
    more: "Learn more",
    noteTitle: "Pansofie does not command.",
    note: "It shows possibilities. You can simply look around, take inspiration and join only when you genuinely want to.",
  },
};

const choiceMeta = [
  { to: "/osobni-rust", tone: "green" },
  { to: "/knihovna", tone: "sage" },
  { to: "/digitalni-kompost", tone: "earth" },
  { to: "/knihovna", tone: "sun" },
  { to: "/mapa-kolobehu", tone: "mist" },
];
const pillarMeta = [
  { to: "/vize#pan-sophia" },
  { to: "/vize#pampaedia" },
  { to: "/vize#panorthosia" },
];

export default function Home() {
  const { locale } = useLanguage();
  const c = COPY[locale] || COPY.cs;

  return <div className="ak-home">
    <section className="ak-hero">
      <div className="ak-hero__copy">
        <span className="ak-eyebrow">{c.eyebrow}</span>
        <h1><span>{c.title1}</span><em>{c.title2}</em><em>{c.title3}</em></h1>
        <p>{c.lead}</p>
        <div className="ak-actions">
          <Link className="ak-btn ak-btn--primary" to="/pro-koho">{c.join} <Leaf size={17}/></Link>
          <Link className="ak-btn ak-btn--ghost" to="/jak-to-funguje">{c.how} <ArrowRight size={17}/></Link>
        </div>
      </div>
      <figure className="adult-hero-photo" aria-label={locale==="en"?"Urban garden, city and people in conversation":"Městská zahrada, město a lidé v rozhovoru"}>
        <img src="/assets/adult-hero-rooftop.png" alt=""/>
      </figure>
      <aside className="adult-hero-panel" aria-label={c.sideTitle}>
        <h2>{c.sideTitle}</h2>
        <p>{c.sideLead}</p>
        <div className="adult-context-mark" aria-hidden="true"><span/><span/><span/></div>
        <ul>{c.sideWords.map((word)=><li key={word}>{word}</li>)}</ul>
      </aside>
      <div className="adult-hero-search" aria-hidden="true">
        <Search size={22}/>
      </div>
    </section>

    <section className="ak-movement">
      <header className="ak-section-title"><div><h2>{c.moveTitle}</h2><p>{c.moveLead}</p></div></header>
      <div className="ak-movement__grid">
        {c.choices.map(([title, text], i) => {
          const meta = choiceMeta[i];
          return <Link to={meta.to} className={`ak-choice ak-choice--${meta.tone}`} key={title}>
            <span className="adult-choice-index" aria-hidden="true">{String(i+1).padStart(2,"0")}</span>
            <div className="ak-choice__copy"><h3>{title}</h3><p>{text}</p></div>
            <span className="ak-arrow"><ArrowRight size={17}/></span>
          </Link>;
        })}
      </div>
    </section>

    <section className="ak-pillars">
      <header className="ak-section-title ak-section-title--compact"><div><h2>{c.pillarsTitle}</h2><p>{c.pillarsLead}</p></div></header>
      <div className="ak-pillars__grid">
        {c.pillars.map(([name, latin, modern, bullets], i) => {
          const meta = pillarMeta[i];
          return <article className={`ak-pillar ak-pillar--${i+1}`} key={latin}>
            <span className="adult-pillar-index" aria-hidden="true">0{i+1}</span>
            <div className="ak-pillar__copy"><span>{i+1}.</span><h3>{name}<small>{latin}</small></h3><p>{modern}</p><ul>{bullets.map((x)=><li key={x}>{x}</li>)}</ul><Link to={meta.to}>{c.more} <ArrowRight size={13}/></Link></div>
          </article>;
        })}
      </div>
    </section>

    <DevelopmentPaths compact />

    <section className="ak-note"><Sprout size={22}/><div><strong>{c.noteTitle}</strong><span>{c.note}</span></div></section>
  </div>;
}
