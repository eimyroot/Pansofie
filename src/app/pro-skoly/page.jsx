import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { PansofieVisualCard } from "../../components/public/PansofieVisualCard";

export const metadata={title:"Pro školy",description:"Pansofie propojuje výuku s praktickými projekty, mezioborovými souvislostmi a bezpečným školním kontextem."};
const PRINCIPLES=[["Mezioborově","Jedna skutečná situace může propojit přírodu, technologie, finance, vztahy, občanství i tvorbu."],["Prakticky","Mise a projekty dávají prostor něco pozorovat, vyzkoušet, vytvořit a společně reflektovat."],["S rolí učitele","Přístupy se řídí členstvím a oprávněními, ne sdíleným heslem."],["Bezpečně","Young nepoužívá otevřené veřejné vyhledávání dětí ani přesnou veřejnou polohu."]];
const SCHOOL_ENTRY=[
 {title:"Projekt",text:"Jedna konkrétní otázka může propojit více předmětů i rolí.",href:"/projekty",label:"UČENÍ V PRAXI"},
 {title:"16 oblastí",text:"Mapa témat od člověka a vztahů po technologie, finance a přírodu.",href:"/16-oblasti",label:"OBSAH"},
 {title:"7 cest",text:"Růst bez veřejného pořadí, osobního skóre nebo jediného správného profilu.",href:"/7-cest",label:"ROZVOJ"},
 {title:"Okolí školy",text:"Město, příroda, organizace a zkušenost lidí mohou být součástí učení.",href:"/sit",label:"KONTEXT"},
];
export default function SchoolsPage(){return <PublicShell active="/pro-skoly" current="/pro-skoly">
 <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--school"><div className="pw-visual-hero__copy"><p className="pw-eyebrow">PRO ŠKOLY</p><h1>Škola může učit svět jako celek.</h1><p>Pansofie dává školám rámec pro mezioborové učení, mise a projekty, které propojují učivo s reálným životem, komunitou a praktickou zkušeností.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/projekty">Prozkoumat projekty</Link><Link className="pw-button pw-button--light" href="/kontakt">Kontakt pro školy</Link></div></div><div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="PRO ŠKOLY" title="Svět jako učebna" detail="poznání přechází do zkušenosti" flow={["Poznat","Vyzkoušet","Vytvořit","Sdílet"]}/></div></section>
 <section className="pw-community-entry-grid">{SCHOOL_ENTRY.map(card=><PansofieVisualCard {...card} className="pw-community-entry-card" key={card.title}/>)}</section>
 <EditorialFeatureBand eyebrow="MĚSTO JAKO UČEBNA" title="Děti nepotřebují jen další obrazovku. Potřebují svět kolem sebe." text="Zahrada, dílna, místní firma, knihovna i zkušenost starších lidí mohou být součástí učení. AI pomáhá zkoumat a tvořit, rozhodnutí zůstává na lidech." imageAlt="Mladší a starší lidé spolupracují na praktickém projektu" items={[["Příroda","Půda, voda, pěstování a městská zeleň."],["Materiál","Dřevo, textil a další zbytky mohou dostat druhý život."],["Generace","Rodiče, senioři a odborníci přinášejí zkušenost do bezpečného kontextu."],["Technologie","AI pomáhá zkoumat a tvořit, rozhodnutí zůstává na lidech."]]} link={{href:"/instituce",label:"Propojit školu s okolím"}}/>
 <section className="pw-mini-pill-grid">{PRINCIPLES.map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
 <section className="pw-visual-note"><p className="pw-eyebrow">BEZPEČNÝ ŠKOLNÍ KONTEXT</p><p>Pansofie není postavená na povinném skórování dítěte ani na veřejném porovnávání žáků. Konkrétní školní metodiky, kurikulum mapping a učitelská administrace se zpřístupňují postupně nad existujícím school contextem.</p></section>
 <section className="pw-next"><div><p className="pw-eyebrow">PRVNÍ KROK</p><h2>Začít lze jedním dobře zvoleným projektem.</h2><p>Veřejná část ukazuje modely a prototypy. Školní účetový kontext je oddělený a používá role a membership oprávnění.</p></div><Link className="pw-button pw-button--dark" href="/projekty">Prozkoumat projekty</Link></section>
 </PublicShell>}
