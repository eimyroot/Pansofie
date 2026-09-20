import Link from "next/link";
import { PublicShell } from "./PublicShell";

const CONTENT = {
  privacy: ["Soukromí", "Jaké údaje prototyp používá", "Současná veřejná vrstva používá jen minimum údajů. Účtové funkce jsou oddělené od veřejného prohlížení a přesná poloha dítěte se veřejně nezobrazuje.", "Před veřejným provozem musí být doplněna identita správce, účely, právní tituly, příjemci, doby uchování a práva subjektů údajů."],
  terms: ["Podmínky používání", "Co tento produkt právě představuje", "Pansofie je nyní funkční produktový prototyp. Položky označené DEMO nejsou skutečné nabídky, partnerství ani naměřené výsledky.", "Před veřejným provozem musí být doplněn provozovatel, odpovědnost, pravidla transakcí a reklamační postup."],
  cookies: ["Cookies a místní úložiště", "Co se ukládá v zařízení", "Prototyp nepoužívá reklamní profilování. Lokální úložiště může držet volby rozhraní a některý demonstrační obsah vytvořený uživatelem.", "Před veřejným provozem musí být přesně zdokumentovány používané technologie a případné souhlasy."],
  community: ["Pravidla komunity", "Bezpečně a s respektem", "Netlačíme na protislužbu, souhlas ani zveřejnění fotografie. Nenahráváme osobní údaje druhých a u mladých lidí neumožňujeme veřejný kontakt s neznámými dospělými.", "Nebezpečný, diskriminační, podvodný nebo sexualizovaný obsah má být řešen přes moderaci a bezpečnostní postup."],
  accessibility: ["Přístupnost", "Pansofie má být použitelná pro každého", "Rozhraní podporuje klávesnici, viditelný fokus, přeskočení na obsah, responzivní zobrazení a popsané ovládací prvky.", "Pokud narazíte na bariéru, lze ji popsat přes Kontakt. Reakční doby budou doplněny s provozními údaji."],
  safety: ["Bezpečnost a ochrana mladých", "Young je zprostředkované prostředí", "Pansofie Young nesmí veřejně zobrazovat přesnou polohu dítěte ani umožnit přímý kontakt dítěte s neznámým dospělým.", "Místní účast se váže na rodiče, školu, rodinu, tým nebo ověřenou organizaci. Podezřelý kontakt je důvod komunikaci ukončit a zapojit důvěryhodného dospělého."],
};
export function LegalWorkingPage({ type }) {
  const [title, heading, body, caveat] = CONTENT[type] || CONTENT.terms;
  return <PublicShell>
    <section className="pw-page-hero pw-page-hero--legal">
      <div><p className="pw-eyebrow">PRACOVNÍ PRÁVNÍ TEXT</p><h1>{title}</h1><p>Transparentní kandidátní text k revizi před veřejným spuštěním. Není právní radou ani hotovou provozní dokumentací.</p></div>
      <div className="pw-legal-mark" aria-hidden="true"><span>LEGAL</span><strong>CANDIDATE</strong><small>PŘED VEŘEJNÝM PROVOZEM REVIZE</small></div>
    </section>
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">CO PLATÍ V PROTOTYPU</p><h2>{heading}</h2></div>
      <div><p>{body}</p><small>{caveat}</small></div>
    </section>
    <section className="pw-impact-rules">
      <article><p className="pw-eyebrow">01 · STAV</p><h3>Ne hotový právní dokument.</h3><p>Text popisuje současný produktový záměr a omezení prototypu.</p></article>
      <article><p className="pw-eyebrow">02 · PROVOZ</p><h3>Chybí finální provozní údaje.</h3><p>Identita provozovatele, zpracovatelé a konkrétní lhůty musí být doplněny před veřejným spuštěním.</p></article>
      <article><p className="pw-eyebrow">03 · KONTAKT</p><h3>Podněty mají jedno místo.</h3><p>Bezpečnost, přístupnost i obecné dotazy lze směrovat přes transparentně označený kontaktní formulář.</p></article>
    </section>
    <section className="pw-next"><div><p className="pw-eyebrow">KONTAKT</p><h2>Něco v textu chybí nebo je nejasné?</h2><p>Kontaktní formulář je zatím lokální prototyp a nic sám neodesílá.</p></div><Link className="pw-button pw-button--dark" href="/kontakt">Přejít na kontakt</Link></section>
  </PublicShell>;
}

export default LegalWorkingPage;
