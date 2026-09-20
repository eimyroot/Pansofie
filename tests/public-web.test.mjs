import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { DOMAIN_DETAILS, LEARNING_METHOD, PATHS } from "../src/domain/pansofie-content.js";

test("M6 promotes the public homepage and key discovery routes to App Router", () => {
  for (const file of [
    "src/app/page.jsx",
    "src/app/16-oblasti/page.jsx",
    "src/app/7-cest/page.jsx",
    "src/app/projekty/page.jsx",
    "src/app/jak-to-funguje/page.jsx",
    "src/app/green-hope/page.jsx",
    "src/app/urban-family-farm/page.jsx",
    "src/app/family-team/page.jsx",
    "src/app/impact/page.jsx",
    "src/app/o-nas/page.jsx",
    "src/app/pro-skoly/page.jsx",
    "src/app/pro-koho/page.jsx",
    "src/app/knihovna/page.jsx",
    "src/app/vize/page.jsx",
    "src/app/osobni-rust/page.jsx",
    "src/app/digitalni-kompost/page.jsx",
    "src/app/mapa-kolobehu/page.jsx",
    "src/app/instituce/page.jsx",
    "src/app/pansofie-go/page.jsx",
    "src/app/mise/[id]/page.jsx",
    "src/app/young/page.jsx",
    "src/app/young/objevuj/page.jsx",
    "src/app/young/mise/page.jsx",
    "src/app/young/projekty/page.jsx",
    "src/app/young/komunita/page.jsx",
    "src/app/young/jak-to-funguje/page.jsx",
    "src/app/soukromi/page.jsx",
    "src/app/podminky/page.jsx",
    "src/app/cookies/page.jsx",
    "src/app/pravidla-komunity/page.jsx",
    "src/app/pristupnost/page.jsx",
    "src/app/bezpecnost/page.jsx",
    "src/app/profil/page.jsx",
    "src/app/kdo-jsem/page.jsx",
    "src/app/sit/page.jsx",
    "src/app/mapa/page.jsx",
    "src/app/pro-organizace/page.jsx",
    "src/app/blog/page.jsx",
    "src/app/kontakt/page.jsx",
  ]) assert.equal(existsSync(file), true, `${file} must exist`);
  assert.equal(existsSync("src/app/[...legacy]/page.jsx"), true);
  assert.equal(existsSync("src/app/[[...legacy]]/page.jsx"), false);
});

test("new public shell uses Next navigation rather than the legacy React Router", () => {
  const shell = readFileSync("src/components/public/PublicShell.jsx", "utf8");
  assert.match(shell, /from "next\/link"/);
  assert.doesNotMatch(shell, /react-router-dom|BrowserRouter/);
  assert.match(shell, /Pansofie Young/);
  assert.match(shell, /Pansofie GO/);
});
test("public homepage renders canonical 16 areas, seven paths and six-phase method", () => {
  assert.equal(DOMAIN_DETAILS.length, 16);
  assert.equal(PATHS.length, 7);
  assert.deepEqual(LEARNING_METHOD, ["Poznej", "Hraj", "Udělej", "Vytvoř", "Sdílej", "Reflektuj"]);
  const home = readFileSync("src/app/page.jsx", "utf8");
  assert.match(home, /PUBLIC_DOMAINS\.map/);
  assert.match(home, /PUBLIC_PATHS\.map/);
  assert.match(home, /LEARNING_METHOD\.map/);
});

test("public homepage uses the adult Pansofie asset namespace and avoids fake scale metrics", () => {
  const home = readFileSync("src/app/page.jsx", "utf8");
  assert.match(home, /hero-community-left-safe-16x9/);
  assert.doesNotMatch(home, /1000\+|tisíc projektů|žebříčk/i);
  assert.match(home, /Modelový projekt/);
});

test("M6 public styling preserves accessibility and responsive fallbacks", () => {
  const css = readFileSync("src/app/public-pansofie.css", "utf8");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /body:has\(\.pw-site\)/);
  assert.match(css, /\.pw-page-hero \{[^}]*min-width:\s*0/s);
  assert.match(css, /\.pw-page-hero__media \{[^}]*max-width:\s*100%/s);
});

