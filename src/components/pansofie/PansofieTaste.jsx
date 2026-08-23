import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, GraduationCap, Leaf, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const SCENARIOS = {
  school: {
    icon: GraduationCap,
    cs: {
      tab: "Chci zažít výuku ve třídě",
      label: "ŠKOLA · 60 S",
      title: "Virální obrázek rozbouří celou třídu.",
      situation: "Žáci našli na sociální síti šokující fotografii zvířete ve znečištěné řece. Emoce jsou silné a několik z nich ji chce hned sdílet. Co uděláte?",
      choices: [
        {
          title: "Mobily schovám a vrátím se k výkladu.",
          consequence: "Krátkodobě odstraníte vyrušení, ale původ obrázku ani způsob ověřování se třída nenaučí. Digitální problém se jen přesune mimo hodinu.",
          pillars: ["POZNEJ SEBE"],
        },
        {
          title: "Zastavíme se a společně ověříme zdroj.",
          consequence: "Třída oddělí emoci od důkazu, dohledá původ obrázku a pojmenuje, co ví a co zatím neví. Výsledkem je přenositelný postup pro další podobnou situaci.",
          pillars: ["POZNEJ SEBE", "TVOŘ S DRUHÝMI"],
        },
      ],
    },
    en: {
      tab: "Experience a classroom mission",
      label: "SCHOOL · 60 SEC",
      title: "A viral image unsettles the whole class.",
      situation: "Students find a shocking image of an animal in a polluted river. Emotions run high and several want to share it immediately. What do you do?",
      choices: [
        {
          title: "Put the phones away and return to the lesson.",
          consequence: "You remove the distraction for now, but the class does not learn how to investigate the image or verify its source. The digital problem simply moves outside the classroom.",
          pillars: ["KNOW YOURSELF"],
        },
        {
          title: "Pause and investigate the source together.",
          consequence: "The class separates emotion from evidence, traces the image and names what is known and still uncertain. They leave with a method they can reuse next time.",
          pillars: ["KNOW YOURSELF", "CREATE WITH OTHERS"],
        },
      ],
    },
  },
  company: {
    icon: Building2,
    cs: {
      tab: "Chci otestovat rozhodování ve firmě",
      label: "FIRMA · 60 S",
      title: "Tým je zahlcený digitálním vyrušováním.",
      situation: "Slack, Teams, e-maily a meetingy přerušují soustředění. Chyb přibývá a lidé popisují, že nemají čas na hlubší práci. Jaký první experiment zvolíte?",
      choices: [
        {
          title: "Přidáme další monitoring aktivity a kontrolu úkolů.",
          consequence: "Získáte více dat o aktivitě, ale neřešíte množství vyrušení. Navíc roste nárok na vysvětlení, kdo data vidí, proč se sbírají a jak se použijí.",
          pillars: ["POZNEJ SEBE"],
        },
        {
          title: "Otestujeme jedno tiché dopoledne týdně.",
          consequence: "Vznikne ohraničený experiment: tři hodiny bez interních meetingů a notifikací, po kterých tým porovná kvalitu práce, počet přerušení a vlastní zkušenost. Teprve data rozhodnou, zda má smysl pokračovat.",
          pillars: ["POZNEJ SEBE", "TVOŘ S DRUHÝMI"],
        },
      ],
    },
    en: {
      tab: "Test a company decision",
      label: "ORGANIZATION · 60 SEC",
      title: "A team is overloaded by digital interruptions.",
      situation: "Slack, Teams, email and meetings repeatedly break concentration. Errors are increasing and people say they have little time for deeper work. What first experiment do you choose?",
      choices: [
        {
          title: "Add more activity monitoring and task control.",
          consequence: "You gain more activity data but do not reduce the interruptions themselves. You also create a new governance question: who sees the data, why it is collected and how it is used.",
          pillars: ["KNOW YOURSELF"],
        },
        {
          title: "Test one quiet morning each week.",
          consequence: "You create a bounded experiment: three hours without internal meetings or notifications, followed by a comparison of interruptions, work quality and team experience. Evidence decides whether to continue.",
          pillars: ["KNOW YOURSELF", "CREATE WITH OTHERS"],
        },
      ],
    },
  },
  eco: {
    icon: Leaf,
    cs: {
      tab: "Chci vyzkoušet cirkulární propojení",
      label: "CIRKULÁRNÍ SÍŤ · 60 S",
      title: "Třicet funkčních monitorů hledá další život.",
      situation: "Organizace modernizuje kancelář a má 30 starších, ale funkčních monitorů. Co uděláte, než se z nich stane elektroodpad?",
      choices: [
        {
          title: "Rovnou je odvezeme do standardního odpadového toku.",
          consequence: "Je to jednoduché řešení, ale neověříte, zda pro funkční vybavení existuje místní druhé využití. Přicházíte o možnost prodloužit jeho životnost.",
          pillars: ["ZLEPŠUJ SVĚT"],
        },
        {
          title: "Nejdřív zveřejníme nabídku v Materiálovém mostu.",
          consequence: "Nabídka se spojí s regionem, stavem a způsobem předání. Teprve skutečný zájem vede k rezervaci a předání; veřejný příběh vznikne jen s důkazem a souhlasem.",
          pillars: ["TVOŘ S DRUHÝMI", "ZLEPŠUJ SVĚT"],
        },
      ],
    },
    en: {
      tab: "Try a circular connection",
      label: "CIRCULAR NETWORK · 60 SEC",
      title: "Thirty working monitors need a next life.",
      situation: "An organization is upgrading its office and has 30 older but functional monitors. What do you do before they enter the e-waste stream?",
      choices: [
        {
          title: "Send them directly into the standard waste stream.",
          consequence: "It is simple, but you never test whether the working equipment has a useful local second life. A reuse opportunity may be lost.",
          pillars: ["IMPROVE THE WORLD"],
        },
        {
          title: "First offer them through the Material Bridge.",
          consequence: "The offer is tied to a region, condition and handover method. Only real interest creates a reservation and handover; a public story requires evidence and consent.",
          pillars: ["CREATE WITH OTHERS", "IMPROVE THE WORLD"],
        },
      ],
    },
  },
};

