import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { PansofieVisualCard } from "../../components/public/PansofieVisualCard";

export const metadata = { title: "Dobrovolnictví", description: "Dobrovolná účast v projektech a komunitě Pansofie bez povinného skórování nebo dokazování." };

const STEPS = [["Vyber si", "Začít lze tématem, projektem nebo konkrétní místní potřebou."], ["Udělej krok", "Smyslem je skutečná zkušenost, ne sbírání bodů za přítomnost."], ["Sdílej volitelně", "Příběh, fotka nebo reflexe zůstávají pro běžnou účast dobrovolné."], ["Navazuj", "Jedna zkušenost může pokračovat v rodině, škole, komunitě nebo dalším projektu."]];
const CARDS = [["Lokální akce", "Zahrada, dílna, sousedská pomoc nebo školní projekt.", "/projekty"], ["Dlouhodobá spolupráce", "Zapojení do projektu, který má jasný kontext.", "/partnerstvi"], ["Sdílení znalostí", "Předat zkušenost bez nátlaku na veřejné vystupování.", "/sit"]];

export default function VolunteeringPage() {
  return <PublicShell active="/dobrovolnictvi">
    <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--volunteer">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">DOBROVOLNICTVÍ</p><h1>Příležitost, ne povinnost.</h1><p>Zapojení v Pansofii má vycházet z konkrétního projektu, potřeby nebo zájmu. Běžná účast není podmíněná veřejným skóre, povinnou evidencí ani reflexí.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/projekty">Projekty</Link><Link className="pw-button pw-button--light" href="/kontakt">Kontakt</Link></div></div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="DOBROVOLNICTVÍ" title="Malý krok má kontext" detail="účast bez povinného skórování" flow={["Zájem","Malý krok","Zkušenost","Navázání"]}/></div>
    </section>
    <section className="pw-visual-card-strip pw-visual-card-strip--three">{CARDS.map(([title,text,href]) => <PansofieVisualCard title={title} text={text} href={href} label="ZAPOJ SE" key={title}/>)}</section>
    <section className="pw-story-principles">{STEPS.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
    <section className="pw-next"><div><p className="pw-eyebrow">PRVNÍ KROK</p><h2>Nejdřív se podívej na projekty.</h2><p>Pokud máš konkrétní nabídku pomoci nebo místní potřebu, kontakt slouží jako další vstup.</p></div><div><Link className="pw-button pw-button--dark" href="/projekty">Projekty</Link> <Link className="pw-text-link" href="/kontakt">Kontakt →</Link></div></section>
  </PublicShell>;
}
