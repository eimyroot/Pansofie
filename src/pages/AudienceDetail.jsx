import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  Leaf,
  School,
  Sparkles,
} from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { useLanguage } from "@/lib/LanguageContext";

const AUDIENCES = {
  skoly: {
    icon: School,
    tone: "blue",
    cs: {
      eyebrow: "Pro školy a pedagogy",
      title: "Školy jako dílny lidskosti, ne továrny na fakta",
      lead: "Dnešní školství čelí velkému tlaku. Informací je nadbytek, ale času na souvislosti, pozornost, kritické myšlení a rozvoj osobnosti je málo.",
      body: "Pansofie chce školám nabídnout rámec, ve kterém se znalosti propojují se skutečnou zkušeností, spoluprací, důkazem a reflexí. Komenského ideál celistvého vzdělávání je zde inspirací — ne tvrzením, že dnešní digitální produkt je jeho historickou rekonstrukcí.",
      helpTitle: "S čím může Pansofie škole pomoci",
      benefits: [
        ["Didaktika pro digitální věk", "Pracovat s výukou více v souvislostech a posouvat těžiště od mechanického zapamatování ke kritickému myšlení, otázkám a ověřování."],
        ["Zážitkové učení", "Navrhovat mise a scénáře, ve kterých se teorie potkává s reálným problémem, konkrétní akcí, důkazem a společnou reflexí."],
        ["Zdravé technologie", "Hledat způsoby, jak používat digitální nástroje a AI jako pomocníky, aniž by technologie nahrazovala pozornost, vztah učitele se žákem nebo lidské rozhodování."],
        ["Bezpečná komunita", "Podporovat spolupráci, respektující dialog a jasné role mezi mladými lidmi, školou, rodinou, mentory a partnery."],
      ],
      missionsTitle: "Příklady zkušeností pro školní prostředí",
      missionsNote: "První školní pilot Pansofie je vymezen třemi zkušenostmi; další témata se mají přidávat až po ověření v praxi.",
      missions: [
        ["Zlepši svou školu", "Mladí lidé pojmenují konkrétní problém ve škole, navrhnou realistickou změnu a doloží, co se podařilo."],
        ["Digitální most", "Zkušenost propojující digitální dovednosti s pomocí druhému člověku a ověřitelným výsledkem."],
        ["Circular Challenge", "Praktická výzva zaměřená na materiály, odpad, opětovné využití a dopad konkrétního rozhodnutí."],
      ],
      cta: "Chci Pansofii do školy",
      ctaBody: "Začněte jednou konkrétní potřebou školy. Ne plošnou transformací, ale malou zkušeností, kterou lze bezpečně vyzkoušet a vyhodnotit.",
    },
    en: {
      eyebrow: "For schools and educators",
      title: "Schools as workshops of humanity, not factories of facts",
      lead: "Education is under enormous pressure. Information is abundant, while time for context, attention, critical thinking and personal development is scarce.",
      body: "Pansofie aims to give schools a framework in which knowledge connects with real experience, cooperation, evidence and reflection. Comenius' ideal of whole-person education is an inspiration here — not a claim that today's digital product reconstructs his historical work.",
      helpTitle: "How Pansofie can support a school",
      benefits: [
        ["Didactics for the digital age", "Teach more through context and move the centre of gravity from mechanical memorisation toward critical thinking, questions and verification."],
        ["Experiential learning", "Design missions and scenarios in which theory meets a real problem, concrete action, evidence and shared reflection."],
        ["Healthy technology", "Explore how digital tools and AI can assist learning without replacing attention, teacher–learner relationships or human judgement."],
        ["A safer community", "Support cooperation, respectful dialogue and clear roles between young people, schools, families, mentors and partners."],
      ],
      missionsTitle: "Experience examples for schools",
      missionsNote: "The first school pilot is intentionally bounded to three Experiences; additional themes should only be added after real-world verification.",
      missions: [
        ["Improve your school", "Young people identify a concrete school problem, propose a realistic change and document what actually happened."],
        ["Digital bridge", "An Experience connecting digital skills with helping another person and producing a verifiable outcome."],
        ["Circular Challenge", "A practical challenge focused on materials, waste, reuse and the consequences of a concrete decision."],
      ],
      cta: "Bring Pansofie to my school",
      ctaBody: "Start with one concrete need. Not a total transformation, but a small Experience that can be tried safely and evaluated.",
    },
  },
  firmy: {
    icon: Building2,
    tone: "violet",
    cs: {
      eyebrow: "Pro firmy a moderní lídry",
      title: "Podnikání s vyšším smyslem a morální kotvou",
      lead: "Firmy čelí rychlým technologickým změnám, informačnímu přetížení, tlaku na inovace i riziku vyhoření. Samotné know-how proto nestačí.",
      body: "Pansofie může firemnímu prostředí nabídnout rámec pro práci se skutečnými výzvami, kritickým myšlením, odpovědností a učením z důkazů. Nejde o hotový HR program ani univerzální metodiku řízení; jde o způsob, jak převést konkrétní problém do bezpečně ohraničené zkušenosti a společné reflexe.",
      helpTitle: "S čím může Pansofie týmu pomoci",
      benefits: [
        ["Kritické myšlení", "Rozlišovat data, domněnky a interpretace, odhalovat kognitivní zkreslení a dělat rozhodnutí s dohledatelnými důvody."],
        ["Etika inovací a AI", "Otevírat při návrhu technologií otázky dopadu, odpovědnosti, lidské kontroly a toho, komu řešení skutečně slouží."],
        ["Učení přes skutečnou výzvu", "Proměnit konkrétní problém firmy nebo komunity v zadání, na kterém lze spolupracovat, vytvářet výstupy a získávat zpětnou vazbu."],
        ["Otevřenější kultura", "Používat společnou reflexi a evidenci práce jako protiváhu k silům, nejasným rozhodnutím a prázdným hodnotovým sloganům."],
      ],
      missionsTitle: "Příklady zadání pro firmy a týmy",
      missionsNote: "Jde o kandidáty na budoucí mise a partner challenges, ne o tvrzení, že všechny jsou dnes součástí pilotu.",
      missions: [
        ["Etický AI review", "Tým rozebere konkrétní použití AI: kdo získává hodnotu, kdo nese riziko a kde musí zůstat lidské rozhodnutí."],
        ["Rozhodnutí pod tlakem", "Skupina pracuje s neúplnými daty, pojmenuje předpoklady a zpětně ověří, co rozhodnutí skutečně způsobilo."],
        ["Challenge od partnera", "Firma přinese reálný, bezpečně ohraničený problém a účastníci vytvářejí použitelný výstup s jasnými hranicemi a zpětnou vazbou."],
      ],
      cta: "Chci přinést skutečnou výzvu",
      ctaBody: "Nejlepší začátek není školení pro celou firmu, ale jeden dobře ohraničený problém, na kterém se dá ověřit způsob spolupráce.",
    },
    en: {
      eyebrow: "For companies and modern leaders",
      title: "Business with a higher purpose and a moral anchor",
      lead: "Organizations face rapid technological change, information overload, pressure to innovate and the risk of burnout. Know-how alone is not enough.",
      body: "Pansofie can offer a framework for working with real challenges, critical thinking, responsibility and learning from evidence. It is not a finished HR programme or a universal management method; it is a way to turn a concrete problem into a bounded Experience and shared reflection.",
      helpTitle: "How Pansofie can support a team",
      benefits: [
        ["Critical thinking", "Separate data, assumptions and interpretations, expose cognitive bias and make decisions with traceable reasons."],
        ["Ethics of innovation and AI", "Bring impact, responsibility, human oversight and the question of who a technology really serves into product decisions."],
        ["Learning through a real challenge", "Turn a concrete company or community problem into a task people can collaborate on, produce outputs for and receive feedback on."],
        ["A more open culture", "Use shared reflection and evidence of work as a counterweight to silos, opaque decisions and empty value statements."],
      ],
      missionsTitle: "Example challenges for companies and teams",
      missionsNote: "These are candidates for future missions and partner challenges, not claims that all of them are already part of the current pilot.",
      missions: [
        ["Ethical AI review", "A team examines a concrete AI use case: who receives value, who carries risk and where human judgement must remain."],
        ["Decision under pressure", "A group works with incomplete data, names assumptions and later checks what the decision actually caused."],
        ["Partner challenge", "An organization contributes a real, safely bounded problem and participants create a usable output with clear boundaries and feedback."],
      ],
      cta: "Bring a real challenge",
      ctaBody: "The best start is not company-wide training but one well-bounded problem on which the collaboration model can be tested.",
    },
  },
  ekologie: {
    icon: Leaf,
    tone: "green",
    cs: {
      eyebrow: "Pro ekologii a udržitelnost",
      title: "Uzdravení světa skrze porozumění přírodě",
      lead: "Ekologické problémy nejsou izolované. Materiály, energie, spotřeba, krajina, technologie i chování lidí tvoří jeden propojený systém.",
      body: "Pansofie proto nechce ekologii redukovat na seznam zákazů. Smyslem je spojovat data, osobní zkušenost, odpovědnost a konkrétní čin — a následně ověřovat, co se ve skutečnosti změnilo.",
      helpTitle: "S čím může Pansofie pomoci",
      benefits: [
        ["Systémové ekologické myšlení", "Sledovat vztahy mezi lokálním rozhodnutím, materiály, spotřebou, dopravou, energií a širším dopadem."],
        ["Data a vztah k místu", "Propojovat měření a ověřitelné informace s přímou zkušeností s prostředím, o které se člověk skutečně stará."],
        ["Cirkulární principy v praxi", "Zkoušet opětovné využití, opravu, sdílení a návrhy s menší materiálovou stopou na konkrétních věcech, ne jen v teorii."],
        ["Komunitní projekty", "Převádět místní ekologický problém do malé mise s lidmi, rolemi, důkazem, reflexí a jasným dalším krokem."],
      ],
      missionsTitle: "Příklady ekologických zadání",
      missionsNote: "Circular Challenge patří mezi první vymezené školní zkušenosti; ostatní příklady jsou kandidáti pro další ověřování.",
      missions: [
        ["Circular Challenge", "Zmapujte životní cyklus konkrétního materiálu nebo výrobku a navrhněte praktickou změnu, kterou lze skutečně otestovat."],
        ["Mapa lokálního dopadu", "Vyberte jedno rozhodnutí ve škole, firmě nebo domácnosti a sledujte jeho materiálové, energetické a sociální důsledky."],
        ["Zlepši místo, kde žiješ", "Najděte konkrétní problém v okolí, zapojte místní lidi a doložte, zda zásah vedl k viditelné změně."],
      ],
      cta: "Chci rozjet zelený projekt",
      ctaBody: "Začněte malým místním problémem, u kterého lze pozorovat změnu. Pansofie má spojit pochopení systému s konkrétním jednáním.",
    },
    en: {
      eyebrow: "For ecology and sustainability",
      title: "Healing the world through understanding nature",
      lead: "Environmental problems are not isolated. Materials, energy, consumption, landscapes, technology and human behaviour form one connected system.",
      body: "Pansofie therefore should not reduce ecology to a list of prohibitions. The aim is to connect data, direct experience, responsibility and concrete action — then verify what actually changed.",
      helpTitle: "How Pansofie can help",
      benefits: [
        ["Systems ecological thinking", "Trace relationships between local decisions, materials, consumption, transport, energy and wider consequences."],
        ["Data and relationship to place", "Connect measurement and verifiable information with direct experience of an environment people genuinely care for."],
        ["Circular principles in practice", "Test reuse, repair, sharing and lower-material-footprint design on concrete things rather than only discussing them in theory."],
        ["Community projects", "Turn a local environmental problem into a small mission with people, roles, evidence, reflection and a clear next step."],
      ],
      missionsTitle: "Example ecological challenges",
      missionsNote: "Circular Challenge is one of the first bounded school Experiences; the other examples are candidates for later verification.",
      missions: [
        ["Circular Challenge", "Map the life cycle of a concrete material or product and propose a practical change that can actually be tested."],
        ["Local impact map", "Choose one decision in a school, company or household and trace its material, energy and social consequences."],
        ["Improve the place where you live", "Find a concrete local problem, involve people around it and document whether the intervention produced a visible change."],
      ],
      cta: "Start a green project",
      ctaBody: "Begin with a small local problem where change can be observed. Pansofie should connect understanding a system with concrete action.",
    },
  },
};

