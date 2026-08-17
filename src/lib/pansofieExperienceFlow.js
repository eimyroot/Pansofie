import { supabase } from "@/api/supabaseClient";

export const SCHOOL_RUN_STATUSES = Object.freeze([
  "assigned",
  "in_progress",
  "submitted",
  "completed",
  "cancelled",
]);

export const REVIEW_SCOPES = Object.freeze([
  "mission",
  "evidence",
  "reflection",
  "passport",
]);

export const REVIEW_STATUSES = Object.freeze([
  "pending",
  "confirmed",
  "needs_revision",
  "not_verified",
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
    .select("id, status, started_at, submitted_at, completed_at, organization_id, assigned_by, created_at, missions(id, slug, title, summary, why, program_id, lab_id, path_ids, evidence_prompt, reflection_prompt, transfer_prompt, contribution_prompt, safety_notes), organizations(id, slug, name, organization_type)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return throwIfError(result, "My mission runs load failed") || [];
}

export async function listOrganizationLearners(organizationIds) {
  if (!organizationIds?.length) return [];
  const result = await supabase.rpc("pansofie_list_assignable_school_learners", {
    target_org_ids: organizationIds,
  });
  return throwIfError(result, "Assignable learner directory load failed") || [];
}

export async function listTeacherSchoolRuns(organizationIds) {
  if (!organizationIds?.length) return [];
  const result = await supabase
    .from("mission_runs")
    .select("id, user_id, status, started_at, submitted_at, completed_at, organization_id, assigned_by, created_at, missions(id, slug, title, summary, path_ids), organizations(id, slug, name)")
    .in("organization_id", organizationIds)
    .in("status", ["assigned", "in_progress", "submitted"])
    .order("created_at", { ascending: false });
  return throwIfError(result, "Teacher run queue load failed") || [];
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
  const result = await supabase.rpc("pansofie_start_mission", {
    target_run_id: runId,
  });
  return throwIfError(result, "Mission start failed");
}

export async function addEvidenceNote({ runId, ownerId, description }) {
  const clean = description?.trim();
  if (!clean) throw new Error("Evidence description is required");
  const result = await supabase
    .from("experience_evidence")
    .insert({
      run_id: runId,
      owner_id: ownerId,
      kind: "note",
      description: clean,
    })
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

  const result = await supabase
    .from("experience_reflections")
    .upsert(payload, { onConflict: "run_id" })
    .select("*")
    .single();
  return throwIfError(result, "Reflection save failed");
}

export async function submitMissionRun(runId) {
  const result = await supabase.rpc("pansofie_submit_mission", {
    target_run_id: runId,
  });
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
  const result = await supabase.rpc("pansofie_finalize_school_experience", {
    target_run_id: runId,
  });
  return throwIfError(result, "Experience finalization failed");
}

export async function getRunDetail(runId) {
  const runResult = await supabase
    .from("mission_runs")
    .select("id, mission_id, user_id, organization_id, assigned_by, status, started_at, submitted_at, completed_at, created_at, missions(id, slug, title, summary, why, program_id, lab_id, path_ids, evidence_prompt, reflection_prompt, transfer_prompt, contribution_prompt, safety_notes), organizations(id, slug, name, organization_type)")
    .eq("id", runId)
    .single();
  const run = throwIfError(runResult, "Mission run load failed");

  const [evidenceResult, reflectionResult, reviewsResult, experienceResult] = await Promise.all([
    supabase
      .from("experience_evidence")
      .select("id, owner_id, kind, uri, description, metadata, created_at")
      .eq("run_id", runId)
      .order("created_at", { ascending: true }),
    supabase
      .from("experience_reflections")
      .select("*")
      .eq("run_id", runId)
      .maybeSingle(),
    supabase
      .from("experience_reviews")
      .select("id, reviewer_id, review_scope, status, note, created_at, updated_at")
      .eq("run_id", runId)
      .order("updated_at", { ascending: false }),
    supabase
      .from("experiences")
      .select("id, title, path_ids, impact_summary, occurred_at, portfolio_items(id, title, summary, visibility, verified_by, verified_at)")
      .eq("run_id", runId)
      .maybeSingle(),
  ]);

  // Purpose-specific RLS may intentionally hide evidence/reflection/reviews from
  // a teacher who lacks that exact processing basis. Treat an RLS-visible empty
  // result as scoped absence, but surface actual query errors.
  if (evidenceResult.error) throw new Error(`Evidence load failed: ${evidenceResult.error.message}`);
  if (reflectionResult.error) throw new Error(`Reflection load failed: ${reflectionResult.error.message}`);
  if (reviewsResult.error) throw new Error(`Reviews load failed: ${reviewsResult.error.message}`);
  if (experienceResult.error) throw new Error(`Experience load failed: ${experienceResult.error.message}`);

  return {
    run,
    evidence: evidenceResult.data || [],
    reflection: reflectionResult.data || null,
    reviews: reviewsResult.data || [],
    experience: experienceResult.data || null,
  };
}

export async function listMyPortfolio(userId) {
  if (!userId) return [];
  const result = await supabase
    .from("portfolio_items")
    .select("id, title, summary, visibility, verified_by, verified_at, created_at, experiences(id, mission_id, path_ids, impact_summary, occurred_at)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return throwIfError(result, "Portfolio load failed") || [];
}
