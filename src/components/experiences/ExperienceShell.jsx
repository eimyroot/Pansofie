import Link from "next/link";

const COPY = {
  adult_personal: ["Pansofie pro vás", "Klidný prostor pro poznávání, souvislosti a vlastní cestu."],
  adult_family: ["Rodinná Pansofie", "Společné nápady, učení a aktivity napříč generacemi."],
  adult_school: ["Pansofie pro školy", "Projekty, spolupráce a vzdělávání v jednom přehledném prostoru."],
  adult_company: ["Pansofie pro firmy", "Smysluplné zapojení lidí, zdrojů a místních partnerství."],
  young_kids: ["Pansofie Young 6–13", "Hravé objevování světa bezpečným a srozumitelným způsobem."],
  young_teens: ["Pansofie Young 14–20", "Mise, inspirace a prostor měnit věci kolem sebe."],
};
export default function ExperienceShell({ experience, name, children }) {
  const [title, subtitle] = COPY[experience];
  return <div className="experience-shell" data-experience={experience}><header className="experience-header"><Link href="/" className="experience-brand">PANSOFIE</Link><span>{name || "Můj prostor"}</span></header><main className="experience-main"><p className="eyebrow">Váš svět</p><h1>{title}</h1><p className="experience-lead">{subtitle}</p>{children}</main></div>;
}
