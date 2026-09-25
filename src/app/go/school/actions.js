"use server";

import { createClient, hasSupabaseServerConfig } from "../../../lib/supabase/server";
import {
  assignSchoolMission,
  cancelSchoolMissionAssignment,
  loadSchoolMissionAssignments,
} from "../../../domain/school-mission-assignment";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MISSION_SLUG_RE = /^[a-z0-9][a-z0-9-]{0,119}$/;

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
