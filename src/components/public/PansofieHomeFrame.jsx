import Link from "next/link";

const HERO_NODES = [
  ["Lidé", "18", "73"],
  ["Příroda", "72", "25"],
  ["Místa", "74", "70"],
  ["Vzdělávání", "38", "27"],
  ["Komunita", "82", "46"],
  ["Projekty", "43", "77"],
];

export function PansofieManifestHero() {
  return <section className="p02-hero" aria-labelledby="p02-hero-title">
    <div className="p02-hero__copy">
      <p className="p02-kicker">PANSOFIE · EKOSYSTÉM PRO UČENÍ ŽIVOTEM</p>
      <h1 id="p02-hero-title">Učení, které<br/>roste se životem.</h1>
      <p className="p02-hero__lead">Propojujeme lidi, přírodu, místa a projekty, aby se ze vzdělávání stával živý ekosystém, který pomáhá rozumět světu a jednat v něm.</p>
      <div className="p02-hero__actions">
        <Link className="pw-button pw-button--dark" href="/jak-to-funguje">Objevit ekosystém</Link>
        <Link className="p02-text-action" href="/16-oblasti">Prozkoumat 16 oblastí <span aria-hidden="true">↗</span></Link>
      </div>
      <p className="p02-hero__promise">Příležitost, ne povinnost. Každý může začít tam, kde mu to dává smysl.</p>
      <div className="p02-hero__index" aria-label="Hlavní vrstvy Pansofie">
        <span>01 · Lidé</span><span>02 · Příroda</span><span>03 · Místa</span><span>04 · Projekty</span>
      </div>
    </div>    <div className="p02-hero__atlas" aria-label="Mapa vztahů Pansofie">
      <svg className="p02-hero__lines" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M13 78 C27 58 28 40 42 31 S69 23 78 33"/>
        <path d="M20 73 C38 80 49 77 64 72 S78 58 84 47"/>
        <path d="M40 31 C48 47 57 52 73 70"/>
        <path d="M18 73 C38 61 56 45 72 25"/>
        <path d="M44 77 C49 61 67 51 84 47"/>
      </svg>
      <div className="p02-hero__statement">
        <span>PANSOFIE</span>
        <strong>Všechno<br/>souvisí se vším.</strong>
        <small>poznání · zkušenost · vztahy · svět</small>
      </div>
      {HERO_NODES.map(([label, left, top], index) => <span className={`p02-hero__node p02-hero__node--${index + 1}`} style={{left:`${left}%`,top:`${top}%`}} key={label}><i>{String(index + 1).padStart(2,"0")}</i>{label}</span>)}
      <svg className="p02-botanical" viewBox="0 0 240 320" aria-hidden="true">
        <path d="M116 306 C122 230 115 157 139 61"/>
        <path d="M128 212 C78 193 57 156 45 124 C87 127 115 151 128 212Z"/>
        <path d="M134 166 C173 148 194 117 204 84 C169 88 145 113 134 166Z"/>
        <path d="M140 102 C112 87 101 59 100 29 C129 39 143 68 140 102Z"/>
      </svg>
      <p className="p02-hero__note">„Poznání začíná tam, kde vidíme vztah.“</p>
    </div>
  </section>;
}

