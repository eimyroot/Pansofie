import React, { useEffect, useState } from "react";

const KEY = "pansofie-1.0:font-size";
const SIZES = ["normal", "large", "xlarge"];

export default function FontSizeControl({ compact = false }) {
  const [size, setSize] = useState(() => localStorage.getItem(KEY) || "normal");

  useEffect(() => {
    document.documentElement.dataset.fontSize = size;
    localStorage.setItem(KEY, size);
  }, [size]);

  const labels = compact
    ? [["normal", "A"], ["xlarge", "A++"]]
    : [["normal", "A"], ["large", "A+"], ["xlarge", "A++"]];

  return (
    <div className="flex items-center rounded-xl border border-stone-200 bg-stone-100 p-1" aria-label="Velikost textu">
      {!compact && <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">Písmo</span>}
      {labels.map(([value, label]) => (
        <button
          key={value}
          type="button"
          aria-pressed={size === value}
          onClick={() => setSize(value)}
          className={`rounded-lg px-2.5 py-1 font-black transition ${
            size === value ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-900"
          } ${value === "xlarge" ? "text-base" : "text-xs"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
