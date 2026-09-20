import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../components/public/PublicShell";
import { DOMAIN_DETAILS, LEARNING_METHOD, PATHS, ECOSYSTEM_PRINCIPLE, KNOWLEDGE_EXCHANGE } from "../domain/pansofie-content";
import { DEVELOPMENT_PATHS, LEARNING_DOMAINS } from "../domain/learning-core";
import { domainIcon, pathIcon, pansofieIllustration, pansofiePhoto, pansofieScene } from "../domain/asset-system";

export const metadata = {
  title: { absolute: "Pansofie · Všechno souvisí se vším" },
  description: "Pansofie propojuje poznání, dovednosti, vztahy, přírodu, technologie a smysl do učení pro skutečný život.",
};

const PROGRAMS = [
  { title: "Green Hope", eyebrow: "Příroda a péče", text: "Od první rostliny po komunitní projekty. Poznání se mění v konkrétní zkušenost.", href: "/green-hope", image: pansofieIllustration("green-hope") },
  { title: "Urban Family Farm", eyebrow: "Praktický život", text: "Pěstování, zpracování, náklady, prodej a reinvestice jako jeden srozumitelný cyklus.", href: "/urban-family-farm", image: pansofieScene("urban-farm-system") },
  { title: "Family Team", eyebrow: "Rodina jako tým", text: "Společné mise a projekty při zachování vlastního prostoru a odpovídajících oprávnění.", href: "/family-team", image: pansofieIllustration("family-team") },
  { title: "Knowledge Exchange", eyebrow: "Mezigenerační učení", text: KNOWLEDGE_EXCHANGE, href: "/sit", image: pansofieScene("knowledge-journal") },
];

const PUBLIC_DOMAINS = DOMAIN_DETAILS.map(([title, text], index) => ({ id: LEARNING_DOMAINS[index].id, title, text }));
const PUBLIC_PATHS = PATHS.map(([title, text], index) => ({ id: DEVELOPMENT_PATHS[index].id, title, text }));

