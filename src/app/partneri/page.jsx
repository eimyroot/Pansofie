import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { pansofieScene } from "../../domain/asset-system";

export const metadata = { title: "Partneři", description: "Role partnerů a organizací v ekosystému Pansofie bez předstírání neověřených partnerství." };

export default function PartnersPage() {
  return <PublicShell active="/partneri">
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">PARTNEŘI</p><h1>Partner přináší konkrétní kapacitu.</h1><p>Partnerství v Pansofii může znamenat know-how, prostor, materiál, čas nebo podporu konkrétního projektu. Veřejný web nepředstírá seznam ověřených partnerů, pokud takové ověření neexistuje.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("organization-network")} alt="Síť organizací a komunit propojených kolem projektů" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <section className="pw-impact-rules"><article><p className="pw-eyebrow">01 · ZDROJE</p><h3>Materiál a prostor</h3><p>Konkrétní zdroj se váže ke konkrétní potřebě, ne k obecnému marketingovému tvrzení.</p></article><article><p className="pw-eyebrow">02 · KNOW-HOW</p><h3>Zkušenost a odbornost</h3><p>Odborný vstup pomáhá projektu, ale nepřivlastňuje si zkušenost účastníků.</p></article><article><p className="pw-eyebrow">03 · ODPOVĚDNOST</p><h3>Jasná role</h3><p>Partnerství má mít účel, rozsah, odpovědnost a přiměřená pravidla bezpečnosti.</p></article></section>
    <section className="pw-next"><div><p className="pw-eyebrow">PRO ORGANIZACE</p><h2>Partnerství začíná konkrétním účelem.</h2><p>Organizace mohou nabídnout kapacitu nebo přijít s projektem, který potřebuje bezpečný kontext spolupráce.</p></div><Link className="pw-button pw-button--dark" href="/pro-organizace">Pro organizace</Link></section>
  </PublicShell>;
}
