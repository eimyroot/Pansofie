import Link from "next/link";
import { PansofieArtPanel } from "./PansofieArtPanel";

function inferVariant(label = "", title = "") {
  const key = `${label} ${title}`.toLowerCase();
  if (/přírod|green|zahrad|pěst|rostlin/.test(key)) return "nature";
  if (/měst|organiz|firma|materi|kompost|prostor|cirk/.test(key)) return "city";
  if (/škola|učen|oblast|cest|knih|blog|znal|ai|lab/.test(key)) return "knowledge";
  return "community";
}

function inferNodes(label = "", title = "") {
  const key = `${label} ${title}`.toLowerCase();
  if (/škola|učen/.test(key)) return ["Otázka", "Místo", "Projekt", "Zkušenost"];
  if (/materi|kompost|cirk/.test(key)) return ["Potřeba", "Zdroj", "Propojení", "Použití"];
  if (/green|přírod|zahrad|pěst/.test(key)) return ["Půda", "Voda", "Péče", "Místo"];
  if (/organiz|firma|partner/.test(key)) return ["Role", "Zdroj", "Účel", "Dohoda"];
  return ["Lidé", "Místo", "Vztah", "Zkušenost"];
}

export function PansofieVisualCard({ title, text, href, label = "PANSOFIE", className = "pw-visual-card", variant, nodes }) {
  const Tag = href ? Link : "article";
  const props = href ? { href } : {};
  const visualVariant = variant || inferVariant(label, title);
  const visualNodes = nodes || inferNodes(label, title);
  return <Tag {...props} className={className}>
    <div><PansofieArtPanel compact eyebrow={label} title={title} detail={text} nodes={visualNodes} variant={visualVariant}/></div>
    <span>{label}</span>
    <h2>{title}</h2>
    <p>{text}</p>
  </Tag>;
}
