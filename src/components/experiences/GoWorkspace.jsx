"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CHECKPOINTS, MISSIONS, PROJECTS } from "../../domain/pansofie-content";
import { distanceKm } from "../../lib/metabolism";
import { GROW_ROUTE_ID, getGrowMissionPresentation, missionLearningSteps } from "../../domain/mission-presentation";
import { PROJECT_GREEN_HOPE_GROW_001 } from "../../domain/project-core";
import { MISSION_GROW_001 } from "../../domain/learning-core";
import { goBadge, goIcon, goPin } from "../../domain/asset-system";
import { completeMissionAction, joinProjectAction, loadMissionStateAction, loadProjectStateAction, recordGrowSkillImpactAction, saveMissionDocumentationAction, startMissionAction } from "../../app/go/actions";

const NAV=[
  ["domov","Domů","home"],["mise","Mise","mission"],["mapa","Mapa","map"],["projekty","Projekty","projects"],["tymy","Týmy","teams"],["portfolio","Portfolio","portfolio"],["mentor","Mentor","mentor"],["profil","Profil","profile"],["nastaveni","Nastavení","settings"],
];
const GO_VISUAL_BOARDS=Object.freeze({
  "moje-cesta":{label:"Moje cesta",eyebrow:"ORIENTACE V ČASE",title:"Vidět zkušenosti jako cestu, ne jako skóre.",lead:"Mise, projekty, portfolio a reflexe se skládají do soukromé mapy toho, co člověk opravdu zkusil.",items:[["Teď","Co je rozpracované a dává smysl dokončit."],["Dřív","Konkrétní zkušenosti a výstupy v portfoliu."],["Dál","Možné další kroky bez povinného žebříčku."]]},
  "moje-projekty":{label:"Moje projekty",eyebrow:"AKTIVNÍ KONTEXT",title:"Projekty, do kterých účet skutečně patří.",lead:"Oddělený pohled na vlastní projektovou práci bez míchání modelových katalogů se skutečným členstvím.",items:[["Aktivní","Projekty s platnou účastí tohoto účtu."],["Role","Kontext a oprávnění místo sdíleného hesla."],["Výstupy","Mise, evidence a portfolio navázané na projekt."]]},
  impact:{label:"Impact",eyebrow:"DOLOŽENÁ ZMĚNA",title:"Dopad bez kouzelného indexu člověka.",lead:"Jednotlivá pozorování mají zdroj, kontext a dimenzi. Bez důkazu nevzniká automatické tvrzení o dopadu.",items:[["Výstup","Co se opravdu stalo nebo vzniklo."],["Pozorování","Co lze doložit konkrétní evidencí."],["Interpretace","Jen tolik, kolik podklady skutečně unesou."]]},
  matching:{label:"Matching",eyebrow:"POTŘEBA ↔ KAPACITA",title:"Párovat projekty a zdroje, ne lidi naslepo.",lead:"Matching propojuje ověřenou potřebu s nabídkou materiálu, znalosti nebo kapacity. U Young nikdy nevytváří veřejné hledání dětí v okolí.",items:[["Potřeba","Projekt nebo organizace popíše konkrétní potřebu."],["Nabídka","Partner nabídne materiál, know-how nebo kapacitu."],["Rozhodnutí","Výsledek vždy potvrzuje člověk s oprávněním."]]},
  sit:{label:"Síť",eyebrow:"KONTEXTY SPOLUPRÁCE",title:"Síť vztahů kolem skutečné práce.",lead:"Člověk, rodina, tým, škola, organizace a komunita se propojují přes role a projekty, ne přes veřejný katalog osob.",items:[["Lidé","Viditelnost podle role a oprávnění."],["Místa","Projekty a instituce místo domácích adres."],["Vazby","Členství a ověřené vztahy místo náhodných kontaktů."]]},
  checkpointy:{label:"Checkpointy",eyebrow:"MÍSTA A MILNÍKY",title:"Bezpečný bod na mapě nebo v projektu.",lead:"Checkpoint může být veřejné místo, instituce, aktivita nebo projektový milník. Přesná poloha dítěte sem nepatří.",items:[["Místo","Škola, zahrada, dílna nebo veřejný prostor."],["Úkol","Konkrétní bezpečná zkušenost v kontextu."],["Potvrzení","Volitelný záznam bez povinného veřejného důkazu."]]},
  labs:{label:"Labs",eyebrow:"POKUSY V PRAXI",title:"Místo, kde lze bezpečně něco zkusit.",lead:"Green Hope, Urban Family Farm a další laboratoře převádějí otázku do pokusu, pozorování a tvorby.",items:[["Green Hope","Příroda, péče a konkrétní místo."],["Urban Family Farm","Pěstování, práce, hodnota a ekonomika."],["Další lab","Nové prototypy zůstávají označené jako prototypy."]]},
  evidence:{label:"Evidence",eyebrow:"DŮKAZ ZKUŠENOSTI",title:"Doklad je nástroj, ne vstupenka k účasti.",lead:"Fotografie, poznámka nebo jiný výstup mohou doložit zkušenost. Pro běžnou účast zůstávají dobrovolné.",items:[["Soukromě","Výchozí viditelnost patří účtu."],["Konkrétně","Důkaz se váže ke konkrétní misi nebo projektu."],["Volitelně","Bez evidence lze běžnou misi stále dokončit."]]},
  reflexe:{label:"Reflexe",eyebrow:"CO SI ODNÁŠÍM",title:"Zachytit význam zkušenosti vlastními slovy.",lead:"Reflexe pomáhá spojit událost s učením. Není povinným formulářem ani psychologickým testem.",items:[["Co se stalo","Krátké pojmenování zkušenosti."],["Co jsem zjistil/a","Vlastní interpretace bez automatického hodnocení."],["Co dál","Dobrovolný další krok."]]},
  xp:{label:"XP",eyebrow:"HERNÍ POSTUP",title:"XP ukazuje pohyb ve hře, ne hodnotu člověka.",lead:"Herní signál může zpříjemnit orientaci a oslavu aktivity, ale nesmí se vydávat za kompetenci, peníze nebo reputaci.",items:[["Postup","Lehký herní feedback."],["Bez žebříčku","Žádné veřejné pořadí lidí."],["Odděleně","Dovednost a impact potřebují vlastní důkaz."]]},
  odznaky:{label:"Odznaky",eyebrow:"MOMENT UZNÁNÍ",title:"Oslavit konkrétní zkušenost bez nálepkování člověka.",lead:"Odznak připomíná událost, spolupráci nebo výstup. Není certifikací osobnosti ani automatickým titulem.",items:[["Zkušenost","Za konkrétní proběhlou věc."],["Spolupráce","Za týmový moment bez soutěže o lidskou hodnotu."],["Soukromí","Viditelnost se řídí kontextem účtu."]]},
  notifikace:{label:"Notifikace",eyebrow:"CO POTŘEBUJE POZORNOST",title:"Méně hluku, více relevantních signálů.",lead:"Upozornění mají připomenout skutečný krok, změnu v projektu nebo bezpečnostní událost. Ne vytvářet nekonečný engagement feed.",items:[["Mise","Termín nebo změna rozpracované práce."],["Projekt","Událost v projektu, kterého je účet členem."],["Bezpečí","Oprávnění, souhlasy a důležité změny vztahů."]]},
  soukromi:{label:"Privacy",eyebrow:"SOUKROMÍ JAKO VÝCHOZÍ STAV",title:"Viditelnost se volí podle účelu a kontextu.",lead:"Portfolio, evidence, poloha a profil nejsou veřejné jen proto, že existují.",items:[["Profil","Minimum nutných osobních údajů."],["Evidence","Soukromá, dokud není důvod ji sdílet."],["Poloha","Bez přesné veřejné polohy dítěte."]]},
  opravneni:{label:"Permissions",eyebrow:"KDO SMÍ CO VIDĚT",title:"Role a vztahy rozhodují o přístupu.",lead:"Frontendový režim není autorizace. Přístup vychází z účtu, členství, ověřených vztahů a databázových pravidel.",items:[["Členství","Aktivní role v organizaci nebo týmu."],["Rodina","Ověřený vztah dítě–průvodce."],["Data","Least privilege podle konkrétního účelu."]]},
  "family-team":{label:"Family Team",eyebrow:"RODINA JAKO TÝM",title:"Společná práce bez společného hesla.",lead:"Rodinný kontext propojuje mise a projekty, ale každý člen zůstává vlastní identitou s přiměřeným soukromím.",items:[["Role","Plánovat, tvořit, pečovat, realizovat."],["Generace","Učení může proudit oběma směry."],["Soukromí","Sdílí se kontext, ne celý účet."]]},
  "school-class":{label:"School / Class",eyebrow:"ŠKOLA A TŘÍDA",title:"Třída jako bezpečný projektový kontext.",lead:"Učitel, žáci a další pedagogové pracují v rolích. Young zkušenost se přizpůsobí věku, oprávnění zůstávají serverová.",items:[["Třída","Skupina s jasným správcem a členstvím."],["Projekt","Mezioborová práce nad skutečnou situací."],["Pedagog","Průvodce a správce kontextu, ne majitel identity dítěte."]]},
  partner:{label:"Partner",eyebrow:"ORGANIZACE V EKOSYSTÉMU",title:"Partner přináší kapacitu, místo nebo znalost.",lead:"Organizace může vstoupit do projektu s konkrétní rolí. Demo organizace se nesmí tvářit jako ověřené partnerství.",items:[["Nabídka","Materiál, know-how, prostor nebo čas."],["Projekt","Vazba na konkrétní potřebu a oprávnění."],["Dopad","Tvrzení jen z doložených výsledků."]]},
  admin:{label:"Admin",eyebrow:"SPRÁVA S ODPOVĚDNOSTÍ",title:"Administrace bez všemocného pohledu na člověka.",lead:"Správce řídí pouze kontexty a data, ke kterým má oprávnění. Citlivá data dětí zůstávají pod least-privilege pravidly.",items:[["Role","Členství, oprávnění a kontexty."],["Moderace","Projekty, obsah a bezpečnostní zásahy."],["Audit","Dohledatelnost změn bez veřejného profilování."]]},
  "system-states":{label:"Systémové stavy",eyebrow:"LOADING · EMPTY · ERROR · LOCKED",title:"I když něco chybí nebo selže, obrazovka musí dávat smysl.",lead:"Vizuální systém počítá s načítáním, prázdným stavem, chybou, zamčeným přístupem, permission denied i onboardingem.",items:[["Prázdno","Vysvětlení a jeden bezpečný další krok."],["Chyba","Co se stalo, co zůstalo zachováno a co lze zkusit."],["Zamčeno","Důvod omezení bez prozrazení citlivých dat."]]}
});
const GO_VISUAL_SCENES=Object.freeze({
  evidence:"/assets/brand/go/scenes/evidence-context.svg",
  reflexe:"/assets/brand/go/scenes/reflection-context.svg",
  matching:"/assets/brand/go/scenes/matching-context.svg",
  checkpointy:"/assets/brand/go/scenes/checkpoints-context.svg",
  labs:"/assets/brand/go/scenes/labs-context.svg",
});

