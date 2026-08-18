import { supabase } from "@/api/supabaseClient";

export const SCHOOL_RUN_STATUSES = Object.freeze(["assigned", "in_progress", "submitted", "completed", "cancelled"]);
export const REVIEW_SCOPES = Object.freeze(["mission", "evidence", "reflection", "passport"]);
export const REVIEW_STATUSES = Object.freeze(["pending", "confirmed", "needs_revision", "not_verified"]);
export const PILOT_RESPONSIBILITIES = Object.freeze([
  "pilot_lead",
  "safeguarding",
  "privacy_data",
  "technical_incident",
  "partner_contact",
  "pansofie_operator",
]);

const throwIfError = (result, label) => {
  if (result.error) {
    const error = new Error(`${label}: ${result.error.message}`);
    error.cause = result.error;
    throw error;
  }
  return result.data;
};

export async function listMyOrganizationMemberships(userId) {
  if (!userId) return [];
  const result = await supabase
    .from("organization_memberships")
    .select("id, organization_id, role, status, organizations(id, slug, name, organization_type, status)")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: true });
  return throwIfError(result, "Membership load failed") || [];
}

export async function listPublishedMissions() {
  const result = await supabase
    .from("missions")
    .select("id, slug, title, summary, why, program_id, lab_id, path_ids, age_min, age_max, estimated_minutes, evidence_prompt, reflection_prompt, transfer_prompt, contribution_prompt, safety_notes")
    .eq("status", "published")
    .order("title", { ascending: true });
  return throwIfError(result, "Mission catalog load failed") || [];
}

