import { supabase } from "@/api/supabaseClient";

const fail = (label, error) => {
  if (!error) return;
  const next = new Error(`${label}: ${error.message}`);
  next.cause = error;
  throw next;
};

const countOf = async (query, label) => {
  const result = await query;
  fail(label, result.error);
  return Number(result.count || 0);
};

export async function getTeacherAllianceSummary(organizationId) {
  if (!organizationId) {
    return { completedExperiences: 0, activeRuns: 0, pendingReview: 0, completedTeamExperiences: 0 };
  }

  const completedQuery = supabase
    .from("mission_runs")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", organizationId)
    .eq("status", "completed");

  const activeQuery = supabase
    .from("mission_runs")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", organizationId)
    .in("status", ["assigned", "in_progress"]);

  const reviewQuery = supabase
    .from("mission_runs")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", organizationId)
    .eq("status", "submitted");

  const teamCompletedQuery = supabase
    .from("mission_runs")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", organizationId)
    .eq("status", "completed")
    .not("team_id", "is", null);

  const [completedExperiences, activeRuns, pendingReview, completedTeamExperiences] = await Promise.all([
    countOf(completedQuery, "Completed school Experience count failed"),
    countOf(activeQuery, "Active school run count failed"),
    countOf(reviewQuery, "School review queue count failed"),
    countOf(teamCompletedQuery, "Completed team Experience count failed"),
  ]);

  return { completedExperiences, activeRuns, pendingReview, completedTeamExperiences };
}

export async function listTeacherCompletedSchoolRuns(organizationId, limit = 6) {
  if (!organizationId) return [];
  const safeLimit = Math.min(Math.max(Number(limit) || 6, 1), 20);
  const result = await supabase
    .from("mission_runs")
    .select("id, user_id, status, completed_at, organization_id, cohort_id, team_id, missions(id, slug, title, summary, path_ids), organizations(id, slug, name)")
    .eq("organization_id", organizationId)
    .eq("status", "completed")
    .order("completed_at", { ascending: false })
    .limit(safeLimit);
  fail("Collective chronicle load failed", result.error);
  return result.data || [];
}
