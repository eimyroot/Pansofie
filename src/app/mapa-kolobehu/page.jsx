import { PublicShell } from "../../components/public/PublicShell";
import { PeoplePlaceFamilyNav, PeoplePlaceHero, PeoplePlaceLedger, PeoplePlaceNext, PeoplePlaceStatement, PeoplePlaceTruth } from "../../components/public/PansofiePeoplePlaceFrame";

export const metadata={title:"Mapa koloběhu",description:"Jak mohou v Pansofii obíhat materiály, zkušenosti, projekty a pomoc mezi ověřenými kontexty."};
const LAYERS=[
  {title:"Materiály",text:"Přebytky, vybavení a zdroje, které mohou najít další využití.",label:"ZDROJ"},
  {title:"Dovednosti",text:"Zkušenost, mentoring a praktická pomoc mezi generacemi a projekty.",label:"ZKUŠENOST"},
  {title:"Školy a projekty",text:"Konkrétní potřeby, které dávají propojení jasný smysl a kontext.",label:"POTŘEBA"},
  {title:"Organizace",text:"Know-how, kapacita a zdroje, které mohou vstoupit do místní spolupráce.",label:"KAPACITA"},
];
export default function CycleMapPage(){return <PublicShell active="/mapa-kolobehu">
  <PeoplePlaceFamilyNav active="/mapa-kolobehu"/>
  <PeoplePlaceHero variant="cycle" kicker="MAPA KOLOBĚHU" title={<>Nejen kde co je. Hlavně kam může hodnota pokračovat.</>} lead="Mapa koloběhu ukazuje vztah mezi materiály, dovednostmi, školami, projekty a organizacemi. Veřejná vrstva neslouží ke sledování lidí ani k zobrazování jejich přesné polohy." primary={{href:"/digitalni-kompost",label:"Digitální kompost"}} secondary={{href:"/instituce",label:"Instituce"}}/>
  <PeoplePlaceStatement kicker="VEŘEJNÁ VS. APLIKAČNÍ MAPA" title="Veřejně jen to, co je bezpečné zveřejnit." text="Skutečné geolokační funkce, rezervace nebo práce s aktuální polohou patří až do oprávněného aplikačního kontextu. Veřejný web ukazuje princip a modelové typy uzlů." aside="Zdroj → potřeba → propojení → další použití"/>
  <PeoplePlaceLedger items={LAYERS}/>
  <PeoplePlaceTruth>Veřejný web ukazuje princip, ne živé rezervace, nabídky ani osobní polohu. Přesná geolokace patří jen do oprávněného aplikačního kontextu.</PeoplePlaceTruth>
  <PeoplePlaceNext kicker="DALŠÍ VRSTVA" title="Koloběh začíná konkrétním přebytkem nebo potřebou." href="/digitalni-kompost" label="Poznat Digitální kompost"/>
</PublicShell>}
