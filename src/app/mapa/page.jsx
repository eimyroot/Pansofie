import { PublicShell } from "../../components/public/PublicShell";
import { PeoplePlaceFamilyNav, PeoplePlaceHero, PeoplePlaceLedger, PeoplePlaceNext, PeoplePlaceStatement, PeoplePlaceTruth } from "../../components/public/PansofiePeoplePlaceFrame";
import { CHECKPOINTS } from "../../domain/pansofie-content";

export const metadata={title:"Mapa",description:"Orientační mapa projektů a checkpointů Pansofie bez zveřejňování přesné polohy dětí."};
const PLACES=CHECKPOINTS.map(([title,place,type,status])=>({title,text:place,label:type,meta:status}));
export default function MapPage(){return <PublicShell active="/mapa">
  <PeoplePlaceFamilyNav active="/mapa"/>
  <PeoplePlaceHero variant="map" kicker="MAPA PANSOFIE" title={<>Místa, kde se myšlenka mění ve zkušenost.</>} lead="Mapa ukazuje projekty, laboratoře a příležitosti. U mladých lidí neslouží k veřejnému sdílení přesné polohy ani k hledání lidí v okolí." checkpoints={CHECKPOINTS} primary={{href:"/projekty",label:"Prozkoumat projekty"}} secondary={{href:"/mapa-kolobehu",label:"Mapa koloběhu"}}/>
  <PeoplePlaceStatement kicker="MÍSTO, NE POLOHA ČLOVĚKA" title="Mapa ukazuje příležitosti. Ne lidi pod lupou." text="Veřejná vrstva může ukázat projekt, zahradu, školu, laboratoř nebo jiné místo, které je bezpečné zveřejnit. Osobní poloha, domácí adresa ani živý pohyb dítěte nejsou veřejným obsahem Pansofie." aside="Projekt ano. Přesná poloha dítěte ne."/>
  <PeoplePlaceLedger items={PLACES}/>
  <PeoplePlaceTruth>Žádné veřejné sledování lidí, dětí ani jejich živého pohybu. Osobní poloha, domácí adresa nebo živý pohyb dítěte na veřejnou vrstvu nepatří. Body výše jsou DEMO data z produktového modelu.</PeoplePlaceTruth>
  <PeoplePlaceNext kicker="OD MAPY K AKCI" title="Smyslem mapy není sledovat. Smyslem je najít bezpečný vstup do projektu." text="První skutečný projektový flow už funguje v Green Hope a Pansofie GO." href="/projekty" label="Prozkoumat projekty"/>
</PublicShell>}
