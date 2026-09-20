import { createClient } from "../lib/supabase/server.js";
import { MISSION_GROW_001 } from "./learning-core.js";
import { PROJECT_GREEN_HOPE_GROW_001 } from "./project-core.js";
import { loadProjectAccountState } from "./project-persistence.js";
import { normalizeYoungAccountSnapshot } from "./young-experience.js";

export async function loadYoungAccountSnapshot(context) {
  const fallback = normalizeYoungAccountSnapshot({
    source: "limited",
    organization: context?.organization && context?.membership
      ? { name: context.organization.name, role: context.membership.role }
      : null,
  });

  if (!context?.userId) return fallback;
  const supabase = await createClient();
  if (!supabase) return fallback;

  const [guardianResult, portfolioResult, missionResult] = await Promise.all([
    supabase
      .from("guardian_relationships")
      .select("status")
      .eq("child_user_id", context.userId),
    supabase
      .from("portfolio_items")
      .select("id", { count: "exact", head: true })
      .eq("user_id", context.userId),
    supabase
      .from("missions")
      .select("id, slug")
      .eq("slug", MISSION_GROW_001.slug)
      .maybeSingle(),
  ]);
  let missionStatus = "not_started";
  if (!missionResult.error && missionResult.data?.id) {
    const { data: run } = await supabase
      .from("mission_runs")
      .select("status, updated_at")
      .eq("mission_id", missionResult.data.id)
      .eq("user_id", context.userId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (run?.status) missionStatus = run.status;
  }

  let projectJoined = false;
  let projectProgress = { completed: 0, total: 0, isComplete: false };
  try {
    const projectState = await loadProjectAccountState(supabase, {
      slug: PROJECT_GREEN_HOPE_GROW_001.slug,
      userId: context.userId,
    });
    projectJoined = projectState.participation?.status === "joined";
    projectProgress = projectState.progress;
  } catch {
    // Project Core may not be present in every local/staging snapshot yet.
  }

  return normalizeYoungAccountSnapshot({
    source: "account",
    organization: context.organization && context.membership
      ? { name: context.organization.name, role: context.membership.role }
      : null,
    guardianStatuses: guardianResult.error ? [] : (guardianResult.data || []).map((row) => row.status),
    missionStatus,
    projectJoined,
    projectProgress,
    portfolioCount: portfolioResult.error ? 0 : (portfolioResult.count || 0),
  });
}
