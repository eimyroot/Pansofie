"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CHECKPOINTS, MISSIONS, PROJECTS } from "../../domain/pansofie-content";
import { GROW_ROUTE_ID, getGrowMissionCard, getGrowMissionPresentation, missionLearningSteps } from "../../domain/mission-presentation";
import { PROJECT_GREEN_HOPE_GROW_001, deriveProjectProgress } from "../../domain/project-core";
import { goBadge, goIcon, goPin } from "../../domain/asset-system";
import { PansofieProvider, usePansofie } from "../../state/PansofieContext";
import { joinProjectAction, loadProjectStateAction } from "../../app/go/actions";

const NAV=[
  ["domov","Domů","home"],["mise","Mise","mission"],["mapa","Mapa","map"],["projekty","Projekty","projects"],["tymy","Týmy","teams"],["portfolio","Portfolio","portfolio"],["mentor","Mentor","mentor"],["profil","Profil","profile"],["nastaveni","Nastavení","settings"],
];
const badges=[["nature","Příroda"],["helper","Pomoc"],["learner","Učení"],["team","Tým"],["creator","Tvůrce"],["explorer","Průzkumník"]];
const missionMedia=["/assets/brand/go/mission-covers/grow-16x9.webp","/assets/brand/go/mission-covers/help-4x5.webp","/assets/brand/go/mission-covers/create-16x9.webp","/assets/brand/go/mission-covers/explore-16x9.webp"];

function Icon({src,label}){return <Image className="go2-icon" src={src} alt="" aria-hidden="true" title={label} width={44} height={44} sizes="44px"/>}
function Header({title,eyebrow="PANSOFIE GO"}){return <header className="go2-screen-head"><div><small>{eyebrow}</small><h1>{title}</h1></div><button aria-label="Upozornění"><Icon src={goIcon("notifications")}/></button></header>}

function Home({onOpenGrow}){const grow=getGrowMissionPresentation("go");return <><Header title="Ahoj, Káťo! Svět tě potřebuje."/><section className="go2-feature"><Image src="/assets/brand/go/mission-covers/grow-16x9.webp" alt="Pěstování jako mise" width={560} height={315} sizes="(max-width: 480px) 100vw, 360px" priority/><div><span>{grow.eyebrow}</span><h2>{grow.title}</h2><p>{grow.summary}</p><button onClick={onOpenGrow}>{grow.actionLabel}</button></div></section><h2 className="go2-section-title">Doporučeno pro tebe</h2><div className="go2-mini-grid">{[["nature","Příroda"],["learner","Učení"],["creator","Kreativita"]].map(([id,label])=><article key={id}><Icon src={goBadge(id)}/><b>{label}</b></article>)}</div><section className="go2-week"><div><small>TÝDENNÍ VÝZVA</small><h2>Týden pro čistší okolí</h2><p>3 z 5 kroků</p></div><div className="go2-progress"><span style={{width:"60%"}}/></div></section></>}

