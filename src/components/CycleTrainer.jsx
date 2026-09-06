import React, { useMemo, useState } from "react";
import { ArrowRight, Building2, GraduationCap, RefreshCw, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../state/LanguageContext";

const SCENARIOS = {
  senior: {
    accent: "amber",
    cs: {
      actor: "Senior / mentor",
      subtitle: "Nabízí zkušenost a řemeslo",
      badge: "Osobní růst · DEMO",
      title: "Mentor předává praktickou dovednost mladší generaci",
      give: "Student získá praktické vedení při práci se dřevem a bezpečném používání ručního nářadí.",
      take: "Pokud oba chtějí, setkání může vést k další předem domluvené pomoci, například s nastavením telefonu.",
      next: "Otevřít mentoring",
      to: "/osobni-rust",
    },
    en: {
      actor: "Senior / mentor",
      subtitle: "Offers experience and craft",
      badge: "Personal growth · DEMO",
      title: "A mentor passes a practical skill to a younger generation",
      give: "A student receives hands-on guidance in woodworking and safe use of hand tools.",
      take: "If both sides want it, the meeting may lead to another agreed act of help, such as explaining smartphone settings.",
      next: "Open mentoring",
      to: "/osobni-rust",
    },
  },
  company: {
    accent: "blue",
    cs: {
      actor: "Firma / dílna",
      subtitle: "Nabízí čistý materiálový přebytek",
      badge: "Materiálový oběh · DEMO",
      title: "Čistý výrobní přebytek najde školní nebo komunitní využití",
      give: "Materiál, který by jinak zůstal bez využití, může posloužit pro dílnu, prototyp, záhon nebo komunitní projekt.",
      take: "Výsledek může být dobrovolně sdílen jako inspirace, metoda nebo navazující spolupráce — vždy transparentně a bez skrytého marketingového souhlasu.",
      next: "Otevřít školy & firmy",
      to: "/instituce",
    },
    en: {
      actor: "Company / workshop",
      subtitle: "Offers clean production surplus",
      badge: "Material circulation · DEMO",
      title: "Clean manufacturing surplus finds a school or community use",
      give: "Material that would otherwise remain unused can serve a workshop, prototype, garden bed or community project.",
      take: "The outcome may be shared voluntarily as inspiration, a method or follow-up cooperation — always transparent and never hidden marketing consent.",
      next: "Open schools & companies",
      to: "/instituce",
    },
  },
  school: {
    accent: "green",
    cs: {
      actor: "Škola / ekoklub",
      subtitle: "Mění potřebu v praktický projekt",
      badge: "Vševýchova v praxi · DEMO",
      title: "Školní projekt propojí materiál, dovednost a okolní komunitu",
      give: "Žáci se učí na skutečném problému a mohou výsledek dobrovolně sdílet jako dokumentaci, postup nebo inspiraci pro další článek komunity.",
      take: "Škola může získat dostupný materiál, mentoring nebo praktickou podporu — až po skutečné shodě v systému.",
      next: "Najít institucionální shodu",
      to: "/instituce",
    },
    en: {
      actor: "School / eco club",
      subtitle: "Turns a need into a practical project",
      badge: "Learning in practice · DEMO",
      title: "A school project connects material, skill and the surrounding community",
      give: "Students learn through a real problem and may voluntarily share the outcome as documentation, a reusable method or inspiration for another community participant.",
      take: "The school can receive available material, mentoring or practical support — only after a real match exists in the system.",
      next: "Find an institutional match",
      to: "/instituce",
    },
  },
};

const ACCENT = {
  amber: {
    button: "hover:border-amber-300 hover:bg-amber-50/70",
    active: "border-amber-400 bg-amber-50 ring-2 ring-amber-100",
    badge: "border-amber-200 bg-amber-100 text-amber-900",
    orb: "bg-amber-100",
  },
  blue: {
    button: "hover:border-blue-300 hover:bg-blue-50/70",
    active: "border-blue-400 bg-blue-50 ring-2 ring-blue-100",
    badge: "border-blue-200 bg-blue-100 text-blue-900",
    orb: "bg-blue-100",
  },
  green: {
    button: "hover:border-green-300 hover:bg-green-50/70",
    active: "border-green-400 bg-green-50 ring-2 ring-green-100",
    badge: "border-green-200 bg-green-100 text-green-900",
    orb: "bg-green-100",
  },
};

export default function CycleTrainer() {
  const { locale, isEnglish } = useLanguage();
  const [actor, setActor] = useState(null);
  const scenario = actor ? SCENARIOS[actor] : null;
  const data = scenario ? scenario[locale] : null;
  const accent = scenario ? ACCENT[scenario.accent] : null;

  const actorButtons = useMemo(() => ([
    ["senior", UsersRound],
    ["company", Building2],
    ["school", GraduationCap],
  ]), []);

  return (
    <section className="mx-auto w-full max-w-5xl px-5 pb-20">
      <div className="organic-card grid gap-7 rounded-[2rem] p-5 sm:p-7 lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2C5E3B]/8 px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-[#2C5E3B]">
            <RefreshCw size={13} /> {isEnglish ? "Interactive cycle trainer" : "Interaktivní trenažér koloběhu"}
          </span>
          <h2 className="mt-4 text-2xl font-black leading-tight text-stone-900 sm:text-3xl">
            {isEnglish ? "See how value can return through the ecosystem." : "Podívejte se, jak se může hodnota vracet organismem."}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-500">
            {isEnglish
              ? "Choose a role. The trainer explains a possible circulation path. It does not create a transaction or claim that anything happened."
              : "Vyberte roli. Trenažér ukáže možnou cestu oběhem. Nevytváří transakci ani netvrdí, že se něco opravdu uskutečnilo."}
          </p>

          <div className="mt-6 space-y-3">
            {actorButtons.map(([key, Icon]) => {
              const item = SCENARIOS[key];
              const label = item[locale];
              const style = ACCENT[item.accent];
              const active = actor === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActor(key)}
                  className={`w-full rounded-2xl border p-4 text-left transition duration-300 ${
                    active ? style.active : `border-stone-200 bg-stone-50/80 ${style.button}`
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.orb}`}>
                      <Icon size={21} />
                    </span>
                    <span>
                      <strong className="block text-sm text-stone-900">{label.actor}</strong>
                      <span className="mt-1 block text-[11px] text-stone-500">{label.subtitle}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] border border-stone-200/70 bg-[#F4F1EA] p-5 sm:p-7">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#D37A5A]/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#2C5E3B]/10 blur-3xl" />

          {!scenario ? (
            <div className="relative flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="trainer-orbit flex h-24 w-24 items-center justify-center rounded-full border border-stone-200 bg-white shadow-lg"><RefreshCw size={34} /></div>
              <h3 className="mt-6 text-lg font-black text-stone-800">
                {isEnglish ? "Waiting for an impulse…" : "Čekání na impuls…"}
              </h3>
              <p className="mt-2 max-w-sm text-xs leading-relaxed text-stone-500">
                {isEnglish
                  ? "Choose an actor on the left to reveal a model flow of value through Pansofie."
                  : "Vyberte vlevo článek komunity a zobrazí se modelový tok hodnoty napříč Pansofií."}
              </p>
            </div>
          ) : (
            <div key={actor} className="trainer-result relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${accent.badge}`}>
                  {data.badge}
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold text-stone-500">
                  {isEnglish ? "Possible circulation path" : "Možná cesta oběhem"}
                </span>
              </div>

              <div className="mt-7 flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm"><RefreshCw size={24}/></span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.16em] text-stone-400">{data.actor}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight text-stone-900">{data.title}</h3>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/90 bg-white/85 p-4 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#2C5E3B]">
                    {isEnglish ? "Value into the community" : "Užitek pro komunitu"}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">{data.give}</p>
                </div>
                <div className="rounded-2xl border border-white/90 bg-white/85 p-4 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#D37A5A]">
                    {isEnglish ? "Possible next step" : "Možný další krok"}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">{data.take}</p>
                </div>
              </div>

              <Link
                to={data.to}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-stone-700"
              >
                {data.next} <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
