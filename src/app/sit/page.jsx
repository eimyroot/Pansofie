import { PublicShell } from "../../components/public/PublicShell";
import { CommunityDemo, CommunityFamilyNav, CommunityHero, CommunityLedger, CommunityNext, CommunityPrinciples, CommunityStatement, CommunityTruth } from "../../components/public/PansofieCommunityFrame";
import { CHECKPOINTS, KNOWLEDGE_EXCHANGE } from "../../domain/pansofie-content";

export const metadata={title:"Síť spolupráce",description:"Lokální skupiny, školy, rodiny a projekty jako propojená síť Pansofie."};
const PRINCIPLES=[["Lokálně","Skutečné vztahy začínají v rodině, škole, komunitě nebo konkrétním projektu."],["Bezpečně","Mladí lidé se propojují přes ověřené kontexty, ne přes veřejné hledání lidí v okolí."],["Mezigeneračně",KNOWLEDGE_EXCHANGE],["Otevřeně","Síť má propojovat zkušenosti a zdroje bez veřejného skórování člověka."]];
const ENTRY=[
 {title:"Rodina",text:"První tým, ve kterém se zkušenost, péče a odpovědnost potkávají.",href:"/komunita",label:"BLÍZKÝ KONTEXT"},
 {title:"Škola",text:"Bezpečný kontext pro projekty, mise a mezioborové učení.",href:"/pro-skoly",label:"UČENÍ"},
 {title:"Komunita",text:"Místní potřeby, péče o místo a spolupráce kolem konkrétního účelu.",href:"/komunita",label:"MÍSTO"},
 {title:"Organizace",text:"Know-how, materiál, prostor nebo kapacita navázaná na ověřený projekt.",href:"/pro-organizace",label:"ZDROJE"},
];
export default function NetworkPage(){return <PublicShell active="/sit">
 <CommunityFamilyNav active="/sit"/>
 <CommunityHero variant="network" kicker="SÍŤ PANSOFIE" title={<>Propojení, které začíná blízko.</>} lead="Pansofie může spojovat jednotlivce, rodiny, školy, komunity a organizace. Ne jako veřejný katalog lidí, ale přes ověřené vztahy, projekty a bezpečné kontexty." primary={{href:"/komunita",label:"Otevřít komunitu"}} secondary={{href:"/pro-organizace",label:"Pro organizace"}}/>
 <CommunityStatement kicker="KOMUNITA, NE FEED" title="Síť není sbírka kontaktů. Je to vztah v konkrétním kontextu." text="Rodina, třída, místní firma, senior, spolek nebo městská iniciativa mohou být součástí stejného projektu, aniž by se z Pansofie stala veřejná sociální síť lidí a jejich poloh." aside="Každý člověk něco umí a každý se může něco naučit."/>
 <CommunityPrinciples items={PRINCIPLES}/>
 <CommunityLedger items={ENTRY}/>
 <CommunityDemo items={CHECKPOINTS}/>
 <CommunityTruth>Ukázkové checkpointy nejsou seznamem potvrzených partnerů ani přesnými místy dětí. Jsou označené jako DEMO a slouží pouze k vysvětlení produktového modelu.</CommunityTruth>
 <CommunityNext kicker="SPOLUPRÁCE" title="Síť roste z konkrétních projektů, ne z počtu kontaktů." text="Organizace a školy mohou do Pansofie vstupovat přes vlastní ověřený kontext a konkrétní spolupráci." href="/pro-organizace" label="Pro organizace"/>
 </PublicShell>}
