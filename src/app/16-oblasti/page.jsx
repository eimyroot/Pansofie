import { PublicShell } from "../../components/public/PublicShell";
import { DiscoverFamilyNav, DiscoverHero, DiscoverNext } from "../../components/public/PansofieDiscoverFrame";
import { DOMAIN_DETAILS } from "../../domain/pansofie-content";
import { LEARNING_DOMAINS } from "../../domain/learning-core";

export const metadata = {
  title: "16 oblastí života",
  description: "Šestnáct propojených oblastí Pansofie od Já a Těla po Občanství a Smysl života.",
};

const PUBLIC_DOMAINS = DOMAIN_DETAILS.map(([title, text], index) => ({ id: LEARNING_DOMAINS[index].id, title, text }));
const RELATIONS = [
  ["Já + tělo", "Vnitřní stav ovlivňuje rozhodování, energii i vztahy."],
  ["Vztahy + rodina", "Blízké prostředí formuje způsob, jak spolupracujeme a pečujeme."],
  ["Práce + technologie", "Nástroje, tvorba hodnoty a odpovědnost se vyvíjejí společně."],
  ["Příroda + společnost", "Místo, zdroje a občanská rozhodnutí patří do stejného světa."],
];

export default function DomainsPage() {
  return <PublicShell active="/16-oblasti">
    <DiscoverFamilyNav active="/16-oblasti"/>
    <DiscoverHero variant="domains" kicker="CO POZNÁVÁME" title={<>16 oblastí.<br/>Jeden život.</>} lead="Život není rozdělený do předmětů. Tělo ovlivňuje mysl, vztahy rodinu, technologie společnost a naše rozhodnutí svět kolem nás. Pansofie proto pracuje se šestnácti oblastmi jako s jedním propojeným celkem." primary={{href:"#self",label:"Otevřít atlas oblastí"}} secondary={{href:"/7-cest",label:"7 cest růstu"}} domains={PUBLIC_DOMAINS}/>

    <section className="d02-statement d02-statement--domains">
      <div><p className="d02-kicker">MAPA SOUVISLOSTÍ</p><h2>Šestnáct oblastí není šestnáct šuplíků.</h2></div>
      <div><p>Skutečný život protíná více oblastí najednou. Oblasti proto slouží jako mapa pro otázky, ne jako oddělené školní předměty.</p></div>
    </section>
    <section className="d02-relation-ledger" aria-label="Příklady vztahů mezi oblastmi">{RELATIONS.map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>

    <section className="d02-domain-ledger" aria-label="16 oblastí života">{PUBLIC_DOMAINS.map((domain,index)=><article id={domain.id} key={domain.id}><span>{String(index+1).padStart(2,"0")}</span><h2>{domain.title}</h2><p>{domain.text}</p></article>)}</section>

    <DiscoverNext kicker="CO DÁL" title="Oblasti jsou obsah. Cesty jsou způsob růstu." text="Stejnou oblast můžeme poznávat z různých stran a v různých životních situacích. Sedm cest dává rozvoji další orientaci." href="/7-cest" label="Pokračovat na 7 cest"/>
  </PublicShell>;
}
