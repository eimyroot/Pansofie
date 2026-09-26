import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { CHECKPOINTS, KNOWLEDGE_EXCHANGE } from "../../domain/pansofie-content";
import { PansofieVisualCard } from "../../components/public/PansofieVisualCard";

export const metadata={title:"Síť spolupráce",description:"Lokální skupiny, školy, rodiny a projekty jako propojená síť Pansofie."};
const PRINCIPLES=[["Lokálně","Skutečné vztahy začínají v rodině, škole, komunitě nebo konkrétním projektu."],["Bezpečně","Mladí lidé se propojují přes ověřené kontexty, ne přes veřejné hledání lidí v okolí."],["Mezigeneračně",KNOWLEDGE_EXCHANGE],["Otevřeně","Síť má propojovat zkušenosti a zdroje bez veřejného skórování člověka."]];
const ENTRY=[
 {title:"Rodina",text:"První tým, ve kterém se zkušenost, péče a odpovědnost potkávají.",href:"/komunita",label:"BLÍZKÝ KONTEXT"},
 {title:"Škola",text:"Bezpečný kontext pro projekty, mise a mezioborové učení.",href:"/pro-skoly",label:"UČENÍ"},
 {title:"Komunita",text:"Místní potřeby, péče o místo a spolupráce kolem konkrétního účelu.",href:"/komunita",label:"MÍSTO"},
 {title:"Organizace",text:"Know-how, materiál, prostor nebo kapacita navázaná na ověřený projekt.",href:"/pro-organizace",label:"ZDROJE"},
];
export default function NetworkPage(){return <PublicShell active="/sit">
 <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--network"><div className="pw-visual-hero__copy"><p className="pw-eyebrow">SÍŤ PANSOFIE</p><h1>Propojení, které začíná blízko.</h1><p>Pansofie může spojovat jednotlivce, rodiny, školy, komunity a organizace. Ne jako veřejný katalog lidí, ale přes ověřené vztahy, projekty a bezpečné kontexty.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/komunita">Otevřít komunitu</Link><Link className="pw-button pw-button--light" href="/pro-organizace">Pro organizace</Link></div></div><div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="SÍŤ PANSOFIE" title="Vztah má kontext" detail="propojení přes skutečnou práci" flow={["Vztah","Projekt","Spolupráce","Zkušenost"]}/></div></section>
 <section className="pw-community-entry-grid">{ENTRY.map(card=><PansofieVisualCard {...card} className="pw-community-entry-card" key={card.title}/>)}</section>
 <EditorialFeatureBand eyebrow="KOMUNITA, NE FEED" title="Silná síť nevzniká počtem kontaktů. Vzniká tím, že si lidé umějí konkrétně pomoct." text="Rodina, třída, místní firma, senior, spolek nebo městská iniciativa mohou být součástí stejného projektu, aniž by se z Pansofie stala veřejná sociální síť lidí a jejich poloh." imageAlt="Mezigenerační spolupráce lidí na společné činnosti" items={[["Rodiny","Společné mise při zachování jednotlivých identit."],["Školy","Bezpečné třídy a projektové kontexty."],["Senioři","Zkušenost a praktická pomoc bez veřejného katalogu osob."],["Organizace","Zdroje a know-how kolem konkrétního projektu."]]} link={{href:"/pro-organizace",label:"Zapojení organizací"}}/>
 <section className="pw-mini-pill-grid">{PRINCIPLES.map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
 <section className="pw-network-demo"><div className="pw-network-demo__head"><div><p className="pw-eyebrow">MODELOVÁ SÍŤ</p><h2>Jak mohou vypadat různé typy uzlů.</h2></div><p>Jde o demonstrační body pro návrh produktu. Ukázkové checkpointy níže nejsou seznamem potvrzených partnerů ani přesnými místy dětí.</p></div><div className="pw-checkpoint-grid">{CHECKPOINTS.map(([title,place,type,status])=><article key={title}><span>{type}</span><h3>{title}</h3><p>{place}</p><small>{status}</small></article>)}</div></section>
 <section className="pw-next"><div><p className="pw-eyebrow">SPOLUPRÁCE</p><h2>Síť roste z konkrétních projektů, ne z počtu kontaktů.</h2><p>Organizace a školy mohou do Pansofie vstupovat přes vlastní ověřený kontext a konkrétní spolupráci.</p></div><Link className="pw-button pw-button--dark" href="/pro-organizace">Pro organizace</Link></section>
 </PublicShell>}
