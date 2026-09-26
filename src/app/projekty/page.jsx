import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { PansofieArtPanel } from "../../components/public/PansofieArtPanel";
import { PROJECTS } from "../../domain/pansofie-content";

export const metadata = { title: "Projekty", description: "Programy, modelové projekty a koncepty Pansofie, které propojují učení se skutečným životem." };
const PROJECT_LINKS = { "Green Hope": "/green-hope", "Urban Family Farm": "/urban-family-farm", "Family Team": "/family-team", "Komunitní zahrada": "/mise/rostlina", "Knowledge Exchange": "/sit" };
const GATEWAYS = [
  {title:"Green Hope",text:"Pěstování, půda, voda, biodiverzita a péče o konkrétní místo.",href:"/green-hope",label:"PŘÍRODA",variant:"nature",nodes:["Půda","Voda","Pěstování","Péče"]},
  {title:"Urban Family Farm",text:"Pěstování propojené s prací, ekonomikou a tvorbou hodnoty.",href:"/urban-family-farm",label:"MĚSTO · RODINA",variant:"city",nodes:["Pěstuj","Zpracuj","Spočítej","Rozhodni"]},
  {title:"Digitální kompost",text:"Materiály a věci dostávají další smysluplné použití.",href:"/digitalni-kompost",label:"CIRKULARITA",variant:"community",nodes:["Potřeba","Materiál","Propojení","Použití"]},
  {title:"Labs",text:"Bezpečný prostor pro pokusy, pozorování a malé ověřitelné prototypy.",href:"/labs",label:"EXPERIMENT",variant:"knowledge",nodes:["Otázka","Pokus","Pozorování","Reflexe"]},
];
const projectArt = (project) => ({
  variant: /Green|zahrad|Mikrogreens/i.test(project.title) ? "nature" : /Kompost|Makerspace|Urban/i.test(project.title) ? "city" : /Knowledge/i.test(project.title) ? "knowledge" : "community",
  nodes: [project.tag || "Projekt", "Místo", "Lidé", "Zkušenost"],
});
export default function ProjectsPage(){return <PublicShell active="/projekty">
  <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--projects"><div className="pw-visual-hero__copy"><p className="pw-eyebrow">UČENÍ V PRAXI</p><h1>Projekty dávají souvislostem tvar.</h1><p>Pansofie propojuje poznání s konkrétní zkušeností. Některé položky jsou funkčním modelovým flow, jiné zůstávají transparentně označenými prototypy nebo koncepty.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/green-hope">Začít Green Hope</Link><Link className="pw-button pw-button--light" href="/labs">Otevřít Labs</Link></div></div><div className="pw-visual-hero__engine"><PansofieVisualEngine mode="projects" projects={GATEWAYS}/></div></section>
  <section className="pw-project-gateway">{GATEWAYS.map(card=><Link className="pw-project-gateway__card" href={card.href} key={card.title}><div><PansofieArtPanel compact eyebrow={card.label} title={card.title} detail={card.text} nodes={card.nodes} variant={card.variant}/></div><span>{card.label}</span><h2>{card.title}</h2><p>{card.text}</p></Link>)}</section>
  <EditorialFeatureBand eyebrow="OD MÍSTA K PROJEKTU" title="Projekt je místo, kde se potkají lidé, znalosti a skutečná potřeba." text="Komunitní zahrada, školní dílna, pomoc seniorům nebo práce se zbytkovým materiálem dávají smysl tehdy, když mají konkrétní účel a jasný kontext." image={null} imageAlt="Lidé různých generací spolupracují na společném projektu" items={[["Město a příroda","Zeleň, pěstování a péče o konkrétní místo."],["Školy a firmy","Potřeba se může potkat s materiálem, know-how nebo kapacitou."],["Mezigeneračně","Zkušenost a energie se mohou doplňovat."],["V oběhu","Zbytkový materiál může být vstupem do tvorby."]]} link={{href:"/sit",label:"Jak funguje síť spolupráce"}}/>
  <div className="pw-project-section-head"><p className="pw-eyebrow">DALŠÍ MODELY A KONCEPTY</p><h2>Transparentně podle skutečného stavu.</h2></div>
  <section className="pw-project-list">{PROJECTS.map((project,index)=><article className="pw-project-card" key={`${project.title}-${index}`}><div className="pw-project-card__media"><PansofieArtPanel eyebrow={project.tag || "PROJEKT"} title={project.title} detail={project.description} nodes={projectArt(project).nodes} variant={projectArt(project).variant}/></div><div className="pw-project-card__body"><div className="pw-project-card__meta"><span>{project.tag}</span><b>{project.status}</b></div><h2>{project.title}</h2><p>{project.description}</p>{PROJECT_LINKS[project.title]?<Link href={PROJECT_LINKS[project.title]}>Otevřít <span aria-hidden="true">→</span></Link>:<span className="pw-project-card__pending">Další rozvoj je součástí produktového plánu.</span>}{project.modelOnly&&<small>Modelový projekt. Nejde o tvrzení o existující lokalitě ani naměřeném dopadu.</small>}</div></article>)}</section>
  <section className="pw-next"><div><p className="pw-eyebrow">ZAČÍT MALÝM KROKEM</p><h2>První mise už propojuje web s akčním jádrem.</h2><p>„Vypěstuj první rostlinu“ je první konkrétní zkušenost Green Hope bez povinné fotografie nebo reflexe.</p></div><Link className="pw-button pw-button--dark" href="/mise/rostlina">Vypěstuj první rostlinu</Link></section>
</PublicShell>}
