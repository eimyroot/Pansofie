function normalizeAssignment(row) {
  if (!row) return null;
  return {
    id: row.id,
    schoolId: row.school_id,
    classId: row.class_id,
    scope: row.scope,
    targetUserId: row.target_user_id || null,
    status: row.status,
    availableFrom: row.available_from,
    dueAt: row.due_at || null,
    assignedBy: row.assigned_by,
    createdAt: row.created_at,
    mission: row.missions ? {
      id: row.missions.id,
      slug: row.missions.slug,
      title: row.missions.title,
      summary: row.missions.summary || "",
      programId: row.missions.program_id || null,
    } : null,
  };
}

async function findPublishedMission(supabase, slug) {
  const { data, error } = await supabase
    .from("missions")
    .select("id, slug, title, summary, program_id")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Mise není dostupná pro školní zadání.");
  return data;
}

export async function loadSchoolMissionAssignments(supabase, { classId }) {
  let query = supabase
    .from("school_mission_assignments")
    .select(`
      id, school_id, class_id, scope, target_user_id, status,
      available_from, due_at, assigned_by, created_at,
      missions(id, slug, title, summary, program_id)
    `)
    .order("created_at", { ascending: false });

  if (classId) query = query.eq("class_id", classId);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(normalizeAssignment);
}

export async function assignSchoolMission(supabase, {
  classId,
  missionSlug,
  targetLearnerId = null,
  availableFrom = null,
  dueAt = null,
}) {
  const mission = await findPublishedMission(supabase, missionSlug);
  const { data, error } = await supabase.rpc("assign_school_mission", {
    target_class_id: classId,
    target_mission_id: mission.id,
    target_learner_id: targetLearnerId || null,
    target_available_from: availableFrom || new Date().toISOString(),
    target_due_at: dueAt || null,
  }).single();

  if (error) throw error;
  return {
    assignmentId: data.assignment_id,
    assignedCount: Number(data.assigned_count || 0),
    reusedRunCount: Number(data.reused_run_count || 0),
    mission: {
      id: mission.id,
      slug: mission.slug,
      title: mission.title,
    },
  };
}

export async function cancelSchoolMissionAssignment(supabase, { assignmentId }) {
  const { data, error } = await supabase.rpc(
    "cancel_school_mission_assignment",
    { target_assignment_id: assignmentId },
  );
  if (error) throw error;
  return Boolean(data);
}
