import Link from "next/link";

const FAMILY = [["01", "Dopad", "/impact"], ["02", "Instituce", "/instituce"]];
export function TrustFamilyNav({ active }) {
  return <nav className="tr02-family" aria-label="Důvěra, dopad a instituce">{FAMILY.map(([n,label,href]) => <Link className={active===href?"is-active":""} href={href} key={href}><span>{n}</span><strong>{label}</strong></Link>)}</nav>;
}

function EvidenceField() {
  const items = [["Výstup","co se skutečně stalo"],["Evidence","čím lze tvrzení doložit"],["Kontext","kde a za jakých podmínek"],["Interpretace","co lze poctivě říct"]];
  return <div className="tr02-evidence-field"><header><span>DŮKAZ PŘED PŘÍBĚHEM</span><strong>Jen tolik,<br/>kolik víme.</strong></header><ol>{items.map(([t,x],i)=><li key={t}><span>{String(i+1).padStart(2,"0")}</span><strong>{t}</strong><small>{x}</small></li>)}</ol><p>Bez podkladů nevzniká automatické číslo.</p></div>;
}

function MatchingField() {
  const items = [["Nabídka","materiál · kapacita"],["Potřeba","konkrétní projekt"],["Překryv","smysluplná souvislost"],["Rozhodnutí","lidé, ne algoritmus"]];
  return <div className="tr02-matching-field"><header><span>ŠKOLY × ORGANIZACE</span><strong>Potřeba.<br/>Zdroj.<br/>Souvislost.</strong></header><div>{items.map(([t,x],i)=><article key={t}><span>{String(i+1).padStart(2,"0")}</span><h3>{t}</h3><p>{x}</p></article>)}</div><small>Matching je návrh na propojení, ne automatické rozhodnutí.</small></div>;
}

export function TrustHero({ variant, kicker, title, lead, primary, secondary }) {
  return <section className={`tr02-hero tr02-hero--${variant}`} aria-labelledby={`tr02-${variant}-title`}>
    <div className="tr02-hero__copy"><p className="tr02-kicker">{kicker}</p><h1 id={`tr02-${variant}-title`}>{title}</h1><p className="tr02-hero__lead">{lead}</p><div className="tr02-hero__actions">{primary&&<Link className="pw-button pw-button--dark" href={primary.href}>{primary.label}</Link>}{secondary&&<Link className="tr02-text-link" href={secondary.href}>{secondary.label} <span aria-hidden="true">↗</span></Link>}</div></div>
    <div className="tr02-hero__visual">{variant==="impact"?<EvidenceField/>:<MatchingField/>}</div>
  </section>;
}

export function TrustStatement({ kicker, title, text, aside }) {
  return <section className="tr02-statement"><div><p className="tr02-kicker">{kicker}</p><h2>{title}</h2></div><div><p>{text}</p>{aside&&<blockquote>{aside}</blockquote>}</div></section>;
}
export function TrustLedger({ items, className="" }) {
  return <section className={`tr02-ledger ${className}`}>{items.map((item,i)=><article key={item.title}><span>{String(i+1).padStart(2,"0")} · {item.label||"ZÁZNAM"}</span><h3>{item.title}</h3><p>{item.text}</p>{item.meta&&<small>{item.meta}</small>}</article>)}</section>;
}
export function TrustTruth({ children }) { return <section className="tr02-truth"><p className="tr02-kicker">PRAVDIVOST</p><p>{children}</p></section>; }
export function TrustNext({ kicker="DALŠÍ KROK", title, text, href, label }) { return <section className="tr02-next"><div><p className="tr02-kicker">{kicker}</p><h2>{title}</h2><p>{text}</p></div><Link className="pw-button pw-button--dark" href={href}>{label}</Link></section>; }
