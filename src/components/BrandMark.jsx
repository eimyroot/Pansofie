import React from "react";
import { Leaf } from "lucide-react";

export default function BrandMark({ compact = false }) {
  return (
    <span className="p-brand" aria-label="Pansofie">
      <span className={`p-brand-mark ${compact ? "p-brand-mark--compact" : ""}`}><Leaf size={compact ? 13 : 15} strokeWidth={1.7} /></span>
      <strong>Pansofie</strong>
    </span>
  );
}
