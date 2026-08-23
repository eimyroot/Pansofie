import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  HeartHandshake,
  Loader2,
  MessageSquareText,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import "@/witness-verification-r16.css";

const COPY = {
  cs: {
    eyebrow: "SVĚDEK NÁPRAVY",
    title: "Pomozte potvrdit jednu skutečnou zkušenost.",
    intro: "Neověřujete člověka ani jeho hodnotu. Potvrzujete pouze to, zda se popsaná činnost nebo výstup skutečně stal.",
    loading: "Bezpečně načítám žádost…",
    mission: "Zkušenost",
    evidence: "Doložená stopa",
    reflection: "Reflexe účastníka",
    expires: "Odkaz je časově omezený",
    confirm: "Ano, mohu tuto zkušenost potvrdit",
    confirmHelp: "Potvrzuji, že jsem se na situaci podílel/a nebo mám dostatek informací, abych mohl/a doložit, že popsaný výstup reálně proběhl.",
    cannot: "Nemohu to takto potvrdit",
    cannotHelp: "Zkušenost můžete vrátit k doplnění. Napište jen to, co je pro opravu důležité; nevkládejte citlivé osobní údaje.",
    notePlaceholder: "Např. Výstup jsem viděl/a, ale chybí informace o tom, kdy a kde byl skutečně použit.",
    sendBack: "Vrátit k doplnění",
    back: "Zpět k potvrzení",
    privacy: "Token funguje jako jednorázový klíč. Po rozhodnutí se spotřebuje a z adresního řádku se odstraní.",
    supporting: "Vaše potvrzení je podpůrná evidence. Samo o sobě neuděluje body, známku ani automaticky neschvaluje Pansofický pas.",
    confirmedTitle: "Děkujeme. Svědectví bylo zaznamenáno.",
    confirmedBody: "Potvrdili jste konkrétní zkušenost, ne hodnotu člověka. Záznam teď může být použit v řízeném procesu ověření Pansofie.",
    revisionTitle: "Děkujeme. Zkušenost byla vrácena k doplnění.",
    revisionBody: "Vaše poznámka pomůže účastníkovi nebo odpovědnému průvodci doplnit chybějící kontext. Nic nebylo automaticky označeno jako ověřené.",
    expiredTitle: "Platnost odkazu skončila.",
    expiredBody: "Kvůli bezpečnosti mají svědecké odkazy omezenou životnost. Pokud je potvrzení stále potřeba, musí být vytvořena nová žádost.",
    usedTitle: "Tento odkaz už byl použit.",
    usedBody: "Jednorázový svědecký odkaz nelze použít podruhé. Tím chráníme historii rozhodnutí před přepsáním.",
    invalidTitle: "Tuto žádost se nepodařilo bezpečně otevřít.",
    invalidBody: "Odkaz může být neplatný, neúplný nebo už zrušený. Žádné rozhodnutí nebylo zaznamenáno.",
    unavailableTitle: "Ověřovací služba zatím není dostupná.",
    unavailableBody: "Stránka je připravená, ale serverová vrstva R16 není v tomto prostředí aktivní. Nic nebylo odesláno ani potvrzeno.",
    whatNext: "Co teď?",
    whatNextBody: "Nemusíte si zakládat účet. Pokud vás ale zajímá, proč Pansofie staví na důkazu, reflexi a skutečných činech, můžete pokračovat dál.",
    learn: "Jak Pansofie funguje",
    join: "Chci se zapojit",
    home: "Zpět na Pansofii",
    retry: "Zkusit znovu",
  },
  en: {
    eyebrow: "WITNESS OF REAL-WORLD ACTION",
    title: "Help confirm one real Experience.",
    intro: "You are not rating a person or their worth. You are only confirming whether the described action or output actually happened.",
    loading: "Securely loading the request…",
    mission: "Experience",
    evidence: "Documented trace",
    reflection: "Participant reflection",
    expires: "This link is time-limited",
    confirm: "Yes, I can confirm this Experience",
    confirmHelp: "I took part in the situation or have enough direct information to attest that the described output really happened.",
    cannot: "I cannot confirm it as written",
    cannotHelp: "You can return the Experience for clarification. Include only what is needed to correct it; do not add sensitive personal data.",
    notePlaceholder: "For example: I saw the output, but the record does not yet show when and where it was actually used.",
    sendBack: "Return for clarification",
    back: "Back to confirmation",
    privacy: "The token acts as a one-time key. After a decision it is consumed and removed from the address bar.",
    supporting: "Your confirmation is supporting evidence. It does not award points, grades, or automatically approve the Pansofie Passport.",
    confirmedTitle: "Thank you. Your witness statement was recorded.",
    confirmedBody: "You confirmed a specific Experience, not the value of a person. The record can now support Pansofie’s governed verification process.",
    revisionTitle: "Thank you. The Experience was returned for clarification.",
    revisionBody: "Your note can help the participant or responsible guide add missing context. Nothing was automatically marked as verified.",
    expiredTitle: "This link has expired.",
    expiredBody: "Witness links have a limited lifetime for security. If confirmation is still needed, a new request must be created.",
    usedTitle: "This link has already been used.",
    usedBody: "A one-time witness link cannot be used twice. This protects the decision history from being overwritten.",
    invalidTitle: "This request could not be opened safely.",
    invalidBody: "The link may be invalid, incomplete, or revoked. No decision was recorded.",
    unavailableTitle: "The verification service is not available yet.",
    unavailableBody: "The page is ready, but the R16 server layer is not active in this environment. Nothing was sent or confirmed.",
    whatNext: "What happens next?",
    whatNextBody: "You do not need an account. If you want to understand why Pansofie is built around evidence, reflection, and real action, you can continue exploring.",
    learn: "How Pansofie works",
    join: "I want to get involved",
    home: "Back to Pansofie",
    retry: "Try again",
  },
};

