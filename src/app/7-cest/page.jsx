import { PublicShell } from "../../components/public/PublicShell";
import { DiscoverFamilyNav, DiscoverHero, DiscoverNext } from "../../components/public/PansofieDiscoverFrame";
import { PATHS } from "../../domain/pansofie-content";
import { DEVELOPMENT_PATHS } from "../../domain/learning-core";

export const metadata = {
  title: "7 cest",
  description: "Sedm rozvojových cest Pansofie: Tělo, Mysl, Charakter, Vztahy, Tvořivost, Prosperita a Smysl.",
};

const PUBLIC_PATHS = PATHS.map(([title, text], index) => ({ id: DEVELOPMENT_PATHS[index].id, title, text }));
const RULES = [
  ["01", "Všestranně", "Více cest se může potkat v jedné zkušenosti."],
  ["02", "Dobrovolně", "Člověk si vybírá, čemu chce právě teď věnovat pozornost."],
  ["03", "V kontextu", "Stejná cesta vypadá jinak doma, ve škole, v práci nebo projektu."],
  ["04", "Bez pořadí", "Žádná cesta není vyšší, lepší ani povinná pro všechny."],
];

export default function PathsPage() {
  return <PublicShell active="/7-cest">
    <DiscoverFamilyNav active="/7-cest"/>
    <DiscoverHero variant="paths" kicker="JAK ROSTEME" title={<>7 cest k životu v souvislostech.</>} lead="Každá cesta je jiný úhel pohledu na rozvoj člověka. Nejde o typologii ani hodnocení osobnosti. Cesty pomáhají vybírat zkušenosti, které dávají smysl právě teď." primary={{href:"/projekty",label:"Vidět cesty v praxi"}} secondary={{href:"/16-oblasti",label:"16 oblastí života"}} paths={PUBLIC_PATHS}/>

    <section className="d02-statement d02-statement--paths">
      <div><p className="d02-kicker">RŮST BEZ ŽEBŘÍČKU</p><h2>Cesta není skóre. Je to směr, který si člověk může právě teď otevřít.</h2></div>
      <div><p>Sedm cest pomáhá rozpoznat, jaký druh zkušenosti nebo rozvoje dává v určité chvíli smysl. Jeden projekt může současně rozvíjet tělo, vztahy, tvořivost i prosperitu.</p></div>
    </section>
    <section className="d02-rule-ledger" aria-label="Pravidla sedmi cest">{RULES.map(([n,title,text])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</section>

    <section className="d02-path-details" aria-label="Detail sedmi cest">{PUBLIC_PATHS.map((path,index)=><article className={`d02-path-detail is-${index+1}`} id={path.id} key={path.id}><span>{String(index+1).padStart(2,"0")}</span><h2>{path.title}</h2><p>{path.text}</p><small>CESTA {String(index+1).padStart(2,"0")}</small></article>)}</section>

    <DiscoverNext kicker="OD ORIENTACE K ČINU" title="Cesta dostává smysl ve zkušenosti." text="Projekty propojují více oblastí i cest najednou a dávají prostor něco opravdu vyzkoušet, vytvořit a sdílet." href="/projekty" label="Prozkoumat projekty"/>
  </PublicShell>;
}
