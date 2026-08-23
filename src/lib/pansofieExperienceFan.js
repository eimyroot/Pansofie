import { supabase } from "@/api/supabaseClient";

export const EXPERIENCE_FAN_AXES = Object.freeze([
  { pillar: "know_self", axis: "digital_attention" },
  { pillar: "know_self", axis: "critical_reason" },
  { pillar: "create_with_others", axis: "respectful_dialogue" },
  { pillar: "create_with_others", axis: "cooperation" },
  { pillar: "improve_world", axis: "circular_action" },
  { pillar: "improve_world", axis: "local_impact" },
]);

export const EXPERIENCE_DEPTH = Object.freeze({
  0: "none",
  1: "first",
  2: "repeated",
  3: "multi_context",
  4: "application",
  5: "impact",
});

export async function loadMyExperienceFan() {
  const result = await supabase.rpc("pansofie_my_experience_fan");
  if (result.error) {
    const error = new Error(`Experience Fan load failed: ${result.error.message}`);
    error.cause = result.error;
    throw error;
  }
  return result.data || [];
}