function GrowMission({onPortfolio}){const grow=getGrowMissionPresentation("go");const card=getGrowMissionCard();const steps=missionLearningSteps();const {state,acceptMission,completeMission,saveMissionDocumentation}=usePansofie();const record=state.missions?.[GROW_ROUTE_ID];const [evidenceNote,setEvidenceNote]=useState(record?.documentation?.evidenceNote||"");const [reflection,setReflection]=useState(record?.documentation?.reflection||"");const [saved,setSaved]=useState(false);const interested=Boolean(record);const done=record?.status==="completed";const saveOptional=()=>{saveMissionDocumentation(GROW_ROUTE_ID,{evidenceNote,reflection});setSaved(true)};return <><Header title={grow.title} eyebrow={grow.eyebrow}/><section className="go2-grow-cover"><Image src="/assets/brand/go/mission-covers/grow-16x9.webp" alt="Semínko a pěstování" width={560} height={315} sizes="(max-width: 480px) 100vw, 360px" priority/><p>{grow.summary}</p><div className="go2-grow-tags"><span>Příroda</span><span>Green Hope</span><span>Záznam volitelný</span></div></section><ol className="go2-learning-cycle">{steps.map((step,index)=><li key={step.id}><b>{String(index+1).padStart(2,"0")}</b><div><strong>{step.labelCs}</strong><p>{step.textCs}</p></div></li>)}</ol><section className="go2-grow-actions">{!interested?<button onClick={()=>acceptMission({...card,audience:"all"})}>Tohle mě zajímá</button>:!done?<button onClick={()=>completeMission({...card,audience:"all"})}>Ano, proběhlo to</button>:<><div className="go2-complete">✓ Mise je uložená jako proběhlá.</div><button className="secondary" onClick={onPortfolio}>Otevřít portfolio</button></>}</section><section className="go2-documentation"><small>VOLITELNÉ · SOUKROMÉ V TOMTO PROTOTYPU</small><h2>Chceš si zkušenost zachytit?</h2><p>Misi můžeš dokončit i bez fotografie, poznámky nebo reflexe. Pokud chceš, ulož si krátký záznam pro sebe.</p><label>Co vzniklo nebo co jsi pozoroval/a<textarea value={evidenceNote} onChange={(event)=>{setEvidenceNote(event.target.value);setSaved(false)}} rows={3}/></label><label>Co sis z toho odnesl/a<textarea value={reflection} onChange={(event)=>{setReflection(event.target.value);setSaved(false)}} rows={3}/></label><button disabled={!interested} onClick={saveOptional}>Uložit soukromý záznam</button>{saved&&<span role="status">Uloženo lokálně.</span>}</section></>}

function Missions({onOpenGrow}){return <><Header title="Mise" eyebrow="VÝZVY A ÚKOLY"/><div className="go2-filter"><button className="is-active">Aktivní</button><button>Splněné</button><button>Vše</button></div><div className="go2-list">{MISSIONS.map((m,i)=><article key={m.id}><Image src={missionMedia[i%missionMedia.length]} alt="" width={220} height={160} sizes="92px"/><div><small>{m.program} · +{m.xp} XP</small><h2>{m.title}</h2><p>{m.detail}</p></div><button aria-label={m.id===GROW_ROUTE_ID?`Otevřít ${m.title}`:`Přidat ${m.title}`} onClick={m.id===GROW_ROUTE_ID?onOpenGrow:undefined}>{m.id===GROW_ROUTE_ID?"→":"+"}</button></article>)}</div></>}

function MapScreen(){return <><Header title="Mapa" eyebrow="OBJEVUJ KOLEM SEBE"/><div className="go2-filter"><button className="is-active">Vše</button><button>Příroda</button><button>Lidé</button><button>Akce</button></div><section className="go2-map" role="img" aria-label="Orientační mapa bez přesné polohy dětí">{CHECKPOINTS.map((c,i)=><span key={c[0]} style={{left:`${15+(i%3)*32}%`,top:`${18+Math.floor(i/3)*49}%`}}><Image src={goPin(["mission","project","event","lab","mentor"][i%5])} alt="" width={42} height={42} sizes="42px"/></span>)}</section><article className="go2-map-card"><small>DEMO checkpoint</small><h2>{CHECKPOINTS[0][0]}</h2><p>{CHECKPOINTS[0][1]} · orientační lokalita</p><button>Zobrazit</button></article></>}

function Projects({onOpenGreenProject}){return <><Header title="Projekty" eyebrow="PŘIDEJ SE NEBO VYTVOŘ"/><div className="go2-projects">{PROJECTS.slice(0,5).map((p,i)=><article key={p.title}><Image src={missionMedia[(i+1)%missionMedia.length]} alt="" width={560} height={315} sizes="(max-width: 480px) 100vw, 360px"/><div><small>{p.tag}</small><h2>{p.title}</h2><p>{p.description}</p><b>{p.status}</b>{p.blueprintId===PROJECT_GREEN_HOPE_GROW_001.id&&<button className="go2-project-open" onClick={onOpenGreenProject}>Otevřít modelový projekt →</button>}</div></article>)}</div></>}

