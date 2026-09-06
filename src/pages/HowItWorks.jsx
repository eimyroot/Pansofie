import React from "react";
import { ArrowRight, Compass, HandHeart, Leaf, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../state/LanguageContext";
import ArtPageHero from "../components/ArtPageHero";

const COPY = {
  cs: {
    eyebrow:"Jak Pansofie funguje",
    titleA:"Pansofie má člověka dostat k možnosti něco udělat — ",
    titleB:"ne ho zaměstnat systémem.",
    lead:"Pansofie nic nepřikazuje. Žádné povinné body, žádné nucené důkazy, žádný rozvojový plán. Vytváří prostředí, kde se člověk může rozhlédnout a sám si říct: „Tady bych mohl přispět.“",
    badges:["Bez povinnosti","Bez hodnocení člověka","Dobrovolně","Lokálně a prakticky"],
    steps:[
      ["Rozhlédněte se","Podívejte se, co se děje kolem vás — lidé, nápady, materiály, znalosti a malé místní příležitosti."],
      ["Nechte se oslovit","Nic nemusíte plnit. Vyberete si jen to, co vám v danou chvíli dává smysl."],
      ["Propojte se","Můžete nabídnout pomoc, něco sdílet, přidat se k nápadu nebo si naopak o něco říct."],
      ["Pošlete hodnotu dál","Když něco proběhne, stačí jednoduché potvrzení. Příběh, fotka nebo poznámka jsou dobrovolné."],
    ],
    examplesTitle:"Jak to může vypadat v běžném životě",
    examplesLead:"Malé činy, které nemusí začínat velkým závazkem.",
    examples:[
      ["Materiál","Mám dřevo navíc","Nabídnu ho v Kompostu → škola ho objeví → domluvíme předání → kruh je uzavřen."],
      ["Dovednost","Umím něco, co může pomoct","Nabídnu čas nebo zkušenost → někdo se ozve → potkáme se → třeba někdy pomůže zase někdo mně."],
      ["Podnět","Něco v okolí bych chtěl změnit","Přidám podnět → další lidé se mohou přidat → z nápadu může vzniknout společná věc."],
    ],
    recTitle:"Pomoc není dluh.",
    rec:"Nemusíte nic dokazovat ani vracet stejnému člověku. Smyslem je, aby pomoc, znalosti a zdroje mohly v komunitě dál přirozeně obíhat.",
    entry:"Najít svůj vstup"
  },
  en: {
    eyebrow:"How Pansofie works",
    titleA:"Pansofie should help a person reach a real possibility — ",
    titleB:"not keep them busy with a system.",
    lead:"Pansofie does not command. No mandatory points, forced proof or personal development plan. It creates a space where people can look around and decide for themselves: “I could contribute here.”",
    badges:["No obligation","No personal rating","Voluntary","Local and practical"],
    steps:[
      ["Look around","See what is happening around you — people, ideas, materials, knowledge and small local possibilities."],
      ["Let something speak to you","There is nothing to complete. Choose only what feels meaningful in that moment."],
      ["Connect","Offer help, share something, join an idea or ask for something you need."],
      ["Pass value on","When something happens, a simple confirmation is enough. A story, photo or note is optional."],
    ],
    examplesTitle:"What this can look like in everyday life",
    examplesLead:"Small actions that do not need to begin with a big commitment.",
    examples:[
      ["Material","I have spare wood","I offer it in Compost → a school finds it → we arrange handover → the loop closes."],
      ["Skill","I know something that could help","I offer time or experience → someone responds → we meet → perhaps someone helps me another day."],
      ["Idea","I want to change something nearby","I add an idea → other people can join → a shared thing may grow from it."],
    ],
    recTitle:"Help is not debt.",
    rec:"You do not need to prove anything or repay the same person. The point is that help, knowledge and resources can keep circulating naturally through the community.",
    entry:"Find my way in"
  }
};
const icons=[Compass,Sparkles,HandHeart,Leaf];

export default function HowItWorks(){
  const { locale }=useLanguage(); const c=COPY[locale]||COPY.cs;
  return <div className="ak-page r8-how r9-how">
    <ArtPageHero eyebrow={c.eyebrow} title={c.titleA} accent={c.titleB} lead={c.lead}>
      <div className="r8-soft-badges">{c.badges.map(x=><span key={x}>{x}</span>)}</div>
    </ArtPageHero>
    <div className="ak-content-shell">
    <section className="r8-flow-section">
      {c.steps.map(([title,text],i)=>{const Icon=icons[i];return <article className="r8-flow-step" key={title}><span className="r8-flow-step__n">0{i+1}</span><div className="r8-flow-step__icon"><Icon/></div><h2>{title}</h2><p>{text}</p></article>})}
    </section>
    <section className="r8-examples">
      <div className="r8-section-heading"><div><h2>{c.examplesTitle}</h2><p>{c.examplesLead}</p></div></div>
      <div className="r8-example-grid">{c.examples.map(([icon,title,text])=><article className="r8-example-card" key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className="r8-callout"><div><strong>{c.recTitle}</strong><p>{c.rec}</p></div><Link className="r8-primary" to="/pro-koho">{c.entry} <ArrowRight size={16}/></Link></section>
    </div>
  </div>;
}
