import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dir = path.join(root, 'docs', 'pilot')

const required = [
  '00_PILOT_KIT_INDEX.md',
  '01_TEACHER_PLAYBOOK_V1.0.md',
  '02_EXPERIENCE_01_ZLEPSI_SVOU_SKOLU.md',
  '03_EXPERIENCE_02_DIGITALNI_MOST.md',
  '04_EXPERIENCE_03_CIRCULAR_CHALLENGE.md',
  '05_RVP_CROSSWALK_V1.0.md',
  '06_REFLECTION_EVIDENCE_RUBRIC_V1.0.md',
  '07_SAFEGUARDING_CONSENT_PACK_V1.0.md',
  '08_TEACHER_LOAD_BUDGET_V1.0.md',
  '09_PARENT_GUARDIAN_INFORMATION_V1.0.md',
  '10_PANSOFIE_DAY_TOOLKIT_V1.0.md',
  '11_PILOT_MEASUREMENT_PLAN_V1.0.md',
  '12_MATERIAL_SAFETY_SCREEN_V1.0.md',
  '13_PARTNER_CHALLENGE_BRIEF_V1.0.md',
  '14_RESEARCH_AND_ASSUMPTIONS_V1.0.md',
]

for (const file of required) {
  const full = path.join(dir, file)
  if (!fs.existsSync(full)) throw new Error(`Missing pilot-kit file: ${file}`)
  if (fs.readFileSync(full, 'utf8').trim().length < 200) throw new Error(`Pilot-kit file too small: ${file}`)
}

const read = (name) => fs.readFileSync(path.join(dir, name), 'utf8')
const index = read('00_PILOT_KIT_INDEX.md')
const teacher = read('01_TEACHER_PLAYBOOK_V1.0.md')
const e1 = read('02_EXPERIENCE_01_ZLEPSI_SVOU_SKOLU.md')
const e2 = read('03_EXPERIENCE_02_DIGITALNI_MOST.md')
const e3 = read('04_EXPERIENCE_03_CIRCULAR_CHALLENGE.md')
const rvp = read('05_RVP_CROSSWALK_V1.0.md')
const rubric = read('06_REFLECTION_EVIDENCE_RUBRIC_V1.0.md')
const safety = read('07_SAFEGUARDING_CONSENT_PACK_V1.0.md')
const load = read('08_TEACHER_LOAD_BUDGET_V1.0.md')
const measure = read('11_PILOT_MEASUREMENT_PLAN_V1.0.md')
const materials = read('12_MATERIAL_SAFETY_SCREEN_V1.0.md')
const partner = read('13_PARTNER_CHALLENGE_BRIEF_V1.0.md')

const expectations = [
  [index, '3 Experiences', 'index must define three Experiences'],
  [teacher, 'Daří se', 'teacher feedback protocol missing'],
  [teacher, 'Ještě ne', 'teacher feedback protocol missing'],
  [teacher, 'Další krok', 'teacher feedback protocol missing'],
  [e1, 'baseline', 'Experience 1 must require baseline'],
  [e2, 'passwords/PINs', 'Digital Bridge credential boundary missing'],
  [e3, 'AVOID → REDUCE', 'Circular hierarchy missing'],
  [e3, 'partner adoption decision', 'Circular adoption evidence missing'],
  [rvp, 'KPP-REA-000-ZV9-001', 'RVP KPP anchor missing'],
  [rvp, 'KOB-PCP-000-ZV9-001', 'RVP participation anchor missing'],
  [rvp, 'KDI-ZAP-000-ZV9-001', 'RVP digital anchor missing'],
  [rubric, 'Do not calculate one “PANSOFIE score”', 'human-score prohibition missing'],
  [safety, 'Do not use one global “parent consent”', 'purpose separation missing'],
  [load, 'Teacher workload is a product constraint', 'teacher-load invariant missing'],
  [measure, 'Second Experience Rate', 'primary pilot metric missing'],
  [measure, 'STOP / REDESIGN BEFORE SCALE', 'pilot stop gate missing'],
  [materials, 'RED — no child handling', 'material safety red class missing'],
  [partner, 'no behavioural advertising', 'partner ethics boundary missing'],
]

for (const [text, needle, message] of expectations) {
  if (!text.includes(needle)) throw new Error(message)
}

console.log(`Pilot kit contract PASS (${required.length} files)`)