const IMPACT_LABELS={knowledge:"Poznání",skills:"Dovednosti",nature:"Příroda"};
function GreenHopeProject({onMission,onPortfolio}) {
  const project = PROJECT_GREEN_HOPE_GROW_001;
  const { state, joinProject, syncProjectParticipation } = usePansofie();
  const participation = state.projectParticipations?.[project.id];
  const progress = deriveProjectProgress(project, { [project.missionIds[0]]: state.missions?.[GROW_ROUTE_ID] });
  const [accountMode, setAccountMode] = useState("checking");
  const [accountJoined, setAccountJoined] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    let active = true;
    loadProjectStateAction(project.slug)
      .then((result) => {
        if (!active) return;
        if (result.mode === "account") {
          setAccountMode("account");
          const joined = result.participation?.status === "joined";
          setAccountJoined(joined);
          if (joined) syncProjectParticipation(project, result.participation);
          return;
        }
        if (result.mode === "local") {
          setAccountMode("local");
          return;
        }
        setAccountMode("error");
        setStatusMessage(result.message || "Projektový stav se nepodařilo načíst.");
      })
      .catch(() => {
        if (!active) return;
        setAccountMode("error");
        setStatusMessage("Projektový stav se nepodařilo načíst.");
      });
    return () => { active = false; };
  }, [project, syncProjectParticipation]);

  async function handleJoin() {
    setJoining(true);
    setStatusMessage("");
    try {
      const result = await joinProjectAction(project.slug);
      if (result.mode === "account" && result.participation) {
        syncProjectParticipation(project, result.participation);
        setAccountMode("account");
        setAccountJoined(true);
        setStatusMessage("Účast je uložená v tvém účtu.");
      } else if (result.mode === "local") {
        joinProject(project);
        setAccountMode("local");
        setStatusMessage("Účast je uložená lokálně v tomto prohlížeči.");
      } else {
        setAccountMode("error");
        setStatusMessage(result.message || "Účast se nepodařilo uložit.");
      }
    } catch {
      setAccountMode("error");
      setStatusMessage("Účast se nepodařilo uložit.");
    } finally {
      setJoining(false);
    }
  }

  const needsAccountSave = Boolean(participation) && accountMode === "account" && !accountJoined;
  const hasUsableParticipation = Boolean(participation) && !needsAccountSave;
  const storageLabel = accountJoined ? "Účast je uložená v účtu." : "Účast je uložená lokálně v tomto prohlížeči.";

  return <>
    <Header title={project.titleCs} eyebrow="GREEN HOPE · MODELOVÝ PROJEKT"/>
    <section className="go2-project-core">
      <Image src="/assets/brand/go/mission-covers/grow-16x9.webp" alt="Pěstování v modelovém Green Hope projektu" width={560} height={315} sizes="(max-width: 480px) 100vw, 360px" priority/>
      <div><p>{project.summaryCs}</p><div className="go2-grow-tags"><span>Model projektu</span><span>Bez přesné polohy</span><span>Záznam volitelný</span></div></div>
    </section>
    <section className="go2-project-progress">
      <small>PRVNÍ VERTIKÁLNÍ PROJEKTOVÝ FLOW</small>
      <h2>{progress.completed} / {progress.total} mise proběhla</h2>
      <div className="go2-progress"><span style={{width:`${progress.total?progress.completed/progress.total*100:0}%`}}/></div>
      <article><div><b>01</b><span><strong>Vypěstuj první rostlinu</strong><small>{progress.isComplete?"První krok proběhl":"První konkrétní krok projektu"}</small></span></div><button onClick={onMission}>{progress.isComplete?"Otevřít záznam":"Pokračovat misí"}</button></article>
    </section>
    <section className="go2-project-impact">
      <small>DIMENZE, KTERÉ PROJEKT MŮŽE SLEDOVAT</small>
      <h2>Dopad bez kouzelného skóre</h2>
      <p>Toto nejsou dosažené výsledky. Jsou to oblasti, ve kterých může projekt později ukládat jednotlivá doložená pozorování.</p>
      <div>{project.impactDimensionIds.map(id=><span key={id}>{IMPACT_LABELS[id]||id}</span>)}</div>
    </section>
    <section className="go2-project-join">
      {!hasUsableParticipation ? <>
        <h2>{needsAccountSave ? "Uložit účast do účtu" : "Přidat se k modelovému projektu"}</h2>
        <p>Projekt nevyžaduje přesnou polohu ani povinné důkazy. Přihlášenému uživateli se účast ukládá do účtu, jinak zůstává lokálně v tomto prohlížeči.</p>
        <button disabled={joining || accountMode === "checking"} onClick={handleJoin}>{joining ? "Ukládám…" : needsAccountSave ? "Uložit do účtu" : accountMode === "checking" ? "Ověřuji účet…" : "Přidat se"}</button>
      </> : <>
        <div className="go2-complete">✓ Projekt máš uložený mezi svými.</div>
        <p>{storageLabel}</p>
        {progress.isComplete?<button onClick={onPortfolio}>Otevřít portfolio</button>:<button onClick={onMission}>Udělat první krok</button>}
      </>}
      {statusMessage && <span role="status">{statusMessage}</span>}
    </section>
  </>;
}

