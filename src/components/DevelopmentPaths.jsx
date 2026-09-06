import React from "react";
import {
  BookOpen, Brain, BriefcaseBusiness, Globe2, HeartPulse,
  Lightbulb, Sprout, UsersRound
} from "lucide-react";
import { useLanguage } from "../state/LanguageContext";

const AREAS = [
  { icon: HeartPulse, cs: "Já & zdraví", en: "Self & wellbeing" },
  { icon: Brain, cs: "Poznání & myšlení", en: "Knowledge & thinking" },
  { icon: UsersRound, cs: "Vztahy & spolupráce", en: "Relationships & cooperation" },
  { icon: Lightbulb, cs: "Tvorba & řešení problémů", en: "Creation & problem-solving" },
  { icon: BriefcaseBusiness, cs: "Samostatnost & podnikavost", en: "Independence & enterprise" },
  { icon: Globe2, cs: "Občanství & přínos", en: "Citizenship & contribution" },
  { icon: Sprout, cs: "Příroda & udržitelnost", en: "Nature & sustainability" },
];

export default function DevelopmentPaths({ compact = false }) {
  const { isEnglish } = useLanguage();
  const title = isEnglish
    ? "What can grow along the way"
    : "Co se může cestou rozvíjet";
  const lead = isEnglish
    ? "These are not points, grades or a ranking of a person. They are areas that a voluntary experience can naturally touch."
    : "Nejsou to body, známky ani žebříček člověka. Jsou to oblasti, kterých se dobrovolná zkušenost může přirozeně dotknout.";

  return (
    <section className={`r9-development ${compact ? "r9-development--compact" : ""}`} id="co-se-rozviji">
      <div className="r9-development__head">
        <span className="r9-kicker">{isEnglish ? "GROWTH WITHOUT SCORING" : "ROZVOJ BEZ HODNOCENÍ"}</span>
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>
      <div className="r9-development__chips">
        {AREAS.map(({ icon: Icon, cs, en }, index) => (
          <div className="r9-development__chip" key={cs}>
            <Icon size={18} aria-hidden="true" />
            <span>{isEnglish ? en : cs}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
