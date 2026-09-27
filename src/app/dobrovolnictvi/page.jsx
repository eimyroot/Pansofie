import { PublicShell } from "../../components/public/PublicShell";
import { EngageFamilyNav, EngageHero, EngageLedger, EngageNext, EngagePrinciples, EngageStatement, EngageTruth } from "../../components/public/PansofieEngageFrame";

export const metadata={title:"Dobrovolnictví",description:"Dobrovolná účast v projektech a komunitě Pansofie bez povinného skórování nebo dokazování."};
const STEPS=[["Vyber si","Začít lze tématem, projektem nebo konkrétní místní potřebou."],["Udělej krok","Smyslem je skutečná zkušenost, ne sbírání bodů za přítomnost."],["Sdílej volitelně","Příběh, fotka nebo reflexe zůstávají pro běžnou účast dobrovolné."],["Navazuj","Jedna zkušenost může pokračovat v rodině, škole, komunitě nebo dalším projektu."]];
const ENTRY=[{title:"Lokální akce",text:"Zahrada, dílna, sousedská pomoc nebo školní projekt.",href:"/projekty",label:"MÍSTO"},{title:"Dlouhodobá spolupráce",text:"Zapojení do projektu, který má jasný kontext a roli.",href:"/partnerstvi",label:"SPOLUPRÁCE"},{title:"Sdílení znalostí",text:"Předat zkušenost bez nátlaku na veřejné vystupování.",href:"/sit",label:"ZKUŠENOST"}];
export default function VolunteeringPage(){return <PublicShell active="/dobrovolnictvi">
 <EngageFamilyNav active="/dobrovolnictvi"/>
 <EngageHero variant="volunteer" kicker="DOBROVOLNICTVÍ" title={<>Příležitost, ne povinnost.</>} lead="Zapojení v Pansofii má vycházet z konkrétního projektu, potřeby nebo zájmu. Běžná účast není podmíněná veřejným skóre, povinnou evidencí ani reflexí." primary={{href:"/projekty",label:"Projekty"}} secondary={{href:"/kontakt",label:"Kontakt"}}/>
 <EngageStatement kicker="MALÝ KROK MÁ KONTEXT" title="Dobrovolnictví není další systém povinností." text="Čas, dovednost nebo péče mají smysl tehdy, když se potkají s konkrétní potřebou. Pansofie proto netlačí účastníka do veřejného dokazování, fotografie ani osobního skóre." aside="zájem → malý krok → zkušenost → navázání"/>
 <EngagePrinciples items={STEPS}/><EngageLedger items={ENTRY}/>
 <EngageTruth>Účast není podmíněná povinnou fotografií, veřejnou reflexí ani reputačním skóre. Člověk může udělat jeden malý krok a skončit právě tam.</EngageTruth>
 <EngageNext kicker="PRVNÍ KROK" title="Nejdřív se podívej na projekty." text="Pokud máš konkrétní nabídku pomoci nebo místní potřebu, kontakt slouží jako další vstup." href="/projekty" label="Prozkoumat projekty"/>
 </PublicShell>}
