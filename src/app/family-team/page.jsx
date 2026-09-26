import { ProgramStoryPage } from "../../components/public/ProgramStoryPage";
import { FAMILY_MISSIONS } from "../../domain/pansofie-content";

export const metadata = {
  title: "Family Team",
  description: "Family Team propojuje rodinu přes společné mise, projekty a učení při zachování individuálních identit a oprávnění.",
};

const PRINCIPLES = [
  ["Rodina jako tým, ne jeden účet", "Každý člen má vlastní identitu a přiměřené oprávnění. Sdílí se kontext a společné aktivity, ne hesla ani soukromí."],
  ["Společné role", "Někdo plánuje, někdo tvoří, organizuje, komunikuje nebo realizuje. Role se mohou měnit podle situace."],
  ["Mezigenerační učení", "Dospělí nepředávají jen znalosti dětem. Učení může proudit oběma směry a zapojovat i prarodiče."],
  ["Malé společné činy", "Vaření, pěstování, plánování výletu nebo pomoc komunitě mohou být plnohodnotnou zkušeností bez potřeby velkého projektu."],
];

export default function FamilyTeamPage() {
  return <ProgramStoryPage active="/projekty" current="/family-team" eyebrow="FAMILY TEAM" title="Rodina není jen publikum. Může být tým." lead="Family Team dává rodinám společný prostor pro mise, projekty, učení a reflexi, ale zachovává vlastní identitu a bezpečí každého člena." introTitle="Společná zkušenost může být silnější než další rodinný kalendář." intro="Pansofie pracuje s rodinou jako přirozeným místem spolupráce, odpovědnosti a předávání dovedností. Nejde o kontrolní panel rodiče nad dítětem, ale o bezpečný sdílený kontext." editorialFeature={{
    eyebrow: "RODINA JAKO PRVNÍ TÝM",
    title: "Společný projekt není sdílený účet.",
    text: "Family Team propojuje čas, dovednosti, péči a společné cíle, ale každý člen zůstává samostatnou identitou s vlastním soukromím a přiměřenými oprávněními. Rodina může něco tvořit společně, aniž by se z ní stal jeden účet nebo kontrolní panel.",
    imageAlt: "Různé generace spolupracují na společné praktické činnosti",
    items: [["Vlastní identita", "Každý člen má svůj účet, kontext a přiměřená oprávnění."], ["Společný záměr", "Projekt nebo mise mohou spojit rodinu bez povinného skórování."], ["Role podle situace", "Plánování, tvorba, péče i realizace se mohou přirozeně střídat."], ["Mezi generacemi", "Zkušenost může proudit od dětí k dospělým i opačným směrem."]],
    link: { href: "/osobni-rust", label: "Jak zkušenost putuje mezi generacemi" },
  }} principles={PRINCIPLES} sequence={["Vyberte společný záměr","Rozdělte si role","Udělejte konkrétní krok","Sdílejte výsledek podle potřeby","Krátce reflektujte","Navazujte další zkušeností"]} topics={FAMILY_MISSIONS} cta={{href:"/jak-to-funguje",label:"Jak Pansofie funguje",title:"Rodina je jeden z mnoha vstupů do Pansofie.",text:"Stejný princip může pokračovat ve škole, komunitě, přírodě nebo společném projektu."}} note="U nezletilých má být soukromí výchozí nastavení. Veřejné sdílení dítěte ani přesné polohy není součástí běžného Family Team flow."/>;
}
