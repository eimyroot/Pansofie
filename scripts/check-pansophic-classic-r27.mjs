import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const main = read("src/main.jsx");
const html = read("index.html");
const nav = read("src/components/pansofie/PublicNav.jsx");
const css = read("src/pansophic-classic-r27.css");

const must = (condition, message) => {
  if (!condition) {
    console.error(`PANSOPHIC_CLASSIC_R27=FAIL: ${message}`);
    process.exit(1);
  }
};

must(main.includes('import "@/pansophic-classic-r27.css";'), "R27 successor stylesheet must be imported");
must(main.indexOf("pansophic-classic-r27.css") > main.indexOf("pansophic-closure-r26.css"), "R27 must load after the R26 specificity closure");
must(html.includes("EB+Garamond"), "EB Garamond must be loaded");
must(html.includes("Source+Sans+3"), "Source Sans 3 must be loaded");
must(nav.includes('data-nav-release="r27"'), "public nav must expose the R27 contrast scope");
must(css.includes('--font-display: "EB Garamond"'), "EB Garamond must be the canonical R27 display face");
must(css.includes('--font-body: "Source Sans 3"'), "Source Sans 3 must be the canonical R27 body face");
must(css.includes("body #root :is(h1, h2, h3, h4, h5, h6)"), "R27 must defeat legacy heading specificity globally");
must(css.includes('.pansofie-public-header[data-nav-release="r27"]'), "R27 must contain an explicit public-nav contrast contract");
must(css.includes("color: #e6eef9 !important;"), "desktop nav links must use explicit light ink");
must(css.includes("max-width: 1500px !important;"), "desktop nav must have enough horizontal room");
must(css.includes("-webkit-text-stroke"), "dark-field headline edge must remain present");
must(!css.includes("@keyframes"), "R27 must not replace canonical motion keyframes");

console.log("PANSOPHIC_CLASSIC_R27=PASS");
