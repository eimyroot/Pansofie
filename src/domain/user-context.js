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
    .select("id, full_name, display_name, date_of_birth, account_context, active_organization_id, onboarding_completed_at")
    .eq("id", userId).maybeSingle();
  if (error) throw new Error("Nepodařilo se načíst uživatelský kontext.");
  if (!profile?.onboarding_completed_at) return { userId, onboardingRequired: true };

  let organization = null;
  let membership = null;
  if (profile.active_organization_id) {
    const [{ data: membershipData, error: membershipError }, { data: organizationData, error: organizationError }] = await Promise.all([
      supabase.from("organization_memberships").select("id, role, status, organization_id").eq("user_id", userId).eq("organization_id", profile.active_organization_id).eq("status", "active").maybeSingle(),
      supabase.from("organizations").select("id, name, organization_type, status").eq("id", profile.active_organization_id).maybeSingle(),
    ]);
    if (membershipError || organizationError) throw new Error("Nepodařilo se načíst členství.");
    membership = membershipData;
    organization = organizationData;
  }

  const experience = resolveExperience({
    dateOfBirth: profile.date_of_birth,
    accountContext: profile.account_context,
    organizationType: membership ? organization?.organization_type : null,
  });
  return { userId, profile, organization, membership, experience, onboardingRequired: false };
}

export async function requireUserContext(expectedExperience) {
  const context = await getUserContext();
  if (!context) redirect("/login");
  if (context.onboardingRequired) redirect("/onboarding");
  if (expectedExperience && context.experience !== expectedExperience) redirect(routeForExperience(context.experience));
  return context;
}
