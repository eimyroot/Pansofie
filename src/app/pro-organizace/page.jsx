import { PublicShell } from "../../components/public/PublicShell";
import { CommunityFamilyNav, CommunityHero, CommunityLedger, CommunityNext, CommunityPrinciples, CommunityStatement, CommunityTruth } from "../../components/public/PansofieCommunityFrame";

export const metadata={title:"Pro organizace",description:"Partnerství Pansofie pro školy, obce, neziskové organizace, firmy a komunitní projekty."};
const ROLES=[["Partner projektu","Podpora konkrétního projektu, místa nebo tématu s jasným rozsahem a odpovědností."],["Odborný partner","Know-how, mentorství, metodika nebo odborný vstup bez přivlastnění zkušenosti účastníků."],["Místní hostitel","Bezpečný prostor, vybavení nebo organizační zázemí pro ověřený kontext."],["Zdroj a podpora","Materiál, finance nebo služby navázané na konkrétní potřebu a transparentní použití."]];
const ENTRY=[
 {title:"Materiál",text:"Čisté přebytky a vybavení mohou dostat konkrétní druhé použití.",href:"/digitalni-kompost",label:"ZDROJE"},
 {title:"Know-how",text:"Odborná zkušenost může pomoct projektu bez marketingového nátlaku.",href:"/sit",label:"ZKUŠENOST"},
 {title:"Prostor",text:"Dílna, zahrada nebo bezpečné místo pro ověřený projekt.",href:"/projekty",label:"MÍSTO"},
 {title:"Kapacita",text:"Čas, služby nebo financování navázané na jasný účel a pravidla.",href:"/partnerstvi",label:"PODPORA"},
];
export default function OrganizationsPage(){return <PublicShell active="/pro-organizace">
 <CommunityFamilyNav active="/pro-organizace"/>
 <CommunityHero variant="organization" kicker="PRO ORGANIZACE" title={<>Partnerství má mít konkrétní smysl.</>} lead="Pansofie hledá spolupráci, která pomáhá lidem, místům a projektům něco skutečně vytvořit. Ne logo na stránce a vágní tvrzení o dopadu." primary={{href:"/kontakt",label:"Navrhnout spolupráci"}} secondary={{href:"/partnerstvi",label:"Princip partnerství"}}/>
 <CommunityStatement kicker="FIRMA JAKO SOUČÁST MÍSTA" title="Organizace může nabídnout víc než peníze." text="Materiál, znalost, čas odborníka, dílna nebo nevyužitá kapacita mohou pomoct konkrétnímu školnímu či komunitnímu projektu. Spolupráce má být dohledatelná a přiměřená, ne převlečená reklama." aside="potřeba ↔ role ↔ zdroj ↔ výstup"/>
 <CommunityPrinciples items={ROLES}/>
 <CommunityLedger items={ENTRY}/>
 <CommunityTruth>Dopad se dokládá, nevymýšlí. Výstupy projektu a evidence zůstávají oddělené od reputace člověka nebo instituce a mladí účastníci nejsou marketingový materiál.</CommunityTruth>
 <CommunityNext kicker="PRVNÍ KROK" title="Začněme konkrétním problémem nebo projektem." text="Kontakt slouží pro nabídku spolupráce, přístupnost, bezpečnostní podněty i obecné dotazy." href="/kontakt" label="Kontaktovat Pansofii"/>
 </PublicShell>}