function Icon({src,label}){return <Image className="go2-icon" src={src} alt="" aria-hidden="true" title={label} width={44} height={44} sizes="44px"/>}
function Header({title,eyebrow="PANSOFIE GO"}){return <header className="go2-screen-head"><div><small>{eyebrow}</small><h1>{title}</h1></div><button aria-label="Upozornění"><Icon src={goIcon("notifications")}/></button></header>}

function resolveNextActionMedia(account){
  const firstMission=account?.activeMissions?.[0];
  const firstProject=account?.activeProjects?.find((project)=>!project.progress?.isComplete)||account?.activeProjects?.[0];
  if(firstMission){
    const mission=MISSIONS.find((item)=>item.title===firstMission.title);
    return {src:mission?.image||"/assets/brand/go/scenes/mission-discovery.svg",alt:mission?`Kontext mise ${mission.title}`:"Výběr další mise"};
  }
  if(firstProject){
    const project=PROJECTS.find((item)=>item.title===firstProject.title);
    return {src:project?.image||"/assets/brand/go/scenes/mission-discovery.svg",alt:project?`Kontext projektu ${project.title}`:"Výběr dalšího projektu"};
  }
  return {src:"/assets/brand/go/scenes/mission-discovery.svg",alt:"Výběr konkrétní mise jako dalšího kroku"};
}

