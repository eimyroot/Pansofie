import assert from "node:assert/strict";
import fs from "node:fs";

const css = fs.readFileSync("src/public-visual-r9.css", "utf8");
const main = fs.readFileSync("src/main.jsx", "utf8");

assert.match(main, /public-visual-r9\.css/, "R9 visual layer must be loaded by src/main.jsx");
assert.match(css, /--r9-ink:\s*#14211b/, "R9 primary ink token missing");
assert.match(css, /--r9-muted:\s*#465950/, "R9 muted copy token missing");
assert.match(css, /--r9-green:\s*#0b5d49/, "R9 action green token missing");

for (const forbidden of [
  "@keyframes",
  ".reference-network-stage",
  ".reference-network-node",
  ".route-network-ribbon",
  ".network-cursor-glow",
  ".network-motion-sweep",
  ".footer-network-edge i",
]) {
  assert.equal(css.includes(forbidden), false, `R9 must not edit motion graphic behavior: ${forbidden}`);
}

function rgb(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16) / 255);
}

function luminance(hex) {
  const channels = rgb(hex).map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

const pairs = [
  ["ink/canvas", "#14211b", "#ebe7dc", 7],
  ["body-copy/canvas", "#253a31", "#ebe7dc", 7],
  ["muted/canvas", "#465950", "#ebe7dc", 4.5],
  ["muted/white", "#465950", "#ffffff", 4.5],
  ["primary-button", "#ffffff", "#0b5d49", 4.5],
  ["blue-accent", "#ffffff", "#174d7a", 4.5],
  ["amber-accent", "#ffffff", "#9b5b00", 4.5],
  ["coral-accent", "#ffffff", "#a84232", 4.5],
  ["violet-accent", "#ffffff", "#65449a", 4.5],
  ["footer-muted", "#bac5bf", "#17241e", 4.5],
];

for (const [name, foreground, background, minimum] of pairs) {
  const ratio = contrast(foreground, background);
  assert.ok(ratio >= minimum, `${name} contrast ${ratio.toFixed(2)} is below ${minimum}:1`);
}

console.log("PUBLIC_VISUAL_R9=PASS");
