import { PublicShell } from "../../components/public/PublicShell";
import { ProjectFamilyNav, ProjectHero, ProjectNext, ProjectPrinciples, ProjectSequence, ProjectStatement, ProjectTopics, ProjectTruth } from "../../components/public/PansofieProjectsFrame";

export const metadata={title:"Digitální kompost",description:"Cirkulární vrstva Pansofie pro předávání materiálu, věcí a zdrojů, které ještě mohou sloužit dál."};
const FLOW=[["Nabídnout","Popsat materiál nebo věc, která už není potřeba na původním místě."],["Najít využití","Přebytek má směřovat tam, kde může být skutečně užitečný."],["Domluvit předání","Místo, podmínky a bezpečnost se řeší konkrétně mezi oprávněnými účastníky."],["Uzavřít kruh","Potvrdit, že předání proběhlo, bez povinného veřejného příběhu nebo skóre."]];
const MATERIALS=["Dřevo","Textil","Obaly","Vybavení"];

export default function CompostPage(){return <PublicShell active="/projekty" current="/digitalni-kompost">
  <ProjectFamilyNav active="/digitalni-kompost"/>
  <ProjectHero variant="compost" kicker="DIGITÁLNÍ KOMPOST" title={<>Co už nepotřebuje jeden, může ještě posloužit druhému.</>} lead="Cirkulární vrstva Pansofie propojuje přebytky s konkrétním využitím. Ne jako anonymní tržiště, ale jako součást projektů, škol a místní spolupráce." primary={{href:"/instituce",label:"Propojení institucí"}} secondary={{href:"/projekty",label:"Přehled projektů"}}/>
  <ProjectStatement kicker="MATERIÁLY V OBĚHU" title="Odpad je často jen materiál bez dalšího plánu." text="Dřevo z výroby, zbytky textilu, čisté obaly nebo vybavení mohou být užitečné pro školní dílnu, komunitní opravu nebo prototyp. Veřejná Pansofie ukazuje princip, ne falešnou živou burzu zásob." aside="přebytek → potřeba → předání → další život"/>
  <ProjectPrinciples items={FLOW}/>
  <ProjectSequence title="Předání má čtyři čitelné kroky." steps={FLOW.map(([title])=>title)}/>
  <ProjectTopics topics={MATERIALS}/>
  <ProjectTruth>Veřejná stránka není živá materiálová banka. Nezobrazuje ověřené aktuální zásoby, rezervace ani skutečné nabídky organizací. Tyto funkce patří do řízeného aplikačního kontextu.</ProjectTruth>
  <ProjectNext kicker="CIRKULARITA V PRAXI" title="Materiál může být začátkem projektu." text="Propojení škol a organizací rozvíjí stejnou myšlenku na institucionální úrovni." href="/instituce" label="Propojení institucí"/>
</PublicShell>}
