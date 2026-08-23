import React, { useMemo } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Sparkles } from "lucide-react";

const LABELS = {
  cs: {
    title: "Můj Vějíř zkušeností",
    subtitle: "Mapa toho, co jste skutečně zkusili, vytvořili a doložili.",
    evidenceDepth: "Hloubka evidence",
    experiences: "doložené zkušenosti",
    evidence: "důkazy",
    latest: "Poslední doložená Experience",
    empty: "Na této ose zatím není ověřená Experience.",
    depth: [
      "Zatím žádná evidence",
      "První doložená zkušenost",
      "Opakovaná zkušenost",
      "Zkušenost v různých kontextech",
      "Doložené použití výsledku",
      "Doložený následný dopad",
    ],
    axes: {
      digital_attention: "Digitální pozornost",
      critical_reason: "Kritický rozum",
      respectful_dialogue: "Respektující dialog",
      cooperation: "Spolupráce",
      circular_action: "Cirkulární jednání",
      local_impact: "Lokální dopad",
    },
    pillars: {
      know_self: "POZNEJ SEBE",
      create_with_others: "TVOŘ S DRUHÝMI",
      improve_world: "ZLEPŠUJ SVĚT",
    },
  },
  en: {
    title: "My Experience Fan",
    subtitle: "A map of what you have actually tried, created and documented.",
    evidenceDepth: "Evidence depth",
    experiences: "documented Experiences",
    evidence: "evidence items",
    latest: "Latest documented Experience",
    empty: "There is no verified Experience on this axis yet.",
    depth: [
      "No evidence yet",
      "First documented Experience",
      "Repeated Experience",
      "Experience across contexts",
      "Documented use of the outcome",
      "Documented follow-up impact",
    ],
    axes: {
      digital_attention: "Digital attention",
      critical_reason: "Critical reason",
      respectful_dialogue: "Respectful dialogue",
      cooperation: "Cooperation",
      circular_action: "Circular action",
      local_impact: "Local impact",
    },
    pillars: {
      know_self: "KNOW YOURSELF",
      create_with_others: "CREATE WITH OTHERS",
      improve_world: "IMPROVE THE WORLD",
    },
  },
};

const POINT_COLORS = {
  digital_attention: "#3b82f6",
  critical_reason: "#d946ef",
  respectful_dialogue: "#eab308",
  cooperation: "#f97316",
  circular_action: "#22c55e",
  local_impact: "#10b981",
};

function FanTooltip({ active, payload, locale }) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;
  const t = LABELS[locale];
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/95 px-3 py-2 text-xs text-white shadow-xl">
      <p className="font-semibold">{item.label}</p>
      <p className="mt-1 text-slate-300">{t.depth[item.depth]}</p>
      <p className="mt-1 text-slate-400">{item.experience_count} {t.experiences}</p>
    </div>
  );
}

export default function ExperienceFan({ rows = [], locale = "cs" }) {
  const safeLocale = locale === "en" ? "en" : "cs";
  const t = LABELS[safeLocale];

  const chartData = useMemo(() => rows.map((row) => ({
    ...row,
    depth: Number(row.depth || 0),
    experience_count: Number(row.experience_count || 0),
    evidence_count: Number(row.evidence_count || 0),
    context_count: Number(row.context_count || 0),
    label: t.axes[row.axis_code] || row.axis_code,
  })), [rows, t.axes]);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-white shadow-2xl">
      <div className="border-b border-white/10 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-300">
              <Sparkles size={15} /> PANSOFIE EXPERIENCE PASSPORT
            </div>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{t.title}</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">{t.subtitle}</p>
          </div>
          <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[11px] font-semibold text-violet-200">
            {t.evidenceDepth}: 0–5
          </span>
        </div>
      </div>

      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="min-h-[320px] rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.16),transparent_42%)] p-2">
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={chartData} outerRadius="66%">
              <PolarGrid stroke="rgba(255,255,255,0.12)" />
              <PolarAngleAxis dataKey="label" tick={{ fill: "#cbd5e1", fontSize: 10, fontWeight: 700 }} />
              <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
              <Radar dataKey="depth" stroke="#a78bfa" fill="#8b5cf6" fillOpacity={0.18} strokeWidth={2.5} dot={{ r: 4, fill: "#f8fafc", strokeWidth: 2 }} />
              <Tooltip content={<FanTooltip locale={safeLocale} />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-3">
          {chartData.map((item) => (
            <article key={item.axis_code} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: POINT_COLORS[item.axis_code] || "#a78bfa" }} />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{t.pillars[item.pillar_code] || item.pillar_code}</p>
                  <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-white">{item.label}</h3>
                    <span className="text-xs font-medium text-slate-300">{t.depth[item.depth]}</span>
                  </div>
                  {item.experience_count > 0 ? (
                    <>
                      <p className="mt-2 text-xs text-slate-400">{item.experience_count} {t.experiences} · {item.evidence_count} {t.evidence}</p>
                      {item.latest_title && <p className="mt-2 text-sm leading-5 text-slate-300"><span className="text-slate-500">{t.latest}: </span>{item.latest_title}</p>}
                    </>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">{t.empty}</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
