import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";

export const metadata = { title: "Partneři", description: "Role partnerů a organizací v ekosystému Pansofie bez předstírání neověřených partnerství." };

const ROLES = [["Materiál", "Konkrétní zdroj se váže ke konkrétní potřebě."], ["Know-how", "Odbornost pomáhá projektu, nepřivlastňuje si zkušenost účastníků."], ["Prostor", "Dílna, zahrada nebo bezpečné místo pro ověřený kontext."], ["Čas", "Mentoring a pomoc navázaná na jasný účel a pravidla."]];

export default function PartnersPage() {
  return <PublicShell active="/partneri">
    <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--partners">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">PARTNEŘI</p><h1>Partner přináší konkrétní kapacitu.</h1><p>Partnerství v Pansofii může znamenat know-how, prostor, materiál, čas nebo podporu konkrétního projektu. Veřejný web nepředstírá seznam ověřených partnerů, pokud takové ověření neexistuje.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/partnerstvi">Jak partnerství funguje</Link><Link className="pw-button pw-button--light" href="/kontakt">Kontakt</Link></div></div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="PARTNEŘI" title="Kapacita má směr" detail="zdroj se váže ke konkrétní potřebě" flow={["Zdroj","Kontext","Role","Odpovědnost"]}/></div>
    </section>
    <section className="pw-mini-pill-grid pw-mini-pill-grid--roles">{ROLES.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
    <EditorialFeatureBand eyebrow="NE LOGA PRO LOGA" title="Partnerství má být dohledatelné a přiměřené." text="Partner se do Pansofie nevkládá jako dekorace. Každá spolupráce má mít jasnou roli, kontext a pravidla bezpečnosti, hlavně tam, kde se účastní mladí lidé." imageAlt="Partnerství jako vztah účelu, rozsahu, důkazu a bezpečí" items={[["Účel","Co přesně partner přináší."],["Rozsah","Kde a jak spolupráce platí."],["Důkaz","Jak se ověří skutečný výstup."],["Bezpečí","Jak chráníme účastníky a kontext."]]}/>
    <section className="pw-next"><div><p className="pw-eyebrow">PRO ORGANIZACE</p><h2>Partnerství začíná konkrétním účelem.</h2><p>Organizace mohou nabídnout kapacitu nebo přijít s projektem, který potřebuje bezpečný kontext spolupráce.</p></div><Link className="pw-button pw-button--dark" href="/pro-organizace">Pro organizace</Link></section>
  </PublicShell>;
}
