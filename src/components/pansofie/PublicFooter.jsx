import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import ParticipationCTA from "@/components/pansofie/ParticipationCTA";
import { useLanguage } from "@/lib/LanguageContext";

const COPY = {
  cs: {
    principles: [
      {
        key: "omnes",
        label: "Všem",
        text: "Internet a vzdělání musí být zdarma, bez bariér a dostupné i v nejchudších koutech světa.",
      },
      {
        key: "omnia",
        label: "Všemu",
        text: "Technologie nesmí sloužit jen byznysu, ale musí pomáhat léčit nemoci, chránit přírodu a rozvíjet kulturu.",
      },
      {
        key: "omnino",
        label: "Všestranně",
        text: "Digitální gramotnost bez morální gramotnosti je nebezpečná zbraň. Učit se musíme rozumu, jazyku i srdci zároveň.",
      },
    ],
    brandLead: "Poznej sebe. Tvoř s druhými. Zlepšuj svět.",
    brandBody: "Pansofie propojuje skutečné zkušenosti, důkaz, reflexi a lidské ověření. Bez žebříčků lidí a bez předstírání dopadu, který ještě nebyl doložen.",
    adultTitle: "Projekty dospělých",
    adultLinks: [
      ["/pro-koho/skoly", "🏫 Pro školy"],
      ["/pro-koho/firmy", "🏢 Pro firmy"],
      ["/materialovy-most", "📦 Materiálový most"],
    ],
    youngTitle: "Pansofie YOUNG",
    youngItems: [
      "🐣 3–6 let · Malí objevitelé",
      "🎒 7–11 let · Digitální detektivové",
      "🧠 12–15 let · Kyber-skauti",
      "🌍 16–18 let · Mladí vizionáři",
    ],
    youngNote: "Věkové světy připravujeme. Veřejný dětský login ani registrace zatím nejsou otevřené.",
    repairTitle: "Společná náprava",
    repairLinks: [
      ["/pilot", "🧭 Pilotní program"],
      ["/partneri", "🤝 Partnerská síť"],
      ["/bezpecnost", "🛡️ Bezpečnost a hranice"],
      ["/zapojit-se", "↗ Zapojit se"],
    ],
    network: ["Zkušenost", "Důkaz", "Ověření", "Důvěra", "Další krok"],
    truth: "Technická připravenost, ověření v praxi, skutečné výsledky a dlouhodobý dopad jsou v Pansofii oddělené vrstvy.",
    privacy: "Soukromí",
    terms: "Podmínky",
    signIn: "Přihlášení",
    manifestoAria: "Principy Pansofie: všem, všemu, všestranně",
  },
  en: {
    principles: [
      {
        key: "omnes",
        label: "For all",
        text: "The internet and education must be free, barrier-free and accessible even in the poorest corners of the world.",
      },
      {
        key: "omnia",
        label: "For the whole",
        text: "Technology must not serve business alone; it must help heal disease, protect nature and develop culture.",
      },
      {
        key: "omnino",
        label: "In every way",
        text: "Digital literacy without moral literacy is a dangerous weapon. We must learn with reason, language and heart together.",
      },
    ],
    brandLead: "Know yourself. Create with others. Improve the world.",
    brandBody: "Pansofie connects real experiences, evidence, reflection and human verification. Without ranking people and without pretending an impact that has not been evidenced yet.",
    adultTitle: "Adult pathways",
    adultLinks: [
      ["/pro-koho/skoly", "🏫 For schools"],
      ["/pro-koho/firmy", "🏢 For companies"],
      ["/materialovy-most", "📦 Material Bridge"],
    ],
    youngTitle: "Pansofie YOUNG",
    youngItems: [
      "🐣 Ages 3–6 · Little explorers",
      "🎒 Ages 7–11 · Digital detectives",
      "🧠 Ages 12–15 · Cyber scouts",
      "🌍 Ages 16–18 · Young visionaries",
    ],
    youngNote: "These age worlds are in preparation. Public child login and registration are not open yet.",
    repairTitle: "Shared repair",
    repairLinks: [
      ["/pilot", "🧭 Pilot program"],
      ["/partneri", "🤝 Partner network"],
      ["/bezpecnost", "🛡️ Safety and boundaries"],
      ["/zapojit-se", "↗ Join"],
    ],
    network: ["Experience", "Evidence", "Verification", "Trust", "Next step"],
    truth: "Technical readiness, real-world verification, actual outcomes and long-term impact are separate layers in Pansofie.",
    privacy: "Privacy",
    terms: "Terms",
    signIn: "Sign in",
    manifestoAria: "Pansofie principles: for all, for the whole, in every way",
  },
};

export default function PublicFooter() {
  const location = useLocation();
  const { locale } = useLanguage();
  const copy = COPY[locale === "en" ? "en" : "cs"];
  const showParticipationGateway = location.pathname === "/pro-koho";

  return (
    <>
      {showParticipationGateway && <ParticipationCTA />}
      <footer data-footer-release="r24" className="mt-20 w-full border-t border-slate-800 bg-[#0b1016] text-slate-300">
        <div className="pansofie-footer-manifest" role="region" aria-label={copy.manifestoAria}>
          <div className="pansofie-footer-manifest__rail">
            {copy.principles.map((item) => (
              <p key={item.key} className="pansofie-footer-manifest__item" data-principle={item.key}>
                <strong>{item.label}</strong>
                <span>{item.text}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="w-full px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
          <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div className="max-w-sm">
              <Link to="/" className="inline-flex items-center gap-2.5 text-white" aria-label="Pansofie">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-[0_0_28px_-12px_rgba(52,211,153,0.9)]"><Leaf size={19} /></span>
                <span className="font-heading text-base font-extrabold tracking-[0.12em]">PANSOFIE</span>
              </Link>
              <p className="mt-4 text-sm font-semibold text-slate-200">{copy.brandLead}</p>
              <p className="mt-3 text-[11px] leading-relaxed text-slate-500">{copy.brandBody}</p>
              <Link to="/login" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-white">{copy.signIn} <ArrowRight size={13} /></Link>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{copy.adultTitle}</p>
              {copy.adultLinks.map(([to, label]) => (
                <Link key={to} to={to} className="text-xs font-semibold text-slate-300 transition-colors hover:text-violet-300">{label}</Link>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{copy.youngTitle}</p>
              {copy.youngItems.map((item) => <span key={item} className="text-xs text-slate-400">{item}</span>)}
              <p className="mt-2 max-w-xs text-[10px] leading-relaxed text-slate-600">{copy.youngNote}</p>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{copy.repairTitle}</p>
              {copy.repairLinks.map(([to, label]) => (
                <Link key={to} to={to} className="text-xs font-semibold text-slate-300 transition-colors hover:text-emerald-300">{label}</Link>
              ))}
            </div>
          </div>

          <div className="footer-network-thread mt-10 border-y border-slate-800/80 py-5 text-slate-500" aria-label={locale === "en" ? "Pansofie logic from experience to next step" : "Logika Pansofie od zkušenosti k dalšímu kroku"}>
            {copy.network.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 && <span className="footer-network-edge" aria-hidden="true"><i /></span>}
                <span className="footer-network-node">{item}</span>
              </React.Fragment>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 text-[10px] leading-relaxed text-slate-600 md:flex-row md:items-center md:justify-between">
            <p className="max-w-3xl">{copy.truth}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-semibold">
              <Link to="/soukromi" className="transition-colors hover:text-slate-300">{copy.privacy}</Link>
              <Link to="/podminky" className="transition-colors hover:text-slate-300">{copy.terms}</Link>
              <span>© 2026 Pansofie</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
