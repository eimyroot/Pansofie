import test from "node:test";
import assert from "node:assert/strict";
import { ageOn, resolveExperience, routeForExperience } from "../src/domain/experience.js";
const today = new Date("2026-09-08T12:00:00Z");
test("age boundaries are unambiguous",()=>{assert.equal(ageOn("2013-09-08",today),13);assert.equal(ageOn("2012-09-08",today),14)});
test("young age takes precedence",()=>{assert.equal(resolveExperience({dateOfBirth:"2013-09-08",spaceType:"school"},today),"young_kids");assert.equal(resolveExperience({dateOfBirth:"2006-09-08",spaceType:"company"},today),"young_teens")});
test("adult experience follows active space",()=>{assert.equal(resolveExperience({dateOfBirth:"1990-01-01",spaceType:"family"},today),"adult_family");assert.equal(resolveExperience({dateOfBirth:"1990-01-01",spaceType:"school"},today),"adult_school");assert.equal(resolveExperience({dateOfBirth:"1990-01-01",spaceType:"company"},today),"adult_company");assert.equal(routeForExperience("adult_personal"),"/app/personal")});
