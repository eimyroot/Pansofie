import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.join(process.cwd(), "docs", "partner-kit");
const required = [
  "00_COMPANY_PARTNER_KIT_INDEX.md",
  "01_PRODUCT_DEFINITION_VALUE_PROPOSITION.md",
  "02_PARTNER_PACKAGES_PRICING_HYPOTHESES.md",
  "03_PARTNER_VERIFICATION_STANDARD.md",
  "04_COMPANY_CHALLENGE_STANDARD.md",
  "05_PARTNER_AGREEMENT_SKELETON.md",
  "06_SOLUTION_IP_AND_FAIR_USE_POLICY.md",
  "07_BRANDING_PUBLICITY_MEDIA_POLICY.md",
  "08_MENTOR_EXPERT_SAFEGUARDING_STANDARD.md",
  "09_PARTNER_PORTAL_SPEC_V1.md",
  "10_PARTNER_IMPACT_REPORT_TEMPLATE.md",
  "11_COMPANY_ONE_PAGER.md",
  "12_FIRST_PARTNER_PILOT_PROTOCOL.md",
  "13_PARTNER_MEASUREMENT_COMMERCIAL_VALIDATION.md",
  "14_RESEARCH_LEGAL_ASSUMPTIONS.md",
];
for (const file of required) assert.ok(fs.existsSync(path.join(root,file)), `missing ${file}`);
const all = required.map(f=>fs.readFileSync(path.join(root,f),"utf8")).join("\n");
for (const phrase of [
  "no automatic partner IP transfer",
  "no unrestricted partner employee → learner private messaging",
  "ACTIVITY → OUTPUT → ADOPTION → OUTCOME → IMPACT",
  "NOT_ADOPTED",
  "Commercial use is a separate governed/legal step",
]) assert.ok(all.toLowerCase().includes(phrase.toLowerCase()), `missing invariant: ${phrase}`);
assert.ok(!/partner owns all learner|automatic ownership of learner/i.test(all), "forbidden automatic ownership language");
console.log(`Partner kit contract OK (${required.length} files)`);
