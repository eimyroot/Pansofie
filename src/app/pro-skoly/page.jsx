import { PublicShell } from "../../components/public/PublicShell";
import { CommunityFamilyNav, CommunityHero, CommunityLedger, CommunityNext, CommunityPrinciples, CommunityStatement, CommunityTruth } from "../../components/public/PansofieCommunityFrame";

export const metadata={title:"Pro školy",description:"Pansofie propojuje výuku s praktickými projekty, mezioborovými souvislostmi a bezpečným školním kontextem."};
const PRINCIPLES=[["Mezioborově","Jedna skutečná situace může propojit přírodu, technologie, finance, vztahy, občanství i tvorbu."],["Prakticky","Mise a projekty dávají prostor něco pozorovat, vyzkoušet, vytvořit a společně reflektovat."],["S rolí učitele","Přístupy se řídí členstvím a oprávněními, ne sdíleným heslem."],["Bezpečně","Young nepoužívá otevřené veřejné vyhledávání dětí ani přesnou veřejnou polohu."]];
const ENTRY=[
 {title:"Projekt",text:"Jedna konkrétní otázka může propojit více předmětů i rolí.",href:"/projekty",label:"UČENÍ V PRAXI"},
 {title:"16 oblastí",text:"Mapa témat od člověka a vztahů po technologie, finance a přírodu.",href:"/16-oblasti",label:"OBSAH"},
 {title:"7 cest",text:"Růst bez veřejného pořadí, osobního skóre nebo jediného správného profilu.",href:"/7-cest",label:"ROZVOJ"},
 {title:"Okolí školy",text:"Město, příroda, organizace a zkušenost lidí mohou být součástí učení.",href:"/sit",label:"KONTEXT"},
];
export default function SchoolsPage(){return <PublicShell active="/pro-skoly" current="/pro-skoly">
 <CommunityFamilyNav active="/pro-skoly"/>
 <CommunityHero variant="school" kicker="PRO ŠKOLY" title={<>Škola může učit svět jako celek.</>} lead="Pansofie dává školám rámec pro mezioborové učení, mise a projekty, které propojují učivo s reálným životem, komunitou a praktickou zkušeností." primary={{href:"/projekty",label:"Prozkoumat projekty"}} secondary={{href:"/kontakt",label:"Kontakt pro školy"}}/>
 <CommunityStatement kicker="MĚSTO JAKO UČEBNA" title="Děti nepotřebují jen další obrazovku. Potřebují svět kolem sebe." text="Zahrada, dílna, knihovna, místní firma i zkušenost starších lidí mohou být součástí učení. AI pomáhá zkoumat a tvořit, rozhodnutí zůstává na lidech." aside="učivo → místo → projekt → zkušenost"/>
 <CommunityPrinciples items={PRINCIPLES}/>
 <CommunityLedger items={ENTRY}/>
 <CommunityTruth>Pansofie není postavená na povinném skórování dítěte ani na veřejném porovnávání žáků. Školní kontext používá role a membership oprávnění a neodhaluje přesnou veřejnou polohu dítěte.</CommunityTruth>
 <CommunityNext kicker="PRVNÍ KROK" title="Začít lze jedním dobře zvoleným projektem." text="Veřejná část ukazuje modely a prototypy. Školní účetový kontext je oddělený a používá role a oprávnění." href="/projekty" label="Prozkoumat projekty"/>
 </PublicShell>}
