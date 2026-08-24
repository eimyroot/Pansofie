import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    console.error(`R17 FAIL: ${message}`);
    process.exit(1);
  }
};

const nav = read("src/components/pansofie/PublicNav.jsx");
const css = read("src/header-manifest-r17.css");

for (const text of [
  "Internet a vzdělání musí být zdarma, bez bariér a dostupné i v nejchudších koutech světa.",
  "Technologie nesmí sloužit jen byznysu, ale musí pomáhat léčit nemoci, chránit přírodu a rozvíjet kulturu.",
  "Digitální gramotnost bez morální gramotnosti je nebezpečná zbraň. Učit se musíme rozumu, jazyku i srdci zároveň.",
]) {
  assert(nav.includes(text), `missing exact manifesto sentence: ${text}`);
}

for (const marker of ["Všem", "Všemu", "Všestranně", "For all", "For the whole", "In every way"]) {
  assert(nav.includes(marker), `missing bilingual manifesto label: ${marker}`);
}

assert(nav.includes('data-principle={item.key}'), "semantic manifesto principle marker missing");
assert(nav.includes('role="region"'), "manifesto must expose an accessible region");
assert(nav.includes('import "@/header-manifest-r17.css"'), "R17 stylesheet import missing");
assert(css.includes("body.pansofie-network-live .route-network-ribbon"), "route ribbon offset override missing");
assert(css.includes(".pansofie-public-header + main"), "public content offset missing");
assert(!nav.includes("Komenský by") && !nav.includes("Comenius would"), "manifesto must not be presented as a speculative Comenius quote");

console.log("HEADER_MANIFEST_R17=PASS");
