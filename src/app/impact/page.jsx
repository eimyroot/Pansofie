import { PublicShell } from "../../components/public/PublicShell";
import { TrustFamilyNav, TrustHero, TrustLedger, TrustNext, TrustStatement, TrustTruth } from "../../components/public/PansofieTrustFrame";
import { IMPACT_DIMENSIONS } from "../../domain/pansofie-content";

export const metadata={title:"Dopad",description:"Pansofie sleduje dopad v osmi oddělených dimenzích bez jediného skóre hodnoty člověka."};
const DIMENSIONS=IMPACT_DIMENSIONS.map(([title,text])=>({title,text,label:"DIMENZE"}));
const RULES=[
  {title:"Co se skutečně stalo.",text:"Dokončená aktivita, vytvořený výstup, odpracovaný čas nebo jiný konkrétní záznam.",label:"VÝSTUP"},
  {title:"Co lze doložit.",text:"Zkušenost, evidence nebo měření se ukládá odděleně od herních bodů a od hodnocení člověka.",label:"POZOROVÁNÍ"},
  {title:"Jen tolik, kolik víme.",text:"Modelový projekt není automaticky skutečný ekologický dopad. Menší přesné tvrzení je lepší než větší marketingový příběh.",label:"TVRZENÍ"},
];
export default function ImpactPage(){return <PublicShell active="/impact">
  <TrustFamilyNav active="/impact"/>
  <TrustHero variant="impact" kicker="DOPAD" title={<>Dopad není jedno číslo.</>} lead="Pansofie odděluje učení, dovednosti, rodinu, komunitu, přírodu, podnikavost a další oblasti. Smyslem není hodnotit člověka, ale zaznamenat konkrétní změny tam, kde pro ně existují podklady." primary={{href:"/projekty",label:"Vidět projekty"}} secondary={{href:"/instituce",label:"Instituce a zdroje"}}/>
  <TrustStatement kicker="DŮKAZ PŘED PŘÍBĚHEM" title="Nejdřív konkrétní změna. Teprve potom tvrzení o dopadu." text="Pansofie odděluje výstup, pozorování a interpretaci. Bez podkladů nevzniká automatické číslo, certifikát ani marketingová zásluha." aside="Výstup → evidence → kontext → interpretace"/>
  <TrustLedger className="tr02-ledger--dimensions" items={DIMENSIONS}/>
  <TrustLedger items={RULES}/>
  <TrustTruth>Jednotlivé pozorování dopadu má vlastní kontext a zdroj. Pansofie z nich nevyrábí veřejnou reputaci ani celkové skóre osobnosti. Pokud nejsou k dispozici skutečná data, stránka netvrdí, že dopad nastal.</TrustTruth>
  <TrustNext kicker="DOPAD V PRAXI" title="Projekt je místo, kde se více dimenzí může potkat." text="Green Hope projektový model používá oddělené dimenze dopadu bez agregovaného skóre." href="/projekty" label="Prozkoumat projekty"/>
</PublicShell>}