function Home({onNavigate,displayName,account}){
  const grow=getGrowMissionPresentation("go");
  const firstMission=account?.activeMissions?.[0];
  const firstProject=account?.activeProjects?.[0];
  const nextAction=account?.nextAction||{label:"Vybrat první misi",href:"/go/mise"};
  const nextMedia=resolveNextActionMedia(account);
  const openHref=(href)=>{
    if(href==="/go/mise-grow") return onNavigate("mise-grow");
    if(href==="/go/projekt-green-grow") return onNavigate("projekt-green-grow");
    if(href==="/go/mise") return onNavigate("mise");
    if(href==="/go/projekty") return onNavigate("projekty");
    if(href==="/go/portfolio") return onNavigate("portfolio");
    onNavigate("domov");
  };
  return <>
    <Header title={`Ahoj, ${displayName}. Co můžeš objevit kolem sebe?`}/>
    <section className="go2-feature go2-location-entry">
      <Image className="is-scene" src="/assets/brand/go/scenes/mission-discovery.svg" alt="Mapa Pansofie GO propojuje místa, checkpointy a mise" width={560} height={315} sizes="(max-width: 480px) 100vw, 360px" priority/>
      <div><span>MAPA · MISE · MÍSTA</span><h2>Začni tím, co je kolem tebe.</h2><p>GO je location-based hra. Poloha se zapíná až na mapě po tvém kliknutí; bez ní můžeš dál procházet modelové checkpointy a mise.</p><button onClick={()=>onNavigate("mapa")}>Otevřít mapu</button></div>
    </section>
    <section className="go2-feature go2-next-action">
      <Image className={nextMedia.src.endsWith(".svg")?"is-scene":""} src={nextMedia.src} alt={nextMedia.alt} width={560} height={315} sizes="(max-width: 480px) 100vw, 360px" priority/>
      <div><span>DALŠÍ BEZPEČNÝ KROK</span><h2>{nextAction.label}</h2><p>{firstMission?`Aktivní mise: ${firstMission.title}`:firstProject?`Aktivní projekt: ${firstProject.title}`:"Vyber si konkrétní misi. Záznam a reflexe zůstávají dobrovolné."}</p><button onClick={()=>openHref(nextAction.href)}>{nextAction.label}</button></div>
    </section>
    <section className="go2-work-summary" aria-label="Moje rozpracovaná práce">
      <article><small>AKTIVNÍ MISE</small><strong>{account?.activeMissions?.length||0}</strong><p>{firstMission?.title||"Žádná rozpracovaná mise"}</p><button onClick={()=>onNavigate(firstMission?.href==="/go/mise-grow"?"mise-grow":"mise")}>Otevřít mise</button></article>
      <article><small>AKTIVNÍ PROJEKTY</small><strong>{account?.activeProjects?.length||0}</strong><p>{firstProject?.title||"Žádný aktivní projekt"}</p><button onClick={()=>onNavigate(firstProject?.href==="/go/projekt-green-grow"?"projekt-green-grow":"projekty")}>Otevřít projekty</button></article>
      <article><small>PORTFOLIO</small><strong>{account?.portfolioCount||0}</strong><p>Soukromé položky a zkušenosti v účtu.</p><button onClick={()=>onNavigate("portfolio")}>Otevřít portfolio</button></article>
    </section>
    <h2 className="go2-section-title">Poslední aktivita</h2>
    <section className="go2-activity-list">
      {account?.recentActivity?.length?account.recentActivity.map(item=><article key={item.id}><Icon src={goIcon("reflection")}/><div><b>{item.title}</b><small>{item.programId||"Pansofie GO"}</small></div></article>):<article className="go2-empty"><Icon src={goIcon("mission")}/><div><b>Zatím bez uložené zkušenosti</b><small>Až něco opravdu proběhne, může se to objevit tady.</small></div></article>}
    </section>
    <p className="go2-note">GO ukazuje práci z tvého účtu. XP ani herní prvky nejsou měřítkem kompetence nebo hodnoty člověka.</p>
  </>;
}

