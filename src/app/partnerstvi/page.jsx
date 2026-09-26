import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";

export const metadata = { title: "Partnerství", description: "Partnerství Pansofie navázané na konkrétní projekty, potřeby, role a odpovědnost." };

const RULES = [["Účel", "Nejdřív se pojmenuje konkrétní potřeba nebo projekt."], ["Role", "Know-how, materiál, prostor, finance nebo čas mají jasný kontext."], ["Dopad", "Výstupy se oddělují od marketingu a tvrzení musí mít skutečné podklady."], ["Bezpečí", "Soukromí, souhlasy a viditelnost se řeší od začátku."]];

export default function PartnershipPage() {
  return <PublicShell active="/partnerstvi">
    <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--partnership">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">PARTNERSTVÍ</p><h1>Spolupráce má mít konkrétní smysl.</h1><p>Partnerství se v Pansofii váže na konkrétní projekt, místo nebo potřebu. Role, rozsah a odpovědnost mají být jasnější než logo a marketingový příběh.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/kontakt">Navrhnout spolupráci</Link><Link className="pw-button pw-button--light" href="/partneri">Partneři</Link></div></div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="PARTNERSTVÍ" title="Dohoda o konkrétní práci" detail="účel · role · pravidla · výstup" flow={["Problém","Role","Pravidla","Výstup"]}/></div>
    </section>
    <section className="pw-mini-pill-grid">{RULES.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
    <EditorialFeatureBand eyebrow="SPOLEČNÝ DOPAD" title="Spolupráce není status. Je to dohoda o konkrétní práci." text="Škola může přijít s projektem, firma s materiálem, obec s místem, komunita s místní potřebou. Pansofie drží tyto role čitelné a nepřetavuje je do falešného dojmu ověřené instituční sítě." reverse imageAlt="Síť rolí, míst a zdrojů propojených kolem konkrétní práce" items={[["Školy","Projekt a bezpečný pedagogický kontext."],["Firmy","Materiál, odbornost nebo kapacita."],["Obce","Místo a veřejný kontext."],["Komunity","Reálná potřeba a místní vztahy."]]}/>
    <section className="pw-next"><div><p className="pw-eyebrow">KONTAKT</p><h2>Navrhněte konkrétní spolupráci.</h2><p>Pro školy, obce, firmy, neziskové organizace a komunitní projekty slouží společný kontaktní vstup.</p></div><Link className="pw-button pw-button--dark" href="/kontakt">Kontakt</Link></section>
  </PublicShell>;
}
