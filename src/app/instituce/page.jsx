import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { pansofiePhoto, pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Instituce a cirkulární propojení",
  description: "Jak mohou školy a organizace v Pansofii propojovat projektové potřeby, materiálové přebytky a konkrétní spolupráci.",
};

const FLOW = [
  ["Organizace nabídne přebytek", "Materiál, vybavení nebo jiný zdroj dostane srozumitelný popis a podmínky předání."],
  ["Škola popíše projektovou potřebu", "Potřeba vzniká z konkrétního projektu, ne z obecného katalogu přání."],
  ["Pansofie hledá smysluplný překryv", "Matching má hledat významovou souvislost, ne pouze shodu jednoho slova."],
  ["Lidé rozhodnou o dalším kroku", "Propojení je návrh. Rezervace, předání i další spolupráce zůstávají dobrovolné."],
];
export default function InstitutionsPage() {
  return <PublicShell active="/instituce">
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">ŠKOLY × ORGANIZACE</p><h1>Co jedné instituci přebývá, druhé může chybět.</h1><p>Školy mohou popsat skutečné projektové potřeby. Organizace mohou nabídnout čisté materiálové přebytky nebo kapacitu. Pansofie mezi nimi hledá smysluplný překryv.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("organization-network")} alt="Schéma spolupráce školy a organizace" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <EditorialFeatureBand
      eyebrow="DRUHÁ ŠANCE PRO MATERIÁL"
      title="Druhý život materiálu začíná konkrétní potřebou, ne algoritmem."
      text="Pansofie může propojit školní projekt s přebytkem firmy nebo organizace, ale konečné rozhodnutí zůstává na lidech. Matching pomáhá objevit souvislost, ne automaticky přesouvat věci ani vyrábět ESG zásluhy."
      image={pansofiePhoto("prague-nature-16x9")}
      imageAlt="Město a příroda jako společný prostor pro udržitelné projekty"
      reverse
      items={[["Školní dílna", "Materiál pro bezpečný projekt s konkrétním zadáním."], ["Komunitní oprava", "Věci a díly, které mohou znovu sloužit."], ["Městské pěstování", "Nádoby, konstrukce a vybavení pro pilotní záhony."], ["Prototyp", "Zbytek materiálu jako vstup pro návrh a testování."]]}
      link={{ href: "/digitalni-kompost", label: "Princip materiálů v oběhu" }}
    />

    <section className="pw-how-flow pw-how-flow--four">
      {FLOW.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h2>{title}</h2><p>{text}</p></article>)}
    </section>
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">PROTOTYP, NE BURZA</p><h2>Matching je návrh na propojení, ne automatické rozhodnutí.</h2></div>
      <div><p>Veřejná stránka nepředstírá živou materiálovou banku ani ověřené partnery. Skutečné nabídky, projektové potřeby a oprávnění patří do přihlášeného institucionálního prostoru.</p><small>DEMO názvy a nabídky ve starém prototypu sloužily k ověření UX a matching logiky.</small></div>
    </section>
    <section className="pw-next"><div><p className="pw-eyebrow">DVA VSTUPY</p><h2>Škola přináší projekt. Organizace může přinést zdroj.</h2><p>Obě strany mají vlastní kontext a odpovědnost. Pansofie je propojuje kolem konkrétního účelu.</p></div><Link className="pw-button pw-button--dark" href="/pro-organizace">Pro organizace</Link></section>
  </PublicShell>;
}