function GrowMission({onPortfolio}) {
  const grow=getGrowMissionPresentation("go");
  const steps=missionLearningSteps();
  const router=useRouter();
  const [missionState,setMissionState]=useState(null);
  const [evidenceNote,setEvidenceNote]=useState("");
  const [reflection,setReflection]=useState("");
  const [statusMessage,setStatusMessage]=useState("");
  const [busy,setBusy]=useState(false);

  useEffect(()=>{
    let active=true;
    loadMissionStateAction(MISSION_GROW_001.slug).then((result)=>{
      if(!active) return;
      if(result.mode==="account") {
        setMissionState(result.state);
        setEvidenceNote(result.state?.evidenceNote||"");
        setReflection(result.state?.reflection||"");
      } else setStatusMessage(result.message||"Stav mise se nepodařilo načíst.");
    }).catch(()=>active&&setStatusMessage("Stav mise se nepodařilo načíst."));
    return()=>{active=false};
  },[]);

  const interested=Boolean(missionState?.run);
  const done=missionState?.run?.status==="completed";
  const skillImpact=missionState?.skillImpact;
  const hasEvidence=Boolean(evidenceNote.trim());
  const attested=Boolean(skillImpact?.attestation);
  const observed=Boolean(skillImpact?.impact);
  const applyResult=(result)=>{
    if(result.mode!=="account") { setStatusMessage(result.message||"Změnu se nepodařilo uložit."); return false; }
    setMissionState(result.state);
    setEvidenceNote(result.state?.evidenceNote||"");
    setReflection(result.state?.reflection||"");
    router.refresh();
    return true;
  };
  const runAction=async(action,success)=>{
    setBusy(true); setStatusMessage("");
    try { const result=await action(MISSION_GROW_001.slug); if(applyResult(result)) setStatusMessage(success); }
    catch { setStatusMessage("Změnu se nepodařilo uložit."); }
    finally { setBusy(false); }
  };
  const saveOptional=async()=>{
    setBusy(true); setStatusMessage("");
    try {
      const result=await saveMissionDocumentationAction(MISSION_GROW_001.slug,{evidenceNote,reflection});
      if(applyResult(result)) setStatusMessage("Soukromý záznam je uložený v účtu.");
    } catch { setStatusMessage("Soukromý záznam se nepodařilo uložit."); }
    finally { setBusy(false); }
  };
  const recordSkillImpact=async()=>{
    setBusy(true); setStatusMessage("");
    try {
      const result=await recordGrowSkillImpactAction(MISSION_GROW_001.slug);
      if(applyResult(result)) setStatusMessage("Záznam je použitý jako důkaz dovednosti a doložené pozorování v dimenzi Příroda.");
    } catch { setStatusMessage("Doložení se nepodařilo uložit."); }
    finally { setBusy(false); }
  };

  return <>
    <Header title={grow.title} eyebrow={grow.eyebrow}/>
    <section className="go2-grow-cover">
      <Image src="/assets/brand/go/mission-covers/grow-16x9.webp" alt="Semínko a pěstování" width={560} height={315} sizes="(max-width: 480px) 100vw, 360px" priority/>
      <div className="go2-mission-badge"><Icon src={goBadge("nature")}/><span>Příroda</span></div>
      <p>{grow.summary}</p>
      <div className="go2-grow-tags"><span>Příroda</span><span>Green Hope</span><span>Záznam volitelný</span></div>
    </section>
    <ol className="go2-learning-cycle">{steps.map((step,index)=><li key={step.id}><b>{String(index+1).padStart(2,"0")}</b><div><strong>{step.labelCs}</strong><p>{step.textCs}</p></div></li>)}</ol>
    <section className="go2-grow-actions">
      {!interested?<button disabled={busy} onClick={()=>runAction(startMissionAction,"Mise je uložená mezi rozpracovanými.")}>{busy?"Ukládám…":"Tohle mě zajímá"}</button>:!done?<button disabled={busy} onClick={()=>runAction(completeMissionAction,"Mise je uložená jako proběhlá.")}>{busy?"Ukládám…":"Ano, proběhlo to"}</button>:<><div className="go2-complete">✓ Mise je uložená jako proběhlá v účtu.</div>{missionState?.portfolio&&<p className="go2-account-note">Soukromá položka portfolia vznikla z dokončené mise. Důkaz ani reflexe nejsou podmínkou dokončení.</p>}<button className="secondary" onClick={onPortfolio}>Otevřít portfolio</button></>}
    </section>
    <section className="go2-documentation">
      <small>VOLITELNÉ · SOUKROMÉ V ÚČTU</small>
      <h2>Chceš si zkušenost zachytit?</h2>
      <p>Misi můžeš dokončit i bez fotografie, poznámky nebo reflexe. Záznam se ukládá jen do tvého účtu.</p>
      <label>Co vzniklo nebo co jsi pozoroval/a<textarea maxLength={2000} value={evidenceNote} onChange={(event)=>setEvidenceNote(event.target.value)} rows={3}/></label>
      <label>Co sis z toho odnesl/a<textarea maxLength={2000} value={reflection} onChange={(event)=>setReflection(event.target.value)} rows={3}/></label>
      <button disabled={!interested||busy} onClick={saveOptional}>{busy?"Ukládám…":"Uložit soukromý záznam"}</button>
    </section>
    <section className="go2-skill-impact" aria-label="Doložená dovednost a pozorování dopadu">
      <small>DŮKAZ JE VOLITELNÝ · ŽÁDNÉ PERSON SCORE</small>
      <h2>Ekologické myšlení</h2>
      {!done?<p>Nejdřív nech misi skutečně proběhnout. Samotné otevření mise není důkaz dovednosti.</p>:!hasEvidence?<p>Mise je dokončená. Pokud chceš dovednost doložit, ulož konkrétní pozorování výše. Reflexe zůstává dobrovolná.</p>:attested&&observed?<div className="go2-skill-proof"><div><b>✓ Sebedoložení · úroveň 1</b><span>Ekologické myšlení je navázané na tvůj konkrétní záznam, ne na XP.</span></div><div><b>✓ Příroda · doložené pozorování</b><span>Je uložené jedno evidence-backed pozorování. Není to tvrzení, že byl změřen ekologický efekt.</span></div></div>:<><p>Tvůj uložený záznam lze použít jako podklad pro sebedoložení základní dovednosti a jedno pozorování v dimenzi Příroda.</p><button disabled={busy} onClick={recordSkillImpact}>{busy?"Ukládám…":"Použít tento záznam jako důkaz"}</button></>}
      <p className="go2-account-note">Sebedoložení není certifikace ani hodnocení člověka. Doložené pozorování neznamená automaticky prokázaný environmentální dopad.</p>
    </section>
    {statusMessage&&<p className="go2-status-message" role="status">{statusMessage}</p>}
  </>;
}

