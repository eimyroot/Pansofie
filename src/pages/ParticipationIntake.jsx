import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, Download, School, Send } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { useLanguage } from "@/lib/LanguageContext";
import { submitAudienceIntake } from "@/lib/pansofieParticipationFlow";

const PILLARS = {
  school: {
    cs: [
      ["know_self", "POZNEJ SEBE", "Chci, aby se žáci uměli soustředit, nenechali se ovládat mobily a trénovali vlastní kritický rozum."],
      ["create_together", "TVOŘ S DRUHÝMI", "Chci ve třídě omezit zbytečné konflikty a učit děti spolupracovat, naslouchat si a tvořit v týmech."],
      ["improve_world", "ZLEPŠUJ SVĚT", "Chci děti víc propojovat s přírodou, ekologií v souvislostech a odpovědností za své okolí."],
    ],
    en: [
      ["know_self", "KNOW YOURSELF", "I want learners to strengthen attention, resist digital overload and train their own critical judgement."],
      ["create_together", "CREATE WITH OTHERS", "I want to reduce unproductive conflict and help learners cooperate, listen and create in teams."],
      ["improve_world", "IMPROVE THE WORLD", "I want to connect learners more deeply with nature, systems ecology and responsibility for their surroundings."],
    ],
  },
  company: {
    cs: [
      ["know_self", "VNITŘNÍ KLID A POZORNOST", "Náš tým je digitálně přetížený a potřebujeme zdravější práci s pozorností."],
      ["create_together", "SKUTEČNÝ DIALOG", "Potřebujeme otevřenější kulturu, ve které lidé umějí naslouchat oponentům a společně stavět řešení."],
      ["improve_world", "ETIKA INOVACÍ A AI", "Používáme nebo vyvíjíme technologie a chceme lépe pracovat s dopadem, odpovědností a lidskou kontrolou."],
    ],
    en: [
      ["know_self", "ATTENTION AND INNER BALANCE", "Our team is digitally overloaded and needs a healthier relationship with attention."],
      ["create_together", "REAL DIALOGUE", "We need a more open culture where people can hear opposing views and build solutions together."],
      ["improve_world", "ETHICS OF INNOVATION AND AI", "We use or build technology and want to handle impact, responsibility and human oversight more carefully."],
    ],
  },
};

