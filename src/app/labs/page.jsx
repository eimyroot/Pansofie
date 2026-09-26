import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { pansofieScene } from "../../domain/asset-system";

export const metadata = { title: "Pansofie Labs", description: "Pansofie Labs jako bezpečný prostor pro pokusy, pozorování a praktické projekty." };

const LABS = [["Green Hope", "Příroda, péče a konkrétní místo.", "/green-hope"], ["Urban Family Farm", "Pěstování, práce, hodnota a ekonomika.", "/urban-family-farm"], ["Family Team", "Rodina tvoří a učí se společně.", "/family-team"]];

export default function LabsPage() {
  return <PublicShell active="/labs">
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">PANSOFIE LABS</p><h1>Bezpečný prostor pro pokusy.</h1><p>Labs převádějí otázku do pokusu, pozorování a tvorby. Green Hope, Urban Family Farm a další prototypy zůstávají jasně označené podle skutečného stavu.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("green-hope-lab")} alt="Pansofie Labs propojují přírodu a praktické učení" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <section className="pw-entry-list">{LABS.map(([title,text,href], index) => <Link href={href} className="pw-entry-row" key={title}><span>{String(index+1).padStart(2,"0")}</span><div><h2>{title}</h2><p>{text}</p></div><strong>LAB</strong><b aria-hidden="true">→</b></Link>)}</section>
    <section className="pw-next"><div><p className="pw-eyebrow">PROJEKTY</p><h2>Laboratoř dává smysl tehdy, když vede ke konkrétní zkušenosti.</h2><p>Přehled veřejných projektů ukazuje další místa, kde se poznání mění v praxi.</p></div><Link className="pw-button pw-button--dark" href="/projekty">Přehled projektů</Link></section>
  </PublicShell>;
}
