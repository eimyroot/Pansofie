import { ProgramStoryPage } from "../../components/public/ProgramStoryPage";
import { URBAN_FARM_CYCLE } from "../../domain/pansofie-content";
import { pansofiePhoto } from "../../domain/asset-system";

export const metadata = {
  title: "Urban Family Farm",
  description: "Urban Family Farm propojuje pěstování, zpracování, ekonomiku, podnikavost a spolupráci v praktickém cyklu.",
};

const PRINCIPLES = [
  ["Pěstování jako začátek", "Růst rostlin dává přirozený rámec pro pozorování, plánování, trpělivost i odpovědnost."],
  ["Ekonomika bez abstrakce", "Náklady, cena, prodej a reinvestice vznikají kolem skutečného produktu a konkrétní práce."],
  ["Rodina a tým", "Úkoly se dají rozdělit podle věku, zkušenosti a rolí. Společná činnost neznamená sdílený účet ani ztrátu soukromí."],
  ["Od prototypu k podnikavosti", "Cílem není dělat z každého podnikatele, ale umožnit bezpečně vyzkoušet tvorbu hodnoty a odpovědnost za výsledek."],
];

export default function UrbanFamilyFarmPage() {
  return <ProgramStoryPage active="/projekty" eyebrow="URBAN FAMILY FARM" title="Pěstovat. Vytvořit. Spočítat. Pochopit." lead="Urban Family Farm je praktická laboratoř života, kde se příroda propojuje s matematikou, ekonomikou, tvorbou produktu a spoluprací." image={pansofiePhoto("curiosity-nature-16x9")} imageAlt="Pozorování rostlin a přírody jako součást praktického učení" introTitle="Jeden cyklus propojí více oblastí života najednou." intro="Pěstování není konečný cíl. Je to vstup do práce se zdroji, kvalitou, odpovědností, náklady, hodnotou práce a rozhodováním o tom, co s výsledkem dál." principles={PRINCIPLES} sequence={URBAN_FARM_CYCLE} topics={["Pěstování","Výživa","Matematika","Finance","Práce","Tvorba produktu","Prodej","Reinvestice","Týmová spolupráce"]} cta={{href:"/projekty",label:"Prozkoumat projekty",title:"Začít lze malým pěstebním cyklem.",text:"Mikrogreens a další krátké pěstitelské modely jsou na webu vedené jako modelové projekty, dokud nebudou mít konkrétní pilot a data."}} note="Ekonomická cesta je oddělená od XP a herních úrovní. Herní postup není peněžní hodnota ani hodnocení člověka."/>;
}