const COPY = {
  school: {
    cs: {
      eyebrow: "PANSOFIE SCHOOL · PILOTNÍ INTAKE",
      title: "Kdo s námi chce měnit svět vzdělávání?",
      lead: "Nejde o registraci do hotové služby. Je to vstup do řízeného pilotního rozhovoru o tom, co vaše škola skutečně potřebuje a co má smysl bezpečně ověřit v praxi.",
      org: "Škola",
      pillars: "Který z pilířů Pansofie chcete u svých žáků probudit nejvíce?",
      digital: "Jak dnes ve škole prožíváte technologie a AI?",
      digitalOptions: [
        "Mobily a digitální nástroje žáky často zahlcují a odvádějí jejich pozornost.",
        "Chceme technologie a AI využívat moudře, ale chybí nám lidsky srozumitelný rámec a praktické postupy.",
      ],
      message: "Váš vzkaz do pansofické sítě",
      placeholder: "Napište nám, jakou největší radost nebo starost teď ve své třídě prožíváte.",
      submit: "Odeslat zájem školy",
      successTitle: "Děkujeme. Váš zájem je bezpečně přijat k pilotnímu review.",
      successBody: "Tímto ještě nevznikl účet ani závazná spolupráce. Tým Pansofie nejdřív ověří, zda umíme vaši potřebu smysluplně a bezpečně pokrýt.",
    },
    en: {
      eyebrow: "PANSOFIE SCHOOL · PILOT INTAKE",
      title: "Who wants to help reshape learning with us?",
      lead: "This is not registration for a finished service. It is an entry into a governed pilot conversation about what your school actually needs and what is worth testing safely in practice.",
      org: "School",
      pillars: "Which Pansofie pillar do you most want to awaken in your learners?",
      digital: "How does your school currently experience technology and AI?",
      digitalOptions: [
        "Phones and digital tools often overwhelm learners and fragment their attention.",
        "We want to use technology and AI wisely, but we lack a human-centred framework and practical methods.",
      ],
      message: "Your message to the Pansofie network",
      placeholder: "Tell us about the biggest joy or concern you are experiencing in your classroom right now.",
      submit: "Send school interest",
      successTitle: "Thank you. Your interest has been received for pilot review.",
      successBody: "This does not yet create an account or a binding collaboration. The Pansofie team first checks whether we can address the need meaningfully and safely.",
    },
  },
  company: {
    cs: {
      eyebrow: "PANSOFIE PARTNER · PILOTNÍ INTAKE",
      title: "Kdo do své firmy hledá moudrost a rovnováhu?",
      lead: "Neprodáváme instantní certifikát ani univerzální HR školení. Zajímá nás konkrétní problém, kterému váš tým čelí, a zda z něj lze vytvořit smysluplnou, ohraničenou zkušenost.",
      org: "Firma / organizace",
      position: "Pozice",
      pillars: "Kterou pansofickou hodnotu potřebuje váš tým momentálně nejvíce posílit?",
      teamSize: "S jak velkou skupinou lidí chcete pracovat?",
      challenge: "Jaká je vaše největší výzva v digitálním věku?",
      submit: "Odeslat partnerský zájem",
      successTitle: "Děkujeme. Partnerský zájem je přijat k posouzení.",
      successBody: "Tímto ještě nevznikl účet, workshop ani termín konzultace. Nejprve ověříme zadání a další krok navrhneme podle skutečného kontextu.",
    },
    en: {
      eyebrow: "PANSOFIE PARTNER · PILOT INTAKE",
      title: "Who is looking for more wisdom and balance in their organization?",
      lead: "We do not sell an instant certificate or a one-size-fits-all HR course. We want to understand a concrete problem your team faces and whether it can become a meaningful, bounded Experience.",
      org: "Company / organization",
      position: "Role / position",
      pillars: "Which Pansofie value does your team most need to strengthen now?",
      teamSize: "How large is the group you want to work with?",
      challenge: "What is your biggest challenge in the digital age?",
      submit: "Send partner interest",
      successTitle: "Thank you. Your partner interest has been received for review.",
      successBody: "This does not yet create an account, workshop or consultation date. We first verify the brief and propose the next step based on the real context.",
    },
  },
};

