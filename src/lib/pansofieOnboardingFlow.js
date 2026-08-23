import { supabase } from "@/api/supabaseClient";

export async function getOnboardingState(userId) {
  if (!userId) return { supported: false, data: null };
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, location, bio, network_role, offers_text, seeks_text, onboarding_completed_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    // R14 may reach the frontend before its database migration is enabled in a
    // particular staging environment. Existing authentication must keep working.
    console.warn("PANSOFIE onboarding schema unavailable:", error.message);
    return { supported: false, data: null };
  }

  return { supported: true, data: data || null };
}

export async function completeOnboarding({
  userId,
  fullName,
  location,
  networkRole,
  offersText,
  seeksText,
}) {
  if (!userId) throw new Error("AUTH_REQUIRED");
  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName?.trim() || null,
      location: location?.trim() || null,
      network_role: networkRole || null,
      offers_text: offersText?.trim() || null,
      seeks_text: seeksText?.trim() || null,
      onboarding_completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("id, onboarding_completed_at")
    .single();
  if (error) throw error;
  return data;
}
