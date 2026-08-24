import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileCheck2,
  RefreshCw,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  listMyPartnerChallenges,
  listMyPartnerDeliverables,
  listMyPartnerOrganizations,
} from "@/lib/pansofiePartnerFlow";

const STATUS_LABELS = {
  draft: "DRAFT",
  submitted: "QUALITY GATE",
  needs_work: "DOPRACOVAT",
  ready: "READY",
  blocked: "BLOCKED",
  active: "AKTIVNÍ",
  completed: "DOKONČENO",
  archived: "ARCHIV",
};

const STATUS_CLASSES = {
  draft: "status-neutral",
  submitted: "status-waiting",
  needs_work: "status-waiting",
  ready: "status-success",
  blocked: "status-danger",
  active: "status-progress",
  completed: "status-success",
  archived: "status-neutral",
};

const PIPELINE_STATUSES = new Set(["draft", "submitted", "needs_work", "ready", "active"]);

function Metric({ value, label, detail }) {
  return (
    <article className="surface-subtle p-4 sm:p-5 min-w-0">
      <strong className="block text-2xl sm:text-3xl font-semibold tracking-tight">{value}</strong>
      <span className="mt-1 block text-sm font-semibold">{label}</span>
      <span className="mt-1 block text-xs text-muted-foreground leading-relaxed">{detail}</span>
    </article>
  );
}

