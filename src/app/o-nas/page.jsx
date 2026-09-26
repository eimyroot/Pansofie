import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { ECOSYSTEM_CHAIN, ECOSYSTEM_PRINCIPLE, KNOWLEDGE_EXCHANGE } from "../../domain/pansofie-content";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "O Pansofii",
  description: "Pansofie propojuje člověka, rodinu, školu, komunitu, přírodu, ekonomiku a společnost do jednoho rámce učení pro život.",
};

export default function AboutPage() {
  return <PublicShell active="/o-nas">
    <section className="pw-visual-hero pw-visual-hero--discover-about">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">O PANSOFII</p><h1>Člověk, příroda a společnost nejsou oddělené světy.</h1><p>Pansofie vzniká jako rámec pro učení v souvislostech. Spojuje poznání, zkušenost, tvorbu, spolupráci a reflexi tak, aby se vzdělávání mohlo vrátit do skutečného života.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/16-oblasti">Objev 16 oblastí</Link><Link className="pw-button pw-button--light" href="/7-cest">Projít 7 cest</Link></div></div>
      <div className="pw-visual-hero__media"><Image src={pansofiePhoto("prague-nature-16x9")} alt="Město a příroda jako propojený životní prostor" fill priority sizes="(max-width: 900px) 100vw, 58vw"/><div className="pw-visual-hero__note">lidé · příroda · města · budoucnost</div></div>
    </section>
    <section className="pw-discover-gateway" aria-label="Hlavní vstupy do Pansofie">
      <Link href="/16-oblasti" className="pw-discover-gateway__card"><div><Image src={pansofiePhoto("curiosity-nature-16x9")} alt="" fill sizes="(max-width: 700px) 100vw, 25vw"/></div><span>01 · POZNÁNÍ</span><h2>16 oblastí</h2><p>Mapa témat, která se v životě přirozeně prolínají.</p></Link>
      <Link href="/7-cest" className="pw-discover-gateway__card"><div><Image src={pansofiePhoto("growing-together-16x9")} alt="" fill sizes="(max-width: 700px) 100vw, 25vw"/></div><span>02 · RŮST</span><h2>7 cest</h2><p>Sedm způsobů, jak se může zkušenost proměnit v rozvoj.</p></Link>
      <Link href="/projekty" className="pw-discover-gateway__card"><div><Image src={pansofieScene("urban-farm-system")} alt="" fill sizes="(max-width: 700px) 100vw, 25vw"/></div><span>03 · PRAXE</span><h2>Projekty</h2><p>Místo, kde se poznání setká s konkrétní činností.</p></Link>
      <Link href="/blog" className="pw-discover-gateway__card"><div><Image src={pansofieScene("knowledge-journal")} alt="" fill sizes="(max-width: 700px) 100vw, 25vw"/></div><span>04 · SOUVISLOSTI</span><h2>Články</h2><p>Příběhy a zdroje, které pomáhají vidět širší kontext.</p></Link>
    </section>

    <EditorialFeatureBand
      eyebrow="UČENÍ ŽIVOTEM"
      title="Moudrost není sbírka odpovědí. Je schopnost vidět vztahy."
      text="Pansofie propojuje člověka, rodinu, místo, přírodu, technologie i společnost. Smyslem není přidat další oddělený předmět, ale pomoci vidět, jak rozhodnutí v jedné oblasti ovlivňuje ostatní."
      image={pansofiePhoto("growing-together-16x9")}
      imageAlt="Lidé různých generací spolupracují v prostředí propojeném s přírodou"
      items={[["Člověk", "Poznání sebe, těla, mysli, emocí a vlastních rozhodnutí."], ["Rodina", "První tým, ve kterém se zkušenost, péče a odpovědnost potkávají."], ["Místo", "Škola, město a příroda jako prostředí pro skutečné učení."], ["Svět", "Poznání, které může přejít do tvorby, pomoci a odpovědné změny."]]}
      link={{ href: "/jak-to-funguje", label: "Jak se rámec převádí do praxe" }}
    />

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
