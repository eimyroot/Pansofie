import {
  Heart,
  BookOpen,
  Users,
  Sparkles,
  Compass,
  Globe,
  Sprout,
  Wrench,
  Trophy,
  HeartHandshake,
  Briefcase,
  UserRound,
  Recycle,
  Shield,
} from "lucide-react";

export const CANONICAL_DOMAIN_VERSION = "1.0";

export const PATHS = [
  {
    id: "ja-wellbeing",
    name: "Já & zdraví",
    color: "#10b981",
    icon: Heart,
    desc: "Zdraví, identita, sebereflexe, odolnost a návyky, které pomáhají dobře fungovat.",
    develops: "Sebepoznání, péči o zdraví, odolnost a schopnost řídit vlastní návyky a energii.",
    areas: ["Zdraví", "Sebereflexe", "Odolnost", "Návyky"],
  },
  {
    id: "poznani-mysleni",
    name: "Poznání & myšlení",
    color: "#3b82f6",
    icon: BookOpen,
    desc: "Učení, kritické myšlení, práce s informacemi, médii a souvislostmi.",
    develops: "Schopnost učit se, ověřovat informace, přemýšlet kriticky a vidět souvislosti.",
    areas: ["Učení", "Kritické myšlení", "Informace", "Systémy"],
  },
  {
    id: "vztahy-spoluprace",
    name: "Vztahy & spolupráce",
    color: "#f43f5e",
    icon: Users,
    desc: "Empatie, komunikace, týmová práce, konflikty a spolupráce mezi generacemi.",
    develops: "Empatii, komunikaci, spolupráci a schopnost řešit konflikty.",
    areas: ["Komunikace", "Empatie", "Tým", "Konflikty"],
  },
  {
    id: "tvorba-reseni",
    name: "Tvorba & řešení problémů",
    color: "#8b5cf6",
    icon: Sparkles,
    desc: "Tvořivost, zkoumání, design, technologie, řemeslo a hledání nových řešení.",
    develops: "Schopnost tvořit, experimentovat, navrhovat a řešit skutečné problémy.",
    areas: ["Tvorba", "Design", "Technologie", "Experiment"],
  },
  {
    id: "samostatnost-podnikavost",
    name: "Samostatnost & podnikavost",
    color: "#06b6d4",
    icon: Compass,
    desc: "Finance, práce, plánování, zdroje, iniciativa a vlastní projekty.",
    develops: "Praktickou samostatnost, finanční gramotnost, plánování a schopnost převzít iniciativu.",
    areas: ["Finance", "Práce", "Plánování", "Podnikavost"],
  },
  {
    id: "obcanstvi-prinos",
    name: "Občanství & přínos",
    color: "#6366f1",
    icon: Globe,
    desc: "Služba druhým, účast na veřejném životě, komunita, demokracie a odpovědnost.",
    develops: "Odpovědnou účast na společném dění, službu, spolupráci s komunitou a schopnost přinášet veřejnou hodnotu.",
    areas: ["Komunita", "Participace", "Služba", "Odpovědnost"],
  },
  {
    id: "priroda-udrzitelnost",
    name: "Příroda & udržitelnost",
    color: "#16a34a",
    icon: Sprout,
    desc: "Příroda, jídlo, klima, biodiverzita, cirkularita a práce se zdroji.",
    develops: "Porozumění přírodě, zdrojům, udržitelnosti a dlouhodobým důsledkům našich rozhodnutí.",
    areas: ["Příroda", "Jídlo", "Cirkularita", "Biodiverzita"],
  },
];

export const LEGACY_PATHS = [
  { id: "zdravi", name: "Zdraví", color: "#10b981", icon: Heart, legacy: true, canonicalTargets: ["ja-wellbeing"] },
  { id: "poznaní", name: "Poznání", color: "#3b82f6", icon: BookOpen, legacy: true, canonicalTargets: ["poznani-mysleni"] },
  { id: "poznani", name: "Poznání", color: "#3b82f6", icon: BookOpen, legacy: true, canonicalTargets: ["poznani-mysleni"] },
  { id: "charakter", name: "Charakter", color: "#f59e0b", icon: Shield, legacy: true, canonicalTargets: ["ja-wellbeing", "obcanstvi-prinos"], requiresReview: true },
  { id: "vztahy", name: "Vztahy", color: "#f43f5e", icon: Users, legacy: true, canonicalTargets: ["vztahy-spoluprace"] },
  { id: "tvorivost", name: "Tvořivost", color: "#8b5cf6", icon: Sparkles, legacy: true, canonicalTargets: ["tvorba-reseni"] },
  { id: "samostatnost", name: "Samostatnost", color: "#06b6d4", icon: Compass, legacy: true, canonicalTargets: ["samostatnost-podnikavost"] },
  { id: "prinos", name: "Přínos", color: "#6366f1", icon: Globe, legacy: true, canonicalTargets: ["obcanstvi-prinos"] },
  { id: "sport", name: "Sport", color: "#ea580c", icon: Trophy, legacy: true, canonicalTargets: ["ja-wellbeing", "vztahy-spoluprace"], requiresReview: true },
];

