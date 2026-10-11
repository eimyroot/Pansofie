import { PublicShell } from "../../components/public/PublicShell";
import { ContactForm } from "../../components/public/ContactForm";
import { EngageFamilyNav, EngageHero, EngageLedger, EngageStatement, EngageTruth } from "../../components/public/PansofieEngageFrame";

export const metadata={title:"Kontakt",description:"Kontakt pro dotazy, spolupráci, přístupnost a bezpečnostní podněty k Pansofii."};
const AREAS=[{title:"Spolupráce",text:"Školy, organizace, obce, firmy a komunitní projekty.",href:"/partnerstvi",label:"SPOLEČNĚ"},{title:"Pro školy",text:"Projekt, výuková potřeba nebo bezpečný pilot ve školním kontextu.",href:"/pro-skoly",label:"ŠKOLA"},{title:"Pro organizace",text:"Know-how, materiál, prostor nebo kapacita pro konkrétní účel.",href:"/pro-organizace",label:"ORGANIZACE"},{title:"Bezpečnost a přístupnost",text:"Podněty, které mají přednost před marketingovým pohodlím.",href:"#kontaktni-formular",label:"PODNĚT"}];
export default function ContactPage(){return <PublicShell active="/kontakt">
 <EngageFamilyNav active="/kontakt"/>
 <EngageHero variant="contact" kicker="KONTAKT" title={<>Napište nám, co potřebujete.</>} lead="Kontakt slouží pro konkrétní dotazy, spolupráci, přístupnost a bezpečnostní podněty. Formulář je transparentně označený jako lokální prototyp bez připojeného mailboxu." primary={{href:"#kontaktni-formular",label:"Přejít k formuláři"}} secondary={{href:"/partnerstvi",label:"Jak chápeme partnerství"}}/>
 <EngageStatement kicker="SPOLUPRÁCE ZAČÍNÁ KONTEXTEM" title="Nejdřív konkrétní problém nebo možnost. Potom forma spolupráce." text="Škola může přijít s projektem, organizace s materiálem nebo know-how, komunita s místní potřebou. Přístupnost a bezpečnostní podněty mají stejnou váhu jako nabídky spolupráce." aside="dotaz → kontext → směr → další krok"/>
 <EngageLedger items={AREAS}/>
 <section className="en02-contact-layout" id="kontaktni-formular"><div><p className="en02-kicker">K ČEMU KONTAKT SLOUŽÍ</p><h2>Jedno místo pro praktické věci.</h2><p>Formulář zprávu pouze připraví v prohlížeči. Nepředstírá odeslání ani přijetí na mailbox.</p></div><ContactForm/></section>
 <EngageTruth>Kontaktní backend zatím není připojený. Formulář pouze připraví obsah v prohlížeči a netvrdí, že zprávu někdo obdržel.</EngageTruth>
 </PublicShell>}
