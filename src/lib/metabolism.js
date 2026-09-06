const DIACRITICS = /[\u0300-\u036f]/g;

function normalize(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SYNONYM_GROUPS = [
  ["paleta", "palety", "europaleta", "europalety"],
  ["karton", "krabice", "papir", "proklad", "proklady", "tubus", "tubusy"],
  ["drevo", "prkno", "prkna", "odrezek", "odrezky", "piliny", "hobliny"],
  ["textil", "latka", "latky", "bavlna", "prize", "siti"],
  ["kompost", "zemina", "organika", "substrat"],
  ["zahon", "zahony", "vyvyseny", "vyvysene"],
];

function expand(tokens) {
  const result = new Set(tokens);
  for (const token of tokens) {
    for (const group of SYNONYM_GROUPS) {
      if (group.includes(token)) group.forEach((item) => result.add(item));
    }
  }
  return result;
}

export function tokensFor(value = "") {
  return expand(normalize(value).split(" ").filter((token) => token.length >= 3));
}

export function countMaterialOverlap(project, material) {
  if (!project || !material || material.status !== "available" || material.type !== "offer") return 0;
  const need = tokensFor(`${project.project || ""} ${project.need || ""}`);
  const supply = tokensFor([
    material.title,
    material.description,
    material.useCase,
    ...(material.tags || []),
  ].filter(Boolean).join(" "));

  let overlap = 0;
  for (const token of need) {
    if (supply.has(token)) overlap += 1;
  }
  return overlap;
}

export function matchProjectToMaterials(project, materials = []) {
  return materials
    .map((material) => ({ material, overlap: countMaterialOverlap(project, material) }))
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || String(a.material.title).localeCompare(String(b.material.title)));
}

export function distanceKm(a, b) {
  if (!a || !b) return null;
  const toRad = (value) => value * Math.PI / 180;
  const earth = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return earth * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
