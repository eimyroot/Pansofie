import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Leaf,
  LockKeyhole,
  Mail,
  MapPin,
  School,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import LegacyOnboardingR14 from "@/components/pansofie/LegacyOnboardingR14";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { safeReturnTo } from "@/lib/authReturnTo";
import { completeAdultOnboarding } from "@/lib/pansofieOnboardingFlow";
import "@/adult-onboarding-r18.css";

const TRACKS = {
  cs: [
    {
      key: "education",
      icon: School,
      eyebrow: "ŠKOLY A VZDĚLÁVÁNÍ",
      title: "Chci rozvíjet školy a žáky",
      description: "Jsem pedagog, ředitel nebo vzdělavatel a hledám praktické scénáře pro kritický rozum, dialog a skutečnou zkušenost.",
      welcome: (name) => `Vítejte v Dílně lidskosti, ${name}!`,
      welcomeText: "První vstup je dokončen. Pansofie vám teď zpřístupní vzdělávací nástroje a workflow odpovídající této cestě.",
      missionTitle: "Nultá mise · Labyrint algoritmů",
      missionText: "Projděte si veřejnou mini-zkušenost a podívejte se, jak lze v hodině proměnit virální emoci v ověřování zdrojů, důkaz a reflexi.",
      action: "Spustit ukázkový scénář",
      to: "/pro-koho#ochutnejte",
    },
    {
      key: "wise_business",
      icon: BriefcaseBusiness,
      eyebrow: "FIRMY A TÝMY",
      title: "Chci budovat moudré podnikání",
      description: "Zastupuji firmu nebo vedu tým a chci pracovat s etikou technologií, pozorností a lidskou odpovědností bez prázdných certifikátů.",
      welcome: (name) => `Vítejte na cestě k moudrému podnikání, ${name}!`,
      welcomeText: "První vstup je dokončen. Další krok je praktický: projít jednu konkrétní technologii přes otázky dopadu, dat a lidské kontroly.",
      missionTitle: "Nultá mise · Etický kompas",
      missionText: "Použijte pracovní checklist na jednu reálnou AI nebo digitální službu ve vašem týmu. Výstupem má být seznam rizik a dalších kroků, ne skóre firmy.",
      action: "Otevřít Etický kompas",
      href: "/materials/pansofie-eticky-kompas-ai-checklist.md",
    },
    {
      key: "circular_ecology",
      icon: Leaf,
      eyebrow: "CIRKULÁRNÍ EKOLOGIE",
      title: "Chci zapojit cirkulární ekologii",
      description: "Chci propojovat skutečné nabídky a potřeby materiálů, technologií a vybavení tak, aby výsledky reálně sloužily dál.",
      welcome: (name) => `Vítejte v Materiálovém mostu, ${name}!`,
      welcomeText: "První vstup je dokončen. Cirkulární stopa vzniká až skutečnou nabídkou, rezervací, předáním a doloženým použitím — ne pouhým kliknutím.",
      missionTitle: "Nultá mise · První reálné propojení",
      missionText: "Otevřete pracovní prostor Materiálového mostu a přidejte skutečnou nabídku nebo potřebu ve svém regionu. Nic se veřejně nezobrazí bez pravidel moderace a souhlasu.",
      action: "Otevřít Materiálový most",
      to: "/materialovy-most/workspace",
    },
  ],
  en: [
    {
      key: "education",
      icon: School,
      eyebrow: "SCHOOLS & EDUCATION",
      title: "I want to develop schools and learners",
      description: "I am an educator, school leader or learning professional looking for practical scenarios for critical judgement, dialogue and real experience.",
      welcome: (name) => `Welcome to the workshop of humanity, ${name}!`,
      welcomeText: "Your first entry is complete. Pansofie can now point you to education tools and workflows that fit this path.",
      missionTitle: "Zero mission · Algorithm Labyrinth",
      missionText: "Try the public mini-experience and see how a viral emotional moment can become source checking, evidence and reflection in a lesson.",
      action: "Launch the sample scenario",
      to: "/pro-koho#ochutnejte",
    },
    {
      key: "wise_business",
      icon: BriefcaseBusiness,
      eyebrow: "COMPANIES & TEAMS",
      title: "I want to build wiser business",
      description: "I represent an organization or lead a team and want to work with technology ethics, attention and human accountability without empty certification claims.",
      welcome: (name) => `Welcome to the path of wiser business, ${name}!`,
      welcomeText: "Your first entry is complete. The next step is practical: examine one concrete technology through impact, data and human-control questions.",
      missionTitle: "Zero mission · Ethical Compass",
      missionText: "Apply the working checklist to one real AI or digital service in your team. The output should be risks and next steps, not a company score.",
      action: "Open the Ethical Compass",
      href: "/materials/pansofie-eticky-kompas-ai-checklist.md",
    },
    {
      key: "circular_ecology",
      icon: Leaf,
      eyebrow: "CIRCULAR ECOLOGY",
      title: "I want to join circular ecology",
      description: "I want to connect real material, technology and equipment offers with real needs so useful outcomes can continue serving people.",
      welcome: (name) => `Welcome to the Material Bridge, ${name}!`,
      welcomeText: "Your first entry is complete. A circular trace begins with a real offer, reservation, handover and evidenced use — not a click alone.",
      missionTitle: "Zero mission · First real connection",
      missionText: "Open the Material Bridge workspace and add a real offer or need in your region. Nothing becomes public without the moderation and consent rules.",
      action: "Open Material Bridge",
      to: "/materialovy-most/workspace",
    },
  ],
};

