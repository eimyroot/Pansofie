import { PUBLIC_SITEMAP_PATHS, SITE_INDEXABLE, siteUrl } from "../domain/site-metadata";

export default function sitemap() {
  if (!SITE_INDEXABLE) return [];
  return PUBLIC_SITEMAP_PATHS.map((path) => ({
    url: siteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/young") || path === "/pansofie-go" ? 0.8 : 0.7,
  }));
}
