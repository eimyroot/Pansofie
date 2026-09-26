import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = { title: "Partneři", description: "Role partnerů a organizací v ekosystému Pansofie bez předstírání neověřených partnerství." };

const ROLES = [["Materiál", "Konkrétní zdroj se váže ke konkrétní potřebě."], ["Know-how", "Odbornost pomáhá projektu, nepřivlastňuje si zkušenost účastníků."], ["Prostor", "Dílna, zahrada nebo bezpečné místo pro ověřený kontext."], ["Čas", "Mentoring a pomoc navázaná na jasný účel a pravidla."]];

export default function PartnersPage() {
  return <PublicShell active="/partneri">
    <section className="pw-visual-hero pw-visual-hero--partners">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">PARTNEŘI</p><h1>Partner přináší konkrétní kapacitu.</h1><p>Partnerství v Pansofii může znamenat know-how, prostor, materiál, čas nebo podporu konkrétního projektu. Veřejný web nepředstírá seznam ověřených partnerů, pokud takové ověření neexistuje.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/partnerstvi">Jak partnerství funguje</Link><Link className="pw-button pw-button--light" href="/kontakt">Kontakt</Link></div></div>
      <div className="pw-visual-hero__media"><Image src={pansofieScene("organization-network")} alt="Organizace a komunity propojené kolem projektů" fill priority sizes="(max-width: 900px) 100vw, 52vw"/><div className="pw-visual-hero__note">zdroje · know-how · prostor · odpovědnost</div></div>
    </section>
    <section className="pw-mini-pill-grid pw-mini-pill-grid--roles">{ROLES.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
    <section className="pw-editorial-band"><div className="pw-editorial-band__media"><Image src={pansofiePhoto("community-city-16x9")} alt="Lidé spolupracují v městském komunitním prostředí" fill sizes="(max-width: 900px) 100vw, 52vw"/></div><div className="pw-editorial-band__copy"><p className="pw-eyebrow">NE LOGA PRO LOGA</p><h2>Partnerství má být dohledatelné a přiměřené.</h2><p>Partner se do Pansofie nevkládá jako dekorace. Každá spolupráce má mít jasnou roli, kontext a pravidla bezpečnosti, hlavně tam, kde se účastní mladí lidé.</p><div className="pw-editorial-band__items"><article><strong>Účel</strong><span>Co přesně partner přináší.</span></article><article><strong>Rozsah</strong><span>Kde a jak spolupráce platí.</span></article><article><strong>Důkaz</strong><span>Jak se ověří skutečný výstup.</span></article><article><strong>Bezpečí</strong><span>Jak chráníme účastníky a kontext.</span></article></div></div></section>
    <section className="pw-next"><div><p className="pw-eyebrow">PRO ORGANIZACE</p><h2>Partnerství začíná konkrétním účelem.</h2><p>Organizace mohou nabídnout kapacitu nebo přijít s projektem, který potřebuje bezpečný kontext spolupráce.</p></div><Link className="pw-button pw-button--dark" href="/pro-organizace">Pro organizace</Link></section>
  </PublicShell>;
}
