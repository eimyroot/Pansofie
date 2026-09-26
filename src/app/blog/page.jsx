import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { DiscoverFamilyNav, DiscoverHero, DiscoverNext } from "../../components/public/PansofieDiscoverFrame";

export const metadata = {
  title: "Blog a zdroje",
  description: "Články, rozhovory a praktické zdroje Pansofie pro život v souvislostech.",
};

const PRINCIPLES = [
  ["01", "Souvislost", "Proč téma patří do života a s čím dalším se propojuje."],
  ["02", "Zdroj", "Dohledatelný podklad oddělený od názoru a modelového příkladu."],
  ["03", "Příklad", "Konkrétní situace, která pomůže myšlenku pochopit."],
  ["04", "Další krok", "Možnost pokračovat v knihovně, projektu nebo vlastní zkušenosti."],
];

const TOPICS = [
  ["01 · RODINA · VZTAHY", "Rodina jako prostředí učení", "Jak mohou společné činnosti, rozhovor a předávání zkušeností propojit generace bez dalšího školního režimu.", "/family-team"],
  ["02 · PŘÍRODA · ZKUŠENOST", "Příroda jako skutečná laboratoř", "Od pěstování a půdy po vodu a biodiverzitu. Poznání, které lze ověřit vlastní zkušeností.", "/green-hope"],
  ["03 · PRÁCE · FINANCE", "Město, práce a praktická ekonomika", "Pěstovat, zpracovat, spočítat náklady, vytvořit hodnotu a pochopit, jak spolu souvisí práce a zdroje.", "/urban-family-farm"],
];

export default function BlogPage() {
  return <PublicShell active="/blog">
    <DiscoverFamilyNav active="/blog"/>
    <DiscoverHero variant="articles" kicker="ČLÁNKY A ZDROJE" title={<>Myšlenky, které pokračují v životě.</>} lead="Veřejná knihovna Pansofie má postupně spojovat články, rozhovory, metodiky a praktické materiály. Dokud materiál není skutečně publikovaný, nevydáváme tematický návrh za hotový článek." primary={{href:"/knihovna",label:"Otevřít knihovnu"}} secondary={{href:"/16-oblasti",label:"Procházet témata"}}/>

    <section className="d02-statement d02-statement--articles">
      <div><p className="d02-kicker">OBSAH S PAMĚTÍ A ZDROJEM</p><h2>Text má vést k pochopení, ne jen k dalšímu scrollu.</h2></div>
      <div><p>Editoriální vrstva Pansofie má spojovat souvislost, dohledatelný podklad, konkrétní příklad a další možný krok. Téma se nestává článkem jen tím, že dostane hezký titulek.</p></div>
    </section>
    <section className="d02-rule-ledger d02-rule-ledger--articles" aria-label="Editoriální principy">{PRINCIPLES.map(([n,title,text])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</section>

    <section className="d02-topics" aria-labelledby="d02-topics-title">
      <header><p className="d02-kicker">TÉMATA K ROZPRACOVÁNÍ</p><h2 id="d02-topics-title">Obsah nezačíná titulkem. Začíná otázkou.</h2><p>Tyto položky jsou transparentně témata a směry, ne předstírané publikované články.</p></header>
      <div>{TOPICS.map(([meta,title,text,href])=><article key={title}><span>{meta}</span><h3>{title}</h3><p>{text}</p><Link href={href}>Přejít k tématu ↗</Link></article>)}</div>
    </section>

    <DiscoverNext kicker="ZÁKLAD KNIHOVNY" title="Nejdřív struktura, potom stovky článků." text="16 oblastí už tvoří stabilní mapu témat, do které mohou další zdroje postupně přibývat bez obsahového chaosu." href="/16-oblasti" label="Projít 16 oblastí"/>
  </PublicShell>;
}