function Missions({onOpenGrow,account}) {
  const active=account?.activeMissions||[];
  const completed=account?.completedMissions||[];
  const growActive=active.find((item)=>item.slug===MISSION_GROW_001.slug);
  const growCompleted=completed.find((item)=>item.slug===MISSION_GROW_001.slug);
  return <><Header title="Mise" eyebrow="MOJE PRÁCE · CANONICAL MISE"/>
    <h2 className="go2-section-title">Rozpracované</h2>
    <div className="go2-account-list">{active.length?active.map(item=><article key={item.id}><div><small>ÚČET · {item.status==="submitted"?"odesláno":"rozpracováno"}</small><h2>{item.title}</h2><p>{item.programId||"Pansofie GO"}</p></div><button onClick={item.slug===MISSION_GROW_001.slug?onOpenGrow:undefined} disabled={item.slug!==MISSION_GROW_001.slug}>{item.slug===MISSION_GROW_001.slug?"Pokračovat":"Detail připravujeme"}</button></article>):<article className="go2-empty-card"><h2>Žádná rozpracovaná mise</h2><p>Vyber si konkrétní krok. Důkaz ani reflexe nejsou podmínkou účasti.</p></article>}</div>
    <h2 className="go2-section-title">Dokončené</h2>
    <div className="go2-account-list">{completed.length?completed.map(item=><article key={item.id}><div><small>ÚČET · PROBĚHLO</small><h2>{item.title}</h2><p>{item.programId||"Pansofie GO"}</p></div><button onClick={item.slug===MISSION_GROW_001.slug?onOpenGrow:undefined} disabled={item.slug!==MISSION_GROW_001.slug}>{item.slug===MISSION_GROW_001.slug?"Otevřít záznam":"Detail připravujeme"}</button></article>):<article className="go2-empty-card"><h2>Zatím bez dokončených misí</h2><p>Dokončení se ukládá do účtu jako konkrétní zkušenost, ne jako skóre člověka.</p></article>}</div>
    <h2 className="go2-section-title">Katalog</h2>
    <div className="go2-list">{MISSIONS.map((m,i)=>{const isGrow=m.id===GROW_ROUTE_ID;const status=isGrow?(growCompleted?"Dokončeno":growActive?"Rozpracováno":"Dostupné"):"Návrh mise";return <article key={m.id}><Image className={m.image?.endsWith(".svg") ? "is-scene" : ""} src={m.thumbnailImage || m.image || "/assets/brand/go/mission-covers/grow-16x9.webp"} alt="" width={220} height={160} sizes="92px"/><div><small>{m.program} · {status}</small><h2>{m.title}</h2><p>{m.detail}</p></div><button aria-label={isGrow?`Otevřít ${m.title}`:`${m.title} zatím není aktivní`} onClick={isGrow?onOpenGrow:undefined} disabled={!isGrow}>{isGrow?"→":"·"}</button></article>})}</div>
  </>;
}

const GO_DEMO_CHECKPOINT_COORDS = Object.freeze([
  { lat: 50.0755, lon: 14.4378 },
  { lat: 49.1951, lon: 16.6068 },
  { lat: 48.7164, lon: 21.2611 },
  { lat: 48.2082, lon: 16.3738 },
  { lat: 47.4979, lon: 19.0402 },
  null,
]);

function formatDistance(km){
  if(km==null) return null;
  if(km<1) return `${Math.max(1,Math.round(km*1000))} m`;
  return `${km.toFixed(km<10?1:0)} km`;
}

function MapScreen(){
  const [geo,setGeo]=useState(null);
  const [geoState,setGeoState]=useState("idle");
  const checkpoints=useMemo(()=>CHECKPOINTS.map((checkpoint,index)=>{
    const coords=GO_DEMO_CHECKPOINT_COORDS[index];
    return {checkpoint,index,km:geo&&coords?distanceKm(geo,coords):null};
  }).sort((a,b)=>(a.km??Number.POSITIVE_INFINITY)-(b.km??Number.POSITIVE_INFINITY)||a.index-b.index),[geo]);
  const nearest=checkpoints[0];
  const locate=()=>{
    if(!navigator.geolocation){setGeoState("unsupported");return;}
    setGeoState("loading");
    navigator.geolocation.getCurrentPosition(
      ({coords})=>{setGeo({lat:coords.latitude,lon:coords.longitude});setGeoState("ready");},
      ()=>setGeoState("denied"),
      {enableHighAccuracy:false,timeout:10000,maximumAge:300000},
    );
  };
  const locationLabel=geoState==="loading"?"Zaměřuji…":geoState==="ready"?"✓ Poloha aktivní":"📍 Najít mě";
  const locationMessage=geoState==="denied"?"Poloha nebyla povolena. DEMO mapu můžeš dál používat bez ní.":geoState==="unsupported"?"Tento prohlížeč geolokaci nepodporuje. DEMO mapa zůstává dostupná.":geoState==="ready"?"Poloha zůstává jen v paměti této obrazovky a po opuštění se neukládá.":"Poloha se načte až po kliknutí a nikam se neodesílá.";
  return <>
    <Header title="Mapa" eyebrow="OBJEVUJ KOLEM SEBE"/>
    <section className="go2-location-control" aria-live="polite"><button disabled={geoState==="loading"} onClick={locate}>{locationLabel}</button><p>{locationMessage}</p></section>
    <div className="go2-filter"><button className="is-active">Vše</button><button>Mise</button><button>Projekty</button><button>Místa</button></div>
    <section className="go2-map" role="img" aria-label="Orientační mapa DEMO checkpointů; přesná poloha uživatele se veřejně nezobrazuje">{CHECKPOINTS.map((c,i)=><span key={c[0]} style={{left:`${15+(i%3)*32}%`,top:`${18+Math.floor(i/3)*49}%`}}><Image src={goPin(["mission","project","event","lab","mentor"][i%5])} alt="" width={42} height={42} sizes="42px"/></span>)}</section>
    <article className="go2-map-card"><small>{geo?"NEJBLIŽŠÍ DEMO CHECKPOINT":"DEMO CHECKPOINT"}</small><h2>{nearest.checkpoint[0]}</h2><p>{nearest.checkpoint[1]}{nearest.km!=null?` · ${formatDistance(nearest.km)}`:" · orientační lokalita"}</p><button>Zobrazit</button></article>
    <h2 className="go2-section-title">{geo?"Checkpointy podle vzdálenosti":"Modelové checkpointy"}</h2>
    <div className="go2-account-list">{checkpoints.map(({checkpoint,index,km})=><article key={checkpoint[0]}><div><small>DEMO · {checkpoint[2]}</small><h2>{checkpoint[0]}</h2><p>{checkpoint[1]}{km!=null?` · ${formatDistance(km)}`:""}</p></div><span aria-label={`Typ checkpointu ${checkpoint[2]}`}><Image src={goPin(["mission","project","event","lab","mentor"][index%5])} alt="" width={30} height={30}/></span></article>)}</div>
  </>;
}

