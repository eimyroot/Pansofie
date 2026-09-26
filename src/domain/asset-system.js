import { CURRENT_MEDIA, currentIcon } from "./current-visuals.js";

export const ASSET_NAMESPACES = Object.freeze({
  current: "/assets/current",
});

export const PATH_ASSET_IDS = Object.freeze([
  "body", "mind", "character", "relationships",
  "creativity", "prosperity", "meaning",
]);

export const DOMAIN_ASSET_IDS = Object.freeze([
  "self", "body", "mind", "emotions",
  "relationships", "family", "society", "nature",
  "technology", "finance", "work", "creation",
  "culture", "ethics", "citizenship", "meaning",
]);

export const PANSOFIE_ICON_IDS = Object.freeze([
  "education", "community", "projects", "impact", "about", "school",
  "organization", "blog", "contact", "map", "network", "settings",
]);

export const YOUNG_ICON_IDS = Object.freeze([
  "explore", "topics", "stories", "community", "projects", "join", "search", "account",
]);

export const YOUNG_DOODLE_IDS = Object.freeze([
  "crown", "spark", "smile", "arrow", "underline", "wave", "heart", "blob",
  "asterisk", "burst", "chat", "circle", "cross", "double-line", "exclamation", "flower",
  "leaf", "lightning", "loop", "planet", "question", "scribble", "star", "zigzag",
]);

export const GO_ICON_IDS = Object.freeze([
  "home", "mission", "map", "projects", "teams", "portfolio", "mentor",
  "profile", "settings", "notifications", "camera", "upload", "reflection", "verified",
]);

export const GO_PIN_IDS = Object.freeze(["mission", "project", "event", "lab", "mentor"]);
export const GO_BADGE_IDS = Object.freeze(["nature", "helper", "learner", "team", "creator", "explorer", "impact"]);

export const PANSOFIE_PHOTO_IDS = Object.freeze([
  "hero-community-left-safe-16x9", "hero-community-left-safe-4x3", "hero-community-left-safe-4x5",
  "curiosity-nature-16x9", "growing-together-16x9", "prague-nature-16x9", "community-city-16x9",
]);

export const YOUNG_PHOTO_IDS = Object.freeze([
  "hero-rooftop-left-safe-16x9", "hero-rooftop-left-safe-4x3", "hero-rooftop-left-safe-4x5",
  "community-cutout", "creative-studio-16x9", "creative-studio-4x5",
  "explorers-nature-16x9", "explorers-nature-4x5",
]);

export const GO_MISSION_COVER_IDS = Object.freeze([
  "grow-16x9", "grow-4x5", "grow-1x1", "explore-16x9", "create-16x9", "community-16x9", "help-4x5",
]);
export const PANSOFIE_ILLUSTRATION_IDS = Object.freeze([
  "ecosystem-tree", "school-learning", "green-hope", "family-team", "project-idea",
]);
export const PANSOFIE_SCENE_IDS = Object.freeze([
  "green-hope-lab", "urban-farm-system", "family-team-missions", "impact-index",
  "collaboration-map", "school-life-learning", "organization-network",
  "knowledge-journal", "contact-growth",
]);

export const YOUNG_ILLUSTRATION_IDS = Object.freeze([
  "ecosystem-tree", "intergenerational-help", "urban-garden", "resource-kit", "seedling",
]);


export function assetPath(_namespace, family, id, extension = "svg") {
  return `/assets/current/${family}/${id}.${extension}`;
}

function assertId(list, id, label) {
  if (!list.includes(id)) throw new Error(`Unknown ${label}: ${id}`);
}

