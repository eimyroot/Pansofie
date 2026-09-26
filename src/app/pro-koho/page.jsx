import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { pansofiePhoto } from "../../domain/asset-system";

export const metadata = {
  title: "Pro koho je Pansofie",
  description: "Různé vstupy do Pansofie pro mladé, rodiny, mentory, školy a organizace.",
};

const ROLES = [
  ["Děti & mladí", "Objevovat svět, učit se prakticky a přidávat se k věcem, které dávají smysl.", "nápady · zkušenosti · projekty", "/young"],
  ["Rodiny & lidé", "Sdílet čas, dovednosti a společné projekty bez nutnosti mít jeden sdílený účet.", "rodina · spolupráce · projekty", "/family-team"],
  ["Senioři & mentoři", "Předávat zkušenost a zároveň zůstávat součástí oboustranného učení.", "zkušenost · čas · příběhy", "/osobni-rust"],
  ["Školy", "Propojovat výuku s reálnými projekty, komunitou a mezioborovým učením.", "děti · komunita · projekty", "/pro-skoly"],
  ["Firmy & organizace", "Přinášet know-how, materiál, kapacitu nebo partnerství do konkrétních projektů.", "zdroje · know-how · podpora", "/pro-organizace"],
];
export default function WhoPage() {
  return <PublicShell active="/pro-koho">
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">PRO KOHO JE PANSOFIE</p><h1>Každý může vstoupit jinak.</h1><p>Není potřeba vědět předem, co přesně chcete dělat. Stačí zvolit pohled, který je vám teď nejbližší, nebo se jen rozhlédnout.</p></div>
      <div className="pw-page-hero__media"><Image src={pansofiePhoto("community-city-16x9")} alt="Lidé různých generací ve společném městském prostoru" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>
    <EditorialFeatureBand
      eyebrow="JEDEN EKOSYSTÉM · RŮZNÉ VSTUPY"
      title="Stejný svět nemusí vypadat stejně pro dítě, rodinu, školu a organizaci."
      text="Pansofie drží společné jádro, ale zkušenost se mění podle člověka a kontextu. Mladý člověk nepotřebuje firemní rozhraní a škola nepotřebuje dětskou herní vrstvu. Společné zůstávají oblasti, projekty, bezpečné vztahy a cesta od poznání ke zkušenosti."
      image={pansofiePhoto("growing-together-16x9")}
      imageAlt="Různé generace spolupracují na společné činnosti"
      reverse
      items={[["Děti a mladí", "Vlastní Young zkušenost a věkově přiměřené používání GO."], ["Rodiny", "Společné projekty při zachování jednotlivých identit a soukromí."], ["Školy", "Třídy, učitelé a projekty v řízeném školním kontextu."], ["Organizace", "Materiál, know-how, prostor nebo podpora kolem konkrétní potřeby."]]}
      link={{ href: "/sit", label: "Jak se jednotlivé vstupy propojují" }}
    />
    <section className="pw-entry-list">
      {ROLES.map(([title,text,tags,href], index) => <Link href={href} className="pw-entry-row" key={title}>
        <span>{String(index+1).padStart(2,"0")}</span><div><h2>{title}</h2><p>{text}</p></div><strong>{tags}</strong><b aria-hidden="true">→</b>
      </Link>)}
    </section>
    <section className="pw-next">
      <div><p className="pw-eyebrow">BEZ TLAKU</p><h2>Je v pořádku jen se dívat.</h2><p>Pansofie nemá být další platforma, která po člověku hned něco chce. Procházení obsahu je samo o sobě platný způsob, jak začít.</p></div>
      <Link className="pw-button pw-button--dark" href="/jak-to-funguje">Jak Pansofie funguje</Link>
    </section>
  </PublicShell>;
}
