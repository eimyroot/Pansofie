"use server";

import { createClient, hasSupabaseServerConfig } from "../../lib/supabase/server";
import { joinProjectForUser, loadProjectAccountState } from "../../domain/project-persistence";
import { completeMissionForUser, loadMissionAccountState, saveMissionDocumentationForUser, startMissionForUser } from "../../domain/mission-persistence";
import { recordGrowSkillImpactForUser } from "../../domain/skill-impact";

async function getAuthenticatedGoClient() {
  if (!hasSupabaseServerConfig()) return { mode: "local", reason: "supabase_not_configured" };
  const supabase = await createClient();
  if (!supabase) return { mode: "local", reason: "supabase_not_configured" };
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (claimsError || !userId) return { mode: "local", reason: "anonymous" };
  return { mode: "account", supabase, userId };
}

function sanitizeParticipation(participation) {
  if (!participation) return null;
  return {
    id: participation.id,
    projectId: participation.project_id,
    organizationId: participation.organization_id,
    participationMode: participation.participation_mode,
    status: participation.status,
    joinedAt: participation.joined_at,
    leftAt: participation.left_at,
  };
}

export async function loadProjectStateAction(slug) {
  if (typeof slug !== "string" || !slug.trim()) return { mode: "error", message: "Neplatný projekt." };
  const auth = await getAuthenticatedGoClient();
  if (auth.mode !== "account") return auth;
  try {
    const state = await loadProjectAccountState(auth.supabase, { slug: slug.trim(), userId: auth.userId });
    return {
      mode: "account",
      participation: sanitizeParticipation(state.participation),
      progress: state.progress,
    };
  } catch {
    return { mode: "error", message: "Projektový stav se nepodařilo načíst." };
  }
}

export async function joinProjectAction(slug) {
  if (typeof slug !== "string" || !slug.trim()) return { mode: "error", message: "Neplatný projekt." };
  const auth = await getAuthenticatedGoClient();
  if (auth.mode !== "account") return auth;
  try {
    const result = await joinProjectForUser(auth.supabase, {
      slug: slug.trim(),
      userId: auth.userId,
      participationMode: "individual",
      organizationId: null,
    });
    return { mode: "account", participation: sanitizeParticipation(result.participation) };
  } catch {
    return { mode: "error", message: "Účast se nepodařilo uložit do účtu." };
  }
}


function sanitizeMissionState(state) {
  if (!state) return null;
  return {
    mission: state.mission ? { slug: state.mission.slug, title: state.mission.title } : null,
    run: state.run,
    evidenceNote: state.evidenceNote || "",
    reflection: state.reflection || "",
    experience: state.experience ? { id: state.experience.id, title: state.experience.title, occurredAt: state.experience.occurred_at } : null,
    portfolio: state.portfolio ? { id: state.portfolio.id, title: state.portfolio.title, summary: state.portfolio.summary || "", visibility: state.portfolio.visibility } : null,
    skillImpact: state.skillImpact ? {
      eligible: Boolean(state.skillImpact.eligible), reason: state.skillImpact.reason || null,
      skill: state.skillImpact.skill ? { code: state.skillImpact.skill.code, titleCs: state.skillImpact.skill.title_cs, domainId: state.skillImpact.skill.domain_id } : null,
      attestation: state.skillImpact.attestation ? { id: state.skillImpact.attestation.id, level: state.skillImpact.attestation.level, type: state.skillImpact.attestation.attestation_type } : null,
      impact: state.skillImpact.impact ? { id: state.skillImpact.impact.id, dimension: state.skillImpact.impact.dimension, metricKey: state.skillImpact.impact.metric_key, valueNumeric: Number(state.skillImpact.impact.value_numeric || 0), unit: state.skillImpact.impact.unit || "" } : null,
    } : null,
  };
}

function validMissionSlug(slug) {
  return typeof slug === "string" && /^[a-z0-9][a-z0-9-]{0,119}$/.test(slug);
}

export async function loadMissionStateAction(slug) {
  if (!validMissionSlug(slug)) return { mode: "error", message: "Neplatná mise." };
  const auth = await getAuthenticatedGoClient();
  if (auth.mode !== "account") return { mode: "error", message: "Pro práci s misí je potřeba přihlášení." };
  try {
    const state = await loadMissionAccountState(auth.supabase, { slug, userId: auth.userId });
    return { mode: "account", state: sanitizeMissionState(state) };
  } catch {
    return { mode: "error", message: "Stav mise se nepodařilo načíst." };
  }
}

export async function startMissionAction(slug) {
  if (!validMissionSlug(slug)) return { mode: "error", message: "Neplatná mise." };
  const auth = await getAuthenticatedGoClient();
  if (auth.mode !== "account") return { mode: "error", message: "Pro práci s misí je potřeba přihlášení." };
  try {
    await startMissionForUser(auth.supabase, { slug, userId: auth.userId });
    const state = await loadMissionAccountState(auth.supabase, { slug, userId: auth.userId });
    return { mode: "account", state: sanitizeMissionState(state) };
  } catch {
    return { mode: "error", message: "Misi se nepodařilo uložit do účtu." };
  }
}

export async function completeMissionAction(slug) {
  if (!validMissionSlug(slug)) return { mode: "error", message: "Neplatná mise." };
  const auth = await getAuthenticatedGoClient();
  if (auth.mode !== "account") return { mode: "error", message: "Pro práci s misí je potřeba přihlášení." };
  try {
    await completeMissionForUser(auth.supabase, { slug, userId: auth.userId });
    const state = await loadMissionAccountState(auth.supabase, { slug, userId: auth.userId });
    return { mode: "account", state: sanitizeMissionState(state) };
  } catch {
    return { mode: "error", message: "Dokončení mise se nepodařilo uložit." };
  }
}

export async function saveMissionDocumentationAction(slug, input = {}) {
  if (!validMissionSlug(slug)) return { mode: "error", message: "Neplatná mise." };
  const auth = await getAuthenticatedGoClient();
  if (auth.mode !== "account") return { mode: "error", message: "Pro práci s misí je potřeba přihlášení." };
  const evidenceNote = String(input?.evidenceNote || "").trim().slice(0, 2000);
  const reflection = String(input?.reflection || "").trim().slice(0, 2000);
  try {
    const state = await saveMissionDocumentationForUser(auth.supabase, { slug, userId: auth.userId, evidenceNote, reflection });
    return { mode: "account", state: sanitizeMissionState(state) };
  } catch {
    return { mode: "error", message: "Soukromý záznam se nepodařilo uložit." };
  }
}


export async function recordGrowSkillImpactAction(slug) {
  if (!validMissionSlug(slug)) return { mode: "error", message: "Neplatná mise." };
  const auth = await getAuthenticatedGoClient();
  if (auth.mode !== "account") return { mode: "error", message: "Pro doložení dovednosti je potřeba přihlášení." };
  try {
    await recordGrowSkillImpactForUser(auth.supabase, { slug, userId: auth.userId });
    const state = await loadMissionAccountState(auth.supabase, { slug, userId: auth.userId });
    return { mode: "account", state: sanitizeMissionState(state) };
  } catch (error) {
    return { mode: "error", message: error?.message || "Doložení se nepodařilo uložit." };
  }
}
