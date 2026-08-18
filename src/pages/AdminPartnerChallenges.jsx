import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  FileCheck2,
  Link2,
  RefreshCw,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import {
  QUALITY_DIMENSIONS,
  QUALITY_STATES,
  adminGetPartnerChallenge,
  adminListChallengeAssignmentCandidates,
  adminListPartnerChallenges,
  adminListPartnerOrganizations,
  adminProposeChallengeAssignment,
  adminRegisterPartnerOrganization,
  adminScreenPartnerChallenge,
  adminSetPartnerVerification,
} from "@/lib/pansofiePartnerFlow";

const statusClass = (status) => status === "ready" || status === "verified" ? "status-success" : status === "blocked" || status === "suspended" ? "status-danger" : status === "active" ? "status-progress" : "status-waiting";

const initialDimensions = () => Object.fromEntries(QUALITY_DIMENSIONS.map(([key]) => [key, "PASS"]));

function DetailBlock({ label, children }) {
  return <div className="surface-subtle p-4"><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p><div className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{children || "—"}</div></div>;
}

export default function AdminPartnerChallenges() {
  const [organizations, setOrganizations] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [orgForm, setOrgForm] = useState({ slug: "", name: "", organizationType: "company", contactEmail: "" });
  const [screen, setScreen] = useState({ decision: "ready", dimensions: initialDimensions(), note: "" });
  const [candidateKey, setCandidateKey] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const [orgRows, challengeRows, candidateRows] = await Promise.all([
        adminListPartnerOrganizations(),
        adminListPartnerChallenges(),
        adminListChallengeAssignmentCandidates(),
      ]);
      setOrganizations(orgRows); setChallenges(challengeRows); setCandidates(candidateRows);
      const id = challengeRows.some((row) => row.challenge_id === selectedId) ? selectedId : challengeRows[0]?.challenge_id || "";
      setSelectedId(id);
      if (id) setDetail(await adminGetPartnerChallenge(id)); else setDetail(null);
      if (!candidateKey && candidateRows[0]) setCandidateKey(`${candidateRows[0].school_organization_id}|${candidateRows[0].cohort_id}|${candidateRows[0].team_id}`);
    } catch (err) { setError(err.message || "Partner admin workspace se nepodařilo načíst."); }
    finally { setLoading(false); }
  }, [candidateKey, selectedId]);

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedQueue = useMemo(() => challenges.find((row) => row.challenge_id === selectedId) || null, [challenges, selectedId]);

  const selectChallenge = async (id) => {
    setSelectedId(id); setError(""); setMessage("");
    try {
      const row = await adminGetPartnerChallenge(id);
      setDetail(row);
      setScreen({ decision: row?.challenge_status === "submitted" ? "ready" : row?.screening_decision || "ready", dimensions: row?.screening_dimensions || initialDimensions(), note: row?.screening_note || "" });
    } catch (err) { setError(err.message || "Challenge detail se nepodařilo načíst."); }
  };

  const registerOrg = async (event) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      await adminRegisterPartnerOrganization(orgForm);
      setOrgForm({ slug: "", name: "", organizationType: "company", contactEmail: "" });
      setMessage("Partner organizace a partner_contact membership byly vytvořeny. Verification zůstává PENDING, dokud ho admin explicitně nepotvrdí.");
      await load();
    } catch (err) { setError(err.message || "Partner organizaci se nepodařilo vytvořit."); }
    finally { setBusy(false); }
  };

  const verify = async (organizationId, status) => {
    setBusy(true); setError(""); setMessage("");
    try {
      await adminSetPartnerVerification(organizationId, status, status === "verified" ? "Explicit R4 operator verification." : "Verification state changed by PANSOFIE operator.");
      setMessage(`Partner verification: ${status.toUpperCase()}. Nový stav je append-only evidence event.`);
      await load();
    } catch (err) { setError(err.message || "Verification se nepodařilo změnit."); }
    finally { setBusy(false); }
  };

  const saveScreen = async (event) => {
    event.preventDefault();
    if (!detail) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await adminScreenPartnerChallenge({ challengeId: detail.challenge_id, decision: screen.decision, dimensions: screen.dimensions, note: screen.note });
      setMessage("Quality Gate screening byl uložen jako immutable evidence. Challenge stav odpovídá rozhodnutí.");
      await load();
    } catch (err) { setError(err.message || "Quality Gate se nepodařilo uložit."); }
    finally { setBusy(false); }
  };

  const propose = async () => {
    if (!detail || !candidateKey) return;
    const [schoolOrganizationId, cohortId, teamId] = candidateKey.split("|");
    setBusy(true); setError(""); setMessage("");
    try {
      await adminProposeChallengeAssignment({ challengeId: detail.challenge_id, schoolOrganizationId, cohortId, teamId });
      setMessage("Managed match byl navržen. Škola ho musí samostatně přijmout; nic se learnerům ještě nespustilo.");
      await load();
    } catch (err) { setError(err.message || "Managed match se nepodařilo navrhnout."); }
    finally { setBusy(false); }
  };

  return (
    <div>
      <header className="workspace-header">
        <div><div className="workspace-kicker"><BriefcaseBusiness size={18} /><span>PARTNER CHALLENGE CONTROL · R4</span></div><h1 className="mt-2 text-3xl sm:text-4xl font-semibold">Quality před marketplace density.</h1><p className="mt-3 max-w-3xl text-muted-foreground">Admin funguje jako řízený intermediary: ověří partnera, screeninguje Challenge a navrhne konkrétní školní match. Žádné automatické párování dětí s firmami.</p></div>
        <button type="button" onClick={load} disabled={busy || loading} className="action-secondary shrink-0 rounded-xl px-4"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Obnovit</button>
      </header>

      {error && <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex gap-3"><AlertTriangle size={18} className="text-destructive shrink-0 mt-0.5" /><span>{error}</span></div>}
      {message && <div role="status" className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex gap-3"><CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /><span>{message}</span></div>}

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-5 items-start">
        <div className="surface-panel p-5 sm:p-6">
          <div className="flex items-center gap-2"><UserRoundCheck size={18} className="text-primary" /><h2 className="font-semibold">Partner onboarding + verification</h2></div>
          <p className="mt-2 text-sm text-muted-foreground">Kontakt musí mít už existující invited PANSOFIE účet. Registrace organizace verification automaticky neuděluje.</p>
          <form onSubmit={registerOrg} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="text-sm"><span className="block font-medium mb-2">Slug</span><input required pattern="[a-z0-9-]+" value={orgForm.slug} onChange={(e) => setOrgForm((v) => ({ ...v, slug: e.target.value.toLowerCase() }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
            <label className="text-sm"><span className="block font-medium mb-2">Název</span><input required value={orgForm.name} onChange={(e) => setOrgForm((v) => ({ ...v, name: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
            <label className="text-sm"><span className="block font-medium mb-2">Typ</span><select value={orgForm.organizationType} onChange={(e) => setOrgForm((v) => ({ ...v, organizationType: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5"><option value="company">Firma</option><option value="ngo">NGO / organizace</option><option value="community">Komunita</option><option value="municipality">Obec</option></select></label>
            <label className="text-sm"><span className="block font-medium mb-2">Kontakt — existující účet</span><input required type="email" value={orgForm.contactEmail} onChange={(e) => setOrgForm((v) => ({ ...v, contactEmail: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
            <button disabled={busy} className="action-secondary sm:col-span-2">Založit jako PENDING partnera</button>
          </form>
          <div className="mt-5 space-y-2">{organizations.length === 0 ? <p className="text-sm text-muted-foreground">Žádná partner organizace.</p> : organizations.map((org) => <div key={org.organization_id} className="surface-subtle p-4"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"><div><p className="font-semibold text-sm">{org.organization_name}</p><p className="mt-1 text-xs text-muted-foreground">{org.organization_type} · {org.active_partner_contacts} active partner contact(s)</p></div><span className={`status-pill ${statusClass(org.verification_status)}`}>{org.verification_status.toUpperCase()}</span></div><div className="mt-3 flex flex-wrap gap-2"><button type="button" disabled={busy || org.verification_status === "verified"} onClick={() => verify(org.organization_id, "verified")} className="action-secondary min-h-9 px-3 py-1.5 text-xs">Ověřit</button><button type="button" disabled={busy || org.verification_status === "suspended"} onClick={() => verify(org.organization_id, "suspended")} className="action-quiet min-h-9 px-3 py-1.5 text-xs">Suspendovat</button></div></div>)}</div>
        </div>

        <div className="surface-panel p-5 sm:p-6">
          <div className="flex items-center gap-2"><FileCheck2 size={18} className="text-primary" /><h2 className="font-semibold">Challenge queue</h2></div>
          <p className="mt-2 text-sm text-muted-foreground">Screening se provádí jen nad SUBMITTED revision. Starý screening se nepřepisuje.</p>
          <div className="mt-5 space-y-2">{challenges.length === 0 ? <p className="text-sm text-muted-foreground">Žádná Challenge v queue.</p> : challenges.map((row) => <button key={row.challenge_id} type="button" onClick={() => selectChallenge(row.challenge_id)} className={`w-full rounded-2xl border p-4 text-left ${selectedId === row.challenge_id ? "border-primary/30 bg-primary/[0.04]" : "border-border bg-card"}`}><div className="flex items-start justify-between gap-3"><div><p className="text-xs text-muted-foreground">{row.partner_organization_name}</p><p className="mt-1 font-semibold">{row.title}</p><p className="mt-1 text-xs text-muted-foreground">revision {row.revision_no}</p></div><span className={`status-pill ${statusClass(row.challenge_status)}`}>{row.challenge_status.toUpperCase()}</span></div></button>)}</div>
        </div>
      </section>

      {detail && <section className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-5 items-start">
        <div className="space-y-5">
          <article className="surface-raised p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"><div><p className="eyebrow">CHALLENGE DETAIL</p><h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{detail.title}</h2><p className="mt-2 text-sm text-muted-foreground">{detail.partner_organization_name} · revision {detail.revision_no}</p></div><span className={`status-pill ${statusClass(detail.challenge_status)}`}>{detail.challenge_status.toUpperCase()}</span></div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"><DetailBlock label="Problem">{detail.problem_statement}</DetailBlock><DetailBlock label="Beneficiary">{detail.beneficiary}</DetailBlock><DetailBlock label="Desired output">{detail.desired_output}</DetailBlock><DetailBlock label="Context">{detail.context}</DetailBlock><DetailBlock label="Resources">{detail.available_resources}</DetailBlock><DetailBlock label="Data / privacy">{detail.data_requirements}</DetailBlock><DetailBlock label="IP expectations">{detail.ip_expectations}</DetailBlock><DetailBlock label="Safety notes">{detail.safety_notes}</DetailBlock><DetailBlock label="Feedback commitment">{detail.feedback_commitment}</DetailBlock><DetailBlock label="Adoption possibility">{detail.adoption_possibility}</DetailBlock></div>
          </article>

          <section className="surface-panel p-5 sm:p-6"><div className="flex items-start gap-3"><ShieldCheck size={19} className="text-primary shrink-0 mt-0.5" /><div><h2 className="font-semibold">Admin boundary</h2><p className="mt-2 text-sm text-muted-foreground">READY není veřejný listing ani právní schválení. Quality Gate chrání educational fit, scope, data, safeguarding, IP a realistický další krok. Platba nebo brand status nemění výsledek.</p></div></div></section>
        </div>

        <div className="space-y-5">
          {detail.challenge_status === "submitted" ? <form onSubmit={saveScreen} className="surface-raised p-5 sm:p-6">
            <div className="flex items-center gap-2"><FileCheck2 size={18} className="text-primary" /><h2 className="font-semibold">9-dimension Quality Gate</h2></div>
            <div className="mt-5 space-y-3">{QUALITY_DIMENSIONS.map(([key, label]) => <label key={key} className="grid grid-cols-1 sm:grid-cols-[1fr_190px] gap-2 sm:items-center surface-subtle p-3"><span className="text-sm font-medium">{label}</span><select value={screen.dimensions[key]} onChange={(e) => setScreen((v) => ({ ...v, dimensions: { ...v.dimensions, [key]: e.target.value } }))} className="rounded-xl border border-border bg-background px-3 py-2 text-sm">{QUALITY_STATES.map((state) => <option key={state} value={state}>{state}</option>)}</select></label>)}</div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3"><label className="text-sm"><span className="block font-medium mb-2">Výsledek</span><select value={screen.decision} onChange={(e) => setScreen((v) => ({ ...v, decision: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5"><option value="ready">READY</option><option value="needs_work">NEEDS_WORK</option><option value="blocked">BLOCKED</option></select></label><label className="text-sm"><span className="block font-medium mb-2">Poznámka</span><textarea rows={2} maxLength={3000} value={screen.note} onChange={(e) => setScreen((v) => ({ ...v, note: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label></div>
            <button disabled={busy} className="action-primary mt-5"><CheckCircle2 size={16} /> Uložit immutable screening</button>
          </form> : <section className="surface-panel p-5 sm:p-6"><h2 className="font-semibold">Quality Gate stav</h2><p className="mt-2 text-sm text-muted-foreground">{detail.screening_decision ? `Poslední rozhodnutí: ${detail.screening_decision.toUpperCase()}` : "Challenge ještě nemá screening."}</p>{detail.screening_note && <p className="mt-3 text-sm">{detail.screening_note}</p>}</section>}

          {detail.challenge_status === "ready" && !detail.assignment_id ? <section className="surface-raised p-5 sm:p-6"><div className="flex items-center gap-2"><Link2 size={18} className="text-primary" /><h2 className="font-semibold">Managed match</h2></div><p className="mt-2 text-sm text-muted-foreground">Vyberte konkrétní school → cohort → team. Žádný learner profil se zde nezobrazuje.</p>{candidates.length ? <><select value={candidateKey} onChange={(e) => setCandidateKey(e.target.value)} className="mt-4 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm">{candidates.map((row) => <option key={`${row.school_organization_id}-${row.cohort_id}-${row.team_id}`} value={`${row.school_organization_id}|${row.cohort_id}|${row.team_id}`}>{row.school_name} · {row.cohort_name} · {row.team_name} · {row.active_learners} learner(s)</option>)}</select><button type="button" disabled={busy || !candidateKey} onClick={propose} className="action-primary mt-4">Navrhnout škole <Link2 size={16} /></button></> : <p className="mt-4 text-sm text-muted-foreground">Momentálně není připraven žádný active school cohort/team candidate.</p>}</section> : detail.assignment_id ? <section className="surface-panel p-5 sm:p-6"><h2 className="font-semibold">Managed assignment</h2><div className="mt-3 flex flex-wrap gap-2"><span className={`status-pill ${statusClass(detail.assignment_status)}`}>{detail.assignment_status?.toUpperCase()}</span><span className="status-pill status-neutral">{detail.school_name}</span><span className="status-pill status-neutral">{detail.cohort_name}</span><span className="status-pill status-neutral">{detail.team_name}</span></div></section> : null}
        </div>
      </section>}
    </div>
  );
}
