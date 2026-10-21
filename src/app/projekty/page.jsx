import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PROJECTS } from "../../domain/pansofie-content";

export const metadata = {
  title: "Projekty",
  description: "Projekty PanSofie propojují poznání, lidi a konkrétní zkušenost.",
};

const GATEWAYS = [
  { title: "Green Hope", label: "PŘÍRODA A KRAJINA", href: "/green-hope", text: "Pěstování, půda, voda, biodiverzita a péče o konkrétní místo.", image: "/assets/current/mockup01/green-hope.webp", alt: "Zeleň a prostředí projektu Green Hope", steps: ["Půda", "Voda", "Pěstování", "Péče"] },
  { title: "Urban Family Farm", label: "MĚSTO A RODINA", href: "/urban-family-farm", text: "Pěstování propojené s prací, ekonomikou a tvorbou hodnoty.", image: "/assets/current/mockup01/urban-farm.webp", alt: "Městské pěstování", steps: ["Pěstuj", "Zpracuj", "Spočítej", "Rozhodni"] },
  { title: "Digitální kompost", label: "CIRKULÁRNÍ EKONOMIKA", href: "/digitalni-kompost", text: "Materiály a věci dostávají další smysluplné použití.", image: "/assets/mockup/compost-hero.png", alt: "Materiály určené k dalšímu využití", steps: ["Potřeba", "Materiál", "Propojení", "Použití"] },
  { title: "Labs", label: "DÍLNA A EXPERIMENT", href: "/labs", text: "Bezpečný prostor pro pokusy, pozorování a malé ověřitelné prototypy.", image: "/assets/current/photos/labs-workshop.webp", alt: "Společná práce v dílně", steps: ["Otázka", "Pokus", "Pozorování", "Reflexe"] },
];
const PROJECT_LINKS = {
  "Green Hope": "/green-hope",
  "Urban Family Farm": "/urban-family-farm",
  "Family Team": "/family-team",
  "Komunitní zahrada": "/mise/rostlina",
  "Knowledge Exchange": "/sit",
};
function projectImage(title) {
  if (/Green Hope/i.test(title)) return "/assets/current/mockup01/green-hope.webp";
  if (/Urban/i.test(title)) return "/assets/current/mockup01/urban-farm.webp";
  if (/Family Team/i.test(title)) return "/assets/brand/pansofie/illustrations/family-team.webp";
  if (/zahrad|Mikrogreens/i.test(title)) return "/assets/current/photos/community-garden.webp";
  if (/Kompost/i.test(title)) return "/assets/mockup/compost-hero.png";
  if (/Lab|Maker/i.test(title)) return "/assets/current/photos/labs-workshop.webp";
  return "/assets/brand/pansofie/illustrations/project-idea.webp";
}
function GatewayCard({ project, index }) {
  return <Link className="ppr-feature" href={project.href}>
    <div className="ppr-feature__image"><img src={project.image} alt={project.alt} loading={index > 1 ? "lazy" : "eager"}/><span className="ppr-feature__number">0{index + 1}</span></div>
    <div className="ppr-feature__body"><span className="ppr-kicker">{project.label}</span><h3>{project.title}</h3><p>{project.text}</p><div className="ppr-feature__footer"><span>{project.steps.join(" · ")}</span><strong aria-label={"Otevřít " + project.title}>↗</strong></div></div>
  </Link>;
}
function CatalogCard({ project }) {
  const href = PROJECT_LINKS[project.title];
  return <article className="ppr-catalog-card">
    <div className="ppr-catalog-card__image"><img src={projectImage(project.title)} alt="" loading="lazy"/></div>
    <div className="ppr-catalog-card__content"><div className="ppr-catalog-card__meta"><span>{project.tag || "PROJEKT"}</span><span>{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p>{project.modelOnly && <small>Modelový projekt – nejde o tvrzení o existující lokalitě ani naměřeném dopadu.</small>}<div className="ppr-catalog-card__bottom">{href ? <Link href={href}>Prozkoumat projekt <span aria-hidden="true">↗</span></Link> : <span>Ve fázi přípravy</span>}</div></div>
  </article>;
}
export default function ProjectsPage() {
  return <PublicShell active="/projekty"><main className="ppr">
    <section className="ppr-hero"><div className="ppr-hero__copy"><span className="ppr-kicker">PANSOFIE / PROJEKTY</span><h1>Myšlenky, které <em>rostou</em> v realitě.</h1><p>Od prvního nápadu po společnou zkušenost. Poznejte projekty, v nichž se vzdělávání, příroda, lidé a tvořivost propojují v jeden celek.</p><a href="#hlavni-projekty" className="ppr-hero__link">Objevovat projekty <span aria-hidden="true">↓</span></a></div><div className="ppr-hero__photo"><img src="/assets/current/photos/volunteer-garden.webp" alt="Lidé společně pracují v zahradě"/><span>Všechno souvisí se vším.</span></div></section>
    <section id="hlavni-projekty" className="ppr-section"><div className="ppr-heading"><div><span className="ppr-kicker">01 / PROJEKTY V PRAXI</span><h2>Čtyři cesty, jak začít.</h2></div><p>Každý projekt má vlastní zaměření. Všechny ale spojuje jedna myšlenka: učíme se tím, co společně vytváříme.</p></div><div className="ppr-feature-grid">{GATEWAYS.map((project,index)=><GatewayCard project={project} index={index} key={project.href}/>)}</div></section>
    <section className="ppr-manifest"><div><span className="ppr-kicker">OD MYŠLENKY K DOPADU</span><h2>Nejdřív porozumět. Potom společně tvořit.</h2></div><div><p>Projekt může začít na zahradě, ve škole, v dílně nebo v sousedství. Důležitá není jeho velikost, ale smysluplné propojení lidí, znalostí a skutečné potřeby.</p><Link href="/sit">Poznat síť spolupráce <span aria-hidden="true">↗</span></Link></div></section>
    <section className="ppr-section ppr-section--catalog"><div className="ppr-heading"><div><span className="ppr-kicker">02 / ATLAS PROJEKTŮ</span><h2>Další nápady a iniciativy.</h2></div><p>Aktivní projekty, modelové příklady i koncepty. U každého transparentně uvádíme jeho stav.</p></div><div className="ppr-catalog-grid">{PROJECTS.map((project,index)=><CatalogCard project={project} key={project.title+"-"+index}/>)}</div></section>
    <section className="ppr-cta"><div><span className="ppr-kicker">ZAČÍT MALÝM KROKEM</span><h2>Velké změny začínají první zkušeností.</h2><p>Vyzkoušejte první misi Green Hope: vypěstujte svou první rostlinu.</p></div><Link href="/mise/rostlina">Začít první misi <span aria-hidden="true">↗</span></Link></section>
  </main></PublicShell>;
}
