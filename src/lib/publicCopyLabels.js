const PUBLIC_LABELS = {
  Experience: "Zkušenost",
  Transfer: "Přenos",
  Challenge: "Výzva",
  Review: "Zpětná vazba",
  Outcome: "Co se stalo potom",
  Impact: "Dlouhodobý dopad",
  Evidence: "Podklady",
  Implementace: "Postaveno",
};

export function publicLabel(value) {
  return PUBLIC_LABELS[value] || value;
}
