import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { pansofiePhoto } from "../../domain/asset-system";

export const metadata = { title: "Dobrovolnictví", description: "Dobrovolná účast v projektech a komunitě Pansofie bez povinného skórování nebo dokazování." };

export default function VolunteeringPage() {
  return <PublicShell active="/dobrovolnictvi">
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">DOBROVOLNICTVÍ</p><h1>Příležitost, ne povinnost.</h1><p>Zapojení v Pansofii má vycházet z konkrétního projektu, potřeby nebo zájmu. Běžná účast není podmíněná veřejným skóre, povinnou evidencí ani reflexí.</p></div>
      <div className="pw-page-hero__media"><Image src={pansofiePhoto("community-city-16x9")} alt="Lidé spolupracují v komunitním městském prostředí" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <section className="pw-story-principles"><article><span>01</span><h3>Vyber si</h3><p>Začít lze tématem, projektem nebo konkrétní místní potřebou.</p></article><article><span>02</span><h3>Udělej krok</h3><p>Smyslem je skutečná zkušenost, ne sbírání bodů za samotnou přítomnost.</p></article><article><span>03</span><h3>Sdílej volitelně</h3><p>Příběh, fotka nebo reflexe zůstávají pro běžnou účast dobrovolné.</p></article><article><span>04</span><h3>Navazuj</h3><p>Jedna zkušenost může pokračovat v rodině, škole, komunitě nebo dalším projektu.</p></article></section>
    <section className="pw-next"><div><p className="pw-eyebrow">PRVNÍ KROK</p><h2>Nejdřív se podívej na projekty.</h2><p>Pokud máš konkrétní nabídku pomoci nebo místní potřebu, kontakt slouží jako další vstup.</p></div><div><Link className="pw-button pw-button--dark" href="/projekty">Projekty</Link> <Link className="pw-text-link" href="/kontakt">Kontakt →</Link></div></section>
  </PublicShell>;
}
