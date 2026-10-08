import fs from "node:fs";
import path from "node:path";
import {
  PUBLIC_V2_DOMAIN_IDS,
  PUBLIC_V2_PATH_IDS,
  PUBLIC_V2_UI_ICON_IDS,
  brandMarkV2,
  domainIconV2,
  pathIconV2,
  uiIconV2,
} from "../src/domain/asset-system-v2.js";
import {
  DOMAIN_SLUGS_V2,
  GREEN_HOPE_SOURCE_RELATION_V2,
  PATH_SLUGS_V2,
  PUBLIC_DOMAINS_V2,
  PUBLIC_METHOD_V2,
  PUBLIC_NAV_V2,
  PUBLIC_PATHS_V2,
} from "../src/domain/pansofie-public-v2.js";

const root = process.cwd();
const fail = (message) => {
  console.error("PANSOFIE_PUBLIC_V2=FAIL: " + message);
  process.exit(1);
};

const requiredFiles = [
  "src/app/pansofie-v2.css",
  "src/domain/asset-system-v2.js",
  "src/domain/pansofie-public-v2.js",
  "src/components/public-v2/PublicShellV2.jsx",
  "src/components/public-v2/PublicHeaderV2.jsx",
  "src/components/public-v2/PublicFooterV2.jsx",
  "src/components/public-v2/EditorialHeroV2.jsx",
  "src/components/public-v2/PathEmblemV2.jsx",
  "src/components/public-v2/DomainIconV2.jsx",
  "src/components/public-v2/MethodSequenceV2.jsx",
  "public/assets/brand-v2/SOURCES.md",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) fail("missing foundation file " + file);
}

if (PUBLIC_PATHS_V2.length !== 7 || PUBLIC_V2_PATH_IDS.length !== 7) fail("seven-path foundation count mismatch");
if (PUBLIC_DOMAINS_V2.length !== 16 || PUBLIC_V2_DOMAIN_IDS.length !== 16) fail("sixteen-domain foundation count mismatch");
if (PUBLIC_METHOD_V2.length !== 6) fail("learning method must have six canonical phases");
if (PUBLIC_V2_UI_ICON_IDS.length < 7) fail("public UI icon foundation incomplete");
if (PUBLIC_NAV_V2.map((item) => item.label).join("|") !== "Objevuj|Projekty|Komunita|Pro koho|Zapoj se") fail("public navigation groups drifted");

const pathSlugs = Object.values(PATH_SLUGS_V2);
const domainSlugs = Object.values(DOMAIN_SLUGS_V2);
if (new Set(pathSlugs).size !== pathSlugs.length) fail("path slugs must be unique");
if (new Set(domainSlugs).size !== domainSlugs.length) fail("domain slugs must be unique");

const meaningDomain = PUBLIC_DOMAINS_V2.find((item) => item.id === "meaning");
if (meaningDomain?.labelCs !== "Smysl života" || meaningDomain?.slug !== "smysl-zivota") fail("meaning domain canonical label/slug drifted");

const relation = GREEN_HOPE_SOURCE_RELATION_V2;
if (relation.mission.id !== "MISSION-GROW-001") fail("Green Hope canonical mission relation missing");
if (relation.project.modelOnly !== true || relation.project.status !== "prototype") fail("Green Hope project truth status weakened");
if (relation.project.locationPolicy !== "coarse_only") fail("Green Hope location policy weakened");
if (relation.project.documentationMode !== "optional") fail("Green Hope documentation mode weakened");

const publicToDisk = (publicPath) => path.join(root, "public", publicPath.replace(/^\/+/, ""));
for (const id of PUBLIC_V2_PATH_IDS) if (!fs.existsSync(publicToDisk(pathIconV2(id)))) fail("missing path SVG " + id);
for (const id of PUBLIC_V2_DOMAIN_IDS) if (!fs.existsSync(publicToDisk(domainIconV2(id)))) fail("missing domain SVG " + id);
for (const id of PUBLIC_V2_UI_ICON_IDS) if (!fs.existsSync(publicToDisk(uiIconV2(id)))) fail("missing UI SVG " + id);
if (!fs.existsSync(publicToDisk(brandMarkV2()))) fail("missing brand mark");

const scanRoots = [
  path.join(root, "src/components/public-v2"),
  path.join(root, "src/domain/asset-system-v2.js"),
  path.join(root, "src/domain/pansofie-public-v2.js"),
];

function collect(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const next = path.join(target, entry.name);
    return entry.isDirectory() ? collect(next) : [next];
  });
}

const forbidden = [
  "/assets/current/",
  "/assets/brand/pansofie/",
  "/art/pansofie-v1/",
  "pansofiePhoto(",
  "pansofieScene(",
  "pansofieIllustration(",
];

for (const target of scanRoots) {
  for (const file of collect(target)) {
    const source = fs.readFileSync(file, "utf8");
    for (const marker of forbidden) {
      if (source.includes(marker)) fail(path.relative(root, file) + " contains forbidden legacy visual reference " + marker);
    }
  }
}

const css = fs.readFileSync(path.join(root, "src/app/pansofie-v2.css"), "utf8");
for (const marker of [
  ".ps2-site",
  "#1B4D3A",
  "#6B8B58",
  "#A7B99A",
  "#D7B899",
  "#FAF7EF",
  "#2F2F2F",
  '"Fraunces"',
  '"Inter"',
  "@media (prefers-reduced-motion: reduce)",
]) {
  if (!css.includes(marker)) fail("V2 CSS contract missing " + marker);
}

const layout = fs.readFileSync(path.join(root, "src/app/layout.jsx"), "utf8");
if (!layout.includes('import "./pansofie-v2.css";')) fail("root layout does not load scoped V2 CSS");

const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
if (pkg.scripts?.["check:public-v2"] !== "node scripts/check-public-v2.mjs") fail("package script check:public-v2 missing");

const homeRoute = fs.readFileSync(path.join(root, "src/app/page.jsx"), "utf8");
if (!homeRoute.includes("HomePageV2")) fail("homepage is not migrated to public-v2");
for (const marker of [
  "components/public/PublicShell",
  "PansofieVisualEngine",
  "PansofieArtPanel",
  "PansofieDocumentary",
  "MOCKUP01_PHOTOS",
]) {
  if (homeRoute.includes(marker)) fail("homepage contains legacy dependency " + marker);
}

const homeComponent = fs.readFileSync(path.join(root, "src/components/public-v2/HomePageV2.jsx"), "utf8");
if ((homeComponent.match(/<h1/g) || []).length !== 1) fail("V2 homepage must contain exactly one H1");
for (const sectionId of [
  'id="objevuj"',
  'id="filozofie"',
  'id="cesty"',
  'id="oblasti"',
  'id="metoda"',
  'id="green-hope"',
  'id="programy"',
  'id="rodina"',
  'id="komunita"',
  'id="dopad"',
  'id="pro-koho"',
  'id="zapoj-se"',
]) {
  if (!homeComponent.includes(sectionId)) fail("V2 homepage missing frozen section " + sectionId);
}
for (const marker of forbidden) {
  if (homeComponent.includes(marker)) fail("V2 homepage contains forbidden legacy visual reference " + marker);
}
if (!css.includes("/* === W2 HOME START === */")) fail("W2 homepage CSS block missing");

console.log("PANSOFIE_PUBLIC_V2=PASS");
