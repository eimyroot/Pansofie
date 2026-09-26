import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { LEARNING_METHOD, ECOSYSTEM_CHAIN } from "../../domain/pansofie-content";

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
  return <PublicShell active="/jak-to-funguje">
    <section className="pw-visual-hero pw-visual-hero--engine">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">JAK PANSOFIE FUNGUJE</p><h1>Možnost něco udělat. Ne další systém povinností.</h1><p>Pansofie vytváří cesty od poznání ke zkušenosti. Člověk se může rozhlédnout, vybrat si smysluplný vstup a pokračovat vlastním tempem.</p></div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="JAK PANSOFIE FUNGUJE" title="Od orientace ke zkušenosti" detail="příležitost · ne povinnost" flow={["Rozhlédnout se","Vyzkoušet","Vytvořit","Sdílet","Reflektovat"]}/></div>
    </section>

    <EditorialFeatureBand
      eyebrow="JEDEN EKOSYSTÉM · TŘI ZKUŠENOSTI"
      title="Pansofie vysvětluje. Young překládá svět mladým. GO umožňuje jednat."
      text="Veřejná Pansofie drží společný rámec a souvislosti. Pansofie Young je samostatná zkušenost pro děti a mladé. PansofieGO je aplikace pro celý ekosystém, ve které se podle věku a kontextu pracuje s misemi, projekty, týmy, portfoliem a dalšími akcemi."
      imageAlt="Lidé v městském prostředí, kde se potkává učení, komunita a praktická činnost"
      items={[["Pansofie", "Společný obsahový, filozofický a metodický rámec."], ["Pansofie Young", "Vlastní jazyk, obsah a vizuální zkušenost pro mladé."], ["PansofieGO", "Společná akční aplikace pro celý ekosystém podle role a kontextu."], ["Skutečný svět", "Místo, kde se poznání mění ve zkušenost, dovednost a konkrétní výsledek."]]}
      link={{ href: "/pansofie-go", label: "Poznat PansofieGO" }}
    />

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
      <div><p className="pw-eyebrow">OD ORIENTACE K AKCI</p><h2>Když chce člověk pokračovat do praxe, přichází PansofieGO.</h2><p>GO je společná aplikace pro celý ekosystém. Převádí témata a projekty do konkrétních misí, spolupráce a portfolia podle věku, role a kontextu.</p></div>
      <Link className="pw-button pw-button--dark" href="/pansofie-go">Jak funguje PansofieGO</Link>
    </section>
  </PublicShell>;
}
