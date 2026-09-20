export const LEARNING_CYCLE = Object.freeze([
  "learn",
  "play",
  "do",
  "create",
  "share",
  "reflect",
]);

export const DEVELOPMENT_PATHS = Object.freeze([
  { id: "body", labelCs: "Tělo", facetCs: "vitalita", principleCs: "Zdravé tělo je nástroj pro dobrý život." },
  { id: "mind", labelCs: "Mysl", facetCs: "poznání", principleCs: "Mysl má hledat pravdu a řešení." },
  { id: "character", labelCs: "Charakter", facetCs: "vnitřní síla", principleCs: "Skutečná hodnota člověka je v jeho charakteru." },
  { id: "relationships", labelCs: "Vztahy", facetCs: "spolupráce", principleCs: "Člověk roste mezi lidmi." },
  { id: "creativity", labelCs: "Tvořivost", facetCs: "inovace", principleCs: "Svět se zlepšuje díky tvořivým lidem." },
  { id: "prosperity", labelCs: "Prosperita", facetCs: "praktický život", principleCs: "Člověk má umět hospodařit se zdroji." },
  { id: "meaning", labelCs: "Smysl", facetCs: "přesah", principleCs: "Člověk má hledat smysl svého života a služby společnosti." },
]);

export const LEARNING_DOMAINS = Object.freeze([
  { id: "self", labelCs: "Já", labelEn: "Self" },
  { id: "body", labelCs: "Tělo", labelEn: "Body" },
  { id: "mind", labelCs: "Mysl", labelEn: "Mind" },
  { id: "emotions", labelCs: "Emoce", labelEn: "Emotions" },
  { id: "relationships", labelCs: "Vztahy", labelEn: "Relationships" },
  { id: "family", labelCs: "Rodina", labelEn: "Family" },
  { id: "society", labelCs: "Společnost", labelEn: "Society" },
  { id: "nature", labelCs: "Příroda", labelEn: "Nature" },
  { id: "technology", labelCs: "Technologie", labelEn: "Technology" },
  { id: "finance", labelCs: "Finance", labelEn: "Finance" },
  { id: "work", labelCs: "Práce", labelEn: "Work" },
  { id: "creation", labelCs: "Tvorba", labelEn: "Creation" },
  { id: "culture", labelCs: "Kultura", labelEn: "Culture" },
  { id: "ethics", labelCs: "Etika", labelEn: "Ethics" },
  { id: "citizenship", labelCs: "Občanství", labelEn: "Citizenship" },
  { id: "meaning", labelCs: "Smysl života", labelEn: "Meaning of life" },
]);

export const PROGRAMS = Object.freeze([
  "pansofie",
  "pansofiego",
  "green_hope",
  "urban_family_farm",
]);

export const IMPACT_DIMENSIONS = Object.freeze([
  "knowledge",
  "skills",
  "well_being",
  "family",
  "community",
  "nature",
  "entrepreneurship",
  "intergenerational_connection",
]);

export const MISSION_GROW_001 = Object.freeze({
  id: "MISSION-GROW-001",
  slug: "vypestuj-prvni-rostlinu",
  titleCs: "Vypěstuj první rostlinu",
  program: "green_hope",
  domainIds: ["nature"],
  pathIds: ["meaning"],
  difficulty: 1,
  developmentLevelMin: 1,
  developmentLevelMax: 4,
  contentRating: "general",
  supervisionRequirement: "recommended",
  documentationMode: "optional",
  learn: "Zjisti, co rostlina potřebuje k růstu: světlo, vodu, živiny a čas.",
  play: "Vyber vhodné místo a porovnej, kde má rostlina nejlepší podmínky.",
  do: "Zasaď semeno nebo sazenici a pečuj o ni v průběhu růstu.",
  create: "Vytvoř jednoduchý záznam růstu pomocí poznámek, kresby nebo fotografie.",
  share: "Sdílej bezpečně výsledek s rodinou, týmem nebo skupinou, se kterou misi plníš.",
  reflect: "Popiš, co rostlině pomáhalo, co nefungovalo a co příště uděláš jinak.",
});

const AGE_GATE_KEYS = new Set(["ageMin", "ageMax", "minAge", "maxAge"]);
const DOMAIN_IDS = new Set(LEARNING_DOMAINS.map((domain) => domain.id));
const PATH_IDS = new Set(DEVELOPMENT_PATHS.map((path) => path.id));
const CONTENT_RATINGS = new Set(["general", "guided", "mature"]);
const SUPERVISION_REQUIREMENTS = new Set(["none", "recommended", "required"]);

export function validateMissionBlueprint(mission) {
  const errors = [];
  if (!mission || typeof mission !== "object") return ["mission must be an object"];

  for (const key of AGE_GATE_KEYS) {
    if (Object.hasOwn(mission, key)) errors.push(`${key} is not allowed; use development levels`);
  }

  if (!PROGRAMS.includes(mission.program)) errors.push("program is invalid");
  if (mission.domainIds && (!Array.isArray(mission.domainIds) || mission.domainIds.some((id) => !DOMAIN_IDS.has(id)))) {
    errors.push("domainIds must contain only canonical learning domain ids");
  }
  if (mission.pathIds && (!Array.isArray(mission.pathIds) || mission.pathIds.some((id) => !PATH_IDS.has(id)))) {
    errors.push("pathIds must contain only canonical development path ids");
  }
  if (mission.contentRating && !CONTENT_RATINGS.has(mission.contentRating)) errors.push("contentRating is invalid");
  if (mission.supervisionRequirement && !SUPERVISION_REQUIREMENTS.has(mission.supervisionRequirement)) {
    errors.push("supervisionRequirement is invalid");
  }
  if (!Number.isInteger(mission.difficulty) || mission.difficulty < 1 || mission.difficulty > 5) {
    errors.push("difficulty must be an integer from 1 to 5");
  }

  const min = mission.developmentLevelMin;
  const max = mission.developmentLevelMax;
  if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1 || max > 10 || min > max) {
    errors.push("development levels must be integers from 1 to 10 with min <= max");
  }

  for (const phase of LEARNING_CYCLE) {
    if (typeof mission[phase] !== "string" || mission[phase].trim() === "") {
      errors.push(`${phase} phase is required`);
    }
  }

  return errors;
}
