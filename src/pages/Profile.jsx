import React, { useMemo, useState } from "react";
import { Check, Heart, Plus, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { usePansofie } from "../state/PansofieContext";
import { useLanguage } from "../state/LanguageContext";

const MISSION_TITLE_EN = {
  "mission-digitalni-kuryr":"Digital helper",
  "mission-uzavreny-kruh":"Material for a school idea",
  "mission-firemni-prebytek":"A second life for material",
};
const missionTitle=(m,isEnglish)=>isEnglish?(MISSION_TITLE_EN[m.id]||m.title):m.title;

export default function Profile(){
  const {state,updateProfile,resetPrototype}=usePansofie();
  const {isEnglish}=useLanguage();
  const [tab,setTab]=useState("overview");
  const [name,setName]=useState(state.profile.name||"");
  const localSummary=useMemo(()=>({
    give:state.ledger.filter(x=>x.type==="give").length,
    receive:state.ledger.filter(x=>x.type==="receive").length,
    completed:Object.values(state.missions||{}).filter(x=>x.status==="completed").length,
    material:state.materials.filter(x=>!x.demo).length
  }),[state]);
  const opp=Object.values(state.missions||{});
  const tabs=isEnglish?[["overview","Overview"],["inspiration","My inspiration"],["contributions","What I set in motion"]]:[["overview","Přehled"],["inspiration","Moje inspirace"],["contributions","Co jsem dal/a do pohybu"]];

  return <div className="ak-page p-profile r8-profile r9-profile">
    <div className="ak-profile-banner"><div><span className="ak-eyebrow">{isEnglish?"My Pansofie":"Moje Pansofie"}</span><strong>{isEnglish?"A private place for what interests me and what I choose to set in motion.":"Soukromé místo pro to, co mě zajímá a co se rozhodnu dát do pohybu."}</strong></div></div>
    <nav className="p-profile-tabs">{tabs.map(([id,label])=><button className={tab===id?"is-active":""} key={id} onClick={()=>setTab(id)}>{label}</button>)}</nav>
    {tab==="overview"?<>
      <div className="p-profile-layout">
        <aside className="p-profile-sidebar">
          <div className="ak-profile-avatar" aria-label={isEnglish?"Profile":"Profil"}>{(state.profile.name||name||"P").trim().slice(0,1).toUpperCase()}</div>
          <div><h1>{state.profile.name||name||(isEnglish?"Your profile":"Váš profil")}</h1><p>{isEnglish?"Private on this device":"Soukromé v tomto zařízení"}</p><p>{isEnglish?"No public location or reputation rating.":"Bez veřejné polohy a reputačního hodnocení."}</p></div>
          <div className="r8-profile-message"><strong>{isEnglish?"My path":"Moje cesta"}</strong><p>{isEnglish?"No grades or rankings. Just things that spoke to me and that I chose to set in motion.":"Bez známek a pořadí. Jen věci, které mě oslovily a které jsem chtěl/a dát do pohybu."}</p></div>
        </aside>
        <section className="p-growth">
          <h2>{isEnglish?"My Pansofie path":"Moje cesta Pansofií"}</h2>
          <div className="r9-profile-tree" aria-hidden="true"><i/><i/><i/><b/></div>
          <p className="r8-profile-tree-note">{isEnglish?"A personal visualization, not an evaluation of a person.":"Osobní vizualizace, ne hodnocení člověka."}</p>
        </section>
        <aside className="p-missions-side">
          <h2>{isEnglish?"What interests me now":"Co mě právě zajímá"}</h2>
          {opp.filter(m=>m.status!=="completed").slice(0,3).map(m=><Link className="p-mission-side-card" to={`/mise/${m.id}`} key={m.id}><span className="p-mission-side-card__icon"><Heart size={12}/></span><span><strong>{missionTitle(m,isEnglish)}</strong><br/><small>{isEnglish?"Saved for later":"Uloženo pro později"}</small></span></Link>)}
          {!opp.some(m=>m.status!=="completed")&&<Link className="p-mission-side-card" to="/knihovna"><span className="p-mission-side-card__icon"><Plus size={12}/></span><span><strong>{isEnglish?"Find inspiration":"Najít inspiraci"}</strong><br/><small>{isEnglish?"Just look around":"Jen se rozhlédnout"}</small></span></Link>}
          <h2 style={{marginTop:14}}>{isEnglish?"What already happened":"Co už proběhlo"}</h2>
          {opp.filter(m=>m.status==="completed").slice(0,3).map(m=><div className="p-mission-side-card" key={m.id}><span className="p-mission-side-card__icon"><Check size={11}/></span><span><strong>{missionTitle(m,isEnglish)}</strong><br/><small>{isEnglish?"Confirmed locally":"Lokálně potvrzeno"}</small></span></div>)}
          <Link className="p-btn p-btn--green p-btn--small" to="/knihovna" style={{width:"100%",marginTop:10}}>{isEnglish?"Explore more inspiration":"Objevit další inspiraci"}</Link>
        </aside>
      </div>
      <div className="p-profile-bottom">
        <div><strong>{localSummary.give}</strong><span>{isEnglish?"things / help passed on":"věcí / pomocí poslaných dál"}</span></div>
        <div><strong>{localSummary.receive}</strong><span>{isEnglish?"things / help received":"věcí / pomocí přijatých"}</span></div>
        <div><strong>{localSummary.material}</strong><span>{isEnglish?"local items in circulation":"lokálních položek v oběhu"}</span></div>
        <div><strong>{localSummary.completed}</strong><span>{isEnglish?"ideas that actually happened":"podnětů, které opravdu proběhly"}</span></div>
      </div>
      <div className="r8-profile-actions"><div><label className="sr-only" htmlFor="profile-name">{isEnglish?"Display name":"Zobrazované jméno"}</label><input id="profile-name" placeholder={isEnglish?"How should we address you?":"Jak vás máme oslovovat?"} value={name} onChange={e=>setName(e.target.value)}/><button className="p-btn p-btn--green p-btn--small" onClick={()=>updateProfile({name:name.trim()})}>{isEnglish?"Save name":"Uložit jméno"}</button></div><button className="p-btn p-btn--outline p-btn--small" onClick={resetPrototype}><RotateCcw size={10}/> {isEnglish?"Reset prototype":"Reset prototypu"}</button></div>
    </>:<section className="p-secondary" style={{paddingTop:24}}>
      <div className="p-secondary-head"><h1>{tab==="inspiration"?(isEnglish?"My inspiration":"Moje inspirace"):(isEnglish?"What I set in motion":"Co jsem dal/a do pohybu")}</h1><p>{isEnglish?"A private local overview. Not a public reputation or ranking.":"Soukromý lokální přehled. Nejde o veřejnou reputaci ani žebříček."}</p></div>
      <div className="p-list">{tab==="inspiration"&&opp.map(m=><Link className="p-card p-list-card" to={`/mise/${m.id}`} key={m.id}><h2>{missionTitle(m,isEnglish)}</h2><p>{m.status==="completed"?(isEnglish?"Happened":"Proběhlo"):(isEnglish?"I'm interested":"Zajímá mě")}</p></Link>)}{tab==="contributions"&&state.ledger.map(x=><article className="p-card p-list-card" key={x.id}><h2>{x.title}</h2><p>{x.type==="give"?(isEnglish?"Passed on":"Posláno dál"):(isEnglish?"Received":"Přijato")}</p></article>)}</div>
    </section>}
  </div>
}
