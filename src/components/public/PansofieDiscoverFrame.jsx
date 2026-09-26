import Link from "next/link";

const FAMILY = [
  ["01", "O Pansofii", "/o-nas"],
  ["02", "7 cest", "/7-cest"],
  ["03", "16 oblastí", "/16-oblasti"],
  ["04", "Články", "/blog"],
];

const PATH_COLORS = ["lime", "cyan", "gold", "coral", "violet", "mint", "amber"];

export function DiscoverFamilyNav({ active }) {
  return <nav className="d02-family" aria-label="Objevuj Pansofii">
    {FAMILY.map(([number,label,href]) => <Link className={active === href ? "is-active" : ""} href={href} key={href}><span>{number}</span><strong>{label}</strong></Link>)}
  </nav>;
}

function HeroActions({ primary, secondary }) {
  return <div className="d02-hero__actions">
    {primary && <Link className="pw-button pw-button--dark" href={primary.href}>{primary.label}</Link>}
    {secondary && <Link className="d02-text-link" href={secondary.href}>{secondary.label} <span aria-hidden="true">↗</span></Link>}
  </div>;
}

function AboutVisual() {
  const nodes = [["Člověk",18,72],["Rodina",38,37],["Místo",64,59],["Svět",82,24]];
  return <div className="d02-about-field" aria-label="Vztahová mapa Pansofie">
    <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M12 78 C26 65 28 45 39 38 S58 52 65 59 74 39 83 24"/><path d="M39 38 C49 28 60 22 76 31"/></svg>
    <div className="d02-about-field__word"><span>PANSOFIE</span><strong>Učení<br/>v souvislostech.</strong><small>poznání · zkušenost · tvorba · vztah</small></div>
    {nodes.map(([label,left,top],index)=><span className="d02-about-node" style={{left:`${left}%`,top:`${top}%`}} key={label}><i>{String(index+1).padStart(2,"0")}</i>{label}</span>)}
    <svg className="d02-botanical" viewBox="0 0 220 300" aria-hidden="true"><path d="M108 288 C117 212 106 145 137 48"/><path d="M121 205 C74 190 48 154 38 118 C82 126 111 161 121 205Z"/><path d="M133 154 C170 136 192 104 201 73 C166 82 143 111 133 154Z"/></svg>
  </div>;
}

function PathsVisual({ paths }) {
  return <div className="d02-path-hero" aria-label="Sedm cest Pansofie">
    <div className="d02-path-hero__number"><strong>7</strong><span>cest<br/>rozvoje</span></div>
    <div className="d02-path-hero__list">{paths.slice(0,7).map((path,index)=><a className={`is-${PATH_COLORS[index]}`} href={`#${path.id}`} key={path.id}><i>{String(index+1).padStart(2,"0")}</i><strong>{path.title}</strong><small>{path.text}</small></a>)}</div>
  </div>;
}

function DomainsVisual({ domains }) {
  return <div className="d02-domain-hero" aria-label="Šestnáct oblastí života">
    <div className="d02-domain-hero__number"><strong>16</strong><span>oblastí<br/>jednoho života</span></div>
    <div className="d02-domain-hero__matrix">{domains.slice(0,16).map((domain,index)=><a href={`#${domain.id}`} key={domain.id}><small>{String(index+1).padStart(2,"0")}</small><strong>{domain.title}</strong></a>)}</div>
  </div>;
}

function ArticlesVisual() {
  const flow=["Otázka","Souvislost","Zdroj","Příklad","Další krok"];
  return <div className="d02-articles-hero" aria-label="Editoriální metoda Pansofie">
    <div className="d02-articles-hero__statement"><span>EDITORIÁLNÍ ATLAS</span><strong>Obsah, který<br/>vede dál.</strong><small>ne další proud bez kontextu</small></div>
    <ol>{flow.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong></li>)}</ol>
    <p>Text má pomoci vidět vztah, dohledat podklad a rozhodnout se, co stojí za další otázku.</p>
  </div>;
}

export function DiscoverHero({ variant, kicker, title, lead, primary, secondary, paths = [], domains = [] }) {
  return <section className={`d02-hero d02-hero--${variant}`} aria-labelledby={`d02-${variant}-title`}>
    <div className="d02-hero__copy">
      <p className="d02-kicker">{kicker}</p>
      <h1 id={`d02-${variant}-title`}>{title}</h1>
      <p className="d02-hero__lead">{lead}</p>
      <HeroActions primary={primary} secondary={secondary}/>
    </div>
    <div className="d02-hero__visual">
      {variant === "about" && <AboutVisual/>}
      {variant === "paths" && <PathsVisual paths={paths}/>}
      {variant === "domains" && <DomainsVisual domains={domains}/>}
      {variant === "articles" && <ArticlesVisual/>}
    </div>
  </section>;
}

export function DiscoverNext({ kicker, title, text, href, label }) {
  return <section className="d02-next"><div><p className="d02-kicker">{kicker}</p><h2>{title}</h2><p>{text}</p></div><Link className="pw-button pw-button--dark" href={href}>{label}</Link></section>;
}
