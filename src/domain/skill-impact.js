import { MISSION_GROW_001, SKILL_ECOLOGICAL_THINKING } from "./learning-core.js";

export const GROW_IMPACT_DIMENSION = "nature";
export const GROW_IMPACT_METRIC = "grow.documented_observation";

async function getGrowEvidenceContext(supabase, userId) {
  const { data: mission, error: missionError } = await supabase
    .from("missions").select("id, slug").eq("slug", MISSION_GROW_001.slug).eq("status", "published").maybeSingle();
  if (missionError) throw missionError;
  if (!mission) throw new Error("Mise není dostupná.");

  const { data: run, error: runError } = await supabase
    .from("mission_runs").select("id, mission_id, status, completed_at").eq("mission_id", mission.id)
    .eq("user_id", userId).eq("status", "completed").order("updated_at", { ascending: false }).limit(1).maybeSingle();
  if (runError) throw runError;
  if (!run) return { mission, run: null, evidence: null };

  const { data: evidenceRows, error: evidenceError } = await supabase
    .from("experience_evidence").select("id, description, metadata").eq("run_id", run.id).eq("owner_id", userId).eq("kind", "note");
  if (evidenceError) throw evidenceError;
  const evidence = (evidenceRows || []).find((row) => row.metadata?.source === "go_optional_note" && row.description?.trim()) || null;
  return { mission, run, evidence };
}

async function getMappedSkill(supabase, missionId) {
  const { data: skill, error: skillError } = await supabase
    .from("skills").select("id, code, domain_id, title_cs, title_en").eq("code", SKILL_ECOLOGICAL_THINKING.code).eq("status", "active").maybeSingle();
  if (skillError) throw skillError;
  if (!skill) return null;
  const { data: mapping, error: mappingError } = await supabase
    .from("mission_skills").select("mission_id, skill_id").eq("mission_id", missionId).eq("skill_id", skill.id).maybeSingle();
  if (mappingError) throw mappingError;
  return mapping ? skill : null;
}

export async function loadGrowSkillImpactState(supabase, { userId }) {
  const context = await getGrowEvidenceContext(supabase, userId);
  if (!context.run) return { eligible: false, reason: "mission_not_completed", evidence: null, skill: null, attestation: null, impact: null };
  const skill = await getMappedSkill(supabase, context.mission.id);
  if (!skill) return { eligible: false, reason: "skill_not_mapped", evidence: context.evidence, skill: null, attestation: null, impact: null };
  if (!context.evidence) return { eligible: false, reason: "evidence_missing", evidence: null, skill, attestation: null, impact: null };
  const [attestationResult, impactResult] = await Promise.all([
    supabase.from("skill_attestations").select("id, level, attestation_type, created_at").eq("user_id", userId)
      .eq("skill_id", skill.id).eq("evidence_id", context.evidence.id).eq("attestation_type", "self").maybeSingle(),
    supabase.from("impact_observations").select("id, dimension, metric_key, value_numeric, unit, created_at").eq("user_id", userId)
      .eq("evidence_id", context.evidence.id).eq("dimension", GROW_IMPACT_DIMENSION).eq("metric_key", GROW_IMPACT_METRIC).maybeSingle(),
  ]);
  if (attestationResult.error) throw attestationResult.error;
  if (impactResult.error) throw impactResult.error;
  return { eligible: true, reason: null, evidence: { id: context.evidence.id }, skill, attestation: attestationResult.data || null, impact: impactResult.data || null };
}

export async function recordGrowSkillImpactForUser(supabase, { slug, userId }) {
  if (slug !== MISSION_GROW_001.slug) throw new Error("Tento důkazní tok je dostupný jen pro canonical Grow misi.");
  let state = await loadGrowSkillImpactState(supabase, { userId });
  if (!state.eligible || !state.evidence?.id || !state.skill?.id) throw new Error("Nejdřív dokonči misi a ulož konkrétní volitelný záznam.");
  if (!state.attestation) {
    const { error } = await supabase.from("skill_attestations").insert({
      user_id: userId, skill_id: state.skill.id, evidence_id: state.evidence.id,
      level: 1, attestation_type: "self", attested_by: userId,
      note: "Sebedoložení založené na vlastním záznamu z dokončené mise.",
    });
    if (error && error.code !== "23505") throw error;
  }
  if (!state.impact) {
    const { error } = await supabase.from("impact_observations").insert({
      user_id: userId, dimension: GROW_IMPACT_DIMENSION, metric_key: GROW_IMPACT_METRIC,
      value_numeric: 1, unit: "documented_observation", evidence_id: state.evidence.id, recorded_by: userId,
    });
    if (error && error.code !== "23505") throw error;
  }
  state = await loadGrowSkillImpactState(supabase, { userId });
  return state;
}