function Teams(){return <><Header title="Týmy" eyebrow="SPOLUPRÁCE"/><section className="go2-callout"><Icon src={goIcon("teams")}/><h2>Family Team</h2><p>Rodina může sdílet mise a projekty, ale každý má vlastní soukromý prostor a odpovídající oprávnění.</p><button>Vytvořit tým</button></section><div className="go2-team-list">{["Rodina Novákových","Green Hope Praha · DEMO","Školní tým · DEMO"].map((n,i)=><article key={n}><span>{n[0]}</span><div><h2>{n}</h2><p>{i?"Modelový tým":"3 členové · 2 společné mise"}</p></div><button>→</button></article>)}</div></>}

function Portfolio(){const {state}=usePansofie();const grow=state.missions?.[GROW_ROUTE_ID];const docs=grow?.documentation;return <><Header title="Moje portfolio" eyebrow="EVIDENCE · REFLEXE · RŮST"/>{grow?.status==="completed"&&<article className="go2-portfolio-entry"><small>GREEN HOPE · PŘÍRODA</small><h2>{grow.title}</h2><p>Skutečný lokální záznam z prvního vertikálního flow.</p><div><span>✓ proběhlo</span><span>{docs?.evidenceNote?"✓ poznámka":"bez poznámky"}</span><span>{docs?.reflection?"✓ reflexe":"bez reflexe"}</span></div>{docs?.evidenceNote&&<blockquote>{docs.evidenceNote}</blockquote>}{docs?.reflection&&<p><b>Reflexe:</b> {docs.reflection}</p>}</article>}<section className="go2-portfolio-hero"><strong>Level 5</strong><span>850 / 1 000 XP</span><div className="go2-progress"><span style={{width:"85%"}}/></div></section><div className="go2-evidence-grid">{[["camera","Foto"],["upload","Výstup"],["reflection","Reflexe"],["verified","Ověřený krok"]].map(([id,label])=><article key={id}><Icon src={goIcon(id)}/><b>{label}</b></article>)}</div><h2 className="go2-section-title">Mé odznaky</h2><div className="go2-badges">{badges.map(([id,label])=><article key={id}><Icon src={goBadge(id)}/><span>{label}</span></article>)}</div><p className="go2-note">XP a odznaky popisují herní postup a zkušenosti. Nejsou veřejným skóre člověka. Záznam první mise je v tomto prototypu uložen jen lokálně v prohlížeči.</p></>}

function Mentor(){return <><Header title="Mentor" eyebrow="AI / ČLOVĚK PRŮVODCE"/><section className="go2-mentor"><div className="go2-avatar">AI</div><h2>Ahoj Káťo! Co chceš dnes posunout?</h2><p>Průvodce pomáhá hledat další krok. Nenahrazuje rodiče, pedagoga ani odbornou pomoc.</p>{["Chci se něco naučit","Potřebuji radu k projektu","Mám nápad","Chci reflektovat misi"].map(x=><button key={x}>{x}<span>→</span></button>)}<label><span>Napiš otázku…</span><input aria-label="Otázka pro mentora"/></label></section></>}

