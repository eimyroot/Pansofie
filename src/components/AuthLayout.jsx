import React from "react";
import { Leaf } from "lucide-react";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen bg-background px-5 py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <a href="/" className="mb-8 flex items-center justify-center gap-2 font-heading font-bold"><span className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={18} /></span>Pansofie</a>
        <div className="card-soft p-7 sm:p-8">
          <div className="text-center mb-7">
            {Icon && <span className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={22} /></span>}
            <h1 className="text-2xl font-semibold font-heading">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>}
          </div>
          {children}
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