export const LABS = [
  { id: "life", name: "LIFE", color: "#7c3aed", icon: Briefcase, desc: "Každodenní život: zdraví, jídlo, finance, bezpečnost a praktické fungování." },
  { id: "maker", name: "MAKER", color: "#0891b2", icon: Wrench, desc: "Tvoření a technika: řemeslo, technologie, AI, opravy, výroba a prototypování." },
  { id: "nature", name: "NATURE", color: "#16a34a", icon: Sprout, desc: "Příroda a zdroje: půda, voda, jídlo, biodiverzita, cirkularita a udržitelnost." },
  { id: "community", name: "COMMUNITY", color: "#db2777", icon: HeartHandshake, desc: "Život s druhými: sousedství, senioři, kultura, služba a veřejný prostor." },
  { id: "challenge", name: "CHALLENGE", color: "#ea580c", icon: Trophy, desc: "Výzvy: sport, pobyt venku, expedice a týmové úkoly." },
];

export const LEGACY_LABS = [
  { id: "food-nature", name: "Food & Nature", color: "#16a34a", icon: Sprout, legacy: true, canonicalTargets: ["nature"] },
  { id: "circular", name: "Circular & Materials", color: "#0d9488", icon: Recycle, legacy: true, canonicalTargets: ["nature"] },
  { id: "sport", name: "Sport & Challenge", color: "#ea580c", icon: Trophy, legacy: true, canonicalTargets: ["challenge"] },
  { id: "self", name: "Self & Relationships", color: "#4f46e5", icon: UserRound, legacy: true, canonicalTargets: [], requiresReview: true },
];

export const PROGRAMS = [
  { id: "school", name: "Pansofie School", desc: "Školní zkušenosti, nástroje pro učitele, návaznost na RVP, Experience Passport a vyhodnocování výsledků.", icon: BookOpen },
  { id: "family", name: "Pansofie Family", desc: "Rodinné mise, společné zkušenosti a vedená reflexe.", icon: HeartHandshake },
  { id: "community", name: "Pansofie Community", desc: "Obce, spolky, senioři, místní potřeby a mezigenerační spolupráce.", icon: Users },
  { id: "youth", name: "Pansofie Youth", desc: "Samostatnost, finance, práce, projekty, mentoring a občanská zkušenost pro mladé 15+.", icon: Sparkles },
];

export const LEGACY_PROGRAMS = [
  { id: "generations", name: "Generations", desc: "Historická programová větev; v současném modelu je mezigenerační spolupráce součástí Pansofie Community.", icon: Globe, legacy: true, canonicalTargets: ["community"] },
];

export const PROCESS_STEPS = [
  { title: "Objev", desc: "Najdi skutečný problém, potřebu nebo otázku.", detail: "Pansofie začíná reálnou situací, ne sbíráním bodů." },
  { title: "Udělej", desc: "Prozkoumej situaci, navrhni postup a něco skutečně udělej.", detail: "Digitální část má vést ven z obrazovky — k práci s lidmi, věcmi a skutečným prostředím." },
  { title: "Pochop", desc: "Dolož, co vzniklo, a zamysli se nad tím, co fungovalo, co selhalo a proč.", detail: "Důkaz a reflexe pomáhají odlišit skutečnou zkušenost od pouhého zážitku." },
  { title: "Přispěj", desc: "Použij zkušenost dál, vytvoř hodnotu pro druhé a zvol další krok.", detail: "Po ověření může zůstat záznam v Experience Passportu a zkušenost může navázat na další misi nebo projekt." },
];

const canonicalPathById = new Map(PATHS.map((item) => [item.id, item]));
const legacyPathById = new Map(LEGACY_PATHS.map((item) => [item.id, item]));
const canonicalLabById = new Map(LABS.map((item) => [item.id, item]));
const legacyLabById = new Map(LEGACY_LABS.map((item) => [item.id, item]));
const canonicalProgramById = new Map(PROGRAMS.map((item) => [item.id, item]));
const legacyProgramById = new Map(LEGACY_PROGRAMS.map((item) => [item.id, item]));

export const getPath = (id) => canonicalPathById.get(id) || legacyPathById.get(id) || null;
export const getLab = (id) => canonicalLabById.get(id) || legacyLabById.get(id) || null;
export const getProgram = (id) => canonicalProgramById.get(id) || legacyProgramById.get(id) || null;

export const getCanonicalPathTargets = (id) => {
  if (canonicalPathById.has(id)) return [id];
  return legacyPathById.get(id)?.canonicalTargets || [];
};

export const getCanonicalLabTargets = (id) => {
  if (canonicalLabById.has(id)) return [id];
  if (id === "maker" || id === "community" || id === "life") return [id];
  return legacyLabById.get(id)?.canonicalTargets || [];
};

export const getCanonicalProgramTargets = (id) => {
  if (canonicalProgramById.has(id)) return [id];
  return legacyProgramById.get(id)?.canonicalTargets || [];
};

export const requiresManualPathMigration = (id) => Boolean(legacyPathById.get(id)?.requiresReview);
export const requiresManualLabMigration = (id) => Boolean(legacyLabById.get(id)?.requiresReview);
