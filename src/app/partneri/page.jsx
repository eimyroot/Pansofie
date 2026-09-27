import { PublicShell } from "../../components/public/PublicShell";
import { CommunityFamilyNav, CommunityHero, CommunityNext, CommunityPrinciples, CommunityStatement, CommunityTruth } from "../../components/public/PansofieCommunityFrame";

export const metadata = { title: "Partneři", description: "Role partnerů a organizací v ekosystému Pansofie bez předstírání neověřených partnerství." };
const ROLES=[["Materiál","Konkrétní zdroj se váže ke konkrétní potřebě."],["Know-how","Odbornost pomáhá projektu, nepřivlastňuje si zkušenost účastníků."],["Prostor","Dílna, zahrada nebo bezpečné místo pro ověřený kontext."],["Čas","Mentoring a pomoc navázaná na jasný účel a pravidla."]];

export default function PartnersPage(){return <PublicShell active="/partneri">
 <CommunityFamilyNav active="/partneri"/>
 <CommunityHero variant="partners" kicker="PARTNEŘI" title={<>Partner přináší konkrétní kapacitu.</>} lead="Partnerství v Pansofii může znamenat know-how, prostor, materiál, čas nebo podporu konkrétního projektu. Veřejný web nepředstírá seznam ověřených partnerů, pokud takové ověření neexistuje." primary={{href:"/partnerstvi",label:"Jak partnerství funguje"}} secondary={{href:"/kontakt",label:"Kontakt"}}/>
 <CommunityStatement kicker="NE LOGA PRO LOGA" title="Partnerství má být dohledatelné a přiměřené." text="Partner se do Pansofie nevkládá jako dekorace. Každá spolupráce má mít jasnou roli, kontext a pravidla bezpečnosti, hlavně tam, kde se účastní mladí lidé." aside="účel → rozsah → důkaz → bezpečí"/>
 <CommunityPrinciples items={ROLES}/>
 <CommunityTruth>Veřejná stránka nepředstírá seznam potvrzených partnerů. Partnerství je zveřejněné až tehdy, když existuje konkrétní role, kontext a odpovídající podklad.</CommunityTruth>
 <CommunityNext kicker="PRO ORGANIZACE" title="Partnerství začíná konkrétním účelem." text="Organizace mohou nabídnout kapacitu nebo přijít s projektem, který potřebuje bezpečný kontext spolupráce." href="/pro-organizace" label="Pro organizace"/>
 </PublicShell>}
