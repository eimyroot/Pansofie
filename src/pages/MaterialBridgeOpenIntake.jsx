import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Boxes, CheckCircle2, Send, ShieldCheck } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { useLanguage } from "@/lib/LanguageContext";
import { CZECH_REGIONS, MATERIAL_CATEGORIES, MATERIAL_CONDITIONS } from "@/lib/pansofieParticipationFlow";
import { submitMaterialBridgeIntake } from "@/lib/pansofieMaterialIntakeFlow";

const ACTORS = {
  cs: [
    ["individual", "Jednotlivec"],
    ["family", "Rodina"],
    ["school", "Škola / pedagog"],
    ["company", "Firma / organizace"],
    ["nonprofit", "Spolek / nezisková organizace"],
    ["municipality", "Obec / město"],
    ["community", "Komunita / komunitní centrum"],
  ],
  en: [
    ["individual", "Individual"],
    ["family", "Family"],
    ["school", "School / educator"],
    ["company", "Company / organization"],
    ["nonprofit", "Non-profit / association"],
    ["municipality", "Municipality / city"],
    ["community", "Community / community centre"],
  ],
};

const COPY = {
  cs: {
    eyebrow: "MATERIÁLOVÝ MOST · PRO VŠECHNY",
    title: "Máte něco užitečného — nebo něco smysluplně potřebujete?",
    lead: "Jednotlivec, rodina, škola, firma, spolek, obec i komunita mohou poslat nabídku nebo poptávku. Veřejné podání se nejdřív moderuje; nevzniká z něj automaticky veřejná nabídka ani rezervace.",
    actor: "Kdo se zapojuje?",
    name: "Jméno",
    email: "E-mail",
    org: "Organizace / škola / komunita (nepovinné)",
    type: "Co chcete udělat?",
    offer: "Nabídnout věc nebo materiál",
    request: "Poptat věc nebo materiál",
    titleField: "Co nabízíte nebo sháníte?",
    category: "Kategorie",
    condition: "Stav",
    quantity: "Množství",
    region: "Kraj",
    locality: "Město / obec",
    description: "Krátký popis",
    handoff: "Možný způsob předání",
    pickup: "Osobní odběr",
    delivery: "Mohu dovézt / zajistit místní předání",
    shipping: "Pošta / kurýr",
    involvement: "Chcete se zapojit i osobně?",
    feedback: "Rád/a bych dostal/a zprávu, co z materiálu vzniklo.",
    help: "Mohu nabídnout pomoc s instalací, opravou nebo workshopem.",
    submit: "Poslat do moderovaného vstupu",
    truth: "Toto je veřejný vstup do sítě. Nabídka se nezveřejní automaticky. Nejdřív proběhne kontrola kontaktu, bezpečnosti, stavu a logistiky.",
    successTitle: "Děkujeme. Podání jsme přijali k ověření.",
    successBody: "Nic jsme automaticky nezveřejnili ani nerezervovali. Po ověření může být podání převedeno do skutečného Materiálového mostu se stavem AVAILABLE.",
    back: "Zpět na Materiálový most",
    error: "Podání se nepodařilo uložit. R14 intake backend nemusí být v tomto prostředí ještě aktivní.",
  },
  en: {
    eyebrow: "MATERIAL BRIDGE · FOR EVERYONE",
    title: "Do you have something useful — or genuinely need something?",
    lead: "Individuals, families, schools, companies, non-profits, municipalities and communities can submit an offer or request. Public submissions are moderated first; they do not become a public listing or reservation automatically.",
    actor: "Who is taking part?",
    name: "Name",
    email: "Email",
    org: "Organization / school / community (optional)",
    type: "What do you want to do?",
    offer: "Offer an item or material",
    request: "Request an item or material",
    titleField: "What are you offering or looking for?",
    category: "Category",
    condition: "Condition",
    quantity: "Quantity",
    region: "Region",
    locality: "Town / municipality",
    description: "Short description",
    handoff: "Possible handover methods",
    pickup: "Collection in person",
    delivery: "I can deliver / arrange local handover",
    shipping: "Post / courier",
    involvement: "Would you like to take part personally too?",
    feedback: "I would like to receive a note about what the material became.",
    help: "I can help with installation, repair or a workshop.",
    submit: "Send to moderated intake",
    truth: "This is a public entry point into the network. Nothing is published automatically. Contact, safety, condition and logistics are checked first.",
    successTitle: "Thank you. Your submission has been received for review.",
    successBody: "Nothing has been published or reserved automatically. After verification, the submission may be converted into a real Material Bridge listing with AVAILABLE status.",
    back: "Back to Material Bridge",
    error: "The submission could not be saved. The R14 intake backend may not yet be enabled in this environment.",
  },
};

const initial = {
  actorKind: "individual",
  fullName: "",
  email: "",
  organizationName: "",
  listingType: "offer",
  title: "",
  category: "technology",
  conditionStatus: "like_new",
  quantity: "",
  region: "Hlavní město Praha",
  locality: "",
  description: "",
  handoffMethods: [],
  personalInvolvement: [],
};

