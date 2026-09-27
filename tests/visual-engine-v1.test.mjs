import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");

test("Pansofie Visual Engine v1 is a shared identity system, not a page-local decoration", () => {
  const engine = read("src/components/public/PansofieVisualEngine.jsx");
  const css = read("src/app/visual-engine-v1.css");
  assert.match(engine, /PATH_POINTS/);
  assert.match(engine, /DOMAIN_POINTS/);
  for (const mode of ["paths", "domains", "projects", "community"]) assert.match(engine, new RegExp(`mode === \\\"${mode}\\\"`));
  assert.match(engine, /16 oblastí · 7 cest · projekty · lidé · místa/);
  assert.match(css, /Pansofie Visual Engine v1/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /pve-orbit/);
  assert.match(css, /pve-lines/);
});

test("core public surfaces use the canonical Pansofie identity language", () => {
  assert.match(read("src/app/page.jsx"), /PansofieEcosystemAtlas domains=\{PUBLIC_DOMAINS\} paths=\{PUBLIC_PATHS\}/, "homepage must use the canonical living atlas");
  assert.match(read("src/app/7-cest/page.jsx"), /DiscoverHero variant="paths"/, "7 paths must use the editorial path language");
  assert.match(read("src/app/16-oblasti/page.jsx"), /DiscoverHero variant="domains"/, "16 domains must use the editorial atlas language");
  assert.match(read("src/app/projekty/page.jsx"), /ProjectHero variant="overview"/, "projects must use the editorial project family");
  assert.match(read("src/app/komunita/page.jsx"), /CommunityHero variant="overview"/, "community must use the contextual editorial family");
});

test("secondary adult public surfaces use the shared relation-field language", () => {
  const files = [
    "src/app/osobni-rust/page.jsx",
  ];
  for (const file of files) assert.match(read(file), /PansofieVisualEngine mode="flow"/, `${file} must use relation field`);
  assert.match(read("src/components/public/ProgramStoryPage.jsx"), /PansofieVisualEngine mode="flow"/);
});

test("Visual Engine does not become a GO redesign surface", () => {
  const engine = read("src/components/public/PansofieVisualEngine.jsx");
  assert.doesNotMatch(engine, /mode === "go"|pve-stage--go|PANSOFIE GO/);
});

test("Visual Engine keeps Pansofie truth boundaries explicit", () => {
  const projects = read("src/app/projekty/page.jsx");
  const community = read("src/app/komunita/page.jsx");
  assert.match(projects, /prototypy nebo koncepty/);
  assert.match(projects, /Modelový projekt/);
  assert.match(community, /Ne kolem veřejného katalogu lidí/);
  assert.doesNotMatch(read("src/components/public/PansofieVisualEngine.jsx"), /score|žebříček lidí|people nearby/i);
});
