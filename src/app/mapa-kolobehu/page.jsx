import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";

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
  return <PublicShell active="/mapa-kolobehu">
    <section className="pw-visual-hero pw-visual-hero--engine"><div className="pw-visual-hero__copy"><p className="pw-eyebrow">MAPA KOLOBĚHU</p><h1>Nejen kde co je. Hlavně kam může hodnota pokračovat.</h1><p>Mapa koloběhu ukazuje vztah mezi materiály, dovednostmi, školami, projekty a organizacemi. Veřejná vrstva neslouží ke sledování lidí ani k zobrazování jejich přesné polohy.</p></div><div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="MAPA KOLOBĚHU" title="Hodnota pokračuje" detail="zdroj · potřeba · propojení · další použití" flow={["Materiál","Dovednost","Potřeba","Propojení","Další život"]}/></div></section>
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
