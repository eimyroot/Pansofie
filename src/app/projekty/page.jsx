import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PROJECTS } from "../../domain/pansofie-content";
import { pansofiePhoto } from "../../domain/asset-system";

export const metadata = {
  title: "Projekty",
  description: "Programy, modelové projekty a koncepty Pansofie, které propojují učení se skutečným životem.",
};

const PROJECT_LINKS = {
  "Green Hope": "/green-hope",
  "Urban Family Farm": "/urban-family-farm",
  "Family Team": "/family-team",
  "Komunitní zahrada": "/go/projekt-green-grow",
  "Knowledge Exchange": "/sit",
};

export default function ProjectsPage() {
  return <PublicShell active="/projekty">
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">UČENÍ V PRAXI</p><h1>Projekty dávají souvislostem tvar.</h1><p>Pansofie propojuje poznání s konkrétní zkušeností. Některé položky jsou už funkčním modelovým flow, jiné zůstávají transparentně označenými prototypy nebo koncepty.</p></div>
      <div className="pw-page-hero__media"><Image src={pansofiePhoto("community-city-16x9")} alt="Komunitní práce v městském prostředí" fill priority sizes="(max-width: 780px) 100vw, 46vw"/></div>
    </section>

    <section className="pw-project-list">
      {PROJECTS.map((project, index) => <article className="pw-project-card" key={`${project.title}-${index}`}>
        <div className="pw-project-card__media"><Image src={project.image} alt="" fill sizes="(max-width: 780px) 100vw, 40vw"/></div>
        <div className="pw-project-card__body">
          <div className="pw-project-card__meta"><span>{project.tag}</span><b>{project.status}</b></div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {PROJECT_LINKS[project.title] ? <Link href={PROJECT_LINKS[project.title]}>Otevřít <span aria-hidden="true">→</span></Link> : <span className="pw-project-card__pending">Další rozvoj je součástí produktového plánu.</span>}
          {project.modelOnly && <small>Modelový projekt. Nejde o tvrzení o existující lokalitě ani naměřeném dopadu.</small>}
        </div>
      </article>)}
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">ZAČÍT MALÝM KROKEM</p><h2>První mise už propojuje web s akčním jádrem.</h2><p>„Vypěstuj první rostlinu“ je první konkrétní vertikální zkušenost Green Hope. Dokončení je možné bez povinné fotografie nebo reflexe.</p></div>
      <Link className="pw-button pw-button--dark" href="/mise/rostlina">Vypěstuj první rostlinu</Link>
    </section>
  </PublicShell>;
}
