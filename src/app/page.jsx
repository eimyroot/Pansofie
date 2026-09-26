import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../components/public/PublicShell";
import { PansofieVisualEngine } from "../components/public/PansofieVisualEngine";
import { PansofieArtPanel } from "../components/public/PansofieArtPanel";
import { MOCKUP01_PHOTOS } from "../components/public/PansofieDocumentary";
import { DOMAIN_DETAILS, LEARNING_METHOD, PATHS, ECOSYSTEM_PRINCIPLE, KNOWLEDGE_EXCHANGE } from "../domain/pansofie-content";
import { DEVELOPMENT_PATHS, LEARNING_DOMAINS } from "../domain/learning-core";
import { domainIcon, pathIcon } from "../domain/asset-system";

export const metadata = {
  title: { absolute: "Pansofie · Všechno souvisí se vším" },
  description: "Pansofie propojuje poznání, dovednosti, vztahy, přírodu, technologie a smysl do učení pro skutečný život.",
};

const PROGRAMS = [
  { title: "Green Hope", eyebrow: "Příroda a péče", text: "Od první rostliny po komunitní projekty. Poznání se mění v konkrétní zkušenost.", href: "/green-hope", variant: "nature", nodes:["Pěstování","Péče","Místo","Komunita"] },
  { title: "Urban Family Farm", eyebrow: "Praktický život", text: "Pěstování, zpracování, náklady, prodej a reinvestice jako jeden srozumitelný cyklus.", href: "/urban-family-farm", variant: "city", nodes:["Pěstuj","Zpracuj","Spočítej","Rozhodni"] },
  { title: "Family Team", eyebrow: "Rodina jako tým", text: "Společné mise a projekty při zachování vlastního prostoru a odpovídajících oprávnění.", href: "/family-team", variant: "community", nodes:["Rodina","Role","Zkušenost","Reflexe"] },
  { title: "Knowledge Exchange", eyebrow: "Mezigenerační učení", text: KNOWLEDGE_EXCHANGE, href: "/sit", variant: "knowledge", nodes:["Dovednost","Příběh","Kontext","Vzájemnost"] },
];

const PUBLIC_DOMAINS = DOMAIN_DETAILS.map(([title, text], index) => ({ id: LEARNING_DOMAINS[index].id, title, text }));
const PUBLIC_PATHS = PATHS.map(([title, text], index) => ({ id: DEVELOPMENT_PATHS[index].id, title, text }));

const VISUAL_ENTRY_POINTS = [
  { title: "Objevuj", text: "O Pansofii, 7 cest, 16 oblastí a články v jednom klidném vstupu.", href: "/o-nas", label:"ATLAS", variant:"knowledge", nodes:["7 cest","16 oblastí","Vize","Články"] },
  { title: "Projekty", text: "Green Hope, Urban Family Farm, Digitální kompost a Labs jako živé směry praxe.", href: "/projekty", label:"PRAXE", variant:"nature", nodes:["Místo","Potřeba","Lidé","Výsledek"] },
  { title: "Komunita", text: "Rodiny, školy, místa, organizace a partneři bez veřejného katalogu lidí.", href: "/komunita", label:"VZTAHY", variant:"community", nodes:["Rodina","Škola","Místo","Organizace"] },
  { title: "Zapoj se", text: "Dobrovolnictví, partnerství a kontakt jako konkrétní další krok.", href: "/dobrovolnictvi", label:"AKCE", variant:"city", nodes:["Čas","Dovednost","Projekt","Partnerství"] },
];



