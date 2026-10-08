import Link from "next/link";
import { DomainIconV2 } from "./DomainIconV2";
import { GoBridgeV2 } from "./GoBridgeV2";
import { HomeAtlasGraphicV2 } from "./HomeAtlasGraphicV2";
import { ImpactDimensionsV2 } from "./ImpactDimensionsV2";
import { MethodSequenceV2 } from "./MethodSequenceV2";
import { PathEmblemV2 } from "./PathEmblemV2";
import { PublicShellV2 } from "./PublicShellV2";
import { SectionHeadingV2 } from "./SectionHeadingV2";
import { SourceBackedRelationV2 } from "./SourceBackedRelationV2";
import { TruthBadgeV2 } from "./TruthBadgeV2";
import {
  GREEN_HOPE_SOURCE_RELATION_V2,
  PUBLIC_DOMAINS_V2,
  PUBLIC_PATHS_V2,
} from "../../domain/pansofie-public-v2";

const IMPACTS = Object.freeze([
  { id: "knowledge", label: "Poznání", body: "Co člověk nebo tým skutečně poznal." },
  { id: "skills", label: "Dovednosti", body: "Co dokáže použít nebo vytvořit v praxi." },
  { id: "well_being", label: "Well-being", body: "Samostatná dimenze, ne známka hodnoty člověka." },
  { id: "family", label: "Rodina", body: "Vztahy, spolupráce a společná zkušenost." },
  { id: "community", label: "Komunita", body: "Konkrétní přínos v bezpečném místním kontextu." },
  { id: "nature", label: "Příroda", body: "Příroda jako samostatná, zdrojově doložená dimenze." },
  { id: "entrepreneurship", label: "Podnikavost", body: "Tvorba hodnoty a praktická iniciativa." },
  { id: "intergenerational_connection", label: "Mezigenerační propojení", body: "Vzájemné učení napříč generacemi." },
]);

const PROGRAMS = Object.freeze([
  {
    title: "Green Hope",
    eyebrow: "Příroda a péče",
    text: "Pěstování, učení a péče o konkrétní místo. Modelový projekt je vždy viditelně označený.",
    href: "/green-hope",
    status: "MODEL",
    variant: "nature",
  },
  {
    title: "Urban Family Farm",
    eyebrow: "Praktický život",
    text: "Městské pěstování propojené s dovednostmi a praktickým učením.",
    href: "/urban-family-farm",
    variant: "farm",
  },
  {
    title: "Digitální kompost",
    eyebrow: "Materiály v oběhu",
    text: "Co už nepotřebuje jeden, může v bezpečném kontextu posloužit druhému.",
    href: "/digitalni-kompost",
    status: "PROTOTYPE",
    variant: "circular",
  },
  {
    title: "Labs",
    eyebrow: "Pokus a tvorba",
    text: "Prostor pro bezpečné prototypování, zkoumání a společnou tvorbu.",
    href: "/labs",
    status: "CONCEPT",
    variant: "lab",
  },
  {
    title: "Family Team",
    eyebrow: "Rodina jako tým",
    text: "Společná zkušenost při zachování vlastní identity a odpovídajících oprávnění.",
    href: "/family-team",
    variant: "family",
  },
  {
    title: "Knowledge Exchange",
    eyebrow: "Mezigenerační učení",
    text: "Dovednost, zkušenost a příběh se mohou předávat oběma směry.",
    href: "/sit",
    variant: "knowledge",
  },
]);

