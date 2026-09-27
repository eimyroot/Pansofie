"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../../../lib/supabase/server";

const INVITE_TOKEN_RE = /^[0-9a-f]{48}$/i;

export async function acceptSchoolInviteAction(formData) {
  const token = String(formData.get("token") || "").trim().toLowerCase();
  if (!INVITE_TOKEN_RE.test(token)) redirect("/go/school/join?error=Pozvánka%20není%20platná.");

  const supabase = await createClient();
  if (!supabase) redirect("/login?error=Školní%20pozvánka%20teď%20není%20dostupná.");
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claimsData?.claims?.sub) {
    redirect(`/login?next=${encodeURIComponent(`/go/school/join?token=${token}`)}`);
  }

  const { data, error } = await supabase
    .rpc("accept_school_class_invite", { invite_token: token })
    .single();
  if (error || !data?.accepted_school_id) {
    redirect(`/go/school/join?token=${encodeURIComponent(token)}&error=${encodeURIComponent("Pozvánku se nepodařilo přijmout nebo už není aktivní.")}`);
  }

  if (data.onboarding_required) {
    redirect(`/onboarding?next=${encodeURIComponent("/go/school")}&invited=1`);
  }
  redirect("/go/school");
}
