import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Digitální kompost",
  description: "Cirkulární vrstva Pansofie pro předávání materiálu, věcí a zdrojů, které ještě mohou sloužit dál.",
};

const FLOW = [
  ["Nabídnout", "Popsat materiál nebo věc, která už není potřeba na původním místě."],
  ["Najít smysluplné využití", "Přebytek má směřovat tam, kde může být skutečně užitečný."],
  ["Domluvit předání", "Místo, podmínky a bezpečnost se řeší konkrétně mezi oprávněnými účastníky."],
  ["Uzavřít kruh", "Potvrdit, že předání proběhlo, bez povinného veřejného příběhu nebo skóre."],
];
export default function CompostPage() {
  return <PublicShell active="/digitalni-kompost">
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">DIGITÁLNÍ KOMPOST</p><h1>Co už nepotřebuje jeden, může ještě posloužit druhému.</h1><p>Cirkulární vrstva Pansofie propojuje přebytky s konkrétním využitím. Ne jako anonymní tržiště, ale jako součást projektů, škol a místní spolupráce.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("collaboration-map")} alt="Ilustrace oběhu zdrojů mezi lidmi a projekty" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <EditorialFeatureBand
      eyebrow="MATERIÁLY V OBĚHU"
      title="Odpad je často jen materiál bez dalšího plánu."
      text="Dřevo z výroby, zbytky textilu, čisté obaly nebo vybavení mohou být užitečné pro školní dílnu, komunitní opravu nebo prototyp. Veřejná Pansofie ukazuje princip, ne falešnou živou burzu zásob."
      image={pansofiePhoto("community-city-16x9")}
      imageAlt="Městská komunita spolupracující na praktických projektech"
      items={[["Dřevo", "Modely, truhlíky, opravy a výukové prototypy."], ["Textil", "Tvorba, opravy, design a práce s materiálem."], ["Obaly", "Prototypování, organizace a opakované použití."], ["Vybavení", "Druhý život tam, kde existuje konkrétní potřeba."]]}
      link={{ href: "/instituce", label: "Jak funguje institucionální matching" }}
    />

    <section className="pw-how-flow">
      {FLOW.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h2>{title}</h2><p>{text}</p></article>)}
    </section>
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">DŮLEŽITÁ HRANICE</p><h2>Veřejná stránka není živá materiálová banka.</h2></div>
      <div><p>Současná veřejná vrstva vysvětluje princip. Nezobrazuje ověřené aktuální zásoby, rezervace ani skutečné nabídky organizací. Tyto funkce patří do řízeného aplikačního kontextu.</p></div>
    </section>
    <section className="pw-next"><div><p className="pw-eyebrow">CIRKULARITA V PRAXI</p><h2>Materiál může být začátkem projektu.</h2><p>Propojení škol a organizací rozvíjí stejnou myšlenku na institucionální úrovni.</p></div><Link className="pw-button pw-button--dark" href="/instituce">Propojení institucí</Link></section>
  </PublicShell>;
}
