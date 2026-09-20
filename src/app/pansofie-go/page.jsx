import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";

export const metadata = { title: "Pansofie GO", description: "Akční vrstva Pansofie pro mise, projekty, portfolio a reflexi." };

const PRINCIPLES = [
  ["Mise", "Krátký konkrétní krok propojený s reálným životem."],
  ["Projekty", "Více misí a lidí kolem společného cíle."],
  ["Portfolio", "Doklad zkušenosti, ne sbírka nálepek bez významu."],
  ["Reflexe", "Možnost zachytit, co se člověk skutečně naučil."],
];

export default function PansofieGoPublicPage(){
  return <PublicShell>
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">PANSOFIE GO</p><h1>Od poznání k činu.</h1><p>GO je akční vrstva Pansofie pro mise, projekty, týmy a portfolio. XP ukazuje herní postup, ne hodnotu člověka, kompetenci ani peníze.</p><div className="pw-story-hero__cta"><Link className="pw-button pw-button--dark" href="/go">Otevřít Pansofie GO</Link></div></div>
      <div className="pw-page-hero__media"><Image src="/assets/brand/go/mission-covers/grow-16x9.webp" alt="Praktická mise Pansofie GO" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <section className="pw-story-intro"><div><p className="pw-eyebrow">GAME → EXPERIENCE → SKILL → IMPACT</p><h2>Hra je vstup. Zkušenost je podstata.</h2></div><div><p>GO může motivovat postupem a odznaky, ale skutečná hodnota vzniká až v konkrétní zkušenosti. Doložená dovednost potřebuje důkaz, projektový dopad potřebuje pozorování.</p><small>Dokončení běžné mise samo o sobě netvrdí, že člověk ovládl dovednost nebo vytvořil dopad.</small></div></section>
    <section className="pw-story-principles">{PRINCIPLES.map(([title,text], index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
    <section className="pw-story-sequence"><div><p className="pw-eyebrow">PRVNÍ FUNKČNÍ FLOW</p><h2>Jedna mise už spojuje web, Young, GO i projekt.</h2></div><ol>{["Poznej","Zkus","Udělej","Vytvoř","Sdílej","Reflektuj"].map((step,index)=><li key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></li>)}</ol></section>
    <section className="pw-next"><div><p className="pw-eyebrow">GREEN HOPE</p><h2>Začni první skutečnou misí.</h2><p>Vypěstuj první rostlinu je společný canonical vstup do akční vrstvy.</p></div><Link className="pw-button pw-button--dark" href="/mise/rostlina">Vypěstuj první rostlinu</Link></section>
  </PublicShell>;
}
