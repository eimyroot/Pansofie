import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Brain, HeartHandshake, Leaf } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { useLanguage } from "@/lib/LanguageContext";

const PILLARS = {
  "poznej-sebe": {
    accent: "blue",
    icon: Brain,
    cs: {
      eyebrow: "Kapitola 01 · Poznej sebe",
      title: "Pro ty, kteří chtějí hlouběji poznat sebe",
      quote: "„Poznej sebe, abys pochopil své dary.“",
      target: "Lidé hledající směr, studenti, lidé na životním rozcestí nebo kdokoli, kdo bojuje s digitálním přehcením.",
      body: "Žijeme v době plné hluku, oznámení a cizích očekávání. Je snadné ztratit kontakt s tím, kým skutečně jsme. Tato kapitola je pro vás, pokud chcete zpomalit, utřídit si myšlenky a trénovat kritické myšlení. Pomůžeme vám lépe rozpoznat vlastní silné stránky, pracovat s pozorností a hledat směr v uspěchaném světě.",
      missions: [
        ["Ověř, co je pravda", "Vyber tvrzení z internetu a zjisti, jaké zdroje a důkazy ho skutečně podporují."],
        ["Nauč se něco, co tě nikdo neučil", "Vyber si dovednost, kterou chceš zvládnout, a použij ji při tvorbě něčeho skutečného."],
        ["Najdi svůj další krok", "Zachyť, co tě při skutečné práci přitahovalo, co ti šlo a co chceš dál ověřit v praxi."],
      ],
    },
    en: {
      eyebrow: "Chapter 01 · Know yourself",
      title: "For people who want to know themselves more deeply",
      quote: "“Know yourself so you can understand your gifts.”",
      target: "People looking for direction, students, people at a crossroads, or anyone struggling with digital overload.",
      body: "We live amid noise, notifications and other people's expectations. It is easy to lose contact with who we are. This chapter is for you if you want to slow down, organize your thoughts and train critical thinking. It helps you recognize your strengths more clearly, work with attention and find direction in a hurried world.",
      missions: [
        ["Verify what is true", "Choose a claim from the internet and investigate what evidence and sources actually support it."],
        ["Learn something nobody assigned", "Choose a skill you want to master and use it to create something real."],
        ["Find your next step", "Capture what drew you in during real work, what you handled well and what you want to test next."],
      ],
    },
  },
  "tvor-s-druhymi": {
    accent: "teal",
    icon: HeartHandshake,
    cs: {
      eyebrow: "Kapitola 02 · Tvoř s druhými",
      title: "Pro ty, kteří chtějí tvořit s druhými",
      quote: "„Nikdo se nenarodil jen sám pro sebe.“",
      target: "Týmy, tvůrci, vizionáři, pedagogové a lidé, kteří hledají inspirativní komunitu.",
      body: "Velké myšlenky nevznikají v izolaci, ale v dialogu. Tento pilíř spojuje lidi, kteří věří, že spolupráce má větší smysl než soutěžení. Ať už jste učitel hledající nové metody, student toužící po praktických projektech, nebo lídr v moderní firmě, zde najdete bezpečné prostředí pro sdílení nápadů, bourání názorových bublin a společnou tvorbu.",
      missions: [
        ["Zlepši svou školu", "Najděte konkrétní problém ve škole, zjistěte potřeby lidí a společně navrhněte řešení, které lze skutečně vyzkoušet."],
        ["Digitální most", "Pomozte člověku, který si neví rady s digitálním světem, a ověřte, zda mu vaše pomoc opravdu usnadnila život."],
        ["Vytvoř něco pro skutečného člověka", "Tým vytvoří web, návod, video, službu nebo prototyp pro někoho, kdo ho opravdu potřebuje."],
      ],
    },
    en: {
      eyebrow: "Chapter 02 · Create with others",
      title: "For people who want to create with others",
      quote: "“No one is born only for themselves.”",
      target: "Teams, creators, visionaries, educators and people looking for an inspiring community.",
      body: "Big ideas do not emerge in isolation but in dialogue. This pillar connects people who believe collaboration matters more than competition. Whether you are a teacher looking for new methods, a learner seeking practical projects, or a leader in a modern organization, the aim is a safe environment for sharing ideas, challenging bubbles and creating together.",
      missions: [
        ["Improve your school", "Find a concrete problem at school, understand people's needs and co-create a solution that can actually be tested."],
        ["Digital bridge", "Help someone who struggles with the digital world and verify whether your help genuinely made life easier."],
        ["Create for a real person", "Build a website, guide, video, service or prototype for someone who genuinely needs it."],
      ],
    },
  },
  "zlepsuj-svet": {
    accent: "orange",
    icon: Leaf,
    cs: {
      eyebrow: "Kapitola 03 · Zlepšuj svět",
      title: "Pro ty, kteří touží zlepšovat svět",
      quote: "„Náprava věcí lidských začíná u každého z nás.“",
      target: "Ekologové, inovátoři, odpovědní podnikatelé a všichni, kterým záleží na budoucnosti společnosti a planety.",
      body: "Vědomosti bez morální odpovědnosti mohou být nebezpečné. Pokud přemýšlíte nad tím, jak vyvážit digitální pokrok s lidskostí, jak chránit přírodu nebo jak aktivně pomáhat svému okolí, jste na správném místě. Zde přetavujeme teorii do konkrétních činů — od ekologického myšlení po etické využívání technologií a umělé inteligence.",
      missions: [
        ["Circular Challenge", "Najděte materiál, odpad nebo proces, který lze využít lépe, a navrhněte měřitelnou změnu."],
        ["Zlepši svoje místo", "Najděte problém ve svém okolí a vytvořte malou změnu, kterou lze skutečně uskutečnit."],
        ["Ověř dopad", "Vraťte se k dokončené práci a zjistěte, co se po ní opravdu změnilo a pro koho."],
      ],
    },
    en: {
      eyebrow: "Chapter 03 · Improve the world",
      title: "For people who want to improve the world",
      quote: "“The improvement of human affairs begins with each of us.”",
      target: "Environmentalists, innovators, responsible entrepreneurs and everyone who cares about the future of society and the planet.",
      body: "Knowledge without moral responsibility can be dangerous. If you think about balancing digital progress with humanity, protecting nature or actively helping your surroundings, this chapter is for you. Here theory is turned into concrete action — from ecological thinking to ethical use of technology and artificial intelligence.",
      missions: [
        ["Circular Challenge", "Find a material, waste stream or process that could be used better and design a measurable improvement."],
        ["Improve your place", "Find a problem in your surroundings and create a small change that can actually be carried out."],
        ["Verify impact", "Return to completed work and find out what actually changed afterwards and for whom."],
      ],
    },
  },
};

