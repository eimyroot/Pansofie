import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../components/public/PublicShell";
import { PansofieVisualEngine } from "../components/public/PansofieVisualEngine";
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

const VISUAL_ENTRY_POINTS = [
  { title: "Objevuj", text: "O Pansofii, 7 cest, 16 oblastí a články v jednom klidném vstupu.", href: "/o-nas", image: pansofiePhoto("prague-nature-16x9") },
  { title: "Projekty", text: "Green Hope, Urban Family Farm, Digitální kompost a Labs jako živé směry praxe.", href: "/projekty", image: pansofiePhoto("growing-together-16x9") },
  { title: "Komunita", text: "Rodiny, školy, místa, organizace a partneři bez veřejného katalogu lidí.", href: "/komunita", image: pansofiePhoto("community-city-16x9") },
  { title: "Zapoj se", text: "Dobrovolnictví, partnerství a kontakt jako konkrétní další krok.", href: "/dobrovolnictvi", image: pansofiePhoto("curiosity-nature-16x9") },
  { title: "Pansofie GO", text: "Geolokační hra, která bere město jako mapu misí a checkpointů.", href: "/pansofie-go", image: pansofieScene("collaboration-map") },
  { title: "Přihlásit se", text: "Vstup do pracovního prostoru, kde projekty a mise navazují na účet.", href: "/login", image: pansofiePhoto("hero-community-left-safe-16x9") },
];


