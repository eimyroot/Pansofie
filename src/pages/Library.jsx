import React, { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Lightbulb, Recycle, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../state/LanguageContext";
import ArtPageHero from "../components/ArtPageHero";

const meta=[
  ["ideas",Lightbulb],
  ["guides",BookOpen],
  ["community",UsersRound],
  ["circular",Recycle],
  ["ideas",Lightbulb],
  ["guides",BookOpen],
];
const COPY={
  cs:{
    eyebrow:"Knihovna Pansofie", titleA:"Místo, kde se dobré nápady ", titleB:"neztrácejí.",
    lead:"Návody, podněty, příklady a zkušenosti, které mohou někomu dalšímu otevřít cestu. Ne povinné úkoly — věci, které si můžete vzít, upravit nebo jen přečíst.",
    filters:[["all","Vše"],["ideas","Nápady"],["guides","Návody"],["community","Komunita"],["circular","Koloběh"]],
    items:[
      ["Jak oživit prázdný kout v sousedství?","Podnět","Jednoduché otázky, které pomohou z nápadu udělat první malý krok."],
      ["Jak předat věc dál bez zbytečného odpadu","Návod","Krátký průvodce: popis, lokalita, domluva a jednoduché předání."],
      ["Mezigenerační hodina dovedností","Inspirace","Nápad na setkání, kde každý přinese jednu dovednost, kterou umí předat."],
      ["Materiál jako začátek projektu","Cirkularita","Jak se z přebytku firmy může stát materiál pro školu, dílnu nebo komunitu."],
      ["Co může změnit deset minut času?","Podnět","Malé formy pomoci, které nemusí začínat velkým závazkem."],
      ["Jak pozvat další lidi k nápadu","Návod","Mluvte o možnosti, ne o povinnosti. Ukažte, co je potřeba a co může vzniknout."],
    ],
    open:"Prohlédnout", callTitle:"Máte něco, co by mohlo pomoct ostatním?",
    call:"Knihovna má časem růst z toho, co lidé sami chtějí poslat dál — nápady, postupy, zkušenosti i malé projekty.", join:"Jak se zapojit"
  },
  en:{
    eyebrow:"Pansofie Library", titleA:"A place where useful ideas ", titleB:"do not disappear.",
    lead:"Guides, prompts, examples and experiences that can open a path for someone else. Not mandatory tasks — things you can take, adapt or simply read.",
    filters:[["all","All"],["ideas","Ideas"],["guides","Guides"],["community","Community"],["circular","Circulation"]],
    items:[
      ["How could an empty corner of the neighbourhood come alive?","Prompt","Simple questions that can turn an idea into a first small step."],
      ["How to pass an item on without unnecessary waste","Guide","A short guide: description, locality, agreement and simple handover."],
      ["Intergenerational skill hour","Inspiration","An idea for a meeting where everyone brings one skill they can share."],
      ["Material as the beginning of a project","Circularity","How a company surplus can become material for a school, workshop or community."],
      ["What can ten minutes of time change?","Prompt","Small forms of help that do not need to start with a big commitment."],
      ["How to invite other people into an idea","Guide","Talk about a possibility, not an obligation. Show what is needed and what might emerge."],
    ],
    open:"Explore", callTitle:"Do you have something that could help others?",
    call:"Over time the Library should grow from what people themselves want to pass on — ideas, methods, experience and small projects.", join:"How to join"
  }
};
export default function Library(){
  const {locale}=useLanguage(); const c=COPY[locale]||COPY.cs;
  const [filter,setFilter]=useState("all");
  const rows=useMemo(()=>c.items.map((x,i)=>[...meta[i],...x]).filter(x=>filter==="all"||x[0]===filter),[filter,c]);
  return <div className="ak-page r8-library r9-library">
    <ArtPageHero eyebrow={c.eyebrow} title={c.titleA} accent={c.titleB} lead={c.lead}/>
    <div className="ak-content-shell">
    <section className="r8-library-toolbar">{c.filters.map(([id,label])=><button className={filter===id?"is-active":""} key={id} onClick={()=>setFilter(id)}>{label}</button>)}</section>
    <section className="r8-library-grid">{rows.map(([kind,Icon,title,label,text])=><article className="r8-library-card" key={title}><div className="r8-library-card__icon"><Icon/></div><small>{label}</small><h2>{title}</h2><p>{text}</p><button type="button">{c.open} <ArrowRight size={13}/></button></article>)}</section>
    <section className="r8-callout"><div><strong>{c.callTitle}</strong><p>{c.call}</p></div><Link className="r8-secondary" to="/pro-koho">{c.join} <ArrowRight size={15}/></Link></section>
    </div>
  </div>
}