const AUDIENCES = Object.freeze([
  {
    title: "Mladý člověk",
    text: "Pansofie Young pro přibližně 6/7–18 let používá vlastní jazyk a bezpečné kontexty.",
    href: "/young",
    action: "Pansofie Young",
  },
  {
    title: "Jednotlivec",
    text: "Objev témata, projekty a malé konkrétní kroky bez povinného veřejného skóre.",
    href: "/7-cest",
    action: "Najít svou cestu",
  },
  {
    title: "Rodina",
    text: "Sdílené mise a projekty bez sdílené identity a bez nátlaku.",
    href: "/family-team",
    action: "Pro rodiny",
  },
  {
    title: "Škola",
    text: "Učení zkušeností v bezpečném a spravovatelném školním kontextu.",
    href: "/pro-skoly",
    action: "Pro školy",
  },
  {
    title: "Organizace / město",
    text: "Konkrétní kapacita, projekt a místní spolupráce bez automatických ESG tvrzení.",
    href: "/pro-organizace",
    action: "Pro organizace",
  },
]);

function Pillars() {
  const items = [
    { number: "01", title: "Pansofie", text: "Poznávat svět v souvislostech." },
    { number: "02", title: "Pampaedie", text: "Učit se celý život a jeden od druhého." },
    { number: "03", title: "Panorthosie", text: "Proměňovat poznání v dobré změny kolem sebe." },
  ];

  return <section className="ps2-home-pillars" id="filozofie">
    <div className="ps2-home-wrap">
      <SectionHeadingV2
        eyebrow="PROČ PANSOFIE EXISTUJE"
        title="Poznat. Učit se. Proměňovat."
        body="Pansofie nevnímá vědění jako izolované předměty. Spojuje porozumění světu, celoživotní učení a schopnost něco konkrétního zlepšit kolem sebe."
      />
      <div className="ps2-home-pillars__grid">
        {items.map((item) => <article key={item.number}>
          <span>{item.number}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>)}
      </div>
    </div>
  </section>;
}

function PathsSection() {
  return <section className="ps2-home-paths" id="cesty">
    <div className="ps2-home-wrap">
      <SectionHeadingV2
        eyebrow="7 CEST"
        title="Sedm cest člověka."
        body="Sedm pohledů na život. Ne sedm oddělených disciplín. Cesty dávají orientaci, oblasti pod nimi přidávají hloubku."
      />
      <div className="ps2-home-paths__grid">
        {PUBLIC_PATHS_V2.map((path) => <Link className="ps2-home-path-card" href={"/7-cest#" + path.id} key={path.id}>
          <div className="ps2-home-path-card__top">
            <span>{String(path.order).padStart(2, "0")}</span>
            <PathEmblemV2 pathId={path.id} size={44}/>
          </div>
          <small>{path.facetCs}</small>
          <h3>{path.labelCs}</h3>
          <p>{path.principleCs}</p>
          <strong>Prozkoumat →</strong>
        </Link>)}
      </div>
      <div className="ps2-home-inline-action"><Link href="/7-cest">Otevřít přehled 7 cest →</Link></div>
    </div>
  </section>;
}

function DomainsSection() {
  return <section className="ps2-home-domains" id="oblasti">
    <div className="ps2-home-wrap">
      <SectionHeadingV2
        eyebrow="16 OBLASTÍ"
        title="Život je širší než jeden předmět."
        body="Šestnáct oblastí tvoří hlubší mapu poznání a zkušenosti. Zůstávají vizuálně tišší než sedm cest, protože mají přidávat hloubku, ne soutěžit o pozornost."
      />
      <div className="ps2-home-domains__grid">
        {PUBLIC_DOMAINS_V2.map((domain) => <Link className="ps2-home-domain-card" href={"/16-oblasti#" + domain.id} key={domain.id}>
          <DomainIconV2 domainId={domain.id} size={30}/>
          <span>{String(domain.order).padStart(2, "0")}</span>
          <strong>{domain.labelCs}</strong>
          <small>{domain.labelEn}</small>
        </Link>)}
      </div>
      <div className="ps2-home-inline-action"><Link href="/16-oblasti">Otevřít všech 16 oblastí →</Link></div>
    </div>
  </section>;
}

