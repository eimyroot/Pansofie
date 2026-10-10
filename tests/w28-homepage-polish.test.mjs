import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync("src/components/public-v2/HomePageV2.jsx", "utf8");
const css = readFileSync("src/app/pansofie-v2.css", "utf8");
const asset = readFileSync("src/domain/asset-system-v2.js", "utf8");
const tree = readFileSync("public/assets/brand-v2/identity/pansofie-tree-approved.svg", "utf8");

test("W2.8 uses the approved Pansofie tree in the header and first pillar", () => {
  assert.match(home, /pansofie-tree-approved\.svg/);
  assert.match(asset, /identity\/pansofie-tree-approved\.svg/);
  assert.match(tree, /viewBox="0 0 256 256"/);
});

test("W2.8 makes the hero quote and Green Hope project card legible", () => {
  assert.match(css, /\.ps2-mockup-hero__quote\{[^}]*background:linear-gradient\(/);
  assert.match(css, /\.ps2-home-story__copy \.ps2-relation\{background:#194a38/);
  assert.match(css, /\.ps2-home-story__copy \.ps2-relation h3\{color:#fffdf4/);
});

test("W2.8 GO copy and action retain clear separation", () => {
  assert.match(css, /\.ps2-w27-go \.ps2-go-bridge>div h2\{margin:15px 0 26px/);
  assert.match(css, /\.ps2-w27-go \.ps2-go-bridge>\.ps2-button\{margin:32px 0 0!important/);
  assert.match(home, /Na aplikaci pracujeme/);
});

test("W2.8 removes overlay badges, restores intentional mosaic and preserves both linked family programs", () => {
  assert.match(home, /className="ps2-w28-family"/);
  assert.match(home, /href="\/family-team"/);
  assert.match(home, /href="\/sit"/);
  assert.match(home, /id="rodina"/);
  assert.match(home, /id="komunita"/);
  assert.doesNotMatch(home, /ps2-w27-program__truth/);
  assert.doesNotMatch(home, /Všechny projekty <ArrowRight/);
  assert.match(home, /Digitální kompost/);
  assert.match(home, /modelový projekt, Digitální kompost prototyp/);
});
