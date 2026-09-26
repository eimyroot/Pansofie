import { createClient } from "../lib/supabase/server.js";
import { normalizeCycleProgress, normalizeMissionCycle, topicMeta } from "./mission-cycle.js";

const ASSIGNMENT_SELECT = `
  id, school_id, class_id, scope, target_user_id, status,
  available_from, due_at,
  missions(
    id, slug, title, summary, why, program_id, path_ids,
    estimated_minutes, evidence_prompt, reflection_prompt,
    transfer_prompt, contribution_prompt, safety_notes,
    topic_key, difficulty, learning_cycle
  )
`;

export async function loadOwnedSchoolQuestLink(supabase, { assignmentId, userId }) {
  const { data: link, error: linkError } = await supabase
    .from("school_mission_assignment_runs")
    .select("assignment_id, mission_run_id")
    .eq("assignment_id", assignmentId)
    .eq("user_id", userId)
    .maybeSingle();
  if (linkError) throw linkError;
  if (!link) return null;

  const [{ data: assignment, error: assignmentError }, { data: run, error: runError }] = await Promise.all([
    supabase.from("school_mission_assignments").select(ASSIGNMENT_SELECT).eq("id", assignmentId).maybeSingle(),
    supabase.from("mission_runs").select("id, mission_id, user_id, status, started_at, completed_at, updated_at").eq("id", link.mission_run_id).eq("user_id", userId).maybeSingle(),
  ]);
  if (assignmentError) throw assignmentError;
  if (runError) throw runError;
  if (!assignment || !run) return null;
  return { assignment, run };
}
async function loadQuestDocumentation(supabase, runId, userId) {
  const [evidenceResult, reflectionResult, cycleResult] = await Promise.all([
    supabase.from("experience_evidence")
      .select("id, description, metadata")
      .eq("run_id", runId).eq("owner_id", userId).eq("kind", "note"),
    supabase.from("experience_reflections")
      .select("id, what_learned")
      .eq("run_id", runId).eq("user_id", userId).maybeSingle(),
    supabase.from("mission_run_cycle_progress")
      .select("current_phase, completed_phases")
      .eq("run_id", runId).eq("user_id", userId).maybeSingle(),
  ]);
  if (evidenceResult.error) throw evidenceResult.error;
  if (reflectionResult.error) throw reflectionResult.error;
  if (cycleResult.error) throw cycleResult.error;

  const note = (evidenceResult.data || [])
    .find((row) => row.metadata?.source === "go_optional_note");
  return {
    evidenceNote: note?.description || "",
    reflection: reflectionResult.data?.what_learned || "",
    cycle: normalizeCycleProgress(cycleResult.data),
  };
}

export async function loadSchoolQuestExperience(context, assignmentId) {
  if (!context?.userId) return { mode: "locked", reason: "anonymous" };
  if (!context.organization || context.organization.organization_type !== "school") {
    return { mode: "locked", reason: "school_context_required" };
  }
  const supabase = await createClient();
  if (!supabase) return { mode: "unavailable", reason: "supabase_not_configured" };
  const owned = await loadOwnedSchoolQuestLink(supabase, {
    assignmentId,
    userId: context.userId,
  });
  if (!owned || owned.assignment.school_id !== context.organization.id) {
    return { mode: "locked", reason: "assignment_not_owned" };
  }

  const [{ data: classRow, error: classError }, documentation] = await Promise.all([
    supabase.from("school_classes")
      .select("id, name, academic_year")
      .eq("id", owned.assignment.class_id)
      .maybeSingle(),
    loadQuestDocumentation(supabase, owned.run.id, context.userId),
  ]);
  if (classError) throw classError;

  const mission = owned.assignment.missions;
  const topic = topicMeta(mission?.topic_key);
  return {
    mode: "quest",
    assignment: {
      id: owned.assignment.id,
      status: owned.assignment.status,
      scope: owned.assignment.scope,
      dueAt: owned.assignment.due_at,
      availableFrom: owned.assignment.available_from,
    },
    class: classRow ? {
      id: classRow.id,
      name: classRow.name,
      academicYear: classRow.academic_year,
    } : null,
    mission: {
      id: mission.id,
      slug: mission.slug,
      title: mission.title,
      summary: mission.summary || "",
      why: mission.why || "",
      programId: mission.program_id || null,
      estimatedMinutes: mission.estimated_minutes || null,
      difficulty: mission.difficulty || null,
      safetyNotes: mission.safety_notes || "",
      evidencePrompt: mission.evidence_prompt || "",
      reflectionPrompt: mission.reflection_prompt || "",
      topicKey: mission.topic_key || null,
      topic,
      phases: normalizeMissionCycle(mission),
    },
    run: {
      id: owned.run.id,
      status: owned.run.status,
      startedAt: owned.run.started_at,
      completedAt: owned.run.completed_at,
      updatedAt: owned.run.updated_at,
    },
    cycle: documentation.cycle,
    evidenceNote: documentation.evidenceNote,
    reflection: documentation.reflection,
  };
}
