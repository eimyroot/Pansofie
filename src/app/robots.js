import { SITE_INDEXABLE, siteUrl } from "../domain/site-metadata";

export default function robots() {
  if (!SITE_INDEXABLE) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      disallow: ["/app/", "/go/", "/login", "/onboarding", "/young/kids", "/young/teens", "/profil"],
    }],
    sitemap: siteUrl("/sitemap.xml"),
    host: siteUrl("/").replace(/\/$/, ""),
  };
}
