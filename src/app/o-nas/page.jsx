import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { ECOSYSTEM_CHAIN, ECOSYSTEM_PRINCIPLE, KNOWLEDGE_EXCHANGE } from "../../domain/pansofie-content";
import { pansofiePhoto } from "../../domain/asset-system";

export const metadata = {
  title: "O Pansofii",
  description: "Pansofie propojuje člověka, rodinu, školu, komunitu, přírodu, ekonomiku a společnost do jednoho rámce učení pro život.",
};

export default function AboutPage() {
  return <PublicShell>
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">O PANSOFII</p><h1>Člověk, příroda a společnost nejsou oddělené světy.</h1><p>Pansofie vzniká jako rámec pro učení v souvislostech. Spojuje poznání, zkušenost, tvorbu, spolupráci a reflexi tak, aby se vzdělávání mohlo vrátit do skutečného života.</p></div>
      <div className="pw-page-hero__media"><Image src={pansofiePhoto("prague-nature-16x9")} alt="Město a příroda jako propojený životní prostor" fill priority sizes="(max-width: 780px) 100vw, 46vw"/></div>
    </section>

    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">PRINCIP</p><h2>{ECOSYSTEM_PRINCIPLE}</h2></div>
      <div><p>Pansofie není jeden kurz ani jedna aplikace. Veřejný web vysvětluje rámec, Young přizpůsobuje zkušenost mladým a GO převádí poznání do konkrétních misí, projektů a portfolia.</p></div>
    </section>
    <section className="pw-ecosystem-chain">
      <div><p className="pw-eyebrow">EKOSYSTÉM</p><h2>Každý uzel může být vstupem.</h2><p>{KNOWLEDGE_EXCHANGE} Stejný princip platí pro rodinu, školu, komunitu i praktický projekt.</p></div>
      <ol>{ECOSYSTEM_CHAIN.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol>
    </section>

    <section className="pw-about-values">
      <article><span>01</span><h2>Souvislosti</h2><p>Šestnáct oblastí není šestnáct izolovaných přihrádek. Pansofie hledá vztahy mezi nimi.</p></article>
      <article><span>02</span><h2>Zkušenost</h2><p>Poznání má mít možnost přejít do činu, tvorby nebo služby, ale bez nucení člověka do jednoho předepsaného postupu.</p></article>
      <article><span>03</span><h2>Spolupráce</h2><p>Rodiny, školy, komunity a organizace mohou sdílet projekty a kontext, aniž by zanikla individuální identita a soukromí.</p></article>
      <article><span>04</span><h2>Odpovědnost</h2><p>Bezpečnost mladých, přesnost tvrzení a transparentní označení prototypů jsou součástí produktu, ne poznámka pod čarou.</p></article>
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">ZAČÍT ORIENTACÍ</p><h2>Pochopit rámec a pak si vybrat vlastní vstup.</h2><p>Nejrychlejší cestou je projít šestnáct oblastí a sedm cest, které drží celý systém pohromadě.</p></div>
      <Link className="pw-button pw-button--dark" href="/16-oblasti">Objev 16 oblastí</Link>
    </section>
  </PublicShell>;
}
