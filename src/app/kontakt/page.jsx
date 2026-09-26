import Image from "next/image";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { ContactForm } from "../../components/public/ContactForm";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Kontakt",
  description: "Kontakt pro dotazy, spolupráci, přístupnost a bezpečnostní podněty k Pansofii.",
};

const CONTACT_AREAS = [
  ["Spolupráce", "Školy, organizace, obce, firmy a komunitní projekty."],
  ["Přístupnost", "Bariéry, které brání použití webu nebo obsahu."],
  ["Bezpečnost", "Nevhodný obsah, riziko pro mladé nebo problém s ochranou soukromí."],
  ["Obecný dotaz", "Obsah, projekty, 16 oblastí, 7 cest nebo fungování Pansofie."],
];

export default function ContactPage() {
  return <PublicShell active="/kontakt">
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">KONTAKT</p><h1>Napište nám, co potřebujete.</h1><p>Kontakt má sloužit pro konkrétní dotazy, spolupráci, přístupnost a bezpečnostní podněty. Formulář je zatím transparentně označený jako lokální prototyp bez připojeného mailboxu.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("contact-growth")} alt="Ilustrace růstu spolupráce" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <EditorialFeatureBand
      eyebrow="SPOLUPRÁCE ZAČÍNÁ KONTEXTEM"
      title="Nejdřív konkrétní problém nebo možnost. Potom forma spolupráce."
      text="Škola může přijít s projektem, organizace s materiálem nebo know-how, komunita s místní potřebou. Přístupnost a bezpečnostní podněty mají stejnou váhu jako nabídky spolupráce. Veřejný formulář zatím zůstává lokálním prototypem a nic nepředstírá."
      image={pansofiePhoto("community-city-16x9")}
      imageAlt="Lidé v komunitním prostředí, kde může vzniknout konkrétní spolupráce"
      items={[["Škola", "Projekt, výuková potřeba nebo bezpečný pilot."], ["Organizace", "Know-how, materiál, prostor nebo kapacita pro konkrétní účel."], ["Komunita", "Místní problém, péče o místo nebo společná iniciativa."], ["Bezpečnost a přístupnost", "Podněty, které mají přednost před marketingovým pohodlím."]]}
      link={{ href: "/pro-organizace", label: "Jak Pansofie chápe partnerství" }}
    />
    <section className="pw-contact-layout">
      <div className="pw-contact-copy">
        <p className="pw-eyebrow">K ČEMU KONTAKT SLOUŽÍ</p>
        <h2>Jedno místo pro praktické věci.</h2>
        <div className="pw-contact-topics">{CONTACT_AREAS.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
      <ContactForm/>
    </section>
  </PublicShell>;
}
