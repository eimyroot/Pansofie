import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { PansofieArtPanel } from "../../components/public/PansofieArtPanel";
import { CHECKPOINTS } from "../../domain/pansofie-content";

export const metadata = {
  title: "Mapa",
  description: "Orientační mapa projektů a checkpointů Pansofie bez zveřejňování přesné polohy dětí.",
};

export default function MapPage() {
  return <PublicShell active="/mapa">
    <section className="pw-visual-hero pw-visual-hero--engine"><div className="pw-visual-hero__copy"><p className="pw-eyebrow">MAPA PANSOFIE</p><h1>Místa, kde se myšlenka mění ve zkušenost.</h1><p>Mapa má ukazovat projekty, laboratoře a příležitosti. U mladých lidí neslouží k veřejnému sdílení přesné polohy ani k hledání lidí v okolí.</p></div><div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="MAPA PANSOFIE" title="Místa a příležitosti" detail="veřejný kontext · ne poloha člověka" flow={["Projekt","Místo","Checkpoint","Soukromí"]}/></div></section>

    <EditorialFeatureBand
      eyebrow="MÍSTO, NE POLOHA ČLOVĚKA"
      title="Mapa ukazuje příležitosti. Ne lidi pod lupou."
      text="Veřejná vrstva může ukázat projekt, zahradu, školu, laboratoř nebo jiné místo, které je bezpečné zveřejnit. Osobní poloha, domácí adresa ani živý pohyb dítěte nejsou veřejným obsahem Pansofie."
      imageAlt="Město a příroda jako veřejný prostor pro projekty a zkušenosti"
      items={[["Projekt", "Konkrétní záměr, ke kterému se lze bezpečně vztáhnout."], ["Místo", "Veřejně vhodná lokalita, ne soukromá adresa člověka."], ["Checkpoint", "Orientační bod s jasným účelem a kontextem."], ["Soukromí", "Žádné veřejné sledování lidí, dětí ani jejich živého pohybu."]]}
      link={{ href: "/sit", label: "Jak se místa propojují se sítí Pansofie" }}
    />

    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">BEZPEČNOST PŘEDEVŠÍM</p><h2>Projekt ano. Přesná poloha dítěte ne.</h2></div>
      <div><p>Veřejná mapa pracuje s projekty a místy vhodnými ke zveřejnění. Osobní poloha, domácí adresa nebo živý pohyb dítěte na veřejnou vrstvu nepatří.</p><small>Body níže jsou DEMO data z produktového modelu.</small></div>
    </section>
    <section className="pw-map-board" aria-label="Orientační přehled checkpointů">
      <div className="pw-map-board__scene"><PansofieArtPanel eyebrow="MAPA PANSOFIE" title="Místa propojená účelem" detail="projekt · místo · checkpoint · bezpečný kontext" nodes={["Projekt","Místo","Checkpoint","Síť"]} variant="city"/></div>
      <div className="pw-checkpoint-grid">{CHECKPOINTS.map(([title, place, type, status]) => <article key={title}><span>{type}</span><h3>{title}</h3><p>{place}</p><small>{status}</small></article>)}</div>
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">OD MAPY K AKCI</p><h2>Smyslem mapy není sledovat. Smyslem je najít bezpečný vstup do projektu.</h2><p>První skutečný projektový flow už funguje v Green Hope a Pansofie GO.</p></div>
      <Link className="pw-button pw-button--dark" href="/projekty">Prozkoumat projekty</Link>
    </section>
  </PublicShell>;
}