const AREA_GROUPS = [
  ["01", "Já"], ["02", "Tělo"], ["03", "Mysl"], ["04", "Emoce"],
  ["05", "Vztahy"], ["06", "Rodina"], ["07", "Společnost"], ["08", "Příroda"],
  ["09", "Technologie"], ["10", "Finance"], ["11", "Práce"], ["12", "Tvorba"],
  ["13", "Kultura"], ["14", "Etika"], ["15", "Občanství"], ["16", "Smysl života"],
];
export function PansofieEcosystemAtlas({ domains = [], paths = [] }) {
  const areas = domains.length === 16 ? domains.map((item, index) => [String(index + 1).padStart(2,"0"), item.title, item.id]) : AREA_GROUPS.map(([n,title]) => [n,title,title]);
  return <section className="p02-ecosystem" aria-labelledby="p02-ecosystem-title">
    <header className="p02-ecosystem__head">
      <div>
        <p className="p02-kicker">JEDEN SVĚT · DVĚ VRSTVY ČTENÍ</p>
        <h2 id="p02-ecosystem-title">Obsah života.<br/>Směry růstu.</h2>
      </div>
      <p>16 oblastí pojmenovává, <em>co</em> v životě poznáváme. 7 cest ukazuje, <em>jak</em> se můžeme rozvíjet. Projekty, lidé a místa dávají oběma vrstvám skutečný kontext.</p>
    </header>

    <div className="p02-ecosystem__canvas">
      <div className="p02-ecosystem__areas">
        <div className="p02-atlas-label"><strong>16</strong><span>oblastí<br/>života</span></div>
        <div className="p02-area-index">
          {areas.map(([number,title,id]) => <Link href={`/16-oblasti#${id}`} className="p02-area" key={number}><small>{number}</small><span>{title}</span></Link>)}
        </div>
      </div>

      <div className="p02-ecosystem__paths">
        <div className="p02-atlas-label p02-atlas-label--paths"><strong>7</strong><span>cest<br/>rozvoje</span></div>
        <div className="p02-path-ribbon">
          {paths.map((path, index) => <Link href={`/7-cest#${path.id}`} className={`p02-path p02-path--${index + 1}`} key={path.id}><i>{String(index + 1).padStart(2,"0")}</i><strong>{path.title}</strong><small>{path.text}</small></Link>)}
        </div>
      </div>

      <aside className="p02-ecosystem__annotation">
        <span>ŽIVÝ ATLAS</span>
        <p>Nejde o žebříček ani profil člověka. Oblasti a cesty jsou orientační mapa pro poznávání, zkušenost a vlastní rozhodování.</p>
        <div><Link href="/16-oblasti">Projít oblasti ↗</Link><Link href="/7-cest">Poznat cesty ↗</Link></div>
      </aside>
    </div>
  </section>;
}


export function PansofieEditorialGateway() {
  const secondary = [
    ["02 · PRAXE", "Projekty", "Poznání dostává místo, lidi a skutečný úkol.", "/projekty", "GREEN HOPE · URBAN FAMILY FARM · LABS"],
    ["03 · VZTAHY", "Komunita", "Školy, rodiny, organizace a místa propojené kolem účelu.", "/komunita", "LIDÉ · MÍSTA · SPOLUPRÁCE"],
    ["04 · AKCE", "Zapoj se", "Dobrovolnictví, partnerství a kontakt jako konkrétní další krok.", "/dobrovolnictvi", "ČAS · DOVEDNOST · PARTNERSTVÍ"],
  ];
  return <section className="p02-gateway" aria-labelledby="p02-gateway-title">
    <header className="p02-gateway__head">
      <div><p className="p02-kicker">ČTYŘI ZPŮSOBY VSTUPU</p><h2 id="p02-gateway-title">Začni tam, kde ti to dává smysl.</h2></div>
      <p>Pansofie není lineární kurz. Můžeš začít otázkou, projektem, vztahem nebo konkrétní možností něco udělat.</p>
    </header>
    <div className="p02-gateway__grid">
      <Link className="p02-gateway__feature" href="/o-nas">
        <span className="p02-gateway__meta">01 · ATLAS</span>
        <h3>Objevuj svět<br/>v souvislostech.</h3>
        <p>Začni příběhem Pansofie a otevři si mapu oblastí, cest, myšlenek a textů, které ukazují svět jako jeden propojený celek.</p>
        <div className="p02-gateway__feature-index" aria-hidden="true"><span>7 cest</span><span>16 oblastí</span><span>Vize</span><span>Články</span></div>
        <strong>Vstoupit do atlasu ↗</strong>
        <svg className="p02-gateway__branch" viewBox="0 0 460 260" aria-hidden="true"><path d="M42 218 C119 191 153 135 207 125 S316 102 408 39"/><path d="M205 125 C254 151 310 181 400 199"/><path d="M208 125 C237 90 271 56 324 35"/><circle cx="42" cy="218" r="4"/><circle cx="207" cy="125" r="4"/><circle cx="408" cy="39" r="4"/><circle cx="400" cy="199" r="4"/><circle cx="324" cy="35" r="4"/></svg>
      </Link>
      <div className="p02-gateway__secondary">
        {secondary.map(([meta,title,text,href,index]) => <Link href={href} className={`p02-gateway__route p02-gateway__route--${title.toLowerCase().replace(/ /g,"-")}`} key={title}>
          <span className="p02-gateway__meta">{meta}</span><h3>{title}</h3><p>{text}</p><small>{index}</small><strong>Pokračovat ↗</strong>
        </Link>)}
      </div>
    </div>
  </section>;
}


