import { PublicShell } from "../../components/public/PublicShell";
import { ProjectFamilyNav, ProjectHero, ProjectIndex, ProjectNext, ProjectPrinciples, ProjectStatement, ProjectTruth } from "../../components/public/PansofieProjectsFrame";

export const metadata = { title: "Pansofie Labs", description: "Pansofie Labs jako bezpečný prostor pro pokusy, pozorování a praktické projekty." };
const LABS = [
  {title:"Green Hope",text:"Příroda, péče a konkrétní místo.",href:"/green-hope",label:"PŘÍRODA",status:"Projektový směr"},
  {title:"Urban Family Farm",text:"Pěstování, práce, hodnota a ekonomika.",href:"/urban-family-farm",label:"HODNOTA",status:"Prototyp"},
  {title:"Digitální kompost",text:"Materiály, potřeba a druhý život věcí.",href:"/digitalni-kompost",label:"MATERIÁLY",status:"Koncept"},
];
const PRINCIPLES=[["Experimenty","Testujeme malé prototypy před velkými sliby."],["Pozorování","Hypotéza se opírá o skutečný kontext a výsledek."],["Sdílení","To, co funguje, může pomoci škole, rodině nebo komunitě."],["Dopad","Dopad se dokládá jen tam, kde pro něj existují podklady."]];

export default function LabsPage(){return <PublicShell active="/projekty" current="/labs">
  <ProjectFamilyNav active="/labs"/>
  <ProjectHero variant="labs" kicker="PANSOFIE LABS" title={<>Bezpečný prostor pro pokusy.</>} lead="Labs převádějí otázku do malého prototypu, pozorování a sdílení. Experiment zůstává experimentem, dokud nemá skutečný výsledek." primary={{href:"/projekty",label:"Přehled projektů"}} secondary={{href:"/kontakt",label:"Kontakt"}}/>
  <ProjectStatement kicker="OD OTÁZKY K OVĚŘENÍ" title="Prototyp není důkaz. Je to způsob, jak zjistit víc." text="Pansofie Labs mají chránit prostor pro zvědavost a zároveň udržet hranici mezi nápadem, pokusem a skutečně doloženým výsledkem." aside="otázka → prototyp → pozorování → sdílení"/>
  <ProjectPrinciples items={PRINCIPLES}/>
  <ProjectIndex items={LABS}/>
  <ProjectTruth>Žádný laboratorní prototyp se na veřejném webu nevydává za ověřený dopad, funkční provoz nebo potvrzené partnerství bez odpovídajících podkladů.</ProjectTruth>
  <ProjectNext kicker="PROJEKTY" title="Laboratoř dává smysl tehdy, když vede ke konkrétní zkušenosti." text="Přehled projektů ukazuje další místa, kde se otázka může proměnit v bezpečný a čitelný praktický krok." href="/projekty" label="Přehled projektů"/>
</PublicShell>}
