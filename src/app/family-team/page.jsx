import { PublicShell } from "../../components/public/PublicShell";
import { PeoplePlaceFamilyNav, PeoplePlaceHero, PeoplePlaceLedger, PeoplePlaceNext, PeoplePlaceSequence, PeoplePlaceStatement, PeoplePlaceTruth } from "../../components/public/PansofiePeoplePlaceFrame";
import { FAMILY_MISSIONS } from "../../domain/pansofie-content";

export const metadata={title:"Family Team",description:"Family Team propojuje rodinu přes společné mise, projekty a učení při zachování individuálních identit a oprávnění."};
const PRINCIPLES=[
  {title:"Vlastní identita",text:"Každý člen má svůj účet, kontext a přiměřená oprávnění.",label:"SOUKROMÍ"},
  {title:"Společný záměr",text:"Projekt nebo mise mohou spojit rodinu bez povinného skórování.",label:"ZÁMĚR"},
  {title:"Role podle situace",text:"Plánování, tvorba, péče i realizace se mohou přirozeně střídat.",label:"ROLE"},
  {title:"Mezi generacemi",text:"Zkušenost může proudit od dětí k dospělým i opačným směrem.",label:"UČENÍ"},
];
const SEQUENCE=["Vyberte společný záměr","Rozdělte si role","Udělejte konkrétní krok","Sdílejte výsledek podle potřeby","Krátce reflektujte","Navazujte další zkušeností"];
const TOPICS=FAMILY_MISSIONS.map((title)=>({title,text:"Možný společný vstup do zkušenosti bez povinného veřejného sdílení.",label:"NÁMĚT"}));
export default function FamilyTeamPage(){return <PublicShell active="/projekty" current="/family-team">
  <PeoplePlaceFamilyNav active="/family-team"/>
  <PeoplePlaceHero variant="family" kicker="FAMILY TEAM" title={<>Rodina není jen publikum. Může být tým.</>} lead="Family Team dává rodinám společný prostor pro mise, projekty, učení a reflexi, ale zachovává vlastní identitu a bezpečí každého člena." primary={{href:"/jak-to-funguje",label:"Jak Pansofie funguje"}} secondary={{href:"/osobni-rust",label:"Mezigenerační učení"}}/>
  <PeoplePlaceStatement kicker="RODINA JAKO PRVNÍ TÝM" title="Společný projekt není sdílený účet." text="Family Team propojuje čas, dovednosti, péči a společné cíle, ale každý člen zůstává samostatnou identitou s vlastním soukromím a přiměřenými oprávněními." aside="Společný záměr. Vlastní identita."/>
  <PeoplePlaceLedger items={PRINCIPLES}/>
  <PeoplePlaceSequence title="Společná zkušenost má rytmus, ne žebříček." items={SEQUENCE}/>
  <PeoplePlaceLedger items={TOPICS}/>
  <PeoplePlaceTruth>U nezletilých má být soukromí výchozí nastavení. Veřejné sdílení dítěte ani přesné polohy není součástí běžného Family Team flow. Rodina nesdílí hesla ani jeden společný účet.</PeoplePlaceTruth>
  <PeoplePlaceNext kicker="DALŠÍ KROK" title="Rodina je jeden z mnoha vstupů do Pansofie." text="Stejný princip může pokračovat ve škole, komunitě, přírodě nebo společném projektu." href="/jak-to-funguje" label="Jak Pansofie funguje"/>
</PublicShell>}
