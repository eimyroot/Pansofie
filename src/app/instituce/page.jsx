import { PublicShell } from "../../components/public/PublicShell";
import { TrustFamilyNav, TrustHero, TrustLedger, TrustNext, TrustStatement, TrustTruth } from "../../components/public/PansofieTrustFrame";

export const metadata={title:"Instituce a cirkulární propojení",description:"Jak mohou školy a organizace v Pansofii propojovat projektové potřeby, materiálové přebytky a konkrétní spolupráci."};
const FLOW=[
  {title:"Organizace nabídne přebytek",text:"Materiál, vybavení nebo jiný zdroj dostane srozumitelný popis a podmínky předání.",label:"NABÍDKA",meta:"materiál · vybavení · kapacita"},
  {title:"Škola popíše projektovou potřebu",text:"Potřeba vzniká z konkrétního projektu, ne z obecného katalogu přání.",label:"POTŘEBA",meta:"projekt · místo · účel"},
  {title:"Pansofie hledá smysluplný překryv",text:"Matching má hledat významovou souvislost, ne pouze shodu jednoho slova.",label:"PŘEKRYV",meta:"souvislost · kontext"},
  {title:"Lidé rozhodnou o dalším kroku",text:"Propojení je návrh. Rezervace, předání i další spolupráce zůstávají dobrovolné.",label:"ROZHODNUTÍ",meta:"lidé · oprávnění · dohoda"},
];
const EXAMPLES=[
  {title:"Školní dílna",text:"Materiál pro bezpečný projekt s konkrétním zadáním.",label:"PŘÍKLAD"},{title:"Komunitní oprava",text:"Věci a díly, které mohou znovu sloužit.",label:"PŘÍKLAD"},
  {title:"Městské pěstování",text:"Nádoby, konstrukce a vybavení pro pilotní záhony.",label:"PŘÍKLAD"},{title:"Prototyp",text:"Zbytek materiálu jako vstup pro návrh a testování.",label:"PŘÍKLAD"},
];
export default function InstitutionsPage(){return <PublicShell active="/instituce">
  <TrustFamilyNav active="/instituce"/>
  <TrustHero variant="institutions" kicker="ŠKOLY × ORGANIZACE" title={<>Co jedné instituci přebývá, druhé může chybět.</>} lead="Školy mohou popsat skutečné projektové potřeby. Organizace mohou nabídnout čisté materiálové přebytky nebo kapacitu. Pansofie mezi nimi hledá smysluplný překryv." primary={{href:"/pro-organizace",label:"Pro organizace"}} secondary={{href:"/digitalni-kompost",label:"Materiály v oběhu"}}/>
  <TrustStatement kicker="DRUHÁ ŠANCE PRO MATERIÁL" title="Druhý život materiálu začíná konkrétní potřebou, ne algoritmem." text="Matching pomáhá objevit souvislost. Konečné rozhodnutí, podmínky a skutečné předání zůstávají na lidech." aside="Nabídka → potřeba → překryv → rozhodnutí"/>
  <TrustLedger items={FLOW}/>
  <TrustLedger className="tr02-ledger--dimensions" items={EXAMPLES}/>
  <TrustTruth>Veřejná stránka nepředstírá živou materiálovou banku ani ověřené partnery. Skutečné nabídky, projektové potřeby a oprávnění patří do přihlášeného institucionálního prostoru. Matching nevyrábí automatické ESG zásluhy.</TrustTruth>
  <TrustNext kicker="DVA VSTUPY" title="Škola přináší projekt. Organizace může přinést zdroj." text="Obě strany mají vlastní kontext a odpovědnost. Pansofie je propojuje kolem konkrétního účelu." href="/pro-organizace" label="Pro organizace"/>
</PublicShell>}
