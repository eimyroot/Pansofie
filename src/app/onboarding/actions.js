"use server";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export async function completeOnboarding(formData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect("/login");
  const intent = String(formData.get("intent") ?? "");
  if (!["personal", "family", "school", "company", "young"].includes(intent)) redirect("/onboarding?error=Vyberte%20způsob%20použití.");
  const dateOfBirth = String(formData.get("date_of_birth") ?? "") || null;
  if (intent === "young" && !dateOfBirth) redirect("/onboarding?error=Pro%20Pansofii%20Young%20je%20nutné%20datum%20narození.");
  const { error } = await supabase.rpc("complete_onboarding", {
    requested_space_type: intent === "young" ? "personal" : intent,
    requested_space_name: String(formData.get("space_name") ?? "").trim() || null,
    requested_display_name: String(formData.get("display_name") ?? "").trim(),
    requested_date_of_birth: dateOfBirth,
  });
  if (error) redirect(`/onboarding?error=${encodeURIComponent("Onboarding se nepodařilo uložit.")}`);
  redirect("/app");
}
