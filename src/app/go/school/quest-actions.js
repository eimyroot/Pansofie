"use server";

import { createClient, hasSupabaseServerConfig } from "../../../lib/supabase/server";
import {
  completeMissionForUser,
  saveMissionDocumentationForUser,
  startMissionForUser,
} from "../../../domain/mission-persistence";
import { MISSION_CYCLE, normalizeCycleProgress } from "../../../domain/mission-cycle";
import { loadOwnedSchoolQuestLink } from "../../../domain/school-quest";
import { buildSchoolQuestMentorPrompt, mentorProductionConfig, validateMentorQuestion } from "../../../domain/school-quest-mentor";
import { requestAnthropicMentor } from "../../../lib/anthropic-mentor";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function getQuestAuth() {
  if (!hasSupabaseServerConfig()) return null;
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (error || !userId) return null;
  return { supabase, userId };
}

async function resolveOwnedQuest(auth, assignmentId) {
  if (!UUID_RE.test(String(assignmentId || ""))) throw new Error("Neplatné školní zadání.");
  const owned = await loadOwnedSchoolQuestLink(auth.supabase, {
    assignmentId: String(assignmentId),
    userId: auth.userId,
  });
  if (!owned) throw new Error("Toto školní zadání není dostupné.");
  return owned;
}
export async function startSchoolQuestAction(assignmentId) {
  const auth = await getQuestAuth();
  if (!auth) return { mode: "error", message: "Pro školní misi je potřeba přihlášení." };
  try {
    const owned = await resolveOwnedQuest(auth, assignmentId);
    const result = await startMissionForUser(auth.supabase, {
      slug: owned.assignment.missions.slug,
      userId: auth.userId,
    });
    return { mode: "account", run: result.run };
  } catch (error) {
    return { mode: "error", message: error?.message || "Misi se nepodařilo zahájit." };
  }
}

export async function advanceSchoolQuestPhaseAction(input = {}) {
  const assignmentId = String(input.assignmentId || "");
  const phaseId = String(input.phaseId || "");
  if (!MISSION_CYCLE.includes(phaseId)) {
    return { mode: "error", message: "Neplatná fáze mise." };
  }
  const auth = await getQuestAuth();
  if (!auth) return { mode: "error", message: "Pro školní misi je potřeba přihlášení." };
  try {
    const owned = await resolveOwnedQuest(auth, assignmentId);
    const { data, error } = await auth.supabase.rpc("advance_mission_learning_cycle", {
      target_run_id: owned.run.id,
      target_phase: phaseId,
    }).single();
    if (error) throw error;
    return {
      mode: "account",
      runStatus: data.run_status,
      cycle: normalizeCycleProgress(data),
    };
  } catch (error) {
    return { mode: "error", message: error?.message || "Další krok se nepodařilo uložit." };
  }
}
export async function saveSchoolQuestNotesAction(input = {}) {
  const assignmentId = String(input.assignmentId || "");
  const evidenceNote = String(input.evidenceNote || "").trim().slice(0, 2000);
  const reflection = String(input.reflection || "").trim().slice(0, 2000);
  const auth = await getQuestAuth();
  if (!auth) return { mode: "error", message: "Pro školní misi je potřeba přihlášení." };
  try {
    const owned = await resolveOwnedQuest(auth, assignmentId);
    const state = await saveMissionDocumentationForUser(auth.supabase, {
      slug: owned.assignment.missions.slug,
      userId: auth.userId,
      evidenceNote,
      reflection,
    });
    return {
      mode: "account",
      evidenceNote: state.evidenceNote || "",
      reflection: state.reflection || "",
    };
  } catch (error) {
    return { mode: "error", message: error?.message || "Soukromý záznam se nepodařilo uložit." };
  }
}

function mentorQuotaError(error) {
  const message = String(error?.message || "");
  if (message.includes("mentor_subject_daily_limit")) {
    return { code: "daily_limit", message: "Dnešní osobní limit průvodce je vyčerpaný. Mise funguje dál bez AI." };
  }
  if (message.includes("mentor_school_daily_limit")) {
    return { code: "school_limit", message: "Školní denní limit průvodce je vyčerpaný. Mise funguje dál bez AI." };
  }
  if (message.includes("mentor_global_daily_budget")) {
    return { code: "budget_limit", message: "Denní rozpočet AI průvodce je vyčerpaný. Mise funguje dál bez AI." };
  }
  if (message.includes("mentor_global_monthly_budget")) {
    return { code: "monthly_budget_limit", message: "Měsíční rozpočet AI průvodce je vyčerpaný. Mise funguje dál bez AI." };
  }
  return null;
}