export default function HomePage() {
  return <PublicShell active="/">
    <section className="pw-hero pw-hero--engine">
      <div className="pw-hero__copy">
        <p className="pw-eyebrow">PANSOFIE · LIDÉ · VĚDĚNÍ · KONTEXT · ZMĚNA</p>
        <h1>Lepší svět<br/>začíná tady.<br/>Společně.</h1>
        <p className="pw-lead">Pansofie propojuje lidi, školy, firmy, rodiny, seniory, město, přírodu a technologie. Ne jako oddělené světy, ale jako síť vztahů, ve které se poznání mění v lepší rozhodnutí a konkrétní možnosti.</p>
        <div className="pw-hero__actions">
          <Link className="pw-button pw-button--dark" href="/jak-to-funguje">Poznej Pansofii</Link>
          <Link className="pw-button pw-button--light" href="/7-cest">Najdi svou cestu</Link>
        </div>
        <p className="pw-audience">Příležitost, ne povinnost. Pro jednotlivce, rodiny, školy, komunity i organizace.</p>
      </div>
      <div className="pw-hero__engine">
        <PansofieVisualEngine domains={PUBLIC_DOMAINS} paths={PUBLIC_PATHS}/>
      </div>
    </section>

    <section className="pve-identity-strip" aria-label="Pansofie v jednom pohledu">
      <article><span>01 · OBSAH</span><h3>16 oblastí</h3><p>Mapa života od Já a Těla po Občanství a Smysl.</p></article>
      <article><span>02 · RŮST</span><h3>7 cest</h3><p>Směry rozvoje bez pořadí, skóre a ideálního profilu.</p></article>
      <article><span>03 · PRAXE</span><h3>Projekty</h3><p>Místo, kde se vědění potká s lidmi a skutečnou potřebou.</p></article>
      <article><span>04 · VZTAHY</span><h3>Komunita</h3><p>Bezpečné kontexty propojené přes účel a společnou práci.</p></article>
    </section>

    <section className="pw-home-gateway" aria-label="Hlavní vstupy do Pansofie">
      {VISUAL_ENTRY_POINTS.map((item) => <Link className="pw-home-gateway__card" href={item.href} key={item.title}>
        <div><Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 16vw"/></div>
        <h2>{item.title}</h2>
        <p>{item.text}</p>
        <span>Pokračovat →</span>
      </Link>)}
    </section>

    <section className="pw-editorial-doors" aria-label="Pansofie v každodenním světě">
      <article className="pw-editorial-doors__lead">
        <p className="pw-eyebrow">MĚSTO JAKO UČEBNA</p>
        <h2>Stejný svět. Více perspektiv.</h2>
        <p>Dítě, učitelka, podnikatel, soused i senior vidí jinou část stejného problému. Pansofie je dává do souvislostí, aniž by z nich dělala jednu správnou odpověď.</p>
      </article>
      <Link className="pw-editorial-door" href="/pro-skoly"><Image src={pansofieIllustration("school-learning")} alt="Škola propojená s praktickým životem" fill sizes="(max-width: 900px) 100vw, 24vw"/><span>ŠKOLY</span><strong>Vzdělávání pro život</strong></Link>
      <Link className="pw-editorial-door" href="/pro-organizace"><Image src={pansofieScene("organization-network")} alt="Organizace a firmy propojené s komunitou" fill sizes="(max-width: 900px) 100vw, 24vw"/><span>FIRMY A ORGANIZACE</span><strong>Odpovědné podnikání</strong></Link>
      <Link className="pw-editorial-door" href="/sit"><Image src={pansofiePhoto("community-city-16x9")} alt="Lidé různých generací ve městě" fill sizes="(max-width: 900px) 100vw, 24vw"/><span>KOMUNITA</span><strong>Generace si mají co předat</strong></Link>
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
      <Link className="pw-text-link" href="/pansofie-go">Jak se z poznání stává akce v PansofieGO <span aria-hidden="true">→</span></Link>
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

    <section className="pw-future-bridge" aria-labelledby="future-bridge-title">
      <div className="pw-future-bridge__media">
        <Image src={pansofieScene("knowledge-journal")} alt="Poznání, pozorování a nové technologie v jednom pracovním prostoru" fill sizes="(max-width: 900px) 100vw, 48vw"/>
      </div>
      <div className="pw-future-bridge__copy">
        <p className="pw-eyebrow">OD KOMENSKÉHO K AI</p>
        <h2 id="future-bridge-title">Moudrost není víc informací. Je to schopnost vidět vztahy mezi nimi.</h2>
        <p>Pansofie navazuje na pansofickou myšlenku poznávání světa v souvislostech a přenáší ji do doby umělé inteligence. Technologie rozšiřuje možnosti, ale úsudek, odpovědnost a smysl zůstávají lidské.</p>
        <div className="pw-future-bridge__lenses">
          <article><span>01</span><strong>Vědění v souvislostech</strong><small>16 oblastí a 7 cest místo izolovaných témat.</small></article>
          <article><span>02</span><strong>AI jako nástroj</strong><small>Pro hledání souvislostí, tvorbu a otázky. Ne jako autorita nad člověkem.</small></article>
          <article><span>03</span><strong>Život jako učebna</strong><small>Město, škola, firma, rodina i příroda jsou místa učení.</small></article>
        </div>
      </div>
    </section>

    <section className="pw-circular-world" aria-labelledby="circular-title">
      <div className="pw-section__head">
        <div><p className="pw-eyebrow">MALÉ VĚCI · VELKÉ SOUVISLOSTI</p><h2 id="circular-title">Co může město znovu využít?</h2></div>
        <p>Od mikrogreens a městského pěstování přes zbytkové materiály až po mezigenerační pomoc. Ne jako katalog slibů, ale jako témata, ve kterých lze propojit poznání, dovednost a místní spolupráci.</p>
      </div>
      <div className="pw-circular-world__grid">
        <Link href="/urban-family-farm"><div><Image src={pansofiePhoto("prague-nature-16x9")} alt="Městské pěstování a zeleň" fill sizes="(max-width: 900px) 100vw, 25vw"/></div><span>URBAN FAMILY FARM</span><h3>Mikrogreens a městské pěstování</h3><p>Malá plocha, krátké cykly, praktická zkušenost s pěstováním a lokální potravou.</p></Link>
        <Link href="/digitalni-kompost"><div><Image src={pansofiePhoto("curiosity-nature-16x9")} alt="Přírodní materiály a pozorování detailu" fill sizes="(max-width: 900px) 100vw, 25vw"/></div><span>MATERIÁLY V OBĚHU</span><h3>Druhá šance pro materiál</h3><p>Přebytky, zbytky a věci, které mohou najít další smysluplné použití místo rychlého odpadu.</p></Link>
        <Link href="/sit"><div><Image src={pansofiePhoto("growing-together-16x9")} alt="Spolupráce lidí různých generací" fill sizes="(max-width: 900px) 100vw, 25vw"/></div><span>MEZIGENERAČNÍ VÝMĚNA</span><h3>Pomoc, zkušenost a čas</h3><p>Starší i mladší mají co nabídnout. Pansofie vytváří prostor pro bezpečné předávání zkušeností a praktickou pomoc.</p></Link>
        <Link href="/green-hope"><div><Image src={pansofiePhoto("community-city-16x9")} alt="Komunita, město a příroda" fill sizes="(max-width: 900px) 100vw, 25vw"/></div><span>GREEN HOPE</span><h3>Zeleň jako společný projekt</h3><p>Od jedné rostliny k péči o místo. Bez automatických tvrzení o dopadu, s důrazem na skutečnou zkušenost.</p></Link>
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
          <span>03</span><h3>Pansofie GO</h3><p>Aplikace pro celý ekosystém Pansofie. Podle věku, role a kontextu propojuje mise, projekty, týmy, portfolio a další konkrétní kroky. Herní motivace není hodnocením člověka.</p><Link href="/pansofie-go">Poznat Pansofie GO →</Link>
        </article>
      </div>
    </section>
  </PublicShell>;
}
