import { PublicShell } from "../../components/public/PublicShell";
import { CommunityFamilyNav, CommunityHero, CommunityLedger, CommunityNext, CommunityPrinciples, CommunityStatement, CommunityTruth } from "../../components/public/PansofieCommunityFrame";

export const metadata = { title: "Komunita", description: "Komunita Pansofie kolem skutečných projektů, bezpečných vztahů a místní spolupráce." };
const ENTRIES=[
 {title:"Síť",text:"Role a vztahy propojené přes konkrétní práci.",href:"/sit",label:"VZTAHY"},
 {title:"Pro školy",text:"Bezpečné školní kontexty a projektová výuka.",href:"/pro-skoly",label:"UČENÍ"},
 {title:"Pro organizace",text:"Know-how, materiál a kapacita pro jasný účel.",href:"/pro-organizace",label:"ZDROJE"},
 {title:"Partneři",text:"Spolupráce bez předstírání ověřených partnerství.",href:"/partneri",label:"KAPACITA"},
];
const PRINCIPLES=[["Rodiny","Společné zkušenosti při zachování vlastní identity každého člověka."],["Školy","Bezpečné třídy a projektové kontexty s jasnými rolemi."],["Místa","Komunitní projekty a ověřené kontexty místo veřejného hledání lidí v okolí."],["Organizace","Zdroje, know-how a kapacita navázané na konkrétní potřebu."]];

export default function CommunityPage(){return <PublicShell active="/komunita">
 <CommunityFamilyNav active="/komunita"/>
 <CommunityHero variant="overview" kicker="KOMUNITA" title={<>Komunita, ne feed.</>} lead="Pansofie staví komunitu kolem rodin, škol, míst, témat a konkrétních projektů. Ne kolem veřejného katalogu lidí, jejich skóre nebo přesné polohy." primary={{href:"/sit",label:"Otevřít síť"}} secondary={{href:"/pro-koho",label:"Najít svůj vstup"}}/>
 <CommunityStatement kicker="VZTAHY KOLEM ÚČELU" title="Silná komunita nevzniká počtem kontaktů." text="Smysl vzniká tam, kde se vztah potká s konkrétní prací, místem nebo potřebou. Pansofie proto nevytváří veřejnou sociální síť lidí, ale propojuje bezpečné kontexty." aside="Blízkost není metrika. Důvěra vzniká z kontextu a role."/>
 <CommunityPrinciples items={PRINCIPLES}/>
 <CommunityLedger items={ENTRIES}/>
 <CommunityTruth>Žádné veřejné hledání lidí v okolí, žádná přesná poloha dítěte a žádné veřejné skóre člověka. Komunitní vrstva se opírá o kontext, projekt a oprávnění.</CommunityTruth>
 <CommunityNext kicker="SÍŤ" title="Komunita roste z konkrétní spolupráce." text="Síť Pansofie ukazuje, jak se mohou jednotlivé role propojit bez ztráty soukromí a bez potřeby veřejného feedu." href="/sit" label="Otevřít síť"/>
 </PublicShell>}
