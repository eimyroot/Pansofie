export const PANSOFIE_PRODUCTS = Object.freeze({
  pansofie: {
    id: "pansofie",
    label: "PANSOFIE",
    role: "editorial_knowledge_ecosystem",
    visualOwner: "pansofie",
  },
  young: {
    id: "young",
    label: "PANSOFIE YOUNG",
    role: "youth_public_experience",
    visualOwner: "young",
  },
  go: {
    id: "go",
    label: "PANSOFIE GO",
    role: "shared_action_application",
    visualOwner: "go",
  },
});

export const PANSOFIE_PATHS = Object.freeze([
  {
    id: "body",
    label: "Tělo",
    principle: "Zdravé tělo je nástroj pro dobrý život.",
    develops: ["pohyb", "zdravé návyky", "disciplína", "odolnost"],
  },
  {
    id: "mind",
    label: "Mysl",
    principle: "Mysl má hledat pravdu a řešení.",
    develops: ["analytické myšlení", "kreativita", "digitální gramotnost", "řešení problémů"],
  },
  {
    id: "character",
    label: "Charakter",
    principle: "Skutečná hodnota člověka je v jeho charakteru.",
    develops: ["vytrvalost", "pravdomluvnost", "odpovědnost", "dokončování práce"],
  },
  {
    id: "relationships",
    label: "Vztahy",
    principle: "Člověk roste mezi lidmi.",
    develops: ["empatie", "komunikace", "týmová práce", "leadership"],
  },
  {
    id: "creativity",
    label: "Tvořivost",
    principle: "Svět se zlepšuje díky tvořivým lidem.",
    develops: ["kreativita", "podnikavost", "realizace nápadu"],
  },
  {
    id: "prosperity",
    label: "Prosperita",
    principle: "Člověk má umět hospodařit se zdroji.",
    develops: ["finanční gramotnost", "plánování", "podnikání", "organizace práce"],
  },
  {
    id: "meaning",
    label: "Smysl",
    principle: "Člověk má hledat smysl svého života a služby společnosti.",
    develops: ["hodnoty", "etika", "odpovědnost za svět", "služba komunitě"],
  },
]);

export const PANSOFIE_DOMAINS = Object.freeze([
  ["self", "Já", "Sebepoznání, sebehodnota a autenticita", "Sebereflexe"],
  ["body", "Tělo", "Pohyb, spánek, výživa a energie", "Sebeřízení"],
  ["mind", "Mysl", "Kritické myšlení, učení a paměť", "Myšlení v souvislostech"],
  ["emotions", "Emoce", "Emoční gramotnost a regulace", "Empatie a sebeovládání"],
  ["relationships", "Vztahy", "Komunikace, hranice a spolupráce", "Aktivní naslouchání"],
  ["family", "Rodina", "Role, odpovědnost a sdílení", "Spolupráce napříč generacemi"],
  ["society", "Společnost", "Občanská gramotnost a normy", "Zodpovědné rozhodování"],
  ["nature", "Příroda", "Ekosystémy, cykly a závislost člověka na přírodě", "Ekologické myšlení"],
  ["technology", "Technologie", "Digitální gramotnost, AI a bezpečnost", "Tvůrčí a kritické užití nástrojů"],
  ["finance", "Finance", "Peníze, rozpočet, investice a hodnota práce", "Finanční plánování"],
  ["work", "Práce", "Pracovní návyky, odpovědnost a řemesla", "Vytrvalost a kvalita"],
  ["creation", "Tvorba", "Kreativita, design a řemeslo", "Tvůrčí realizace nápadu"],
  ["culture", "Kultura", "Tradice, umění a identita", "Kulturní citlivost"],
  ["ethics", "Etika", "Hodnoty, spravedlnost a integrita", "Etické rozhodování"],
  ["citizenship", "Občanství", "Práva, povinnosti a participace", "Aktivní občanství"],
  ["meaning", "Smysl života", "Hodnoty, poslání a dlouhodobé cíle", "Sebeurčení"],
].map(([id, label, learning, skill]) => Object.freeze({ id, label, learning, skill })));

export const PANSOFIE_METHOD = Object.freeze([
  { id: "learn", label: "LEARN", cs: "Poznej" },
  { id: "play", label: "PLAY", cs: "Hraj" },
  { id: "do", label: "DO", cs: "Udělej" },
  { id: "create", label: "CREATE", cs: "Vytvoř" },
  { id: "share", label: "SHARE", cs: "Sdílej" },
  { id: "reflect", label: "REFLECT", cs: "Reflektuj" },
]);

export const PANSOFIE_OUTCOME_FLOW = Object.freeze([
  "GAME",
  "EXPERIENCE",
  "SKILL",
  "IMPACT",
]);

export const PANSOFIE_PROGRAMS = Object.freeze([
  {
    id: "green_hope",
    label: "Green Hope",
    role: "environmental_action",
    publicRoute: "/green-hope",
  },
  {
    id: "urban_family_farm",
    label: "Urban Family Farm",
    role: "practical_life_lab",
    publicRoute: "/urban-family-farm",
  },
  {
    id: "family_team",
    label: "Family Team",
    role: "family_context",
    publicRoute: "/family-team",
  },
  {
    id: "knowledge_exchange",
    label: "Knowledge Exchange",
    role: "intergenerational_learning",
    publicRoute: "/knowledge-exchange",
  },
]);

export const IMPACT_DIMENSION_IDS = Object.freeze([
  "knowledge",
  "skills",
  "wellbeing",
  "family",
  "community",
  "nature",
  "entrepreneurship",
  "intergenerational_connection",
]);

export const PUBLIC_PANSOFIE_SECTIONS = Object.freeze([
  "hero",
  "what_is_pansofie",
  "paths",
  "domains",
  "method",
  "go_bridge",
  "mission_example",
  "programs",
  "family_knowledge_exchange",
  "community_places",
  "impact",
  "audience_entries",
  "final_cta",
]);

export const YOUNG_PUBLIC_SECTIONS = Object.freeze([
  "home",
  "discover",
  "paths",
  "domains",
  "stories",
  "missions_gateway",
  "projects",
  "community",
  "how_it_works",
]);

export const GO_PRIMARY_VIEWS = Object.freeze([
  "home",
  "missions",
  "map",
  "projects",
  "teams",
  "portfolio",
  "mentor",
  "profile",
  "settings",
]);

export const TARGET_YOUNG_PRODUCT_RANGE = Object.freeze({ min: 6, max: 18 });

// Current auth routing intentionally remains governed by src/domain/experience.js.
// Do not use TARGET_YOUNG_PRODUCT_RANGE for authorization until a reviewed migration
// reconciles the current 6–13 / 14–20 resolver with the product target.
