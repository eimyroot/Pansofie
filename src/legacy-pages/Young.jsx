import React from "react";
import { ArrowRight, BookOpen, Compass, Eye, FlaskConical, HandHeart, Leaf, Lightbulb, Palette, Recycle, ShieldCheck, Sprout, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ART } from "../lib/artkit";
import { useLanguage } from "../state/LanguageContext";

const BRANCHES = {
  cs: [
    ["9–12 let", "První výpravy", "Krátké mise s dospělým, školou nebo skupinou."],
    ["13–15 let", "Vlastní nápady", "Bezpečné experimenty, týmová tvorba a péče o okolí."],
    ["16–18 let", "Skutečné projekty", "Mentoring přes ověřenou organizaci a větší samostatnost."],
  ],
  en: [
    ["Ages 9–12", "First quests", "Short missions with a trusted adult, school or group."],
    ["Ages 13–15", "Own ideas", "Safe experiments, team creativity and care for your surroundings."],
    ["Ages 16–18", "Real projects", "Mentoring through a verified organisation and more independence."],
  ],
};

const YOUNG_COPY = {
  cs: {
    eyebrow: "Živý prostor pro mladé objevitele",
    titleA: "Pansofie Young.",
    titleB: "Místo, kde zvědavost roste dál.",
    lead: "Objevuj, zkoušej, tvoř a pomáhej měnit svět kolem sebe. Young je bezpečná brána do Pansofie pro děti a mladé — s vlastními misemi, větvemi a stromem rozvoje bez hodnocení člověka.",
    primary: "Vybrat si misi",
    secondary: "Prozkoumat větve",
    cardsTitle: "Co chceš dnes dát do pohybu?",
    cardsLead: "Vyber si směr, který tě dnes volá. Bez povinnosti. Bez srovnávání.",
    choices: [
      ["Můžu někomu pomoct", "Najdu malý bezpečný krok, kde můžu být užitečný.", ART.help, Users],
      ["Chci něco změnit", "Objevím nápady a projekty, které dávají smysl.", ART.change, Sprout],
      ["Mám něco navíc", "Sdílím věc, čas nebo dovednost přes dospělého či organizaci.", ART.surplus, Recycle],
      ["Mám nápad", "Uložím myšlenku, kterou můžu rozvinout s ostatními.", ART.idea, Lightbulb],
      ["Jen se chci rozhlédnout", "Podívám se, co se děje kolem mě — bez závazku.", ART.explore, Compass],
    ],
    pillarsTitle: "Tři kořeny Pansofie",
    pillarsLead: "Stejná vize jako v hlavní Pansofii, převedená do jazyka mladých.",
    pillars: [
      ["Vševěda", "Poznávat svět v souvislostech.", ART.pansofia, ["Objevovat", "Ptát se", "Propojovat"]],
      ["Vševýchova", "Růst a učit se po svém tempu.", ART.pampaedia, ["Zkoušet", "Tvořit", "Učit se spolu"]],
      ["Všenáprava", "Pomáhat světu kolem sebe malými kroky.", ART.panorthosia, ["Pomáhat", "Pečovat", "Měnit okolí"]],
    ],
    floating: [
      ["Vševěda", "Pozorovat svět v souvislostech.", Eye],
      ["Vševýchova", "Růst bez závodu a známkování.", BookOpen],
      ["Všenáprava", "Zlepšovat svět kolem sebe.", Leaf],
    ],
  },
  en: {
    eyebrow: "A living space for young explorers",
    titleA: "Pansofie Young.",
    titleB: "A place where curiosity keeps growing.",
    lead: "Discover, try, create and help change the world around you. Young is a safe gateway into Pansofie for children and young people — with missions, branches and a growth tree without rating a person.",
    primary: "Choose a mission",
    secondary: "Explore branches",
    cardsTitle: "What do you want to set in motion today?",
    cardsLead: "Choose the direction that calls you today. No obligation. No ranking.",
    choices: [
      ["I can help someone", "Find a small safe step where you can be useful.", ART.help, Users],
      ["I want to change something", "Discover ideas and projects that feel meaningful.", ART.change, Sprout],
      ["I have something extra", "Share a thing, time or skill through an adult or organisation.", ART.surplus, Recycle],
      ["I have an idea", "Save a thought you can develop with others.", ART.idea, Lightbulb],
      ["I just want to look around", "See what is happening around you — without commitment.", ART.explore, Compass],
    ],
    pillarsTitle: "Three roots of Pansofie",
    pillarsLead: "The same vision as main Pansofie, translated for young people.",
    pillars: [
      ["Universal knowledge", "See the world in context.", ART.pansofia, ["Discover", "Ask", "Connect"]],
      ["Lifelong education", "Grow and learn at your own pace.", ART.pampaedia, ["Try", "Create", "Learn together"]],
      ["Improvement", "Help the world around you through small steps.", ART.panorthosia, ["Help", "Care", "Improve"]],
    ],
    floating: [
      ["Universal knowledge", "Observe the world in context.", Eye],
      ["Lifelong education", "Grow without races or grades.", BookOpen],
      ["Improvement", "Improve the world around you.", Leaf],
    ],
  },
};