export default function PartnerAllianceDashboard() {
  const [organizations, setOrganizations] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [deliverables, setDeliverables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [organizationRows, challengeRows, deliverableRows] = await Promise.all([
        listMyPartnerOrganizations(),
        listMyPartnerChallenges(),
        listMyPartnerDeliverables(),
      ]);
      setOrganizations(organizationRows || []);
      setChallenges(challengeRows || []);
      setDeliverables(deliverableRows || []);
    } catch (err) {
      setError(err.message || "Firemní řídicí panel se nepodařilo načíst.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const verifiedOrganizations = organizations.filter(
    (row) => row.verification_status === "verified" && row.organization_status === "active"
  );
  const openPipeline = challenges.filter((row) => PIPELINE_STATUSES.has(row.challenge_status));
  const waitingReview = deliverables.filter((row) => !row.reviewed_at);
  const pilotDecisions = deliverables.filter((row) => row.adoption_decision === "pilot");
  const reportedOutcomes = deliverables.filter((row) => Boolean(row.latest_outcome_status));

  const statusCounts = useMemo(() => {
    const counts = {};
    for (const row of challenges) counts[row.challenge_status] = (counts[row.challenge_status] || 0) + 1;
    return counts;
  }, [challenges]);

  const nextAction = useMemo(() => {
    if (!organizations.length) {
      return {
        title: "Partner role zatím není aktivní",
        detail: "Tento účet nemá partner_contact membership. Nástěnka proto nevytváří ukázková data ani falešnou organizaci.",
        href: null,
        label: null,
      };
    }
    if (!verifiedOrganizations.length) {
      return {
        title: "Počkejte na ověření organizace",
        detail: "Challenge workflow se otevře až po explicitním verification organizace. Značka, platba ani registrace tento krok nenahrazují.",
        href: "#partner-challenge-workflow",
        label: "Zobrazit stav organizace",
      };
    }
    if (waitingReview.length) {
      return {
        title: `${waitingReview.length} ${waitingReview.length === 1 ? "výstup čeká" : "výstupy čekají"} na partner review`,
        detail: "Posuzuje se pouze bounded výstup vůči Challenge briefu. Review nehodnotí learnera, jeho osobnost ani Passport.",
        href: "#partner-r5-review",
        label: "Otevřít review frontu",
      };
    }
    const needsWork = challenges.find((row) => row.challenge_status === "needs_work");
    if (needsWork) {
      return {
        title: "Dopracujte Challenge podle Quality Gate",
        detail: needsWork.screening_note || "Upravte brief a odešlete novou revision. Předchozí screening zůstává součástí auditní stopy.",
        href: "#partner-challenge-workflow",
        label: "Otevřít Challenge",
      };
    }
    const draft = challenges.find((row) => row.challenge_status === "draft");
    if (draft) {
      return {
        title: "Dokončete rozpracovaný Challenge brief",
        detail: "Před odesláním musí být jasný problém, příjemce výsledku, bezpečnostní hranice, výstup a závazek ke zpětné vazbě.",
        href: "#partner-challenge-workflow",
        label: "Pokračovat v briefu",
      };
    }
    const submitted = challenges.find((row) => row.challenge_status === "submitted");
    if (submitted) {
      return {
        title: "Challenge čeká na Quality Gate",
        detail: "Teď není potřeba obcházet proces. PANSOFIE odděleně kontroluje smysl, rozsah, data, safeguarding, IP a plán zpětné vazby.",
        href: "#partner-challenge-workflow",
        label: "Zobrazit stav",
      };
    }
    const ready = challenges.find((row) => row.challenge_status === "ready");
    if (ready) {
      return {
        title: "Challenge je READY pro managed match",
        detail: "Partner nevybírá děti ani neprochází jejich profily. Přiřazení ke škole a týmu zůstává řízeným krokem.",
        href: "#partner-challenge-workflow",
        label: "Zobrazit pipeline",
      };
    }
    const active = challenges.find((row) => row.challenge_status === "active");
    if (active) {
      return {
        title: "Challenge běží jako Experience",
        detail: "Další partner akce přijde až po výslovně odeslaném bounded výstupu. Raw evidence a soukromá reflexe zůstávají mimo partner přístup.",
        href: "#partner-r5-review",
        label: "Zkontrolovat výstupy",
      };
    }
    return {
      title: "Přineste další skutečný problém",
      detail: "Nová Challenge má začít reálnou potřebou a jasným příjemcem výsledku, ne marketingovým zadáním nebo náborem learnerů.",
      href: "#partner-challenge-workflow",
      label: "Vytvořit Challenge",
    };
  }, [challenges, organizations.length, verifiedOrganizations.length, waitingReview.length]);

  return (
    <section
      className="product-shell pb-0"
      data-role="partner"
      data-company-dashboard="r25"
      role="region"
      aria-label="Firemní panel Aliance"
    >
      <header className="workspace-header mb-6">
        <div>
          <div className="workspace-kicker"><BriefcaseBusiness size={18} /><span>PANSOFIE PARTNER · ŘÍDICÍ NÁSTĚNKA</span></div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold font-heading">Od reálného problému k doloženému použití.</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">Nástěnka shrnuje pouze skutečné organizace, Challenge stavy, bounded výstupy a partner rozhodnutí. Nezobrazuje leaderboard, skóre člověka ani náborový profil learnera.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="action-secondary shrink-0 rounded-xl px-4"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Obnovit</button>
      </header>

      {error && (
        <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex items-start gap-3">
          <AlertTriangle size={18} className="text-destructive shrink-0 mt-0.5" />
          <div><p className="font-semibold">Partner data nejsou v tomto prostředí dostupná.</p><p className="mt-1 text-muted-foreground">{error}</p></div>
        </div>
      )}

      <section className="next-action-card mb-6" aria-label="Další partner akce">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <p className="eyebrow">CO JE TEĎ NA MNĚ?</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{loading ? "Načítám skutečný stav…" : nextAction.title}</h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">{loading ? "Nástěnka nevytváří demo metriky před načtením backendových záznamů." : nextAction.detail}</p>
          </div>
          {!loading && nextAction.href && <a href={nextAction.href} className="action-primary">{nextAction.label} <ArrowRight size={17} /></a>}
        </div>
      </section>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3" aria-label="Faktický stav partnera">
        <Metric value={verifiedOrganizations.length} label="ověřených organizací" detail={`${organizations.length} organizací dostupných tomuto účtu`} />
        <Metric value={openPipeline.length} label="otevřených Challenges" detail="draft → Quality Gate → managed match → active" />
        <Metric value={waitingReview.length} label="výstupů čeká review" detail="pouze bounded výstupy odeslané školou" />
        <Metric value={pilotDecisions.length} label="rozhodnutí PILOT" detail={`${reportedOutcomes.length} outcome záznamů je evidováno odděleně`} />
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-5 items-start">
        <section className="surface-panel p-5 sm:p-6" aria-label="Challenge pipeline">
          <div className="flex items-center gap-2"><Workflow size={18} className="text-primary" /><h2 className="text-lg font-semibold">Challenge pipeline</h2></div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["draft", "submitted", "needs_work", "ready", "active", "completed"].map((status) => (
              <span key={status} className={`status-pill ${STATUS_CLASSES[status]}`}>{STATUS_LABELS[status]} · {statusCounts[status] || 0}</span>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            {loading ? <p className="text-sm text-muted-foreground">Načítám Challenge pipeline…</p> : challenges.length === 0 ? <p className="text-sm text-muted-foreground">Zatím žádná skutečná Challenge.</p> : challenges.slice(0, 4).map((row) => (
              <article key={row.challenge_id} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0"><p className="font-semibold text-sm truncate">{row.title}</p><p className="mt-1 text-xs text-muted-foreground">revision {row.revision_no || 1}</p></div>
                  <span className={`status-pill ${STATUS_CLASSES[row.challenge_status] || "status-neutral"}`}>{STATUS_LABELS[row.challenge_status] || row.challenge_status}</span>
                </div>
              </article>
            ))}
          </div>
          <a href="#partner-challenge-workflow" className="action-secondary mt-5 w-fit">Otevřít celý Challenge workflow <ArrowRight size={16} /></a>
        </section>

        <section className="surface-panel p-5 sm:p-6" aria-label="Partner review fronta">
          <div className="flex items-center gap-2"><FileCheck2 size={18} className="text-primary" /><h2 className="text-lg font-semibold">Review a použití</h2></div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Výstup se porovnává s briefem. Rozhodnutí `PILOT` není automaticky `ADOPTED` a reported outcome není automaticky ověřený Impact.</p>
          <div className="mt-5 space-y-2">
            {loading ? <p className="text-sm text-muted-foreground">Načítám bounded výstupy…</p> : deliverables.length === 0 ? <p className="text-sm text-muted-foreground">Škola zatím neposlala žádný bounded Partner výstup.</p> : deliverables.slice(0, 4).map((row) => (
              <article key={row.deliverable_id} className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground">{row.challenge_title || "Challenge"}</p>
                <div className="mt-1 flex items-start justify-between gap-3"><p className="font-semibold text-sm">{row.deliverable_title}</p><span className={`status-pill ${row.reviewed_at ? "status-success" : "status-waiting"}`}>{row.reviewed_at ? "REVIEWED" : "OUTPUT READY"}</span></div>
              </article>
            ))}
          </div>
          <a href="#partner-r5-review" className="action-secondary mt-5 w-fit">Otevřít review a outcome <ArrowRight size={16} /></a>
        </section>
      </div>

      <section className="mt-5 surface-subtle p-5" aria-label="Partner datová hranice">
        <div className="flex items-start gap-3">
          <ShieldCheck size={19} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Partner vidí výsledek spolupráce, ne profil člověka.</p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">Bez raw learner evidence, bez soukromé reflexe, bez person score, bez „hireability“ a bez přímého výběru dětí. Outcome zůstává oddělený od tvrzení o dopadu, dokud není zvlášť doložen a ověřen.</p>
          </div>
        </div>
      </section>
    </section>
  );
}