export function PansofiePerspectiveField() {
  const lenses = [
    ["01", "Školy", "Vzdělávání pro život", "Učivo se potkává s místem, projektem a zkušeností.", "/pro-skoly", "UČIVO · MÍSTO · PROJEKT · ZKUŠENOST"],
    ["02", "Organizace", "Zdroje v souvislostech", "Materiál, know-how, prostor a účel se dají číst jako jeden celek.", "/pro-organizace", "MATERIÁL · KNOW-HOW · PROSTOR · ÚČEL"],
    ["03", "Komunita", "Generace si mají co předat", "Zkušenost, pomoc a vztahy dostávají smysl kolem konkrétního místa a potřeby.", "/sit", "ZKUŠENOST · POMOC · VZTAH · MÍSTO"],
  ];
  return <section className="p02-perspectives" aria-labelledby="p02-perspectives-title">
    <div className="p02-perspectives__intro">
      <p className="p02-kicker">MĚSTO JAKO UČEBNA</p>
      <h2 id="p02-perspectives-title">Stejný svět.<br/>Více perspektiv.</h2>
      <p>Dítě, učitelka, podnikatel, soused i senior vidí jinou část stejného problému. Pansofie tyto pohledy nesrovnává do žebříčku. Dává je do souvislostí.</p>
      <blockquote>„Město může být místem, kde se učíme žít lépe.“</blockquote>
    </div>
    <div className="p02-perspectives__field">
      <svg className="p02-perspectives__map" viewBox="0 0 760 520" aria-hidden="true"><path d="M34 408 C133 337 183 285 250 245 S379 185 468 151 622 91 720 40"/><path d="M90 84 C183 127 215 181 282 211 S420 255 525 328 642 424 713 477"/><path d="M169 464 C203 391 269 353 353 333 S515 301 676 214"/><circle cx="250" cy="245" r="5"/><circle cx="468" cy="151" r="5"/><circle cx="525" cy="328" r="5"/></svg>
      <div className="p02-perspectives__list">
        {lenses.map(([number,eyebrow,title,text,href,index]) => <Link className="p02-perspective" href={href} key={number}>
          <span className="p02-perspective__number">{number}</span>
          <div><small>{eyebrow}</small><h3>{title}</h3><p>{text}</p><em>{index}</em></div>
          <strong>Otevřít ↗</strong>
        </Link>)}
      </div>
    </div>
  </section>;
}


const METHOD_NOTES = {
  "Poznej": "Všimni si otázky, vztahu nebo problému.",
  "Hraj": "Zkoušej bezpečně různé možnosti a role.",
  "Udělej": "Přenes poznání do konkrétního kroku.",
  "Vytvoř": "Dej zkušenosti vlastní tvar a řešení.",
  "Sdílej": "Propoj výsledek s lidmi a kontextem.",
  "Reflektuj": "Vrať se k tomu, co se změnilo a proč.",
};
export function PansofieLearningSequence({ steps = [] }) {
  return <section className="p02-method" aria-labelledby="p02-method-title">
    <header className="p02-method__head">
      <div><p className="p02-kicker">OD POZNÁNÍ KE ZKUŠENOSTI</p><h2 id="p02-method-title">Učení nekončí tím, že něco víme.</h2></div>
      <div className="p02-method__copy"><p>Pansofie převádí poznání do hry, činu, tvorby, sdílení a reflexe. Ne jako povinný žebříček, ale jako možnosti, jak si zkušenost opravdu osvojit.</p><strong>Rozumět souvislostem.<br/>Umět jednat.</strong></div>
    </header>
    <ol className="p02-method__track">
      {steps.map((step,index)=><li className={`p02-method__step p02-method__step--${index+1}`} key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong><p>{METHOD_NOTES[step] || "Další krok v učení životem."}</p></li>)}
    </ol>
    <footer className="p02-method__footer"><p>Cyklus není hodnocení člověka. Můžeš vstoupit tam, kde to dává smysl, a některé kroky přeskočit.</p><Link href="/pansofie-go">Jak se poznání mění v akci ↗</Link></footer>
  </section>;
}


