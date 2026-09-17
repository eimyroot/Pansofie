export const ASSET_NAMESPACES = Object.freeze({
  pansofie: "/assets/brand/pansofie",
  young: "/assets/brand/young",
  go: "/assets/brand/go",
  shared: "/assets/brand/shared",
});

export const PATH_ASSET_IDS = Object.freeze([
  "knowledge", "health", "character", "relationships",
  "creativity", "collaboration", "meaning",
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
  "grow-16x9", "explore-16x9", "create-16x9", "community-16x9", "help-4x5",
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


export function assetPath(namespace, family, id, extension = "svg") {
  const base = ASSET_NAMESPACES[namespace];
  if (!base) throw new Error(`Unknown asset namespace: ${namespace}`);
  if (!family || !id) throw new Error("Asset family and id are required");
  return `${base}/${family}/${id}.${extension}`;
}

function assertId(list, id, label) {
  if (!list.includes(id)) throw new Error(`Unknown ${label}: ${id}`);
}

export function pathIcon(id) { assertId(PATH_ASSET_IDS, id, "path asset"); return `${ASSET_NAMESPACES.shared}/paths/path-${id}.svg`; }
export function domainIcon(id) { assertId(DOMAIN_ASSET_IDS, id, "domain asset"); return `${ASSET_NAMESPACES.shared}/domains/domain-${id}.svg`; }
export function pansofieIcon(id) { assertId(PANSOFIE_ICON_IDS, id, "PANSOFIE icon"); return assetPath("pansofie", "icons", id); }
export function youngIcon(id) { assertId(YOUNG_ICON_IDS, id, "Young icon"); return assetPath("young", "icons", id); }
export function youngDoodle(id) { assertId(YOUNG_DOODLE_IDS, id, "Young doodle"); return assetPath("young", "doodles", id); }
export function goIcon(id) { assertId(GO_ICON_IDS, id, "GO icon"); return assetPath("go", "icons", id); }
export function goPin(id) { assertId(GO_PIN_IDS, id, "GO pin"); return `${ASSET_NAMESPACES.go}/map/pin-${id}.svg`; }
export function goBadge(id) { assertId(GO_BADGE_IDS, id, "GO badge"); return `${ASSET_NAMESPACES.go}/badges/badge-${id}.svg`; }
export function pansofiePhoto(id) { assertId(PANSOFIE_PHOTO_IDS, id, "PANSOFIE photo"); return assetPath("pansofie", "photos", id, "webp"); }
export function youngPhoto(id) {
  assertId(YOUNG_PHOTO_IDS, id, "Young photo");
  return assetPath("young", "photos", id, id === "community-cutout" ? "png" : "webp");
}
export function goMissionCover(id) { assertId(GO_MISSION_COVER_IDS, id, "GO mission cover"); return assetPath("go", "mission-covers", id, "webp"); }

export function pansofieIllustration(id) { assertId(PANSOFIE_ILLUSTRATION_IDS, id, "PANSOFIE illustration"); return assetPath("pansofie", "illustrations", id, "webp"); }
export function pansofieScene(id) { assertId(PANSOFIE_SCENE_IDS, id, "PANSOFIE scene"); return assetPath("pansofie", "scenes", id); }
export function youngIllustration(id) { assertId(YOUNG_ILLUSTRATION_IDS, id, "Young illustration"); return assetPath("young", "illustrations", id, "png"); }
