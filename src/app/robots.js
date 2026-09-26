import { SITE_INDEXABLE, siteUrl } from "../domain/site-metadata";

export default function robots() {
  if (!SITE_INDEXABLE) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      disallow: ["/app", "/app/", "/go", "/go/", "/auth/", "/login", "/onboarding", "/young/kids", "/young/teens", "/profil"],
    }],
    sitemap: siteUrl("/sitemap.xml"),
    host: siteUrl("/").replace(/\/$/, ""),
  };
}