export async function listMySchoolRuns(userId) {
  if (!userId) return [];
  const result = await supabase
    .from("mission_runs")
    .select("id, status, started_at, submitted_at, completed_at, organization_id, assigned_by, mission_version_id, cohort_id, team_id, created_at, missions(id, slug, title, summary, why, program_id, lab_id, path_ids, evidence_prompt, reflection_prompt, transfer_prompt, contribution_prompt, safety_notes), organizations(id, slug, name, organization_type)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return throwIfError(result, "My mission runs load failed") || [];
}

export async function listOrganizationLearners(organizationIds) {
  if (!organizationIds?.length) return [];
  const result = await supabase.rpc("pansofie_list_assignable_school_learners", { target_org_ids: organizationIds });
  return throwIfError(result, "Assignable learner directory load failed") || [];
}

export async function listTeacherSchoolRuns(organizationIds) {
  if (!organizationIds?.length) return [];
  const result = await supabase
    .from("mission_runs")
    .select("id, user_id, status, started_at, submitted_at, completed_at, organization_id, assigned_by, mission_version_id, cohort_id, team_id, created_at, missions(id, slug, title, summary, path_ids), organizations(id, slug, name)")
    .in("organization_id", organizationIds)
    .in("status", ["assigned", "in_progress", "submitted"])
    .order("created_at", { ascending: false });
  return throwIfError(result, "Teacher run queue load failed") || [];
}

export async function listPilotCohorts(organizationIds) {
  if (!organizationIds?.length) return [];
  const result = await supabase
    .from("pilot_cohorts")
    .select("id, organization_id, name, status, starts_on, ends_on, activated_at, activated_by, created_at, pilot_cohort_members(id, user_id, role, status)")
    .in("organization_id", organizationIds)
    .order("created_at", { ascending: false });
  return throwIfError(result, "Pilot cohorts load failed") || [];
}

export async function listExperienceTeams(cohortIds) {
  if (!cohortIds?.length) return [];
  const result = await supabase
    .from("experience_teams")
    .select("id, cohort_id, name, status, created_at, experience_team_members(id, user_id, role, status)")
    .in("cohort_id", cohortIds)
    .order("created_at", { ascending: true });
  return throwIfError(result, "Experience teams load failed") || [];
}

export async function createPilotCohort({ organizationId, name, startsOn = null, endsOn = null }) {
  const result = await supabase.rpc("pansofie_create_pilot_cohort", {
    target_org_id: organizationId,
    target_name: name,
    target_starts_on: startsOn,
    target_ends_on: endsOn,
  });
  return throwIfError(result, "Pilot cohort creation failed");
}

export async function addPilotCohortMember({ cohortId, userId, role }) {
  const result = await supabase.rpc("pansofie_add_pilot_cohort_member", {
    target_cohort_id: cohortId,
    target_user_id: userId,
    target_role: role,
  });
  return throwIfError(result, "Pilot cohort member add failed");
}

export async function createExperienceTeam({ cohortId, name }) {
  const result = await supabase.rpc("pansofie_create_experience_team", {
    target_cohort_id: cohortId,
    target_name: name,
  });
  return throwIfError(result, "Experience team creation failed");
}

export async function addExperienceTeamMember({ teamId, userId, role = "learner" }) {
  const result = await supabase.rpc("pansofie_add_experience_team_member", {
    target_team_id: teamId,
    target_user_id: userId,
    target_role: role,
  });
  return throwIfError(result, "Experience team member add failed");
}

export async function assignPilotTeamMission({ missionId, teamId }) {
  const result = await supabase.rpc("pansofie_assign_pilot_team_mission", {
    target_mission_id: missionId,
    target_team_id: teamId,
  });
  return throwIfError(result, "Pilot team mission assignment failed") || [];
}

export async function getPilotReadiness(cohortId) {
  if (!cohortId) return null;
  const result = await supabase.rpc("pansofie_pilot_readiness", { target_cohort_id: cohortId });
  return throwIfError(result, "Pilot readiness load failed");
}

export async function getPilotMetrics(cohortId) {
  if (!cohortId) return null;
  const result = await supabase.rpc("pansofie_pilot_metrics", { target_cohort_id: cohortId });
  return throwIfError(result, "Pilot metrics load failed");
}

export async function listPilotResponsibilities(cohortId) {
  if (!cohortId) return [];
  const result = await supabase
    .from("pilot_responsibilities")
    .select("id, cohort_id, responsibility, contact_name, contact_email, confirmed_at, updated_at")
    .eq("cohort_id", cohortId)
    .order("responsibility", { ascending: true });
  return throwIfError(result, "Pilot responsibilities load failed") || [];
}

export async function setPilotResponsibility({ cohortId, responsibility, contactName, contactEmail, userId = null }) {
  const result = await supabase.rpc("pansofie_set_pilot_responsibility", {
    target_cohort_id: cohortId,
    target_responsibility: responsibility,
    target_contact_name: contactName,
    target_contact_email: contactEmail,
    target_user_id: userId,
  });
  return throwIfError(result, "Pilot responsibility save failed");
}

export async function recordPilotTeacherLoad({ cohortId, weekStart, minutes, note = null }) {
  const result = await supabase.rpc("pansofie_record_teacher_load", {
    target_cohort_id: cohortId,
    target_week_start: weekStart,
    target_minutes: Number(minutes),
    target_note: note?.trim() || null,
  });
  return throwIfError(result, "Teacher load save failed");
}

export async function listPilotIncidents(cohortId) {
  if (!cohortId) return [];
  const result = await supabase
    .from("pilot_incidents")
    .select("id, severity, category, status, summary, reported_at, resolved_at, updated_at")
    .eq("cohort_id", cohortId)
    .order("reported_at", { ascending: false });
  return throwIfError(result, "Pilot incidents load failed") || [];
}

export async function reportPilotIncident({ cohortId, severity, category, summary }) {
  const result = await supabase.rpc("pansofie_report_pilot_incident", {
    target_cohort_id: cohortId,
    target_severity: severity,
    target_category: category,
    target_summary: summary,
  });
  return throwIfError(result, "Pilot incident report failed");
}

export async function setPilotIncidentStatus({ incidentId, status }) {
  const result = await supabase.rpc("pansofie_set_pilot_incident_status", {
    target_incident_id: incidentId,
    target_status: status,
  });
  return throwIfError(result, "Pilot incident status update failed");
}

export async function activatePilotCohort(cohortId) {
  const result = await supabase.rpc("pansofie_activate_pilot_cohort", { target_cohort_id: cohortId });
  return throwIfError(result, "Pilot activation failed");
}

export async function assignSchoolMission({ missionId, learnerId, organizationId }) {
  const result = await supabase.rpc("pansofie_assign_school_mission", {
    target_mission_id: missionId,
    target_learner_id: learnerId,
    target_org_id: organizationId,
  });
  return throwIfError(result, "Mission assignment failed");
}

export async function startMissionRun(runId) {
  const result = await supabase.rpc("pansofie_start_mission", { target_run_id: runId });
  return throwIfError(result, "Mission start failed");
}

export async function addEvidenceNote({ runId, ownerId, description }) {
  const clean = description?.trim();
  if (!clean) throw new Error("Evidence description is required");
  const result = await supabase
    .from("experience_evidence")
    .insert({ run_id: runId, owner_id: ownerId, kind: "note", description: clean })
    .select("id, kind, description, created_at")
    .single();
  return throwIfError(result, "Evidence save failed");
}

export async function saveReflection({ runId, userId, reflection }) {
  const payload = {
    run_id: runId,
    user_id: userId,
    what_happened: reflection.what_happened?.trim() || null,
    what_worked: reflection.what_worked?.trim() || null,
    what_failed: reflection.what_failed?.trim() || null,
    what_learned: reflection.what_learned?.trim() || null,
    transfer: reflection.transfer?.trim() || null,
    contribution: reflection.contribution?.trim() || null,
  };
  const result = await supabase.from("experience_reflections").upsert(payload, { onConflict: "run_id" }).select("*").single();
  return throwIfError(result, "Reflection save failed");
}

export async function submitMissionRun(runId) {
  const result = await supabase.rpc("pansofie_submit_mission", { target_run_id: runId });
  return throwIfError(result, "Mission submission failed");
}

export async function reviewSchoolRun({ runId, scope, status, note }) {
  const result = await supabase.rpc("pansofie_review_school_run", {
    target_run_id: runId,
    target_scope: scope,
    target_status: status,
    target_note: note?.trim() || null,
  });
  return throwIfError(result, "Review save failed");
}

export async function finalizeSchoolExperience(runId) {
  const result = await supabase.rpc("pansofie_finalize_school_experience", { target_run_id: runId });
  return throwIfError(result, "Experience finalization failed");
}

export async function getRunDetail(runId) {
  const runResult = await supabase
    .from("mission_runs")
    .select("id, mission_id, mission_version_id, cohort_id, team_id, user_id, organization_id, assigned_by, status, started_at, submitted_at, completed_at, created_at, missions(id, slug, title, summary, why, program_id, lab_id, path_ids, evidence_prompt, reflection_prompt, transfer_prompt, contribution_prompt, safety_notes), organizations(id, slug, name, organization_type), mission_versions(id, version_no, snapshot, content_hash)")
    .eq("id", runId)
    .single();
  const run = throwIfError(runResult, "Mission run load failed");

  const [evidenceResult, reflectionResult, reviewsResult, experienceResult] = await Promise.all([
    supabase.from("experience_evidence").select("id, owner_id, kind, uri, description, metadata, created_at").eq("run_id", runId).order("created_at", { ascending: true }),
    supabase.from("experience_reflections").select("*").eq("run_id", runId).maybeSingle(),
    supabase.from("experience_reviews").select("id, reviewer_id, review_scope, status, note, created_at, updated_at").eq("run_id", runId).order("updated_at", { ascending: false }),
    supabase.from("experiences").select("id, mission_version_id, cohort_id, team_id, title, path_ids, impact_summary, occurred_at, portfolio_items(id, title, summary, visibility, verified_by, verified_at)").eq("run_id", runId).maybeSingle(),
  ]);

  if (evidenceResult.error) throw new Error(`Evidence load failed: ${evidenceResult.error.message}`);
  if (reflectionResult.error) throw new Error(`Reflection load failed: ${reflectionResult.error.message}`);
  if (reviewsResult.error) throw new Error(`Reviews load failed: ${reviewsResult.error.message}`);
  if (experienceResult.error) throw new Error(`Experience load failed: ${experienceResult.error.message}`);

  return { run, evidence: evidenceResult.data || [], reflection: reflectionResult.data || null, reviews: reviewsResult.data || [], experience: experienceResult.data || null };
}

export async function listMyPortfolio(userId) {
  if (!userId) return [];
  const result = await supabase
    .from("portfolio_items")
    .select("id, title, summary, visibility, verified_by, verified_at, created_at, experiences(id, mission_id, mission_version_id, cohort_id, team_id, path_ids, impact_summary, occurred_at)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return throwIfError(result, "Portfolio load failed") || [];
}
