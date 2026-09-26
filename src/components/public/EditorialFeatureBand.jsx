import Link from "next/link";
import { PansofieArtPanel } from "./PansofieArtPanel";

function artVariant(eyebrow = "", title = "") {
  const key = `${eyebrow} ${title}`.toLowerCase();
  if (/přírod|zeleň|garden|green|pěst/.test(key)) return "nature";
  if (/škola|město|instituc|organiz|firma/.test(key)) return "city";
  if (/znal|učen|knih|ai|věd/.test(key)) return "knowledge";
  return "community";
}

export function EditorialFeatureBand({ eyebrow, title, text, image, imageAlt, reverse = false, items = [], link }) {
  const nodes = items.map(([label]) => label);
  return <section className={`pw-editorial-band${reverse ? " pw-editorial-band--reverse" : ""}`}>
    <div className="pw-editorial-band__media">
      <PansofieArtPanel eyebrow={eyebrow} title={title} detail={imageAlt || "souvislosti · zkušenost · skutečný život"} nodes={nodes} variant={artVariant(eyebrow,title)} caption="Pansofie · živý atlas vztahů"/>
    </div>
    <div className="pw-editorial-band__copy">
      <p className="pw-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
      {items.length > 0 && <div className="pw-editorial-band__items">
        {items.map(([label, body]) => <article key={label}><strong>{label}</strong><span>{body}</span></article>)}
      </div>}
      {link && <Link className="pw-text-link" href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>}
    </div>
  </section>;
}
