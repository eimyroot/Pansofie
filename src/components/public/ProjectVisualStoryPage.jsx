import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "./PublicShell";
import { EditorialFeatureBand } from "./EditorialFeatureBand";
import { PansofieVisualEngine } from "./PansofieVisualEngine";

export function ProjectVisualStoryPage({ active="/projekty", current, eyebrow, title, lead, image, imageAlt, heroNote, visualCards=[], principles=[], editorialFeature, sequence=[], topics=[], cta, note }) {
  return <PublicShell active={active} current={current}>
    <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--project-story">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{lead}</p>
        {cta && <div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href={cta.href}>{cta.label}</Link><Link className="pw-button pw-button--light" href="/projekty">Přehled projektů</Link></div>}
      </div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker={eyebrow} title="Od otázky ke zkušenosti" detail={heroNote || "poznání → zkušenost → další krok"} flow={(heroNote || "poznání → zkušenost → další krok").split("→").map(item=>item.trim()).filter(Boolean)}/></div>
    </section>
    {visualCards.length > 0 && <section className={`pw-visual-card-strip pw-visual-card-strip--${visualCards.length === 4 ? "four" : "three"}`}>
      {visualCards.map((card) => <Link href={card.href} className="pw-visual-card" key={card.title}><div><Image src={card.image} alt="" fill sizes="(max-width: 900px) 100vw, 25vw"/></div><span>{card.label}</span><h2>{card.title}</h2><p>{card.text}</p></Link>)}
    </section>}
    {editorialFeature && <EditorialFeatureBand {...editorialFeature}/>}
    {principles.length > 0 && <section className="pw-mini-pill-grid">{principles.map(([label,text], index)=><article key={label}><span>{String(index+1).padStart(2,"0")}</span><h3>{label}</h3><p>{text}</p></article>)}</section>}
    {sequence.length > 0 && <section className="pw-story-sequence"><div className="pw-section__head"><div><p className="pw-eyebrow">JAK TO PROBÍHÁ</p><h2>Od prvního kroku k vlastní zkušenosti.</h2></div><p>Kroky nejsou osobní skóre ani povinný žebříček. Pomáhají držet praktický cyklus čitelný.</p></div><ol>{sequence.map((item,index)=><li key={`${item}-${index}`}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong></li>)}</ol></section>}
    {topics.length > 0 && <section className="pw-story-topics"><div><p className="pw-eyebrow">OBLASTI A TÉMATA</p><h2>Co se v projektu může potkat.</h2></div><div>{topics.map(topic=><span key={topic}>{topic}</span>)}</div></section>}
    {note && <section className="pw-visual-note"><p className="pw-eyebrow">PRAVDIVOST</p><p>{note}</p></section>}
    {cta && <section className="pw-next"><div><p className="pw-eyebrow">DALŠÍ KROK</p><h2>{cta.title}</h2><p>{cta.text}</p></div><Link className="pw-button pw-button--dark" href={cta.href}>{cta.label}</Link></section>}
  </PublicShell>;
}
