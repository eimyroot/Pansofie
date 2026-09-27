import { PublicShell } from "../../components/public/PublicShell";
import { OrientationFamilyNav, OrientationHero, OrientationLedger, OrientationNext, OrientationPrinciples, OrientationSequence, OrientationStatement, OrientationTruth } from "../../components/public/PansofieOrientationFrame";
import { LEARNING_METHOD, ECOSYSTEM_CHAIN } from "../../domain/pansofie-content";

export const metadata={title:"Jak Pansofie funguje",description:"Pansofie nabízí možnosti poznávat, zkoušet, tvořit, sdílet a reflektovat bez povinného skórování člověka."};
const FLOW=[["Rozhlédnout se","Vybrat oblast, téma, projekt nebo situaci, která právě dává smysl."],["Vyzkoušet","Udělat konkrétní krok v reálném světě bez povinnosti všechno dokumentovat."],["Vytvořit","Proměnit poznání v něco vlastního: výrobek, řešení, péči, pomoc nebo projekt."],["Sdílet","Předat zkušenost dál, když je to vhodné a bezpečné. Sdílení není povinné."],["Reflektovat","Zastavit se u toho, co fungovalo, co ne a co má smysl zkusit příště."]];
const ECOSYSTEM=ECOSYSTEM_CHAIN.map((title)=>({title,text:"Každý uzel může být vstupem do stejného propojeného rámce.",href:"/o-nas",label:"EKOSYSTÉM"}));
export default function HowItWorksPage(){return <PublicShell active="/jak-to-funguje">
 <OrientationFamilyNav active="/jak-to-funguje"/>
 <OrientationHero variant="how" kicker="JAK PANSOFIE FUNGUJE" title={<>Možnost něco udělat. Ne další systém povinností.</>} lead="Pansofie vytváří cesty od poznání ke zkušenosti. Člověk se může rozhlédnout, vybrat si smysluplný vstup a pokračovat vlastním tempem." primary={{href:"/projekty",label:"Podívat se na projekty"}} secondary={{href:"/pansofie-go",label:"Poznat Pansofie GO"}}/>
 <OrientationStatement kicker="ZÁKLADNÍ PRINCIP" title="Pansofie nabízí příležitost. Nevytváří povinnost." text="Žádný veřejný žebříček hodnoty člověka, žádný povinný důkaz každého kroku a žádné předstírání, že jedno číslo dokáže popsat rozvoj." aside="Pansofie vysvětluje. Young překládá svět mladým. GO umožňuje jednat."/>
 <OrientationPrinciples items={FLOW}/>
 <OrientationSequence title="Šest fází, které se mohou vracet." copy="Cyklus Poznej, Hraj, Udělej, Vytvoř, Sdílej, Reflektuj není povinný checklist pro každou drobnost." items={LEARNING_METHOD}/>
 <OrientationLedger items={ECOSYSTEM}/>
 <OrientationTruth>Pansofie Young je samostatná zkušenost pro děti a mladé. Pansofie GO je aplikace pro celý ekosystém Pansofie, ne jiný název pro Young.</OrientationTruth>
 <OrientationNext kicker="OD ORIENTACE K AKCI" title="Když chce člověk pokračovat do praxe, přichází Pansofie GO." text="GO převádí témata a projekty do konkrétních misí, spolupráce a portfolia podle věku, role a kontextu." href="/pansofie-go" label="Jak funguje Pansofie GO"/>
 </PublicShell>}
