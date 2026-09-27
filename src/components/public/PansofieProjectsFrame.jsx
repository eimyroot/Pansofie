import Link from "next/link";

const PROJECT_FAMILY = [
  ["01", "Přehled", "/projekty"],
  ["02", "Green Hope", "/green-hope"],
  ["03", "Urban Family Farm", "/urban-family-farm"],
  ["04", "Digitální kompost", "/digitalni-kompost"],
  ["05", "Labs", "/labs"],
];

export function ProjectFamilyNav({ active }) {
  return <nav className="pr02-family" aria-label="Projekty Pansofie">
    {PROJECT_FAMILY.map(([number,label,href]) => <Link className={active === href ? "is-active" : ""} href={href} key={href}><span>{number}</span><strong>{label}</strong></Link>)}
  </nav>;
}

function HeroActions({ primary, secondary }) {
  return <div className="pr02-hero__actions">
    {primary && <Link className="pw-button pw-button--dark" href={primary.href}>{primary.label}</Link>}
    {secondary && <Link className="pr02-text-link" href={secondary.href}>{secondary.label} <span aria-hidden="true">↗</span></Link>}
  </div>;
}

function OverviewField() {
  const items = [
    ["PŘÍRODA", "Green Hope", "18", "28"], ["MĚSTO · HODNOTA", "Urban Family Farm", "69", "22"],
    ["MATERIÁLY", "Digitální kompost", "70", "67"], ["EXPERIMENT", "Labs", "22", "72"],
  ];
  return <div className="pr02-overview-field" aria-label="Projekty jako propojení místa, lidí, potřeby a zkušenosti">
    <div className="pr02-overview-field__core"><span>PROJEKT</span><strong>Místo.<br/>Lidé.<br/>Potřeba.</strong><small>poznání dostává skutečný kontext</small></div>
    <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M22 29 C37 36 39 45 49 50 S66 37 72 23"/><path d="M23 72 C35 61 39 55 49 50 S63 60 72 68"/></svg>
    {items.map(([label,title,left,top],index)=><span className="pr02-overview-node" style={{left:`${left}%`,top:`${top}%`}} key={title}><i>{String(index+1).padStart(2,"0")}</i><small>{label}</small><strong>{title}</strong></span>)}
  </div>;
}

function GreenField() {
  return <div className="pr02-green-field" aria-label="Green Hope: od pozorování k péči">
    <svg viewBox="0 0 400 520" aria-hidden="true"><path className="stem" d="M205 490 C197 402 210 322 197 238 C190 188 197 118 208 34"/><path className="leaf" d="M201 364 C147 350 114 313 102 267 C153 276 187 316 201 364Z"/><path className="leaf" d="M202 282 C258 267 292 227 306 179 C252 188 218 231 202 282Z"/><path className="leaf" d="M201 196 C159 183 133 153 122 118 C164 123 191 155 201 196Z"/></svg>
    <div className="pr02-green-field__title"><span>GREEN HOPE</span><strong>Pozoruj.<br/>Pěstuj.<br/>Pečuj.</strong></div>
    <span className="pr02-green-note is-a">01 · PŮDA</span><span className="pr02-green-note is-b">02 · VODA</span><span className="pr02-green-note is-c">03 · BIODIVERZITA</span><span className="pr02-green-note is-d">04 · KOMUNITA</span>
  </div>;
}

function FarmField() {
  const steps = [["01","Pěstuj","Semeno · světlo · voda"],["02","Zpracuj","Kvalita · hygiena · práce"],["03","Spočítej","Náklad · cena · hodnota"],["04","Rozhodni","Spotřeba · sdílení · reinvestice"]];
  return <div className="pr02-farm-field" aria-label="Urban Family Farm: praktický hodnotový cyklus">
    <div className="pr02-farm-field__headline"><span>URBAN FAMILY FARM</span><strong>Od semene<br/>k rozhodnutí.</strong></div>
    <ol>{steps.map(([n,title,text])=><li key={n}><span>{n}</span><strong>{title}</strong><small>{text}</small></li>)}</ol>
    <p>Biologie, práce, matematika a ekonomika nejsou čtyři oddělené hodiny. V jednom cyklu se potkají přirozeně.</p>
  </div>;
}

