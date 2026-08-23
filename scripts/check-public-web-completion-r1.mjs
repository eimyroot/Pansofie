import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const files = {
  app: read("src/App.jsx"),
  nav: read("src/components/pansofie/PublicNav.jsx"),
  footer: read("src/components/pansofie/PublicFooter.jsx"),
  join: read("src/pages/Join.jsx") + read("src/components/pansofie/EntryJourney.jsx"),
  login: read("src/pages/Login.jsx"),
  register: read("src/pages/Register.jsx"),
  member: read("src/layouts/MemberLayout.jsx"),
  pilot: read("src/pages/Pilot.jsx"),
  partner: read("src/pages/Partner.jsx"),
};

const required = [
  [files.app, 'path="/zapojit-se"'],
  [files.app, 'path="/kontakt"'],
  [files.app, '<Navigate to="/zapojit-se" replace />'],
  [files.app, 'path="/soukromi"'],
  [files.app, 'path="/bezpecnost"'],
  [files.app, 'path="/podminky"'],
  [files.nav, 'to="/pro-koho#ochutnejte"'],
  [files.footer, '"/zapojit-se?mode=simulator"'],
  [files.footer, '"/zapojit-se"'],
  [files.footer, '"/bezpecnost"'],
  [files.footer, '"/soukromi"'],
  [files.join, "nic neodesílá ani neukládá"],
  [files.login, "Pilotní účty vznikají na pozvání"],
  [files.register, "Registrace je nyní pouze na pozvání"],
  [files.member, "PANSOFIE School"],
  [files.pilot, "Chci zapojit školu"],
  [files.partner, "Přinést reálnou výzvu"],
];

const forbidden = [
  [files.login, "Vytvořit účet"],
  [files.member, '"Síť"'],
  [files.member, '"Zprávy"'],
  [files.member, '"Události"'],
  [files.member, '"Projekty"'],
  [files.register, "supabase.auth.signUp"],
  [files.register, "signInWithOAuth"],
  [files.partner, "Navrhnout Challenge"],
];

const missing = required.filter(([content, token]) => !content.includes(token)).map(([, token]) => token);
const presentForbidden = forbidden.filter(([content, token]) => content.includes(token)).map(([, token]) => token);

if (missing.length || presentForbidden.length) {
  console.error("PUBLIC_WEB_COMPLETION_R1=FAIL");
  if (missing.length) console.error(`Missing: ${missing.join(" | ")}`);
  if (presentForbidden.length) console.error(`Forbidden: ${presentForbidden.join(" | ")}`);
  process.exit(1);
}

console.log("PUBLIC_WEB_COMPLETION_R1=PASS");
