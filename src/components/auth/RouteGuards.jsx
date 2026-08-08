import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

function LoadingGate() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center text-muted-foreground">
        <div className="h-9 w-9 rounded-2xl border-2 border-primary/20 border-t-primary animate-spin mx-auto mb-3" />
        <p className="text-sm">Ověřuji přístup…</p>
      </div>
    </div>
  );
}

export function RequireAuth({ children }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) return <LoadingGate />;

  if (!isAuthenticated) {
    const returnTo = location.pathname + location.search;
    return <Navigate to={`/login?returnTo=${encodeURIComponent(returnTo)}`} replace />;
  }

  return children;
}

export function RequireAdmin({ children }) {
  const { isAuthenticated, isAdmin, isLoadingAuth } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) return <LoadingGate />;

  if (!isAuthenticated) {
    const returnTo = location.pathname + location.search;
    return <Navigate to={`/admin/login?returnTo=${encodeURIComponent(returnTo)}`} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-5">
        <div className="card-soft max-w-md w-full p-8 text-center">
          <span className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive inline-flex items-center justify-center mb-4">
            <ShieldCheck size={22} />
          </span>
          <h1 className="text-2xl font-semibold font-heading">Přístup odepřen</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Tento účet nemá administrátorské oprávnění.
          </p>
          <a href="/dashboard" className="mt-6 inline-flex px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
            Zpět do Pansofie
          </a>
        </div>
      </div>
    );
  }

  return children;
}
