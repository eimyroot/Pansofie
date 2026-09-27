"use server";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { authCallbackUrl, normalizeCredentials, safeReturnPath } from "../../domain/auth-flow";

export async function login(formData) {
  const supabase = await createClient();
  if (!supabase) redirect(`/login?error=${encodeURIComponent("Přihlášení není v tomto prostředí nakonfigurované.")}`);
  const credentials = normalizeCredentials({ email: formData.get("email"), password: formData.get("password") });
  if (!credentials.ok) redirect(`/login?error=${encodeURIComponent(credentials.message)}`);
  const next = safeReturnPath(formData.get("next"));
  const { error } = await supabase.auth.signInWithPassword({ email: credentials.email, password: credentials.password });
  if (error) redirect(`/login?error=${encodeURIComponent("Přihlášení se nezdařilo.")}`);
  redirect(next);
}

export async function signup(formData) {
  const supabase = await createClient();
  if (!supabase) redirect(`/login?error=${encodeURIComponent("Registrace není v tomto prostředí nakonfigurovaná.")}`);
  const credentials = normalizeCredentials({ email: formData.get("email"), password: formData.get("password") });
  if (!credentials.ok) redirect(`/login?error=${encodeURIComponent(credentials.message)}`);
  const next = safeReturnPath(formData.get("next"));
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: { emailRedirectTo: authCallbackUrl(process.env.NEXT_PUBLIC_SITE_URL, next) },
  });
  if (error) redirect(`/login?error=${encodeURIComponent("Registrace se nezdařila.")}`);
  if (data?.session) redirect("/onboarding");
  redirect(`/login?message=${encodeURIComponent("Zkontrolujte e-mail. Pokud účet vyžaduje potvrzení, po potvrzení se přihlaste.")}`);
}
