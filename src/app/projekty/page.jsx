import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { PansofieArtPanel } from "../../components/public/PansofieArtPanel";
import { PROJECTS } from "../../domain/pansofie-content";

export const metadata = {
  title: "Projekty",
  description: "Projekty PanSofie propojují poznání, lidi a konkrétní zkušenost.",
};

const GATEWAYS = [
  { title: "Green Hope", label: "PŘÍRODA", href: "/green-hope", variant: "nature", text: "Pěstování, půda, voda, biodiverzita a péče o konkrétní místo.", nodes: ["Půda", "Voda", "Pěstování", "Péče"] },
  { title: "Urban Family Farm", label: "MĚSTO · RODINA", href: "/urban-family-farm", variant: "city", text: "Pěstování propojené s prací, ekonomikou a tvorbou hodnoty.", nodes: ["Pěstuj", "Zpracuj", "Spočítej", "Rozhodni"] },
  { title: "Digitální kompost", label: "CIRKULARITA", href: "/digitalni-kompost", variant: "community", text: "Materiály a věci dostávají další smysluplné použití.", nodes: ["Potřeba", "Materiál", "Propojení", "Použití"] },
  { title: "Labs", label: "EXPERIMENT", href: "/labs", variant: "knowledge", text: "Bezpečný prostor pro pokusy, pozorování a malé ověřitelné prototypy.", nodes: ["Otázka", "Pokus", "Pozorování", "Reflexe"] },
];

const PROJECT_LINKS = {
  "Green Hope": "/green-hope",
  "Urban Family Farm": "/urban-family-farm",
  "Family Team": "/family-team",
  "Komunitní zahrada": "/mise/rostlina",
  "Knowledge Exchange": "/sit",
};

function projectVisual(project) {
  const title = project.title || "";
  const variant = /Green|zahrad|Mikrogreens/i.test(title) ? "nature" :
    /Kompost|Makerspace|Urban/i.test(title) ? "city" :
    /Knowledge/i.test(title) ? "knowledge" : "community";
  return { variant, nodes: [project.tag || "Projekt", "Místo", "Lidé", "Zkušenost"] };
}

function GatewayCard({ project }) {
  return <Link className="pw-project-gateway__card" href={project.href}>
    <div className="pw-project-gateway__art">
      <PansofieArtPanel compact eyebrow={project.label} title={project.title}
        detail={project.text} nodes={project.nodes} variant={project.variant}/>
    </div>
    <span>{project.label}</span>
    <h2>{project.title}</h2>
    <p>{project.text}</p>
  </Link>;
}

function CatalogCard({ project, index }) {
  const visual = projectVisual(project);
  const href = PROJECT_LINKS[project.title];
  return <article className="pw-project-card" key={`${project.title}-${index}`}>
    <div className="pw-project-card__media">
      <PansofieArtPanel eyebrow={project.tag || "PROJEKT"} title={project.title}
        detail={project.description} nodes={visual.nodes} variant={visual.variant}/>
    </div>
    <div className="pw-project-card__body">
      <div className="pw-project-card__meta"><span>{project.tag}</span><b>{project.status}</b></div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      {href ? <Link href={href}>Otevřít <span aria-hidden="true">→</span></Link> :
        <span className="pw-project-card__pending">Další rozvoj je součástí produktového plánu.</span>}
      {project.modelOnly && <small>Modelový projekt. Nejde o tvrzení o existující lokalitě ani naměřeném dopadu.</small>}
    </div>
  </article>;
}

export default function ProjectsPage() {
  return <PublicShell active="/projekty">
    <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--projects">
      <div className="pw-visual-hero__copy">
        <p className="pw-eyebrow">UČENÍ V PRAXI</p>
        <h1>Projekty dávají souvislostem tvar.</h1>
        <p>Pansofie propojuje poznání s konkrétní zkušeností. Některé položky jsou funkčním modelovým flow, jiné zůstávají transparentně označenými prototypy nebo koncepty.</p>
        <div className="pw-visual-hero__actions">
          <Link className="pw-button pw-button--dark" href="/green-hope">Začít Green Hope</Link>
          <Link className="pw-button pw-button--light" href="/labs">Otevřít Labs</Link>
        </div>
      </div>
      <div className="pw-visual-hero__engine">
        <PansofieVisualEngine mode="projects" projects={GATEWAYS}/>
      </div>
    </section>

    <section className="pw-project-gateway" aria-label="Hlavní projekty">
      {GATEWAYS.map(project => <GatewayCard project={project} key={project.href}/>)}
    </section>

    <EditorialFeatureBand eyebrow="OD MÍSTA K PROJEKTU"
      title="Projekt je místo, kde se potkají lidé, znalosti a skutečná potřeba."
      text="Komunitní zahrada, školní dílna, pomoc seniorům nebo práce se zbytkovým materiálem dávají smysl tehdy, když mají konkrétní účel a jasný kontext."
      image={null} imageAlt="Lidé různých generací spolupracují na společném projektu"
      items={[
        ["Město a příroda", "Zeleň, pěstování a péče o konkrétní místo."],
        ["Školy a firmy", "Potřeba se může potkat s materiálem, know-how nebo kapacitou."],
        ["Mezigeneračně", "Zkušenost a energie se mohou doplňovat."],
        ["V oběhu", "Zbytkový materiál může být vstupem do tvorby."],
      ]}
      link={{ href: "/sit", label: "Jak funguje síť spolupráce" }}/>

    <div className="pw-project-section-head">
      <p className="pw-eyebrow">DALŠÍ MODELY A KONCEPTY</p>
      <h2>Transparentně podle skutečného stavu.</h2>
    </div>
    <section className="pw-project-list" aria-label="Další projekty">
      {PROJECTS.map((project, index) => <CatalogCard project={project} index={index} key={`${project.title}-${index}`}/>)}
    </section>
    <section className="pw-next">
      <div>
        <p className="pw-eyebrow">ZAČÍT MALÝM KROKEM</p>
        <h2>První mise už propojuje web s akčním jádrem.</h2>
        <p>„Vypěstuj první rostlinu“ je první konkrétní zkušenost Green Hope bez povinné fotografie nebo reflexe.</p>
      </div>
      <Link className="pw-button pw-button--dark" href="/mise/rostlina">Vypěstuj první rostlinu</Link>
    </section>
  </PublicShell>;
}