function Projects({onOpenGreenProject,account}) {
  const mine=account?.activeProjects||[];
  return <><Header title="Projekty" eyebrow="MOJE PROJEKTY A MODELOVÝ KATALOG"/>
    <h2 className="go2-section-title">Moje projekty</h2>
    <div className="go2-account-list">{mine.length?mine.map(project=><article key={project.id}><div><small>ÚČET · {project.modelOnly?"MODELOVÝ PROJEKT":"PROJEKT"}</small><h2>{project.title}</h2><p>{project.progress?.completed||0} / {project.progress?.total||0} propojených misí proběhlo</p></div><button onClick={project.slug===PROJECT_GREEN_HOPE_GROW_001.slug?onOpenGreenProject:undefined} disabled={project.slug!==PROJECT_GREEN_HOPE_GROW_001.slug}>{project.slug===PROJECT_GREEN_HOPE_GROW_001.slug?"Pokračovat":"Detail připravujeme"}</button></article>):<article className="go2-empty-card"><h2>Zatím nejsi v žádném projektu</h2><p>Projekt je kontext pro skutečné mise. Přidání do projektu nevytváří automaticky dopad ani kompetenci.</p></article>}</div>
    <h2 className="go2-section-title">Katalog a modely</h2>
    <div className="go2-projects">{PROJECTS.map((p)=><article key={p.title}><Image className={p.image?.endsWith(".svg") ? "is-scene" : ""} src={p.image || "/assets/brand/go/mission-covers/community-16x9.webp"} alt="" width={560} height={315} sizes="(max-width: 480px) 100vw, 360px"/><div><small>{p.modelOnly?"MODELOVÝ PROJEKT · ":"KONCEPT · "}{p.tag}</small><h2>{p.title}</h2><p>{p.description}</p><b>{p.status}</b>{p.blueprintId===PROJECT_GREEN_HOPE_GROW_001.id&&<button className="go2-project-open" onClick={onOpenGreenProject}>Otevřít modelový projekt →</button>}</div></article>)}</div>
  </>;
}

const IMPACT_LABELS={knowledge:"Poznání",skills:"Dovednosti",nature:"Příroda"};
function GreenHopeProject({onMission,onPortfolio,account}) {
  const project = PROJECT_GREEN_HOPE_GROW_001;
  const router=useRouter();
  const initialProject=account?.activeProjects?.find((item)=>item.slug===project.slug);
  const [accountJoined,setAccountJoined]=useState(Boolean(initialProject));
  const [progress,setProgress]=useState(initialProject?.progress||{completed:0,total:1,isComplete:false});
  const [statusMessage,setStatusMessage]=useState("");
  const [joining,setJoining]=useState(false);

  useEffect(()=>{
    let active=true;
    loadProjectStateAction(project.slug).then((result)=>{
      if(!active) return;
      if(result.mode==="account") {
        setAccountJoined(result.participation?.status==="joined");
        setProgress(result.progress||{completed:0,total:1,isComplete:false});
      } else setStatusMessage(result.message||"Projektový stav se nepodařilo načíst.");
    }).catch(()=>active&&setStatusMessage("Projektový stav se nepodařilo načíst."));
    return()=>{active=false};
  },[project.slug]);

  async function handleJoin(){
    setJoining(true); setStatusMessage("");
    try {
      const result=await joinProjectAction(project.slug);
      if(result.mode==="account"&&result.participation){setAccountJoined(true);setStatusMessage("Účast je uložená v tvém účtu.");router.refresh();}
      else setStatusMessage(result.message||"Účast se nepodařilo uložit.");
    } catch { setStatusMessage("Účast se nepodařilo uložit."); }
    finally { setJoining(false); }
  }

  return <>
    <Header title={project.titleCs} eyebrow="GREEN HOPE · MODELOVÝ PROJEKT"/>
    <section className="go2-project-core"><Image className="is-scene" src="/assets/brand/go/scenes/green-hope-project.svg" alt="Modelový Green Hope projekt propojuje pěstování, péči o místo a společnou práci" width={560} height={315} sizes="(max-width: 480px) 100vw, 360px" priority/><div><p>{project.summaryCs}</p><div className="go2-grow-tags"><span>Model projektu</span><span>Bez přesné polohy</span><span>Záznam volitelný</span></div></div></section>
    <section className="go2-project-progress"><small>PRVNÍ VERTIKÁLNÍ PROJEKTOVÝ FLOW</small><h2>{progress.completed} / {progress.total||1} mise proběhla</h2><div className="go2-progress"><span style={{width:`${progress.total?progress.completed/progress.total*100:0}%`}}/></div><article><div><b>01</b><span><strong>Vypěstuj první rostlinu</strong><small>{progress.isComplete?"První krok proběhl":"První konkrétní krok projektu"}</small></span></div><button onClick={onMission}>{progress.isComplete?"Otevřít záznam":"Pokračovat misí"}</button></article></section>
    <section className="go2-project-impact"><small>DIMENZE, KTERÉ PROJEKT MŮŽE SLEDOVAT</small><h2>Dopad bez kouzelného skóre</h2><p>Toto nejsou dosažené výsledky. Jsou to oblasti, ve kterých může projekt později ukládat jednotlivá doložená pozorování.</p><div>{project.impactDimensionIds.map(id=><span key={id}>{IMPACT_LABELS[id]||id}</span>)}</div></section>
    <section className="go2-project-join">{!accountJoined?<><h2>Přidat se k modelovému projektu</h2><p>Projekt nevyžaduje přesnou polohu ani povinné důkazy. Účast se ukládá do tvého účtu.</p><button disabled={joining} onClick={handleJoin}>{joining?"Ukládám…":"Přidat se"}</button></>:<><div className="go2-complete">✓ Projekt máš uložený mezi svými.</div><p>Účast je uložená v účtu.</p>{progress.isComplete?<button onClick={onPortfolio}>Otevřít portfolio</button>:<button onClick={onMission}>Udělat první krok</button>}</>}{statusMessage&&<span role="status">{statusMessage}</span>}</section>
  </>;
}

