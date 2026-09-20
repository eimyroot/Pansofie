export const PROJECT_PARTICIPATION_MODES = Object.freeze(["individual", "team"]);
export const PROJECT_PARTICIPATION_STATUSES = Object.freeze(["joined", "left"]);

export function validateProjectParticipationDraft(draft) {
  const errors = [];
  if (!draft || typeof draft !== "object") return ["participation draft must be an object"];
  if (typeof draft.slug !== "string" || draft.slug.trim() === "") errors.push("slug is required");
  if (!PROJECT_PARTICIPATION_MODES.includes(draft.participationMode)) errors.push("participationMode is invalid");
  if (draft.participationMode === "individual" && draft.organizationId) {
    errors.push("individual participation cannot carry organizationId");
  }
  if (draft.participationMode === "team" && !draft.organizationId) {
    errors.push("team participation requires organizationId");
  }
  return errors;
}

export function normalizeProjectProgress(row) {
  if (!row) return Object.freeze({ completed: 0, total: 0, isComplete: false });
  const completed = Number(row.completed_missions || 0);
  const total = Number(row.total_missions || 0);
  return Object.freeze({
    completed,
    total,
    isComplete: Boolean(row.is_complete) && total > 0 && completed === total,
  });
}

async function findVisibleProject(supabase, slug) {
  const { data, error } = await supabase
    .from("projects")
    .select("id, blueprint_key, slug, title, program_id, status, model_only, participation_policy, location_policy, documentation_mode")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Projekt není dostupný.");
  return data;
}

export async function loadProjectAccountState(supabase, { slug, userId }) {
  const project = await findVisibleProject(supabase, slug);
  const [{ data: participation, error: participationError }, { data: progress, error: progressError }] = await Promise.all([
    supabase
      .from("project_participations")
      .select("id, project_id, organization_id, participation_mode, status, joined_at, left_at")
      .eq("project_id", project.id)
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("user_project_progress")
      .select("project_id, project_slug, total_missions, completed_missions, is_complete")
      .eq("project_id", project.id)
      .eq("user_id", userId)
      .maybeSingle(),
  ]);
  if (participationError) throw participationError;
  if (progressError) throw progressError;
  return {
    project,
    participation,
    progress: normalizeProjectProgress(progress),
  };
}

export async function joinProjectForUser(supabase, { slug, userId, participationMode = "individual", organizationId = null }) {
  const validation = validateProjectParticipationDraft({ slug, participationMode, organizationId });
  if (validation.length) throw new Error(validation.join("; "));
  const project = await findVisibleProject(supabase, slug);
  const { data: existing, error: existingError } = await supabase
    .from("project_participations")
    .select("id, project_id, organization_id, participation_mode, status, joined_at, left_at")
    .eq("project_id", project.id)
    .eq("user_id", userId)
    .maybeSingle();
  if (existingError) throw existingError;

  const write = existing
    ? supabase
        .from("project_participations")
        .update({
          organization_id: organizationId,
          participation_mode: participationMode,
          status: "joined",
          left_at: null,
        })
        .eq("id", existing.id)
    : supabase
        .from("project_participations")
        .insert({
          project_id: project.id,
          user_id: userId,
          organization_id: organizationId,
          participation_mode: participationMode,
          status: "joined",
          left_at: null,
        });

  const { data, error } = await write
    .select("id, project_id, organization_id, participation_mode, status, joined_at, left_at")
    .single();
  if (error) throw error;
  return { project, participation: data };
}
