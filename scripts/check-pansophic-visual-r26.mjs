import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const must = (condition, message) => {
  if (!condition) {
    console.error(`PANSOPHIC_VISUAL_R26=FAIL: ${message}`);
    process.exit(1);
  }
};

const main = read("src/main.jsx");
const material = read("src/pansophic-visual-system-r26.css");
const type = read("src/pansophic-typography-r26.css");
const closure = read("src/pansophic-closure-r26.css");
const html = read("index.html");

must(main.includes('import "@/pansophic-visual-system-r26.css";'), "R26 material layer must be imported");
must(main.includes('import "@/pansophic-typography-r26.css";'), "R26 typography layer must be imported");
must(main.includes('import "@/pansophic-closure-r26.css";'), "R26 legacy-specificity closure must be imported");
must(main.indexOf("pansophic-typography-r26.css") > main.indexOf("pansophic-visual-system-r26.css"), "typography/contrast must load after material layer");
must(main.indexOf("pansophic-closure-r26.css") > main.indexOf("pansophic-typography-r26.css"), "specificity closure must load last");

must(html.includes("Cormorant+Garamond"), "Cormorant Garamond must be loaded for the Pansofie display voice");
must(html.includes("Plus+Jakarta+Sans"), "Plus Jakarta Sans must remain the UI/body family");
must(html.includes('name="theme-color" content="#0b0f19"'), "browser theme color must match the midnight canvas");

must(material.includes("overflow-x: clip"), "full-site visual layer must contain decorative horizontal overflow");
must(material.includes("linear-gradient(180deg, #0b0f19"), "midnight canvas must be explicit");
must(material.includes(".product-shell"), "authenticated product surfaces must be part of the R26 layer");
must(material.includes("input, textarea, select"), "auth/forms must be part of the R26 layer");
must(material.includes(".route-network-ribbon"), "public network chrome must be part of the R26 layer");

must(type.includes('--font-display: "Cormorant Garamond"'), "Cormorant Garamond must be the first display family");
must(type.includes("-webkit-text-stroke"), "light text edge must be present on dark-field headings");
must(type.includes("text-shadow"), "dark-field heading glow must be present");
must(type.includes("#58e18c"), "emerald pansophic accent must be explicitly legible");
must(type.includes("Plus Jakarta Sans"), "UI controls must keep the sans-serif family");

must(closure.includes('font-family: "Cormorant Garamond"'), "closure must defeat legacy Syne specificity");
must(closure.includes("body .public-network-content .surface-raised"), "closure must supersede legacy white public cards");
must(closure.includes("body .public-network-content .action-primary"), "closure must supersede legacy cobalt CTAs");
must(closure.includes("#58e18c"), "closure must keep the emerald hero accent visible");

for (const [name, css] of [["material", material], ["typography", type], ["closure", closure]]) {
  must(!css.includes("@keyframes"), `R26 ${name} layer must not replace canonical motion keyframes`);
}

console.log("PANSOPHIC_VISUAL_R26=PASS");