const adultPhotos = Object.freeze({
  "hero-community-left-safe-16x9": CURRENT_MEDIA.home,
  "hero-community-left-safe-4x3": CURRENT_MEDIA.home,
  "hero-community-left-safe-4x5": CURRENT_MEDIA.home,
  "curiosity-nature-16x9": CURRENT_MEDIA.nature,
  "growing-together-16x9": CURRENT_MEDIA.community,
  "prague-nature-16x9": CURRENT_MEDIA.prague,
  "community-city-16x9": CURRENT_MEDIA.home,
});
const youngPhotos = Object.freeze({
  "hero-rooftop-left-safe-16x9": CURRENT_MEDIA.creative,
  "hero-rooftop-left-safe-4x3": CURRENT_MEDIA.creative,
  "hero-rooftop-left-safe-4x5": CURRENT_MEDIA.creative,
  "community-cutout": CURRENT_MEDIA.community,
  "creative-studio-16x9": CURRENT_MEDIA.creative,
  "creative-studio-4x5": CURRENT_MEDIA.creative,
  "explorers-nature-16x9": CURRENT_MEDIA.nature,
  "explorers-nature-4x5": CURRENT_MEDIA.nature,
});
const goCovers = Object.freeze({
  "grow-16x9": CURRENT_MEDIA.produce,
  "grow-4x5": CURRENT_MEDIA.produce,
  "grow-1x1": CURRENT_MEDIA.produce,
  "explore-16x9": CURRENT_MEDIA.prague,
  "create-16x9": CURRENT_MEDIA.labs,
  "community-16x9": CURRENT_MEDIA.community,
  "help-4x5": CURRENT_MEDIA.partnership,
});
const adultIllustrations = Object.freeze({
  "ecosystem-tree": CURRENT_MEDIA.home,
  "school-learning": CURRENT_MEDIA.school,
  "green-hope": CURRENT_MEDIA.community,
  "family-team": CURRENT_MEDIA.home,
  "project-idea": CURRENT_MEDIA.labs,
});
const adultScenes = Object.freeze({
  "green-hope-lab": CURRENT_MEDIA.nature,
  "urban-farm-system": CURRENT_MEDIA.produce,
  "family-team-missions": CURRENT_MEDIA.home,
  "impact-index": CURRENT_MEDIA.partnership,
  "collaboration-map": CURRENT_MEDIA.prague,
  "school-life-learning": CURRENT_MEDIA.school,
  "organization-network": CURRENT_MEDIA.partnership,
  "knowledge-journal": CURRENT_MEDIA.creative,
  "contact-growth": CURRENT_MEDIA.partnership,
});
const youngIllustrations = Object.freeze({
  "ecosystem-tree": CURRENT_MEDIA.creative,
  "intergenerational-help": CURRENT_MEDIA.partnership,
  "urban-garden": CURRENT_MEDIA.community,
  "resource-kit": CURRENT_MEDIA.labs,
  "seedling": CURRENT_MEDIA.nature,
});

export function pathIcon(id) { assertId(PATH_ASSET_IDS, id, "path asset"); return currentIcon(id); }
export function domainIcon(id) { assertId(DOMAIN_ASSET_IDS, id, "domain asset"); return currentIcon(id); }
export function pansofieIcon(id) { assertId(PANSOFIE_ICON_IDS, id, "PANSOFIE icon"); return currentIcon(id); }
export function youngIcon(id) { assertId(YOUNG_ICON_IDS, id, "Young icon"); return currentIcon(id); }
export function youngDoodle(id) { assertId(YOUNG_DOODLE_IDS, id, "Young doodle"); return currentIcon(id); }
export function goIcon(id) { assertId(GO_ICON_IDS, id, "GO icon"); return currentIcon(id); }
export function goPin(id) { assertId(GO_PIN_IDS, id, "GO pin"); return currentIcon(`pin-${id}`); }
export function goBadge(id) { assertId(GO_BADGE_IDS, id, "GO badge"); return currentIcon(`badge-${id}`); }
export function pansofiePhoto(id) { assertId(PANSOFIE_PHOTO_IDS, id, "PANSOFIE photo"); return adultPhotos[id]; }
export function youngPhoto(id) { assertId(YOUNG_PHOTO_IDS, id, "Young photo"); return youngPhotos[id]; }
export function goMissionCover(id) { assertId(GO_MISSION_COVER_IDS, id, "GO mission cover"); return goCovers[id]; }
export function pansofieIllustration(id) { assertId(PANSOFIE_ILLUSTRATION_IDS, id, "PANSOFIE illustration"); return adultIllustrations[id]; }
export function pansofieScene(id) { assertId(PANSOFIE_SCENE_IDS, id, "PANSOFIE scene"); return adultScenes[id]; }
export function youngIllustration(id) { assertId(YOUNG_ILLUSTRATION_IDS, id, "Young illustration"); return youngIllustrations[id]; }
