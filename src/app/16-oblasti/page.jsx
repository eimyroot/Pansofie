import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { DOMAIN_DETAILS } from "../../domain/pansofie-content";
import { LEARNING_DOMAINS } from "../../domain/learning-core";
import { domainIcon, pansofiePhoto } from "../../domain/asset-system";

export const metadata = {
  title: "16 oblastí života",
  description: "Šestnáct propojených oblastí Pansofie od Já a Těla po Občanství a Smysl života.",
};

const PUBLIC_DOMAINS = DOMAIN_DETAILS.map(([title, text], index) => ({ id: LEARNING_DOMAINS[index].id, title, text }));

export default function DomainsPage() {
  return <PublicShell active="/16-oblasti">
    <section className="pw-visual-hero pw-visual-hero--engine pw-visual-hero--discover-domains">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">CO POZNÁVÁME</p><h1>16 oblastí.<br/>Jeden život.</h1><p>Život není rozdělený do předmětů. Tělo ovlivňuje mysl, vztahy rodinu, technologie společnost a naše rozhodnutí svět kolem nás. Pansofie proto pracuje se šestnácti oblastmi jako s jedním propojeným celkem.</p><div className="pw-visual-hero__actions"><Link className="pw-button pw-button--dark" href="#self">Otevřít mapu oblastí</Link><Link className="pw-button pw-button--light" href="/7-cest">7 cest růstu</Link></div></div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="domains" domains={PUBLIC_DOMAINS}/></div>
    </section>
    <nav className="pw-discover-icon-grid pw-discover-icon-grid--domains" aria-label="Vizuální mapa 16 oblastí">
      {PUBLIC_DOMAINS.map((domain, index) => <a href={`#${domain.id}`} className="pw-discover-icon-card" key={domain.id}><span>{String(index + 1).padStart(2,"0")}</span><Image src={domainIcon(domain.id)} alt="" width={44} height={44} aria-hidden="true"/><strong>{domain.title}</strong></a>)}
    </nav>

    <EditorialFeatureBand
      eyebrow="MAPA SOUVISLOSTÍ"
      title="Šestnáct oblastí není šestnáct šuplíků."
      text="Skutečný život protíná více oblastí najednou. Rozhodnutí o práci se dotýká financí, vztahů i zdraví; technologie mění společnost i naši pozornost; péče o přírodu souvisí s občanstvím, ekonomikou a tím, jak chceme žít. Oblasti proto slouží jako mapa pro otázky, ne jako oddělené školní předměty."
      image={pansofiePhoto("community-city-16x9")}
      imageAlt="Lidé v městském prostředí jako součást propojeného systému života"
      items={[["Já a tělo", "Vnitřní stav ovlivňuje rozhodování, energii i vztahy."], ["Vztahy a rodina", "Blízké prostředí formuje způsob, jak spolupracujeme a pečujeme."], ["Práce a technologie", "Nástroje, tvorba hodnoty a odpovědnost se vyvíjejí společně."], ["Příroda a společnost", "Místo, zdroje a občanská rozhodnutí patří do stejného světa."]]}
      link={{ href: "/7-cest", label: "Podívat se na 7 cest růstu" }}
    />

    <nav className="pw-anchor-nav" aria-label="Oblasti života">
      {PUBLIC_DOMAINS.map((domain, index) => <a key={domain.id} href={`#${domain.id}`}>{String(index + 1).padStart(2,"0")} {domain.title}</a>)}
    </nav>

    <section className="pw-domain-list">
      {PUBLIC_DOMAINS.map((domain, index) => <article className="pw-domain-detail" id={domain.id} key={domain.id}>
        <div className="pw-domain-detail__icon"><span>{String(index + 1).padStart(2,"0")}</span><Image src={domainIcon(domain.id)} alt="" width={58} height={58} aria-hidden="true"/></div>
        <div><p className="pw-eyebrow">OBLAST {String(index + 1).padStart(2,"0")}</p><h2>{domain.title}</h2><p>{domain.text}</p></div>
      </article>)}
    </section>
    <section className="pw-next">
      <div><p className="pw-eyebrow">CO DÁL</p><h2>Oblasti jsou obsah. Cesty jsou způsob růstu.</h2><p>Stejnou oblast můžeme poznávat z různých stran a v různých životních situacích. Sedm cest dává rozvoji další orientaci.</p></div>
      <Link className="pw-button pw-button--dark" href="/7-cest">Pokračovat na 7 cest</Link>
    </section>
  </PublicShell>;
}
