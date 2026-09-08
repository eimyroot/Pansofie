"use server";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export async function login(formData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?error=${encodeURIComponent("Přihlášení se nezdařilo.")}`);
  redirect("/app");
}

export async function signup(formData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback` } });
  if (error) redirect(`/login?error=${encodeURIComponent("Registrace se nezdařila.")}`);
  redirect("/onboarding");
}