const RESULT_KEYS = new Set(["confirmed", "needs_revision", "expired", "already_used", "invalid", "unavailable"]);

function resultCopy(copy, result) {
  if (result === "confirmed") return { icon: CheckCircle2, tone: "success", title: copy.confirmedTitle, body: copy.confirmedBody };
  if (result === "needs_revision") return { icon: MessageSquareText, tone: "revision", title: copy.revisionTitle, body: copy.revisionBody };
  if (result === "expired") return { icon: Clock3, tone: "warning", title: copy.expiredTitle, body: copy.expiredBody };
  if (result === "already_used") return { icon: ShieldCheck, tone: "neutral", title: copy.usedTitle, body: copy.usedBody };
  if (result === "unavailable") return { icon: AlertTriangle, tone: "warning", title: copy.unavailableTitle, body: copy.unavailableBody };
  return { icon: XCircle, tone: "error", title: copy.invalidTitle, body: copy.invalidBody };
}

async function invokeWitness(body) {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!baseUrl || !anonKey || baseUrl.includes("YOUR_PROJECT")) {
    const error = new Error("R16 witness backend is not configured");
    error.code = "SERVER_NOT_CONFIGURED";
    throw error;
  }

  const response = await fetch(`${baseUrl}/functions/v1/evidence-witness`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify(body),
  });

  let payload = null;
  try { payload = await response.json(); } catch { payload = {}; }
  if (!response.ok) {
    const error = new Error(payload?.code || `HTTP_${response.status}`);
    error.code = payload?.code || `HTTP_${response.status}`;
    throw error;
  }
  return payload;
}

