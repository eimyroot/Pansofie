"use server";

import { createClient, hasSupabaseServerConfig } from "../../../lib/supabase/server";
import {
  assignSchoolMission,
  cancelSchoolMissionAssignment,
  loadSchoolMissionAssignments,
} from "../../../domain/school-mission-assignment";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MISSION_SLUG_RE = /^[a-z0-9][a-z0-9-]{0,119}$/;
const ACADEMIC_YEAR_RE = /^[0-9]{4}\/[0-9]{4}$/;

async function getAuthenticatedSchoolGoClient() {
  if (!hasSupabaseServerConfig()) return null;
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (error || !userId) return null;
  return { supabase, userId };
}

function parseOptionalDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

export async function createSchoolClassAction(input = {}) {
  const name = String(input.name || "").trim();
  const academicYear = String(input.academicYear || "").trim();
  if (!name || name.length > 80 || !ACADEMIC_YEAR_RE.test(academicYear)) {
    return { mode: "error", message: "Zkontrolujte název třídy a školní rok." };
  }

  const auth = await getAuthenticatedSchoolGoClient();
  if (!auth) return { mode: "error", message: "Pro školní GO je potřeba přihlášení." };

  const { data: profile, error: profileError } = await auth.supabase
    .from("profiles")
    .select("active_organization_id")
    .eq("id", auth.userId)
    .maybeSingle();
  if (profileError || !profile?.active_organization_id) {
    return { mode: "error", message: "Aktivní školní kontext není dostupný." };
  }

  const { data: membership, error: membershipError } = await auth.supabase
    .from("organization_memberships")
    .select("role, status")
    .eq("organization_id", profile.active_organization_id)
    .eq("user_id", auth.userId)
    .eq("role", "coordinator")
    .eq("status", "active")
    .maybeSingle();
  if (membershipError || !membership) {
    return { mode: "error", message: "Třídu může založit školní koordinátor." };
  }

  const { data, error } = await auth.supabase
    .from("school_classes")
    .insert({
      school_id: profile.active_organization_id,
      name,
      academic_year: academicYear,
      status: "active",
      created_by: auth.userId,
    })
    .select("id, name, academic_year")
    .single();
  if (error) return { mode: "error", message: "Třídu se nepodařilo vytvořit." };
  return { mode: "account", classData: { id: data.id, name: data.name, academicYear: data.academic_year } };
}

export async function createSchoolInviteAction(classId) {
  const id = String(classId || "");
  if (!UUID_RE.test(id)) return { mode: "error", message: "Neplatná třída." };
  const auth = await getAuthenticatedSchoolGoClient();
  if (!auth) return { mode: "error", message: "Pro školní GO je potřeba přihlášení." };

  const { data, error } = await auth.supabase
    .rpc("create_school_class_invite", { target_class_id: id })
    .single();
  if (error || !data?.invite_token) {
    return { mode: "error", message: "Pozvánku se nepodařilo vytvořit." };
  }
  return {
    mode: "account",
    invite: {
      path: `/go/school/join?token=${encodeURIComponent(data.invite_token)}`,
      expiresAt: data.invite_expires_at,
    },
  };
}

export async function loadSchoolAssignmentsAction(classId) {
  if (!UUID_RE.test(String(classId || ""))) {
    return { mode: "error", message: "Neplatná třída." };
  }
  const auth = await getAuthenticatedSchoolGoClient();
  if (!auth) return { mode: "error", message: "Pro školní GO je potřeba přihlášení." };
  try {
    const assignments = await loadSchoolMissionAssignments(auth.supabase, { classId });
    return { mode: "account", assignments };
  } catch {
    return { mode: "error", message: "Zadání se nepodařilo načíst." };
  }
}

export async function assignSchoolMissionAction(input = {}) {
  const classId = String(input.classId || "");
  const missionSlug = String(input.missionSlug || "").trim();
  const targetLearnerId = input.targetLearnerId
    ? String(input.targetLearnerId)
    : null;
  if (!UUID_RE.test(classId) || !MISSION_SLUG_RE.test(missionSlug)) {
    return { mode: "error", message: "Neplatné zadání mise." };
  }
  if (targetLearnerId && !UUID_RE.test(targetLearnerId)) {
    return { mode: "error", message: "Neplatný student." };
  }
  const availableFrom = parseOptionalDate(input.availableFrom);
  const dueAt = parseOptionalDate(input.dueAt);
  if (availableFrom === undefined || dueAt === undefined) {
    return { mode: "error", message: "Neplatný termín zadání." };
  }

  const auth = await getAuthenticatedSchoolGoClient();
  if (!auth) return { mode: "error", message: "Pro školní GO je potřeba přihlášení." };
  try {
    const assignment = await assignSchoolMission(auth.supabase, {
      classId,
      missionSlug,
      targetLearnerId,
      availableFrom,
      dueAt,
    });
    return { mode: "account", assignment };
  } catch (error) {
    return {
      mode: "error",
      message: error?.message || "Misi se nepodařilo přiřadit.",
    };
  }
}

export async function cancelSchoolAssignmentAction(assignmentId) {
  const id = String(assignmentId || "");
  if (!UUID_RE.test(id)) {
    return { mode: "error", message: "Neplatné zadání." };
  }
  const auth = await getAuthenticatedSchoolGoClient();
  if (!auth) return { mode: "error", message: "Pro školní GO je potřeba přihlášení." };
  try {
    const cancelled = await cancelSchoolMissionAssignment(auth.supabase, {
      assignmentId: id,
    });
    return { mode: "account", cancelled };
  } catch (error) {
    return {
      mode: "error",
      message: error?.message || "Zadání se nepodařilo zrušit.",
    };
  }
}
