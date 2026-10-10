import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, UsersRound, Globe2, Lightbulb } from "lucide-react";
import { PublicShellV2 } from "../../components/public-v2/PublicShellV2";

export const metadata = {
  title: "O Pansofii",
  description: "Věříme v generaci, která dokáže měnit svět k lepšímu. Pansofie propojuje poznání, praktické učení, spolupráci a odpovědnost.",
};

const MISSIONS = Object.freeze([
  { label: "Rozvoj člověka", detail: "Poznání, dovednosti, charakter", icon: Leaf },
  { label: "Silné komunity", detail: "Spolupráce a vzájemná podpora", icon: UsersRound },
  { label: "Udržitelná budoucnost", detail: "Respekt k přírodě a odpovědnost", icon: Globe2 },
  { label: "Skutečný přínos", detail: "Nápady, projekty a konkrétní změny", icon: Lightbulb },
]);

const STORY_STEPS = Object.freeze([
  { label: "Vize", body: "Propojovat lidi, kteří chtějí tvořit smysluplné změny." },
  { label: "Komunita", body: "Budovat prostředí pro spolupráci a vzájemné učení." },
  { label: "Projekty", body: "Převádět nápady na konkrétní společné činnosti." },
  { label: "Dopad", body: "Zkoumat skutečné výsledky a učit se z nich." },
]);

const VALUES = Object.freeze([
  { title: "Respekt k přírodě", text: "Pečujeme o prostředí, ve kterém žijeme.", photo: "/assets/brand-v2/editorial/path-prosperity.webp" },
  { title: "Spolupráce", text: "Věříme v sílu komunity a otevřený dialog.", photo: "/assets/brand-v2/editorial/hero-main.webp" },
  { title: "Odvaha tvořit", text: "Podporujeme nápady a nové přístupy.", photo: "/assets/brand-v2/editorial/path-creativity.webp" },
  { title: "Odpovědnost", text: "Myslíme na dlouhodobý dopad našich činů.", photo: "/assets/brand-v2/editorial/path-meaning.webp" },
]);

export default function AboutPage() {
  return <PublicShellV2 currentPath="/o-nas">
    <div className="ps2-about">
      <section className="ps2-about__hero" aria-labelledby="ps2-about-title">
        <Image className="ps2-about__hero-photo" src="/assets/brand-v2/editorial/path-relationships.webp" alt="AI ilustrační fotografie mladé ženy s výhledem do krajiny při západu slunce" fill priority sizes="100vw"/>
        <div className="ps2-about__hero-wash" aria-hidden="true"/>
        <div className="ps2-about__hero-copy">
          <p className="ps2-about__eyebrow">O NÁS</p>
          <h1 id="ps2-about-title">Věříme v generaci, která dokáže měnit svět k lepšímu.</h1>
          <p>PANSOFIE propojuje poznání, praxi a komunitu. Tvoříme prostředí, kde se děti, mladí lidé i dospělí mohou rozvíjet, spolupracovat a přinášet skutečný přínos.</p>
        </div>
        <p className="ps2-about__hero-aside">Poznání<br/>v praxi i v péči<br/>pro lepší svět</p>
      </section>

      <section className="ps2-about__mission ps2-about__width" aria-labelledby="ps2-about-mission-title">
        <div className="ps2-about__mission-intro">
          <h2 id="ps2-about-mission-title">Naše mise</h2>
          <p>Podporujeme člověka v jeho přirozeném rozvoji a pomáháme vytvářet zdravější, spravedlivější a udržitelnější společnost.</p>
        </div>
        <div className="ps2-about__mission-list">
          {MISSIONS.map(({label,detail,icon:Icon})=><article key={label}>
            <span className="ps2-about__mission-icon" aria-hidden="true"><Icon size={30} strokeWidth={1.5}/></span>
            <h3>{label}</h3><p>{detail}</p>
          </article>)}
        </div>
      </section>

      <section className="ps2-about__story ps2-about__width" aria-labelledby="ps2-about-story-title">
        <div className="ps2-about__story-photo">
          <Image src="/assets/brand-v2/editorial/hero-main.webp" fill sizes="(max-width: 820px) 100vw, 50vw" alt="AI ilustrační scéna mladých lidí sdílejících nápady a zkušenosti v přírodě"/>
        </div>
        <div className="ps2-about__story-content">
          <p className="ps2-about__eyebrow">NÁŠ PŘÍBĚH</p>
          <h2 id="ps2-about-story-title">Z vize k reálným projektům</h2>
          <p>PANSOFIE vzniká z touhy propojit vzdělávání, praxi a komunitu. Věříme, že každý člověk má potenciál přispět k lepšímu světu, pokud má příležitost, podporu a správné nástroje.</p>
          <ol className="ps2-about__timeline">
            {STORY_STEPS.map(step=><li key={step.label}><strong>{step.label}</strong><span>{step.body}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="ps2-about__values ps2-about__width" aria-labelledby="ps2-about-values-title">
        <div className="ps2-about__section-heading"><h2 id="ps2-about-values-title">Naše hodnoty</h2><p>Hodnoty, které nás vedou v každém kroku.</p></div>
        <div className="ps2-about__value-grid">
          {VALUES.map(value=><article key={value.title} className="ps2-about__value-card">
            <div className="ps2-about__value-photo"><Image src={value.photo} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 25vw" alt={"AI ilustrační fotografie: "+value.title}/></div>
            <div className="ps2-about__value-copy"><h3>{value.title}</h3><p>{value.text}</p></div>
          </article>)}
        </div>
      </section>

      <section className="ps2-about__wisdom ps2-about__width" aria-labelledby="ps2-about-wisdom-title">
        <Image src="/art/pansofie-v1/hero-tree.webp" fill sizes="100vw" alt="Ilustrační strom ozářený sluncem"/>
        <div className="ps2-about__wisdom-copy">
          <p className="ps2-about__eyebrow">ODKAZ KOMENSKÉHO</p>
          <h2 id="ps2-about-wisdom-title">Učení není oddělené od života. Je jeho součástí.</h2>
          <p>PANSOFIE navazuje na odkaz Jana Amose Komenského a propojuje duševní rozvoj, poznání, praxi a odpovědnost za svět kolem nás.</p>
        </div>
      </section>

      <section className="ps2-about__join" aria-labelledby="ps2-about-join-title">
        <Image src="/assets/brand-v2/editorial/hero-main.webp" fill sizes="100vw" alt="AI ilustrační fotografie mladých lidí na vyhlídce při západu slunce"/>
        <div className="ps2-about__join-shade" aria-hidden="true"/>
        <div className="ps2-about__join-content">
          <p className="ps2-about__eyebrow">BUĎTE SOUČÁSTÍ</p>
          <h2 id="ps2-about-join-title">Společně tvoříme lepší budoucnost</h2>
          <p>Přidejte se k nám jako jednotlivec, rodina, škola nebo organizace. Každý má v Pansofii své místo.</p>
          <div className="ps2-about__join-actions">
            <Link href="/kontakt">Zjistit, jak se zapojit <ArrowRight size={17}/></Link>
            <Link href="/pro-skoly">Pro organizace a školy <ArrowRight size={17}/></Link>
          </div>
        </div>
      </section>
    </div>
  </PublicShellV2>;
}
