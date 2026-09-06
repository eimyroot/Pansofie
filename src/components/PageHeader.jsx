import React from "react";

export default function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && <p className="text-xs font-black uppercase tracking-[.18em] text-green-700">{eyebrow}</p>}
      <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">{title}</h1>
      {lead && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">{lead}</p>}
      {children}
    </div>
  );
}
