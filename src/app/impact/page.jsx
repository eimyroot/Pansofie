import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { IMPACT_DIMENSIONS } from "../../domain/pansofie-content";
import { pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Dopad",
  description: "Pansofie sleduje dopad v osmi oddělených dimenzích bez jediného skóre hodnoty člověka.",
};

export default function ImpactPage() {
  return <PublicShell active="/impact">
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">IMPACT</p><h1>Dopad není jedno číslo.</h1><p>Pansofie odděluje učení, dovednosti, rodinu, komunitu, přírodu, podnikavost a další oblasti. Smyslem není hodnotit člověka, ale zaznamenat konkrétní změny tam, kde pro ně existují podklady.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("impact-index")} alt="Schéma více rozměrů dopadu Pansofie" fill priority sizes="(max-width: 780px) 100vw, 46vw"/></div>
    </section>

    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">OSM DIMENZÍ</p><h2>Vidět změnu bez zjednodušení člověka.</h2></div>
      <div><p>Jednotlivé pozorování dopadu má vlastní kontext a zdroj. Pansofie z nich nevyrábí veřejnou reputaci ani celkové skóre osobnosti.</p><small>Pokud nejsou k dispozici skutečná data, stránka netvrdí, že dopad nastal.</small></div>
    </section>

    <section className="pw-impact-grid">
      {IMPACT_DIMENSIONS.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{text}</p></article>)}
    </section>

    <section className="pw-impact-rules">
      <article><p className="pw-eyebrow">01 · VÝSTUP</p><h3>Co se skutečně stalo.</h3><p>Dokončená aktivita, vytvořený výstup, odpracovaný čas nebo jiný konkrétní záznam.</p></article>
      <article><p className="pw-eyebrow">02 · POZOROVÁNÍ</p><h3>Co lze doložit.</h3><p>Zkušenost, evidence nebo měření se ukládá odděleně od herních bodů a od hodnocení člověka.</p></article>
      <article><p className="pw-eyebrow">03 · TVRZENÍ</p><h3>Jen tolik, kolik víme.</h3><p>Modelový projekt není automaticky skutečný ekologický dopad. Pansofie má raději menší přesné tvrzení než větší marketingový příběh.</p></article>
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">DOPAD V PRAXI</p><h2>Projekt je místo, kde se více dimenzí může potkat.</h2><p>Green Hope projektový model už používá oddělené dimenze dopadu bez agregovaného skóre.</p></div>
      <Link className="pw-button pw-button--dark" href="/projekty">Prozkoumat projekty</Link>
    </section>
  </PublicShell>;
}
