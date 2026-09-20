import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Mapa koloběhu",
  description: "Jak mohou v Pansofii obíhat materiály, zkušenosti, projekty a pomoc mezi ověřenými kontexty.",
};

const LAYERS = [
  ["Materiály", "Přebytky, vybavení a zdroje, které mohou najít další využití."],
  ["Dovednosti", "Zkušenost, mentoring a praktická pomoc mezi generacemi a projekty."],
  ["Školy a projekty", "Konkrétní potřeby, které dávají propojení jasný smysl a kontext."],
  ["Organizace", "Know-how, kapacita a zdroje, které mohou vstoupit do místní spolupráce."],
];
export default function CycleMapPage() {
  return <PublicShell>
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">MAPA KOLOBĚHU</p><h1>Nejen kde co je. Hlavně kam může hodnota pokračovat.</h1><p>Mapa koloběhu ukazuje vztah mezi materiály, dovednostmi, školami, projekty a organizacemi. Veřejná vrstva neslouží ke sledování lidí ani k zobrazování jejich přesné polohy.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("collaboration-map")} alt="Schéma oběhu zdrojů, projektů a zkušeností" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <section className="pw-story-principles">
      {LAYERS.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}
    </section>
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">VEŘEJNÁ VS. APLIKAČNÍ MAPA</p><h2>Veřejně jen to, co je bezpečné zveřejnit.</h2></div>
      <div><p>Skutečné geolokační funkce, rezervace nebo práce s aktuální polohou patří až do oprávněného aplikačního kontextu. Veřejný web ukazuje princip a modelové typy uzlů.</p></div>
    </section>
    <section className="pw-next"><div><p className="pw-eyebrow">DALŠÍ VRSTVA</p><h2>Koloběh začíná konkrétním přebytkem nebo potřebou.</h2></div><Link className="pw-button pw-button--dark" href="/digitalni-kompost">Poznat Digitální kompost</Link></section>
  </PublicShell>;
}
