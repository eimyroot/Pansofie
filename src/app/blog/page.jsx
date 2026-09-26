import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { PansofieArtPanel } from "../../components/public/PansofieArtPanel";

export const metadata = {
  title: "Blog a zdroje",
  description: "Články, rozhovory a praktické zdroje Pansofie pro život v souvislostech.",
};

const TOPICS = [
  { title: "Rodina jako prostředí učení", text: "Jak mohou společné činnosti, rozhovor a předávání zkušeností propojit generace bez dalšího školního režimu.", href: "/family-team", label: "Rodina · vztahy", variant:"community", nodes:["Rodina","Činnost","Rozhovor","Zkušenost"] },
  { title: "Příroda jako skutečná laboratoř", text: "Od pěstování a půdy po vodu a biodiverzitu. Poznání, které lze ověřit vlastní zkušeností.", href: "/green-hope", label: "Příroda · zkušenost", variant:"nature", nodes:["Půda","Voda","Pěstování","Biodiverzita"] },
  { title: "Město, práce a praktická ekonomika", text: "Pěstovat, zpracovat, spočítat náklady, vytvořit hodnotu a pochopit, jak spolu souvisí práce a zdroje.", href: "/urban-family-farm", label: "Práce · finance", variant:"city", nodes:["Práce","Náklady","Hodnota","Rozhodnutí"] },
];

export default function BlogPage() {
  return <PublicShell active="/blog">
    <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--discover-articles">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">ČLÁNKY A ZDROJE</p><h1>Myšlenky, které pokračují v životě.</h1><p>Veřejná knihovna Pansofie má postupně spojovat články, rozhovory, metodiky a praktické materiály. Dokud konkrétní zdroj není publikovaný, nevydáváme tematický návrh za hotový článek.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/knihovna">Otevřít knihovnu</Link><Link className="pw-button pw-button--light" href="/16-oblasti">Procházet témata</Link></div></div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="ČLÁNKY A ZDROJE" title="Obsah, který vede dál" detail="otázka · zdroj · příklad · krok" flow={["Otázka","Souvislost","Zdroj","Příklad","Další krok"]}/></div>
    </section>
    <div className="pw-discover-section-head"><p className="pw-eyebrow">TÉMATA K ROZPRACOVÁNÍ</p><h2>Obsah nezačíná titulkem. Začíná otázkou.</h2></div>
    <EditorialFeatureBand
      eyebrow="OBSAH S PAMĚTÍ A ZDROJEM"
      title="Text má vést k pochopení, ne jen k dalšímu scrollu."
      text="Editoriální vrstva Pansofie má spojovat souvislost, dohledatelný podklad, konkrétní příklad a další možný krok. Téma se nestává článkem jen tím, že dostane hezký obrázek a titulek. Dokud materiál není skutečně publikovaný, zůstává transparentně označeným směrem nebo návrhem."
      imageAlt="Lidé sdílejí zkušenost při společné praktické činnosti"
      reverse
      items={[["Souvislost", "Proč téma patří do života a s čím dalším se propojuje."], ["Zdroj", "Dohledatelný podklad oddělený od názoru a modelového příkladu."], ["Příklad", "Konkrétní situace, která pomůže myšlenku pochopit."], ["Další krok", "Možnost pokračovat v knihovně, projektu nebo vlastní zkušenosti."]]}
      link={{ href: "/knihovna", label: "Jak funguje knihovna Pansofie" }}
    />
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">EDITORIÁLNÍ SMĚR</p><h2>Méně obsahu pro algoritmus. Více obsahu, který něco vysvětlí.</h2></div>
      <div><p>Zdroje mají vycházet z 16 oblastí, 7 cest a projektů Pansofie. Každý text by měl nabídnout souvislost, příklad a další krok, ne jen další názor do nekonečného proudu názorů.</p></div>
    </section>

    <section className="pw-resource-grid pw-resource-grid--visual">
      {TOPICS.map((topic) => <article className="pw-resource-card" key={topic.title}>
        <div className="pw-resource-card__media"><PansofieArtPanel eyebrow={topic.label} title={topic.title} detail={topic.text} nodes={topic.nodes} variant={topic.variant}/></div>
        <div><span>{topic.label}</span><h2>{topic.title}</h2><p>{topic.text}</p><Link href={topic.href}>Přejít k tématu <b aria-hidden="true">→</b></Link></div>
      </article>)}
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">ZÁKLAD KNIHOVNY</p><h2>Nejdřív struktura, potom stovky článků.</h2><p>16 oblastí už tvoří stabilní mapu témat, do které mohou další zdroje postupně přibývat bez obsahového chaosu.</p></div>
      <Link className="pw-button pw-button--dark" href="/16-oblasti">Projít 16 oblastí</Link>
    </section>
  </PublicShell>;
}