test("public program pages keep R8 voluntary participation language", () => {
  const how = readFileSync("src/app/jak-to-funguje/page.jsx", "utf8");
  const green = readFileSync("src/app/green-hope/page.jsx", "utf8");
  assert.match(how, /nevytváří povinnost/i);
  assert.match(how, /bez povinnosti všechno dokumentovat/i);
  assert.match(green, /důkaz nebo reflexe nejsou povinnou vstupenkou/i);
});

test("public impact page avoids aggregate person scoring and fake results", () => {
  const impact = readFileSync("src/app/impact/page.jsx", "utf8");
  assert.match(impact, /Dopad není jedno číslo/);
  assert.match(impact, /nevyrábí veřejnou reputaci ani celkové skóre osobnosti/i);
  assert.doesNotMatch(impact, /284|12 450|1000\+|žebříčk/i);
});

test("new adult pages use the shared Pansofie shell rather than Young or GO shells", () => {
  for (const file of ["green-hope", "urban-family-farm", "family-team", "impact", "o-nas", "pro-skoly"]) {
    const source = readFileSync(`src/app/${file}/page.jsx`, "utf8");
    assert.match(source, /PublicShell|ProgramStoryPage/);
    assert.doesNotMatch(source, /YoungWorkspace|GoWorkspace/);
  }
});

test("M6.3 map and network pages keep demo locations and child privacy explicit", () => {
  const map = readFileSync("src/app/mapa/page.jsx", "utf8");
  const network = readFileSync("src/app/sit/page.jsx", "utf8");
  assert.match(map, /Přesná poloha dítěte ne/);
  assert.match(map, /DEMO data/);
  assert.match(network, /nejsou seznamem potvrzených partnerů/i);
  assert.match(map, /živý pohyb dítěte na veřejnou vrstvu nepatří/i);
});

