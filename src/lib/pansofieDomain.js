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
    name: "Já & wellbeing",
    color: "#10b981",
    icon: Heart,
    desc: "Zdraví, identita, sebereflexe, odolnost a bezpečné návyky.",
    develops: "Sebepoznání, péči o zdraví, odolnost a self-management.",
    areas: ["Zdraví", "Sebereflexe", "Odolnost", "Návyky"],
  },
  {
    id: "poznani-mysleni",
    name: "Poznání & myšlení",
    color: "#3b82f6",
    icon: BookOpen,
    desc: "Učení, kritické myšlení, informace, média a systémy.",
    develops: "Učení se učit, kritické myšlení, informační a systémovou gramotnost.",
    areas: ["Učení", "Kritické myšlení", "Informace", "Systémy"],
  },
  {
    id: "vztahy-spoluprace",
    name: "Vztahy & spolupráce",
    color: "#f43f5e",
    icon: Users,
    desc: "Empatie, komunikace, tým, konflikty a mezigenerační spolupráce.",
    develops: "Empatii, komunikaci, spolupráci a práci s konfliktem.",
    areas: ["Komunikace", "Empatie", "Tým", "Konflikty"],
  },
  {
    id: "tvorba-reseni",
    name: "Tvorba & řešení problémů",
    color: "#8b5cf6",
    icon: Sparkles,
    desc: "Tvořivost, badatelství, design, technologie, řemeslo a inovace.",
    develops: "Tvorbu, experimentování, design a řešení reálných problémů.",
    areas: ["Tvorba", "Design", "Technologie", "Experiment"],
  },
  {
    id: "samostatnost-podnikavost",
    name: "Samostatnost & podnikavost",
    color: "#06b6d4",
    icon: Compass,
    desc: "Finance, práce, plánování, zdroje, iniciativa a projekty.",
    develops: "Praktickou samostatnost, finanční gramotnost, plánování a podnikavost.",
    areas: ["Finance", "Práce", "Plánování", "Podnikavost"],
  },
  {
    id: "obcanstvi-prinos",
    name: "Občanství & přínos",
    color: "#6366f1",
    icon: Globe,
    desc: "Služba, participace, komunita, demokracie a veřejná hodnota.",
    develops: "Odpovědnou participaci, službu, spolupráci s komunitou a společenský přínos.",
    areas: ["Komunita", "Participace", "Služba", "Odpovědnost"],
  },
  {
    id: "priroda-udrzitelnost",
    name: "Příroda & udržitelnost",
    color: "#16a34a",
    icon: Sprout,
    desc: "Příroda, jídlo, klima, biodiverzita, cirkularita a regenerace.",
    develops: "Systémové porozumění přírodě, zdrojům, udržitelnosti a dlouhodobým dopadům.",
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
  { id: "life", name: "LIFE", color: "#7c3aed", icon: Briefcase, desc: "Zdraví, jídlo, finance, bezpečnost a každodenní život." },
  { id: "maker", name: "MAKER", color: "#0891b2", icon: Wrench, desc: "Řemeslo, technologie, AI, opravy, výroba a prototypování." },
  { id: "nature", name: "NATURE", color: "#16a34a", icon: Sprout, desc: "Příroda, půda, voda, jídlo, biodiverzita a cirkularita." },
  { id: "community", name: "COMMUNITY", color: "#db2777", icon: HeartHandshake, desc: "Sousedství, senioři, kultura, služba a veřejný život." },
  { id: "challenge", name: "CHALLENGE", color: "#ea580c", icon: Trophy, desc: "Sport, outdoor, expedice a týmové výzvy." },
];

export const LEGACY_LABS = [
  { id: "food-nature", name: "Food & Nature", color: "#16a34a", icon: Sprout, legacy: true, canonicalTargets: ["nature"] },
  { id: "circular", name: "Circular & Materials", color: "#0d9488", icon: Recycle, legacy: true, canonicalTargets: ["nature"] },
  { id: "sport", name: "Sport & Challenge", color: "#ea580c", icon: Trophy, legacy: true, canonicalTargets: ["challenge"] },
  { id: "self", name: "Self & Relationships", color: "#4f46e5", icon: UserRound, legacy: true, canonicalTargets: [], requiresReview: true },
];

export const PROGRAMS = [
  { id: "school", name: "Pansofie School", desc: "Školní Experiences, učitelské nástroje, RVP mapping, Passport a impact reporting.", icon: BookOpen },
  { id: "family", name: "Pansofie Family", desc: "Rodinné mise, společné Experiences a vedená reflexe.", icon: HeartHandshake },
  { id: "community", name: "Pansofie Community", desc: "Obce, spolky, senioři, místní problémy a mezigenerační spolupráce.", icon: Users },
  { id: "youth", name: "Pansofie Youth", desc: "Samostatnost, finance, práce, projekty, mentoring a občanská zkušenost pro 15+.", icon: Sparkles },
];

export const LEGACY_PROGRAMS = [
  { id: "generations", name: "Generations", desc: "Historická programová větev; v V1.0 je mezigeneračnost principem Pansofie Community.", icon: Globe, legacy: true, canonicalTargets: ["community"] },
];

export const PROCESS_STEPS = [
  { title: "Objev", desc: "Najdi skutečný problém, potřebu nebo otázku.", detail: "PANSOFIE začíná reálným kontextem, ne sbíráním bodů." },
  { title: "Udělej", desc: "Prozkoumej situaci, navrhni postup a jednej v realitě.", detail: "Digitální vrstva má vést ke skutečné činnosti s lidmi, věcmi a prostředím." },
  { title: "Pochop", desc: "Dolož výsledek a reflektuj, co fungovalo, selhalo a proč.", detail: "Evidence a reflexe oddělují zkušenost od pouhého zážitku." },
  { title: "Přispěj", desc: "Přenes zkušenost dál, vytvoř hodnotu a zvol další krok.", detail: "Výsledek se zapisuje do Experience Passportu a může navázat na další misi nebo projekt." },
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
