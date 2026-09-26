import { PublicShell } from "../../components/public/PublicShell";
import { DiscoverFamilyNav, DiscoverHero, DiscoverNext } from "../../components/public/PansofieDiscoverFrame";
import { ECOSYSTEM_CHAIN, ECOSYSTEM_PRINCIPLE, KNOWLEDGE_EXCHANGE } from "../../domain/pansofie-content";

export const metadata = {
  title: "O Pansofii",
  description: "Pansofie propojuje člověka, rodinu, školu, komunitu, přírodu, ekonomiku a společnost do jednoho rámce učení pro život.",
};

const PRINCIPLES = [
  ["01", "Souvislosti", "Šestnáct oblastí není šestnáct izolovaných přihrádek. Pansofie hledá vztahy mezi nimi."],
  ["02", "Zkušenost", "Poznání může přejít do činu, tvorby nebo služby bez nucení člověka do jednoho postupu."],
  ["03", "Spolupráce", "Rodiny, školy, komunity a organizace mohou sdílet projekty a kontext, aniž by mizela osobní identita."],
  ["04", "Odpovědnost", "Bezpečnost, přesnost tvrzení a transparentní označení prototypů jsou součástí produktu."],
];

export default function AboutPage() {
  return <PublicShell active="/o-nas">
    <DiscoverFamilyNav active="/o-nas"/>
    <DiscoverHero variant="about" kicker="O PANSOFII" title={<>Člověk, příroda a společnost nejsou oddělené světy.</>} lead="Pansofie vzniká jako rámec pro učení v souvislostech. Spojuje poznání, zkušenost, tvorbu, spolupráci a reflexi tak, aby se vzdělávání mohlo vrátit do skutečného života." primary={{href:"/16-oblasti",label:"Objevit 16 oblastí"}} secondary={{href:"/7-cest",label:"Projít 7 cest"}}/>

    <section className="d02-statement d02-statement--about">
      <div><p className="d02-kicker">UČENÍ ŽIVOTEM</p><h2>Moudrost není sbírka odpovědí. Je schopnost vidět vztahy.</h2></div>
      <div><p>Pansofie propojuje člověka, rodinu, místo, přírodu, technologie i společnost. Smyslem není přidat další oddělený předmět, ale pomoci vidět, jak rozhodnutí v jedné oblasti ovlivňuje ostatní.</p><blockquote>{ECOSYSTEM_PRINCIPLE}</blockquote></div>
    </section>

    <section className="d02-principles" aria-label="Principy Pansofie">{PRINCIPLES.map(([n,title,text])=><article key={n}><span>{n}</span><h2>{title}</h2><p>{text}</p></article>)}</section>

    <section className="d02-chain" aria-labelledby="d02-chain-title">
      <header><p className="d02-kicker">EKOSYSTÉM</p><h2 id="d02-chain-title">Každý uzel může být vstupem.</h2><p>{KNOWLEDGE_EXCHANGE} Stejný princip platí pro rodinu, školu, komunitu i praktický projekt.</p></header>
      <ol>{ECOSYSTEM_CHAIN.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong></li>)}</ol>
    </section>

    <DiscoverNext kicker="ZAČÍT ORIENTACÍ" title="Pochopit rámec a pak si vybrat vlastní vstup." text="Nejrychlejší cestou je projít šestnáct oblastí a sedm cest, které drží celý systém pohromadě." href="/16-oblasti" label="Objevit 16 oblastí"/>
  </PublicShell>;
}
