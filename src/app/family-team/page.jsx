import { ProgramStoryPage } from "../../components/public/ProgramStoryPage";
import { FAMILY_MISSIONS } from "../../domain/pansofie-content";
import { pansofiePhoto } from "../../domain/asset-system";

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
  return <ProgramStoryPage active="/projekty" eyebrow="FAMILY TEAM" title="Rodina není jen publikum. Může být tým." lead="Family Team dává rodinám společný prostor pro mise, projekty, učení a reflexi, ale zachovává vlastní identitu a bezpečí každého člena." image={pansofiePhoto("community-city-16x9")} imageAlt="Lidé různých generací společně v městském komunitním prostoru" introTitle="Společná zkušenost může být silnější než další rodinný kalendář." intro="Pansofie pracuje s rodinou jako přirozeným místem spolupráce, odpovědnosti a předávání dovedností. Nejde o kontrolní panel rodiče nad dítětem, ale o bezpečný sdílený kontext." principles={PRINCIPLES} sequence={["Vyberte společný záměr","Rozdělte si role","Udělejte konkrétní krok","Sdílejte výsledek podle potřeby","Krátce reflektujte","Navazujte další zkušeností"]} topics={FAMILY_MISSIONS} cta={{href:"/jak-to-funguje",label:"Jak Pansofie funguje",title:"Rodina je jeden z mnoha vstupů do Pansofie.",text:"Stejný princip může pokračovat ve škole, komunitě, přírodě nebo společném projektu."}} note="U nezletilých má být soukromí výchozí nastavení. Veřejné sdílení dítěte ani přesné polohy není součástí běžného Family Team flow."/>;
}