function Teams({account}) {
  const memberships=account?.organizationMemberships||[];
  const typeLabel={community:"Komunita / rodina",school:"Škola",company:"Firma",ngo:"Organizace",municipality:"Obec"};
  return <><Header title="Týmy a kontexty" eyebrow="SKUTEČNÁ ČLENSTVÍ · BEZ FALEŠNÝCH TÝMŮ"/>
    <section className="go2-callout"><Icon src={goIcon("teams")}/><h2>Spolupráce používá skutečná členství</h2><p>GO zobrazuje jen organizace, ke kterým má tento účet aktivní membership. Family Team zachovává vlastní identitu každého člena.</p></section>
    <h2 className="go2-section-title">Moje aktivní kontexty</h2>
    <div className="go2-team-list">{memberships.length?memberships.map(item=><article key={item.id}><span>{(item.organization?.name||"?").slice(0,1).toUpperCase()}</span><div><h2>{item.organization?.name}</h2><p>{typeLabel[item.organization?.type]||item.organization?.type} · role {item.role}</p></div><b className="go2-real-tag">ÚČET</b></article>):<article className="go2-empty-team"><span>–</span><div><h2>Žádné aktivní týmové členství</h2><p>Osobní GO může fungovat i bez organizace.</p></div></article>}</div>
    <section className="go2-demo-panel"><small>DEMO · POUZE UKÁZKA MOŽNÝCH KONTEXTŮ</small><h2>Jak mohou týmy později vypadat</h2><div>{["Family Team","Školní projektový tým","Komunitní Green Hope hub"].map(name=><span key={name}>{name}</span>)}</div><p>Tyto názvy nejsou tvoje členství ani ověření partneři.</p></section>
  </>;
}

function Portfolio({account}) {
  const items=account?.recentPortfolio||[];
  const activity=account?.recentActivity||[];
  const attestations=account?.skillAttestations||[];
  const observations=account?.impactObservations||[];
  return <>
    <Header title="Moje portfolio" eyebrow="SOUKROMÉ ZKUŠENOSTI A VÝSTUPY"/>
    <figure className="go2-context-scene"><Image src="/assets/brand/go/scenes/portfolio-context.svg" alt="Soukromé portfolio propojuje zkušenost, výstup a doloženou dovednost bez veřejného skóre" width={960} height={540}/><figcaption>Konkrétní zkušenosti a výstupy, ne person score.</figcaption></figure>
    <section className="go2-portfolio-hero"><strong>{account?.portfolioCount||0}</strong><span>položek v soukromém portfoliu</span><p>Portfolio není veřejné skóre člověka. Každá položka vychází z konkrétní dokončené zkušenosti.</p></section>
    <h2 className="go2-section-title">Doložené dovednosti</h2>
    <div className="go2-proof-list">{attestations.length?attestations.map(item=><article key={item.id}><small>{item.attestationType==="self"?"SEBEDOLOŽENÍ":"DOLOŽENÍ"}</small><h2>{item.skill?.titleCs}</h2><p>Úroveň {item.level} · navázáno na konkrétní evidence. Nejde o certifikaci ani person score.</p></article>):<article className="go2-empty-card"><h2>Zatím bez doložené dovednosti</h2><p>Dokončení mise samo o sobě kompetenci nedokazuje. Dovednost se objeví až po explicitním použití konkrétní evidence.</p></article>}</div>
    <h2 className="go2-section-title">Doložená pozorování dopadu</h2>
    <div className="go2-proof-list">{observations.length?observations.map(item=><article key={item.id}><small>EVIDENCE-BACKED · {IMPACT_LABELS[item.dimension]?.toUpperCase()||item.dimension.toUpperCase()}</small><h2>{item.dimension==="nature"?"Pozorování v dimenzi Příroda":IMPACT_LABELS[item.dimension]||item.dimension}</h2><p>{item.valueNumeric||1} doložené pozorování · nejde o agregované skóre ani automatické tvrzení o výsledném dopadu.</p></article>):<article className="go2-empty-card"><h2>Zatím bez doloženého pozorování</h2><p>Dopad se nevytváří z XP ani z pouhého kliknutí na dokončeno. Potřebuje konkrétní evidence.</p></article>}</div>
    <h2 className="go2-section-title">Poslední položky</h2>
    <div className="go2-portfolio-list">{items.length?items.map(item=><article key={item.id}><small>{item.visibility==="private"?"SOUKROMÉ":item.visibility.toUpperCase()}</small><h2>{item.title}</h2><p>{item.summary||"Dokončená zkušenost bez povinného doplňujícího záznamu."}</p></article>):<article className="go2-empty-card"><h2>Zatím bez položek</h2><p>Po dokončení skutečné mise může vzniknout soukromá položka portfolia. Poznámka ani reflexe nejsou povinné.</p></article>}</div>
    <h2 className="go2-section-title">Poslední zkušenosti</h2>
    <section className="go2-activity-list">{activity.length?activity.map(item=><article key={item.id}><Icon src={goIcon("reflection")}/><div><b>{item.title}</b><small>{item.programId||"Pansofie GO"}</small></div></article>):<article className="go2-empty"><Icon src={goIcon("mission")}/><div><b>Zatím bez uložené zkušenosti</b><small>Dokončená mise se objeví tady.</small></div></article>}</section>
    <p className="go2-note">Evidence a reflexe jsou pro běžnou účast dobrovolné. Doložení dovednosti je samostatná explicitní volba a nikdy nevytváří globální hodnocení člověka.</p>
  </>;
}

function Mentor({onNavigate,displayName}) {
  return <><Header title="Průvodce" eyebrow="PŘIPRAVOVANÁ VRSTVA · NEJDE O ŽIVÝ CHAT"/>
    <section className="go2-mentor go2-mentor--prototype"><div className="go2-avatar">?</div><h2>{displayName}, průvodce zatím není připojený.</h2><p>Tato obrazovka neodesílá zprávy AI ani člověku. Ukazuje pouze zamýšlenou roli průvodce: pomoci vybrat další bezpečný krok, vysvětlit zadání a podpořit reflexi.</p><div className="go2-mentor-options"><span>Vysvětlit misi srozumitelně</span><span>Navrhnout další krok v projektu</span><span>Pomoci formulovat reflexi</span></div><button onClick={()=>onNavigate("mise")}>Otevřít skutečné mise →</button><p className="go2-account-note">Průvodce nikdy nenahrazuje rodiče, pedagoga, odborníka ani krizovou pomoc.</p></section>
  </>;
}

