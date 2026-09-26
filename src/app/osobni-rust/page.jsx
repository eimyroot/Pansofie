import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";

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
    <section className="pw-visual-hero pw-visual-hero--engine">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">KNOWLEDGE EXCHANGE</p><h1>Možná se můžeme něco naučit jeden od druhého.</h1><p>To, co může člověk nabídnout druhému, je možnost, ne podmínka a ne dluh. Pansofie chce propojovat zkušenosti v bezpečných kontextech.</p></div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="KNOWLEDGE EXCHANGE" title="Zkušenost mezi generacemi" detail="bez veřejného katalogu lidí" flow={["Dovednost","Příběh","Kontext","Vzájemnost"]}/></div>
    </section>
    <EditorialFeatureBand
      eyebrow="ZNALOST MEZI GENERACEMI"
      title="Zkušenost má cenu, když může bezpečně cestovat dál."
      text="Knowledge Exchange staví na tom, co lidé skutečně umějí, zažili nebo dokážou vysvětlit v kontextu. Nejde o veřejný katalog mentorů ani tržiště protislužeb. Propojení má vznikat kolem konkrétní potřeby, projektu a ověřeného vztahu."
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
