import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <AuthLayout
      icon={Mail}
      title="Obnovit heslo"
      subtitle="Pošleme vám odkaz pro nastavení nového hesla"
      footer={
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={15} /> Zpět na přihlášení
        </Link>
      }
    >
      {sent ? (
        <div className="text-sm text-muted-foreground leading-relaxed">
          Pokud účet s tímto e-mailem existuje, obdržíte odkaz pro změnu hesla.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input id="email" type="email" autoComplete="email" autoFocus placeholder="vas@email.cz" value={email} onChange={(event) => setEmail(event.target.value)} className="pl-10 h-12" required />
            </div>
          </div>
          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? <><Loader2 size={16} className="animate-spin" /> Odesílám…</> : "Poslat odkaz"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
