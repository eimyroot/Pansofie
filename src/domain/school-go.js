import { createClient } from "../lib/supabase/server.js";
import { loadSchoolMissionAssignments } from "./school-mission-assignment.js";

const STAFF_ROLES = new Set(["teacher", "mentor"]);

function schoolRoleLabel(role) {
  return {
    coordinator: "Školní administrátor",
    teacher: "Učitel",
    mentor: "Mentor",
    learner: "Student",
  }[role] || "Člen školy";
}

function normalizeMission(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary || "",
    estimatedMinutes: row.estimated_minutes || null,
    programId: row.program_id || null,
    topicKey: row.topic_key || null,
    difficulty: row.difficulty || null,
  };
}

function summarizeProgress(rows = []) {
  const summary = { total: rows.length, assigned: 0, inProgress: 0, submitted: 0, completed: 0 };
  for (const row of rows) {
    if (row.run_status === "completed") summary.completed += 1;
    else if (row.run_status === "submitted") summary.submitted += 1;
    else if (row.run_status === "in_progress") summary.inProgress += 1;
    else summary.assigned += 1;
  }
  return summary;
}
async function loadLearnerRunState(supabase, userId) {
  const { data: links, error: linksError } = await supabase
    .from("school_mission_assignment_runs")
    .select("assignment_id, mission_run_id")
    .eq("user_id", userId);
  if (linksError) throw linksError;

  const runIds = (links || []).map((row) => row.mission_run_id);
  if (!runIds.length) return new Map();

  const { data: runs, error: runsError } = await supabase
    .from("mission_runs")
    .select("id, status, started_at, completed_at")
    .in("id", runIds);
  if (runsError) throw runsError;

  const runsById = new Map((runs || []).map((row) => [row.id, row]));
  return new Map((links || []).map((link) => {
    const run = runsById.get(link.mission_run_id);
    return [link.assignment_id, run ? {
      id: run.id,
      status: run.status,
      startedAt: run.started_at,
      completedAt: run.completed_at,
    } : null];
  }));
}

async function loadClassSnapshot(supabase, row, context, orgRole, ownRole) {
  const canManage = orgRole === "coordinator" || STAFF_ROLES.has(ownRole);
  const assignments = (await loadSchoolMissionAssignments(supabase, { classId: row.id }))
    .filter((assignment) => assignment.status === "active");

  if (!canManage) {
    const ownRuns = await loadLearnerRunState(supabase, context.userId);
    return {
      id: row.id,
      name: row.name,
      academicYear: row.academic_year,
      role: ownRole || "learner",
      roleLabel: schoolRoleLabel(ownRole || "learner"),
      canManage: false,
      roster: [],
      assignments: assignments.map((assignment) => ({
        ...assignment,
        ownRun: ownRuns.get(assignment.id) || null,
      })),
    };
  }
  const [rosterResult, progressResult] = await Promise.all([
    supabase.rpc("get_school_class_roster", { target_class_id: row.id }),
    supabase.rpc("get_school_class_assignment_progress", { target_class_id: row.id }),
  ]);
  if (rosterResult.error) throw rosterResult.error;
  if (progressResult.error) throw progressResult.error;

  const progressByAssignment = new Map();
  for (const progressRow of progressResult.data || []) {
    const current = progressByAssignment.get(progressRow.assignment_id) || [];
    current.push(progressRow);
    progressByAssignment.set(progressRow.assignment_id, current);
  }

  return {
    id: row.id,
    name: row.name,
    academicYear: row.academic_year,
    role: orgRole === "coordinator" ? "coordinator" : ownRole,
    roleLabel: schoolRoleLabel(orgRole === "coordinator" ? "coordinator" : ownRole),
    canManage: true,
    roster: (rosterResult.data || []).map((member) => ({
      userId: member.user_id,
      displayName: member.display_name,
      role: member.class_role,
      joinedAt: member.joined_at,
    })),
    assignments: assignments.map((assignment) => {
      const progressRows = progressByAssignment.get(assignment.id) || [];
      return {
        ...assignment,
        progress: summarizeProgress(progressRows),
        learners: progressRows.map((progressRow) => ({
          userId: progressRow.user_id,
          displayName: progressRow.display_name,
          status: progressRow.run_status,
          startedAt: progressRow.started_at,
          completedAt: progressRow.completed_at,
        })),
      };
    }),
  };
}
export async function loadSchoolGoSnapshot(context) {
  if (!context?.userId) {
    return { mode: "locked", reason: "anonymous", classes: [], missions: [] };
  }

  const school = context.organization;
  const organizationMembership = context.membership;
  if (!school || school.organization_type !== "school" || organizationMembership?.status !== "active") {
    return {
      mode: "locked",
      reason: "school_context_required",
      displayName: context.profile?.display_name || context.profile?.full_name || "Můj prostor",
      classes: [],
      missions: [],
    };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { mode: "unavailable", reason: "supabase_not_configured", classes: [], missions: [] };
  }

  const [classesResult, ownMembershipsResult, missionsResult] = await Promise.all([
    supabase
      .from("school_classes")
      .select("id, school_id, name, academic_year, status")
      .eq("school_id", school.id)
      .eq("status", "active")
      .order("name"),
    supabase
      .from("school_class_memberships")
      .select("class_id, role, status")
      .eq("user_id", context.userId)
      .eq("status", "active"),
    supabase
      .from("missions")
      .select("id, slug, title, summary, estimated_minutes, program_id, topic_key, difficulty")
      .eq("status", "published")
      .order("title"),
  ]);

  if (classesResult.error) throw classesResult.error;
  if (ownMembershipsResult.error) throw ownMembershipsResult.error;
  if (missionsResult.error) throw missionsResult.error;
  const ownRoles = new Map(
    (ownMembershipsResult.data || []).map((membership) => [membership.class_id, membership.role]),
  );
  const orgRole = organizationMembership.role;
  const classes = [];
  for (const classRow of classesResult.data || []) {
    classes.push(await loadClassSnapshot(
      supabase,
      classRow,
      context,
      orgRole,
      ownRoles.get(classRow.id) || null,
    ));
  }

  return {
    mode: "school",
    displayName: context.profile?.display_name || context.profile?.full_name || "Můj prostor",
    school: {
      id: school.id,
      name: school.name,
    },
    role: orgRole,
    roleLabel: schoolRoleLabel(orgRole),
    canManageSchool: orgRole === "coordinator",
    canManageAnyClass: classes.some((item) => item.canManage),
    classes,
    missions: (missionsResult.data || []).map(normalizeMission),
  };
}

export { STAFF_ROLES, schoolRoleLabel, summarizeProgress };
