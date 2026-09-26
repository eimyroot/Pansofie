import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = { title: "Partnerství", description: "Partnerství Pansofie navázané na konkrétní projekty, potřeby, role a odpovědnost." };

const RULES = [["Účel", "Nejdřív se pojmenuje konkrétní potřeba nebo projekt."], ["Role", "Know-how, materiál, prostor, finance nebo čas mají jasný kontext."], ["Dopad", "Výstupy se oddělují od marketingu a tvrzení musí mít skutečné podklady."], ["Bezpečí", "Soukromí, souhlasy a viditelnost se řeší od začátku."]];

export default function PartnershipPage() {
  return <PublicShell active="/partnerstvi">
    <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--partnership">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">PARTNERSTVÍ</p><h1>Spolupráce má mít konkrétní smysl.</h1><p>Partnerství se v Pansofii váže na konkrétní projekt, místo nebo potřebu. Role, rozsah a odpovědnost mají být jasnější než logo a marketingový příběh.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/kontakt">Navrhnout spolupráci</Link><Link className="pw-button pw-button--light" href="/partneri">Partneři</Link></div></div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="PARTNERSTVÍ" title="Dohoda o konkrétní práci" detail="účel · role · pravidla · výstup" flow={["Problém","Role","Pravidla","Výstup"]}/></div>
    </section>
    <section className="pw-mini-pill-grid">{RULES.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
    <section className="pw-editorial-band pw-editorial-band--reverse"><div className="pw-editorial-band__media"><Image src={pansofieScene("organization-network")} alt="Síť organizací a komunit" fill sizes="(max-width: 900px) 100vw, 52vw"/></div><div className="pw-editorial-band__copy"><p className="pw-eyebrow">SPOLEČNÝ DOPAD</p><h2>Spolupráce není status. Je to dohoda o konkrétní práci.</h2><p>Škola může přijít s projektem, firma s materiálem, obec s místem, komunita s místní potřebou. Pansofie drží tyto role čitelné a nepřetavuje je do falešného dojmu ověřené instituční sítě.</p><div className="pw-editorial-band__items"><article><strong>Školy</strong><span>Projekt a bezpečný pedagogický kontext.</span></article><article><strong>Firmy</strong><span>Materiál, odbornost nebo kapacita.</span></article><article><strong>Obce</strong><span>Místo a veřejný kontext.</span></article><article><strong>Komunity</strong><span>Reálná potřeba a místní vztahy.</span></article></div></div></section>
    <section className="pw-next"><div><p className="pw-eyebrow">KONTAKT</p><h2>Navrhněte konkrétní spolupráci.</h2><p>Pro školy, obce, firmy, neziskové organizace a komunitní projekty slouží společný kontaktní vstup.</p></div><Link className="pw-button pw-button--dark" href="/kontakt">Kontakt</Link></section>
  </PublicShell>;
}
