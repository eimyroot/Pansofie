import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { IMPACT_DIMENSIONS } from "../../domain/pansofie-content";

export const metadata = {
  title: "Dopad",
  description: "Pansofie sleduje dopad v osmi oddělených dimenzích bez jediného skóre hodnoty člověka.",
};

export default function ImpactPage() {
  return <PublicShell active="/impact">
    <section className="pw-visual-hero pw-visual-hero--engine">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">IMPACT</p><h1>Dopad není jedno číslo.</h1><p>Pansofie odděluje učení, dovednosti, rodinu, komunitu, přírodu, podnikavost a další oblasti. Smyslem není hodnotit člověka, ale zaznamenat konkrétní změny tam, kde pro ně existují podklady.</p></div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="DOPAD" title="Dopad bez jednoho skóre" detail="tvrzení má hranici danou důkazem" flow={["Výstup","Evidence","Kontext","Interpretace"]}/></div>
    </section>

    <EditorialFeatureBand
      eyebrow="DŮKAZ PŘED PŘÍBĚHEM"
      title="Nejdřív konkrétní změna. Teprve potom tvrzení o dopadu."
      text="Pansofie odděluje výstup, pozorování a interpretaci. Když projekt něco vypěstuje, vytvoří nebo skutečně změní, lze zaznamenat konkrétní výsledek a jeho kontext. Bez podkladů nevzniká automatické číslo, certifikát ani marketingová zásluha."
      imageAlt="Lidé spolupracují na konkrétní činnosti, jejíž výsledek lze popsat v kontextu"
      reverse
      items={[["Výstup", "Co se opravdu stalo nebo vzniklo."], ["Evidence", "Čím lze konkrétní tvrzení doložit."], ["Kontext", "Kde, pro koho a za jakých podmínek změna vznikla."], ["Interpretace", "Co lze z výsledku říct bez přehánění a bez hodnocení člověka."]]}
      link={{ href: "/projekty", label: "Vidět dopad v projektovém kontextu" }}
    />

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
