import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { CHECKPOINTS, KNOWLEDGE_EXCHANGE } from "../../domain/pansofie-content";
import { pansofieScene } from "../../domain/asset-system";

export const metadata = {
  title: "Síť spolupráce",
  description: "Lokální skupiny, školy, rodiny a projekty jako propojená síť Pansofie.",
};

const PRINCIPLES = [
  ["Lokálně", "Skutečné vztahy začínají v rodině, škole, komunitě nebo konkrétním projektu."],
  ["Bezpečně", "Mladí lidé se propojují přes ověřené kontexty, ne přes veřejné hledání lidí v okolí."],
  ["Mezigeneračně", KNOWLEDGE_EXCHANGE],
  ["Otevřeně", "Síť má propojovat zkušenosti a zdroje bez veřejného skórování člověka."],
];

export default function NetworkPage() {
  return <PublicShell>
    <section className="pw-page-hero pw-page-hero--reverse">
      <div><p className="pw-eyebrow">SÍŤ PANSOFIE</p><h1>Propojení, které začíná blízko.</h1><p>Pansofie může spojovat jednotlivce, rodiny, školy, komunity a organizace. Ne jako veřejný katalog lidí, ale přes ověřené vztahy, projekty a bezpečné kontexty.</p></div>
      <div className="pw-page-hero__media pw-page-hero__media--contain"><Image src={pansofieScene("organization-network")} alt="Schéma propojené sítě lidí a organizací" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">JAK SÍŤ FUNGUJE</p><h2>Každý uzel má vlastní roli.</h2></div>
      <div><p>Rodina není škola, škola není komunita a komunita není organizace. Sdílejí ale projekty, zkušenosti a možnosti spolupráce. Pansofie drží identity a oprávnění oddělené.</p><small>Ukázkové checkpointy níže nejsou seznamem potvrzených partnerů ani přesnými místy dětí.</small></div>
    </section>

    <section className="pw-story-principles">
      {PRINCIPLES.map(([title,text], index) => <article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}
    </section>

    <section className="pw-network-demo">
      <div className="pw-network-demo__head"><p className="pw-eyebrow">MODELOVÁ SÍŤ</p><h2>Jak mohou vypadat různé typy uzlů.</h2><p>Jde o demonstrační body pro návrh produktu. Nejsou vydávány za existující partnerství.</p></div>
      <div className="pw-checkpoint-grid">{CHECKPOINTS.map(([title, place, type, status]) => <article key={title}><span>{type}</span><h3>{title}</h3><p>{place}</p><small>{status}</small></article>)}</div>
    </section>

    <section className="pw-next">
      <div><p className="pw-eyebrow">SPOLUPRÁCE</p><h2>Síť roste z konkrétních projektů, ne z počtu kontaktů.</h2><p>Organizace a školy mohou do Pansofie vstupovat přes vlastní ověřený kontext a konkrétní spolupráci.</p></div>
      <Link className="pw-button pw-button--dark" href="/pro-organizace">Pro organizace</Link>
    </section>
  </PublicShell>;
}
