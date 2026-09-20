import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { CHECKPOINTS } from "../../domain/pansofie-content";
import { pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Mapa",
  description: "Orientační mapa projektů a checkpointů Pansofie bez zveřejňování přesné polohy dětí.",
};

export default function MapPage() {
  return <PublicShell>
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">MAPA PANSOFIE</p><h1>Místa, kde se myšlenka mění ve zkušenost.</h1><p>Mapa má ukazovat projekty, laboratoře a příležitosti. U mladých lidí neslouží k veřejnému sdílení přesné polohy ani k hledání lidí v okolí.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("collaboration-map")} alt="Ilustrační mapa spolupráce a projektů" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>

    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">BEZPEČNOST PŘEDEVŠÍM</p><h2>Projekt ano. Přesná poloha dítěte ne.</h2></div>
      <div><p>Veřejná mapa pracuje s projekty a místy vhodnými ke zveřejnění. Osobní poloha, domácí adresa nebo živý pohyb dítěte na veřejnou vrstvu nepatří.</p><small>Body níže jsou DEMO data z produktového modelu.</small></div>
    </section>
    <section className="pw-map-board" aria-label="Orientační přehled checkpointů">
      <div className="pw-map-board__scene"><Image src={pansofieScene("collaboration-map")} alt="" fill sizes="100vw"/></div>
      <div className="pw-checkpoint-grid">{CHECKPOINTS.map(([title, place, type, status]) => <article key={title}><span>{type}</span><h3>{title}</h3><p>{place}</p><small>{status}</small></article>)}</div>
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">OD MAPY K AKCI</p><h2>Smyslem mapy není sledovat. Smyslem je najít bezpečný vstup do projektu.</h2><p>První skutečný projektový flow už funguje v Green Hope a Pansofie GO.</p></div>
      <Link className="pw-button pw-button--dark" href="/projekty">Prozkoumat projekty</Link>
    </section>
  </PublicShell>;
}
