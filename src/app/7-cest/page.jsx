import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Heart, BookOpen, ShieldCheck, UsersRound, Palette, Wallet, Sprout, Leaf, Search, GraduationCap, HandHeart, Check } from "lucide-react";
import { PublicShellV2 } from "../../components/public-v2/PublicShellV2";
import { DEVELOPMENT_PATHS } from "../../domain/learning-core";
import { PATHS } from "../../domain/pansofie-content";

export const metadata = {
  title: "7 cest k naplněnému životu",
  description: "Sedm propojených rozvojových cest PANSOFIE: Tělo, Mysl, Charakter, Vztahy, Tvořivost, Prosperita a Smysl. Žádná není žebříček ani skóre.",
};

const PATH_PRESENTATION = Object.freeze([
  { id: "body", label: "Tělo", icon: Heart, intro: "Péče o tělo, pohyb, zdravé návyky a duševní pohodu.", tone: "coral" },
  { id: "mind", label: "Mysl", icon: BookOpen, intro: "Objevování světa, učení a kritické myšlení.", tone: "gold" },
  { id: "character", label: "Charakter", icon: ShieldCheck, intro: "Hodnoty, odvaha, odpovědnost a vnitřní stabilita.", tone: "sage" },
  { id: "relationships", label: "Vztahy", icon: UsersRound, intro: "Rodina, přátelství, komunikace a spolupráce.", tone: "violet" },
  { id: "creativity", label: "Tvořivost", icon: Palette, intro: "Kreativita, kultura, sebevyjádření a inovace.", tone: "orange" },
  { id: "prosperity", label: "Prosperita", icon: Wallet, intro: "Praktické dovednosti, finanční gramotnost a hospodaření se zdroji.", tone: "blue" },
  { id: "meaning", label: "Smysl", icon: Sprout, intro: "Smysluplné projekty, pomoc druhým a odpovědnost za svět.", tone: "mint" },
]);

const AUDIENCES = Object.freeze([
  { label: "Děti 6–9", subtitle: "Objevují svět", icon: UsersRound, tone: "sage", points: ["Hravé aktivity", "První projekty", "Rozvoj základních dovedností"], href: "/young" },
  { label: "Děti 10–13", subtitle: "Hledají svou cestu", icon: Search, tone: "orange", points: ["Praktické mise", "Práce v týmu", "Objevování talentů"], href: "/young" },
  { label: "Mladí 14–20", subtitle: "Tvoří změny", icon: GraduationCap, tone: "violet", points: ["Reálné projekty", "Mentoring", "Příprava na budoucnost"], href: "/young" },
  { label: "Dospělí", subtitle: "Rostou a inspirují", icon: HandHeart, tone: "sage", points: ["Osobní rozvoj", "Komunitní projekty", "Předávání zkušeností"], href: "/projekty" },
]);

