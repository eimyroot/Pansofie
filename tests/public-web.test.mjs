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

test("editorial homepage connects city, generations, circularity and responsible AI without fake claims", () => {
  const home = readFileSync("src/app/page.jsx", "utf8");
  const shell = readFileSync("src/components/public/PublicShell.jsx", "utf8");
  assert.match(home, /Lepší svět/);
  assert.match(home, /Příležitost, ne povinnost/);
  assert.match(home, /OD KOMENSKÉHO K AI/);
  assert.match(home, /AI jako nástroj/);
  assert.match(home, /Mikrogreens a městské pěstování/);
  assert.match(home, /Druhá šance pro materiál/);
  assert.match(home, /Generace si mají co předat/);
  assert.match(shell, /Lidé · vědění · kontext · změna/);
  assert.doesNotMatch(home, /ověřený partner|naměřený dopad|1000\+|40 000\+/i);
});

test("M6.8 carries the mature editorial world across projects, schools, organizations and circularity", () => {
  const files = ["projekty", "pro-skoly", "pro-organizace", "green-hope", "urban-family-farm", "digitalni-kompost", "sit", "instituce"];
  for (const file of files) {
    const source = readFileSync(`src/app/${file}/page.jsx`, "utf8");
    assert.match(source, /EditorialFeatureBand|editorialFeature=/, `${file} should include the editorial feature layer`);
  }
  assert.match(readFileSync("src/app/urban-family-farm/page.jsx", "utf8"), /MIKROGREENS/);
  assert.match(readFileSync("src/app/digitalni-kompost/page.jsx", "utf8"), /MATERIÁLY V OBĚHU/);
  assert.match(readFileSync("src/app/sit/page.jsx", "utf8"), /KOMUNITA, NE FEED/);
  assert.match(readFileSync("src/app/pro-skoly/page.jsx", "utf8"), /AI pomáhá zkoumat a tvořit/);
  assert.doesNotMatch(readFileSync("src/app/instituce/page.jsx", "utf8"), /[0-9]+\s*(kg|t|CO2|CO₂)|[0-9]+%.*ESG/i);
});


test("M6.9 completes the adult editorial system across orientation and trust pages", () => {
  const files = ["o-nas", "vize", "jak-to-funguje", "pro-koho", "knihovna", "impact", "kontakt"];
  for (const file of files) {
    const source = readFileSync(`src/app/${file}/page.jsx`, "utf8");
    assert.match(source, /EditorialFeatureBand|editorialFeature=/, `${file} should include the editorial feature layer`);
  }

  const how = readFileSync("src/app/jak-to-funguje/page.jsx", "utf8");
  assert.match(how, /Pansofie Young je samostatná zkušenost/i);
  assert.match(how, /PansofieGO je aplikace pro celý ekosystém/i);
  assert.doesNotMatch(how, /Young\s*[=/·-]+\s*GO/i);

  const impact = readFileSync("src/app/impact/page.jsx", "utf8");
  assert.match(impact, /DŮKAZ PŘED PŘÍBĚHEM/);
  assert.match(impact, /Bez podkladů nevzniká automatické číslo/i);
  assert.doesNotMatch(impact, /1000\+|ověřený dopad|garantovaný dopad/i);

  const library = readFileSync("src/app/knihovna/page.jsx", "utf8");
  assert.match(library, /Dokud konkrétní materiál není publikovaný a ověřený/i);

  const contact = readFileSync("src/app/kontakt/page.jsx", "utf8");
  assert.match(contact, /lokálním prototypem/i);
  assert.doesNotMatch(contact, /ověřený partner|garantovaná spolupráce/i);
});

