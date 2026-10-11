import { PublicShell } from "../../components/public/PublicShell";
import { EngageFamilyNav, EngageHero, EngageNext, EngagePrinciples, EngageStatement, EngageTruth } from "../../components/public/PansofieEngageFrame";

export const metadata={title:"Partnerství",description:"Partnerství Pansofie navázané na konkrétní projekty, potřeby, role a odpovědnost."};
const RULES=[["Účel","Nejdřív se pojmenuje konkrétní potřeba nebo projekt."],["Role","Know-how, materiál, prostor, finance nebo čas mají jasný kontext."],["Dopad","Výstupy se oddělují od marketingu a tvrzení musí mít skutečné podklady."],["Bezpečí","Soukromí, souhlasy a viditelnost se řeší od začátku."]];
export default function PartnershipPage(){return <PublicShell active="/partnerstvi">
 <EngageFamilyNav active="/partnerstvi"/>
 <EngageHero variant="partnership" kicker="PARTNERSTVÍ" title={<>Spolupráce má mít konkrétní smysl.</>} lead="Partnerství se v Pansofii váže na konkrétní projekt, místo nebo potřebu. Role, rozsah a odpovědnost mají být jasnější než logo a marketingový příběh." primary={{href:"/kontakt",label:"Navrhnout spolupráci"}} secondary={{href:"/partneri",label:"Partneři"}}/>
 <EngageStatement kicker="SPOLEČNÝ DOPAD" title="Spolupráce není status. Je to dohoda o konkrétní práci." text="Škola může přijít s projektem, firma s materiálem, obec s místem a komunita s potřebou. Pansofie drží role čitelné a nepřetavuje je do falešného dojmu ověřené institucionální sítě." aside="účel → role → rozsah → důkaz → bezpečí"/>
 <EngagePrinciples items={RULES}/>
 <EngageTruth>Partnerství není zveřejněné jen proto, že někdo projevil zájem. Veřejné tvrzení o spolupráci potřebuje konkrétní roli, rozsah a odpovídající podklad.</EngageTruth>
 <EngageNext kicker="KONTAKT" title="Navrhněte konkrétní spolupráci." text="Pro školy, obce, firmy, neziskové organizace a komunitní projekty slouží společný kontaktní vstup." href="/kontakt" label="Kontakt"/>
 </PublicShell>}
