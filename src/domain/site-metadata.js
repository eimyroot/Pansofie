export const SITE_NAME = "Pansofie";
export const SITE_DESCRIPTION = "Pansofie propojuje poznání, zkušenost a konkrétní činy v jednom vzdělávacím ekosystému.";
export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://pansofie-staging.vercel.app").replace(/\/$/, "");
export const SITE_INDEXABLE = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
export const DEFAULT_SOCIAL_IMAGE = "/assets/brand/pansofie/photos/hero-community-left-safe-16x9.webp";

export const PUBLIC_SITEMAP_PATHS = Object.freeze([
  "/", "/16-oblasti", "/7-cest", "/projekty", "/jak-to-funguje",
  "/green-hope", "/urban-family-farm", "/family-team", "/impact", "/o-nas",
  "/pro-skoly", "/pro-organizace", "/pro-koho", "/knihovna", "/vize",
  "/osobni-rust", "/digitalni-kompost", "/mapa-kolobehu", "/instituce",
  "/sit", "/komunita", "/partneri", "/dobrovolnictvi", "/partnerstvi", "/labs",
  "/mapa", "/blog", "/kontakt", "/pansofie-go", "/mise/rostlina",
  "/young", "/young/objevuj", "/young/mise", "/young/projekty",
  "/young/komunita", "/young/jak-to-funguje",
]);

export function siteUrl(path = "/") {
  return new URL(path, `${SITE_ORIGIN}/`).toString();
}
