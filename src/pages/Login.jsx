import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { safeReturnTo } from "@/lib/authReturnTo";
import { getOnboardingState } from "@/lib/pansofieOnboardingFlow";
import { useLanguage } from "@/lib/LanguageContext";

const COPY = {
  cs: {
    title: "Vítejte zpět",
    subtitle: "Přihlášení pro pozvané účastníky školního pilotu a ověřené partnerské role",
    invite: "Pilotní účty vznikají na pozvání.",
    join: "Chci se zapojit",
    notice: "Veřejná registrace zůstává během řízeného pilotu vypnutá. Pokud jste už dostali účet, přihlaste se e-mailem a heslem; nový účet při prvním vstupu projde krátkou nultou misí a potom se otevře nástěnka podle skutečných rolí a oprávnění.",
    password: "Heslo",
    forgot: "Zapomenuté heslo?",
    submit: "Přihlásit",
    loading: "Přihlašuji…",
    error: "Neplatný e-mail nebo heslo.",
    placeholder: "vas@email.cz",
  },
  en: {
    title: "Welcome back",
    subtitle: "Sign-in for invited school-pilot participants and verified partner roles",
    invite: "Pilot accounts are created by invitation.",
    join: "I want to take part",
    notice: "Public registration remains closed during the governed pilot. If you already have an account, sign in with your email and password; a new account goes through a short zero mission on first entry and then opens the dashboard according to its real roles and permissions.",
    password: "Password",
    forgot: "Forgot password?",
    submit: "Sign in",
    loading: "Signing in…",
    error: "Invalid email or password.",
    placeholder: "you@example.com",
  },
};

export default function Login() {
  const navigate = useNavigate();
  const { locale } = useLanguage();
  const copy = COPY[locale === "en" ? "en" : "cs"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = safeReturnTo();
  const destination = returnTo === "/" ? "/dashboard" : returnTo;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;

      const onboarding = await getOnboardingState(data.user?.id);
      if (onboarding.supported && !onboarding.data?.onboarding_completed_at) {
        navigate(`/onboarding?returnTo=${encodeURIComponent(destination)}`, { replace: true });
      } else {
        navigate(destination, { replace: true });
      }
    } catch (err) {
      setError(err.message || copy.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      icon={LogIn}
      title={copy.title}
      subtitle={copy.subtitle}
      footer={<><span>{copy.invite} </span><Link to="/zapojit-se" className="text-primary font-medium hover:underline">{copy.join}</Link></>}
    >
      <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 text-sm text-muted-foreground leading-relaxed">
        {copy.notice}
      </div>

      {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" /><Input id="email" type="email" autoComplete="email" autoFocus placeholder={copy.placeholder} value={email} onChange={(event) => setEmail(event.target.value)} className="pl-10 h-12" required /></div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between"><Label htmlFor="password">{copy.password}</Label><Link to="/forgot-password" className="text-xs text-primary hover:underline">{copy.forgot}</Link></div>
          <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" /><Input id="password" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} className="pl-10 h-12" required /></div>
        </div>

        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>{loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {copy.loading}</> : copy.submit}</Button>
      </form>
    </AuthLayout>
  );
}
