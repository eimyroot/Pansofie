import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { PROJECTS } from "../../domain/pansofie-content";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = { title: "Projekty", description: "Programy, modelové projekty a koncepty Pansofie, které propojují učení se skutečným životem." };
const PROJECT_LINKS = { "Green Hope": "/green-hope", "Urban Family Farm": "/urban-family-farm", "Family Team": "/family-team", "Komunitní zahrada": "/mise/rostlina", "Knowledge Exchange": "/sit" };
const PROJECT_VISUALS = {
  "Green Hope": pansofieScene("green-hope-lab"),
  "Urban Family Farm": pansofieScene("urban-farm-system"),
  "Family Team": pansofieScene("family-team-missions"),
  "Komunitní zahrada": pansofiePhoto("growing-together-16x9"),
  "Mikrogreens farma": pansofiePhoto("curiosity-nature-16x9"),
  "Kompostovací centrum": pansofieScene("collaboration-map"),
  "Knowledge Exchange": pansofieScene("knowledge-journal"),
  "Makerspace Pansofie": pansofieScene("school-life-learning"),
};
const GATEWAYS = [
  {title:"Green Hope",text:"Pěstování, půda, voda, biodiverzita a péče o konkrétní místo.",href:"/green-hope",image:pansofiePhoto("growing-together-16x9"),label:"PŘÍRODA"},
  {title:"Urban Family Farm",text:"Pěstování propojené s prací, ekonomikou a tvorbou hodnoty.",href:"/urban-family-farm",image:pansofieScene("urban-farm-system"),label:"MĚSTO · RODINA"},
  {title:"Digitální kompost",text:"Materiály a věci dostávají další smysluplné použití.",href:"/digitalni-kompost",image:pansofieScene("collaboration-map"),label:"CIRKULARITA"},
  {title:"Labs",text:"Bezpečný prostor pro pokusy, pozorování a malé ověřitelné prototypy.",href:"/labs",image:pansofieScene("green-hope-lab"),label:"EXPERIMENT"},
];
export default function ProjectsPage(){return <PublicShell active="/projekty">
  <section className="pw-visual-hero pw-visual-hero--projects"><div className="pw-visual-hero__copy"><p className="pw-eyebrow">UČENÍ V PRAXI</p><h1>Projekty dávají souvislostem tvar.</h1><p>Pansofie propojuje poznání s konkrétní zkušeností. Některé položky jsou funkčním modelovým flow, jiné zůstávají transparentně označenými prototypy nebo koncepty.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/green-hope">Začít Green Hope</Link><Link className="pw-button pw-button--light" href="/labs">Otevřít Labs</Link></div></div><div className="pw-visual-hero__media"><Image src={pansofiePhoto("community-city-16x9")} alt="Komunitní práce v městském prostředí" fill priority sizes="(max-width:900px) 100vw,58vw"/><div className="pw-visual-hero__note">místo → otázka → projekt → zkušenost</div></div></section>
  <section className="pw-project-gateway">{GATEWAYS.map(card=><Link className="pw-project-gateway__card" href={card.href} key={card.title}><div><Image src={card.image} alt="" fill sizes="(max-width:900px) 100vw,25vw"/></div><span>{card.label}</span><h2>{card.title}</h2><p>{card.text}</p></Link>)}</section>
  <EditorialFeatureBand eyebrow="OD MÍSTA K PROJEKTU" title="Projekt je místo, kde se potkají lidé, znalosti a skutečná potřeba." text="Komunitní zahrada, školní dílna, pomoc seniorům nebo práce se zbytkovým materiálem dávají smysl tehdy, když mají konkrétní účel a jasný kontext." image={pansofiePhoto("growing-together-16x9")} imageAlt="Lidé různých generací spolupracují na společném projektu" items={[["Město a příroda","Zeleň, pěstování a péče o konkrétní místo."],["Školy a firmy","Potřeba se může potkat s materiálem, know-how nebo kapacitou."],["Mezigeneračně","Zkušenost a energie se mohou doplňovat."],["V oběhu","Zbytkový materiál může být vstupem do tvorby."]]} link={{href:"/sit",label:"Jak funguje síť spolupráce"}}/>
  <div className="pw-project-section-head"><p className="pw-eyebrow">DALŠÍ MODELY A KONCEPTY</p><h2>Transparentně podle skutečného stavu.</h2></div>
  <section className="pw-project-list">{PROJECTS.map((project,index)=><article className="pw-project-card" key={`${project.title}-${index}`}><div className="pw-project-card__media"><Image src={PROJECT_VISUALS[project.title] || project.image} alt="" fill sizes="(max-width:780px) 100vw,40vw"/></div><div className="pw-project-card__body"><div className="pw-project-card__meta"><span>{project.tag}</span><b>{project.status}</b></div><h2>{project.title}</h2><p>{project.description}</p>{PROJECT_LINKS[project.title]?<Link href={PROJECT_LINKS[project.title]}>Otevřít <span aria-hidden="true">→</span></Link>:<span className="pw-project-card__pending">Další rozvoj je součástí produktového plánu.</span>}{project.modelOnly&&<small>Modelový projekt. Nejde o tvrzení o existující lokalitě ani naměřeném dopadu.</small>}</div></article>)}</section>
  <section className="pw-next"><div><p className="pw-eyebrow">ZAČÍT MALÝM KROKEM</p><h2>První mise už propojuje web s akčním jádrem.</h2><p>„Vypěstuj první rostlinu“ je první konkrétní zkušenost Green Hope bez povinné fotografie nebo reflexe.</p></div><Link className="pw-button pw-button--dark" href="/mise/rostlina">Vypěstuj první rostlinu</Link></section>
</PublicShell>}