export function PansofieProjectStories({ programs = [] }) {
  const [green, farm, family, knowledge] = programs;
  if (!green || !farm || !family || !knowledge) return null;
  return <section className="p02-projects" aria-labelledby="p02-projects-title">
    <header className="p02-projects__head">
      <div><p className="p02-kicker">KDE SE MYŠLENKA MĚNÍ V PRAXI</p><h2 id="p02-projects-title">Projekty dávají poznání skutečný kontext.</h2></div>
      <p>Ne všechny projekty jsou stejné a nemají proto vypadat stejně. Každý propojuje jiné místo, lidi, dovednosti a potřeby.</p>
    </header>
    <div className="p02-projects__layout">
      <Link className="p02-projects__lead" href={green.href}>
        <span className="p02-projects__meta">01 · {green.eyebrow}</span><h3>{green.title}</h3><p>{green.text}</p>
        <div className="p02-projects__nodes">{green.nodes.map((node)=><span key={node}>{node}</span>)}</div><strong>Otevřít Green Hope ↗</strong>
        <svg viewBox="0 0 520 360" aria-hidden="true"><path d="M228 345 C235 279 225 197 258 82"/><path d="M246 241 C180 224 133 185 108 135 C175 138 226 174 246 241Z"/><path d="M254 181 C319 155 355 110 370 61 C310 73 272 119 254 181Z"/><path d="M259 112 C221 85 213 51 218 23 C255 42 269 74 259 112Z"/></svg>
      </Link>
      <div className="p02-projects__rail">
        <Link className="p02-projects__farm" href={farm.href}><span className="p02-projects__meta">02 · {farm.eyebrow}</span><h3>{farm.title}</h3><p>{farm.text}</p><div>{farm.nodes.map((node,index)=><span key={node}><i>{String(index+1).padStart(2,"0")}</i>{node}</span>)}</div><strong>Otevřít projekt ↗</strong></Link>
        {[family,knowledge].map((program,index)=><Link className="p02-projects__minor" href={program.href} key={program.title}><span className="p02-projects__meta">0{index+3} · {program.eyebrow}</span><div><h3>{program.title}</h3><p>{program.text}</p></div><strong>↗</strong></Link>)}
      </div>
    </div>
  </section>;
}


