import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  Leaf,
  School,
  Sparkles,
  UsersRound,
} from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import RoleEntry from "@/components/pansofie/RoleEntry";
import { useLanguage } from "@/lib/LanguageContext";

const COPY = {
  cs: {
    principles: [
      { number: "01", title: "Všem", text: "Internet a vzdělání musí být zdarma, bez bariér a dostupné i v nejchudších koutech světa." },
      { number: "02", title: "Všemu", text: "Technologie nesmí sloužit jen byznysu, ale musí pomáhat léčit nemoci, chránit přírodu a rozvíjet kulturu." },
      { number: "03", title: "Všestranně", text: "Digitální gramotnost bez morální gramotnosti je nebezpečná zbraň. Učit se musíme rozumu, jazyku i srdci zároveň." },
    ],
    heroEyebrow: "Pro koho je Pansofie",
    heroTitle: "Pro koho je Pansofie?",
    heroLead: "Pansofie je prostorem pro každého, kdo nechce životem jen bezcílně proplouvat, ale touží růst, tvořit smysluplné věci a zanechat za sebou lepší svět.",
    heroBody: "Nejsme škola plná suché teorie, ale živá komunita a dílna lidskosti pro digitální věk. Nezáleží na tom, kolik vám je let nebo co děláte. Pokud máte otevřenou mysl a chuť se rozvíjet, jste tu správně.",
    explore: "Objevte naše kapitoly",
    join: "Chci se zapojit",
    pillarsEyebrow: "Tři pilíře Pansofie",
    pillarsTitle: "Tři směry, které dávají rozvoji člověka smysl.",
    pillarsLead: "Nejde o tři oddělené světy. Poznání sebe, spolupráce a odpovědnost vůči světu se v dobré zkušenosti přirozeně potkávají.",
    pillars: [
      {
        slug: "poznej-sebe",
        index: "01",
        label: "POZNAT SEBE",
        title: "Pro ty, kteří chtějí hlouběji poznat sebe",
        quote: "„Poznej sebe, abys pochopil své dary.“",
        target: "Lidé hledající směr, studenti, lidé na životním rozcestí nebo kdokoli, kdo bojuje s digitálním přehcením.",
        body: "Žijeme v době plné hluku, oznámení a cizích očekávání. Je snadné ztratit kontakt s tím, kým skutečně jsme. Tato kapitola je pro vás, pokud chcete zpomalit, utřídit si myšlenky a trénovat kritické myšlení. Pomůžeme vám lépe rozpoznat vlastní silné stránky, pracovat s pozorností a hledat směr v uspěchaném světě.",
        icon: Brain,
      },
      {
        slug: "tvor-s-druhymi",
        index: "02",
        label: "TVOŘIT S DRUHÝMI",
        title: "Pro ty, kteří chtějí tvořit s druhými",
        quote: "„Nikdo se nenarodil jen sám pro sebe.“",
        target: "Týmy, tvůrci, vizionáři, pedagogové a lidé, kteří hledají inspirativní komunitu.",
        body: "Velké myšlenky nevznikají v izolaci, ale v dialogu. Tento pilíř spojuje lidi, kteří věří, že spolupráce má větší smysl než soutěžení. Ať už jste učitel hledající nové metody, student toužící po praktických projektech, nebo lídr v moderní firmě, zde najdete bezpečné prostředí pro sdílení nápadů, bourání názorových bublin a společnou tvorbu.",
        icon: HeartHandshake,
      },
      {
        slug: "zlepsuj-svet",
        index: "03",
        label: "ZLEPŠOVAT SVĚT",
        title: "Pro ty, kteří touží zlepšovat svět",
        quote: "„Náprava věcí lidských začíná u každého z nás.“",
        target: "Ekologové, inovátoři, odpovědní podnikatelé a všichni, kterým záleží na budoucnosti společnosti a planety.",
        body: "Vědomosti bez morální odpovědnosti mohou být nebezpečné. Pokud přemýšlíte nad tím, jak vyvážit digitální pokrok s lidskostí, jak chránit přírodu nebo jak aktivně pomáhat svému okolí, jste na správném místě. Zde přetavujeme teorii do konkrétních činů — od ekologického myšlení po etické využívání technologií a umělé inteligence.",
        icon: Leaf,
      },
    ],
    audiencesEyebrow: "Naše cílové skupiny",
    audiencesTitle: "Najdu se tam?",
    audiences: [
      {
        title: "Pro studenty a mladé lidi",
        text: "Pro ty, kteří se nechtějí jen učit nazpaměť, ale chtějí porozumět světu v souvislostech, ověřovat fakta a hledat své budoucí uplatnění.",
        icon: GraduationCap,
      },
      {
        slug: "skoly",
        title: "Pro pedagogy a školy",
        text: "Pro ty, kteří hledají moderní inspiraci, jak učit zážitkovou formou, zdravě zapojit technologie a probouzet v mladých lidech zvídavost.",
        icon: School,
      },
      {
        slug: "firmy",
        title: "Pro firmy a lídry",
        text: "Pro ty, kteří chtějí budovat etické a smysluplné podnikání, otevřenou kulturu a rozvíjet kritické myšlení svých týmů.",
        icon: BriefcaseBusiness,
      },
      {
        slug: "ekologie",
        title: "Pro ochránce přírody a vizionáře",
        text: "Pro ty, kteří hledají cesty, jak pomocí dat, technologií a spolupráce chránit planetu a zlepšovat prostředí, ve kterém žijeme.",
        icon: Leaf,
      },
    ],
    detail: "Zjistit víc",
    rolesEyebrow: "Konkrétní role",
    rolesTitle: "Každý může přinést něco jiného.",
    rolesLead: "Níže si můžete projít konkrétní roli v jedné skutečné zkušenosti — mladý člověk, rodina, škola, mentor, partner nebo komunita.",
    ctaTitle: "Nechcete jen číst? Začněte konkrétní zkušeností.",
    ctaBody: "Vyberte si roli, problém nebo oblast, která vám dává smysl. Pansofie má vést od myšlenky k činu, důkazu, reflexi a dalšímu kroku.",
  },
  en: {
    principles: [
      { number: "01", title: "For everyone", text: "Internet access and education should be free of unnecessary barriers and available even in the poorest parts of the world." },
      { number: "02", title: "For the whole of life", text: "Technology must not serve business alone. It should also help heal disease, protect nature and develop culture." },
      { number: "03", title: "In a whole-person way", text: "Digital literacy without moral literacy can become dangerous. We need to educate reason, language and the heart together." },
    ],
    heroEyebrow: "Who Pansofie is for",
    heroTitle: "Who is Pansofie for?",
    heroLead: "Pansofie is a space for anyone who does not want to drift through life without direction, but wants to grow, create meaningful things and leave the world better than they found it.",
    heroBody: "We are not a school of dry theory. We are building a living community and a workshop of humanity for the digital age. Your age or profession is not the point. If you have an open mind and the desire to develop, you belong here.",
    explore: "Explore the three chapters",
    join: "I want to take part",
    pillarsEyebrow: "Three pillars of Pansofie",
    pillarsTitle: "Three directions that give human development meaning.",
    pillarsLead: "They are not three separate worlds. Self-knowledge, cooperation and responsibility for the world naturally meet in a meaningful experience.",
    pillars: [
      {
        slug: "poznej-sebe",
        index: "01",
        label: "KNOW YOURSELF",
        title: "For people who want to know themselves more deeply",
        quote: "“Know yourself so you can understand your gifts.”",
        target: "People looking for direction, students, people at a crossroads, or anyone struggling with digital overload.",
        body: "We live amid noise, notifications and other people's expectations. It is easy to lose contact with who we are. This chapter is for you if you want to slow down, organize your thoughts and train critical thinking. It helps you recognize your strengths more clearly, work with attention and find direction in a hurried world.",
        icon: Brain,
      },
      {
        slug: "tvor-s-druhymi",
        index: "02",
        label: "CREATE WITH OTHERS",
        title: "For people who want to create with others",
        quote: "“No one is born only for themselves.”",
        target: "Teams, creators, visionaries, educators and people looking for an inspiring community.",
        body: "Big ideas do not emerge in isolation but in dialogue. This pillar connects people who believe collaboration matters more than competition. Whether you are a teacher looking for new methods, a learner seeking practical projects, or a leader in a modern organization, the aim is a safe environment for sharing ideas, challenging bubbles and creating together.",
        icon: HeartHandshake,
      },
      {
        slug: "zlepsuj-svet",
        index: "03",
        label: "IMPROVE THE WORLD",
        title: "For people who want to improve the world",
        quote: "“The improvement of human affairs begins with each of us.”",
        target: "Environmentalists, innovators, responsible entrepreneurs and everyone who cares about the future of society and the planet.",
        body: "Knowledge without moral responsibility can be dangerous. If you think about balancing digital progress with humanity, protecting nature or actively helping your surroundings, this chapter is for you. Here theory is turned into concrete action — from ecological thinking to ethical use of technology and artificial intelligence.",
        icon: Leaf,
      },
    ],
    audiencesEyebrow: "Who can find a place here",
    audiencesTitle: "Can I see myself here?",
    audiences: [
      {
        title: "Students and young people",
        text: "For those who want more than memorization: understanding the world in context, checking facts and finding meaningful future directions.",
        icon: GraduationCap,
      },
      {
        slug: "skoly",
        title: "Educators and schools",
        text: "For those looking for experiential learning, healthy uses of technology and better ways to awaken curiosity in young people.",
        icon: School,
      },
      {
        slug: "firmy",
        title: "Companies and leaders",
        text: "For those building ethical, meaningful organizations, open cultures and stronger critical thinking in their teams.",
        icon: BriefcaseBusiness,
      },
      {
        slug: "ekologie",
        title: "Environmental stewards and visionaries",
        text: "For those exploring how data, technology and cooperation can protect the planet and improve the environments we share.",
        icon: Leaf,
      },
    ],
    detail: "Learn more",
    rolesEyebrow: "Concrete roles",
    rolesTitle: "Everyone can contribute something different.",
    rolesLead: "Below you can explore a concrete role in one real Experience — young person, family, school, mentor, partner or community.",
    ctaTitle: "Do not just read. Start with a concrete Experience.",
    ctaBody: "Choose a role, problem or field that matters to you. Pansofie should move from an idea to action, evidence, reflection and a meaningful next step.",
  },
};

