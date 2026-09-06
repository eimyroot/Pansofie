import React from "react";
import { ArrowRight, BookOpen, HeartHandshake, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import "@/vision-r28.css";

const pillars = [
  {
    index: "01 · PANSOFIA",
    title: "Vševěda",
    subtitle: "Poznávat svět v souvislostech.",
    body: "Neučit se izolované odpovědi, ale hledat vztahy mezi přírodou, člověkem, technologií, společností a důsledky našich rozhodnutí.",
    to: "/vize/vseveda",
    cta: "Poznat Vševědu",
    icon: BookOpen,
  },
  {
    index: "02 · PAMPAEDIA",
    title: "Vševýchova",
    subtitle: "Růst a učit se celý život.",
    body: "Učení nekončí školou a neprobíhá jedním směrem. Člověk se v průběhu života střídá v roli žáka, průvodce, spolupracovníka i svědka zkušenosti.",
    to: "/vize/vsevychova",
    cta: "Prozkoumat Vševýchovu",
    icon: HeartHandshake,
  },
  {
    index: "03 · PANORTHOSIA",
    title: "Všenáprava",
    subtitle: "Zlepšovat svět kolem sebe.",
    body: "Poznání má směřovat k odpovědnému jednání: něco opravit, obnovit, vytvořit, předat nebo změnit tak, aby po našem kroku zůstalo něco skutečně lepšího.",
    to: "/vize/vsenaprava",
    cta: "Pochopit Všenápravu",
    icon: Sprout,
  },
];

export default function Vision() {
  return (
    <main className="vision-page" data-vision-release="r28">
      <section className="vision-hero vision-shell">
        <div>
          <p className="vision-eyebrow">VIZE PANSOFIE</p>
          <h1>Staré pilíře. <span>Současný život.</span></h1>
          <p className="vision-lead">
            Pansofie nechce Komenského myšlenky vystavit jako historii. Překládá je do dnešní otázky:
            jak poznávat svět v souvislostech, růst celý život a používat poznání k odpovědnému jednání.
          </p>
        </div>
        <div className="vision-mark" aria-hidden="true">
          <span className="vision-mark-core">P</span>
          <span className="vision-mark-ring vision-mark-ring-a" />
          <span className="vision-mark-ring vision-mark-ring-b" />
          <span className="vision-mark-ring vision-mark-ring-c" />
        </div>
      </section>

      <section className="vision-pillars vision-shell" aria-label="Tři pilíře Pansofie">
        {pillars.map(({ index, title, subtitle, body, to, cta, icon: Icon }) => (
          <article className="vision-pillar-card" key={title}>
            <div className="vision-pillar-icon" aria-hidden="true"><Icon size={34} strokeWidth={1.4} /></div>
            <div className="vision-pillar-copy">
              <p className="vision-card-index">{index}</p>
              <h2>{title}</h2>
              <p className="vision-card-subtitle">{subtitle}</p>
              <p>{body}</p>
              <Link className="vision-card-link" to={to}>
                {cta} <ArrowRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="vision-cycle vision-shell">
        <p className="vision-eyebrow">JEDEN PANSOFICKÝ CYKLUS</p>
        <h2>Poznat → růst → jednat → reflektovat → poznat lépe.</h2>
        <p>
          Vševěda, Vševýchova a Všenáprava nejsou tři oddělené eseje. Jsou tři části jednoho pohybu:
          porozumět souvislostem, proměnit je ve zkušenost a zkušenost použít k odpovědnému zlepšení reality.
        </p>
      </section>
    </main>
  );
}
