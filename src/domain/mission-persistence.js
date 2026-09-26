import { loadGrowSkillImpactState } from "./skill-impact.js";

const ACTIVE_STATUSES = ["assigned", "in_progress", "submitted"];

async function findMission(supabase, slug) {
  const { data, error } = await supabase
    .from("missions")
    .select("id, slug, title, path_ids, program_id, lab_id, status")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Mise není dostupná.");
  return data;
}

async function findLatestRun(supabase, missionId, userId) {
  const { data, error } = await supabase
    .from("mission_runs")
    .select("id, mission_id, user_id, status, started_at, completed_at, updated_at")
    .eq("mission_id", missionId)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

function normalizeRun(run) {
  if (!run) return null;
  return {
    id: run.id, status: run.status, startedAt: run.started_at,
    completedAt: run.completed_at, updatedAt: run.updated_at,
  };
}

export async function loadMissionAccountState(supabase, { slug, userId }) {
  const mission = await findMission(supabase, slug);
  const run = await findLatestRun(supabase, mission.id, userId);
  if (!run) return { mission, run: null, evidenceNote: "", reflection: "", experience: null, portfolio: null, skillImpact: { eligible: false, reason: "mission_not_completed", evidence: null, skill: null, attestation: null, impact: null } };

  const [evidenceResult, reflectionResult, experienceResult] = await Promise.all([
    supabase.from("experience_evidence").select("id, description, metadata").eq("run_id", run.id).eq("owner_id", userId).eq("kind", "note"),
    supabase.from("experience_reflections").select("id, what_learned").eq("run_id", run.id).eq("user_id", userId).maybeSingle(),
    supabase.from("experiences").select("id, title, occurred_at").eq("run_id", run.id).eq("user_id", userId).maybeSingle(),
  ]);
  const note = evidenceResult.error ? null : (evidenceResult.data || []).find((row) => row.metadata?.source === "go_optional_note");
  const experience = experienceResult.error ? null : experienceResult.data;
  let portfolio = null;
  if (experience?.id) {
    const { data } = await supabase.from("portfolio_items").select("id, title, summary, visibility, created_at").eq("experience_id", experience.id).eq("user_id", userId).maybeSingle();
    portfolio = data || null;
  }
  const skillImpact = mission.slug === "vypestuj-prvni-rostlinu"
    ? await loadGrowSkillImpactState(supabase, { userId })
    : { eligible: false, reason: "unsupported_mission", evidence: null, skill: null, attestation: null, impact: null };
  return {
    mission, run: normalizeRun(run), evidenceNote: note?.description || "",
    reflection: reflectionResult.error ? "" : (reflectionResult.data?.what_learned || ""),
    experience, portfolio, skillImpact,
  };
}

export async function startMissionForUser(supabase, { slug, userId }) {
  const mission = await findMission(supabase, slug);
  const latest = await findLatestRun(supabase, mission.id, userId);
  if (latest && latest.status !== "cancelled") return { mission, run: normalizeRun(latest) };
  const now = new Date().toISOString();
  const { data, error } = await supabase.from("mission_runs").insert({
    mission_id: mission.id, user_id: userId, status: "in_progress", started_at: now,
  }).select("id, mission_id, user_id, status, started_at, completed_at, updated_at").single();
  if (error) throw error;
  return { mission, run: normalizeRun(data) };
}

async function ensureExperiencePortfolio(supabase, { mission, run, userId }) {
  let { data: experience, error: experienceError } = await supabase
    .from("experiences")
    .select("id, title, occurred_at")
    .eq("run_id", run.id).eq("user_id", userId).maybeSingle();
  if (experienceError) throw experienceError;
  if (!experience) {
    const inserted = await supabase.from("experiences").insert({
      run_id: run.id, mission_id: mission.id, user_id: userId, title: mission.title,
      path_ids: mission.path_ids || [], program_id: mission.program_id || null,
      lab_id: mission.lab_id || null, occurred_at: run.completedAt || new Date().toISOString(),
    }).select("id, title, occurred_at").single();
    if (inserted.error) throw inserted.error;
    experience = inserted.data;
  }
  let { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio_items")
    .select("id, title, summary, visibility, created_at")
    .eq("experience_id", experience.id).eq("user_id", userId).maybeSingle();
  if (portfolioError) throw portfolioError;
  if (!portfolio) {
    const inserted = await supabase.from("portfolio_items").insert({
      experience_id: experience.id, user_id: userId, title: mission.title,
      summary: "Soukromá položka vytvořená z dokončené mise.", visibility: "private",
    }).select("id, title, summary, visibility, created_at").single();
    if (inserted.error) throw inserted.error;
    portfolio = inserted.data;
  }
  return { experience, portfolio };
}

export async function completeMissionForUser(supabase, { slug, userId }) {
  const started = await startMissionForUser(supabase, { slug, userId });
  let run = started.run;
  if (run.status !== "completed") {
    const now = new Date().toISOString();
    const { data, error } = await supabase.from("mission_runs").update({
      status: "completed", started_at: run.startedAt || now, completed_at: now,
    }).eq("id", run.id).eq("user_id", userId)
      .select("id, mission_id, user_id, status, started_at, completed_at, updated_at").single();
    if (error) throw error;
    run = normalizeRun(data);
  }
  const materialized = await ensureExperiencePortfolio(supabase, { mission: started.mission, run, userId });
  return { mission: started.mission, run, ...materialized };
}

export async function saveMissionDocumentationForUser(supabase, { slug, userId, evidenceNote = "", reflection = "" }) {
  const state = await loadMissionAccountState(supabase, { slug, userId });
  if (!state.run) throw new Error("Nejdřív misi otevři.");
  const note = evidenceNote.trim();
  const learned = reflection.trim();
  const { data: evidenceRows, error: evidenceError } = await supabase
    .from("experience_evidence").select("id, metadata").eq("run_id", state.run.id).eq("owner_id", userId).eq("kind", "note");
  if (evidenceError) throw evidenceError;
  const existingNote = (evidenceRows || []).find((row) => row.metadata?.source === "go_optional_note");
  if (note) {
    const write = existingNote
      ? supabase.from("experience_evidence").update({ description: note, metadata: { source: "go_optional_note" } }).eq("id", existingNote.id)
      : supabase.from("experience_evidence").insert({ run_id: state.run.id, owner_id: userId, kind: "note", description: note, metadata: { source: "go_optional_note" } });
    const { error } = await write; if (error) throw error;
  } else if (existingNote) {
    const { error } = await supabase.from("experience_evidence").delete().eq("id", existingNote.id); if (error) throw error;
  }
  const { data: existingReflection, error: reflectionReadError } = await supabase
    .from("experience_reflections").select("id").eq("run_id", state.run.id).eq("user_id", userId).maybeSingle();
  if (reflectionReadError) throw reflectionReadError;
  if (existingReflection) {
    const { error } = await supabase.from("experience_reflections").update({ what_learned: learned || null }).eq("id", existingReflection.id);
    if (error) throw error;
  } else if (learned) {
    const { error } = await supabase.from("experience_reflections").insert({ run_id: state.run.id, user_id: userId, what_learned: learned });
    if (error) throw error;
  }
  return loadMissionAccountState(supabase, { slug, userId });
}

export { ACTIVE_STATUSES };
