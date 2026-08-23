import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Compass, HeartHandshake, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { safeReturnTo } from "@/lib/authReturnTo";
import { completeOnboarding } from "@/lib/pansofieOnboardingFlow";

const ROLES = {
  cs: [
    ["young_person", "Mladý člověk / student"],
    ["family", "Rodina"],
    ["educator", "Pedagog"],
    ["school", "Škola"],
    ["company", "Firma / organizace"],
    ["mentor", "Mentor / odborník"],
    ["nonprofit", "Spolek / nezisková organizace"],
    ["municipality", "Obec / město"],
    ["community", "Komunita"],
    ["other", "Jiná role"],
  ],
  en: [
    ["young_person", "Young person / student"],
    ["family", "Family"],
    ["educator", "Educator"],
    ["school", "School"],
    ["company", "Company / organization"],
    ["mentor", "Mentor / expert"],
    ["nonprofit", "Non-profit / association"],
    ["municipality", "Municipality / city"],
    ["community", "Community"],
    ["other", "Other role"],
  ],
};

const COPY = {
  cs: {
    eyebrow: "PRVNÍ VSTUP DO SÍTĚ",
    title: (name) => `Vítejte v Pansofii, ${name}.`,
    lead: "Právě vstupujete do otevřené sítě lidí, kteří chtějí spojovat poznání s lidskostí, odpovědností a skutečným činem. Pansofie není pasivní sociální síť ani skladiště textů. Má být živou dílnou.",
    pact: "Naše společná dohoda",
    values: [
      ["Přednost doptávání před křikem", "Hledáme pravdu v souvislostech. Neodměňujeme rychlé odsudky ani hlasitost."],
      ["Spolupráce místo soutěže", "Stavíme mosty mezi lidmi, školami, firmami a komunitami. Přínos vzniká společnou prací, ne pořadím v žebříčku."],
      ["Technologie jako sluha, ne pán", "Digitální nástroje používáme tam, kde pomáhají člověku, přírodě nebo porozumění — ne jako náhradu lidského úsudku."],
    ],
    mission: "Nultá mise: Otevřete brány",
    missionLead: "Řekněte síti, odkud přicházíte, co můžete nabídnout a co právě hledáte. Nejde o hodnocení osobnosti — jen o kontext, který může pomoci propojit správné lidi.",
    name: "Jak vám máme říkat?",
    location: "Region / město",
    role: "V jaké roli se dnes zapojujete?",
    offers: "S čím můžete pomoci?",
    offersPlaceholder: "Např. mentoring v IT, prostor pro workshop, zkušenost s ekologií…",
    seeks: "Co naopak hledáte nebo potřebujete?",
    seeksPlaceholder: "Např. partnera pro školní projekt, materiál do dílny, odbornou konzultaci…",
    complete: "Dokončit nultou misi",
    skip: "Přeskočit a otevřít Knihovnu nápravy",
    error: "Profil se nepodařilo uložit. Nic dalšího jsme nezměnili.",
    truth: "Údaje z profilu nejsou automaticky veřejným kontaktním adresářem. Přístup k osobním údajům zůstává řízený podle role a oprávnění.",
  },
  en: {
    eyebrow: "YOUR FIRST ENTRY INTO THE NETWORK",
    title: (name) => `Welcome to Pansofie, ${name}.`,
    lead: "You are entering an open network of people who want to connect knowledge with humanity, responsibility and real action. Pansofie is not a passive social network or a warehouse of texts. It is meant to become a living workshop.",
    pact: "Our shared agreement",
    values: [
      ["Ask before you shout", "We look for truth in context. We do not reward quick condemnation or volume."],
      ["Cooperation before competition", "We build bridges between people, schools, organizations and communities. Value comes from shared work, not rankings."],
      ["Technology as a servant, not a master", "We use digital tools where they help people, nature or understanding — not as a substitute for human judgement."],
    ],
    mission: "Zero mission: Open the gates",
    missionLead: "Tell the network where you are, what you can contribute and what you currently need. This is not a personality assessment — only context that can help connect the right people.",
    name: "What should we call you?",
    location: "Region / town",
    role: "Which role are you entering with today?",
    offers: "What can you help with?",
    offersPlaceholder: "For example IT mentoring, workshop space, ecology experience…",
    seeks: "What are you looking for or needing?",
    seeksPlaceholder: "For example a school-project partner, workshop material, expert advice…",
    complete: "Complete the zero mission",
    skip: "Skip and open the Repair Library",
    error: "The profile could not be saved. Nothing else was changed.",
    truth: "Profile information is not automatically a public contact directory. Personal-data access remains governed by roles and permissions.",
  },
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, profile, refreshUser } = useAuth();
  const { locale } = useLanguage();
  const lang = locale === "en" ? "en" : "cs";
  const copy = COPY[lang];
  const requestedDestination = safeReturnTo();
  const destination = requestedDestination === "/" || requestedDestination.startsWith("/onboarding") ? "/dashboard" : requestedDestination;
  const firstName = useMemo(() => (profile?.name || user?.email?.split("@")[0] || (lang === "en" ? "Pansofie member" : "člene Pansofie")).split(" ")[0], [profile?.name, user?.email, lang]);
  const [form, setForm] = useState({
    fullName: profile?.name || "",
    location: profile?.location || "",
    networkRole: profile?.networkRole || "",
    offersText: profile?.offersText || "",
    seeksText: profile?.seeksText || "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const saveAndGo = async (target, requireProfile) => {
    if (!user?.id || busy) return;
    if (requireProfile && (!form.fullName.trim() || !form.location.trim() || !form.networkRole)) return;
    setBusy(true);
    setError("");
    try {
      await completeOnboarding({ userId: user.id, ...form });
      await refreshUser();
      navigate(target, { replace: true });
    } catch (err) {
      console.error(err);
      setError(copy.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="r14-onboarding min-h-screen">
      <div className="r14-onboarding-shell">
        <section className="r14-onboarding-welcome">
          <span className="r14-onboarding-kicker"><Sparkles size={17} /> {copy.eyebrow}</span>
          <h1>{copy.title(firstName)}</h1>
          <p>{copy.lead}</p>
        </section>

        <section className="r14-onboarding-pact">
          <div className="r14-onboarding-section-title"><ShieldCheck size={22} /><div><span>PANSOFIE</span><h2>{copy.pact}</h2></div></div>
          <div className="r14-onboarding-values">
            {copy.values.map(([title, text], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className="r14-onboarding-mission">
          <div className="r14-onboarding-section-title"><Compass size={22} /><div><span>MISSION 0</span><h2>{copy.mission}</h2></div></div>
          <p className="r14-onboarding-mission-lead">{copy.missionLead}</p>
          <div className="r14-onboarding-form">
            <label>{copy.name}<input value={form.fullName} maxLength={120} onChange={(e) => setForm((v) => ({ ...v, fullName: e.target.value }))} /></label>
            <label>{copy.location}<input value={form.location} maxLength={160} onChange={(e) => setForm((v) => ({ ...v, location: e.target.value }))} /></label>
            <label>{copy.role}<select value={form.networkRole} onChange={(e) => setForm((v) => ({ ...v, networkRole: e.target.value }))}><option value="">—</option>{ROLES[lang].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label className="r14-onboarding-wide"><HeartHandshake size={17} /> {copy.offers}<textarea rows={3} maxLength={800} placeholder={copy.offersPlaceholder} value={form.offersText} onChange={(e) => setForm((v) => ({ ...v, offersText: e.target.value }))} /></label>
            <label className="r14-onboarding-wide"><Search size={17} /> {copy.seeks}<textarea rows={3} maxLength={800} placeholder={copy.seeksPlaceholder} value={form.seeksText} onChange={(e) => setForm((v) => ({ ...v, seeksText: e.target.value }))} /></label>
          </div>
          {error && <div className="r14-onboarding-error" role="alert">{error}</div>}
          <p className="r14-onboarding-truth">{copy.truth}</p>
          <div className="r14-onboarding-actions">
            <button type="button" disabled={busy || !form.fullName.trim() || !form.location.trim() || !form.networkRole} onClick={() => saveAndGo(destination, true)} className="action-primary">{copy.complete} <ArrowRight size={17} /></button>
            <button type="button" disabled={busy} onClick={() => saveAndGo("/knihovna", false)} className="action-secondary">{copy.skip}</button>
          </div>
        </section>
      </div>
    </main>
  );
}
