import { ProgramStoryPage } from "../../components/public/ProgramStoryPage";
import { GREEN_HOPE_TOPICS, LEARNING_METHOD } from "../../domain/pansofie-content";
import { pansofiePhoto } from "../../domain/asset-system";

export const metadata = {
  title: "Green Hope",
  description: "Green Hope propojuje ekologické poznání s pěstováním, péčí o místo a konkrétními komunitními projekty.",
};

const PRINCIPLES = [
  ["Začít u konkrétního místa", "Půda, voda, rostliny a okolí nejsou abstraktní témata. Jsou to věci, které lze pozorovat a o které lze pečovat."],
  ["Učit se zkušeností", "Poznání se propojuje s pěstováním, měřením, tvorbou a praktickou péčí."],
  ["Růst od jednotlivce ke komunitě", "Malá osobní zkušenost může pokračovat v rodině, škole nebo společném projektu."],
  ["Měřit jen to, co skutečně víme", "Dopad se zaznamenává po jednotlivých dimenzích. Pansofie nevyrábí jedno magické skóre člověka ani projektu."],
];

export default function GreenHopePage() {
  return <ProgramStoryPage active="/projekty" eyebrow="GREEN HOPE" title="Příroda se neučí jen z obrázku." lead="Green Hope propojuje ekologické souvislosti s pěstováním, péčí o konkrétní místo a společnými projekty. Začít lze jednou rostlinou, ne velkým závazkem." image={pansofiePhoto("growing-together-16x9")} imageAlt="Společná práce lidí různých generací na zeleném projektu" introTitle="Od porozumění přírodě k péči o svět kolem nás." intro="Program pracuje s jednoduchými zkušenostmi i většími projekty. Důkaz nebo reflexe nejsou povinnou vstupenkou k účasti, ale mohou vytvořit doloženou zkušenost pro portfolio." principles={PRINCIPLES} sequence={LEARNING_METHOD} topics={GREEN_HOPE_TOPICS} cta={{href:"/mise/rostlina",label:"Vypěstuj první rostlinu",title:"První konkrétní Green Hope mise už funguje.",text:"Mise je propojená s modelovým projektem Komunitní zahrada a používá společné mission jádro Pansofie."}} note="Modelové projekty na webu nejsou vydávány za existující lokality ani za naměřený ekologický dopad."/>;
}