function Profile(){return <><Header title="Profil" eyebrow="TVOJE CESTA A ÚSPĚCHY"/><section className="go2-profile"><div className="go2-avatar go2-avatar--photo">K</div><h2>Káťa</h2><p>@kacenovakova</p><div><span><strong>5</strong> projektů</span><span><strong>28</strong> odznaků</span><span><strong>120</strong> hodin</span></div></section><section className="go2-callout"><h2>Můj příběh</h2><p>Miluju přírodu, tvorbu a projekty, které mají konkrétní smysl.</p></section></>}

function Settings(){return <><Header title="Nastavení" eyebrow="BEZPEČÍ A PŘIZPŮSOBENÍ"/><div className="go2-settings">{[["profile","Můj účet"],["verified","Soukromí a bezpečí"],["teams","Rodinný režim"],["notifications","Upozornění"],["settings","Vzhled a jazyk"],["mentor","Nápověda"]].map(([id,label])=><button key={label}><Icon src={goIcon(id)}/><span>{label}</span><b>›</b></button>)}</div><section className="go2-safety"><Icon src={goIcon("verified")}/><div><h2>Bezpečné prostředí na prvním místě</h2><p>Žádná přesná poloha dítěte a žádný přímý kontakt dítěte s neznámým dospělým.</p></div></section></>}

function GoWorkspaceInner({view="domov"}){const router=useRouter();const special=["mise-grow","projekt-green-grow"].includes(view);const valid=special?view:(NAV.some(([id])=>id===view)?view:"domov");const screen=useMemo(()=>valid,[valid]);const navigate=id=>router.push(id==="domov"?"/go":`/go/${id}`);const openGrow=()=>navigate("mise-grow");const openGreenProject=()=>navigate("projekt-green-grow");const content=screen==="domov"?<Home onOpenGrow={openGrow}/>:screen==="mise-grow"?<GrowMission onPortfolio={()=>navigate("portfolio")}/>:screen==="projekt-green-grow"?<GreenHopeProject onMission={openGrow} onPortfolio={()=>navigate("portfolio")}/>:screen==="mise"?<Missions onOpenGrow={openGrow}/>:screen==="mapa"?<MapScreen/>:screen==="projekty"?<Projects onOpenGreenProject={openGreenProject}/>:screen==="tymy"?<Teams/>:screen==="portfolio"?<Portfolio/>:screen==="mentor"?<Mentor/>:screen==="profil"?<Profile/>:<Settings/>;return <div className="go2-stage"><aside className="go2-desktop-note"><b>PANSOFIE GO</b><h2>Akce patří do kapsy.</h2><p>Mobile-first rozhraní pro mise, mapu, projekty, týmy, portfolio a průvodce.</p><nav className="go2-all-nav" aria-label="Všechny obrazovky Pansofie GO">{NAV.map(([id,label])=><button key={id} className={screen===id?"is-active":""} onClick={()=>navigate(id)}>{label}</button>)}</nav><a href="/">← Pansofie</a><a href="/green-hope">Green Hope →</a><a href="/young">Pansofie Young →</a></aside><main className="go2-phone"><div className="go2-status"><span>9:41</span><strong>PANSOFIE GO</strong><span>● ● ●</span></div><div className="go2-content">{content}</div><nav className="go2-dock" aria-label="Pansofie GO navigace">{NAV.map(([id,label,icon])=><button key={id} className={screen===id?"is-active":""} aria-label={label} aria-current={screen===id?"page":undefined} onClick={()=>navigate(id)}><Icon src={goIcon(icon)}/><span>{label}</span></button>)}</nav></main></div>}

export default function GoWorkspace(props){return <PansofieProvider><GoWorkspaceInner {...props}/></PansofieProvider>}
