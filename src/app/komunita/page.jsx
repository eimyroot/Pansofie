import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = { title: "Komunita", description: "Komunita Pansofie kolem skutečných projektů, bezpečných vztahů a místní spolupráce." };

const ENTRIES = [["Komunita", "Sdílení zkušeností kolem témat a projektů.", "/komunita", pansofiePhoto("growing-together-16x9")], ["Síť", "Role a vztahy propojené přes konkrétní práci.", "/sit", pansofieScene("organization-network")], ["Pro školy", "Bezpečné školní kontexty a projektová výuka.", "/pro-skoly", pansofieScene("school-life-learning")], ["Pro organizace", "Know-how, materiál a kapacita pro jasný účel.", "/pro-organizace", pansofieScene("organization-network")], ["Partneři", "Spolupráce bez předstírání ověřených partnerství.", "/partneri", pansofiePhoto("community-city-16x9")]];

export default function CommunityPage() {
  return <PublicShell active="/komunita">
    <section className="pw-visual-hero pw-visual-hero--community">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">KOMUNITA</p><h1>Komunita, ne feed.</h1><p>Pansofie staví komunitu kolem rodin, škol, míst, témat a konkrétních projektů. Ne kolem veřejného katalogu lidí, jejich skóre nebo přesné polohy.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="/sit">Otevřít síť</Link><Link className="pw-button pw-button--light" href="/pro-koho">Najít vstup</Link></div></div>
      <div className="pw-visual-hero__media"><Image src={pansofiePhoto("growing-together-16x9")} alt="Komunita lidí spolupracuje u zeleného projektu" fill priority sizes="(max-width: 900px) 100vw, 52vw"/><div className="pw-visual-hero__note">rodiny · školy · místa · organizace</div></div>
    </section>
    <section className="pw-visual-card-strip pw-visual-card-strip--five">{ENTRIES.map(([title,text,href,image]) => <Link href={href} className="pw-visual-card" key={title}><div><Image src={image} alt="" fill sizes="(max-width: 900px) 100vw, 20vw"/></div><span>KOMUNITA</span><h2>{title}</h2><p>{text}</p></Link>)}</section>
    <section className="pw-story-principles"><article><span>01</span><h3>Rodiny</h3><p>Společné zkušenosti při zachování vlastní identity každého člověka.</p></article><article><span>02</span><h3>Školy</h3><p>Bezpečné třídy a projektové kontexty s jasnými rolemi.</p></article><article><span>03</span><h3>Místa</h3><p>Komunitní projekty a ověřené kontexty místo veřejného hledání lidí v okolí.</p></article><article><span>04</span><h3>Organizace</h3><p>Zdroje, know-how a kapacita navázané na konkrétní potřebu.</p></article></section>
    <section className="pw-next"><div><p className="pw-eyebrow">SÍŤ</p><h2>Silná komunita se propojuje přes skutečnou práci.</h2><p>Síť Pansofie ukazuje, jak mohou jednotlivé role a projekty spolupracovat bez ztráty soukromí.</p></div><Link className="pw-button pw-button--dark" href="/sit">Otevřít síť</Link></section>
  </PublicShell>;
}
