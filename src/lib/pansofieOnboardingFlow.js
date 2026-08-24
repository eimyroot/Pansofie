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

export async function completeAdultOnboarding({
  fullName,
  location,
  onboardingTrack,
  offersText,
  seeksText,
}) {
  if (!fullName?.trim()) throw new Error("FULL_NAME_REQUIRED");
  if (!location?.trim()) throw new Error("LOCATION_REQUIRED");
  if (!onboardingTrack) throw new Error("ONBOARDING_TRACK_REQUIRED");

  const { data, error } = await supabase.rpc("pansofie_complete_adult_onboarding", {
    p_full_name: fullName.trim(),
    p_location: location.trim(),
    p_track: onboardingTrack,
    p_offers_text: offersText?.trim() || null,
    p_seeks_text: seeksText?.trim() || null,
  });

  if (error) {
    const normalized = String(error.message || "").toLowerCase();
    if (normalized.includes("pansofie_complete_adult_onboarding") || normalized.includes("function") || error.code === "PGRST202") {
      const unavailable = new Error("R18_BACKEND_UNAVAILABLE");
      unavailable.cause = error;
      throw unavailable;
    }
    throw error;
  }

  return Array.isArray(data) ? data[0] || null : data;
}
