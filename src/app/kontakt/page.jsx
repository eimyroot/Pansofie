import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { ContactForm } from "../../components/public/ContactForm";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { PansofieVisualCard } from "../../components/public/PansofieVisualCard";

export const metadata={title:"Kontakt",description:"Kontakt pro dotazy, spolupráci, přístupnost a bezpečnostní podněty k Pansofii."};
const CONTACT_AREAS=[
 {title:"Spolupráce",text:"Školy, organizace, obce, firmy a komunitní projekty.",href:"/partnerstvi",label:"SPOLEČNĚ"},
 {title:"Pro školy",text:"Projekt, výuková potřeba nebo bezpečný pilot ve školním kontextu.",href:"/pro-skoly",label:"ŠKOLA"},
 {title:"Pro organizace",text:"Know-how, materiál, prostor nebo kapacita pro konkrétní účel.",href:"/pro-organizace",label:"PARTNERSTVÍ"},
 {title:"Bezpečnost a přístupnost",text:"Podněty, které mají přednost před marketingovým pohodlím.",href:"#kontaktni-formular",label:"PODNĚT"},
];
export default function ContactPage(){return <PublicShell active="/kontakt">
 <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--contact"><div className="pw-visual-hero__copy"><p className="pw-eyebrow">KONTAKT</p><h1>Napište nám, co potřebujete.</h1><p>Kontakt slouží pro konkrétní dotazy, spolupráci, přístupnost a bezpečnostní podněty. Formulář je zatím transparentně označený jako lokální prototyp bez připojeného mailboxu.</p><div className="pw-visual-hero__actions"><a className="pw-button pw-button--dark" href="#kontaktni-formular">Přejít k formuláři</a><Link className="pw-button pw-button--light" href="/partnerstvi">Jak chápeme partnerství</Link></div></div><div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="KONTAKT" title="Od dotazu k dalšímu kroku" detail="kontext dřív než formulář" flow={["Dotaz","Kontext","Směr","Další krok"]}/></div></section>
 <section className="pw-contact-entry-grid">{CONTACT_AREAS.map(card=><PansofieVisualCard {...card} className="pw-contact-entry-card" key={card.title}/>)}</section>
 <EditorialFeatureBand eyebrow="SPOLUPRÁCE ZAČÍNÁ KONTEXTEM" title="Nejdřív konkrétní problém nebo možnost. Potom forma spolupráce." text="Škola může přijít s projektem, organizace s materiálem nebo know-how, komunita s místní potřebou. Přístupnost a bezpečnostní podněty mají stejnou váhu jako nabídky spolupráce. Veřejný formulář zatím zůstává lokálním prototypem a nic nepředstírá." imageAlt="Lidé v komunitním prostředí, kde může vzniknout konkrétní spolupráce" items={[["Škola","Projekt, výuková potřeba nebo bezpečný pilot."],["Organizace","Know-how, materiál, prostor nebo kapacita pro konkrétní účel."],["Komunita","Místní problém, péče o místo nebo společná iniciativa."],["Bezpečnost a přístupnost","Podněty, které mají přednost před marketingovým pohodlím."]]} link={{href:"/pro-organizace",label:"Jak Pansofie chápe partnerství"}}/>
 <section className="pw-contact-layout" id="kontaktni-formular"><div className="pw-contact-copy"><p className="pw-eyebrow">K ČEMU KONTAKT SLOUŽÍ</p><h2>Jedno místo pro praktické věci.</h2><p>Formulář zprávu pouze připraví v prohlížeči. Nepředstírá odeslání ani přijetí na mailbox.</p></div><ContactForm/></section>
 </PublicShell>}
