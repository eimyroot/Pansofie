import React, { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { MENTORS } from "../lib/demoData";
import { usePansofie } from "../state/PansofieContext";
import { useLanguage } from "../state/LanguageContext";
import ArtPageHero from "../components/ArtPageHero";

const CATEGORY = {
  cs:{all:"Všechny znalosti",craft:"Řemeslo",garden:"Zahrada",tech:"Technologie",history:"Historie a paměť"},
  en:{all:"All knowledge",craft:"Craft",garden:"Garden",tech:"Technology",history:"History & memory"},
};
const CAP = {
  cs:{any:"Bez preference","tech-help":"Technická pomoc",transport:"Odvoz / doprava",produce:"Přebytky ze zahrady",companionship:"Doprovod / společnost"},
  en:{any:"No preference","tech-help":"Tech help",transport:"Transport",produce:"Garden surplus",companionship:"Companionship"},
};
const MENTOR_EN={
  "mentor-josef":{title:"Woodworking basics",mentor:"Josef · DEMO",give:"Working with a chisel, planing and basic wood joints.",take:"Help setting up a smartphone."},
  "mentor-libuse":{title:"Grafting fruit trees",mentor:"Libuše · DEMO",give:"Spring pruning and apple-tree grafting in practice.",take:"Help taking branches to community compost."},
  "mentor-martin":{title:"Python and algorithmic thinking",mentor:"Martin · DEMO",give:"An introduction to Python and simple algorithms.",take:"Surplus fruit or vegetables."},
  "mentor-marie":{title:"Local memory and neighbourhood stories",mentor:"Marie · DEMO",give:"Local history and stories from long-time residents.",take:"Company on an errand or a shared walk."},
};

export default function PersonalGrowth(){
  const {state,startMentoring,closeMentoringCircle}=usePansofie();
  const {locale,isEnglish}=useLanguage();
  const categories=CATEGORY[locale]||CATEGORY.cs, caps=CAP[locale]||CAP.cs;
  const [category,setCategory]=useState("all");
  const [capability,setCapability]=useState("any");
  const mentors=useMemo(()=>{
    const rows=category==="all"?[...MENTORS]:MENTORS.filter(x=>x.category===category);
    return rows.sort((a,b)=>Number(b.needTag===capability)-Number(a.needTag===capability));
  },[category,capability]);

  return <div className="ak-page p-secondary r8-growth r9-growth">
    <ArtPageHero
      eyebrow={isEnglish?"People & mentoring":"Lidé & mentoring"}
      title={isEnglish?"Maybe we can learn something":"Možná se můžeme něco naučit"}
      accent={isEnglish?"from one another.":"jeden od druhého."}
      lead={isEnglish?"Choose an area that interests you. What you might offer another person is a possibility — not a condition and not a debt.":"Vyberte oblast, která vás zajímá. To, co můžete nabídnout druhému, je možnost — ne podmínka a ne dluh."}
    />
    <div className="ak-content-shell">
    <div className="p-secondary-grid">
      <aside className="p-card p-sidebox">
        <h2 className="p-section-title"><Search size={14} style={{display:"inline",marginRight:5}}/>{isEnglish?"What interests me":"Co mě zajímá"}</h2>
        <label>{isEnglish?"Area":"Oblast"}<select value={category} onChange={e=>setCategory(e.target.value)}>{Object.entries(categories).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
        <label>{isEnglish?"What I could perhaps help with":"S čím případně umím pomoct"}<select value={capability} onChange={e=>setCapability(e.target.value)}>{Object.entries(caps).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
        <div className="r8-gentle-note"><strong>{isEnglish?"Nothing needs to be repaid.":"Nemusíte nic splácet."}</strong><span>{isEnglish?"The filter only highlights people who might naturally complement one another.":"Filtr jen zvýrazní vztahy, kde by se lidé mohli přirozeně doplnit."}</span></div>
      </aside>

      <div className="p-list">{mentors.map(m=>{
        const ex=state.mentoring[m.id];
        const match=capability!=="any"&&m.needTag===capability;
        const en=MENTOR_EN[m.id];
        const title=isEnglish?en?.title:m.title, mentor=isEnglish?en?.mentor:`${m.mentor} · DEMO`, give=isEnglish?en?.give:m.give, take=isEnglish?en?.take:m.take;
        return <article className="p-card p-list-card r8-mentor-card" key={m.id} style={match?{borderColor:"#d5a14c"}:{}}>
          <div style={{display:"flex",justifyContent:"space-between",gap:10}}><span className="p-pill">{categories[m.category]}</span>{ex?.status==="closed"&&<span className="p-pill" style={{background:"#dfe8d2",color:"#35552d"}}><Check size={9}/> {isEnglish?"Happened":"Proběhlo"}</span>}</div>
          <h2>{title}</h2><p><strong>{mentor}</strong></p>
          <div className="r8-mentor-pair"><div className="p-panel"><p><strong>{isEnglish?"Happy to share":"Co rád/a předá"}</strong></p><p>{give}</p></div><div className="p-panel r8-mentor-wish"><p><strong>{isEnglish?"Help that would be welcome":"S čím by ocenil/a pomoc"}</strong></p><p>{take}</p><small>{isEnglish?"Not a condition for contact.":"Není podmínkou kontaktu."}</small></div></div>
          <div style={{textAlign:"right",marginTop:9}}>{!ex?<button className="p-btn p-btn--terra p-btn--small" onClick={()=>startMentoring(m.id)}>{isEnglish?"I'm interested":"Zajímá mě to"}</button>:ex.status!=="closed"?<button className="p-btn p-btn--green p-btn--small" onClick={()=>closeMentoringCircle(m)}>{isEnglish?"Yes, it happened":"Ano, proběhlo to"}</button>:null}</div>
        </article>
      })}</div>
    </div>
    </div>
  </div>
}
