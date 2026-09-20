import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
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
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">CO POZNÁVÁME</p><h1>16 oblastí.<br/>Jeden život.</h1><p>Život není rozdělený do předmětů. Tělo ovlivňuje mysl, vztahy rodinu, technologie společnost a naše rozhodnutí svět kolem nás. Pansofie proto pracuje se šestnácti oblastmi jako s jedním propojeným celkem.</p></div>
      <div className="pw-page-hero__media"><Image src={pansofiePhoto("curiosity-nature-16x9")} alt="Pozorování přírody jako součást poznávání světa" fill priority sizes="(max-width: 780px) 100vw, 46vw"/></div>
    </section>

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