test("M6.3 contact page does not pretend to send messages", () => {
  const page = readFileSync("src/app/kontakt/page.jsx", "utf8");
  const form = readFileSync("src/components/public/ContactForm.jsx", "utf8");
  assert.match(page, /lokální prototyp/i);
  assert.match(form, /nebyla odeslána/i);
  assert.doesNotMatch(form, /fetch\(|supabase|sendEmail|mailto:/i);
});

test("M6.3 blog treats unpublished material as themes rather than fake articles", () => {
  const blog = readFileSync("src/app/blog/page.jsx", "utf8");
  assert.match(blog, /nevydáváme tematický návrh za hotový článek/i);
  assert.match(blog, /TOPICS\.map/);
  assert.doesNotMatch(blog, /publishedAt|authorId|viewsCount/);
});
test("M6.4 legacy public concepts no longer expose live people or geolocation prototypes", () => {
  const growth = readFileSync("src/app/osobni-rust/page.jsx", "utf8");
  const compost = readFileSync("src/app/digitalni-kompost/page.jsx", "utf8");
  const cycle = readFileSync("src/app/mapa-kolobehu/page.jsx", "utf8");
  assert.match(growth, /neukazuje seznam jednotlivých mentorů ani jejich přesnou polohu/i);
  assert.doesNotMatch(growth, /MENTORS|usePansofie|navigator\.geolocation/i);
  assert.match(compost, /není živá materiálová banka/i);
  assert.doesNotMatch(compost, /usePansofie|navigator\.geolocation|reserveMaterial|addMaterial/i);
  assert.match(cycle, /Veřejný web ukazuje princip/i);
  assert.doesNotMatch(cycle, /react-leaflet|MapContainer|navigator\.geolocation/i);
});

test("M6.4 vision preserves the three source pillars", () => {
  const vision = readFileSync("src/app/vize/page.jsx", "utf8");
  for (const pillar of ["Pansofia", "Pampaedia", "Panorthosia"]) assert.match(vision, new RegExp(pillar));
  assert.match(vision, /Poznávat v souvislostech|Poznávat svět v souvislostech/);
  assert.match(vision, /Růst a učit se celý život/);
  assert.match(vision, /Zlepšovat svět kolem sebe/);
});
test("M6.4 public role, library and institution pages remain browse-first", () => {
  const roles = readFileSync("src/app/pro-koho/page.jsx", "utf8");
  const library = readFileSync("src/app/knihovna/page.jsx", "utf8");
  const institutions = readFileSync("src/app/instituce/page.jsx", "utf8");
  assert.match(roles, /Je v pořádku jen se dívat/i);
  assert.doesNotMatch(roles, /updateProfile|usePansofie/i);
  assert.match(library, /Neoznačuje je za publikované články nebo ověřené externí zdroje/i);
  assert.match(institutions, /nepředstírá živou materiálovou banku ani ověřené partnery/i);
  assert.doesNotMatch(institutions, /usePansofie|addMaterial|reserveMaterial|addSchoolProject/i);
});

test("M6.5 legal routes are explicit working candidates rather than launch-ready claims", () => {
  const legal = readFileSync("src/components/public/LegalWorkingPage.jsx", "utf8");
  assert.match(legal, /PRACOVNÍ PRÁVNÍ TEXT/);
  assert.match(legal, /Není právní radou ani hotovou provozní dokumentací/);
  assert.match(legal, /Před veřejným provozem/);
});

test("M6.5 public Young uses Next navigation and keeps child safety explicit", () => {
  const young = readFileSync("src/components/public/YoungPublicExperience.jsx", "utf8");
  assert.match(young, /from "next\/link"/);
  assert.doesNotMatch(young, /react-router-dom|usePansofie|navigator\.geolocation/i);
  assert.match(young, /není veřejný katalog lidí/i);
  assert.match(young, /neznámými dospělými/i);
});

test("M6.5 public GO and mission detail preserve gentle participation semantics", () => {
  const go = readFileSync("src/app/pansofie-go/page.jsx", "utf8");
  const mission = readFileSync("src/app/mise/[id]/page.jsx", "utf8");
  assert.match(go, /XP ukazuje herní postup, ne hodnotu člověka/i);
  assert.match(go, /Doložená dovednost potřebuje důkaz/i);
  assert.match(mission, /Evidence ani reflexe nejsou povinnou vstupenkou/i);
  assert.doesNotMatch(mission, /usePansofie|acceptMission|completeMission|localStorage/i);
});

test("M6.6 retires the legacy public runtime fallback", () => {
  const fallback = readFileSync("src/app/[...legacy]/page.jsx", "utf8");
  const segmentNotFound = readFileSync("src/app/[...legacy]/not-found.jsx", "utf8");
  assert.match(fallback, /notFound/);
  assert.doesNotMatch(fallback, /LegacyAppLoader|BrowserRouter|react-router-dom/);
  assert.equal(existsSync("src/app/not-found.jsx"), true);
  assert.match(segmentNotFound, /not-found/);
});

test("M6.6 adds explicit site metadata, robots and sitemap controls", () => {
  const site = readFileSync("src/domain/site-metadata.js", "utf8");
  const layout = readFileSync("src/app/layout.jsx", "utf8");
  const robots = readFileSync("src/app/robots.js", "utf8");
  const sitemap = readFileSync("src/app/sitemap.js", "utf8");
  assert.match(site, /NEXT_PUBLIC_SITE_INDEXABLE/);
  assert.match(layout, /metadataBase/);
  assert.match(layout, /summary_large_image/);
  assert.match(robots, /disallow: "\/"/);
  assert.match(robots, /"\/app\/"/);
  assert.match(sitemap, /PUBLIC_SITEMAP_PATHS/);
  assert.doesNotMatch(site, /"\/app|"\/go|"\/login|"\/onboarding/);
});
test("M6.6 keeps working legal candidates and account surfaces out of indexing", () => {
  for (const file of ["soukromi", "podminky", "cookies", "pravidla-komunity", "pristupnost", "bezpecnost"]) {
    const source = readFileSync(`src/app/${file}/page.jsx`, "utf8");
    assert.match(source, /index: false/);
  }
  for (const file of ["src/app/app/layout.jsx", "src/app/go/layout.jsx", "src/app/login/page.jsx", "src/app/onboarding/page.jsx", "src/app/young/kids/layout.jsx", "src/app/young/teens/layout.jsx"]) {
    assert.match(readFileSync(file, "utf8"), /index: false/);
  }
});

test("M6.6 normalizes public title templates without duplicated brand suffixes", () => {
  const files = ["blog", "kontakt", "mapa", "pro-organizace", "sit", "pansofie-go"];
  for (const file of files) {
    const source = readFileSync(`src/app/${file}/page.jsx`, "utf8");
    assert.doesNotMatch(source, /title:\s*["'`][^"'`]*\| Pansofie["'`]/);
  }
  const youngLayout = readFileSync("src/app/young/layout.jsx", "utf8");
  assert.match(youngLayout, /template: "%s \| Pansofie Young"/);
});