export function PansofieKnowledgeBridge() {
  const principles = [
    ["01", "Vědění v souvislostech", "16 oblastí a 7 cest místo izolovaných témat."],
    ["02", "AI jako nástroj", "Pomáhá hledat vztahy, tvořit a klást otázky. Není autoritou nad člověkem."],
    ["03", "Život jako učebna", "Město, škola, firma, rodina i příroda jsou místa učení."],
  ];
  return <section className="p02-knowledge" aria-labelledby="p02-knowledge-title">
    <div className="p02-knowledge__statement"><p className="p02-kicker">OD KOMENSKÉHO K AI</p><h2 id="p02-knowledge-title">Moudrost není víc informací.<br/>Je to schopnost vidět vztahy mezi nimi.</h2><p>Pansofie navazuje na myšlenku poznávání světa v souvislostech a přenáší ji do doby umělé inteligence. Technologie rozšiřuje možnosti. Úsudek, odpovědnost a smysl zůstávají lidské.</p></div>
    <div className="p02-knowledge__principles">{principles.map(([n,title,text])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    <svg className="p02-knowledge__botanical" viewBox="0 0 280 380" aria-hidden="true"><path d="M131 365 C141 278 127 204 163 72"/><path d="M148 254 C83 232 47 190 31 143 C94 150 135 191 148 254Z"/><path d="M157 189 C213 166 242 122 252 82 C202 94 171 134 157 189Z"/><path d="M164 116 C129 95 121 60 127 28 C160 47 174 81 164 116Z"/></svg>
  </section>;
}

export function PansofieCityPractices() {
  const practices = [
    ["01 · PĚSTOVÁNÍ", "Mikrogreens a městské pěstování", "Malý cyklus, ve kterém se potkává příroda, práce, hodnota a péče.", "/urban-family-farm"],
    ["02 · MATERIÁLY", "Druhá šance pro materiál", "Potřeba, zdroj a nové použití místo automatického odpadu.", "/digitalni-kompost"],
    ["03 · ZKUŠENOST", "Pomoc, zkušenost a čas", "Mezigenerační výměna kolem konkrétního účelu, ne veřejný katalog lidí.", "/sit"],
    ["04 · ZELEŇ", "Zeleň jako společný projekt", "Pozoruj, pěstuj, pečuj a sdílej zkušenost s místem.", "/green-hope"],
  ];
  return <section className="p02-practices" aria-labelledby="p02-practices-title">
    <header className="p02-practices__head"><div><p className="p02-kicker">MALÉ VĚCI · VELKÉ SOUVISLOSTI</p><h2 id="p02-practices-title">Co může město znovu použít, vypěstovat nebo předat?</h2></div><p>Ne jako katalog slibů. Jako konkrétní témata, ve kterých se poznání potkává s místem, dovedností a spoluprací.</p></header>
    <div className="p02-practices__grid">{practices.map(([meta,title,text,href])=><Link href={href} key={meta}><span>{meta}</span><h3>{title}</h3><p>{text}</p><strong>Prozkoumat ↗</strong></Link>)}</div>
    <div className="p02-practices__mission"><div><p className="p02-kicker">PRVNÍ KONKRÉTNÍ KROK · MODELOVÝ PROJEKT</p><h3>Vypěstuj první rostlinu.</h3><p>Jednoduchá Green Hope mise propojuje pozorování přírody, vlastní zkušenost a volitelnou reflexi. Bez tvrzení o skutečné lokalitě nebo naměřeném dopadu.</p></div><div><Link className="pw-button pw-button--dark" href="/mise/rostlina">Poznat misi</Link><Link className="p02-text-action" href="/projekty">Prozkoumat projekty ↗</Link></div></div>
  </section>;
}

export function PansofieWorlds() {
  const worlds = [
    ["01", "Pansofie", "Veřejný editoriální prostor pro pochopení souvislostí, 16 oblastí, 7 cest a projektů.", "/jak-to-funguje", "Jak systém funguje ↗"],
    ["02", "Pansofie Young", "Věkově citlivá zkušenost pro mladé s bezpečnými kontexty, misemi a projekty.", "/young", "Vstoupit do Young ↗"],
    ["03", "Pansofie GO", "Aplikace pro celý ekosystém Pansofie. Mise, projekty a konkrétní kroky podle role a kontextu.", "/pansofie-go", "Poznat Pansofie GO ↗"],
  ];
  return <section className="p02-worlds" aria-labelledby="p02-worlds-title">
    <header><p className="p02-kicker">JEDNO JÁDRO · RŮZNÉ ZKUŠENOSTI</p><h2 id="p02-worlds-title">Pansofie není jedna obrazovka pro všechny.</h2><p>Jedna myšlenka, ale různé vstupy podle věku, role a situace. Vizuální příbuznost neznamená stejné rozhraní.</p></header>
    <div className="p02-worlds__grid">{worlds.map(([n,title,text,href,label],index)=><article className={`p02-world p02-world--${index+1}`} key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p><Link href={href}>{label}</Link></article>)}</div>
  </section>;
}