export default function AudienceDetail() {
  const { audience } = useParams();
  const { locale } = useLanguage();
  const definition = AUDIENCES[audience];

  if (!definition) {
    return (
      <div className="min-h-screen r14-audience-detail">
        <PublicNav />
        <main className="pt-36 container-px max-w-5xl mx-auto pb-24">
          <h1>{locale === "en" ? "This audience page does not exist." : "Tato stránka cílové skupiny neexistuje."}</h1>
          <Link to="/pro-koho" className="action-primary mt-8 inline-flex">{locale === "en" ? "Back to Who it is for" : "Zpět na Pro koho"}</Link>
        </main>
        <PublicFooter />
      </div>
    );
  }

  const copy = definition[locale] || definition.cs;
  const Icon = definition.icon;

  return (
    <div className={`min-h-screen r14-audience-detail r14-audience-detail--${definition.tone}`}>
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="r14-audience-hero">
          <div className="container-px max-w-7xl mx-auto py-14 sm:py-20">
            <Link to="/pro-koho#cilove-skupiny" className="r14-back"><ArrowLeft size={16} /> {locale === "en" ? "All audiences" : "Všechny cílové skupiny"}</Link>
            <div className="r14-audience-hero-grid">
              <div>
                <span className="r14-audience-kicker"><Icon size={18} /> {copy.eyebrow}</span>
                <h1>{copy.title}</h1>
                <p className="r14-audience-lead">{copy.lead}</p>
                <p className="r14-audience-body">{copy.body}</p>
              </div>
              <aside className="r14-audience-symbol" aria-hidden="true">
                <span><Icon size={54} /></span>
                <strong>{locale === "en" ? "REAL NEED" : "SKUTEČNÁ POTŘEBA"}</strong>
                <i />
                <strong>{locale === "en" ? "EXPERIENCE" : "ZKUŠENOST"}</strong>
                <i />
                <strong>{locale === "en" ? "EVIDENCE + REFLECTION" : "DŮKAZ + REFLEXE"}</strong>
              </aside>
            </div>
          </div>
        </section>

        <section className="r14-help-section">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="r14-section-title">
              <span><BookOpenCheck size={18} /></span>
              <h2>{copy.helpTitle}</h2>
            </div>
            <div className="r14-benefit-grid">
              {copy.benefits.map(([title, text], index) => (
                <article key={title} className="r14-benefit-card">
                  <span className="r14-number">{String(index + 1).padStart(2, "0")}</span>
                  <CheckCircle2 size={21} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="r14-missions-section">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="r14-section-title">
              <span><Sparkles size={18} /></span>
              <div>
                <h2>{copy.missionsTitle}</h2>
                <p>{copy.missionsNote}</p>
              </div>
            </div>
            <div className="r14-mission-grid">
              {copy.missions.map(([title, text], index) => (
                <article key={title} className="r14-mission-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="r14-audience-cta">
          <div className="container-px max-w-5xl mx-auto py-20 sm:py-24 text-center">
            <Icon size={34} />
            <h2>{copy.cta}</h2>
            <p>{copy.ctaBody}</p>
            <div className="r14-cta-actions">
              <Link to="/zapojit-se" className="action-primary">{copy.cta} <ArrowRight size={18} /></Link>
              <Link to="/pro-koho" className="action-secondary">{locale === "en" ? "Explore other audiences" : "Prohlédnout další skupiny"}</Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