function AudienceCard({ audience, detail }) {
  const Icon = audience.icon;
  const card = (
    <article className="r13-audience-card">
      <span><Icon size={23} /></span>
      <h3>{audience.title}</h3>
      <p>{audience.text}</p>
      {audience.slug && <span className="r14-audience-more">{detail} <ArrowRight size={15} /></span>}
    </article>
  );

  if (!audience.slug) return card;
  return <Link to={`/pro-koho/${audience.slug}`} className="r14-audience-link">{card}</Link>;
}

export default function Roles() {
  const { locale } = useLanguage();
  const copy = COPY[locale] || COPY.cs;

  return (
    <div className="min-h-screen bg-background r13-roles-page">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="r13-roles-hero">
          <div className="container-px max-w-7xl mx-auto py-8 sm:py-12">
            <div className="r13-principles" aria-label={locale === "en" ? "Pansofie principles" : "Principy Pansofie"}>
              {copy.principles.map((principle) => (
                <article key={principle.number} className="r13-principle">
                  <span>{principle.number}</span>
                  <div><strong>{principle.title}</strong><p>{principle.text}</p></div>
                </article>
              ))}
            </div>

            <div className="r13-hero-grid">
              <div className="r13-hero-copy">
                <span className="r13-kicker"><UsersRound size={15} /> {copy.heroEyebrow}</span>
                <h1>{copy.heroTitle}</h1>
                <p className="r13-hero-lead">{copy.heroLead}</p>
                <p className="r13-hero-body">{copy.heroBody}</p>
                <div className="r13-hero-actions">
                  <a href="#pilire" className="action-primary">{copy.explore} <ArrowRight size={18} /></a>
                  <Link to="/zapojit-se" className="action-secondary">{copy.join}</Link>
                </div>
              </div>
              <aside className="r13-hero-mark" aria-hidden="true">
                <div className="r13-mark-orbit r13-mark-orbit-a" />
                <div className="r13-mark-orbit r13-mark-orbit-b" />
                <div className="r13-mark-core"><Sparkles size={30} /><span>OMNES</span><span>OMNIA</span><span>OMNINO</span></div>
              </aside>
            </div>
          </div>
        </section>

        <section id="pilire" className="r13-pillars-section scroll-mt-32">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="r13-section-heading">
              <span className="r13-kicker"><BookOpenCheck size={15} /> {copy.pillarsEyebrow}</span>
              <h2>{copy.pillarsTitle}</h2>
              <p>{copy.pillarsLead}</p>
            </div>
            <div className="r13-pillar-grid">
              {copy.pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Link key={pillar.slug} to={`/pro-koho/${pillar.slug}`} className={`r13-pillar-card r13-pillar-card--${pillar.index}`}>
                    <div className="r13-pillar-topline"><span className="r13-pillar-index">{pillar.index}</span><span className="r13-pillar-icon"><Icon size={22} /></span></div>
                    <p className="r13-pillar-label">{pillar.label}</p>
                    <h3>{pillar.title}</h3>
                    <blockquote>{pillar.quote}</blockquote>
                    <p className="r13-pillar-target"><strong>{locale === "en" ? "For:" : "Pro koho:"}</strong> {pillar.target}</p>
                    <p className="r13-pillar-body">{pillar.body}</p>
                    <span className="r13-card-link">{locale === "en" ? "Open chapter" : "Otevřít kapitolu"} <ArrowRight size={16} /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="cilove-skupiny" className="r13-audience-section scroll-mt-32">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="r13-section-heading r13-section-heading--compact">
              <span className="r13-kicker"><UsersRound size={15} /> {copy.audiencesEyebrow}</span>
              <h2>{copy.audiencesTitle}</h2>
            </div>
            <div className="r13-audience-grid">
              {copy.audiences.map((audience) => <AudienceCard key={audience.title} audience={audience} detail={copy.detail} />)}
            </div>
          </div>
        </section>

        <section className="r13-role-entry-intro">
          <div className="container-px max-w-7xl mx-auto pt-16 sm:pt-24 pb-2">
            <div className="r13-section-heading">
              <span className="r13-kicker"><UsersRound size={15} /> {copy.rolesEyebrow}</span>
              <h2>{copy.rolesTitle}</h2>
              <p>{copy.rolesLead}</p>
            </div>
          </div>
        </section>

        <RoleEntry />

        <section className="r13-final-cta">
          <div className="container-px max-w-5xl mx-auto py-20 sm:py-24 text-center">
            <span className="r13-cta-icon"><BookOpenCheck size={24} /></span>
            <h2>{copy.ctaTitle}</h2>
            <p>{copy.ctaBody}</p>
            <div className="r13-hero-actions r13-hero-actions--center">
              <Link to="/zapojit-se" className="action-primary">{copy.join} <ArrowRight size={18} /></Link>
              <a href="#pilire" className="action-secondary">{copy.explore}</a>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
