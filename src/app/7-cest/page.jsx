import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
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
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">JAK ROSTEME</p><h1>7 cest k životu v souvislostech.</h1><p>Každá cesta je jiný úhel pohledu na rozvoj člověka. Nejde o typologii ani hodnocení osobnosti. Cesty pomáhají vybírat zkušenosti, které dávají smysl právě teď.</p></div>
      <div className="pw-page-hero__media"><Image src={pansofiePhoto("prague-nature-16x9")} alt="Město, příroda a krajina jako propojený životní prostor" fill priority sizes="(max-width: 780px) 100vw, 46vw"/></div>
    </section>

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
