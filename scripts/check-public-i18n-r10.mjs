import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const app = read("src/App.jsx");
const nav = read("src/components/pansofie/PublicNav.jsx");
const provider = read("src/lib/LanguageContext.jsx");
const boundary = read("src/components/pansofie/PublicLocaleBoundary.jsx");
const translations = read("src/lib/publicTranslations.js");
const browserSpec = read("tests/e2e/public-i18n-r10.spec.mjs");

for (const marker of [
  "LanguageProvider",
  "PublicLocaleBoundary",
  "authSurface",
  'path="/pansofiego"',
  'path="/soukromi"',
  'path="/bezpecnost"',
  'path="/podminky"',
]) {
  assert.ok(app.includes(marker), `App i18n marker missing: ${marker}`);
}

assert.ok(nav.includes("LanguageToggle"), "Public navigation must expose the language switcher");
assert.ok(provider.includes('pansofie.locale'), "Locale must persist in localStorage");
assert.ok(provider.includes('document.documentElement.lang = locale'), "Locale must update html[lang]");
assert.ok(provider.includes('url.searchParams.set("lang", "en")'), "English locale must be shareable through ?lang=en");
assert.ok(provider.includes('url.searchParams.delete("lang")'), "Canonical Czech URL must remain query-free");
assert.ok(boundary.includes("MutationObserver"), "Public locale boundary must cover dynamic React content");
assert.ok(boundary.includes('attributeFilter: TRANSLATABLE_ATTRIBUTES'), "Accessible labels/placeholders must be translated too");
assert.ok(translations.includes("PUBLIC_ENGLISH_TRANSLATION_COUNT"), "Translation catalog count export missing");

const entryCount = (translations.match(/^\s{2}".*":\s".*",?$/gm) || []).length;
assert.ok(entryCount >= 100, `English catalog unexpectedly small: ${entryCount}`);

for (const marker of [
  "Know yourself.",
  "From a real need to a verified experience.",
  "Not another school app. Three real Experiences that can be documented.",
  "Bring a real problem. Help turn it into a real Experience.",
  "Learning matters more when it connects with real life.",
  "Pansofie needs people who bring something real.",
  "Make decisions in context.",
]) {
  assert.ok(translations.includes(marker), `Required English public marker missing: ${marker}`);
}

for (const route of [
  "/",
  "/jak-funguje",
  "/pansofiego",
  "/pro-koho",
  "/pilot",
  "/partneri",
  "/o-projektu",
  "/zapojit-se",
  "/soukromi",
  "/bezpecnost",
  "/podminky",
  "/login",
  "/register",
]) {
  assert.ok(browserSpec.includes(`"${route}"`), `R10 browser coverage missing route: ${route}`);
}

console.log(`PUBLIC_I18N_R10=PASS translations=${entryCount}`);
