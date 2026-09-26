import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { pansofieScene } from "../../domain/asset-system";

export const metadata = { title: "Partnerství", description: "Partnerství Pansofie navázané na konkrétní projekty, potřeby, role a odpovědnost." };

export default function PartnershipPage() {
  return <PublicShell active="/partnerstvi">
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">PARTNERSTVÍ</p><h1>Spolupráce má mít konkrétní smysl.</h1><p>Partnerství se v Pansofii váže na konkrétní projekt, místo nebo potřebu. Role, rozsah a odpovědnost mají být jasnější než logo a marketingový příběh.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("organization-network")} alt="Organizace a komunity propojené kolem konkrétní spolupráce" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <section className="pw-impact-rules"><article><p className="pw-eyebrow">01 · ÚČEL</p><h3>Začít problémem</h3><p>Nejdřív se pojmenuje konkrétní potřeba nebo projekt, až potom forma spolupráce.</p></article><article><p className="pw-eyebrow">02 · ROLE</p><h3>Vědět, kdo co přináší</h3><p>Know-how, materiál, prostor, finance nebo čas mají jasný kontext a odpovědnost.</p></article><article><p className="pw-eyebrow">03 · DOPAD</p><h3>Dokládat, nevymýšlet</h3><p>Výstupy a dopad se oddělují od marketingu a tvrzení musí mít skutečné podklady.</p></article></section>
    <section className="pw-next"><div><p className="pw-eyebrow">KONTAKT</p><h2>Navrhněte konkrétní spolupráci.</h2><p>Pro školy, obce, firmy, neziskové organizace a komunitní projekty slouží společný kontaktní vstup.</p></div><Link className="pw-button pw-button--dark" href="/kontakt">Kontakt</Link></section>
  </PublicShell>;
}