function MethodSection() {
  return <section className="ps2-home-method" id="metoda">
    <div className="ps2-home-wrap">
      <SectionHeadingV2
        eyebrow="PANSOFIE METHOD"
        title="Poznání nekončí u přečtení."
        body="Poznej, hraj, udělej, vytvoř, sdílej, reflektuj. Někdy všemi kroky, jindy jen několika. Je to rytmus zkušenosti, ne povinný formulář."
      />
      <MethodSequenceV2/>
      <p className="ps2-home-method__note">Příležitost, ne povinnost. Důkaz ani reflexe nejsou automatickou vstupenkou k účasti.</p>
    </div>
  </section>;
}

function GreenHopeStory() {
  const { mission, project, skill } = GREEN_HOPE_SOURCE_RELATION_V2;

  return <section className="ps2-home-story" id="green-hope">
    <div className="ps2-home-wrap ps2-home-story__grid">
      <div
        className="ps2-home-story__art"
        aria-label="Koncept Green Hope vizuálu: půda, růst a vztahy. Finální dokumentární fotografie čeká na rights a truth gate."
      >
        <div className="ps2-home-story__soil"></div>
        <div className="ps2-home-story__stem"></div>
        <div className="ps2-home-story__leaf ps2-home-story__leaf--a"></div>
        <div className="ps2-home-story__leaf ps2-home-story__leaf--b"></div>
        <div className="ps2-home-story__rings"></div>
        <TruthBadgeV2 state="CONCEPT"/>
        <span className="ps2-home-story__caption">NEW DOCUMENTARY MASTER PENDING · žádný legacy fallback</span>
      </div>

      <div className="ps2-home-story__copy">
        <p className="ps2-eyebrow">PŘÍKLAD Z PRAXE</p>
        <h2>Green Hope</h2>
        <p>V současném modelu propojuje pěstování, učení a péči o konkrétní místo. Konkrétní projekt zůstává viditelně označený jako modelový prototyp.</p>
        <SourceBackedRelationV2
          sourceId={mission.id}
          sourceType="KANONICKÁ MISE"
          title={mission.titleCs}
          description={project.summaryCs}
          items={[
            { label: "Oblast", value: "Příroda" },
            { label: "Cesta", value: "Smysl" },
            { label: "Dovednost", value: skill.titleCs },
            { label: "Dokumentace", value: "Volitelná" },
          ]}
        />
        <div className="ps2-home-story__actions">
          <Link className="ps2-button ps2-button--primary" href="/green-hope">Poznat Green Hope</Link>
          <Link className="ps2-home-text-link" href="/16-oblasti#nature">Oblast Příroda →</Link>
        </div>
      </div>
    </div>
  </section>;
}

function ProgramsSection() {
  return <section className="ps2-home-programs" id="programy">
    <div className="ps2-home-wrap">
      <SectionHeadingV2
        eyebrow="PROGRAMY A PROJEKTY"
        title="Kde Pansofie žije v praxi."
        body="Každý program musí ukázat, co se skutečně děje v reálném světě. Bez inventovaných metrik a bez generického „inovujeme budoucnost“."
      />
      <div className="ps2-home-programs__grid">
        {PROGRAMS.map((program, index) => <Link className={"ps2-home-program ps2-home-program--" + program.variant} href={program.href} key={program.title}>
          <div className="ps2-home-program__visual" aria-hidden="true">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i></i><i></i><i></i>
          </div>
          <div className="ps2-home-program__copy">
            <div className="ps2-home-program__meta">
              <span>{program.eyebrow}</span>
              {program.status && <TruthBadgeV2 state={program.status}/>}
            </div>
            <h3>{program.title}</h3>
            <p>{program.text}</p>
            <strong>Otevřít →</strong>
          </div>
        </Link>)}
      </div>
    </div>
  </section>;
}