function CompostField() {
  const items=[["Přebytek","co už zde není potřeba"],["Potřeba","kde má materiál smysl"],["Předání","konkrétní domluva"],["Další život","nové použití"]];
  return <div className="pr02-compost-field" aria-label="Digitální kompost: materiál v oběhu">
    <header><span>DIGITÁLNÍ KOMPOST</span><strong>Materiál<br/>nekončí prvním použitím.</strong></header>
    <ol>{items.map(([title,text],index)=><li key={title}><span>{String(index+1).padStart(2,"0")}</span><strong>{title}</strong><small>{text}</small>{index<items.length-1&&<b aria-hidden="true">→</b>}</li>)}</ol>
    <div className="pr02-compost-field__materials"><span>DŘEVO</span><span>TEXTIL</span><span>OBALY</span><span>VYBAVENÍ</span></div>
  </div>;
}

function LabsField() {
  const rows=[["01","Otázka","Co chceme opravdu zjistit?"],["02","Prototyp","Jak to ověříme v malém?"],["03","Pozorování","Co se skutečně stalo?"],["04","Sdílení","Co má cenu předat dál?"]];
  return <div className="pr02-labs-field" aria-label="Pansofie Labs: od otázky k ověření">
    <header><span>PANSOFIE LABS</span><strong>Malý pokus.<br/>Skutečné pozorování.</strong></header>
    <div>{rows.map(([n,title,text])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    <small>Prototyp není důkaz. Výsledek vzniká až pozorováním.</small>
  </div>;
}

export function ProjectHero({ variant, kicker, title, lead, primary, secondary }) {
  return <section className={`pr02-hero pr02-hero--${variant}`} aria-labelledby={`pr02-${variant}-title`}>
    <div className="pr02-hero__copy"><p className="pr02-kicker">{kicker}</p><h1 id={`pr02-${variant}-title`}>{title}</h1><p className="pr02-hero__lead">{lead}</p><HeroActions primary={primary} secondary={secondary}/></div>
    <div className="pr02-hero__visual">{variant==="overview"&&<OverviewField/>}{variant==="green"&&<GreenField/>}{variant==="farm"&&<FarmField/>}{variant==="compost"&&<CompostField/>}{variant==="labs"&&<LabsField/>}</div>
  </section>;
}

export function ProjectStatement({ kicker, title, text, aside }) {
  return <section className="pr02-statement"><div><p className="pr02-kicker">{kicker}</p><h2>{title}</h2></div><div><p>{text}</p>{aside&&<blockquote>{aside}</blockquote>}</div></section>;
}

export function ProjectPrinciples({ items }) {
  return <section className="pr02-principles">{items.map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>;
}

export function ProjectSequence({ title="Od prvního kroku k vlastní zkušenosti.", steps=[] }) {
  return <section className="pr02-sequence"><header><p className="pr02-kicker">JAK TO PROBÍHÁ</p><h2>{title}</h2><p>Kroky nejsou osobní skóre ani povinný žebříček. Drží praktický cyklus čitelný.</p></header><ol>{steps.map((step,index)=><li key={`${step}-${index}`}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></li>)}</ol></section>;
}

export function ProjectTopics({ topics=[] }) {
  return <section className="pr02-topics"><div><p className="pr02-kicker">OBLASTI A TÉMATA</p><h2>Co se v projektu může potkat.</h2></div><div>{topics.map((topic,index)=><span key={topic}><i>{String(index+1).padStart(2,"0")}</i>{topic}</span>)}</div></section>;
}

export function ProjectTruth({ children }) {
  return <section className="pr02-truth"><p className="pr02-kicker">PRAVDIVOST</p><p>{children}</p></section>;
}

export function ProjectNext({ kicker="DALŠÍ KROK", title, text, href, label }) {
  return <section className="pr02-next"><div><p className="pr02-kicker">{kicker}</p><h2>{title}</h2><p>{text}</p></div><Link className="pw-button pw-button--dark" href={href}>{label}</Link></section>;
}

export function ProjectIndex({ items }) {
  return <section className="pr02-index" aria-label="Přehled hlavních projektů">{items.map((item,index)=><Link className={index===0?"is-flagship":""} href={item.href} key={item.title}><span>{String(index+1).padStart(2,"0")} · {item.label}</span><h2>{item.title}</h2><p>{item.text}</p><small>{item.status}</small><b aria-hidden="true">↗</b></Link>)}</section>;
}

export function ProjectLedger({ items, links={} }) {
  return <section className="pr02-ledger">{items.map((item,index)=><article key={`${item.title}-${index}`}><span>{String(index+1).padStart(2,"0")} · {item.tag}</span><h3>{item.title}</h3><p>{item.description}</p><small>{item.status}</small>{links[item.title]?<Link href={links[item.title]}>Otevřít ↗</Link>:<em>Další rozvoj je součástí produktového plánu.</em>}{item.modelOnly&&<b>Modelový projekt. Nejde o tvrzení o existující lokalitě ani naměřeném dopadu.</b>}</article>)}</section>;
}
