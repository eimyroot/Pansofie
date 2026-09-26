import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { CURRENT_MEDIA } from "../src/domain/current-visuals.js";

const ROOTS = ["src/app", "src/components", "src/domain"];
const SOURCE_EXTS = new Set([".js", ".jsx", ".css", ".mjs", ".ts", ".tsx"]);
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (SOURCE_EXTS.has(extname(path))) out.push(path);
  }
  return out;
}

test("current redesign never renders legacy brand assets", () => {
  const offenders = [];
  for (const root of ROOTS) for (const file of walk(root)) {
    const source = readFileSync(file, "utf8");
    if (source.includes("/assets/brand/")) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
});

test("every current visual master exists locally", () => {
  for (const url of Object.values(CURRENT_MEDIA)) {
    assert.match(url, /^\/assets\/current\/photos\//);
    assert.ok(existsSync(join("public", url.slice(1))), `Missing current visual: ${url}`);
  }
});

test("current line icon family is local and sufficiently complete", () => {
  const icons = readdirSync("public/assets/current/icons").filter((name) => name.endsWith(".svg"));
  assert.ok(icons.length >= 80, `Expected a full current icon family, found ${icons.length}`);
  for (const name of ["brand-mark.svg", "nature.svg", "mind.svg", "pin-mission.svg", "badge-nature.svg"]) {
    assert.ok(icons.includes(name), `Missing current icon: ${name}`);
  }
});