const COPY = {
  cs: {
    steps: ["Základní údaje", "Pansofická role", "Nultá mise"],
    eyebrow: "PRVNÍ VSTUP · DOSPĚLÍ",
    title: "Tři kroky. Žádné body. Hned k prvnímu skutečnému kroku.",
    intro: "Účet už vznikl v řízeném kontextu pozvánky. Teď jen doplníte základní údaje, zvolíte svou první pansofickou cestu a dostanete konkrétní Nultou misi.",
    basicsTitle: "Základní údaje",
    basicsLead: "Heslo zde z bezpečnostních důvodů znovu nečteme ani neukládáme. Chrání už váš pozvaný účet.",
    name: "Jméno a příjmení",
    email: "E-mail pozvaného účtu",
    location: "Region / město",
    consentPrefix: "Chci se připojit k síti Pansofie, souhlasím s",
    terms: "podmínkami platformy",
    consentMiddle: "a beru na vědomí",
    code: "kodex slušného dialogu",
    continue: "Pokračovat do sítě",
    roleTitle: "Jakým dílem chcete přispět k nápravě?",
    roleLead: "Vyberte první cestu. Nejde o osobnostní typ ani trvalou nálepku; později můžete pracovat i v dalších rolích podle skutečného kontextu.",
    back: "Zpět",
    saving: "Ukládám bezpečně…",
    error: "První vstup se nepodařilo dokončit. Nic jsme nepředstírali jako uložené.",
    backendUnavailable: "R18 onboarding ještě není aktivovaný v databázi tohoto prostředí. Používáme proto bezpečný předchozí onboarding.",
    missionKicker: "NULTÁ MISE",
    secondary: "Přejít na můj dashboard",
    truth: "Volba cesty není skóre člověka ani automatické členství v konkrétní škole, firmě nebo komunitě. Reálná oprávnění se dál řídí skutečnými membershipy a workflow.",
  },
  en: {
    steps: ["Basic details", "Pansophic path", "Zero mission"],
    eyebrow: "FIRST ENTRY · ADULTS",
    title: "Three steps. No points. Straight to a first real action.",
    intro: "Your account already exists in a governed invitation context. Now add the basics, choose your first Pansofie path and receive a concrete Zero mission.",
    basicsTitle: "Basic details",
    basicsLead: "For security, we do not read or store your password again here. It already protects your invited account.",
    name: "Full name",
    email: "Invited account email",
    location: "Region / town",
    consentPrefix: "I want to join the Pansofie network, agree to the",
    terms: "platform terms",
    consentMiddle: "and acknowledge the",
    code: "respectful-dialogue code",
    continue: "Continue to the network",
    roleTitle: "How do you want to contribute first?",
    roleLead: "Choose a first path. This is not a personality type or permanent label; you can work in other roles later when the real context calls for it.",
    back: "Back",
    saving: "Saving securely…",
    error: "The first entry could not be completed. We have not presented anything as saved.",
    backendUnavailable: "R18 onboarding is not enabled in this environment's database yet. The safe previous onboarding is used instead.",
    missionKicker: "ZERO MISSION",
    secondary: "Go to my dashboard",
    truth: "Choosing a path is not a person score or automatic membership in a school, company or community. Real permissions remain governed by actual memberships and workflows.",
  },
};

