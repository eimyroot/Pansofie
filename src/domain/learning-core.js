export const LEARNING_CYCLE = Object.freeze([
  "learn",
  "play",
  "do",
  "create",
  "share",
  "reflect",
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

const AGE_GATE_KEYS = new Set(["ageMin", "ageMax", "minAge", "maxAge"]);

export function validateMissionBlueprint(mission) {
  const errors = [];
  if (!mission || typeof mission !== "object") return ["mission must be an object"];

  for (const key of AGE_GATE_KEYS) {
    if (Object.hasOwn(mission, key)) errors.push(`${key} is not allowed; use development levels`);
  }

  if (!PROGRAMS.includes(mission.program)) errors.push("program is invalid");
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
