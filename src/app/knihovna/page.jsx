import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Knihovna Pansofie",
  description: "Nápady, návody, zkušenosti a příklady, které mohou otevřít další cestu.",
};

const ITEMS = [
  ["Podnět", "Jak oživit prázdný kout v sousedství?", "Jednoduché otázky, které mohou z nápadu udělat první malý krok."],
  ["Návod", "Jak předat věc dál bez zbytečného odpadu", "Popis, lokalita, domluva a jednoduché předání bez zbytečného komplikování."],
  ["Inspirace", "Mezigenerační hodina dovedností", "Setkání, kde každý přinese jednu dovednost, kterou umí předat."],
  ["Cirkularita", "Materiál jako začátek projektu", "Přebytek jedné organizace může být vstupem pro školu, dílnu nebo komunitu."],
  ["Podnět", "Co může změnit deset minut času?", "Malé formy pomoci, které nemusí začínat velkým závazkem."],
  ["Návod", "Jak pozvat další lidi k nápadu", "Mluvit o možnosti, ne o povinnosti. Ukázat, co je potřeba a co může vzniknout."],
];
export default function LibraryPage() {
  return <PublicShell active="/knihovna">
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">KNIHOVNA PANSOFIE</p><h1>Místo, kde se dobré nápady neztrácejí.</h1><p>Návody, podněty, příklady a zkušenosti, které mohou někomu dalšímu otevřít cestu. Ne povinné úkoly, ale věci, které lze vzít, upravit nebo jen přečíst.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("knowledge-journal")} alt="Ilustrace sdílených poznámek a zkušeností" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <EditorialFeatureBand
      eyebrow="ZNALOST, KTERÁ CESTUJE"
      title="Dobrá zkušenost nemusí zůstat u člověka, který ji získal jako první."
      text="Knihovna má postupně spojovat návody, zkušenosti, zdroje a reflexe tak, aby šly bezpečně přenést do jiné rodiny, školy nebo komunity. Dokud konkrétní materiál není publikovaný a ověřený, Pansofie ho za hotový zdroj nevydává."
      image={pansofiePhoto("community-city-16x9")}
      imageAlt="Městská komunita jako prostor pro sdílení zkušeností a znalostí"
      items={[["Návod", "Postup, který lze pochopit, upravit a znovu použít."], ["Příklad", "Konkrétní situace s jasným kontextem, ne univerzální recept."], ["Reflexe", "Co fungovalo, co ne a co je dobré vědět příště."], ["Zdroj", "Dohledatelný podklad oddělený od názoru nebo modelového příkladu."]]}
      link={{ href: "/blog", label: "Přejít na blog a zdroje" }}
    />
    <section className="pw-resource-grid">
      {ITEMS.map(([label,title,text], index) => <article className="pw-resource-card pw-resource-card--text" key={title}><div><span>{String(index+1).padStart(2,"0")} · {label}</span><h2>{title}</h2><p>{text}</p></div></article>)}
    </section>
    <section className="pw-next">
      <div><p className="pw-eyebrow">KNIHOVNA ROSTE POSTUPNĚ</p><h2>Nejdřív struktura. Potom skutečné zdroje.</h2><p>Tato stránka zatím představuje tematické formáty a příklady z produktového modelu. Neoznačuje je za publikované články nebo ověřené externí zdroje.</p></div>
      <Link className="pw-button pw-button--dark" href="/blog">Přejít na blog a zdroje</Link>
    </section>
  </PublicShell>;
}
