import { PublicShell } from "../../components/public/PublicShell";
import { ProjectFamilyNav, ProjectHero, ProjectNext, ProjectPrinciples, ProjectSequence, ProjectStatement, ProjectTopics, ProjectTruth } from "../../components/public/PansofieProjectsFrame";
import { GREEN_HOPE_TOPICS, LEARNING_METHOD } from "../../domain/pansofie-content";

export const metadata={title:"Green Hope",description:"Green Hope propojuje ekologické poznání s pěstováním, péčí o místo a konkrétními komunitními projekty."};
const PRINCIPLES=[["Začít u konkrétního místa","Půda, voda, rostliny a okolí lze pozorovat a pečovat o ně."],["Učit se zkušeností","Poznání se propojuje s pěstováním, měřením, tvorbou a praktickou péčí."],["Růst ke komunitě","Malá zkušenost může pokračovat v rodině, škole nebo společném projektu."],["Měřit jen to, co víme","Dopad se zaznamenává po dimenzích, ne jedním magickým skóre."]];

export default function GreenHopePage(){return <PublicShell active="/projekty" current="/green-hope">
  <ProjectFamilyNav active="/green-hope"/>
  <ProjectHero variant="green" kicker="GREEN HOPE" title={<>Příroda se neučí jen z obrázku.</>} lead="Green Hope propojuje ekologické souvislosti s pěstováním, péčí o konkrétní místo a společnými projekty. Začít lze jednou rostlinou, ne velkým závazkem." primary={{href:"/mise/rostlina",label:"Vypěstuj první rostlinu"}} secondary={{href:"/projekty",label:"Přehled projektů"}}/>
  <ProjectStatement kicker="ZELEŇ VE MĚSTĚ" title="Zeleň není dekorace. Je součást fungování místa." text="Strom, záhon nebo malá pěstební plocha mohou být místem učení, péče i setkávání generací. Green Hope začíná konkrétní zkušeností, ne abstraktním ekologickým slibem." aside="pozoruj → pěstuj → pečuj → sdílej"/>
  <ProjectPrinciples items={PRINCIPLES}/>
  <ProjectSequence steps={LEARNING_METHOD}/>
  <ProjectTopics topics={GREEN_HOPE_TOPICS}/>
  <ProjectTruth>Důkaz nebo reflexe nejsou povinnou vstupenkou k účasti. Modelové projekty nejsou vydávány za existující lokality ani za naměřený ekologický dopad.</ProjectTruth>
  <ProjectNext title="První konkrétní Green Hope mise už funguje." text="Mise je propojená s modelovým projektem Komunitní zahrada a používá společné mission jádro Pansofie." href="/mise/rostlina" label="Vypěstuj první rostlinu"/>
</PublicShell>}
