import Image from "next/image";

export const MOCKUP01_PHOTOS = Object.freeze({
  ecosystem: "/assets/current/mockup01/hero-ecosystem.webp",
  farm: "/assets/current/mockup01/urban-farm.webp",
  nature: "/assets/current/mockup01/green-hope.webp",
});

export function PansofieDocumentaryMosaic() {
  return <section className="p01-documentary" aria-label="Pansofie v reálném životě">
    <figure className="p01-documentary__hero">
      <Image src={MOCKUP01_PHOTOS.ecosystem} alt="Mezigenerační učení a práce v komunitní zahradě propojené s dílnou a pěstováním" fill sizes="(max-width: 900px) 100vw, 68vw"/>
      <figcaption><span>UČENÍ ŽIVOTEM</span><strong>Lidé, místo, zkušenost.</strong></figcaption>
    </figure>
    <div className="p01-documentary__side">
      <figure><Image src={MOCKUP01_PHOTOS.farm} alt="Mezigenerační práce v městské komunitní farmě a skleníku" fill sizes="(max-width: 900px) 100vw, 32vw"/><figcaption><span>URBAN FAMILY FARM</span><strong>Pěstovat. Tvořit. Chápat hodnotu.</strong></figcaption></figure>
      <figure><Image src={MOCKUP01_PHOTOS.nature} alt="Komunitní zahrada s vodním hospodařením, biodiverzitou a kompostováním" fill sizes="(max-width: 900px) 100vw, 32vw"/><figcaption><span>GREEN HOPE</span><strong>Příroda jako živá laboratoř.</strong></figcaption></figure>
    </div>
  </section>;
}

export function PansofieDocumentaryBand({ src, eyebrow, title, alt, note }) {
  return <section className="p01-documentary-band">
    <figure><Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 72vw"/></figure>
    <div><p className="pw-eyebrow">{eyebrow}</p><h2>{title}</h2>{note && <p>{note}</p>}<small>Mockup 01 · schválený obrazový master</small></div>
  </section>;
}
