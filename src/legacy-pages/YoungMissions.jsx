import React, { useState } from "react";
import { ArrowLeft, Check, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../state/LanguageContext";

const MISSIONS = [
  { branch:"9–12", icon:"🌿", cs:"Najdi pět podob zeleně", en:"Find five forms of greenery", csText:"Vydej se s dospělým na krátkou výpravu a všimni si, jak příroda vstupuje do města.", enText:"Take a short walk with a trusted adult and notice how nature enters the city." },
  { branch:"13–15", icon:"🧰", cs:"Oprav místo vyhození", en:"Repair instead of throwing away", csText:"S týmem a vedoucím zjisti, co lze bezpečně opravit nebo využít jinak.", enText:"With a team and facilitator, find what can safely be repaired or reused." },
  { branch:"16–18", icon:"🎙️", cs:"Zachyť příběh svého okolí", en:"Capture a local story", csText:"Připrav rozhovor přes školu či organizaci a zveřejni jen to, k čemu máš souhlas.", enText:"Arrange an interview through a school or organisation and publish only with consent." },
];

export default function YoungMissions(){
  const {isEnglish}=useLanguage(); const [age,setAge]=useState("all"); const [saved,setSaved]=useState([]);
  const visible=MISSIONS.filter(m=>age==="all"||m.branch===age);
  return <div className="young-world young-missions"><Link to="/young" className="young-back"><ArrowLeft size={15}/>{isEnglish?"Back to Young":"Zpět do Young"}</Link><header><p className="young-kicker">{isEnglish?"MISSION GARDEN":"ZAHRADA MISÍ"}</p><h1>{isEnglish?"Choose what you want to try":"Vyber si, co chceš zkusit"}</h1><p>{isEnglish?"A mission is an invitation, not homework. Save one now and decide later.":"Mise je pozvání, ne domácí úkol. Můžeš si ji uložit a rozhodnout se později."}</p></header><div className="young-filters" aria-label={isEnglish?"Age filter":"Filtr věku"}>{["all","9–12","13–15","16–18"].map(v=><button key={v} className={age===v?"is-active":""} onClick={()=>setAge(v)}>{v==="all"?(isEnglish?"All branches":"Všechny větve"):v}</button>)}</div><div className="young-mission-grid">{visible.map(m=>{const isSaved=saved.includes(m.cs);return <article key={m.cs}><div className="young-mission-icon">{m.icon}</div><small>{m.branch}</small><h2>{isEnglish?m.en:m.cs}</h2><p>{isEnglish?m.enText:m.csText}</p><div className="young-mission-meta"><span><Lock size={13}/>{isEnglish?"With a trusted adult or organisation":"S důvěryhodným dospělým či organizací"}</span></div><button onClick={()=>setSaved(s=>isSaved?s.filter(x=>x!==m.cs):[...s,m.cs])}>{isSaved?<><Check size={15}/>{isEnglish?"Saved":"Uloženo"}</>:<><Sparkles size={15}/>{isEnglish?"Save for later":"Uložit na později"}</>}</button></article>})}</div>{!visible.length&&<div className="state-card"><h2>{isEnglish?"No missions here yet":"Tady zatím žádná mise není"}</h2><p>{isEnglish?"Try another branch. New missions are added only after a safety review.":"Zkus jinou větev. Nové mise přidáváme až po bezpečnostní kontrole."}</p></div>}</div>
}
