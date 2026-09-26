import { ProgramStoryPage } from "../../components/public/ProgramStoryPage";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

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
  return <ProgramStoryPage active="/pro-skoly" current="/pro-skoly" eyebrow="PRO ŠKOLY" title="Škola může učit svět jako celek." lead="Pansofie dává školám rámec pro mezioborové učení, mise a projekty, které propojují učivo s reálným životem, komunitou a praktickou zkušeností." image={pansofieScene("school-life-learning")} imageAlt="Schéma propojení školního učení se skutečným životem" introTitle="Ne další předmět. Vrstva, která propojuje to, co už škola dělá." intro="Škola může použít jednotlivou misi, celý projekt nebo dlouhodobější kontext. Pansofie není postavená na povinném skórování dítěte ani na veřejném porovnávání žáků." principles={PRINCIPLES} editorialFeature={{
    eyebrow: "MĚSTO JAKO UČEBNA",
    title: "Děti nepotřebují jen další obrazovku. Potřebují svět kolem sebe.",
    text: "Zahrada, dílna, místní firma, knihovna i zkušenost starších lidí mohou být součástí učení. AI do toho vstupuje jako nástroj pro otázky, hledání vzorců a tvorbu, ne jako náhrada úsudku.",
    image: pansofiePhoto("growing-together-16x9"),
    imageAlt: "Mladší a starší lidé spolupracují na praktickém projektu",
    items: [["Příroda", "Půda, voda, pěstování a městská zeleň."], ["Materiál", "Dřevo, textil a další zbytky mohou dostat druhý život."], ["Generace", "Rodiče, senioři a odborníci přinášejí zkušenost do bezpečného kontextu."], ["Technologie", "AI pomáhá zkoumat a tvořit, rozhodnutí zůstává na lidech."]],
    link: { href: "/instituce", label: "Propojit školu s okolím" },
  }} sequence={["Vybrat oblast nebo problém","Přizpůsobit zkušenost třídě","Rozdělit role a bezpečný kontext","Udělat konkrétní krok","Volitelně doložit výstup","Reflektovat a navázat"]} topics={["16 oblastí života","7 rozvojových cest","Green Hope","Urban Family Farm","Family Team","Knowledge Exchange","Mise a projekty","Portfolio zkušeností"]} cta={{href:"/projekty",label:"Prozkoumat projekty",title:"Začít lze jedním dobře zvoleným projektem.",text:"Veřejná část ukazuje modely a prototypy. Školní účetový kontext je oddělený a používá role a membership oprávnění."}} note="Konkrétní školní metodiky, kurikulum mapping a učitelská administrace se budou zpřístupňovat postupně nad existujícím school contextem."/>;
}
