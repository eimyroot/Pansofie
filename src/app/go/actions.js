"use server";

import { createClient, hasSupabaseServerConfig } from "../../lib/supabase/server";
import { joinProjectForUser, loadProjectAccountState } from "../../domain/project-persistence";

async function getAuthenticatedProjectClient() {
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
  const auth = await getAuthenticatedProjectClient();
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
  const auth = await getAuthenticatedProjectClient();
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
