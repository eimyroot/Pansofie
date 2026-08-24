import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    console.error(`FOOTER_MANIFEST_R24=FAIL ${message}`);
    process.exit(1);
  }
};

const footer = read("src/components/pansofie/PublicFooter.jsx");
const nav = read("src/components/pansofie/PublicNav.jsx");
const app = read("src/App.jsx");
const css = read("src/header-manifest-r17.css");

for (const marker of [
  'data-footer-release="r24"',
  "pansofie-footer-manifest",
  "Všem",
  "Všemu",
  "Všestranně",
  "For all",
  "For the whole",
  "In every way",
  "Veřejný dětský login ani registrace zatím nejsou otevřené.",
  "Public child login and registration are not open yet.",
  "Technická připravenost, ověření v praxi, skutečné výsledky a dlouhodobý dopad jsou v Pansofii oddělené vrstvy.",
]) {
  assert(footer.includes(marker), `missing footer marker: ${marker}`);
}

for (const route of [
  "/pro-koho/skoly",
  "/pro-koho/firmy",
  "/materialovy-most",
  "/pilot",
  "/partneri",
  "/bezpecnost",
  "/zapojit-se",
  "/soukromi",
  "/podminky",
  "/login",
]) {
  assert(footer.includes(route), `footer missing canonical route: ${route}`);
  assert(app.includes(`path=\"${route}\"`) || app.includes(`to=\"${route}\"`) || route === "/login", `canonical route not represented in App: ${route}`);
}

for (const forbidden of [
  "/pro-skoly",
  "/pro-firmy",
  "/young?",
  "/kodex",
  "next/link",
  "'use client'",
  "Všechna data jsou uložena eticky a bez sledovacích algoritmů.",
  "text-6xl",
  "text-7xl",
]) {
  assert(!footer.includes(forbidden), `forbidden/dead footer marker: ${forbidden}`);
}

assert(!nav.includes("pansofie-header-manifest"), "manifesto must not remain in the header");
assert(css.includes(".pansofie-public-header") && css.includes("height: 74px"), "compact public header geometry missing");
assert(css.includes(".pansofie-footer-manifest"), "footer manifesto CSS missing");
assert(footer.includes('bg-[#0b1016]'), "dark full-width footer surface missing");
assert(footer.includes("useLanguage"), "footer must preserve public CZ/EN boundary");

console.log("FOOTER_MANIFEST_R24=PASS");