export default function PillarDetail() {
  const { pillar } = useParams();
  const { locale } = useLanguage();
  const config = PILLARS[pillar];
  if (!config) return <Navigate to="/pro-koho" replace />;

  const copy = config[locale] || config.cs;
  const Icon = config.icon;

  return (
    <div className={`min-h-screen r13-pillar-detail r13-pillar-detail--${config.accent}`}>
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section>
          <div className="container-px max-w-7xl mx-auto py-14 sm:py-20">
            <Link to="/pro-koho" className="inline-flex items-center gap-2 text-sm font-bold text-primary"><ArrowLeft size={16} /> {locale === "en" ? "Back to Who it is for" : "Zpět na Pro koho"}</Link>
            <div className="r13-detail-shell mt-8">
              <div>
                <span className="r13-kicker"><Icon size={15} /> {copy.eyebrow}</span>
                <h1 className="mt-5">{copy.title}</h1>
                <p className="r13-hero-lead">{copy.target}</p>
                <p className="r13-hero-body">{copy.body}</p>
                <div className="r13-hero-actions">
                  <Link to="/zapojit-se" className="action-primary">{locale === "en" ? "I want to take part" : "Chci se zapojit"} <ArrowRight size={18} /></Link>
                  <Link to="/pro-koho" className="action-secondary">{locale === "en" ? "Explore all chapters" : "Všechny kapitoly"}</Link>
                </div>
              </div>
              <aside className="r13-detail-quote">
                <blockquote>{copy.quote}</blockquote>
                <p>{locale === "en" ? "A chapter is not a personality label. It is a direction for real Experiences, reflection and meaningful action." : "Kapitola není nálepka osobnosti. Je to směr pro skutečné zkušenosti, reflexi a smysluplné jednání."}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-white border-y border-border/70">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="r13-section-heading">
              <span className="r13-kicker">{locale === "en" ? "Mission examples" : "Příklady misí"}</span>
              <h2>{locale === "en" ? "Turn the chapter into something you can actually do." : "Převeďte kapitolu do něčeho, co lze skutečně udělat."}</h2>
            </div>
            <div className="r13-audience-grid mt-8">
              {copy.missions.map(([title, text]) => (
                <article key={title} className="r13-audience-card">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