export default function HomePage() {
  return <PublicShell active="/">
    <section className="p01-home-hero">
      <div className="p01-home-hero__copy">
        <p className="pw-eyebrow">PANSOFIE · LIDÉ · VĚDĚNÍ · KONTEXT · ZMĚNA</p>
        <h1>Lepší svět<br/>začíná tady.<br/>Společně.</h1>
        <p className="pw-lead">Pansofie propojuje lidi, školy, firmy, rodiny, seniory, město, přírodu a technologie. Ne jako oddělené světy, ale jako síť vztahů, ve které se poznání mění v lepší rozhodnutí a konkrétní možnosti.</p>
        <div className="pw-hero__actions">
          <Link className="pw-button pw-button--dark" href="/jak-to-funguje">Poznej Pansofii</Link>
          <Link className="pw-button pw-button--light" href="/7-cest">Najdi svou cestu</Link>
        </div>
        <p className="pw-audience">Příležitost, ne povinnost. Pro jednotlivce, rodiny, školy, komunity i organizace.</p>
      </div>
      <figure className="p01-home-hero__photo">
        <Image src={MOCKUP01_PHOTOS.ecosystem} alt="Mezigenerační učení, pěstování a tvorba v komunitním prostoru" fill priority sizes="(max-width: 900px) 100vw, 48vw"/>
        <figcaption><span>PANSOFIE</span><strong>Ekosystém pro učení životem</strong><small>vzdělávání · komunita · projekty · skutečný život</small></figcaption>
      </figure>
      <PansofieArtPanel eyebrow="VŠECHNO SOUVISÍ SE VŠÍM" title="Jeden svět. Více vztahů." detail="lidé · příroda · místa · vzdělávání · komunita" nodes={["Lidé","Příroda","Místa","Vzdělávání","Komunita"]} variant="ecosystem" caption="Poznání má smysl ve vztahu k tomu, co žijeme."/>
    </section>

    <section className="p01-ecosystem-map">
      <div><p className="pw-eyebrow">EKOSYSTÉM PANSOFIE</p><h2>Propojené světy. Jeden smysl.</h2><p>16 oblastí ukazuje, co v životě poznáváme. 7 cest ukazuje, jak můžeme růst. Projekty a komunita dávají poznání konkrétní kontext.</p><div className="p01-ecosystem-map__links"><Link href="/16-oblasti">16 oblastí →</Link><Link href="/7-cest">7 cest →</Link><Link href="/projekty">Projekty →</Link></div></div>
      <PansofieVisualEngine domains={PUBLIC_DOMAINS} paths={PUBLIC_PATHS}/>
    </section>

    <section className="pve-identity-strip" aria-label="Pansofie v jednom pohledu">
      <article><span>01 · OBSAH</span><h3>16 oblastí</h3><p>Mapa života od Já a Těla po Občanství a Smysl.</p></article>
      <article><span>02 · RŮST</span><h3>7 cest</h3><p>Směry rozvoje bez pořadí, skóre a ideálního profilu.</p></article>
      <article><span>03 · PRAXE</span><h3>Projekty</h3><p>Místo, kde se vědění potká s lidmi a skutečnou potřebou.</p></article>
      <article><span>04 · VZTAHY</span><h3>Komunita</h3><p>Bezpečné kontexty propojené přes účel a společnou práci.</p></article>
    </section>

    <section className="pw-home-gateway pw-home-gateway--p01" aria-label="Hlavní vstupy do Pansofie">
      {VISUAL_ENTRY_POINTS.map((item) => <Link className="pw-home-gateway__card" href={item.href} key={item.title}>
        <div><PansofieArtPanel compact eyebrow={item.label} title={item.title} detail={item.text} nodes={item.nodes} variant={item.variant}/></div>
        <h2>{item.title}</h2><p>{item.text}</p><span>Pokračovat →</span>
      </Link>)}
    </section>

    <section className="pw-editorial-doors pw-editorial-doors--p01" aria-label="Pansofie v každodenním světě">
      <article className="pw-editorial-doors__lead"><p className="pw-eyebrow">MĚSTO JAKO UČEBNA</p><h2>Stejný svět. Více perspektiv.</h2><p>Dítě, učitelka, podnikatel, soused i senior vidí jinou část stejného problému. Pansofie je dává do souvislostí.</p></article>
      <Link className="pw-editorial-door" href="/pro-skoly"><PansofieArtPanel compact eyebrow="ŠKOLY" title="Vzdělávání pro život" detail="učivo · místo · projekt · zkušenost" nodes={["Škola","Město","Příroda","Projekt"]} variant="knowledge"/></Link>
      <Link className="pw-editorial-door" href="/pro-organizace"><PansofieArtPanel compact eyebrow="ORGANIZACE" title="Zdroje v souvislostech" detail="materiál · know-how · prostor · účel" nodes={["Materiál","Know-how","Místo","Účel"]} variant="city"/></Link>
      <Link className="pw-editorial-door" href="/sit"><PansofieArtPanel compact eyebrow="KOMUNITA" title="Generace si mají co předat" detail="zkušenost · pomoc · vztah · místo" nodes={["Rodina","Senior","Škola","Komunita"]} variant="community"/></Link>
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
          <div className="pw-program__media"><PansofieArtPanel eyebrow={program.eyebrow} title={program.title} detail={program.text} nodes={program.nodes} variant={program.variant}/></div>
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
      <div className="pw-future-bridge__media"><PansofieArtPanel eyebrow="OD KOMENSKÉHO K AI" title="Poznání v souvislostech" detail="člověk · úsudek · technologie · odpovědnost" nodes={["Vědění","Úsudek","AI","Smysl","Zkušenost"]} variant="knowledge" caption="Technologie rozšiřuje možnosti. Smysl a odpovědnost zůstávají lidské."/></div>
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
        <Link href="/urban-family-farm"><PansofieArtPanel compact eyebrow="URBAN FAMILY FARM" title="Mikrogreens a městské pěstování" detail="malý cyklus · hodně souvislostí" nodes={["Semeno","Péče","Práce","Hodnota"]} variant="nature"/></Link>
        <Link href="/digitalni-kompost"><PansofieArtPanel compact eyebrow="MATERIÁLY V OBĚHU" title="Druhá šance pro materiál" detail="potřeba · zdroj · propojení · použití" nodes={["Dřevo","Textil","Obal","Vybavení"]} variant="city"/></Link>
        <Link href="/sit"><PansofieArtPanel compact eyebrow="KNOWLEDGE EXCHANGE" title="Pomoc, zkušenost a čas" detail="bez katalogu lidí · kolem konkrétního účelu" nodes={["Zkušenost","Dovednost","Kontext","Vzájemnost"]} variant="community"/></Link>
        <Link href="/green-hope"><PansofieArtPanel compact eyebrow="GREEN HOPE" title="Zeleň jako společný projekt" detail="pozoruj · pěstuj · pečuj · sdílej" nodes={["Půda","Voda","Rostlina","Místo"]} variant="nature"/></Link>
      </div>
    </section>

    <section className="pw-project-feature">
      <div className="pw-project-feature__media"><PansofieArtPanel eyebrow="GREEN HOPE" title="Vypěstuj první rostlinu" detail="pozorování · péče · zkušenost · reflexe" nodes={["Semeno","Půda","Voda","Pozorování","Péče"]} variant="nature" caption="Modelový projekt · bez tvrzení o skutečné lokalitě nebo naměřeném dopadu"/></div>
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
