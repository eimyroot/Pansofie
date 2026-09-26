import { createClient } from "../lib/supabase/server.js";
import { PROJECT_GREEN_HOPE_GROW_001 } from "./project-core.js";
import { normalizeGoAccountSnapshot } from "./go-experience.js";

const ACTIVE_RUN_STATUSES = ["assigned", "in_progress", "submitted"];
const VISIBLE_RUN_STATUSES = [...ACTIVE_RUN_STATUSES, "completed"];

function missionHref(slug) {
  return slug === "vypestuj-prvni-rostlinu" ? "/go/mise-grow" : "/go/mise";
}

function projectHref(slug) {
  return slug === PROJECT_GREEN_HOPE_GROW_001.slug ? "/go/projekt-green-grow" : "/go/projekty";
}

export async function loadGoAccountSnapshot(context) {
  const fallback = normalizeGoAccountSnapshot();
  if (!context?.userId) return fallback;
  const supabase = await createClient();
  if (!supabase) return fallback;

  const [runsResult, participationsResult, experiencesResult, portfolioResult, membershipsResult, skillsResult, impactResult] = await Promise.all([
    supabase
      .from("mission_runs")
      .select("id, status, updated_at, missions(id, slug, title, program_id)")
      .eq("user_id", context.userId)
      .in("status", VISIBLE_RUN_STATUSES)
      .order("updated_at", { ascending: false })
      .limit(12),
    supabase
      .from("project_participations")
      .select("id, status, joined_at, projects(id, slug, title, status, model_only)")
      .eq("user_id", context.userId)
      .eq("status", "joined")
      .order("joined_at", { ascending: false })
      .limit(4),
    supabase
      .from("experiences")
      .select("id, title, program_id, occurred_at")
      .eq("user_id", context.userId)
      .order("occurred_at", { ascending: false })
      .limit(4),
    supabase
      .from("portfolio_items")
      .select("id, title, summary, visibility, created_at", { count: "exact" })
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("organization_memberships")
      .select("id, role, status, joined_at, organizations(id, name, organization_type, status)")
      .eq("user_id", context.userId)
      .eq("status", "active")
      .order("joined_at", { ascending: false })
      .limit(8),
    supabase
      .from("skill_attestations")
      .select("id, level, attestation_type, created_at, evidence_id, skills(code, title_cs, domain_id)")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("impact_observations")
      .select("id, dimension, metric_key, value_numeric, unit, evidence_id, created_at")
      .eq("user_id", context.userId)
      .not("evidence_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const missionRuns = runsResult.error ? [] : (runsResult.data || []).map((row) => ({
    id: row.id,
    slug: row.missions?.slug || "",
    title: row.missions?.title || "Mise",
    programId: row.missions?.program_id || null,
    status: row.status,
    updatedAt: row.updated_at,
    href: missionHref(row.missions?.slug || ""),
  }));
  const activeMissions = missionRuns.filter((row) => ACTIVE_RUN_STATUSES.includes(row.status));
  const completedMissions = missionRuns.filter((row) => row.status === "completed");

  const participations = participationsResult.error ? [] : (participationsResult.data || []);
  const activeProjects = [];
  for (const row of participations) {
    const project = row.projects;
    if (!project) continue;
    let progress = { completed: 0, total: 0, isComplete: false };
    const { data } = await supabase
      .from("user_project_progress")
      .select("total_missions, completed_missions, is_complete")
      .eq("project_id", project.id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (data) progress = {
      completed: Number(data.completed_missions || 0),
      total: Number(data.total_missions || 0),
      isComplete: Boolean(data.is_complete),
    };
    activeProjects.push({
      id: project.id,
      slug: project.slug,
      title: project.title,
      status: project.status,
      modelOnly: Boolean(project.model_only),
      joinedAt: row.joined_at,
      progress,
      href: projectHref(project.slug),
    });
  }

  const recentActivity = experiencesResult.error ? [] : (experiencesResult.data || []).map((row) => ({
    id: row.id,
    title: row.title,
    programId: row.program_id || null,
    occurredAt: row.occurred_at,
  }));
  const recentPortfolio = portfolioResult.error ? [] : (portfolioResult.data || []).map((row) => ({
    id: row.id,
    title: row.title,
    summary: row.summary || "",
    visibility: row.visibility,
    createdAt: row.created_at,
  }));
  const organizationMemberships = membershipsResult.error ? [] : (membershipsResult.data || []).map((row) => ({
    id: row.id,
    role: row.role,
    joinedAt: row.joined_at,
    organization: row.organizations ? {
      id: row.organizations.id,
      name: row.organizations.name,
      type: row.organizations.organization_type,
      status: row.organizations.status,
    } : null,
  })).filter((row) => row.organization);
  const skillAttestations = skillsResult.error ? [] : (skillsResult.data || []).map((row) => ({
    id: row.id,
    level: row.level,
    attestationType: row.attestation_type,
    evidenceId: row.evidence_id,
    createdAt: row.created_at,
    skill: row.skills ? { code: row.skills.code, titleCs: row.skills.title_cs, domainId: row.skills.domain_id } : null,
  })).filter((row) => row.skill);
  const impactObservations = impactResult.error ? [] : (impactResult.data || []).map((row) => ({
    id: row.id,
    dimension: row.dimension,
    metricKey: row.metric_key,
    valueNumeric: row.value_numeric == null ? null : Number(row.value_numeric),
    unit: row.unit || "",
    evidenceId: row.evidence_id,
    createdAt: row.created_at,
  }));

  return normalizeGoAccountSnapshot({
    source: "account",
    profile: {
      displayName: context.profile?.display_name || context.profile?.full_name || "Můj prostor",
      fullName: context.profile?.full_name || "",
      accountContext: context.profile?.account_context || "personal",
      experience: context.experience || "",
    },
    activeMissions,
    completedMissions,
    activeProjects,
    organizationMemberships,
    skillAttestations,
    impactObservations,
    recentActivity,
    recentPortfolio,
    portfolioCount: portfolioResult.error ? 0 : (portfolioResult.count || 0),
  });
}
