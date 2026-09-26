import Link from "next/link";

const DEFAULT_NODES = [
  ["Lidé","community"],["Příroda","nature"],["Místa","map"],["Učení","education"],
  ["Projekty","projects"],["Tvorba","creation"],["Vztahy","relationships"],
];

function ArtNode({ label, index }) {
  return <span className={`pa-node pa-node--${index + 1}`}><i>{String(index + 1).padStart(2,"0")}</i><b>{label}</b></span>;
}

export function PansofieArtPanel({
  eyebrow = "PANSOFIE",
  title = "Všechno souvisí se vším",
  detail = "lidé · příroda · místa · učení",
  nodes = DEFAULT_NODES.map(([label]) => label),
  variant = "ecosystem",
  href,
  caption,
  compact = false,
}) {
  const Tag = href ? Link : "div";
  const props = href ? { href } : {};
  const list = (nodes.length ? nodes : DEFAULT_NODES.map(([label]) => label)).slice(0, 7);
  return <Tag {...props} className={`pa-panel pa-panel--${variant}${compact ? " is-compact" : ""}`}>
    <span className="pa-grid" aria-hidden="true"/>
    <span className="pa-botanical pa-botanical--a" aria-hidden="true">⌇</span>
    <span className="pa-botanical pa-botanical--b" aria-hidden="true">⌇</span>
    <svg className="pa-routes" viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none">
      <path d="M18 77 C28 56, 36 49, 49 50 S70 35, 82 22"/>
      <path d="M20 25 C38 27, 34 62, 55 64 S73 74, 84 66"/>
      <path d="M9 56 C26 55, 40 37, 53 35 S73 51, 93 45"/>
    </svg>
    <div className="pa-copy"><span>{eyebrow}</span><strong>{title}</strong><small>{detail}</small></div>
    <div className="pa-core" aria-hidden="true"><span/><span/><span/></div>
    {list.map((label, index) => <ArtNode label={label} index={index} key={`${label}-${index}`}/>)}
    <div className="pa-material pa-material--leaf" aria-hidden="true"/>
    <div className="pa-material pa-material--clay" aria-hidden="true"/>
    <div className="pa-material pa-material--sage" aria-hidden="true"/>
    {caption && <p className="pa-caption">{caption}</p>}
  </Tag>;
}