export default function ParticipationIntake() {
  const { audience } = useParams();
  const kind = audience === "firma" ? "company" : "school";
  const { locale } = useLanguage();
  const copy = COPY[kind][locale] || COPY[kind].cs;
  const pillars = PILLARS[kind][locale] || PILLARS[kind].cs;
  const Icon = kind === "school" ? School : Building2;
  const [form, setForm] = useState({
    fullName: "",
    organizationName: "",
    positionTitle: "",
    email: "",
    pillarInterests: [],
    digitalState: "",
    teamSize: "",
    primaryChallenge: "",
    message: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const valid = useMemo(() => (
    form.fullName.trim().length >= 2
    && form.organizationName.trim().length >= 2
    && /.+@.+\..+/.test(form.email)
    && form.pillarInterests.length > 0
    && (kind === "school" ? Boolean(form.digitalState) : Boolean(form.primaryChallenge.trim()))
  ), [form, kind]);

  const togglePillar = (value) => {
    setForm((current) => ({
      ...current,
      pillarInterests: current.pillarInterests.includes(value)
        ? current.pillarInterests.filter((item) => item !== value)
        : [...current.pillarInterests, value].slice(0, 3),
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setError("");
    try {
      await submitAudienceIntake({
        ...form,
        audienceKind: kind,
        locale,
        source: `public-intake-${kind}-r14`,
      });
      setSubmitted(true);
    } catch (err) {
      setError(locale === "en"
        ? "This staging environment does not yet have the R14 intake backend enabled. Your data was not accepted or stored."
        : "V tomto staging prostředí zatím není aktivovaný R14 intake backend. Vaše údaje nebyly přijaty ani uloženy.");
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen r14-intake-page">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="r14-intake-hero">
          <div className="container-px max-w-5xl mx-auto py-12 sm:py-16">
            <Link to={kind === "school" ? "/pro-koho/skoly" : "/pro-koho/firmy"} className="r14-back"><ArrowLeft size={16} /> {locale === "en" ? "Back" : "Zpět"}</Link>
            <span className="r14-intake-kicker"><Icon size={18} /> {copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <p>{copy.lead}</p>
          </div>
        </section>

        <section className="r14-intake-body">
          <div className="container-px max-w-4xl mx-auto py-12 sm:py-16">
            {submitted ? (
              <div className="r14-intake-success" role="status">
                <CheckCircle2 size={34} />
                <h2>{copy.successTitle}</h2>
                <p>{copy.successBody}</p>
                {kind === "school" && (
                  <a href="/materials/pansofie-ukazkova-lekce-kriticke-mysleni.md" download className="action-primary">
                    <Download size={17} /> {locale === "en" ? "Download the sample critical-thinking lesson" : "Stáhnout ukázkovou lekci kritického myšlení"}
                  </a>
                )}
                <Link to="/pro-koho" className="action-secondary">{locale === "en" ? "Back to audiences" : "Zpět na Pro koho"}</Link>
              </div>
            ) : (
              <form onSubmit={submit} className="r14-intake-form">
                <fieldset>
                  <legend>1. {copy.title}</legend>
                  <div className="r14-form-grid">
                    <label><span>{locale === "en" ? "Name" : "Jméno"}</span><input required maxLength={120} value={form.fullName} onChange={(e) => setForm((v) => ({ ...v, fullName: e.target.value }))} /></label>
                    <label><span>{copy.org}</span><input required maxLength={180} value={form.organizationName} onChange={(e) => setForm((v) => ({ ...v, organizationName: e.target.value }))} /></label>
                    {kind === "company" && <label><span>{copy.position}</span><input maxLength={140} value={form.positionTitle} onChange={(e) => setForm((v) => ({ ...v, positionTitle: e.target.value }))} /></label>}
                    <label><span>{locale === "en" ? "Email" : "E-mail"}</span><input required type="email" autoComplete="email" maxLength={254} value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} /></label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>2. {copy.pillars}</legend>
                  <div className="r14-choice-stack">
                    {pillars.map(([value, title, text]) => (
                      <label key={value} className="r14-choice-card">
                        <input type="checkbox" checked={form.pillarInterests.includes(value)} onChange={() => togglePillar(value)} />
                        <span><strong>{title}</strong><small>{text}</small></span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {kind === "school" ? (
                  <>
                    <fieldset>
                      <legend>3. {copy.digital}</legend>
                      <div className="r14-choice-stack">
                        {copy.digitalOptions.map((option) => (
                          <label key={option} className="r14-choice-card">
                            <input type="radio" name="digital-state" value={option} checked={form.digitalState === option} onChange={(e) => setForm((v) => ({ ...v, digitalState: e.target.value }))} />
                            <span><small>{option}</small></span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend>4. {copy.message}</legend>
                      <label><textarea maxLength={3000} rows={5} placeholder={copy.placeholder} value={form.message} onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))} /></label>
                    </fieldset>
                  </>
                ) : (
                  <>
                    <fieldset>
                      <legend>3. {copy.teamSize}</legend>
                      <label><input maxLength={120} placeholder={locale === "en" ? "e.g. 8–12 people" : "např. 8–12 lidí"} value={form.teamSize} onChange={(e) => setForm((v) => ({ ...v, teamSize: e.target.value }))} /></label>
                    </fieldset>
                    <fieldset>
                      <legend>4. {copy.challenge}</legend>
                      <label><textarea required maxLength={3000} rows={6} value={form.primaryChallenge} onChange={(e) => setForm((v) => ({ ...v, primaryChallenge: e.target.value }))} /></label>
                    </fieldset>
                  </>
                )}

                {error && <div className="r14-intake-error" role="alert">{error}</div>}
                <button type="submit" disabled={!valid || busy} className="action-primary r14-submit">
                  {busy ? (locale === "en" ? "Sending…" : "Odesílám…") : copy.submit} <Send size={17} />
                </button>
                <p className="r14-form-truth">{locale === "en" ? "Submitting this form does not automatically create an account, booking, workshop or certification." : "Odeslání formuláře automaticky nevytváří účet, rezervaci, workshop ani certifikaci."}</p>
              </form>
            )}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
