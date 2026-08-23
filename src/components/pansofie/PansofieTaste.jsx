import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  GraduationCap,
  Leaf,
  PenLine,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "@/lib/LanguageContext";

const FAN_AXES = {
  cs: ["Digitální pozornost", "Kritický rozum", "Respektující dialog", "Spolupráce", "Cirkulární jednání", "Lokální dopad"],
  en: ["Digital attention", "Critical reason", "Respectful dialogue", "Cooperation", "Circular action", "Local impact"],
};

const SCENARIOS = {
  school: {
    icon: GraduationCap,
    fanAxis: "Kritický rozum",
    fanAxisEn: "Critical reason",
    cs: {
      tab: "Chci zažít situaci ve třídě",
      label: "ŠKOLA",
      mission: "Labyrint algoritmů 📲",
      situation: "Žáci v hodině objevili šokující fotografii zvířete ve znečištěné řece s naštvaným textem. Třída propadá hněvu a chce příspěvek masivně sdílet dál. Co uděláte?",
      choices: [
        {
          title: "Možnost A: Zakážu mobily",
          detail: "Telefony nechám schovat do tašek, téma uzavřu a pokračuji v běžném výkladu.",
          success: false,
          feedbackTitle: "Tato volba problém jen odsunula.",
          feedback: "Krátkodobě odstraníte vyrušení, ale děti si nevyzkouší, jak podobný obsah ověřit. Příště mohou stejnou zprávu sdílet mimo školu bez bezpečného vedení.",
        },
        {
          title: "Možnost B: Otevřu laboratoř",
          detail: "Společně ověříme původ obrázku a prozkoumáme, jak emoce ovlivňují úsudek.",
          success: true,
          feedbackTitle: "Výstup vytvořil použitelný postup.",
          feedback: "Třída zjistila, že fotografie je osm let stará, pochází z jiného místa a byla znovu použita jako rage-bait. Emoce se změnily v otázky a ověřování.",
        },
      ],
      evidence: "Fotka z hodiny: žáci u tabule s odhaleným schématem manipulace.jpg",
      evidenceNote: "V ostré aplikaci by šlo o skutečný soubor nebo jiný doložitelný artefakt. Tady pouze simulujeme, jak evidence vstupuje do Experience.",
      reflectionPrompt: "Napište jednou větou, co si děti z této situace odnesly do skutečného života.",
      reflectionPlaceholder: "Např. Děti pochopily, že silné emoce na internetu mohou být past na jejich pozornost.",
      traceTitle: "První doložená stopa v oblasti Kritický rozum",
      traceLast: "Ověření původu a kontextu virálního obrázku ve třídě.",
      traceNext: "V reálné misi by dalším krokem mohlo být ověřit stejný postup při práci s deepfake videem.",
    },
    en: {
      tab: "Experience a classroom situation",
      label: "SCHOOL",
      mission: "Algorithm Labyrinth 📲",
      situation: "Students discover a shocking photo of an animal in a polluted river with an angry caption. The class becomes upset and wants to share it widely. What do you do?",
      choices: [
        {
          title: "Option A: Ban the phones",
          detail: "Phones go into bags, the topic is closed and the normal lesson continues.",
          success: false,
          feedbackTitle: "This choice only moved the problem elsewhere.",
          feedback: "The disruption disappears for now, but the class does not practise how to verify similar content. Next time the same post may be shared outside school without guidance.",
        },
        {
          title: "Option B: Open a verification lab",
          detail: "Investigate the image together and examine how emotion affects judgement.",
          success: true,
          feedbackTitle: "The output created a reusable method.",
          feedback: "The class discovers that the image is eight years old, comes from another place and was reused as rage-bait. Emotion turns into questions and verification.",
        },
      ],
      evidence: "Class photo: students at the board with the manipulation pattern exposed.jpg",
      evidenceNote: "In the real application this would be an actual file or another verifiable artefact. Here we only simulate how evidence enters an Experience.",
      reflectionPrompt: "Write one sentence about what the students can carry from this situation into real life.",
      reflectionPlaceholder: "For example: The students realised that strong online emotions can be a trap for their attention.",
      traceTitle: "First documented trace in Critical reason",
      traceLast: "Verifying the origin and context of a viral classroom image.",
      traceNext: "In a real mission, a next step could test the same method on a deepfake video.",
    },
  },
  company: {
    icon: Building2,
    fanAxis: "Digitální pozornost",
    fanAxisEn: "Digital attention",
    cs: {
      tab: "Chci otestovat situaci ve firmě",
      label: "FIRMA",
      mission: "Tiché dopoledne 🔕",
      situation: "Slack, Teams, e-maily a meetingy opakovaně rozbíjejí soustředění. Chyb přibývá a lidé říkají, že nemají čas na hlubší práci. Jaký první experiment zvolíte?",
      choices: [
        {
          title: "Možnost A: Přidám monitoring",
          detail: "Budeme podrobněji sledovat aktivitu, odpovědi a dokončené úkoly.",
          success: false,
          feedbackTitle: "Měříte aktivitu, ne příčinu problému.",
          feedback: "Přibydou data a kontrola, ale počet přerušení se nezmenší. Navíc vznikají nové otázky soukromí a důvěry.",
        },
        {
          title: "Možnost B: Otestuji tiché dopoledne",
          detail: "Tři hodiny bez interních meetingů a notifikací, potom společná reflexe a porovnání práce.",
          success: true,
          feedbackTitle: "Vznikl ohraničený experiment.",
          feedback: "Tým může porovnat počet přerušení, kvalitu práce a vlastní zkušenost. Pokračování závisí na evidenci, ne na dojmu managementu.",
        },
      ],
      evidence: "Týmový záznam: počet přerušení před a během tichého dopoledne.csv",
      evidenceNote: "Ukázka pouze naznačuje typ evidence. Ve skutečné Experience by musel existovat reálný záznam a jasný účel jeho použití.",
      reflectionPrompt: "Napište jednou větou, co experiment změnil ve způsobu práce týmu.",
      reflectionPlaceholder: "Např. Zjistili jsme, že tři klidné hodiny umožnily dokončit úkoly, které se předtím celý týden rozpadaly na části.",
      traceTitle: "První doložená stopa v oblasti Digitální pozornost",
      traceLast: "Ohraničený experiment s tichým pracovním blokem.",
      traceNext: "Další zkušenost může ověřit, zda stejný princip funguje v jiném týmu nebo jiném pracovním kontextu.",
    },
    en: {
      tab: "Test a company situation",
      label: "ORGANIZATION",
      mission: "Quiet morning 🔕",
      situation: "Slack, Teams, email and meetings repeatedly break concentration. Errors are increasing and people say they have little time for deeper work. What first experiment do you choose?",
      choices: [
        {
          title: "Option A: Add monitoring",
          detail: "Track activity, responses and completed tasks in more detail.",
          success: false,
          feedbackTitle: "You are measuring activity, not the source of the problem.",
          feedback: "More data and control appear, but interruptions remain. New privacy and trust questions are created as well.",
        },
        {
          title: "Option B: Test a quiet morning",
          detail: "Three hours without internal meetings or notifications, followed by reflection and comparison.",
          success: true,
          feedbackTitle: "A bounded experiment now exists.",
          feedback: "The team can compare interruptions, work quality and lived experience. Evidence, not management preference, decides whether to continue.",
        },
      ],
      evidence: "Team record: interruptions before and during the quiet morning.csv",
      evidenceNote: "The demo only illustrates an evidence type. A real Experience would require a real record and a clearly defined purpose for using it.",
      reflectionPrompt: "Write one sentence about what the experiment changed in the way the team works.",
      reflectionPlaceholder: "For example: Three quiet hours let us finish tasks that had been fragmented across the whole week.",
      traceTitle: "First documented trace in Digital attention",
      traceLast: "A bounded experiment with a quiet work block.",
      traceNext: "A next Experience could test whether the same principle works in another team or context.",
    },
  },
  eco: {
    icon: Leaf,
    fanAxis: "Cirkulární jednání",
    fanAxisEn: "Circular action",
    cs: {
      tab: "Chci zkusit cirkulární propojení",
      label: "CIRKULÁRNÍ SÍŤ",
      mission: "Druhý život monitorů ♻️",
      situation: "Organizace modernizuje kancelář a má 30 starších, ale funkčních monitorů. Co uděláte, než se z nich stane elektroodpad?",
      choices: [
        {
          title: "Možnost A: Pošlu je rovnou do odpadu",
          detail: "Funkční vybavení odejde standardním odpadovým tokem.",
          success: false,
          feedbackTitle: "Neověřili jste možnost dalšího použití.",
          feedback: "Řešení je jednoduché, ale nevíte, zda by vybavení mohlo sloužit škole, spolku nebo komunitě v okolí.",
        },
        {
          title: "Možnost B: Nejdřív zkusím Materiálový most",
          detail: "Nabídnu vybavení s regionem, stavem a podmínkami předání a počkám na skutečný zájem.",
          success: true,
          feedbackTitle: "Vznikla ověřitelná cesta k opětovnému použití.",
          feedback: "Teprve reálná rezervace a předání mohou doložit, že věc našla další využití. Veřejný příběh může vzniknout jen s důkazem a souhlasem.",
        },
      ],
      evidence: "Předávací záznam: 15 funkčních monitorů převzala místní dílna robotiky.pdf",
      evidenceNote: "V této veřejné ukázce jde o modelový artefakt, nikoli skutečné předání. Ostrý Passport nesmí zobrazit dopad bez reálné evidence.",
      reflectionPrompt: "Napište jednou větou, co jste se při hledání dalšího využití věcí dozvěděli.",
      reflectionPlaceholder: "Např. Nejdřív jsme museli zjistit skutečnou potřebu příjemce, ne jen někomu předat to, čeho se chceme zbavit.",
      traceTitle: "První doložená stopa v oblasti Cirkulární jednání",
      traceLast: "Ověření, zda funkční vybavení může získat další smysluplné využití.",
      traceNext: "Další zkušenost může sledovat, zda se předané věci opravdu používají; teprve potom lze mluvit o doloženém použití výsledku.",
    },
    en: {
      tab: "Try a circular connection",
      label: "CIRCULAR NETWORK",
      mission: "A second life for monitors ♻️",
      situation: "An organization is upgrading its office and has 30 older but working monitors. What do you do before they enter the e-waste stream?",
      choices: [
        {
          title: "Option A: Send them straight to waste",
          detail: "Working equipment enters the standard waste stream.",
          success: false,
          feedbackTitle: "You did not test whether reuse was possible.",
          feedback: "The route is simple, but you never learn whether a school, association or local community could use the equipment.",
        },
        {
          title: "Option B: Try the Material Bridge first",
          detail: "Offer the equipment with its region, condition and handover rules and wait for real demand.",
          success: true,
          feedbackTitle: "A verifiable path toward reuse now exists.",
          feedback: "Only a real reservation and handover can prove that the equipment found another use. A public story requires evidence and consent.",
        },
      ],
      evidence: "Handover record: 15 working monitors received by a local robotics workshop.pdf",
      evidenceNote: "This public demo uses a model artefact, not a real handover. The real Passport must never display impact without real evidence.",
      reflectionPrompt: "Write one sentence about what you learned while looking for a useful next life for the equipment.",
      reflectionPlaceholder: "For example: We first had to understand the recipient's real need instead of simply passing on what we no longer wanted.",
      traceTitle: "First documented trace in Circular action",
      traceLast: "Testing whether working equipment can find another meaningful use.",
      traceNext: "A next Experience can check whether the transferred equipment is actually used; only then can the system describe documented use of the result.",
    },
  },
};

