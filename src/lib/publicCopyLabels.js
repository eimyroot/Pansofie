const PUBLIC_LABELS = {
  Experience: "Zkušenost",
  Passport: "Experience Passport",
  Transfer: "Přenos",
  Challenge: "Výzva",
  Review: "Zpětná vazba",
  Outcome: "Co se stalo potom",
  Impact: "Dlouhodobý dopad",
  Evidence: "Podklady",
  Implementace: "Postaveno",
  Testování: "Ověřujeme",
};

export function publicLabel(value) {
  return PUBLIC_LABELS[value] || value;
}
