import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    console.error(`TEACHER_ALLIANCE_R19=FAIL ${message}`);
    process.exit(1);
  }
};

const hub = read("src/pages/SchoolHub.jsx");
const component = read("src/components/pansofie/TeacherAllianceDashboard.jsx");
const flow = read("src/lib/pansofieTeacherAllianceFlow.js");
const runDetail = read("src/pages/SchoolRunDetail.jsx");
const css = read("src/teacher-alliance-r19.css");

for (const marker of [
  "UČITELSKÝ PANEL · ALIANCE",
  "SVĚDKOVÉ NÁPRAVY",
  "Žádosti o stvrzení zkušeností",
  "KOLEKTIVNÍ KRONIKA NÁPRAVY",
  "KMENOVÉ VÝZVY · BOUNDED MODE",
  "Bez bodů, pořadí a skrytého hodnocení dětí",
  "Veřejný univerzální „kmenový kód“ zde záměrně nevystavujeme",
  "Potvrzení je dostupné až v detailu",
]) {
  assert(component.includes(marker), `missing product marker: ${marker}`);
}

assert(hub.includes("<TeacherAllianceDashboard"), "SchoolHub does not render the teacher alliance dashboard");
assert(hub.includes("getTeacherAllianceSummary"), "SchoolHub does not load factual alliance metrics");
assert(hub.includes("listTeacherCompletedSchoolRuns"), "SchoolHub does not load the collective chronicle");
assert(component.includes("/skola/mise/${run.id}"), "review queue must route to governed Experience detail");
assert(!component.includes("reviewSchoolRun"), "dashboard must not directly approve evidence without opening review detail");
assert(!component.includes("handleApprove"), "dashboard must not implement blind one-click approval");

for (const marker of [
  'select("id", { count: "exact", head: true })',
  '.eq("status", "completed")',
  '.eq("status", "submitted")',
  '.in("status", ["assigned", "in_progress"])',
  "listTeacherCompletedSchoolRuns",
]) {
  assert(flow.includes(marker), `missing factual query marker: ${marker}`);
}

for (const marker of [
  'reviewSchoolRun({ runId, scope, status, note: reviewNote })',
  'handleReview("mission", "confirmed")',
  'handleReview("mission", "needs_revision")',
  "Ověřuješ doloženou zkušenost, ne hodnotu člověka.",
]) {
  assert(runDetail.includes(marker), `existing governed review boundary missing: ${marker}`);
}

for (const forbidden of ["4 250", "4250", "🌾", "leaderboard", "Společná moudrost školy", "průměrné známky rozumu"]) {
  assert(!component.toLowerCase().includes(forbidden.toLowerCase()), `gamification marker forbidden: ${forbidden}`);
}

assert(css.includes("@media (max-width: 560px)"), "mobile layout contract missing");
assert(css.includes("--r19-violet"), "violet teacher accent missing");
assert(css.includes("--r19-amber"), "amber challenge accent missing");
assert(!css.includes("5vw, 3.4rem"), "R22 density regression: oversized R19 dashboard heading returned");

console.log("TEACHER_ALLIANCE_R19=PASS");
