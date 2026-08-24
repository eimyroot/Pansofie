import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import "@/teacher-alliance-r19.css";

const ROLE_LABEL = {
  teacher: "Ověřený pedagog",
  coordinator: "Koordinátor školy",
};

const readableDate = (value) => {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString("cs-CZ", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return "—";
  }
};

export default function TeacherAllianceDashboard({
  teacherMemberships,
  selectedOrganizationId,
  onOrganizationChange,
  metrics,
  learners,
  reviewRuns,
  activeRuns,
  completedRuns,
  missions,
  learnerNames,
}) {
  const selectedMembership = teacherMemberships.find((item) => item.organization_id === selectedOrganizationId) || teacherMemberships[0] || null;
  const organizationId = selectedMembership?.organization_id || "";
  const organizationName = selectedMembership?.organizations?.name || "Školní Aliance";
  const orgLearners = learners.filter((row) => row.organization_id === organizationId);
  const orgReviewRuns = reviewRuns.filter((run) => run.organization_id === organizationId);
  const orgActiveRuns = activeRuns.filter((run) => run.organization_id === organizationId);
  const activeTeamRuns = orgActiveRuns.filter((run) => Boolean(run.team_id));

  const missionSamples = useMemo(() => missions.slice(0, 3), [missions]);

  if (!selectedMembership) return null;

  return (
    <section className="r19-alliance" aria-label="Učitelský panel Aliance">
      <div className="r19-alliance__aura r19-alliance__aura--violet" />
      <div className="r19-alliance__aura r19-alliance__aura--amber" />

      <header className="r19-alliance__header">
        <div>
          <p className="r19-alliance__eyebrow"><GraduationCap size={16} /> UČITELSKÝ PANEL · ALIANCE</p>
          <h2>{organizationName}</h2>
          <p className="r19-alliance__lead">Správa skutečných Experiences, lidského review a týmových výzev. Bez bodů, pořadí a skrytého hodnocení dětí.</p>
        </div>

        <div className="r19-alliance__identity">
          <span><ShieldCheck size={15} /> {ROLE_LABEL[selectedMembership.role] || selectedMembership.role}</span>
          {teacherMemberships.length > 1 && (
            <label>
              <small>Aktivní škola</small>
              <select value={organizationId} onChange={(event) => onOrganizationChange(event.target.value)}>
                {teacherMemberships.map((membership) => (
                  <option key={membership.id} value={membership.organization_id}>{membership.organizations?.name || membership.organization_id}</option>
                ))}
              </select>
            </label>
          )}
        </div>
      </header>

      <div className="r19-alliance__metrics" aria-label="Faktický stav školy">
        <article><CheckCircle2 size={18} /><strong>{metrics?.completedExperiences ?? 0}</strong><span>ověřených Experiences</span></article>
        <article><Clock3 size={18} /><strong>{metrics?.pendingReview ?? orgReviewRuns.length}</strong><span>čeká na lidské review</span></article>
        <article><BookOpenCheck size={18} /><strong>{metrics?.activeRuns ?? orgActiveRuns.length}</strong><span>aktivních školních běhů</span></article>
        <article><UsersRound size={18} /><strong>{orgLearners.length}</strong><span>žáků dostupných pro pilot</span></article>
      </div>

      <div className="r19-alliance__boundary">
        <ShieldCheck size={17} />
        <div>
          <strong>Přístup do Aliance zůstává řízený členstvím školy.</strong>
          <p>Veřejný univerzální „kmenový kód“ zde záměrně nevystavujeme. Připojení žáka musí vytvořit pouze omezené pending členství a skutečný přístup dál řídí školní membership, processing basis a RLS.</p>
        </div>
      </div>

      <div className="r19-alliance__grid">
        <section className="r19-alliance__panel r19-alliance__panel--review">
          <div className="r19-alliance__section-head">
            <div><p>SVĚDKOVÉ NÁPRAVY</p><h3>Žádosti o stvrzení zkušeností</h3></div>
            <span>{orgReviewRuns.length} čeká</span>
          </div>

          <p className="r19-alliance__section-copy">Učitel ověřuje doloženou zkušenost, ne hodnotu člověka. Potvrzení je dostupné až v detailu po otevření důkazu a reflexe.</p>

          {orgReviewRuns.length === 0 ? (
            <div className="r19-alliance__empty">Žádná Experience právě nečeká na review.</div>
          ) : (
            <div className="r19-alliance__list">
              {orgReviewRuns.slice(0, 5).map((run) => (
                <article key={run.id} className="r19-review-card">
                  <div className="r19-review-card__top">
                    <div>
                      <small>{learnerNames.get(run.user_id) || "Žák školy"}{run.team_id ? " · týmová Experience" : ""}</small>
                      <strong>{run.missions?.title || "Školní Experience"}</strong>
                    </div>
                    <span>čeká review</span>
                  </div>
                  <p>{run.missions?.summary || "Doložená práce čeká na kontrolu důkazu a reflexe."}</p>
                  <div className="r19-review-card__meta">
                    <span>{readableDate(run.submitted_at)}</span>
                    {(run.missions?.path_ids || []).slice(0, 2).map((path) => <span key={path}>{path}</span>)}
                  </div>
                  <Link to={`/skola/mise/${run.id}`}>Posoudit důkaz a reflexi <ArrowRight size={15} /></Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="r19-alliance__panel">
          <div className="r19-alliance__section-head">
            <div><p>KOLEKTIVNÍ KRONIKA NÁPRAVY</p><h3>Co už škola skutečně dokončila</h3></div>
            <span>{metrics?.completedTeamExperiences ?? 0} týmových</span>
          </div>
          <p className="r19-alliance__section-copy">Kronika je faktický přehled dokončených Experiences. Není to žebříček školy ani soutěž mezi třídami.</p>

          {completedRuns.length === 0 ? (
            <div className="r19-alliance__empty">Zatím tu není žádná dokončená Experience dostupná v aktuálním školním kontextu.</div>
          ) : (
            <div className="r19-alliance__chronicle">
              {completedRuns.map((run) => (
                <Link key={run.id} to={`/skola/mise/${run.id}`}>
                  <span>{run.team_id ? "Týmová Experience" : learnerNames.get(run.user_id) || "Individuální Experience"}</span>
                  <strong>{run.missions?.title || "Dokončená Experience"}</strong>
                  <small>{readableDate(run.completed_at)}</small>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="r19-alliance__panel r19-alliance__panel--challenge">
        <div className="r19-alliance__section-head">
          <div><p>KMENOVÉ VÝZVY · BOUNDED MODE</p><h3>Vyvolat společnou týmovou Experience</h3></div>
          <span>{activeTeamRuns.length} aktivních týmových</span>
        </div>
        <p className="r19-alliance__section-copy">Výzva se neposílá automaticky celé škole. Učitel nejprve vybere konkrétní kohortu nebo tým a publikovanou misi; tím zůstává rozsah srozumitelný a auditovatelný.</p>

        <div className="r19-alliance__challenge-grid">
          <div>
            <small>Aktivní týmové Experiences</small>
            {activeTeamRuns.length ? activeTeamRuns.slice(0, 3).map((run) => (
              <Link key={run.id} to={`/skola/mise/${run.id}`} className="r19-alliance__challenge-row"><span>{run.missions?.title || "Týmová Experience"}</span><ArrowRight size={14} /></Link>
            )) : <p className="r19-alliance__muted">Momentálně neběží žádná týmová Experience.</p>}
          </div>

          <div>
            <small>Publikované mise k výběru</small>
            {missionSamples.length ? missionSamples.map((mission) => (
              <div key={mission.id} className="r19-alliance__mission-sample"><Sparkles size={14} /><span>{mission.title}</span></div>
            )) : <p className="r19-alliance__muted">Katalog publikovaných misí není v tomto prostředí dostupný.</p>}
          </div>
        </div>

        <a href="#pilot-operations" className="r19-alliance__primary">Vybrat kohortu, tým a misi <ArrowRight size={16} /></a>
      </section>
    </section>
  );
}
