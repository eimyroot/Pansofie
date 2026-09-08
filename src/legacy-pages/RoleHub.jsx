import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePansofie } from "../state/PansofieContext";
import { useLanguage } from "../state/LanguageContext";
import ArtPageHero from "../components/ArtPageHero";

const META=[
  ["young","/young"],
  ["people","/mapa-kolobehu"],
  ["mentor","/osobni-rust"],
  ["school","/instituce"],
  ["company","/instituce"],
];
const COPY={
  cs:{
    eyebrow:"Pro koho je Pansofie", title:"Každý může vstoupit jinak.",
    lead:"Není potřeba vědět předem, co přesně chcete dělat. Vyberte jen pohled, který je vám teď nejbližší — nebo se klidně jen rozhlédněte.",
    roles:[
      ["Děti & mladí","Objevovat svět, učit se prakticky a přidávat se k věcem, které dávají smysl.","Mohu najít","nápady · pomoc · projekty"],
      ["Rodiny & lidé","Sdílet věci, čas, dovednosti nebo jednoduše zjistit, co se děje v okolí.","Mohu nabídnout","pomoc · materiál · sousedství"],
      ["Senioři & mentoři","Předávat zkušenost bez role „učitele“ a zároveň najít konkrétní lidskou pomoc.","Mohu sdílet","zkušenost · čas · příběhy"],
      ["Školy","Najít materiály, lidi a místní příležitosti pro projekty, které mají skutečný kontext.","Mohu propojit","děti · komunitu · projekty"],
      ["Firmy & organizace","Poslat přebytečné zdroje nebo kapacitu tam, kde mohou být ještě užitečné.","Mohu pustit dál","materiál · know-how · podporu"],
    ],
    noteTitle:"Je v pořádku jen se dívat.", note:"Pansofie nemá být další platforma, která po vás hned něco chce."
  },
  en:{
    eyebrow:"Who Pansofie is for", title:"Everyone can enter in a different way.",
    lead:"You do not need to know in advance exactly what you want to do. Choose the perspective closest to you — or simply look around.",
    roles:[
      ["Children & young people","Explore the world, learn practically and join things that feel meaningful.","I can find","ideas · help · projects"],
      ["Families & people","Share things, time and skills, or simply see what is happening nearby.","I can offer","help · material · neighbourhood"],
      ["Older people & mentors","Share experience without having to become a formal teacher, while also finding human help when useful.","I can share","experience · time · stories"],
      ["Schools","Find materials, people and local possibilities for projects with real context.","I can connect","students · community · projects"],
      ["Companies & organizations","Pass spare resources or capacity to places where they can still be useful.","I can pass on","material · know-how · support"],
    ],
    noteTitle:"It is fine to simply look around.", note:"Pansofie should not become another platform that immediately asks something from you."
  }
};
export default function RoleHub(){
  const {updateProfile}=usePansofie(); const {locale}=useLanguage(); const c=COPY[locale]||COPY.cs;
  return <div className="ak-page r8-roles-page r9-roles-page">
    <ArtPageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead}/>
    <div className="ak-content-shell">
    <section className="r8-role-list">{c.roles.map(([title,text,label,tags],i)=>{const[id,to]=META[i];return <Link className="r8-role-row" to={to} key={id} onClick={()=>updateProfile({role:id})}><span className="r8-role-row__art" aria-hidden="true">{String(i+1).padStart(2,"0")}</span><div className="r8-role-row__copy"><h2>{title}</h2><p>{text}</p></div><div className="r8-role-row__offer"><small>{label}</small><strong>{tags}</strong></div><span className="r8-round-arrow"><ArrowRight size={16}/></span></Link>})}</section>
    <section className="r8-home-note"><div><strong>{c.noteTitle}</strong><span>{c.note}</span></div></section>
    </div>
  </div>
}
