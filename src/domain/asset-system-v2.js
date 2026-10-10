export const PUBLIC_V2_ASSET_BASE = "/assets/brand-v2";

export const PUBLIC_V2_PATH_IDS = Object.freeze([
  "body",
  "mind",
  "character",
  "relationships",
  "creativity",
  "prosperity",
  "meaning",
]);

export const PUBLIC_V2_DOMAIN_IDS = Object.freeze([
  "self",
  "body",
  "mind",
  "emotions",
  "relationships",
  "family",
  "society",
  "nature",
  "technology",
  "finance",
  "work",
  "creation",
  "culture",
  "ethics",
  "citizenship",
  "meaning",
]);

export const PUBLIC_V2_UI_ICON_IDS = Object.freeze([
  "menu",
  "close",
  "arrow-right",
  "external-link",
  "account",
  "go",
  "search",
]);

function assertId(ids, id, label) {
  if (!ids.includes(id)) throw new Error("Unknown " + label + ": " + id);
}

export function brandMarkV2() {
  return PUBLIC_V2_ASSET_BASE + "/identity/pansofie-tree-approved.svg";
}

export function pathIconV2(id) {
  assertId(PUBLIC_V2_PATH_IDS, id, "public-v2 path icon");
  return PUBLIC_V2_ASSET_BASE + "/paths/path-" + id + ".svg";
}

export function domainIconV2(id) {
  assertId(PUBLIC_V2_DOMAIN_IDS, id, "public-v2 domain icon");
  return PUBLIC_V2_ASSET_BASE + "/domains/domain-" + id + ".svg";
}

export function uiIconV2(id) {
  assertId(PUBLIC_V2_UI_ICON_IDS, id, "public-v2 UI icon");
  return PUBLIC_V2_ASSET_BASE + "/ui/" + id + ".svg";
}
