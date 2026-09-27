import { PublicShell } from "../../components/public/PublicShell";
import { ProjectFamilyNav, ProjectHero, ProjectNext, ProjectPrinciples, ProjectSequence, ProjectStatement, ProjectTopics, ProjectTruth } from "../../components/public/PansofieProjectsFrame";
import { URBAN_FARM_CYCLE } from "../../domain/pansofie-content";

export const metadata={title:"Urban Family Farm",description:"Urban Family Farm propojuje pěstování, zpracování, ekonomiku, podnikavost a spolupráci v praktickém cyklu."};
const PRINCIPLES=[["Pěstování jako začátek","Růst rostlin dává rámec pro pozorování, plánování, trpělivost i odpovědnost."],["Ekonomika bez abstrakce","Náklady, cena a reinvestice vznikají kolem produktu a konkrétní práce."],["Rodina a tým","Úkoly se dají rozdělit podle věku, zkušenosti a rolí bez ztráty identity."],["Bezpečný prototyp","Cílem je vyzkoušet tvorbu hodnoty, ne dělat z každého podnikatele."]];
const TOPICS=["Pěstování","Výživa","Matematika","Finance","Práce","Tvorba produktu","Prodej","Reinvestice","Týmová spolupráce"];

export default function UrbanFamilyFarmPage(){return <PublicShell active="/projekty" current="/urban-family-farm">
  <ProjectFamilyNav active="/urban-family-farm"/>
  <ProjectHero variant="farm" kicker="URBAN FAMILY FARM" title={<>Pěstovat. Vytvořit. Spočítat. Pochopit.</>} lead="Urban Family Farm je praktická laboratoř života, kde se příroda propojuje s matematikou, ekonomikou, tvorbou produktu a spoluprací." primary={{href:"/projekty",label:"Přehled projektů"}} secondary={{href:"/16-oblasti#finance",label:"Finance v souvislostech"}}/>
  <ProjectStatement kicker="MIKROGREENS · MALÝ CYKLUS" title="Na malém pěstitelském cyklu lze pochopit překvapivě velkou část světa." text="Semeno, práce, hygiena, náklady, cena a rozhodnutí tvoří jeden skutečný kontext. Dokud nevznikne konkrétní pilot, Pansofie tento model nevydává za provozní farmu ani obchodní výsledek." aside="pěstuj → zpracuj → spočítej → rozhodni"/>
  <ProjectPrinciples items={PRINCIPLES}/>
  <ProjectSequence title="Jeden cyklus. Devět praktických rozhodnutí." steps={URBAN_FARM_CYCLE}/>
  <ProjectTopics topics={TOPICS}/>
  <ProjectTruth>Ekonomická cesta je oddělená od XP a herních úrovní. Herní postup není peněžní hodnota ani hodnocení člověka.</ProjectTruth>
  <ProjectNext title="Začít lze malým pěstebním cyklem." text="Mikrogreens a další krátké pěstitelské modely zůstávají modelovými projekty, dokud nemají konkrétní pilot a data." href="/projekty" label="Prozkoumat projekty"/>
</PublicShell>}