export async function askSchoolQuestMentorAction(input = {}) {
  const assignmentId = String(input.assignmentId || "");
  const phaseId = String(input.phaseId || "");
  if (!MISSION_CYCLE.includes(phaseId)) {
    return { mode: "error", message: "Neplatná fáze mise." };
  }
  const validation = validateMentorQuestion(input.question);
  if (!validation.ok) return { mode: "error", code: validation.code, message: validation.message };

  const production = mentorProductionConfig();
  if (!production.ready) {
    return { mode: "unavailable", message: "AI průvodce není v tomto prostředí produkčně povolený." };
  }

  const auth = await getQuestAuth();
  if (!auth) return { mode: "error", message: "Pro průvodce je potřeba přihlášení." };
  try {
    const owned = await resolveOwnedQuest(auth, assignmentId);
    if (owned.assignment.status === "cancelled") {
      return { mode: "error", message: "Zrušené školní zadání už průvodce neotevírá." };
    }
    if (owned.run.status === "assigned") {
      return { mode: "error", message: "Nejdřív začni misi. Pak ti průvodce pomůže s aktuálním krokem." };
    }
    if (owned.run.status === "completed" || owned.run.status === "cancelled") {
      return { mode: "error", message: "Tato mise už nemá aktivní krok pro průvodce." };
    }

    const { data: cycleRow, error: cycleError } = await auth.supabase
      .from("mission_run_cycle_progress")
      .select("current_phase, completed_phases")
      .eq("run_id", owned.run.id)
      .eq("user_id", auth.userId)
      .maybeSingle();
    if (cycleError) throw cycleError;
    const cycle = normalizeCycleProgress(cycleRow);
    if (cycle.isCycleComplete || phaseId !== cycle.currentPhase) {
      return { mode: "error", message: "Průvodce pracuje jen s právě otevřeným krokem mise." };
    }

    const { error: quotaError } = await auth.supabase
      .rpc("reserve_school_mentor_usage", { target_assignment_id: assignmentId })
      .single();
    if (quotaError) {
      const quota = mentorQuotaError(quotaError);
      if (quota) return { mode: "error", ...quota };
      throw quotaError;
    }

    const prompt = buildSchoolQuestMentorPrompt({
      mission: owned.assignment.missions,
      phaseId,
      question: validation.question,
    });
    const result = await requestAnthropicMentor(prompt);
    if (result.mode === "unavailable") {
      return { mode: "unavailable", message: "AI průvodce není v tomto prostředí připojený." };
    }
    if (result.mode !== "ok") {
      return { mode: "error", code: result.code, message: "Průvodce teď neodpovídá. Zkus to za chvíli znovu." };
    }
    return { mode: "account", answer: result.answer, ephemeral: true };
  } catch (error) {
    return { mode: "error", message: error?.message || "Průvodce teď není dostupný." };
  }
}

export async function completeSchoolQuestAction(assignmentId) {
  const auth = await getQuestAuth();
  if (!auth) return { mode: "error", message: "Pro školní misi je potřeba přihlášení." };
  try {
    const owned = await resolveOwnedQuest(auth, assignmentId);
    if (owned.run.status === "completed") return { mode: "account", runStatus: "completed" };

    const { data: cycleRow, error: cycleError } = await auth.supabase
      .from("mission_run_cycle_progress")
      .select("current_phase, completed_phases")
      .eq("run_id", owned.run.id)
      .eq("user_id", auth.userId)
      .maybeSingle();
    if (cycleError) throw cycleError;
    if (!normalizeCycleProgress(cycleRow).isCycleComplete) {
      return { mode: "error", message: "Nejdřív projdi všech šest kroků mise." };
    }
    const result = await completeMissionForUser(auth.supabase, {
      slug: owned.assignment.missions.slug,
      userId: auth.userId,
    });
    return { mode: "account", runStatus: result.run.status };
  } catch (error) {
    return { mode: "error", message: error?.message || "Dokončení mise se nepodařilo uložit." };
  }
}
