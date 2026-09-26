const CLASS_MILESTONE_DEFS = Object.freeze([
  {
    key: "first-finish",
    label: "První společná stopa",
    description: "Ve třídě je dokončený první školní quest.",
    test: ({ completed }) => completed >= 1,
  },
  {
    key: "halfway-together",
    label: "Třída v pohybu",
    description: "Alespoň polovina aktivních quest runů je dokončená.",
    test: ({ total, completed }) => total > 0 && completed / total >= 0.5,
  },
  {
    key: "shared-finish",
    label: "Společný finiš",
    description: "Všechny aktuálně přiřazené quest runy jsou dokončené.",
    test: ({ total, completed }) => total > 0 && completed === total,
  },
]);

export function summarizeClassMilestones(rows = []) {
  const total = rows.length;
  const completed = rows.filter((row) => row.status === "completed" || row.run_status === "completed").length;
  const context = { total, completed };
  const milestones = CLASS_MILESTONE_DEFS.map((item) => ({
    key: item.key,
    label: item.label,
    description: item.description,
    achieved: item.test(context),
  }));
  return {
    total,
    completed,
    achievedCount: milestones.filter((item) => item.achieved).length,
    milestones,
  };
}
async function loadBadges(supabase, badgeKeys) {
  if (!badgeKeys.length) return new Map();
  const { data, error } = await supabase
    .from("game_badges")
    .select("badge_key, title, description, glyph")
    .in("badge_key", badgeKeys);
  if (error) throw error;
  return new Map((data || []).map((row) => [row.badge_key, row]));
}

export async function loadLearnerSchoolGamification(supabase, userId) {
  const { data: links, error: linksError } = await supabase
    .from("school_mission_assignment_runs")
    .select("mission_run_id")
    .eq("user_id", userId);
  if (linksError) throw linksError;

  const runIds = [...new Set((links || []).map((row) => row.mission_run_id))];
  if (!runIds.length) return { xp: 0, completedRewardCount: 0, badges: [] };

  const { data: runs, error: runsError } = await supabase
    .from("mission_runs")
    .select("mission_id")
    .in("id", runIds)
    .eq("status", "completed")
    .eq("user_id", userId);
  if (runsError) throw runsError;

  const missionIds = [...new Set((runs || []).map((row) => row.mission_id))];
  if (!missionIds.length) return { xp: 0, completedRewardCount: 0, badges: [] };

  const { data: rewards, error: rewardsError } = await supabase
    .from("mission_game_rewards")
    .select("mission_id, xp_reward, badge_key")
    .in("mission_id", missionIds);
  if (rewardsError) throw rewardsError;
  const badgeKeys = [...new Set((rewards || []).map((row) => row.badge_key).filter(Boolean))];
  const badgeMap = await loadBadges(supabase, badgeKeys);
  const badges = badgeKeys
    .map((key) => badgeMap.get(key))
    .filter(Boolean)
    .map((row) => ({
      key: row.badge_key,
      title: row.title,
      description: row.description,
      glyph: row.glyph,
    }));

  return {
    xp: (rewards || []).reduce((sum, row) => sum + Number(row.xp_reward || 0), 0),
    completedRewardCount: (rewards || []).length,
    badges,
  };
}

export async function loadMissionGameReward(supabase, missionId) {
  if (!missionId) return null;
  const { data: reward, error: rewardError } = await supabase
    .from("mission_game_rewards")
    .select("xp_reward, badge_key")
    .eq("mission_id", missionId)
    .maybeSingle();
  if (rewardError) throw rewardError;
  if (!reward) return null;

  const badgeMap = await loadBadges(supabase, reward.badge_key ? [reward.badge_key] : []);
  const badge = reward.badge_key ? badgeMap.get(reward.badge_key) : null;
  return {
    xp: Number(reward.xp_reward || 0),
    badge: badge ? {
      key: badge.badge_key,
      title: badge.title,
      description: badge.description,
      glyph: badge.glyph,
    } : null,
  };
}

export { CLASS_MILESTONE_DEFS };