function Progress({ step, labels }) {
  return (
    <div className="r18-progress" aria-label="Onboarding progress">
      {labels.map((label, index) => {
        const number = index + 1;
        const state = number < step ? "done" : number === step ? "active" : "pending";
        return (
          <React.Fragment key={label}>
            {index > 0 && <span className="r18-progress-line" data-done={number <= step} aria-hidden="true" />}
            <div className="r18-progress-step" data-state={state}>
              <span>{state === "done" ? <CheckCircle2 size={14} /> : number}</span>
              <small>{label}</small>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function AdultOnboardingR18() {
  const navigate = useNavigate();
  const { user, profile, refreshUser } = useAuth();
  const { locale } = useLanguage();
  const lang = locale === "en" ? "en" : "cs";
  const copy = COPY[lang];
  const tracks = TRACKS[lang];
  const requestedDestination = safeReturnTo();
  const destination = requestedDestination === "/" || requestedDestination.startsWith("/onboarding") ? "/dashboard" : requestedDestination;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: profile?.name || "",
    location: profile?.location || "",
  });
  const [consent, setConsent] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(profile?.onboardingTrack || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const firstName = useMemo(
    () => (form.fullName.trim() || profile?.name || user?.email?.split("@")[0] || (lang === "en" ? "Pansofie member" : "člene Pansofie")).split(" ")[0],
    [form.fullName, profile?.name, user?.email, lang],
  );
  const activeTrack = tracks.find((item) => item.key === selectedTrack) || null;
  const canContinue = Boolean(form.fullName.trim() && form.location.trim() && consent);

  const chooseTrack = async (track) => {
    if (busy) return;
    setSelectedTrack(track.key);
    setBusy(true);
    setError("");
    try {
      await completeAdultOnboarding({
        fullName: form.fullName,
        location: form.location,
        onboardingTrack: track.key,
        offersText: profile?.offersText || "",
        seeksText: profile?.seeksText || "",
      });
      await refreshUser();
      setStep(3);
    } catch (err) {
      console.error(err);
      setError(copy.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="r18-onboarding">
      <div className="r18-orb r18-orb--violet" aria-hidden="true" />
      <div className="r18-orb r18-orb--amber" aria-hidden="true" />
      <div className="r18-orb r18-orb--green" aria-hidden="true" />

      <section className="r18-shell">
        <div className="r18-brand"><span><Sparkles size={15} /></span><strong>PANSOFIE</strong><small>{copy.eyebrow}</small></div>
        <Progress step={step} labels={copy.steps} />

        {step === 1 && (
          <div className="r18-panel" data-step="1">
            <div className="r18-panel-copy">
              <span className="r18-kicker"><ShieldCheck size={16} /> {copy.basicsTitle}</span>
              <h1>{copy.title}</h1>
              <p>{copy.intro}</p>
            </div>

            <div className="r18-form-grid">
              <label>
                <span>{copy.name}</span>
                <div className="r18-input-wrap"><Sparkles size={16} /><input value={form.fullName} maxLength={120} autoComplete="name" onChange={(e) => setForm((value) => ({ ...value, fullName: e.target.value }))} /></div>
              </label>
              <label>
                <span>{copy.email}</span>
                <div className="r18-input-wrap is-readonly"><Mail size={16} /><input value={user?.email || ""} readOnly aria-readonly="true" /></div>
              </label>
              <label>
                <span>{copy.location}</span>
                <div className="r18-input-wrap"><MapPin size={16} /><input value={form.location} maxLength={160} autoComplete="address-level2" onChange={(e) => setForm((value) => ({ ...value, location: e.target.value }))} /></div>
              </label>
            </div>

            <div className="r18-password-boundary"><LockKeyhole size={16} /><span>{copy.basicsLead}</span></div>

            <label className="r18-consent">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>{copy.consentPrefix} <Link to="/podminky" target="_blank">{copy.terms}</Link> {copy.consentMiddle} <Link to="/podminky#kodex-dialogu" target="_blank">{copy.code}</Link>.</span>
            </label>

            <button type="button" className="r18-primary" disabled={!canContinue} onClick={() => setStep(2)}>{copy.continue} <ArrowRight size={17} /></button>
          </div>
        )}

        {step === 2 && (
          <div className="r18-panel" data-step="2">
            <div className="r18-panel-copy">
              <span className="r18-kicker"><Sparkles size={16} /> PANSOFIE · 02</span>
              <h1>{copy.roleTitle}</h1>
              <p>{copy.roleLead}</p>
            </div>

            <div className="r18-track-grid">
              {tracks.map((track) => {
                const Icon = track.icon;
                return (
                  <button key={track.key} type="button" className="r18-track" data-track={track.key} data-selected={selectedTrack === track.key} disabled={busy} onClick={() => chooseTrack(track)}>
                    <span className="r18-track-icon"><Icon size={23} /></span>
                    <span className="r18-track-copy"><small>{track.eyebrow}</small><strong>{track.title}</strong><span>{track.description}</span></span>
                    <ArrowRight size={17} className="r18-track-arrow" />
                  </button>
                );
              })}
            </div>

            {busy && <div className="r18-saving" role="status"><span className="r18-spinner" /> {copy.saving}</div>}
            {error && <div className="r18-error" role="alert">{error}</div>}
            <p className="r18-truth">{copy.truth}</p>
            <button type="button" className="r18-back" disabled={busy} onClick={() => setStep(1)}><ArrowLeft size={15} /> {copy.back}</button>
          </div>
        )}

        {step === 3 && activeTrack && (
          <div className="r18-panel r18-panel--welcome" data-step="3" data-track={activeTrack.key}>
            <div className="r18-success-mark"><CheckCircle2 size={26} /></div>
            <span className="r18-kicker">{copy.missionKicker}</span>
            <h1>{activeTrack.welcome(firstName)}</h1>
            <p className="r18-welcome-lead">{activeTrack.welcomeText}</p>

            <article className="r18-mission-card">
              <span>{activeTrack.eyebrow}</span>
              <h2>{activeTrack.missionTitle}</h2>
              <p>{activeTrack.missionText}</p>
              {activeTrack.to ? (
                <Link to={activeTrack.to} className="r18-primary">{activeTrack.action} <ArrowRight size={17} /></Link>
              ) : (
                <a href={activeTrack.href} className="r18-primary">{activeTrack.action} <ArrowRight size={17} /></a>
              )}
            </article>

            <button type="button" className="r18-secondary" onClick={() => navigate(destination, { replace: true })}>{copy.secondary}</button>
            <p className="r18-truth">{copy.truth}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default function Onboarding() {
  const { profile } = useAuth();
  if (!profile?.adultOnboardingSupported) return <LegacyOnboardingR14 />;
  return <AdultOnboardingR18 />;
}
