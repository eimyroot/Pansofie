import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = { title: "Pansofie Labs", description: "Pansofie Labs jako bezpečný prostor pro pokusy, pozorování a praktické projekty." };

const LABS = [
  ["Green Hope", "Příroda, péče a konkrétní místo.", "/green-hope", pansofiePhoto("growing-together-16x9")],
  ["Urban Family Farm", "Pěstování, práce, hodnota a ekonomika.", "/urban-family-farm", pansofieScene("urban-farm-system")],
  ["Digitální kompost", "Materiály, data a druhý život věcí.", "/digitalni-kompost", pansofiePhoto("curiosity-nature-16x9")],
];
const PRINCIPLES = [["Experimenty", "Testujeme malé prototypy před velkými sliby."], ["Pozorování", "Hypotéza se opírá o skutečný kontext a výsledek."], ["Sdílení", "To, co funguje, může pomoci škole, rodině nebo komunitě."], ["Dopad", "Dopad se dokládá jen tam, kde pro něj existují podklady."]];

export default function LabsPage() {
  return <PublicShell active="/labs">
    <section className="pw-visual-hero pw-visual-hero--labs">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">PANSOFIE LABS</p><h1>Bezpečný prostor pro pokusy.</h1><p>Labs převádějí otázku do pokusu, pozorování a tvorby. Green Hope, Urban Family Farm, Digitální kompost a další prototypy zůstávají jasně označené podle skutečného stavu.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/projekty">Přehled projektů</Link><Link className="pw-button pw-button--light" href="/kontakt">Navrhnout pokus</Link></div></div>
      <div className="pw-visual-hero__media"><Image src={pansofiePhoto("growing-together-16x9")} alt="Lidé různých generací spolupracují na živém prototypu" fill priority sizes="(max-width: 900px) 100vw, 52vw"/><div className="pw-visual-hero__note">idea → prototyp → pozorování → sdílení</div></div>
    </section>
    <section className="pw-visual-card-strip pw-visual-card-strip--three">{LABS.map(([title,text,href,image]) => <Link href={href} className="pw-visual-card" key={title}><div><Image src={image} alt="" fill sizes="(max-width: 900px) 100vw, 32vw"/></div><span>LAB</span><h2>{title}</h2><p>{text}</p></Link>)}</section>
    <section className="pw-mini-pill-grid" aria-label="Principy laboratoří">{PRINCIPLES.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
    <section className="pw-next"><div><p className="pw-eyebrow">PROJEKTY</p><h2>Laboratoř dává smysl tehdy, když vede ke konkrétní zkušenosti.</h2><p>Přehled veřejných projektů ukazuje další místa, kde se poznání mění v praxi.</p></div><Link className="pw-button pw-button--dark" href="/projekty">Přehled projektů</Link></section>
  </PublicShell>;
}
