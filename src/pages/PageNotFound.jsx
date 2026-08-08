import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1) || location.pathname;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-muted-foreground/30">404</h1>
          <div className="h-0.5 w-16 bg-border mx-auto" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-medium text-foreground">Stránka nebyla nalezena</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cesta <span className="font-medium text-foreground">/{pageName}</span> v Pansofii neexistuje.
          </p>
        </div>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-primary-foreground bg-primary rounded-xl hover:opacity-90 transition-opacity">
          <Home size={16} /> Zpět domů
        </Link>
      </div>
    </div>
  );
}