export default function Young() {
  const { isEnglish } = useLanguage();
  const branches = BRANCHES[isEnglish ? "en" : "cs"];
  const copy = YOUNG_COPY[isEnglish ? "en" : "cs"];
  return <div className="young-world">
    <nav className="young-nav" aria-label={isEnglish ? "Pansofie Young navigation" : "Navigace Pansofie Young"}>
      <Link to="/young" className="young-logo">PANSOFIE <span>YOUNG</span></Link>
      <div><a href="#principles">{isEnglish ? "How it works" : "Jak to funguje"}</a><a href="#branches">{isEnglish ? "Branches" : "Větve"}</a><Link to="/young/mise">{isEnglish ? "Missions" : "Mise"}</Link><a href="#safety">{isEnglish ? "Safety" : "Bezpečí"}</a></div>
      <Link to="/" className="young-exit">{isEnglish ? "Main Pansofie ↗" : "Hlavní Pansofie ↗"}</Link>
    </nav>

    <section className="young-hero young-hero--vision">
      <div className="young-hero__copy"><p className="young-kicker">{copy.eyebrow}</p><h1><span>{copy.titleA}</span><em>{copy.titleB}</em></h1><p>{copy.lead}</p><div className="young-actions"><Link className="p-btn p-btn--green" to="/young/mise">{copy.primary}<ArrowRight size={16}/></Link><a className="p-btn p-btn--outline" href="#branches">{copy.secondary}</a></div></div>
      <figure className="young-tree-stage">
        <img src={ART.heroTree} alt={isEnglish ? "Watercolour Pansofie Young tree with many discovery branches" : "Akvarelový strom Pansofie Young s větvemi objevování"}/>
        {copy.floating.map(([title,text,Icon], index)=><figcaption className={`young-float young-float--${index+1}`} key={title}><Icon size={25}/><span><strong>{title}</strong><small>{text}</small></span></figcaption>)}
      </figure>
    </section>

    <section className="young-choice-board" aria-labelledby="young-choice-title">
      <div className="young-choice-board__head"><h2 id="young-choice-title">{copy.cardsTitle}</h2><p>{copy.cardsLead}</p></div>
      <div className="young-choice-grid">
        {copy.choices.map(([title,text,img,Icon])=><Link to="/young/mise" className="young-choice-card" key={title}><img src={img} alt=""/><span><Icon size={16}/><strong>{title}</strong><small>{text}</small></span><ArrowRight size={16}/></Link>)}
      </div>
    </section>

    <section className="young-pillar-board" aria-labelledby="young-pillars-title">
      <div className="young-choice-board__head"><h2 id="young-pillars-title">{copy.pillarsTitle}</h2><p>{copy.pillarsLead}</p></div>
      <div className="young-pillar-grid">
        {copy.pillars.map(([title,text,img,items])=><article key={title}><img src={img} alt=""/><div><h3>{title}</h3><p>{text}</p><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></div></article>)}
      </div>
    </section>

    <section id="principles" className="young-principles" aria-labelledby="young-principles-title">
      <div><p className="young-kicker">{isEnglish ? "YOUR WAY" : "TVOJE CESTA"}</p><h2 id="young-principles-title">{isEnglish ? "Four ways to start" : "Čtyři způsoby, jak začít"}</h2></div>
      {[[Compass,"Objevuj","Discover"],[FlaskConical,"Zkoušej","Try"],[Palette,"Tvoř","Create"],[HandHeart,"Pomáhej měnit svět kolem sebe","Help change the world around you"]].map(([Icon,cs,en])=><article key={cs}><Icon aria-hidden="true"/><h3>{isEnglish?en:cs}</h3><p>{isEnglish ? "A possibility, never a test of your worth." : "Možnost, nikdy zkouška tvojí hodnoty."}</p></article>)}
    </section>

    <section id="branches" className="young-branches"><div className="young-section-head"><p className="young-kicker">{isEnglish ? "AGE BRANCHES" : "VĚKOVÉ VĚTVE"}</p><h2>{isEnglish ? "The tree grows with you" : "Strom roste s tebou"}</h2><p>{isEnglish ? "Age helps us suggest a safe level of independence. It never limits what you may be interested in." : "Věk nám pomáhá nabídnout bezpečnou míru samostatnosti. Nikdy neurčuje, co tě smí zajímat."}</p></div><div className="young-branch-grid">{branches.map(([age,title,text],i)=><article key={age}><span>0{i+1}</span><small>{age}</small><h3>{title}</h3><p>{text}</p><Link to="/young/mise">{isEnglish ? "See suitable missions" : "Zobrazit vhodné mise"}<ArrowRight size={14}/></Link></article>)}</div></section>

    <section id="safety" className="young-safety"><ShieldCheck/><div><p className="young-kicker">{isEnglish ? "SAFE BY DESIGN" : "BEZPEČÍ UŽ V NÁVRHU"}</p><h2>{isEnglish ? "No precise child location. No direct contact with an unknown adult." : "Žádná přesná poloha dítěte. Žádný přímý kontakt s neznámým dospělým."}</h2><p>{isEnglish ? "Missions involving people or places are mediated by a parent, school or verified organisation. Public profiles do not show a child’s surname, school schedule or live location." : "Mise spojené s lidmi nebo místy zprostředkuje rodič, škola nebo ověřená organizace. Veřejný profil nezobrazuje příjmení dítěte, školní rozvrh ani živou polohu."}</p><Link to="/bezpecnost">{isEnglish ? "Read the safety rules" : "Přečíst pravidla bezpečí"}<ArrowRight size={14}/></Link></div></section>
  </div>;
}
