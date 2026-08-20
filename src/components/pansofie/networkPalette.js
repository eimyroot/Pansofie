const DEFAULT_ACCENT = "158 40% 31%";

const EXACT = new Map([
  ["Žák", "158 48% 37%"],
  ["Rodina", "31 83% 57%"],
  ["Škola", "188 58% 37%"],
  ["Mentor", "255 56% 59%"],
  ["Partner", "13 76% 56%"],
  ["Firma", "13 76% 56%"],
  ["Komunita", "83 43% 39%"],
  ["Obec", "83 43% 39%"],
  ["Potřeba", "38 87% 52%"],
  ["Challenge", "24 86% 56%"],
  ["Akce", "14 76% 57%"],
  ["Důkaz", "193 68% 42%"],
  ["Výstup", "193 68% 42%"],
  ["Evidence", "193 68% 42%"],
  ["Reflexe", "278 47% 57%"],
  ["Ověření", "151 48% 36%"],
  ["Review", "266 49% 57%"],
  ["Passport", "217 61% 56%"],
  ["Transfer", "229 56% 56%"],
  ["Rozhodnutí", "229 56% 56%"],
  ["Outcome", "91 45% 40%"],
  ["Impact", "91 45% 40%"],
  ["Hranice", "166 44% 30%"],
  ["Bezpečí", "166 44% 30%"],
  ["Soukromí", "166 44% 30%"],
  ["Pilot", "187 55% 40%"],
  ["Důvěra", "151 48% 36%"],
  ["Implementace", "203 57% 48%"],
  ["Testování", "266 49% 57%"],
  ["Další krok", "229 56% 56%"],
]);

export function networkAccent(label = "") {
  if (EXACT.has(label)) return EXACT.get(label);
  const lower = label.toLocaleLowerCase("cs-CZ");
  if (/žák|passport/.test(lower)) return "158 48% 37%";
  if (/rodina/.test(lower)) return "31 83% 57%";
  if (/škola/.test(lower)) return "188 58% 37%";
  if (/mentor/.test(lower)) return "255 56% 59%";
  if (/partner|firma/.test(lower)) return "13 76% 56%";
  if (/komunita|obec/.test(lower)) return "83 43% 39%";
  if (/potřeba|challenge|účel/.test(lower)) return "38 87% 52%";
  if (/důkaz|výstup|evidence/.test(lower)) return "193 68% 42%";
  if (/reflexe/.test(lower)) return "278 47% 57%";
  if (/ověření|review|test|důvěra/.test(lower)) return "151 48% 36%";
  if (/outcome|impact/.test(lower)) return "91 45% 40%";
  if (/hranice|soukrom|bezpe/.test(lower)) return "166 44% 30%";
  if (/transfer|rozhodnutí|další/.test(lower)) return "229 56% 56%";
  if (/pilot/.test(lower)) return "187 55% 40%";
  return DEFAULT_ACCENT;
}

export function networkPalette(nodes = [], activeIndex = 0) {
  const safeIndex = Math.min(Math.max(activeIndex, 0), Math.max(nodes.length - 1, 0));
  const active = networkAccent(nodes[safeIndex]);
  const next = networkAccent(nodes[(safeIndex + 1) % Math.max(nodes.length, 1)] || "");
  const previous = networkAccent(nodes[(safeIndex + Math.max(nodes.length, 1) - 1) % Math.max(nodes.length, 1)] || "");
  return { active, next, previous };
}
