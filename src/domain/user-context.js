import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import { resolveExperience, routeForExperience } from "./experience";

export async function getUserContext() {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (claimsError || !userId) return null;
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, display_name, date_of_birth, onboarding_completed, active_space_id, spaces:active_space_id(id, name, type), memberships(role, status, space_id)")
    .eq("id", userId).maybeSingle();
  if (error) throw new Error("Nepodařilo se načíst uživatelský kontext.");
  if (!profile?.onboarding_completed) return { userId, onboardingRequired: true };
  const space = profile.spaces ?? null;
  const membership = profile.memberships?.find((item) => item.space_id === profile.active_space_id && item.status === "active");
  const experience = resolveExperience({ dateOfBirth: profile.date_of_birth, spaceType: membership ? space?.type : "personal" });
  return { userId, profile, space, membership, experience, onboardingRequired: false };
}

export async function requireUserContext(expectedExperience) {
  const context = await getUserContext();
  if (!context) redirect("/login");
  if (context.onboardingRequired) redirect("/onboarding");
  if (expectedExperience && context.experience !== expectedExperience) redirect(routeForExperience(context.experience));
  return context;
}
