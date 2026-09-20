import React from "react";
import { ArrowLeft, Check, Heart, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { MISSIONS as LEGACY_MISSIONS } from "../lib/missions";
import { GROW_ROUTE_ID, getGrowMissionCard, getGrowMissionPresentation, missionLearningSteps } from "../domain/mission-presentation";
import { usePansofie } from "../state/PansofieContext";
import { useLanguage } from "../state/LanguageContext";

const EN = {
  [GROW_ROUTE_ID]: {
    title: "Grow your first plant",
    heading: "A small concrete step connecting knowledge with care for something alive.",
    description: "Plant a seed or seedling, observe the conditions for growth and decide whether you also want to document the experience.",
    tips: ["Find out what the plant needs.", "Choose a suitable place and try it in practice.", "A note, photo or reflection is optional, not a requirement."],
  },
  "mission-digitalni-kuryr":{
    title:"Digital helper",
    heading:"A possible opportunity to help an older person or neighbour with everyday digital skills.",
    description:"If this speaks to you, you might help someone nearby with a phone, an online service or digital safety. There is no expected return — sometimes the meeting itself is valuable to both people.",
    tips:["First ask whether they want help and what they actually need.","Explain calmly and leave the other person space.","If you want, you can save a short memory later — it is optional."],
  },
  "mission-uzavreny-kruh":{
    title:"Material for a school idea",
    heading:"An opportunity to use surplus material in a real school project.",
    description:"If suitable material appears, you can arrange a handover and try using it instead of buying something new.",
    tips:["Check that the material is safe for the intended use.","Let students decide what they could create from it.","A simple confirmation that the handover happened is enough."],
  },
  "mission-firemni-prebytek":{
    title:"A second life for material",
    heading:"An opportunity to pass clean production surplus to a place where it can still be useful.",
    description:"Describe the material, quantity and handover conditions. Pansofie can show relevant school or community needs — without promising that a match will always happen.",
    tips:["Describe material and quantity as precisely as useful.","Add important safety limits.","Further cooperation may grow naturally, but it is not a condition of handover."],
  },
};

const growPresentation = getGrowMissionPresentation("public");
const growCard = getGrowMissionCard();
const growMission = {
  ...growCard,
  audience: "all",
  heading: growPresentation.heading,
  description: growPresentation.description,
  tips: missionLearningSteps().map((step) => `${step.labelCs}: ${step.textCs}`),
};

export default function MissionDetail(){
  const {id}=useParams();
  const raw=id===GROW_ROUTE_ID?growMission:(LEGACY_MISSIONS[id]||LEGACY_MISSIONS["mission-digitalni-kuryr"]);
  const {state,acceptMission,completeMission}=usePansofie();
  const {isEnglish}=useLanguage();
  const item=isEnglish?{...raw,...(EN[raw.id]||{})}:raw;
  const rec=state.missions?.[raw.id]; const interested=Boolean(rec); const done=rec?.status==="completed";
  const canonical=raw.blueprintId===growCard.blueprintId;
  return <div className="ak-page"><section className="p-mission-detail r8-opportunity-detail r9-opportunity-detail">
    <Link className="p-back" to={canonical?"/green-hope":"/vize"}><ArrowLeft size={11}/> {isEnglish?"Back to inspiration":"Zpět na inspiraci"}</Link>
    <div className="p-mission-detail__hero"><div><span className="r8-eyebrow">{canonical?growPresentation.eyebrow:(isEnglish?"A possibility to act":"Podnět k akci")}</span><h1>{item.title}</h1><p>{item.heading}</p><div className="r8-opportunity-state"><span className={interested?"is-active":""}><Heart size={12}/> {isEnglish?"I'm interested":"Zajímá mě"}</span><span className={done?"is-active":""}><Check size={12}/> {isEnglish?"Happened":"Proběhlo"}</span></div></div></div>
    <div className="p-mission-copy"><h2>{isEnglish?"What it is about":"O co jde"}</h2><p>{item.description}</p><h2>{isEnglish?"If useful, these may help":"Pokud se vám hodí, může pomoct"}</h2><ul>{item.tips.map(t=><li key={t}>{t}</li>)}</ul><p className="r8-voluntary"><Sparkles size={13}/> {isEnglish?"None of this is a mandatory checklist. Adapt the idea to yourself.":"Nic z toho není povinný checklist. Záznam zkušenosti i reflexe jsou volitelné."}</p>{canonical&&<p><a href={growPresentation.goHref}>Pokračovat v Pansofie GO →</a> · <Link to={growPresentation.youngHref}>Young verze →</Link></p>}</div>
    {!interested?<button className="p-btn p-btn--green p-mission-detail__cta" onClick={()=>acceptMission(raw)}>{isEnglish?"I'm interested":"Tohle mě zajímá"}</button>:!done?<button className="p-btn p-btn--green p-mission-detail__cta" onClick={()=>completeMission(raw)}>{isEnglish?"Yes, it happened":"Ano, proběhlo to"}</button>:<div className="p-btn p-btn--outline p-mission-detail__cta">✓ {isEnglish?"Saved as happened":"Uloženo jako proběhlé"}</div>}
  </section></div>
}
