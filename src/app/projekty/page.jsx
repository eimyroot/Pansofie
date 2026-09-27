import { PublicShell } from "../../components/public/PublicShell";
import { ProjectFamilyNav, ProjectHero, ProjectIndex, ProjectLedger, ProjectNext, ProjectStatement, ProjectTruth } from "../../components/public/PansofieProjectsFrame";
import { PROJECTS } from "../../domain/pansofie-content";

export const metadata = { title: "Projekty", description: "Programy, modelové projekty a koncepty Pansofie, které propojují učení se skutečným životem." };

const MAIN_PROJECTS = [
  {title:"Green Hope",text:"Pěstování, půda, voda, biodiverzita a péče o konkrétní místo.",href:"/green-hope",label:"PŘÍRODA",status:"Idea / prototyp"},
  {title:"Urban Family Farm",text:"Pěstování propojené s prací, ekonomikou a tvorbou hodnoty.",href:"/urban-family-farm",label:"MĚSTO · HODNOTA",status:"Prototyp"},
  {title:"Digitální kompost",text:"Materiály a věci dostávají další smysluplné použití.",href:"/digitalni-kompost",label:"MATERIÁLY",status:"Koncept"},
  {title:"Pansofie Labs",text:"Bezpečný prostor pro malé pokusy, pozorování a ověřitelné prototypy.",href:"/labs",label:"EXPERIMENT",status:"Laboratorní rámec"},
];
const PROJECT_LINKS = { "Family Team": "/family-team", "Komunitní zahrada": "/mise/rostlina", "Knowledge Exchange": "/sit" };
const SECONDARY = PROJECTS.filter((item)=>!["Green Hope","Urban Family Farm"].includes(item.title));

export default function ProjectsPage(){return <PublicShell active="/projekty">
  <ProjectFamilyNav active="/projekty"/>
  <ProjectHero variant="overview" kicker="UČENÍ V PRAXI" title={<>Projekty dávají souvislostem skutečný tvar.</>} lead="Pansofie propojuje poznání s konkrétní zkušeností. Každý projekt má jinou roli: někde začínáme místem, jinde materiálem, prací nebo otázkou." primary={{href:"/green-hope",label:"Otevřít Green Hope"}} secondary={{href:"/labs",label:"Pansofie Labs"}}/>
  <ProjectStatement kicker="OD MÍSTA K PROJEKTU" title="Projekt není další šuplík. Je to místo, kde se věci potkají." text="Místo, lidé, znalosti a skutečná potřeba vytvářejí kontext, ve kterém dává učení smysl. Proto mají projekty rozdílnou podobu a nemají být sjednocené do jedné univerzální kartičky." aside="Malý konkrétní projekt je pro Pansofii cennější než velký abstraktní slib."/>
  <ProjectIndex items={MAIN_PROJECTS}/>
  <section className="pr02-ledger-head"><p className="pr02-kicker">DALŠÍ MODELY A KONCEPTY</p><h2>Transparentně podle skutečného stavu.</h2><p>Modelový projekt je označený jako model. Koncept není vydáván za existující provoz ani za naměřený dopad.</p></section>
  <ProjectLedger items={SECONDARY} links={PROJECT_LINKS}/>
  <ProjectTruth>Některé položky jsou prototypy nebo koncepty. Veřejný přehled je neprezentuje jako hotové programy, neukazuje falešné lokality ani nevyrábí souhrnné skóre dopadu. Stav každého projektu je součástí informace.</ProjectTruth>
  <ProjectNext kicker="ZAČÍT MALÝM KROKEM" title="První konkrétní zkušenost může být opravdu malá." text="Mise „Vypěstuj první rostlinu“ propojuje Green Hope s akčním jádrem Pansofie bez povinné fotografie nebo veřejné reflexe." href="/mise/rostlina" label="Vypěstuj první rostlinu"/>
</PublicShell>}
