import { ProgramStoryPage } from "../../components/public/ProgramStoryPage";
import { pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Pro školy",
  description: "Pansofie propojuje výuku s praktickými projekty, mezioborovými souvislostmi a bezpečným školním kontextem.",
};

const PRINCIPLES = [
  ["Mezioborově", "Jedna skutečná situace může propojit přírodu, technologie, finance, vztahy, občanství i tvorbu."],
  ["Prakticky", "Mise a projekty dávají prostor něco pozorovat, vyzkoušet, vytvořit a společně reflektovat."],
  ["S rolí učitele", "Učitel může pracovat samostatně nebo v rámci školy a třídy. Přístupy se řídí členstvím a oprávněními, ne sdíleným heslem."],
  ["Bezpečně", "Young zkušenost používá věkové a kontextové limity. Otevřené veřejné vyhledávání dětí ani přesná veřejná poloha nejsou součástí návrhu."],
];

export default function SchoolsPage() {
  return <ProgramStoryPage active="/pro-skoly" eyebrow="PRO ŠKOLY" title="Škola může učit svět jako celek." lead="Pansofie dává školám rámec pro mezioborové učení, mise a projekty, které propojují učivo s reálným životem, komunitou a praktickou zkušeností." image={pansofieScene("school-life-learning")} imageAlt="Schéma propojení školního učení se skutečným životem" introTitle="Ne další předmět. Vrstva, která propojuje to, co už škola dělá." intro="Škola může použít jednotlivou misi, celý projekt nebo dlouhodobější kontext. Pansofie není postavená na povinném skórování dítěte ani na veřejném porovnávání žáků." principles={PRINCIPLES} sequence={["Vybrat oblast nebo problém","Přizpůsobit zkušenost třídě","Rozdělit role a bezpečný kontext","Udělat konkrétní krok","Volitelně doložit výstup","Reflektovat a navázat"]} topics={["16 oblastí života","7 rozvojových cest","Green Hope","Urban Family Farm","Family Team","Knowledge Exchange","Mise a projekty","Portfolio zkušeností"]} cta={{href:"/projekty",label:"Prozkoumat projekty",title:"Začít lze jedním dobře zvoleným projektem.",text:"Veřejná část ukazuje modely a prototypy. Školní účetový kontext je oddělený a používá role a membership oprávnění."}} note="Konkrétní školní metodiky, kurikulum mapping a učitelská administrace se budou zpřístupňovat postupně nad existujícím school contextem."/>;
}
