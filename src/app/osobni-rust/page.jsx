import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { pansofiePhoto } from "../../domain/asset-system";

export const metadata = {
  title: "Osobní růst a Knowledge Exchange",
  description: "Mezigenerační učení, mentoring a výměna zkušeností bez veřejného katalogu lidí.",
};

const AREAS = [
  ["Řemeslo", "Praktické postupy, opravy a práce rukama."],
  ["Zahrada", "Pěstování, péče o půdu a zkušenost s místem."],
  ["Technologie", "Digitální dovednosti, nástroje a bezpečné používání technologií."],
  ["Historie a paměť", "Místní zkušenost, příběhy a znalost souvislostí."],
];
export default function PersonalGrowthPage() {
  return <PublicShell active="/osobni-rust">
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">KNOWLEDGE EXCHANGE</p><h1>Možná se můžeme něco naučit jeden od druhého.</h1><p>To, co může člověk nabídnout druhému, je možnost, ne podmínka a ne dluh. Pansofie chce propojovat zkušenosti v bezpečných kontextech.</p></div>
      <div className="pw-page-hero__media"><Image src={pansofiePhoto("growing-together-16x9")} alt="Lidé různých generací při společné praktické činnosti" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <EditorialFeatureBand
      eyebrow="ZNALOST MEZI GENERACEMI"
      title="Zkušenost má cenu, když může bezpečně cestovat dál."
      text="Knowledge Exchange staví na tom, co lidé skutečně umějí, zažili nebo dokážou vysvětlit v kontextu. Nejde o veřejný katalog mentorů ani tržiště protislužeb. Propojení má vznikat kolem konkrétní potřeby, projektu a ověřeného vztahu."
      image={pansofiePhoto("community-city-16x9")}
      imageAlt="Různé generace sdílejí zkušenost v komunitním prostředí"
      reverse
      items={[["Dovednost", "Praktická znalost, kterou lze ukázat nebo společně vyzkoušet."], ["Příběh", "Zkušenost, která vysvětluje souvislosti, nejen správný postup."], ["Kontext", "Rodina, škola, tým nebo projekt určují bezpečný rámec propojení."], ["Vzájemnost", "Každý může něco předat i přijmout bez dluhu a povinné protislužby."]]}
      link={{ href: "/family-team", label: "Knowledge Exchange v rodinném kontextu" }}
    />
    <section className="pw-story-principles">
      {AREAS.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}
    </section>
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">BEZPEČNÉ PROPOJENÍ</p><h2>Ne veřejné hledání lidí v okolí.</h2></div>
      <div><p>Veřejná stránka neukazuje seznam jednotlivých mentorů ani jejich přesnou polohu. Skutečné propojení má probíhat přes ověřené rodinné, školní, týmové nebo projektové kontexty.</p><small>Vzájemná pomoc není obchodní protislužba. Nikdo nemusí druhému něco „splácet“.</small></div>
    </section>
    <section className="pw-next"><div><p className="pw-eyebrow">MEZIGENERAČNÍ UČENÍ</p><h2>Každý něco umí. Každý se může něco naučit.</h2></div><Link className="pw-button pw-button--dark" href="/sit">Poznat síť Pansofie</Link></section>
  </PublicShell>;
}
