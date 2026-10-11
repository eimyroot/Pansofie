import { PublicShell } from "../../components/public/PublicShell";
import { PeoplePlaceFamilyNav, PeoplePlaceHero, PeoplePlaceLedger, PeoplePlaceNext, PeoplePlaceStatement, PeoplePlaceTruth } from "../../components/public/PansofiePeoplePlaceFrame";

export const metadata={title:"Osobní růst a Knowledge Exchange",description:"Mezigenerační učení, mentoring a výměna zkušeností bez veřejného katalogu lidí."};
const AREAS=[
  {title:"Řemeslo",text:"Praktické postupy, opravy a práce rukama.",label:"DOVEDNOST"},
  {title:"Zahrada",text:"Pěstování, péče o půdu a zkušenost s místem.",label:"ZKUŠENOST"},
  {title:"Technologie",text:"Digitální dovednosti, nástroje a bezpečné používání technologií.",label:"NÁSTROJE"},
  {title:"Historie a paměť",text:"Místní zkušenost, příběhy a znalost souvislostí.",label:"PŘÍBĚH"},
];
export default function PersonalGrowthPage(){return <PublicShell active="/osobni-rust">
  <PeoplePlaceFamilyNav active="/osobni-rust"/>
  <PeoplePlaceHero variant="exchange" kicker="KNOWLEDGE EXCHANGE" title={<>Možná se můžeme něco naučit jeden od druhého.</>} lead="To, co může člověk nabídnout druhému, je možnost, ne podmínka a ne dluh. Pansofie chce propojovat zkušenosti v bezpečných kontextech." primary={{href:"/sit",label:"Poznat síť Pansofie"}} secondary={{href:"/family-team",label:"Rodinný kontext"}}/>
  <PeoplePlaceStatement kicker="ZNALOST MEZI GENERACEMI" title="Zkušenost má cenu, když může bezpečně cestovat dál." text="Knowledge Exchange staví na tom, co lidé skutečně umějí, zažili nebo dokážou vysvětlit v kontextu. Nejde o veřejný katalog mentorů ani tržiště protislužeb." aside="Každý může něco předat i přijmout bez dluhu."/>
  <PeoplePlaceLedger items={AREAS}/>
  <PeoplePlaceTruth>Veřejná stránka neukazuje seznam jednotlivých mentorů ani jejich přesnou polohu. Skutečné propojení má probíhat přes ověřené rodinné, školní, týmové nebo projektové kontexty. Vzájemná pomoc není obchodní protislužba.</PeoplePlaceTruth>
  <PeoplePlaceNext kicker="MEZIGENERAČNÍ UČENÍ" title="Každý něco umí. Každý se může něco naučit." href="/sit" label="Poznat síť Pansofie"/>
</PublicShell>}
