import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Login() {
  const navigate = useNavigate();
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
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Neplatný e-mail nebo heslo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      icon={LogIn}
      title="Vítejte zpět"
      subtitle="Přihlášení pro pozvané účastníky školního pilotu a ověřené partnerské role"
      footer={<><span>Pilotní účty vznikají na pozvání. </span><Link to="/zapojit-se" className="text-primary font-medium hover:underline">Chci se zapojit</Link></>}
    >
      <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 text-sm text-muted-foreground leading-relaxed">
        Veřejná registrace zůstává během řízeného pilotu vypnutá. Pokud jste už dostali účet, přihlaste se e-mailem a heslem; po přihlášení se otevře nástěnka podle vašich skutečných rolí a oprávnění.
      </div>

      {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" /><Input id="email" type="email" autoComplete="email" autoFocus placeholder="vas@email.cz" value={email} onChange={(event) => setEmail(event.target.value)} className="pl-10 h-12" required /></div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between"><Label htmlFor="password">Heslo</Label><Link to="/forgot-password" className="text-xs text-primary hover:underline">Zapomenuté heslo?</Link></div>
          <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" /><Input id="password" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} className="pl-10 h-12" required /></div>
        </div>

        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>{loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Přihlašuji…</> : "Přihlásit"}</Button>
      </form>
    </AuthLayout>
  );
}
