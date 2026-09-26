import Image from "next/image";
import Link from "next/link";

export function EditorialFeatureBand({ eyebrow, title, text, image, imageAlt, reverse = false, items = [], link }) {
  return <section className={`pw-editorial-band${reverse ? " pw-editorial-band--reverse" : ""}`}>
    <div className="pw-editorial-band__media">
      <Image src={image} alt={imageAlt} fill sizes="(max-width: 900px) 100vw, 52vw"/>
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
