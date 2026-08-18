import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function Register() {
  return (
    <AuthLayout
      icon={LockKeyhole}
      title="Registrace je nyní pouze na pozvání"
      subtitle="První field pilot používá řízené školní účty místo otevřené veřejné registrace."
      footer={<><span>Už pilotní účet máte? </span><Link to="/login" className="text-primary font-medium hover:underline">Přihlásit se</Link></>}
    >
      <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
        <div className="flex items-start gap-3"><ShieldCheck className="text-primary shrink-0 mt-0.5" size={20} /><div><h2 className="font-semibold">Proč je registrace zavřená?</h2><p className="mt-2 text-sm text-muted-foreground leading-relaxed">Pilot pracuje s rolemi školy, žáka, učitele a dalšími účelově omezenými vztahy. Účet proto vzniká až v konkrétním pilotním kontextu a s vyjasněným oprávněním — ne anonymním self-signupem.</p></div></div>
      </div>

      <Link to="/zapojit-se" className="mt-6 w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2">Chci se zapojit <ArrowRight size={17} /></Link>
      <Link to="/" className="mt-3 w-full h-12 rounded-xl border border-border font-medium flex items-center justify-center">Zpět na veřejný web</Link>
    </AuthLayout>
  );
}
