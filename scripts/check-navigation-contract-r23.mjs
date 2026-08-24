import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const app = read("src/App.jsx");
const login = read("src/pages/Login.jsx");
const register = read("src/pages/Register.jsx");
const go = read("src/pages/PansofieGo.jsx");
const material = read("src/pages/MaterialBridge.jsx");
const materialLanding = read("src/pages/MaterialBridgeLanding.jsx");
const witness = read("src/pages/WitnessVerification.jsx");
const contract = read("docs/canonical/PANSOFIE_NAVIGATION_CONTRACT_V1.0.md");

const required = [
  [app, 'path="/prihlaseni" element={<Navigate to="/login" replace />}'],
  [app, 'path="/registrace" element={<Navigate to="/register" replace />}'],
  [app, 'path="/dashboard"'],
  [app, 'path="/materialovy-most" element={publicSurface(<MaterialBridgeLanding />)}'],
  [app, 'path="/materialovy-most/workspace"'],
  [app, 'path="/potvrzeni-zkusenosti"'],
  [login, "Pilotní účty vznikají na pozvání."],
  [register, "Registrace je nyní pouze na pozvání"],
  [go, "PansofieGO · experimentální vrstva"],
  [go, "nic se neukládá"],
  [materialLanding, "Veřejná podání nejdřív procházejí moderací."],
  [materialLanding, "AVAILABLE → RESERVED → HANDED OVER"],
  [material, 'available: "AVAILABLE"'],
  [material, 'reserved: "RESERVED"'],
  [material, 'handed_over: "HANDED OVER"'],
  [witness, "Vaše potvrzení je podpůrná evidence."],
  [contract, "Canonical sign-in"],
  [contract, "anonymous public intake does not automatically create an `AVAILABLE` listing"],
  [contract, "witness confirmation does not directly approve the Passport"],
  [contract, "`zrnka moudrosti` as currency"],
  [contract, "GPS school discovery"],
];

const forbiddenRoutes = [
  'path="/young/login"',
  'path="/young/register"',
  'path="/profil/nastaveni"',
];

const forbiddenImplementationClaims = [
  [app, "/api/auth/login"],
  [witness, "isVerified: true"],
  [material, 'status: "completed"'],
];

const missing = required.filter(([content, marker]) => !content.includes(marker)).map(([, marker]) => marker);
const routeViolations = forbiddenRoutes.filter((marker) => app.includes(marker));
const claimViolations = forbiddenImplementationClaims.filter(([content, marker]) => content.includes(marker)).map(([, marker]) => marker);

if (missing.length || routeViolations.length || claimViolations.length) {
  console.error("NAVIGATION_CONTRACT_R23=FAIL");
  if (missing.length) console.error(`Missing markers: ${missing.join(" | ")}`);
  if (routeViolations.length) console.error(`Uncontracted routes became live: ${routeViolations.join(" | ")}`);
  if (claimViolations.length) console.error(`Forbidden implementation claims: ${claimViolations.join(" | ")}`);
  process.exit(1);
}

console.log("NAVIGATION_CONTRACT_R23=PASS");
