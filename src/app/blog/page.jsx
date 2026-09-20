import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Blog a zdroje",
  description: "Články, rozhovory a praktické zdroje Pansofie pro život v souvislostech.",
};

const TOPICS = [
  { title: "Rodina jako prostředí učení", text: "Jak mohou společné činnosti, rozhovor a předávání zkušeností propojit generace bez dalšího školního režimu.", href: "/family-team", image: pansofieScene("family-team-missions"), label: "Rodina · vztahy" },
  { title: "Příroda jako skutečná laboratoř", text: "Od pěstování a půdy po vodu a biodiverzitu. Poznání, které lze ověřit vlastní zkušeností.", href: "/green-hope", image: pansofiePhoto("growing-together-16x9"), label: "Příroda · zkušenost" },
  { title: "Město, práce a praktická ekonomika", text: "Pěstovat, zpracovat, spočítat náklady, vytvořit hodnotu a pochopit, jak spolu souvisí práce a zdroje.", href: "/urban-family-farm", image: pansofieScene("urban-farm-system"), label: "Práce · finance" },
];

export default function BlogPage() {
  return <PublicShell>
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">BLOG A ZDROJE</p><h1>Myšlenky, které pokračují v životě.</h1><p>Veřejná knihovna Pansofie má postupně spojovat články, rozhovory, metodiky a praktické materiály. Dokud konkrétní zdroj není publikovaný, nevydáváme tematický návrh za hotový článek.</p></div>
      <div className="pw-page-hero__media"><Image src={pansofiePhoto("curiosity-nature-16x9")} alt="Pozorování a učení v přírodě" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">EDITORIÁLNÍ SMĚR</p><h2>Méně obsahu pro algoritmus. Více obsahu, který něco vysvětlí.</h2></div>
      <div><p>Zdroje mají vycházet z 16 oblastí, 7 cest a projektů Pansofie. Každý text by měl nabídnout souvislost, příklad a další krok, ne jen další názor do nekonečného proudu názorů.</p></div>
    </section>

    <section className="pw-resource-grid">
      {TOPICS.map((topic, index) => <article className="pw-resource-card" key={topic.title}>
        <div className="pw-resource-card__media"><Image src={topic.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" priority={index === 0}/></div>
        <div><span>{topic.label}</span><h2>{topic.title}</h2><p>{topic.text}</p><Link href={topic.href}>Přejít k tématu <b aria-hidden="true">→</b></Link></div>
      </article>)}
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">ZÁKLAD KNIHOVNY</p><h2>Nejdřív struktura, potom stovky článků.</h2><p>16 oblastí už tvoří stabilní mapu témat, do které mohou další zdroje postupně přibývat bez obsahového chaosu.</p></div>
      <Link className="pw-button pw-button--dark" href="/16-oblasti">Projít 16 oblastí</Link>
    </section>
  </PublicShell>;
}