function toggle(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function MaterialBridgeOpenIntake() {
  const { locale } = useLanguage();
  const lang = locale === "en" ? "en" : "cs";
  const copy = COPY[lang];
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await submitMaterialBridgeIntake({ ...form, locale: lang });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(copy.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen r14-intake-page r14-material-open-intake">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="r14-intake-hero">
          <div className="container-px max-w-5xl mx-auto py-14 sm:py-20">
            <Link to="/materialovy-most" className="r14-back-link"><ArrowLeft size={16} /> {copy.back}</Link>
            <span className="r14-intake-kicker"><Boxes size={18} /> {copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <p>{copy.lead}</p>
          </div>
        </section>

        <section className="r14-intake-body">
          <div className="container-px max-w-4xl mx-auto py-14 sm:py-20">
            {success ? (
              <div className="r14-intake-success" role="status">
                <CheckCircle2 size={30} />
                <h2>{copy.successTitle}</h2>
                <p>{copy.successBody}</p>
                <Link to="/materialovy-most" className="action-primary">{copy.back}</Link>
              </div>
            ) : (
              <form onSubmit={submit} className="r14-intake-form">
                <fieldset>
                  <legend>{copy.actor}</legend>
                  <div className="r14-form-grid">
                    <label>{copy.actor}<select value={form.actorKind} onChange={(e) => setForm((v) => ({ ...v, actorKind: e.target.value }))}>{ACTORS[lang].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                    <label>{copy.name}<input required minLength={2} maxLength={120} value={form.fullName} onChange={(e) => setForm((v) => ({ ...v, fullName: e.target.value }))} /></label>
                    <label>{copy.email}<input required type="email" maxLength={254} value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} /></label>
                    <label>{copy.org}<input maxLength={180} value={form.organizationName} onChange={(e) => setForm((v) => ({ ...v, organizationName: e.target.value }))} /></label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>{copy.type}</legend>
                  <div className="r14-choice-stack">
                    <label className="r14-choice-card"><input type="radio" name="listing-type" checked={form.listingType === "offer"} onChange={() => setForm((v) => ({ ...v, listingType: "offer" }))} /><span><strong>{copy.offer}</strong></span></label>
                    <label className="r14-choice-card"><input type="radio" name="listing-type" checked={form.listingType === "request"} onChange={() => setForm((v) => ({ ...v, listingType: "request" }))} /><span><strong>{copy.request}</strong></span></label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>{copy.titleField}</legend>
                  <div className="r14-form-grid">
                    <label>{copy.titleField}<input required minLength={3} maxLength={180} value={form.title} onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))} /></label>
                    <label>{copy.category}<select value={form.category} onChange={(e) => setForm((v) => ({ ...v, category: e.target.value }))}>{MATERIAL_CATEGORIES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                    {form.listingType === "offer" && <label>{copy.condition}<select value={form.conditionStatus} onChange={(e) => setForm((v) => ({ ...v, conditionStatus: e.target.value }))}>{MATERIAL_CONDITIONS.filter(([value]) => value !== "not_applicable").map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>}
                    <label>{copy.quantity}<input maxLength={120} value={form.quantity} onChange={(e) => setForm((v) => ({ ...v, quantity: e.target.value }))} /></label>
                    <label>{copy.region}<select value={form.region} onChange={(e) => setForm((v) => ({ ...v, region: e.target.value }))}>{CZECH_REGIONS.map((region) => <option key={region} value={region}>{region}</option>)}</select></label>
                    <label>{copy.locality}<input maxLength={160} value={form.locality} onChange={(e) => setForm((v) => ({ ...v, locality: e.target.value }))} /></label>
                  </div>
                  <label>{copy.description}<textarea rows={5} maxLength={3000} value={form.description} onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))} /></label>
                </fieldset>

                <fieldset>
                  <legend>{copy.handoff}</legend>
                  <div className="r14-choice-stack">
                    {[["pickup", copy.pickup], ["delivery", copy.delivery], ["shipping", copy.shipping]].map(([value, label]) => <label key={value} className="r14-choice-card"><input type="checkbox" checked={form.handoffMethods.includes(value)} onChange={() => setForm((v) => ({ ...v, handoffMethods: toggle(v.handoffMethods, value) }))} /><span><strong>{label}</strong></span></label>)}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>{copy.involvement}</legend>
                  <div className="r14-choice-stack">
                    {[["feedback", copy.feedback], ["expert_help", copy.help]].map(([value, label]) => <label key={value} className="r14-choice-card"><input type="checkbox" checked={form.personalInvolvement.includes(value)} onChange={() => setForm((v) => ({ ...v, personalInvolvement: toggle(v.personalInvolvement, value) }))} /><span><strong>{label}</strong></span></label>)}
                  </div>
                </fieldset>

                {error && <div className="r14-intake-error" role="alert"><ShieldCheck size={18} /><span>{error}</span></div>}
                <button type="submit" className="action-primary r14-submit" disabled={busy}><Send size={16} /> {busy ? (lang === "en" ? "Sending…" : "Odesílám…") : copy.submit}</button>
                <p className="r14-form-truth">{copy.truth}</p>
              </form>
            )}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