test("M6.10 turns the canonical 16 areas and 7 paths into the same adult editorial system", () => {
  const domains = readFileSync("src/app/16-oblasti/page.jsx", "utf8");
  const paths = readFileSync("src/app/7-cest/page.jsx", "utf8");

  assert.match(domains, /EditorialFeatureBand/);
  assert.match(domains, /MAPA SOUVISLOSTÍ/);
  assert.match(domains, /DOMAIN_DETAILS\.map/);
  assert.match(domains, /LEARNING_DOMAINS\[index\]\.id/);

  assert.match(paths, /EditorialFeatureBand/);
  assert.match(paths, /RŮST BEZ ŽEBŘÍČKU/);
  assert.match(paths, /PATHS\.map/);
  assert.match(paths, /DEVELOPMENT_PATHS\[index\]\.id/);
  assert.match(paths, /nemají pořadí, vítěze ani ideální profil/i);

  assert.doesNotMatch(`${domains}\n${paths}`, /1000\+|ověřený dopad|garantovaný dopad|osobnostní skóre/i);
});
test("M6.11 completes the people, knowledge and place editorial layer", () => {
  const files = ["family-team", "osobni-rust", "mapa", "blog"];
  for (const file of files) {
    const source = readFileSync(`src/app/${file}/page.jsx`, "utf8");
    assert.match(source, /EditorialFeatureBand|editorialFeature=/, `${file} should include the editorial feature layer`);
  }

  const family = readFileSync("src/app/family-team/page.jsx", "utf8");
  assert.match(family, /RODINA JAKO PRVNÍ TÝM/);
  assert.match(family, /každý člen zůstává samostatnou identitou/i);
  assert.doesNotMatch(family, /sdílený rodinný účet|společné heslo/i);

  const growth = readFileSync("src/app/osobni-rust/page.jsx", "utf8");
  assert.match(growth, /ZNALOST MEZI GENERACEMI/);
  assert.match(growth, /Nejde o veřejný katalog mentorů ani tržiště protislužeb/i);
  assert.doesNotMatch(growth, /navigator\.geolocation|MENTORS|nearby/i);

  const map = readFileSync("src/app/mapa/page.jsx", "utf8");
  assert.match(map, /MÍSTO, NE POLOHA ČLOVĚKA/);
  assert.match(map, /Žádné veřejné sledování lidí, dětí ani jejich živého pohybu/i);
  assert.match(map, /DEMO data/);

  const blog = readFileSync("src/app/blog/page.jsx", "utf8");
  assert.match(blog, /OBSAH S PAMĚTÍ A ZDROJEM/);
  assert.match(blog, /Dokud materiál není skutečně publikovaný/i);
  assert.doesNotMatch(blog, /publishedAt|authorId|viewsCount/);
});

test("M6.12 builds a clear public bridge from Pansofie into GO without merging GO with Young", () => {
  const go = readFileSync("src/app/pansofie-go/page.jsx", "utf8");
  const home = readFileSync("src/app/page.jsx", "utf8");
  const how = readFileSync("src/app/jak-to-funguje/page.jsx", "utf8");

  assert.match(go, /EditorialFeatureBand/);
  assert.match(go, /APLIKACE PRO CELÝ EKOSYSTÉM/);
  assert.match(go, /GO není Young/i);
  assert.match(go, /PansofieGO je společná aplikace pro celý ekosystém Pansofie/i);
  for (const step of ["Poznání", "Zkušenost", "Mise \/ projekt", "Portfolio \/ dovednost", "Skutečný dopad"]) {
    assert.match(go, new RegExp(step));
  }
  for (const context of ["Jednotlivec", "Rodina", "Škola", "Komunita a organizace"]) {
    assert.match(go, new RegExp(context));
  }
  assert.match(go, /Young a GO proto nejsou dvě jména pro totéž/i);
  assert.doesNotMatch(go, /Young\s*[=/·-]+\s*GO|GO\s*[=/·-]+\s*Young/i);
  assert.doesNotMatch(go, /veřejný žebříček|XP.*hodnotu člověka.*je/i);

  assert.match(home, /Jak se z poznání stává akce v PansofieGO/);
  assert.match(home, /Aplikace pro celý ekosystém Pansofie/);
  assert.match(how, /Když chce člověk pokračovat do praxe, přichází PansofieGO/);
  assert.match(how, /href="\/pansofie-go"/);
});


