import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "./PublicShell";
import { EditorialFeatureBand } from "./EditorialFeatureBand";

export function ProgramStoryPage({
  active,
  current,
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  introTitle,
  intro,
  principles = [],
  sequence = [],
  topics = [],
  cta,
  note,
  editorialFeature,
}) {
  return <PublicShell active={active} current={current || active}>
    <section className="pw-page-hero">
      <div>
        <p className="pw-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{lead}</p>
        {cta && <div className="pw-story-hero__cta"><Link className="pw-button pw-button--dark" href={cta.href}>{cta.label}</Link></div>}
      </div>
      <div className="pw-page-hero__media"><Image src={image} alt={imageAlt} fill priority sizes="(max-width: 780px) 100vw, 46vw"/></div>
    </section>
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">PROČ TO EXISTUJE</p><h2>{introTitle}</h2></div>
      <div><p>{intro}</p>{note && <small>{note}</small>}</div>
    </section>

    {editorialFeature && <EditorialFeatureBand {...editorialFeature}/>}

    {principles.length > 0 && <section className="pw-story-principles">
      {principles.map(([title, text], index) => <article key={title}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{title}</h3>
        <p>{text}</p>
      </article>)}
    </section>}

    {sequence.length > 0 && <section className="pw-story-sequence">
      <div className="pw-section__head">
        <div><p className="pw-eyebrow">JAK TO PROBÍHÁ</p><h2>Od prvního kroku k vlastní zkušenosti.</h2></div>
        <p>Jednotlivé kroky nejsou povinný žebříček. Pomáhají převést myšlenku do praxe a znovu ji promyslet.</p>
      </div>
      <ol>{sequence.map((item, index) => <li key={`${item}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol>
    </section>}
    {topics.length > 0 && <section className="pw-story-topics">
      <div><p className="pw-eyebrow">OBLASTI A TÉMATA</p><h2>Co se v programu může potkat.</h2></div>
      <div>{topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
    </section>}

    {cta && <section className="pw-next">
      <div>
        <p className="pw-eyebrow">DALŠÍ KROK</p>
        <h2>{cta.title || "Přejít od vysvětlení ke konkrétní zkušenosti."}</h2>
        {cta.text && <p>{cta.text}</p>}
      </div>
      <Link className="pw-button pw-button--dark" href={cta.href}>{cta.label}</Link>
    </section>}
  </PublicShell>;
}
