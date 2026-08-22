import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, AlertTriangle } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Hesla se neshodují.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;
      setDone(true);
      await supabase.auth.signOut();
      setTimeout(() => navigate("/login", { replace: true }), 800);
    } catch (err) {
      setError(err.message || "Heslo se nepodařilo změnit. Otevřete nový odkaz z e-mailu.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <AuthLayout icon={Lock} title="Heslo bylo změněno" subtitle="Nyní se můžete znovu přihlásit">
        <Link to="/login" className="h-12 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center">
          Přihlásit se
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout icon={Lock} title="Nové heslo" subtitle="Zadejte nové heslo pro svůj účet">
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-start gap-2">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Nové heslo</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input id="password" type="password" autoComplete="new-password" autoFocus value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="pl-10 h-12" minLength={8} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Potvrdit heslo</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input id="confirm" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="pl-10 h-12" minLength={8} required />
          </div>
        </div>

        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Ukládám…</> : "Nastavit nové heslo"}
        </Button>
      </form>
    </AuthLayout>
  );
}
