import { PublicShell } from "../../components/public/PublicShell";
import { OrientationFamilyNav, OrientationHero, OrientationNext, OrientationPrinciples, OrientationStatement, OrientationTruth } from "../../components/public/PansofieOrientationFrame";
export const metadata={title:"Knihovna Pansofie",description:"Nápady, návody, zkušenosti a příklady, které mohou otevřít další cestu."};
const FORMATS=[["Návod","Postup, který lze pochopit, upravit a znovu použít."],["Příklad","Konkrétní situace s jasným kontextem, ne univerzální recept."],["Reflexe","Co fungovalo, co ne a co je dobré vědět příště."],["Zdroj","Dohledatelný podklad oddělený od názoru nebo modelového příkladu."]];
const ITEMS=[["Jak oživit prázdný kout v sousedství?","Podnět"],["Jak předat věc dál bez zbytečného odpadu","Návod"],["Mezigenerační hodina dovedností","Inspirace"],["Materiál jako začátek projektu","Cirkularita"],["Co může změnit deset minut času?","Podnět"],["Jak pozvat další lidi k nápadu","Návod"]];
export default function LibraryPage(){return <PublicShell active="/knihovna">
 <OrientationFamilyNav active="/knihovna"/>
 <OrientationHero variant="library" kicker="KNIHOVNA PANSOFIE" title={<>Místo, kde se dobré nápady neztrácejí.</>} lead="Návody, podněty, příklady a zkušenosti, které mohou někomu dalšímu otevřít cestu. Ne povinné úkoly, ale věci, které lze vzít, upravit nebo jen přečíst." primary={{href:"/blog",label:"Blog a zdroje"}} secondary={{href:"/16-oblasti",label:"Procházet témata"}}/>
 <OrientationStatement kicker="ZNALOST, KTERÁ CESTUJE" title="Dobrá zkušenost nemusí zůstat u člověka, který ji získal jako první." text="Knihovna má postupně spojovat návody, zkušenosti, zdroje a reflexe tak, aby šly bezpečně přenést do jiné rodiny, školy nebo komunity." aside="otázka → návod → příklad → reflexe → zdroj"/>
 <OrientationPrinciples items={FORMATS}/>
 <section className="or02-library-ledger">{ITEMS.map(([title,label],i)=><article key={title}><span>{String(i+1).padStart(2,"0")} · {label}</span><h3>{title}</h3><small>TÉMATICKÝ FORMÁT · NEPUBLIKOVANÝ PŘÍKLAD</small></article>)}</section>
 <OrientationTruth>Dokud konkrétní materiál není publikovaný a ověřený, Pansofie ho za hotový zdroj nevydává. Neoznačuje je za publikované články nebo ověřené externí zdroje. Tato stránka představuje strukturu a formáty, ne fiktivní knihovnu hotových článků.</OrientationTruth>
 <OrientationNext kicker="KNIHOVNA ROSTE POSTUPNĚ" title="Nejdřív struktura. Potom skutečné zdroje." text="Blog a zdroje používají stejnou transparentní hranici mezi tématem, návrhem a publikovaným materiálem." href="/blog" label="Přejít na blog a zdroje"/>
 </PublicShell>}
