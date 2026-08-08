import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const returnTo = safeReturnTo();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Hesla se neshodují.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo: `${window.location.origin}${returnTo === "/" ? "/dashboard" : returnTo}`,
        },
      });
      if (signUpError) throw signUpError;

      if (data.session) {
        navigate(returnTo === "/" ? "/dashboard" : returnTo, { replace: true });
      } else {
        setCheckEmail(true);
      }
    } catch (err) {
      setError(err.message || "Registrace se nezdařila.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const destination = returnTo === "/" ? "/dashboard" : returnTo;
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}${destination}` },
    });
    if (oauthError) setError(oauthError.message);
  };

  if (checkEmail) {
    return (
      <AuthLayout icon={Mail} title="Potvrď svůj e-mail" subtitle={`Poslali jsme potvrzovací odkaz na ${email}`}>
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          Otevři e-mail od Pansofie a potvrď registraci. Potom se můžeš přihlásit.
        </p>
        <Link to="/login" className="mt-6 h-12 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center">
          Přejít na přihlášení
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={UserPlus}
      title="Vytvořit účet"
      subtitle="Začni svou cestu v Pansofii"
      footer={<><span>Už účet máš? </span><Link to="/login" className="text-primary font-medium hover:underline">Přihlásit se</Link></>}
    >
      <Button type="button" variant="outline" className="w-full h-12 font-medium mb-6" onClick={handleGoogle}>
        <GoogleIcon /> Pokračovat přes Google
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground">nebo</span></div>
      </div>

      {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full-name">Jméno</Label>
          <Input id="full-name" type="text" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} className="h-12" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-12" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Heslo</Label>
          <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input id="password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="pl-10 h-12" minLength={8} required /></div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Potvrdit heslo</Label>
          <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input id="confirm" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="pl-10 h-12" minLength={8} required /></div>
        </div>
        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Vytvářím účet…</> : "Vytvořit účet"}
        </Button>
      </form>
    </AuthLayout>
  );
}