function Profile({displayName,account}) {
  const profile=account?.profile||{};
  const contextLabels={personal:"Osobní",family:"Rodina",school:"Škola",company:"Firma",young:"Young"};
  const initial=(displayName||"M").trim().slice(0,1).toUpperCase()||"M";
  return <><Header title="Profil" eyebrow="SKUTEČNÝ ÚČET · SOUKROMÝ PŘEHLED"/>
    <section className="go2-profile"><div className="go2-avatar go2-avatar--photo">{initial}</div><h2>{displayName}</h2><p>{contextLabels[profile.accountContext]||profile.accountContext||"Osobní"} kontext</p><div><span><strong>{account?.activeProjects?.length||0}</strong> aktivní projekty</span><span><strong>{account?.completedMissions?.length||0}</strong> dokončené mise</span><span><strong>{account?.portfolioCount||0}</strong> portfolio</span></div></section>
    <section className="go2-callout"><h2>Co profil skutečně říká</h2><p>Ukazuje stav tohoto účtu a jeho konkrétní práci. Neodvozuje osobnost, lidskou hodnotu, reputaci ani procentuální „potenciál“.</p></section>
    <section className="go2-profile-context"><small>AKTIVNÍ KONTEXTY</small><p>{account?.organizationMemberships?.length?`${account.organizationMemberships.length} aktivní organizační členství` : "Žádné aktivní organizační členství. Osobní prostor zůstává plně použitelný."}</p></section>
  </>;
}

function PrototypeScreen({id}) {
  const board=GO_VISUAL_BOARDS[id];
  const scene=GO_VISUAL_SCENES[id];
  return <>
    <Header title={board.label} eyebrow={`${board.eyebrow} · VIZUÁLNÍ PROTOTYP`}/>
    {scene&&<figure className="go2-context-scene"><Image src={scene} alt={`Kontext obrazovky ${board.label}`} width={960} height={540}/><figcaption>Obraz vysvětluje roli této vrstvy. Neaktivuje novou datovou funkci.</figcaption></figure>}
    <section className="go2-prototype-hero"><small>BOARD PRO VIZUÁLNÍ A UX VALIDACI</small><h2>{board.title}</h2><p>{board.lead}</p></section>
    <section className="go2-prototype-grid">{board.items.map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h2>{title}</h2><p>{text}</p></article>)}</section>
    <p className="go2-note">Tato obrazovka je vizuální prototyp. Neaktivuje novou datovou funkci, automatické rozhodování ani oprávnění, která ještě nejsou implementovaná a ověřená.</p>
  </>;
}

function Settings({onNavigate}){return <><Header title="Nastavení" eyebrow="BEZPEČÍ A PŘIZPŮSOBENÍ"/><div className="go2-settings">{[["profile","Můj účet"],["verified","Soukromí a bezpečí"],["teams","Rodinný režim"],["notifications","Upozornění"],["settings","Vzhled a jazyk"],["mentor","Nápověda"]].map(([id,label])=><button key={label}><Icon src={goIcon(id)}/><span>{label}</span><b>›</b></button>)}</div><section className="go2-safety"><Icon src={goIcon("verified")}/><div><h2>Bezpečné prostředí na prvním místě</h2><p>Žádná přesná poloha dítěte a žádný přímý kontakt dítěte s neznámým dospělým.</p></div></section><section className="go2-prototype-index"><small>KOMPLETNÍ VIZUÁLNÍ MAPA GO</small><h2>Další obrazovky a kontexty</h2><p>Tyto boardy dokončují vizuální systém. Funkce zůstávají transparentně prototypové, dokud nemají data, oprávnění a ověření.</p><div>{Object.entries(GO_VISUAL_BOARDS).map(([id,board])=><button key={id} onClick={()=>onNavigate(id)}>{board.label}<span>→</span></button>)}</div></section></>}

function GoWorkspaceInner({view="domov",displayName="Můj prostor",account}){
  const router=useRouter();
  const special=["mise-grow","projekt-green-grow"].includes(view);
  const prototype=Boolean(GO_VISUAL_BOARDS[view]);
  const valid=special?view:(NAV.some(([id])=>id===view)||prototype?view:"domov");
  const screen=useMemo(()=>valid,[valid]);
  const navigate=id=>router.push(id==="domov"?"/go":`/go/${id}`);
  const openGrow=()=>navigate("mise-grow");
  const openGreenProject=()=>navigate("projekt-green-grow");
  const content=screen==="domov"?<Home onNavigate={navigate} displayName={displayName} account={account}/>:screen==="mise-grow"?<GrowMission onPortfolio={()=>navigate("portfolio")}/>:screen==="projekt-green-grow"?<GreenHopeProject onMission={openGrow} onPortfolio={()=>navigate("portfolio")} account={account}/>:screen==="mise"?<Missions onOpenGrow={openGrow} account={account}/>:screen==="mapa"?<MapScreen/>:screen==="projekty"?<Projects onOpenGreenProject={openGreenProject} account={account}/>:screen==="tymy"?<Teams account={account}/>:screen==="portfolio"?<Portfolio account={account}/>:screen==="mentor"?<Mentor onNavigate={navigate} displayName={displayName}/>:screen==="profil"?<Profile displayName={displayName} account={account}/>:GO_VISUAL_BOARDS[screen]?<PrototypeScreen id={screen}/>:<Settings onNavigate={navigate}/>;
  return <div className="go2-stage"><aside className="go2-desktop-note"><b>PANSOFIE GO · GEOLOKAČNÍ HRA</b><h2>Svět je herní mapa.</h2><p>Mobile-first hra pro objevování míst, checkpointů, misí a projektů ve skutečném světě.</p><nav className="go2-all-nav" aria-label="Hlavní obrazovky Pansofie GO">{NAV.map(([id,label])=><button key={id} className={screen===id?"is-active":""} onClick={()=>navigate(id)}>{label}</button>)}</nav><button className="go2-board-directory" onClick={()=>navigate("nastaveni")}>Všechny vizuální boardy →</button><a href="/">← Pansofie</a><a href="/green-hope">Green Hope →</a><a href="/young">Pansofie Young →</a></aside><main className="go2-phone"><div className="go2-status"><span>9:41</span><strong>PANSOFIE GO</strong><span>● ● ●</span></div><div className="go2-content">{content}</div><nav className="go2-dock" aria-label="Pansofie GO navigace">{NAV.map(([id,label,icon])=><button key={id} className={screen===id?"is-active":""} aria-label={label} aria-current={screen===id?"page":undefined} onClick={()=>navigate(id)}><Icon src={goIcon(icon)}/><span>{label}</span></button>)}</nav></main></div>;
}

export default function GoWorkspace(props){return <GoWorkspaceInner {...props}/>}
