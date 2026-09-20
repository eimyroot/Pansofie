import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  ASSET_NAMESPACES, DOMAIN_ASSET_IDS, GO_BADGE_IDS, GO_ICON_IDS, GO_MISSION_COVER_IDS, GO_PIN_IDS,
  PANSOFIE_ICON_IDS, PANSOFIE_ILLUSTRATION_IDS, PANSOFIE_PHOTO_IDS, PATH_ASSET_IDS, YOUNG_DOODLE_IDS, YOUNG_ICON_IDS, YOUNG_ILLUSTRATION_IDS, YOUNG_PHOTO_IDS,
  assetPath, domainIcon, goBadge, goIcon, goMissionCover, goPin, pansofieIcon, pansofieIllustration, pansofiePhoto, pathIcon, youngDoodle, youngIcon, youngIllustration, youngPhoto,
} from "../src/domain/asset-system.js";

const PUBLIC = join(process.cwd(), "public");
const disk = (url) => join(PUBLIC, url.replace(/^\//, ""));

const groups = [
  [PATH_ASSET_IDS, pathIcon], [DOMAIN_ASSET_IDS, domainIcon], [PANSOFIE_ICON_IDS, pansofieIcon],
  [YOUNG_ICON_IDS, youngIcon], [YOUNG_DOODLE_IDS, youngDoodle], [GO_ICON_IDS, goIcon],
  [GO_PIN_IDS, goPin], [GO_BADGE_IDS, goBadge],
];

test("asset system keeps three products plus shared semantics", () => {
  assert.deepEqual(Object.keys(ASSET_NAMESPACES), ["pansofie", "young", "go", "shared"]);
  assert.deepEqual(PATH_ASSET_IDS, ["body", "mind", "character", "relationships", "creativity", "prosperity", "meaning"]);
  assert.equal(DOMAIN_ASSET_IDS.length, 16);
  assert.equal(YOUNG_DOODLE_IDS.length, 24);
  assert.equal(GO_PIN_IDS.length, 5);
  assert.equal(PANSOFIE_PHOTO_IDS.length, 7);
  assert.equal(YOUNG_PHOTO_IDS.length, 8);
  assert.equal(GO_MISSION_COVER_IDS.length, 5);
  assert.equal(PANSOFIE_ILLUSTRATION_IDS.length, 5);
  assert.equal(YOUNG_ILLUSTRATION_IDS.length, 5);
});

test("asset helpers produce semantic production paths", () => {
  assert.equal(pathIcon("mind"), "/assets/brand/shared/paths/path-mind.svg");
  assert.equal(domainIcon("finance"), "/assets/brand/shared/domains/domain-finance.svg");
  assert.equal(goPin("mission"), "/assets/brand/go/map/pin-mission.svg");
  assert.equal(assetPath("young", "doodles", "crown"), "/assets/brand/young/doodles/crown.svg");
  assert.equal(pansofiePhoto("growing-together-16x9"), "/assets/brand/pansofie/photos/growing-together-16x9.webp");
  assert.equal(youngPhoto("community-cutout"), "/assets/brand/young/photos/community-cutout.png");
  assert.equal(goMissionCover("grow-16x9"), "/assets/brand/go/mission-covers/grow-16x9.webp");
  assert.equal(pansofieIllustration("green-hope"), "/assets/brand/pansofie/illustrations/green-hope.webp");
  assert.equal(youngIllustration("seedling"), "/assets/brand/young/illustrations/seedling.png");
});

test("every registered vector exists and obeys the safe SVG contract", () => {
  let count = 0;
  for (const [ids, resolver] of groups) for (const id of ids) {
    const file = disk(resolver(id));
    assert.ok(existsSync(file), `Missing vector: ${file}`);
    const svg = readFileSync(file, "utf8");
    assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    assert.ok(!/<text\b/i.test(svg), `Text is forbidden in vector asset: ${file}`);
    assert.ok(!/<script\b/i.test(svg), `Script is forbidden in vector asset: ${file}`);
    assert.ok(!/https?:\/\//i.test(svg.replace("http://www.w3.org/2000/svg", "")), `External URL in SVG: ${file}`);
    count += 1;
  }
  assert.equal(count, 93);
});


test("every registered raster asset exists", () => {
  const rasterGroups = [
    [PANSOFIE_PHOTO_IDS, pansofiePhoto],
    [YOUNG_PHOTO_IDS, youngPhoto],
    [GO_MISSION_COVER_IDS, goMissionCover],
    [PANSOFIE_ILLUSTRATION_IDS, pansofieIllustration],
    [YOUNG_ILLUSTRATION_IDS, youngIllustration],
  ];
  let count = 0;
  for (const [ids, resolver] of rasterGroups) for (const id of ids) {
    assert.ok(existsSync(disk(resolver(id))), `Missing raster: ${resolver(id)}`);
    count += 1;
  }
  assert.equal(count, 30);
});