function FanPreview({ axis, locale }) {
  const labels = FAN_AXES[locale];
  const data = labels.map((label) => ({
    axis: label,
    level: label === axis ? 1 : 0,
  }));

  return (
    <div className="r14-fan-preview" aria-label={locale === "en" ? "Experience fan preview" : "Náhled Vějíře zkušeností"}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="66%">
          <PolarGrid stroke="rgba(255,255,255,.14)" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: "#d7deed", fontSize: 10, fontWeight: 700 }} />
          <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} axisLine={false} />
          <Radar dataKey="level" stroke="#a78bfa" fill="#8b5cf6" fillOpacity={0.32} strokeWidth={2} dot={{ r: 4, fill: "#f4e86b" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function PansofieTaste() {
  const { locale: rawLocale } = useLanguage();
  const locale = rawLocale === "en" ? "en" : "cs";
  const [step, setStep] = useState(1);
  const [active, setActive] = useState(null);
  const [selected, setSelected] = useState(null);
  const [reflection, setReflection] = useState("");

  const scenario = useMemo(() => active ? SCENARIOS[active][locale] : null, [active, locale]);
  const selectedChoice = selected === null || !scenario ? null : scenario.choices[selected];
  const fanAxis = active ? (locale === "en" ? SCENARIOS[active].fanAxisEn : SCENARIOS[active].fanAxis) : "";

  const startScenario = (key) => {
    setActive(key);
    setSelected(null);
    setReflection("");
    setStep(2);
  };

  const choose = (index) => {
    setSelected(index);
    setStep(3);
  };

  const reset = () => {
    setActive(null);
    setSelected(null);
    setReflection("");
    setStep(1);
  };

  const progress = [1, 2, 3, 4, 5, 6];

  return (
    <section className="r14-taste" id="ochutnejte" aria-labelledby="r14-taste-title">
      <div className="container-px max-w-7xl mx-auto py-20 sm:py-28">
        <div className="r14-taste-heading">
          <span className="r14-taste-kicker"><Sparkles size={17} /> {locale === "en" ? "TASTE PANSOFIE" : "OCHUTNEJTE PANSOFII"}</span>
          <h2 id="r14-taste-title">{locale === "en" ? "Try the whole Pansofie cycle without registering." : "Vyzkoušejte si celý cyklus Pansofie bez registrace."}</h2>
          <p>{locale === "en" ? "Action → Output → Evidence → Reflection → a visible trace. No personality score, no hidden moral grade and no data is saved to your Passport in this public demo." : "Akce → Výstup → Důkaz → Reflexe → Vizuální stopa. Žádné skóre osobnosti ani skrytá morální známka a tato veřejná ukázka nic nezapisuje do vašeho Passportu."}</p>
        </div>

        <div className="r14-taste-shell">
          <div className="r14-taste-progress" aria-label={locale === "en" ? `Step ${step} of 6` : `Krok ${step} ze 6`}>
            {progress.map((item) => <span key={item} className={item <= step ? "is-active" : ""}>{item}</span>)}
          </div>

          {step === 1 && (
            <div className="r14-taste-screen">
              <span className="r14-screen-label">{locale === "en" ? "STEP 1 · ACTION" : "KROK 1 · AKCE"}</span>
              <h3>{locale === "en" ? "Try Pansofie right now. What interests you most?" : "Vyzkoušejte si Pansofii hned teď. Co vás zajímá nejvíce?"}</h3>
              <div className="r14-taste-tabs" role="tablist" aria-label={locale === "en" ? "Mini-mission type" : "Typ mini-mise"}>
                {Object.entries(SCENARIOS).map(([key, item]) => {
                  const Icon = item.icon;
                  return (
                    <button key={key} type="button" role="tab" aria-selected={active === key} onClick={() => startScenario(key)}>
                      <Icon size={21} />
                      <span>{item[locale].tab}</span>
                      <ArrowRight size={17} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && scenario && (
            <div className="r14-taste-screen">
              <span className="r14-screen-label">{locale === "en" ? "STEP 2 · OUTPUT" : "KROK 2 · VÝSTUP"}</span>
              <div className="r14-taste-mission-head"><strong>{scenario.label}</strong><span>{scenario.mission}</span></div>
              <p className="r14-taste-situation-copy">{scenario.situation}</p>
              <div className="r14-taste-choices" aria-label={locale === "en" ? "Decision options" : "Možnosti rozhodnutí"}>
                {scenario.choices.map((choice, index) => (
                  <button key={choice.title} type="button" onClick={() => choose(index)}>
                    <strong>{choice.title}</strong>
                    <span>{choice.detail}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && scenario && selectedChoice && (
            <div className="r14-taste-screen">
              <span className="r14-screen-label">{locale === "en" ? "STEP 3 · EVIDENCE" : "KROK 3 · DŮKAZ"}</span>
              <div className={`r14-feedback ${selectedChoice.success ? "is-success" : "is-rethink"}`}>
                <div><ShieldCheck size={22} /><strong>{selectedChoice.feedbackTitle}</strong></div>
                <p>{selectedChoice.feedback}</p>
              </div>

              {!selectedChoice.success ? (
                <button type="button" className="r14-taste-primary" onClick={() => { setSelected(null); setStep(2); }}>
                  <RotateCcw size={17} /> {locale === "en" ? "Try the other response" : "Zkusit jinou reakci"}
                </button>
              ) : (
                <>
                  <div className="r14-evidence-card">
                    <Camera size={24} />
                    <div><span>{locale === "en" ? "MODEL EVIDENCE" : "MODELOVÝ DŮKAZ"}</span><strong>{scenario.evidence}</strong><p>{scenario.evidenceNote}</p></div>
                  </div>
                  <button type="button" className="r14-taste-primary" onClick={() => setStep(4)}>
                    <CheckCircle2 size={17} /> {locale === "en" ? "Use this model evidence" : "Použít tento modelový důkaz"}
                  </button>
                </>
              )}
            </div>
          )}

          {step === 4 && scenario && (
            <div className="r14-taste-screen">
              <span className="r14-screen-label">{locale === "en" ? "STEP 4 · REFLECTION" : "KROK 4 · REFLEXE"}</span>
              <div className="r14-reflection-title"><PenLine size={23} /><h3>{locale === "en" ? "My short reflection" : "Moje krátká reflexe"}</h3></div>
              <p className="r14-taste-situation-copy">{scenario.reflectionPrompt}</p>
              <textarea value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder={scenario.reflectionPlaceholder} rows={4} maxLength={280} />
              <div className="r14-reflection-meta"><span>{reflection.length}/280</span><em>{locale === "en" ? "Only local component state — nothing is sent." : "Jen lokální stav komponenty — nic se neodesílá."}</em></div>
              <button type="button" className="r14-taste-primary" disabled={!reflection.trim()} onClick={() => setStep(5)}>
                {locale === "en" ? "Confirm reflection and preview the trace" : "Potvrdit reflexi a zobrazit náhled stopy"} <ArrowRight size={17} />
              </button>
            </div>
          )}

          {step === 5 && scenario && (
            <div className="r14-taste-screen r14-taste-fan-screen">
              <span className="r14-screen-label">{locale === "en" ? "STEP 5 · EXPERIENCE FAN PREVIEW" : "KROK 5 · NÁHLED VĚJÍŘE ZKUŠENOSTÍ"}</span>
              <div className="r14-preview-truth"><Sparkles size={19} /><span>{locale === "en" ? "Preview only. No real verification or Passport write happened in this public demo." : "Pouze náhled. V tomto veřejném demu neproběhlo skutečné ověření ani zápis do Passportu."}</span></div>
              <FanPreview axis={fanAxis} locale={locale} />
              <div className="r14-trace-copy">
                <h3>{scenario.traceTitle}</h3>
                <p><strong>{locale === "en" ? "Previewed state:" : "Náhled stavu:"}</strong> {locale === "en" ? "1 documented Experience · First documented experience" : "1 doložená zkušenost · První doložená zkušenost"}</p>
                <p><strong>{locale === "en" ? "Last:" : "Poslední:"}</strong> {scenario.traceLast}</p>
                <p><strong>{locale === "en" ? "Possible next step:" : "Možný další krok:"}</strong> {scenario.traceNext}</p>
              </div>
              <button type="button" className="r14-taste-primary" onClick={() => setStep(6)}>{locale === "en" ? "Continue" : "Pokračovat"} <ArrowRight size={17} /></button>
            </div>
          )}

          {step === 6 && scenario && (
            <div className="r14-taste-screen r14-taste-gate">
              <span className="r14-screen-label">{locale === "en" ? "STEP 6 · NEXT REAL STEP" : "KROK 6 · DALŠÍ SKUTEČNÝ KROK"}</span>
              <h3>{locale === "en" ? "Would you like to build a map of real Experiences too?" : "Chcete takovou mapu reálných zkušeností budovat i vy?"}</h3>
              <p>{locale === "en" ? "Pansofie is being piloted as a network for people, schools, organizations and communities that want to connect learning with documented action. Public account creation is not open yet; pilot accounts are activated by invitation." : "Pansofie vzniká jako síť pro lidi, školy, organizace a komunity, které chtějí spojovat učení s doloženými činy. Veřejné vytvoření účtu zatím není otevřené; pilotní účty se aktivují na pozvání."}</p>
              <div className="r14-taste-actions">
                <Link to="/zapojit-se" className="action-primary">{locale === "en" ? "I want to join the pilot" : "Chci se zapojit do pilotu"} <ArrowRight size={17} /></Link>
                {active === "eco" && <Link to="/materialovy-most" className="action-secondary">{locale === "en" ? "Open Material Bridge" : "Otevřít Materiálový most"}</Link>}
              </div>
              <button type="button" className="r14-taste-reset" onClick={reset}><RotateCcw size={15} /> {locale === "en" ? "Try another situation" : "Vyzkoušet jinou situaci"}</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
