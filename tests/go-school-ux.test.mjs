import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [migration, domain, page, workspace, goWorkspace] = await Promise.all([
  read("supabase/migrations/20260926110000_go_school_read_model.sql"),
  read("src/domain/school-go.js"),
  read("src/app/go/school/page.jsx"),
  read("src/components/experiences/SchoolGoWorkspace.jsx"),
  read("src/components/experiences/GoWorkspace.jsx"),
]);

test("school GO read model exposes minimal staff-only data", () => {
  assert.match(migration, /get_school_class_roster/);
  assert.match(migration, /get_school_class_assignment_progress/);
  assert.match(migration, /security definer/);
  assert.match(migration, /revoke execute[\s\S]+from public, anon/);
  assert.doesNotMatch(migration, /email/i);
  assert.doesNotMatch(migration, /date_of_birth/i);
  assert.doesNotMatch(migration, /experience_evidence|experience_reflections/);
});

test("school GO loader keeps roster behind governed RPCs", () => {
  assert.match(domain, /rpc\("get_school_class_roster"/);
  assert.match(domain, /rpc\("get_school_class_assignment_progress"/);
  assert.match(domain, /roster: \[\]/);
  assert.doesNotMatch(domain, /from\("profiles"\)/);
  assert.match(domain, /school_context_required/);
});
test("/go/school requires canonical account context", () => {
  assert.match(page, /requireUserContext\(undefined, \{ returnTo: "\/go\/school" \}\)/);
  assert.match(page, /loadSchoolGoSnapshot\(context\)/);
  assert.doesNotMatch(page, /service_role|SUPABASE_SERVICE_ROLE_KEY/i);
});

test("school workspace separates staff and learner experience", () => {
  assert.match(workspace, /classData\.canManage/);
  assert.match(workspace, /AssignmentComposer/);
  assert.match(workspace, /LearnerAssignments/);
  assert.match(workspace, /Spolužáci ani jejich průběh se sem neposílají/);
  assert.match(workspace, /Bez e-mailů, narození, evidence nebo osobního skóre/);
  assert.doesNotMatch(workspace, /leaderboard|žebříček třídy|rank/i);
});

test("school assignment UI reuses governed server actions", () => {
  assert.match(workspace, /assignSchoolMissionAction/);
  assert.match(workspace, /cancelSchoolAssignmentAction/);
  assert.match(workspace, /router\.refresh\(\)/);
  assert.doesNotMatch(workspace, /assignedBy|assigned_by/);
});

test("GO home exposes school workspace only from real school membership", () => {
  assert.match(goWorkspace, /organizationMemberships\?\.find/);
  assert.match(goWorkspace, /organization\?\.type==="school"/);
  assert.match(goWorkspace, /Otevřít School GO/);
  assert.match(goWorkspace, /onNavigate\("school"\)/);
});
