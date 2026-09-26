import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Pro organizace",
  description: "Partnerství Pansofie pro školy, obce, neziskové organizace, firmy a komunitní projekty.",
};

const ROLES = [
  ["Partner projektu", "Podpora konkrétního projektu, místa nebo tématu s jasným rozsahem a odpovědností."],
  ["Odborný partner", "Know-how, mentorství, metodika nebo odborný vstup bez přivlastnění zkušenosti účastníků."],
  ["Místní hostitel", "Bezpečný prostor, vybavení nebo organizační zázemí pro ověřený kontext."],
  ["Zdroj a podpora", "Materiál, finance nebo služby navázané na konkrétní potřebu a transparentní použití."],
];

export default function OrganizationsPage() {
  return <PublicShell active="/pro-organizace">
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">PRO ORGANIZACE</p><h1>Partnerství má mít konkrétní smysl.</h1><p>Pansofie hledá spolupráci, která pomáhá lidem, místům a projektům něco skutečně vytvořit. Ne logo na stránce a vágní tvrzení o dopadu.</p><Link className="pw-button pw-button--dark pw-story-hero__cta" href="/kontakt">Navrhnout spolupráci</Link></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("organization-network")} alt="Síť spolupráce mezi komunitami a organizacemi" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">CO PARTNERSTVÍ ZNAMENÁ</p><h2>Role je důležitější než viditelnost.</h2></div>
      <div><p>Každá spolupráce má mít jasný účel, rozsah, odpovědnost a způsob, jak rozlišit skutečný výstup od marketingového příběhu. U mladých účastníků platí navíc bezpečnostní a přístupová pravidla.</p></div>
    </section>

    <EditorialFeatureBand
      eyebrow="FIRMA JAKO SOUČÁST MÍSTA"
      title="Firma může nabídnout víc než peníze."
      text="Materiál, znalost, čas odborníka, dílna nebo nevyužitá kapacita mohou pomoct konkrétnímu školnímu či komunitnímu projektu. Spolupráce má být dohledatelná a přiměřená, ne převlečená reklama."
      image={pansofiePhoto("community-city-16x9")}
      imageAlt="Lidé spolupracují v městském komunitním prostředí"
      reverse
      items={[["Materiál", "Čisté přebytky a zbytky pro konkrétní použití."], ["Know-how", "Odborná zkušenost předaná bez marketingového nátlaku."], ["Prostor", "Dílna, zahrada nebo bezpečné místo pro ověřený projekt."], ["Čas", "Mentoring a pomoc navázaná na jasný účel a pravidla."]]}
      link={{ href: "/instituce", label: "Školy × organizace" }}
    />

    <section className="pw-story-principles">
      {ROLES.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}
    </section>

    <section className="pw-impact-rules">
      <article><p className="pw-eyebrow">01 · KONTEXT</p><h3>Každý partner vstupuje přes ověřený kontext.</h3><p>Organizace, škola, obec nebo firma mají vlastní členství a oprávnění. Partnerství se neopírá o sdílený účet.</p></article>
      <article><p className="pw-eyebrow">02 · DOPAD</p><h3>Dopad se dokládá, nevymýšlí.</h3><p>Výstupy projektu, pozorování a evidence zůstávají oddělené od reputace člověka nebo instituce.</p></article>
      <article><p className="pw-eyebrow">03 · BEZPEČÍ</p><h3>Mladí účastníci nejsou marketingový materiál.</h3><p>Soukromí, souhlasy a omezení viditelnosti jsou součástí návrhu spolupráce od začátku.</p></article>
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">PRVNÍ KROK</p><h2>Začněme konkrétním problémem nebo projektem.</h2><p>Kontakt slouží pro nabídku spolupráce, přístupnost, bezpečnostní podněty i obecné dotazy.</p></div>
      <Link className="pw-button pw-button--dark" href="/kontakt">Kontaktovat Pansofii</Link>
    </section>
  </PublicShell>;
}