function IntergenerationalSection() {
  return <section className="ps2-home-intergen" id="rodina">
    <div className="ps2-home-wrap ps2-home-intergen__grid">
      <div>
        <p className="ps2-eyebrow">RODINA A GENERACE</p>
        <h2>Učíme se jeden od druhého.</h2>
        <p>Mladší může předat digitální dovednost. Starší zkušenost, řemeslo nebo příběh. Pansofie počítá s učením jako obousměrným vztahem.</p>
        <div className="ps2-home-intergen__actions">
          <Link className="ps2-button ps2-button--primary" href="/family-team">Family Team</Link>
          <Link className="ps2-home-text-link" href="/sit">Knowledge Exchange →</Link>
        </div>
      </div>
      <div className="ps2-home-intergen__map" role="img" aria-label="Vztahová mapa mezigeneračního učení mezi mladším člověkem, rodinou, školou a starší generací.">
        <svg viewBox="0 0 620 420" aria-hidden="true">
          <path d="M112 216 C210 112 340 110 505 190"/>
          <path d="M118 220 C230 300 356 330 512 230"/>
          <path d="M310 72 C286 154 286 250 310 350"/>
          <circle cx="112" cy="216" r="9"/>
          <circle cx="310" cy="72" r="9"/>
          <circle cx="310" cy="350" r="9"/>
          <circle cx="512" cy="210" r="9"/>
          <circle cx="310" cy="210" r="14"/>
        </svg>
        <span className="ps2-home-intergen__node ps2-home-intergen__node--a">Mladší</span>
        <span className="ps2-home-intergen__node ps2-home-intergen__node--b">Rodina</span>
        <span className="ps2-home-intergen__node ps2-home-intergen__node--c">Škola</span>
        <span className="ps2-home-intergen__node ps2-home-intergen__node--d">Starší</span>
        <strong>Vzájemnost</strong>
      </div>
    </div>
  </section>;
}

function CommunitySection() {
  return <section className="ps2-home-community" id="komunita">
    <div className="ps2-home-wrap ps2-home-community__grid">
      <div>
        <p className="ps2-eyebrow">KOMUNITA A SÍŤ</p>
        <h2>Komunita, ne feed.</h2>
        <p>Lidé, místa, školy, organizace a projekty se propojují podle skutečného kontextu. Ne přes veřejný katalog lidí a ne podle toho, kdo vydrží nejdéle scrollovat.</p>
        <Link className="ps2-button ps2-button--secondary" href="/komunita">Poznat komunitu a síť</Link>
      </div>
      <div className="ps2-home-network" role="img" aria-label="Koncept bezpečné vztahové sítě mezi lidmi, místy, projekty, rodinami, školami a organizacemi.">
        <svg viewBox="0 0 680 470" aria-hidden="true">
          <path d="M94 144 282 92 342 235 154 344 94 144Z"/>
          <path d="M282 92 556 138 342 235 566 344 154 344"/>
          <path d="M94 144 342 235 566 344"/>
          <circle cx="94" cy="144" r="10"/>
          <circle cx="282" cy="92" r="10"/>
          <circle cx="342" cy="235" r="14"/>
          <circle cx="556" cy="138" r="10"/>
          <circle cx="566" cy="344" r="10"/>
          <circle cx="154" cy="344" r="10"/>
        </svg>
        <span style={{ left: "8%", top: "22%" }}>Lidé</span>
        <span style={{ left: "36%", top: "10%" }}>Místa</span>
        <span style={{ left: "44%", top: "43%" }}>Projekty</span>
        <span style={{ left: "78%", top: "22%" }}>Školy</span>
        <span style={{ left: "78%", top: "73%" }}>Organizace</span>
        <span style={{ left: "16%", top: "73%" }}>Rodiny</span>
      </div>
    </div>
  </section>;
}