test("M6.13 closes MAIN public navigation, accessibility semantics and crawler boundaries", () => {
  const shell = readFileSync("src/components/public/PublicShell.jsx", "utf8");
  const story = readFileSync("src/components/public/ProgramStoryPage.jsx", "utf8");
  const projects = readFileSync("src/app/projekty/page.jsx", "utf8");
  const go = readFileSync("src/app/pansofie-go/page.jsx", "utf8");
  const robots = readFileSync("src/app/robots.js", "utf8");

  for (const group of ["Poznat Pansofii", "Praxe a projekty", "Lidé a organizace", "Důvěra a informace"]) {
    assert.match(shell, new RegExp(group));
  }
  for (const href of ["/green-hope", "/urban-family-farm", "/family-team", "/digitalni-kompost", "/mapa-kolobehu", "/instituce", "/osobni-rust", "/kontakt"]) {
    assert.match(shell, new RegExp(`\\["${href.replaceAll("/", "\\/")}"`));
  }
  assert.match(shell, /aria-current=\{current === href \? "page" : undefined\}/);
  assert.match(shell, /aria-label="Mapa veřejné Pansofie"/);
  assert.match(story, /current=\{current \|\| active\}/);

  assert.match(readFileSync("src/app/green-hope/page.jsx", "utf8"), /active="\/projekty" current="\/green-hope"/);
  assert.match(readFileSync("src/app/urban-family-farm/page.jsx", "utf8"), /active="\/projekty" current="\/urban-family-farm"/);
  assert.match(readFileSync("src/app/family-team/page.jsx", "utf8"), /active="\/projekty" current="\/family-team"/);
  assert.match(readFileSync("src/app/pro-skoly/page.jsx", "utf8"), /active="\/pro-skoly" current="\/pro-skoly"/);
  assert.match(go, /<PublicShell active="\/pansofie-go">/);

  assert.match(projects, /"Komunitní zahrada": "\/mise\/rostlina"/);
  assert.doesNotMatch(projects, /"Komunitní zahrada": "\/go\//);
  for (const privateRoot of ['"/app"', '"/go"', '"/auth/"', '"/login"', '"/onboarding"']) {
    assert.match(robots, new RegExp(privateRoot.replaceAll("/", "\\/")));
  }
});


test("M6.14 makes public navigation task-oriented and separates GO as a geolocation game", () => {
  const shell = readFileSync("src/components/public/PublicShell.jsx", "utf8");
  const css = readFileSync("src/app/public-pansofie.css", "utf8");
  const navModel = shell.slice(shell.indexOf("const PUBLIC_NAV_GROUPS"), shell.indexOf("const FOOTER_GROUPS"));

  for (const label of ["Domů", "Objevuj", "Projekty", "Komunita", "Zapoj se"]) assert.match(navModel, new RegExp(label));
  assert.doesNotMatch(navModel, /pansofie-go|young/i);
  assert.match(shell, /pw-go-launch/);
  assert.match(shell, /Geolokační hra/);
  assert.match(shell, /pw-menu__group-title/);
  assert.match(css, /\.pw-nav-group:focus-within \.pw-nav-panel/);
  assert.match(css, /max-height: calc\(100vh - 88px\)/);
});

test("M6.15 gives each public navigation group a real landing page and stable active context", () => {
  const shell = readFileSync("src/components/public/PublicShell.jsx", "utf8");
  const navModel = shell.slice(shell.indexOf("const PUBLIC_NAV_GROUPS"), shell.indexOf("const FOOTER_GROUPS"));

  for (const [label, href] of [["Objevuj", "/jak-to-funguje"], ["Projekty", "/projekty"], ["Komunita", "/sit"], ["Zapoj se", "/pro-koho"]]) {
    assert.match(navModel, new RegExp(`label: "${label}", href: "${href.replaceAll("/", "\\/")}"`));
  }
  assert.match(navModel, /label: "Zapoj se"[^\n]*match: \["\/pro-koho", "\/pro-skoly", "\/pro-organizace", "\/kontakt"\]/);
  assert.doesNotMatch(navModel, /label: "Komunita"[^\n]*\/pro-koho/);

  for (const route of ["jak-to-funguje", "o-nas", "vize", "knihovna", "blog", "digitalni-kompost", "mapa-kolobehu", "mapa", "sit", "instituce", "osobni-rust", "pro-koho", "pro-organizace", "kontakt"]) {
    const source = readFileSync(`src/app/${route}/page.jsx`, "utf8");
    assert.match(source, new RegExp(`<PublicShell active="\\/${route}"`), `${route} should expose its public navigation context`);
  }
});

test("M6.16 presents Pansofie GO primarily as a location-based game without public people tracking", () => {
  const go = readFileSync("src/app/pansofie-go/page.jsx", "utf8");
  assert.match(go, /GEOLOKAČNÍ HRA/);
  assert.match(go, /Město je herní mapa/);
  assert.match(go, /Mapa.*checkpointy.*mise.*projekty/is);
  assert.match(go, /href="\/go\/mapa"/);
  assert.match(go, /Poloha se používá jen po aktivním spuštění uživatelem/i);
  assert.match(go, /nemá ukazovat přesnou polohu dítěte ani živý pohyb lidí/i);
});
