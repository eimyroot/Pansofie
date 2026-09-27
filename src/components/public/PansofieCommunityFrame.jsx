import Link from "next/link";

const COMMUNITY_FAMILY = [
  ["01","Komunita","/komunita"], ["02","Síť","/sit"], ["03","Pro školy","/pro-skoly"], ["04","Pro organizace","/pro-organizace"], ["05","Partneři","/partneri"],
];

export function CommunityFamilyNav({ active }) {
  return <nav className="cm02-family" aria-label="Komunitní vrstvy Pansofie">{COMMUNITY_FAMILY.map(([n,label,href])=><Link className={active===href?"is-active":""} href={href} key={href}><span>{n}</span><strong>{label}</strong></Link>)}</nav>;
}

function OverviewField(){
  const nodes=[["Rodiny",18,25],["Školy",72,20],["Místa",80,69],["Organizace",22,72],["Projekty",50,49]];
  return <div className="cm02-overview-field" aria-label="Komunita Pansofie jako vztahy kolem účelu">
    <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M18 25 C34 31 39 42 50 49 S66 28 72 20"/><path d="M22 72 C34 61 40 55 50 49 S70 60 80 69"/><path d="M18 25 C30 49 28 61 22 72"/><path d="M72 20 C77 40 80 53 80 69"/></svg>
    <div className="cm02-overview-core"><span>KOMUNITA</span><strong>Vztahy kolem<br/>skutečného účelu.</strong><small>ne feed · ne katalog lidí · ne žebříček</small></div>
    {nodes.map(([label,left,top],i)=><span className={`cm02-overview-node is-${i+1}`} style={{left:`${left}%`,top:`${top}%`}} key={label}><i>{String(i+1).padStart(2,"0")}</i><strong>{label}</strong></span>)}
  </div>;
}

function NetworkField(){
  const rows=[["Blízký kontext","Rodina · třída · tým"],["Projekt","Konkrétní práce nebo potřeba"],["Spolupráce","Role a oprávnění"],["Zkušenost","Co si lze bezpečně předat"]];
  return <div className="cm02-network-field" aria-label="Síť Pansofie začíná bezpečným kontextem"><header><span>SÍŤ PANSOFIE</span><strong>Propojení,<br/>které začíná blízko.</strong></header><ol>{rows.map(([title,text],i)=><li key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><small>{text}</small></li>)}</ol><p>Vztah má kontext dřív, než má veřejný profil.</p></div>;
}

function SchoolField(){
  const items=[["Učivo","co chceme pochopit"],["Místo","kde se to děje"],["Projekt","co lze opravdu udělat"],["Zkušenost","co si z toho člověk odnese"]];
  return <div className="cm02-school-field" aria-label="Škola jako propojení učiva, místa, projektu a zkušenosti"><div className="cm02-school-field__title"><span>PRO ŠKOLY</span><strong>Svět jako<br/>učebna.</strong></div><div className="cm02-school-grid">{items.map(([title,text],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div><small>Mezioborovost vzniká kolem situace, ne přidáním dalšího předmětu.</small></div>;
}

function OrganizationField(){
  const needs=["konkrétní projekt","materiál","odbornost","bezpečný prostor"], capacities=["zdroj","know-how","čas","zázemí"];
  return <div className="cm02-org-field" aria-label="Organizace: propojení potřeby a kapacity"><header><span>PRO ORGANIZACE</span><strong>Potřeba se má potkat<br/>s konkrétní kapacitou.</strong></header><div className="cm02-org-match"><div><small>POTŘEBA</small>{needs.map(x=><span key={x}>{x}</span>)}</div><b aria-hidden="true">↔</b><div><small>KAPACITA</small>{capacities.map(x=><span key={x}>{x}</span>)}</div></div><p>Účel dřív než logo. Rozsah dřív než marketing.</p></div>;
}

function PartnerField(){
  const roles=[["Materiál","co přináší"],["Know-how","co umí"],["Prostor","co zpřístupní"],["Čas","čemu se věnuje"]];
  return <div className="cm02-partner-field" aria-label="Partner přináší konkrétní kapacitu"><header><span>PARTNEŘI</span><strong>Kapacita má<br/>konkrétní směr.</strong></header><div>{roles.map(([title,text],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div><small>Veřejný web nepředstírá ověřené partnerství, pokud pro něj není podklad.</small></div>;
}

export function CommunityHero({variant,kicker,title,lead,primary,secondary}){
  return <section className={`cm02-hero cm02-hero--${variant}`} aria-labelledby={`cm02-${variant}-title`}><div className="cm02-hero__copy"><p className="cm02-kicker">{kicker}</p><h1 id={`cm02-${variant}-title`}>{title}</h1><p className="cm02-hero__lead">{lead}</p><div className="cm02-hero__actions">{primary&&<Link className="pw-button pw-button--dark" href={primary.href}>{primary.label}</Link>}{secondary&&<Link className="cm02-text-link" href={secondary.href}>{secondary.label} <span aria-hidden="true">↗</span></Link>}</div></div><div className="cm02-hero__visual">{variant==="overview"&&<OverviewField/>}{variant==="network"&&<NetworkField/>}{variant==="school"&&<SchoolField/>}{variant==="organization"&&<OrganizationField/>}{variant==="partners"&&<PartnerField/>}</div></section>;
}

export function CommunityStatement({kicker,title,text,aside}){return <section className="cm02-statement"><div><p className="cm02-kicker">{kicker}</p><h2>{title}</h2></div><div><p>{text}</p>{aside&&<blockquote>{aside}</blockquote>}</div></section>}
export function CommunityPrinciples({items}){return <section className="cm02-principles">{items.map(([title,text],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>}
export function CommunityLedger({items}){return <section className="cm02-ledger">{items.map((item,i)=><Link href={item.href} key={item.title}><span>{String(i+1).padStart(2,"0")} · {item.label}</span><h3>{item.title}</h3><p>{item.text}</p><b aria-hidden="true">↗</b></Link>)}</section>}
export function CommunityDemo({items}){return <section className="cm02-demo"><header><p className="cm02-kicker">MODELOVÁ SÍŤ</p><h2>Jak mohou vypadat různé typy uzlů.</h2><p>Jde o DEMO body pro návrh produktu, ne seznam potvrzených partnerů ani živé polohy lidí.</p></header><div>{items.map(([title,place,type,status])=><article key={title}><span>{type}</span><h3>{title}</h3><p>{place}</p><small>{status}</small></article>)}</div></section>}
export function CommunityTruth({children}){return <section className="cm02-truth"><p className="cm02-kicker">DŮLEŽITÁ HRANICE</p><p>{children}</p></section>}
export function CommunityNext({kicker="DALŠÍ KROK",title,text,href,label}){return <section className="cm02-next"><div><p className="cm02-kicker">{kicker}</p><h2>{title}</h2><p>{text}</p></div><Link className="pw-button pw-button--dark" href={href}>{label}</Link></section>}