function ImpactSection() {
  return <section className="ps2-home-impact" id="dopad">
    <div className="ps2-home-wrap">
      <SectionHeadingV2
        eyebrow="DOPAD"
        title="Dopad není jedno číslo."
        body="Smysluplný dopad má více rozměrů a musí mít oporu v důkazech. Pansofie nehodnotí člověka jedním veřejným skóre."
      />
      <ImpactDimensionsV2 dimensions={IMPACTS}/>
      <div className="ps2-home-inline-action"><Link href="/impact">Jak Pansofie pracuje s dopadem →</Link></div>
    </div>
  </section>;
}

function AudienceSection() {
  return <section className="ps2-home-audience" id="pro-koho">
    <div className="ps2-home-wrap">
      <SectionHeadingV2
        eyebrow="PRO KOHO"
        title="Každý vstupuje jinudy."
        body="Jedno produktové jádro, různé kontexty. Veřejná Pansofie vysvětluje souvislosti, Young přizpůsobuje zkušenost mladým a GO převádí poznání do konkrétní akce."
      />
      <div className="ps2-home-audience__grid">
        {AUDIENCES.map((audience, index) => <Link href={audience.href} key={audience.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{audience.title}</h3>
          <p>{audience.text}</p>
          <strong>{audience.action} →</strong>
        </Link>)}
      </div>
    </div>
  </section>;
}

function FinalSection() {
  return <section className="ps2-home-final" id="zapoj-se">
    <div className="ps2-home-wrap">
      <p className="ps2-eyebrow">DALŠÍ KROK</p>
      <h2>Začni tam, kde právě jsi.</h2>
      <p>Nemusíš nejdřív projít celým systémem. Můžeš se podívat, najít svou cestu nebo rovnou otevřít konkrétní možnost v GO.</p>
      <div className="ps2-home-final__actions">
        <Link className="ps2-button ps2-button--primary" href="/o-nas">Objev Pansofii</Link>
        <Link className="ps2-button ps2-button--secondary" href="/7-cest">Najdi svou cestu</Link>
        <Link className="ps2-home-text-link" href="/pansofie-go">Otevři Pansofie GO →</Link>
      </div>
    </div>
  </section>;
}

export function HomePageV2() {
  return <PublicShellV2 currentPath="/">
    <section className="ps2-home-hero" id="objevuj">
      <div className="ps2-home-hero__copy">
        <p className="ps2-eyebrow">PANSOFIE · UČENÍ ŽIVOTEM</p>
        <p className="ps2-home-hero__brandline">Poznej sebe. Rozvíjej svět.</p>
        <h1>
          <span>Rozumět světu.</span>
          <span>Žít v něm vědoměji.</span>
          <span>Tvořit ho společně.</span>
        </h1>
        <p className="ps2-home-hero__lead">Pansofie propojuje poznání se skutečným životem, vztahy, přírodou, tvorbou a konkrétními činy.</p>
        <div className="ps2-home-hero__actions">
          <Link className="ps2-button ps2-button--primary" href="/o-nas">Objev Pansofii</Link>
          <Link className="ps2-button ps2-button--secondary" href="/7-cest">Začni svou cestu</Link>
        </div>
        <div className="ps2-home-hero__bridge">
          <strong>Pansofie GO</strong>
          <span>Mise a projekty ve skutečném světě. Až chceš přejít od porozumění k vlastní zkušenosti.</span>
        </div>
      </div>
      <HomeAtlasGraphicV2/>
    </section>

    <Pillars/>
    <PathsSection/>
    <DomainsSection/>
    <MethodSection/>
    <GreenHopeStory/>

    <section className="ps2-home-go">
      <GoBridgeV2
        title="Od poznání k činu."
        text="V GO najdeš konkrétní mise, projekty a místa, kde můžeš něco skutečně udělat. Poloha se používá jen po tvé akci a poloha dítěte se veřejně nezobrazuje."
      />
    </section>

    <ProgramsSection/>
    <IntergenerationalSection/>
    <CommunitySection/>
    <ImpactSection/>
    <AudienceSection/>
    <FinalSection/>
  </PublicShellV2>;
}