export default function PathsPage() {
  const paths = PATH_PRESENTATION.map((item, index) => {
    const canonical = DEVELOPMENT_PATHS[index];
    if (item.id !== canonical.id || item.label !== canonical.labelCs || PATHS[index][0] !== item.label) {
      throw new Error("Nesoulad v kanonickém seznamu sedmi cest.");
    }
    return { ...item, copy: PATHS[index][1] };
  });

  return <PublicShellV2 currentPath="/7-cest">
    <div className="ps2-paths">
      <section className="ps2-paths__hero" aria-labelledby="ps2-paths-title">
        <Image className="ps2-paths__hero-photo" src="/assets/brand-v2/editorial/w211-hero.avif" alt="Ilustrační obraz lidí různých generací, kteří spolu hovoří na vyhlídce" fill priority quality={85} sizes="100vw"/>
        <div className="ps2-paths__hero-wash" aria-hidden="true"/>
        <div className="ps2-paths__hero-content">
          <p className="ps2-paths__eyebrow">7 CEST</p>
          <h1 id="ps2-paths-title">Sedm cest<br/>k naplněnému životu</h1>
          <p>Sedm vzájemně propojených cest, které pomáhají dětem, mladým lidem i dospělým rozvíjet sebe, své vztahy, komunitu a svět kolem sebe.</p>
          <div className="ps2-paths__hero-actions">
            <a className="ps2-paths__button ps2-paths__button--solid" href="#prehled-cest">Prozkoumat 7 cest <ArrowDown size={17} aria-hidden="true"/></a>
            <Link className="ps2-paths__button ps2-paths__button--light" href="/jak-to-funguje">Jak to funguje <ArrowRight size={17} aria-hidden="true"/></Link>
          </div>
        </div>
        <p className="ps2-paths__handwriting">Různé cesty,<br/>stejný směr –<br/>lepší svět.</p>
      </section>

      <section className="ps2-paths__overview" id="prehled-cest" aria-labelledby="ps2-paths-overview-title">
        <div className="ps2-paths__overview-head">
          <div>
            <h2 id="ps2-paths-overview-title">Co jsou 7 cest?</h2>
            <p>Sedm cest představuje různé stránky rozvoje člověka, které společně tvoří celek. Každá přináší inspiraci, zkušenosti, projekty a nástroje pro osobní i společenský růst.</p>
          </div>
          <aside className="ps2-paths__thought" aria-label="Princip rozvojových cest">
            <Leaf size={26} aria-hidden="true"/>
            <p>„Sedm cest není žebříček. Každá otevírá jiný pohled na život.“</p>
            <small>PANSOFIE · princip metodiky</small>
          </aside>
        </div>
        <div className="ps2-paths__cards" aria-label="Přehled sedmi cest">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return <article className="ps2-paths__card" id={path.id} key={path.id}>
              <div className={"ps2-paths__card-photo ps2-paths__card-photo--" + index} role="img" aria-label={"Ilustrační fotografie pro cestu "+path.label}/>
              <div className={"ps2-paths__card-icon ps2-paths__tone--" + path.tone}><Icon size={28} strokeWidth={1.85} aria-hidden="true"/></div>
              <div className="ps2-paths__card-body">
                <h3>{path.label}</h3>
                <p>{path.intro}</p>
                <a href={"#detail-"+path.id} aria-label={"Více o cestě "+path.label}><ArrowRight size={18} aria-hidden="true"/></a>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className="ps2-paths__connected" aria-labelledby="ps2-paths-connected-title">
        <Image src="/assets/brand-v2/editorial/w211-sign.avif" alt="Dřevěný rozcestník s jednoduchými symboly u zelené lesní stezky" fill quality={85} sizes="100vw"/>
        <div className="ps2-paths__connected-card">
          <p className="ps2-paths__eyebrow">VŠE JE PROPOJENÉ</p>
          <h2 id="ps2-paths-connected-title">Cesty se vzájemně doplňují</h2>
          <p>Rozvoj v jedné oblasti přirozeně podporuje další. Společně vytvářejí rovnováhu, která vede k plnějšímu, svobodnějšímu a smysluplnějšímu životu.</p>
          <a className="ps2-paths__button ps2-paths__button--solid" href="#detaily-cest">Prozkoumat detailně každou cestu <ArrowRight size={17} aria-hidden="true"/></a>
        </div>
      </section>

      <section className="ps2-paths__audience" aria-labelledby="ps2-paths-audience-title">
        <h2 id="ps2-paths-audience-title">Pro koho jsou 7 cest?</h2>
        <p>Metodika a obsah jsou přizpůsobeny různým věkovým skupinám a životním situacím.</p>
        <div className="ps2-paths__audience-grid">
          {AUDIENCES.map(item => {
            const Icon = item.icon;
            return <article className="ps2-paths__audience-card" key={item.label}>
              <div className="ps2-paths__audience-heading">
                <span className={"ps2-paths__audience-icon ps2-paths__tone--"+item.tone}><Icon size={25} aria-hidden="true"/></span>
                <div><h3>{item.label}</h3><p>{item.subtitle}</p></div>
              </div>
              <ul>{item.points.map(point => <li key={point}><Check size={15} aria-hidden="true"/>{point}</li>)}</ul>
              <Link href={item.href} aria-label={"Prozkoumat nabídku pro "+item.label}>Prozkoumat <ArrowRight size={14} aria-hidden="true"/></Link>
            </article>;
          })}
        </div>
      </section>

      <section className="ps2-paths__details" id="detaily-cest" aria-labelledby="ps2-paths-details-title">
        <div className="ps2-paths__details-heading"><p className="ps2-paths__eyebrow">CESTY V PRAXI</p><h2 id="ps2-paths-details-title">Každá cesta má svou hloubku</h2><p>Žádná není vyšší ani lepší. V jednom skutečném projektu se jich může přirozeně propojovat několik.</p></div>
        <div className="ps2-paths__details-grid">
          {paths.map((path, i) => {
            const Icon = path.icon;
            return <article id={"detail-"+path.id} key={path.id}>
              <span className={"ps2-paths__details-icon ps2-paths__tone--"+path.tone}><Icon size={20} aria-hidden="true"/></span>
              <div><span className="ps2-paths__detail-number">{String(i+1).padStart(2,"0")}</span><h3>{path.label}</h3><p>{path.copy}</p></div>
            </article>;
          })}
        </div>
      </section>

      <section className="ps2-paths__join" aria-labelledby="ps2-paths-join-title">
        <Image src="/assets/brand-v2/editorial/w211-footer.avif" alt="Ilustrační fotografie dobrovolníků, kteří společně sázejí zeleninu v komunitní zahradě" fill quality={85} sizes="100vw"/>
        <div className="ps2-paths__join-wash" aria-hidden="true"/>
        <div className="ps2-paths__join-content">
          <p className="ps2-paths__eyebrow">SPOLEČNĚ TVOŘÍME</p>
          <h2 id="ps2-paths-join-title">Sedm cest. Jeden směr.<br/>Lepší svět.</h2>
          <p>Přidejte se k nám jako jednotlivec, rodina, škola nebo organizace. Každý má v Pansofii své místo.</p>
          <div className="ps2-paths__join-actions">
            <Link className="ps2-paths__button ps2-paths__button--light" href="/o-nas">Zjistit více <ArrowRight size={16} aria-hidden="true"/></Link>
            <Link className="ps2-paths__button ps2-paths__button--outline" href="/kontakt">Zapojit se <ArrowRight size={16} aria-hidden="true"/></Link>
          </div>
        </div>
      </section>
    </div>
  </PublicShellV2>;
}
