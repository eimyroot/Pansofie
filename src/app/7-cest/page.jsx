import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { PATHS } from "../../domain/pansofie-content";
import { DEVELOPMENT_PATHS } from "../../domain/learning-core";
import { pathIcon, pansofiePhoto } from "../../domain/asset-system";

export const metadata = {
  title: "7 cest",
  description: "Sedm rozvojových cest Pansofie: Tělo, Mysl, Charakter, Vztahy, Tvořivost, Prosperita a Smysl.",
};

const PUBLIC_PATHS = PATHS.map(([title, text], index) => ({ id: DEVELOPMENT_PATHS[index].id, title, text }));

export default function PathsPage() {
  return <PublicShell active="/7-cest">
    <section className="pw-visual-hero pw-visual-hero--discover-paths">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">JAK ROSTEME</p><h1>7 cest k životu v souvislostech.</h1><p>Každá cesta je jiný úhel pohledu na rozvoj člověka. Nejde o typologii ani hodnocení osobnosti. Cesty pomáhají vybírat zkušenosti, které dávají smysl právě teď.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/projekty">Vidět cesty v praxi</Link><Link className="pw-button pw-button--light" href="/16-oblasti">16 oblastí</Link></div></div>
      <div className="pw-visual-hero__media"><Image src={pansofiePhoto("prague-nature-16x9")} alt="Město, příroda a krajina jako propojený životní prostor" fill priority sizes="(max-width: 900px) 100vw, 58vw"/><div className="pw-visual-hero__note">tělo · mysl · charakter · vztahy · tvořivost · prosperita · smysl</div></div>
    </section>
    <nav className="pw-discover-icon-grid pw-discover-icon-grid--paths" aria-label="Přehled 7 cest">
      {PUBLIC_PATHS.map((path, index) => <a href={`#${path.id}`} className="pw-discover-icon-card" key={path.id}><span>{String(index + 1).padStart(2,"0")}</span><Image src={pathIcon(path.id)} alt="" width={52} height={52} aria-hidden="true"/><strong>{path.title}</strong></a>)}
    </nav>

    <EditorialFeatureBand
      eyebrow="RŮST BEZ ŽEBŘÍČKU"
      title="Cesta není skóre. Je to směr, který si člověk může právě teď otevřít."
      text="Sedm cest pomáhá rozpoznat, jaký druh zkušenosti nebo rozvoje dává v určité chvíli smysl. Nemají pořadí, vítěze ani ideální profil. Jeden projekt může současně rozvíjet tělo, vztahy, tvořivost i prosperitu a v jiné životní situaci bude důležitá úplně jiná kombinace."
      image={pansofiePhoto("growing-together-16x9")}
      imageAlt="Lidé různých generací spolupracují a rozvíjejí různé schopnosti v jednom projektu"
      reverse
      items={[["Všestranně", "Více cest se může potkat v jedné zkušenosti."], ["Dobrovolně", "Člověk si vybírá, čemu chce právě teď věnovat pozornost."], ["V kontextu", "Stejná cesta vypadá jinak doma, ve škole, v práci nebo projektu."], ["Bez pořadí", "Žádná cesta není vyšší, lepší ani povinná pro všechny."]]}
      link={{ href: "/projekty", label: "Vidět cesty v konkrétních projektech" }}
    />

    <section className="pw-path-list">
      {PUBLIC_PATHS.map((path, index) => <article className="pw-path-detail" id={path.id} key={path.id}>
        <div className="pw-path-detail__number">{String(index + 1).padStart(2,"0")}</div>
        <Image src={pathIcon(path.id)} alt="" aria-hidden="true" width={76} height={76}/>
        <div><p className="pw-eyebrow">CESTA {String(index + 1).padStart(2,"0")}</p><h2>{path.title}</h2><p>{path.text}</p></div>
      </article>)}
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">OD ORIENTACE K ČINU</p><h2>Cesta dostává smysl ve zkušenosti.</h2><p>Projekty propojují více oblastí i cest najednou a dávají prostor něco opravdu vyzkoušet, vytvořit a sdílet.</p></div>
      <Link className="pw-button pw-button--dark" href="/projekty">Prozkoumat projekty</Link>
    </section>
  </PublicShell>;
}
