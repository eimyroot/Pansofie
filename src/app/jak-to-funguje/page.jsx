import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { LEARNING_METHOD, ECOSYSTEM_CHAIN } from "../../domain/pansofie-content";
import { pansofiePhoto } from "../../domain/asset-system";

export const metadata = {
  title: "Jak Pansofie funguje",
  description: "Pansofie nabízí možnosti poznávat, zkoušet, tvořit, sdílet a reflektovat bez povinného skórování člověka.",
};

const FLOW = [
  ["Rozhlédnout se", "Vybrat oblast, téma, projekt nebo situaci, která právě dává smysl."],
  ["Vyzkoušet", "Udělat konkrétní krok v reálném světě bez povinnosti všechno dokumentovat."],
  ["Vytvořit", "Proměnit poznání v něco vlastního: výrobek, řešení, péči, pomoc nebo projekt."],
  ["Sdílet", "Předat zkušenost dál, když je to vhodné a bezpečné. Sdílení není povinné."],
  ["Reflektovat", "Zastavit se u toho, co fungovalo, co ne a co má smysl zkusit příště."],
];

export default function HowItWorksPage() {
  return <PublicShell>
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">JAK PANSOFIE FUNGUJE</p><h1>Možnost něco udělat. Ne další systém povinností.</h1><p>Pansofie vytváří cesty od poznání ke zkušenosti. Člověk se může rozhlédnout, vybrat si smysluplný vstup a pokračovat vlastním tempem.</p></div>
      <div className="pw-page-hero__media"><Image src={pansofiePhoto("hero-community-left-safe-16x9")} alt="Lidé v prostředí propojujícím město, přírodu a komunitu" fill priority sizes="(max-width: 780px) 100vw, 46vw"/></div>
    </section>

    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">ZÁKLADNÍ PRINCIP</p><h2>Pansofie nabízí příležitost. Nevytváří povinnost.</h2></div>
      <div><p>Žádný veřejný žebříček hodnoty člověka, žádný povinný důkaz každého kroku a žádné předstírání, že jedno číslo dokáže popsat rozvoj. Dokumentace má smysl tam, kde chce člověk vytvořit doloženou zkušenost, skill nebo portfolio.</p></div>
    </section>
    <section className="pw-how-flow">
      {FLOW.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{text}</p></article>)}
    </section>

    <section className="pw-story-sequence">
      <div className="pw-section__head">
        <div><p className="pw-eyebrow">UČEBNÍ CYKLUS</p><h2>Šest fází, které se mohou vracet.</h2></div>
        <p>Pro hlubší zkušenosti používá Pansofie cyklus Poznej, Hraj, Udělej, Vytvoř, Sdílej, Reflektuj. Není to povinný checklist pro každou drobnost.</p>
      </div>
      <ol>{LEARNING_METHOD.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol>
    </section>

    <section className="pw-ecosystem-chain">
      <div><p className="pw-eyebrow">VŠECHNO SOUVISÍ SE VŠÍM</p><h2>Začít lze kdekoli.</h2><p>Člověk nemusí projít systém od začátku. Pansofie chápe život jako síť vztahů, ve které může být vstupem rodina, škola, komunita, příroda nebo konkrétní projekt.</p></div>
      <ol>{ECOSYSTEM_CHAIN.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol>
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">VYZKOUŠET V PRAXI</p><h2>První krok nemusí být velký.</h2><p>Green Hope už nabízí první konkrétní misi propojenou s akčním jádrem Pansofie.</p></div>
      <Link className="pw-button pw-button--dark" href="/green-hope">Poznat Green Hope</Link>
    </section>
  </PublicShell>;
}
