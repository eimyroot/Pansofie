import { supabase } from "@/api/supabaseClient";

const throwIfError = (result, label) => {
  if (result.error) {
    const error = new Error(`${label}: ${result.error.message}`);
    error.cause = result.error;
    throw error;
  }
  return result.data;
};

export const FAMILY_CONTRIBUTION_KINDS = Object.freeze([
  "context",
  "contact",
  "resource",
  "observation",
]);

export async function getMyFamilyAccessSummary() {
  const result = await supabase.rpc("pansofie_family_access_summary");
  return throwIfError(result, "Family access summary load failed") || {
    verified_relationships: 0,
    participation_children: 0,
    passport_children: 0,
    has_family_access: false,
  };
}

export async function listMyFamilyContext() {
  const result = await supabase.rpc("pansofie_list_my_family_context");
  return throwIfError(result, "Family context load failed") || [];
}

export async function listMyGuardianPassportSummaries() {
  const result = await supabase.rpc("pansofie_list_my_guardian_passport_summaries");
  return throwIfError(result, "Guardian Passport summary load failed") || [];
}

export async function addFamilyContribution({ runId, kind, content }) {
  const clean = content?.trim();
  if (!runId) throw new Error("Experience run is required");
  if (!FAMILY_CONTRIBUTION_KINDS.includes(kind)) throw new Error("Unsupported family contribution kind");
  if (!clean) throw new Error("Family contribution content is required");

  const result = await supabase.rpc("pansofie_add_family_contribution", {
    target_run_id: runId,
    target_kind: kind,
    target_content: clean,
  });
  return throwIfError(result, "Family contribution save failed");
}

export async function listMyFamilyContributions() {
  const result = await supabase.rpc("pansofie_list_my_family_contributions");
  return throwIfError(result, "My family contributions load failed") || [];
}

export async function withdrawFamilyContribution(contributionId) {
  const result = await supabase.rpc("pansofie_withdraw_family_contribution", {
    target_contribution_id: contributionId,
  });
  return throwIfError(result, "Family contribution withdrawal failed");
}

export async function listStaffFamilyContributions() {
  const result = await supabase.rpc("pansofie_list_staff_family_contributions");
  return throwIfError(result, "Staff family contribution inbox load failed") || [];
}