export default function PansofieTaste() {
  const { locale } = useLanguage();
  const [active, setActive] = useState("school");
  const [selected, setSelected] = useState(null);
  const scenario = useMemo(() => SCENARIOS[active][locale === "en" ? "en" : "cs"], [active, locale]);

  const chooseScenario = (key) => {
    setActive(key);
    setSelected(null);
  };

  return (
    <section className="r14-taste" aria-labelledby="r14-taste-title">
      <div className="container-px max-w-7xl mx-auto py-20 sm:py-28">
        <div className="r14-taste-heading">
          <span className="r14-taste-kicker"><Sparkles size={17} /> {locale === "en" ? "TASTE PANSOFIE" : "OCHUTNEJTE PANSOFII"}</span>
          <h2 id="r14-taste-title">{locale === "en" ? "Try pansophic thinking before we ask you for anything." : "Vyzkoušejte si pansofické uvažování dřív, než po vás budeme něco chtít."}</h2>
          <p>{locale === "en" ? "Choose one mini-mission. There is no personality score and no hidden moral grade — only the consequences, trade-offs and questions created by a concrete choice." : "Vyberte jednu mini-misi. Žádné skóre osobnosti ani skrytá morální známka — jen důsledky, kompromisy a otázky, které vytváří konkrétní volba."}</p>
        </div>

        <div className="r14-taste-tabs" role="tablist" aria-label={locale === "en" ? "Mini-mission type" : "Typ mini-mise"}>
          {Object.entries(SCENARIOS).map(([key, item]) => {
            const Icon = item.icon;
            const copy = item[locale === "en" ? "en" : "cs"];
            return <button key={key} type="button" role="tab" aria-selected={active === key} className={active === key ? "is-active" : ""} onClick={() => chooseScenario(key)}><Icon size={18} /><span>{copy.tab}</span></button>;
          })}
        </div>

        <div className="r14-taste-stage">
          <div className="r14-taste-situation">
            <span>{scenario.label}</span>
            <h3>{scenario.title}</h3>
            <p>{scenario.situation}</p>
          </div>

          <div className="r14-taste-choices" aria-label={locale === "en" ? "Decision options" : "Možnosti rozhodnutí"}>
            {scenario.choices.map((choice, index) => (
              <button key={choice.title} type="button" className={selected === index ? "is-selected" : ""} onClick={() => setSelected(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{choice.title}</strong>
              </button>
            ))}
          </div>

          {selected !== null ? (
            <div className="r14-taste-result" role="status">
              <div><ShieldCheck size={21} /><span>{locale === "en" ? "CONSEQUENCES OF THIS CHOICE" : "DŮSLEDKY TÉTO VOLBY"}</span></div>
              <p>{scenario.choices[selected].consequence}</p>
              <div className="r14-taste-pillars">{scenario.choices[selected].pillars.map((pillar) => <span key={pillar}>{pillar}</span>)}</div>
              <button type="button" className="r14-taste-reset" onClick={() => setSelected(null)}><RotateCcw size={15} /> {locale === "en" ? "Try the other option" : "Zkusit druhou možnost"}</button>
            </div>
          ) : (
            <div className="r14-taste-prompt">{locale === "en" ? "Choose one response to reveal its consequences." : "Vyberte jednu reakci a odkryjte její důsledky."}</div>
          )}
        </div>

        <div className="r14-taste-next">
          <div>
            <span>{locale === "en" ? "NO SALES GATE" : "BEZ PRODEJNÍ BRÁNY"}</span>
            <h3>{locale === "en" ? "If this way of thinking makes sense, enter the network through a real next step." : "Pokud vám tento způsob uvažování dává smysl, vstupte do sítě skutečným dalším krokem."}</h3>
            <p>{locale === "en" ? "Public registration is still invitation-based during the pilot. You can express interest, bring a real challenge, or use the Material Bridge without pretending an account already exists." : "Veřejná registrace zůstává během pilotu řízená pozváním. Můžete projevit zájem, přinést skutečnou výzvu nebo použít Materiálový most — bez předstírání, že účet už existuje."}</p>
          </div>
          <div className="r14-taste-actions">
            <Link to="/zapojit-se" className="action-primary">{locale === "en" ? "I want to enter the network" : "Chci vstoupit do sítě"} <ArrowRight size={17} /></Link>
            <Link to="/materialovy-most" className="action-secondary">{locale === "en" ? "Open Material Bridge" : "Otevřít Materiálový most"}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