export default function WitnessVerification() {
  const { locale: rawLocale } = useLanguage();
  const locale = rawLocale === "en" ? "en" : "cs";
  const copy = COPY[locale];
  const [params] = useSearchParams();
  const token = params.get("token")?.trim() || "";
  const resultParam = params.get("result") || "";
  const initialResult = RESULT_KEYS.has(resultParam) ? resultParam : null;

  const [state, setState] = useState(initialResult ? "result" : token ? "loading" : "result");
  const [result, setResult] = useState(initialResult || (token ? null : "invalid"));
  const [request, setRequest] = useState(null);
  const [revisionMode, setRevisionMode] = useState(false);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token || initialResult) return;
    let active = true;

    const load = async () => {
      setState("loading");
      try {
        const payload = await invokeWitness({ action: "preview", token });
        if (!active) return;
        const status = payload?.request?.status;
        if (status === "expired") {
          setResult("expired");
          setState("result");
          return;
        }
        if (status && status !== "pending") {
          setResult("already_used");
          setState("result");
          return;
        }
        setRequest(payload.request);
        setState("review");
      } catch (error) {
        if (!active) return;
        if (error.code === "SERVER_NOT_CONFIGURED" || error.code === "PREVIEW_FAILED") setResult("unavailable");
        else if (error.code === "EXPIRED") setResult("expired");
        else if (error.code === "ALREADY_USED") setResult("already_used");
        else setResult("invalid");
        setState("result");
      }
    };

    load();
    return () => { active = false; };
  }, [token, initialResult]);

  const expiresLabel = useMemo(() => {
    if (!request?.expiresAt) return null;
    try {
      return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "cs-CZ", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(request.expiresAt));
    } catch { return null; }
  }, [request?.expiresAt, locale]);

  const finish = (nextResult) => {
    setResult(nextResult);
    setState("result");
    setSubmitting(false);
    window.history.replaceState(window.history.state, "", `/potvrzeni-zkusenosti?result=${encodeURIComponent(nextResult)}${locale === "en" ? "&lang=en" : ""}`);
  };

  const decide = async (action) => {
    if (!token || submitting) return;
    setSubmitting(true);
    try {
      const payload = await invokeWitness({ action, token, note: action === "needs_revision" ? note : null });
      finish(payload?.result === "needs_revision" ? "needs_revision" : "confirmed");
    } catch (error) {
      if (error.code === "EXPIRED") finish("expired");
      else if (error.code === "ALREADY_USED") finish("already_used");
      else if (error.code === "SERVER_NOT_CONFIGURED" || error.code === "DECISION_FAILED") finish("unavailable");
      else finish("invalid");
    }
  };

  const renderResult = () => {
    const content = resultCopy(copy, result || "invalid");
    const Icon = content.icon;
    return (
      <div className={`r16-witness-result is-${content.tone}`}>
        <div className="r16-result-icon"><Icon size={30} /></div>
        <span className="r16-witness-eyebrow">{copy.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.body}</p>
        {(result === "confirmed" || result === "needs_revision") && (
          <div className="r16-truth-note"><ShieldCheck size={18} /><span>{copy.supporting}</span></div>
        )}
        <div className="r16-next-card">
          <strong>{copy.whatNext}</strong>
          <p>{copy.whatNextBody}</p>
          <div className="r16-result-actions">
            <Link to="/jak-funguje" className="r16-primary-link">{copy.learn}<ArrowRight size={16}/></Link>
            <Link to="/zapojit-se" className="r16-secondary-link">{copy.join}</Link>
          </div>
        </div>
        <Link to="/" className="r16-home-link">{copy.home}</Link>
      </div>
    );
  };

  return (
    <main className="r16-witness-page">
      <div className="r16-witness-glow" aria-hidden="true" />
      <section className="r16-witness-shell" aria-live="polite">
        {state === "loading" && (
          <div className="r16-witness-loading">
            <Loader2 size={28} className="r16-spin" />
            <span>{copy.loading}</span>
          </div>
        )}

        {state === "result" && renderResult()}

        {state === "review" && request && (
          <>
            <header className="r16-witness-header">
              <div className="r16-shield"><ShieldCheck size={22}/></div>
              <div>
                <span className="r16-witness-eyebrow">{copy.eyebrow}</span>
                <h1>{copy.title}</h1>
                <p>{copy.intro}</p>
              </div>
            </header>

            <div className="r16-expiry"><Clock3 size={15}/><span>{copy.expires}{expiresLabel ? ` · ${expiresLabel}` : ""}</span></div>

            <article className="r16-review-card">
              <div className="r16-card-label"><Sparkles size={15}/>{copy.mission}</div>
              <h2>{request.missionTitle || "Pansofie Experience"}</h2>

              <div className="r16-review-block">
                <div className="r16-review-block-title"><FileCheck2 size={17}/><strong>{copy.evidence}</strong></div>
                <p>{request.evidenceDescription || (locale === "en" ? "No evidence description was included in this request." : "V žádosti není uveden slovní popis důkazu.")}</p>
              </div>

              <div className="r16-review-block is-reflection">
                <div className="r16-review-block-title"><MessageSquareText size={17}/><strong>{copy.reflection}</strong></div>
                <p>{request.reflection || (locale === "en" ? "No reflection was included." : "K této zkušenosti zatím není přiložena reflexe.")}</p>
              </div>
            </article>

            {!revisionMode ? (
              <div className="r16-decision-stack">
                <button type="button" className="r16-confirm-button" disabled={submitting} onClick={() => decide("confirm")}>
                  {submitting ? <Loader2 size={18} className="r16-spin"/> : <CheckCircle2 size={18}/>}<span>{copy.confirm}</span>
                </button>
                <p className="r16-decision-help">{copy.confirmHelp}</p>
                <button type="button" className="r16-revision-button" disabled={submitting} onClick={() => setRevisionMode(true)}>
                  <MessageSquareText size={17}/><span>{copy.cannot}</span>
                </button>
              </div>
            ) : (
              <div className="r16-revision-panel">
                <strong>{copy.cannot}</strong>
                <p>{copy.cannotHelp}</p>
                <textarea rows={4} maxLength={1200} value={note} onChange={(event) => setNote(event.target.value)} placeholder={copy.notePlaceholder}/>
                <div className="r16-note-count">{note.length}/1200</div>
                <button type="button" className="r16-revision-submit" disabled={submitting || !note.trim()} onClick={() => decide("needs_revision")}>
                  {submitting ? <Loader2 size={18} className="r16-spin"/> : <RefreshCcw size={18}/>}<span>{copy.sendBack}</span>
                </button>
                <button type="button" className="r16-back-button" disabled={submitting} onClick={() => setRevisionMode(false)}>{copy.back}</button>
              </div>
            )}

            <footer className="r16-witness-footer">
              <HeartHandshake size={17}/>
              <p>{copy.supporting}</p>
              <small>{copy.privacy}</small>
            </footer>
          </>
        )}
      </section>
    </main>
  );
}