export default function HomePage() {
  return <PublicShell active="/">
    <section className="pw-hero">
      <div className="pw-hero__copy">
        <p className="pw-eyebrow">PANSOFIE · UČENÍ PRO SKUTEČNÝ ŽIVOT</p>
        <h1>Všechno<br/>souvisí se vším.</h1>
        <p className="pw-lead">Pansofie propojuje člověka, rodinu, společnost, přírodu, technologie i smysl. Ne jako oddělené předměty, ale jako jeden svět, ve kterém skutečně žijeme.</p>
        <div className="pw-hero__actions">
          <Link className="pw-button pw-button--dark" href="/16-oblasti">Objev 16 oblastí</Link>
          <Link className="pw-button pw-button--light" href="/jak-to-funguje">Jak Pansofie funguje</Link>
        </div>
        <p className="pw-audience">Pro jednotlivce, rodiny, školy, komunity i organizace.</p>
      </div>
      <div className="pw-hero__media">
        <Image src={pansofiePhoto("hero-community-left-safe-16x9")} alt="Lidé různých generací v prostředí, kde se propojuje město a příroda" fill priority sizes="(max-width: 780px) 100vw, 55vw"/>
        <div className="pw-hero__caption"><span>ČLOVĚK</span><i aria-hidden="true">→</i><span>RODINA</span><i aria-hidden="true">→</i><span>KOMUNITA</span><i aria-hidden="true">→</i><span>SVĚT</span></div>
      </div>
    </section>

    <section className="pw-manifest">
      <p className="pw-eyebrow">JEDEN PROPOJENÝ RÁMEC</p>
      <div className="pw-manifest__grid">
        <h2>Rozumět souvislostem.<br/>Umět jednat.</h2>
        <div><p>{ECOSYSTEM_PRINCIPLE}</p><p>Pansofie dává vedle sebe vědění, zkušenost, tvorbu, spolupráci a reflexi. Každá oblast života tak může být vstupem do dalšího poznávání.</p></div>
      </div>
    </section>

    <section className="pw-section pw-domains" aria-labelledby="domains-title">
      <div className="pw-section__head">
        <div><p className="pw-eyebrow">CO POZNÁVÁME</p><h2 id="domains-title">16 oblastí života</h2></div>
        <p>Od Já a Těla přes Rodinu, Přírodu a Technologie až po Etiku, Občanství a Smysl života.</p>
      </div>
      <div className="pw-domain-grid">
        {PUBLIC_DOMAINS.map((domain, index) => <Link className="pw-domain" key={domain.id} href={`/16-oblasti#${domain.id}`}>
          <span className="pw-domain__number">{String(index + 1).padStart(2,"0")}</span>
          <Image src={domainIcon(domain.id)} alt="" aria-hidden="true" width={34} height={34}/>
          <strong>{domain.title}</strong>
          <small>{domain.text}</small>
        </Link>)}
      </div>
      <Link className="pw-text-link" href="/16-oblasti">Projít všech 16 oblastí <span aria-hidden="true">→</span></Link>
    </section>

    <section className="pw-section pw-paths" aria-labelledby="paths-title">
      <div className="pw-section__head pw-section__head--light">
        <div><p className="pw-eyebrow">JAK ROSTEME</p><h2 id="paths-title">7 cest</h2></div>
        <p>Oblasti říkají, co poznáváme. Cesty ukazují, jak se můžeme rozvíjet napříč životem.</p>
      </div>
      <div className="pw-path-grid">
        {PUBLIC_PATHS.map((path, index) => <Link className="pw-path" key={path.id} href={`/7-cest#${path.id}`}>
          <span>{String(index + 1).padStart(2,"0")}</span>
          <Image src={pathIcon(path.id)} alt="" aria-hidden="true" width={52} height={52}/>
          <h3>{path.title}</h3>
          <p>{path.text}</p>
        </Link>)}
      </div>
      <Link className="pw-text-link pw-text-link--light" href="/7-cest">Poznat všech 7 cest <span aria-hidden="true">→</span></Link>
    </section>

    <section className="pw-method">
      <div className="pw-method__intro">
        <p className="pw-eyebrow">OD POZNÁNÍ KE ZKUŠENOSTI</p>
        <h2>Učení nekončí tím, že něco víme.</h2>
        <p>Pansofie převádí poznání do hry, činu, tvorby, sdílení a reflexe. Jednotlivé kroky nejsou povinnost ani žebříček. Jsou to možnosti, jak si zkušenost opravdu osvojit.</p>
      </div>
      <ol className="pw-method__steps">
        {LEARNING_METHOD.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2,"0")}</span><strong>{step}</strong></li>)}
      </ol>
    </section>

    <section className="pw-section pw-programs" aria-labelledby="programs-title">
      <div className="pw-section__head">
        <div><p className="pw-eyebrow">KDE SE MYŠLENKA MĚNÍ V PRAXI</p><h2 id="programs-title">Programy a společné projekty</h2></div>
        <p>Jedna Pansofie, několik způsobů, jak začít. Každý program propojuje poznání s konkrétní zkušeností.</p>
      </div>
      <div className="pw-program-grid">
        {PROGRAMS.map((program) => <article className="pw-program" key={program.title}>
          <div className="pw-program__media"><Image src={program.image} alt="" fill sizes="(max-width: 780px) 100vw, 50vw"/></div>
          <div className="pw-program__body">
            <p className="pw-eyebrow">{program.eyebrow}</p>
            <h3>{program.title}</h3>
            <p>{program.text}</p>
            <Link href={program.href}>Zjistit více <span aria-hidden="true">→</span></Link>
          </div>
        </article>)}
      </div>
    </section>

    <section className="pw-project-feature">
      <div className="pw-project-feature__media"><Image src={pansofiePhoto("growing-together-16x9")} alt="Společná práce na praktickém projektu" fill sizes="(max-width: 780px) 100vw, 52vw"/></div>
      <div className="pw-project-feature__copy">
        <p className="pw-eyebrow">PRVNÍ KONKRÉTNÍ KROK</p>
        <h2>Vypěstuj první rostlinu.</h2>
        <p>Jednoduchá Green Hope mise propojuje pozorování přírody, vlastní zkušenost a volitelnou reflexi. Je součástí modelového projektu Komunitní zahrada a už používá společné jádro Pansofie.</p>
        <div className="pw-project-feature__actions">
          <Link className="pw-button pw-button--dark" href="/mise/rostlina">Poznat misi</Link>
          <Link className="pw-button pw-button--light" href="/projekty">Prozkoumat projekty</Link>
        </div>
        <small>Modelový projekt. Bez tvrzení o skutečné lokalitě nebo naměřeném dopadu.</small>
      </div>
    </section>

    <section className="pw-products" aria-labelledby="products-title">
      <div className="pw-products__intro"><p className="pw-eyebrow">JEDNO JÁDRO, RŮZNÉ ZKUŠENOSTI</p><h2 id="products-title">Pansofie není jedna obrazovka pro všechny.</h2><p>Veřejná Pansofie vysvětluje souvislosti. Young přizpůsobuje zkušenost mladým. GO převádí poznání do misí, projektů a skutečných kroků.</p></div>
      <div className="pw-products__grid">
        <article className="pw-product pw-product--core">
          <span>01</span><h3>Pansofie</h3><p>Klidný editoriální prostor pro pochopení 16 oblastí, 7 cest a projektů, které je propojují.</p><Link href="/jak-to-funguje">Jak systém funguje →</Link>
        </article>
        <article className="pw-product pw-product--young">
          <span>02</span><h3>Pansofie Young</h3><p>Věkově citlivá zkušenost pro mladé, s misemi, projekty a bezpečnými kontexty místo otevřeného sociálního vyhledávání.</p><Link href="/young">Vstoupit do Young →</Link>
        </article>
        <article className="pw-product pw-product--go">
          <span>03</span><h3>Pansofie GO</h3><p>Akční vrstva pro mise, projekty, portfolio a další konkrétní kroky. Herní motivace není hodnocením člověka.</p><Link href="/pansofie-go">Poznat Pansofie GO →</Link>
        </article>
      </div>
    </section>
  </PublicShell>;
}
