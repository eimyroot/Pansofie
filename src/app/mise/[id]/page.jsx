import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "../../../components/public/PublicShell";
import { MISSIONS as LEGACY_MISSIONS } from "../../../lib/missions";
import { GROW_ROUTE_ID, getGrowMissionCard, getGrowMissionPresentation, missionLearningSteps } from "../../../domain/mission-presentation";

const grow = getGrowMissionPresentation("public");
const growCard = getGrowMissionCard();
const growMission = {
  id: GROW_ROUTE_ID,
  title: grow.title,
  heading: grow.heading,
  description: grow.description,
  tips: missionLearningSteps().map(step => `${step.labelCs}: ${step.textCs}`),
  canonical: true,
};

function resolveMission(id){
  if(id === GROW_ROUTE_ID) return growMission;
  const legacy = LEGACY_MISSIONS[id];
  return legacy ? { ...legacy, canonical: false } : null;
}

export async function generateMetadata({ params }){
  const { id } = await params;
  const mission = resolveMission(id);
  return mission
    ? { title: `${mission.title} · Mise`, description: mission.description }
    : { title: "Mise", robots: { index: false, follow: false } };
}
export default async function MissionPage({ params }){
  const { id } = await params;
  const mission = resolveMission(id);
  if(!mission) notFound();
  return <PublicShell>
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">{mission.canonical ? grow.eyebrow : "PODNĚT K AKCI"}</p><h1>{mission.title}</h1><p>{mission.heading}</p></div>
      <div className="pw-legal-mark pw-legal-mark--mission" aria-hidden="true"><span>MISE</span><strong>{mission.canonical ? growCard.blueprintId : "PROTOTYP"}</strong><small>{mission.canonical ? "CANONICAL FLOW" : "INSPIRAČNÍ PODNĚT"}</small></div>
    </section>
    <section className="pw-story-intro"><div><p className="pw-eyebrow">O CO JDE</p><h2>Malý krok, který lze přizpůsobit situaci.</h2></div><div><p>{mission.description}</p><small>Evidence ani reflexe nejsou povinnou vstupenkou k účasti. Bohatší dokumentace dává smysl až tehdy, když chce člověk zkušenost doložit v portfoliu.</small></div></section>
    <section className="pw-story-sequence"><div><p className="pw-eyebrow">POKUD SE HODÍ</p><h2>Několik opěrných bodů, ne povinný checklist.</h2></div><ol>{mission.tips.map((tip,index)=><li key={tip}><span>{String(index+1).padStart(2,"0")}</span><strong>{tip}</strong></li>)}</ol></section>
    <section className="pw-next"><div><p className="pw-eyebrow">DALŠÍ KROK</p><h2>{mission.canonical ? "Akční flow pokračuje v Pansofie GO." : "Podnět může zůstat jen inspirací."}</h2><p>{mission.canonical ? "GO umí misi převzít do skutečného akčního průchodu." : "Není nutné nic potvrzovat ani ukládat."}</p></div>{mission.canonical ? <Link className="pw-button pw-button--dark" href={grow.goHref}>Pokračovat v GO</Link> : <Link className="pw-button pw-button--dark" href="/vize">Zpět k možnostem</Link>}</section>
  </PublicShell>;
}
