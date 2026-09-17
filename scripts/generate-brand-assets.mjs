import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = join(process.cwd(), "public/assets/brand");
const systemSvg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>\n`;
const doodleSvg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>\n`;
const write = (rel, content) => { const file = join(ROOT, rel); mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, content); };

const paths = {
  knowledge: `<path d="M4 6.5c2.8-.9 5-.5 8 1.4v10.6c-3-1.9-5.2-2.3-8-1.4z"/><path d="M20 6.5c-2.8-.9-5-.5-8 1.4v10.6c3-1.9 5.2-2.3 8-1.4z"/><path d="M12 7.9v10.6"/>`,
  health: `<path d="M12 20s-7-4.3-7-9.1A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.9C19 15.7 12 20 12 20Z"/><path d="M8.2 12h2l1.1-2.2 1.8 4.4 1.1-2.2h1.6"/>`,
  character: `<path d="M12 3.5 18 6v5.2c0 4.3-2.4 7.3-6 9.3-3.6-2-6-5-6-9.3V6z"/><path d="m12 7.5 1.1 2.2 2.4.4-1.8 1.8.4 2.5-2.1-1.2-2.1 1.2.4-2.5-1.8-1.8 2.4-.4z"/>`,
  relationships: `<circle cx="8" cy="10" r="2.4"/><circle cx="16" cy="10" r="2.4"/><path d="M4.5 18c.6-2.6 2-4 3.5-4s2.9 1.4 3.5 4M12.5 18c.6-2.6 2-4 3.5-4s2.9 1.4 3.5 4"/><path d="M10.8 8.8h2.4"/>`,
  creativity: `<path d="M9.1 17.5h5.8M9.8 20h4.4"/><path d="M8.4 14.5c-1.5-1.1-2.4-2.8-2.4-4.7A6 6 0 0 1 18 9.8c0 1.9-.9 3.6-2.4 4.7-.7.5-1.1 1.1-1.3 1.7H9.7c-.2-.6-.6-1.2-1.3-1.7Z"/><path d="M12 2.5v2M3.8 6l1.7 1M20.2 6l-1.7 1"/>`,
  collaboration: `<circle cx="12" cy="7" r="2.2"/><circle cx="6.5" cy="12" r="2"/><circle cx="17.5" cy="12" r="2"/><path d="M8.3 10.5 10.2 8.7M15.7 10.5 13.8 8.7M8.5 13.5h7"/><path d="M4.5 18c.5-1.8 1.5-2.8 3-2.8M19.5 18c-.5-1.8-1.5-2.8-3-2.8M9 18c.5-2 1.5-3.1 3-3.1s2.5 1.1 3 3.1"/>`,
  meaning: `<circle cx="12" cy="12" r="7.5"/><path d="m14.8 8.4-1.7 4.7-4.7 1.7 1.7-4.7z"/><circle cx="12" cy="12" r="1"/>`,
};

const domains = {
  self: `<circle cx="12" cy="8" r="3"/><path d="M6 20c.8-4 2.7-6 6-6s5.2 2 6 6"/><circle cx="12" cy="12" r="9"/>`,
  body: `<circle cx="12" cy="5" r="2"/><path d="M12 7v5m0 0-3 3m3-3 3 3m-3-3-2 8m2-8 2 8M8 10h8"/>`,
  mind: `<path d="M9 5.5A3 3 0 0 0 6 8.4c0 .4.1.8.2 1.1A3.2 3.2 0 0 0 5 12c0 1.4.9 2.6 2.1 3.1A3.4 3.4 0 0 0 10.5 19H12V5.5Z"/><path d="M15 5.5A3 3 0 0 1 18 8.4c0 .4-.1.8-.2 1.1A3.2 3.2 0 0 1 19 12c0 1.4-.9 2.6-2.1 3.1A3.4 3.4 0 0 1 13.5 19H12V5.5Z"/><path d="M9 10h3M15 10h-3M9 14h3M15 14h-3"/>`,
  emotions: `<path d="M12 20s-7-4.2-7-9a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 4.8-7 9-7 9Z"/><path d="M8.5 12.5c1 .8 2.2 1.2 3.5 1.2s2.5-.4 3.5-1.2"/>`,
  relationships: `<circle cx="8" cy="10" r="2.5"/><circle cx="16" cy="10" r="2.5"/><path d="M4.5 18c.8-2.8 2-4 3.5-4s2.7 1.2 3.5 4M12.5 18c.8-2.8 2-4 3.5-4s2.7 1.2 3.5 4"/><path d="M10.5 10h3"/>`,
  family: `<path d="m4 10 8-6 8 6"/><path d="M6 9.5V20h12V9.5"/><circle cx="9" cy="13" r="1.5"/><circle cx="15" cy="13" r="1.5"/><path d="M9 17h6"/>`,
  society: `<circle cx="12" cy="8" r="2.2"/><circle cx="6.5" cy="10" r="1.8"/><circle cx="17.5" cy="10" r="1.8"/><path d="M8.5 19c.6-3 1.8-4.7 3.5-4.7s2.9 1.7 3.5 4.7M3.5 18c.5-2.6 1.5-4 3-4M20.5 18c-.5-2.6-1.5-4-3-4"/>`,
  nature: `<path d="M18.5 4.5C11 4.5 6 8 6 13.1 6 16.5 8.5 19 12 19c5.1 0 7.5-5 6.5-14.5Z"/><path d="M6.5 18.5c2.4-4.6 5.6-7.5 10-10"/>`,
  technology: `<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9.5 9.5h5v5h-5zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>`,
  finance: `<ellipse cx="9" cy="8" rx="4.5" ry="2.2"/><path d="M4.5 8v4c0 1.2 2 2.2 4.5 2.2s4.5-1 4.5-2.2V8M4.5 12v4c0 1.2 2 2.2 4.5 2.2 1.3 0 2.5-.3 3.3-.7"/><circle cx="16.5" cy="15.5" r="3.5"/><path d="M16.5 13.5v4M15.2 14.4h2.1M15.7 16.6h1.9"/>`,
  work: `<rect x="4" y="8" width="16" height="11" rx="2"/><path d="M9 8V6h6v2M4 12h16M10 12v2h4v-2"/>`,
  creation: `<path d="m5 19 3.2-.7 9.5-9.5-2.5-2.5-9.5 9.5z"/><path d="m13.8 7.7 2.5 2.5M5 19l-.7.7"/><path d="M18.5 4v3M17 5.5h3"/>`,
  culture: `<path d="M5 19h14M7 17V9M11 17V9M15 17V9M19 17V9M4 9h16L12 4z"/>`,
  ethics: `<path d="M12 4v15M6 7h12M8 7l-3 5h6zM16 7l-3 5h6zM8 19h8"/>`,
  citizenship: `<path d="M6 20V4M7 5h10l-2 3 2 3H7"/><path d="M4 20h6"/>`,
  meaning: `<circle cx="12" cy="12" r="8"/><path d="m15 8.5-2 5-5 2 2-5z"/><circle cx="12" cy="12" r="1"/>`,
};

const pansofieIcons = {
  education: `<path d="M4 6.5c2.8-.9 5-.5 8 1.4v10.6c-3-1.9-5.2-2.3-8-1.4zM20 6.5c-2.8-.9-5-.5-8 1.4v10.6c3-1.9 5.2-2.3 8-1.4z"/>`,
  community: `<circle cx="8" cy="9" r="2.3"/><circle cx="16" cy="9" r="2.3"/><path d="M3.8 18c.6-3 2-4.5 4.2-4.5s3.6 1.5 4.2 4.5M11.8 18c.6-3 2-4.5 4.2-4.5s3.6 1.5 4.2 4.5"/>`,
  projects: `<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>`,
  impact: `<path d="M4 19V5M4 19h16"/><path d="m7 15 3-4 3 2 4-6"/><circle cx="7" cy="15" r=".7" fill="currentColor" stroke="none"/><circle cx="10" cy="11" r=".7" fill="currentColor" stroke="none"/><circle cx="13" cy="13" r=".7" fill="currentColor" stroke="none"/><circle cx="17" cy="7" r=".7" fill="currentColor" stroke="none"/>`,
  about: `<path d="M12 20V9"/><path d="M12 12C8.5 12 6 10 6 6.5c3.5 0 6 2 6 5.5ZM12 15c3.5 0 6-2 6-5.5-3.5 0-6 2-6 5.5Z"/><path d="M8 20h8"/>`,
  school: `<path d="m4 9 8-4 8 4-8 4z"/><path d="M7 11v5c2.5 1.6 7.5 1.6 10 0v-5M20 9v6"/>`,
  organization: `<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M9 8h6M9 12h6M9 16h2M14 16h1"/>`,
  blog: `<path d="M6 4h9l3 3v13H6z"/><path d="M15 4v4h4M9 11h6M9 14h6M9 17h4"/>`,
  contact: `<rect x="4" y="6" width="16" height="12" rx="2"/><path d="m5 8 7 5 7-5"/>`,
  map: `<path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2z"/><path d="M9 4v14M15 6v14"/>`,
  network: `<circle cx="6" cy="12" r="2"/><circle cx="18" cy="7" r="2"/><circle cx="18" cy="17" r="2"/><path d="m8 11 8-3M8 13l8 3M18 9v6"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>`,
};

const youngIcons = {
  explore: `<circle cx="12" cy="12" r="8"/><path d="m15 8.5-2 5-5 2 2-5z"/>`,
  topics: `<rect x="4" y="4" width="6" height="6" rx="2"/><rect x="14" y="4" width="6" height="6" rx="2"/><rect x="4" y="14" width="6" height="6" rx="2"/><rect x="14" y="14" width="6" height="6" rx="2"/>`,
  stories: `<path d="M5 5h14v11H8l-3 3z"/><path d="M8 9h8M8 12h5"/>`,
  community: `<circle cx="8" cy="9" r="2"/><circle cx="16" cy="9" r="2"/><path d="M4 18c.5-2.8 1.8-4.3 4-4.3s3.5 1.5 4 4.3M12 18c.5-2.8 1.8-4.3 4-4.3s3.5 1.5 4 4.3"/>`,
  projects: `<path d="M5 5h14v14H5z"/><path d="M8 9h8M8 13h5M8 17h3"/>`,
  join: `<circle cx="10" cy="10" r="4"/><path d="M3.5 20c.7-4 2.8-6 6.5-6M18 8v6M15 11h6"/>`,
  search: `<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>`,
  account: `<circle cx="12" cy="8" r="3"/><path d="M6 20c.8-4 2.7-6 6-6s5.2 2 6 6"/>`,
};

const goIcons = {
  home: `<path d="m4 11 8-7 8 7"/><path d="M6 10v10h12V10M10 20v-6h4v6"/>`,
  mission: `<circle cx="12" cy="12" r="8"/><path d="m8.5 12 2.2 2.2 4.8-5"/>`,
  map: `<path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2z"/><path d="M9 4v14M15 6v14"/>`,
  projects: `<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>`,
  teams: `<circle cx="8" cy="9" r="2"/><circle cx="16" cy="9" r="2"/><path d="M4 18c.5-2.8 1.8-4.2 4-4.2s3.5 1.4 4 4.2M12 18c.5-2.8 1.8-4.2 4-4.2s3.5 1.4 4 4.2"/>`,
  portfolio: `<path d="M6 4h9l3 3v13H6z"/><path d="M15 4v4h4M9 12h6M9 16h4"/>`,
  mentor: `<path d="M5 5h14v11H9l-4 4z"/><path d="M9 10h.1M12 10h.1M15 10h.1"/>`,
  profile: `<circle cx="12" cy="8" r="3"/><path d="M6 20c.8-4 2.7-6 6-6s5.2 2 6 6"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>`,
  notifications: `<path d="M6 16h12l-1.5-2V10a4.5 4.5 0 0 0-9 0v4z"/><path d="M10 19h4"/>`,
  camera: `<rect x="4" y="7" width="16" height="12" rx="2"/><path d="m8 7 1-2h6l1 2"/><circle cx="12" cy="13" r="3"/>`,
  upload: `<path d="M12 16V5M8 9l4-4 4 4"/><path d="M5 15v4h14v-4"/>`,
  reflection: `<path d="M5 5h14v11H9l-4 4z"/><path d="M9 9h6M9 12h4"/>`,
  verified: `<path d="M12 3.5 18 6v5.2c0 4.3-2.4 7.3-6 9.3-3.6-2-6-5-6-9.3V6z"/><path d="m8.8 12 2 2 4.4-4.5"/>`,
};

const doodles = {
  crown: `<path d="M12 43 8 20l13 10 11-17 11 17 13-10-4 23Z"/><path d="M14 49h36"/>`,
  spark: `<path d="M32 6c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18Z"/><path d="M50 42c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9Z"/>`,
  smile: `<circle cx="32" cy="32" r="22"/><path d="M22 27h.1M42 27h.1M20 37c3 6 8 9 12 9s9-3 12-9"/>`,
  arrow: `<path d="M9 44c14-20 27-23 42-18"/><path d="m42 15 10 11-13 6"/>`,
  underline: `<path d="M8 38c12-4 25-6 48-3M13 46c13-3 25-4 39-2"/>`,
  wave: `<path d="M5 35c7-16 14 16 22 0s15 16 23 0 9 4 9 4"/>`,
  heart: `<path d="M32 52S9 39 9 24a12 12 0 0 1 23-5 12 12 0 0 1 23 5c0 15-23 28-23 28Z"/>`,
  blob: `<path d="M18 12c10-7 28-4 35 7 8 12 1 31-12 37-12 6-30 1-34-12-4-12 1-25 11-32Z"/>`,
  asterisk: `<path d="M32 9v18M32 37v18M9 32h18M37 32h18M16 16l11 11M37 37l11 11M48 16L37 27M27 37L16 48"/>`,
  burst: `<path d="M32 7l4 15 12-9-7 14 16 1-15 6 10 12-14-7-1 16-6-15-12 10 7-14-16-1 15-6-10-12 14 7z"/>`,
  chat: `<path d="M12 16c0-5 4-8 9-8h22c5 0 9 3 9 8v17c0 5-4 8-9 8H30L18 52l2-11c-5 0-8-3-8-8z"/><circle cx="25" cy="25" r="1.5"/><circle cx="32" cy="25" r="1.5"/><circle cx="39" cy="25" r="1.5"/>`,
  circle: `<path d="M51 31c1 11-7 21-18 22S12 45 11 34 18 13 30 11s20 8 21 20z"/>`,
  cross: `<path d="M18 18l28 28M46 18L18 46"/>`,
  "double-line": `<path d="M10 27c11-4 22-6 44-5M12 38c13-5 27-6 40-5"/>`,
  exclamation: `<path d="M31 10c2 8 2 18 1 29M32 51h.1"/>`,
  flower: `<path d="M32 30c-7-2-11-8-8-13 4-5 9 0 8 6 1-7 7-10 11-6 4 5-1 11-7 13 7 0 12 5 9 10-3 6-11 2-13-4 1 8-4 14-10 11-6-3-4-11 1-14-7 4-14 0-12-6 2-6 10-8 17 0z"/><path d="M32 34c1 8 0 15-2 21"/>`,
  leaf: `<path d="M12 46C16 24 30 11 53 10c-1 24-15 38-37 40"/><path d="M17 46c10-10 19-18 32-30"/>`,
  lightning: `<path d="M35 7L18 34h12l-3 23 19-31H34z"/>`,
  loop: `<path d="M10 38c8-20 33-26 42-12 7 11-6 24-18 17-9-5-7-18 4-18 9 0 15 9 11 17"/>`,
  planet: `<circle cx="32" cy="32" r="13"/><path d="M8 36c8-12 27-20 44-17 6 1 7 4 4 8-6 7-29 18-45 17-6 0-7-4-3-8z"/>`,
  question: `<path d="M22 20c1-8 9-12 16-9 9 4 9 15 1 20-5 3-7 5-7 10M32 53h.1"/>`,
  scribble: `<path d="M8 37c6-15 16-18 20-8 4 9-10 17-8 5 2-10 16-13 20-3 4 10-8 17-8 6 0-9 13-13 20-7 5 5 0 12-8 13"/>`,
  star: `<path d="M32 8l5 16 17 1-14 10 5 16-13-10-14 10 5-16-13-10 17-1z"/>`,
  zigzag: `<path d="M8 38l11-17 10 19 10-21 11 18 6-13"/>`,
};

const pinBodies = {
  mission: `<path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"/><path d="m9.5 10 1.6 1.6 3.4-3.4"/>`,
  project: `<path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"/><rect x="9" y="7" width="6" height="6" rx="1"/>`,
  event: `<path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"/><path d="M9 8h6v5H9zM10 6v2M14 6v2"/>`,
  lab: `<path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"/><path d="M10 7h4M11 7v3l-2 4h6l-2-4V7"/>`,
  mentor: `<path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"/><circle cx="12" cy="9" r="1.6"/><path d="M9.5 14c.5-1.8 1.3-2.8 2.5-2.8s2 1 2.5 2.8"/>`,
};

const badgeBodies = {
  nature: `<circle cx="12" cy="12" r="9"/><path d="M16.8 7.2c-6.2 0-9 2.8-9 6.4 0 2.2 1.6 3.8 3.8 3.8 3.6 0 5.8-3.2 5.2-10.2Z"/><path d="M8 17c1.5-3 3.6-5.2 7-7"/>`,
  helper: `<circle cx="12" cy="12" r="9"/><path d="M12 17s-4.5-2.8-4.5-6a2.7 2.7 0 0 1 4.5-2 2.7 2.7 0 0 1 4.5 2c0 3.2-4.5 6-4.5 6Z"/>`,
  learner: `<circle cx="12" cy="12" r="9"/><path d="M8 8.5c1.8-.6 3.1-.3 4 1v6c-.9-1.3-2.2-1.6-4-1zM16 8.5c-1.8-.6-3.1-.3-4 1v6c.9-1.3 2.2-1.6 4-1z"/>`,
  team: `<circle cx="12" cy="12" r="9"/><circle cx="9" cy="11" r="1.5"/><circle cx="15" cy="11" r="1.5"/><path d="M6.5 16c.5-1.8 1.3-2.7 2.5-2.7s2 .9 2.5 2.7M12.5 16c.5-1.8 1.3-2.7 2.5-2.7s2 .9 2.5 2.7"/>`,
  creator: `<circle cx="12" cy="12" r="9"/><path d="M9.5 15.5h5M10 17.5h4"/><path d="M9 14c-1-.8-1.5-1.8-1.5-3A4.5 4.5 0 0 1 16.5 11c0 1.2-.5 2.2-1.5 3-.4.3-.7.7-.8 1H9.8c-.1-.3-.4-.7-.8-1Z"/>`,
  explorer: `<circle cx="12" cy="12" r="9"/><path d="m14.5 8.5-1.7 4.3-4.3 1.7 1.7-4.3z"/>`,
  impact: `<circle cx="12" cy="12" r="9"/><path d="m8 13 2 2 5-6"/><path d="M7 18h10"/>`,
};

for (const [id, body] of Object.entries(paths)) write(`shared/paths/path-${id}.svg`, systemSvg(body));
for (const [id, body] of Object.entries(domains)) write(`shared/domains/domain-${id}.svg`, systemSvg(body));
for (const [id, body] of Object.entries(pansofieIcons)) write(`pansofie/icons/${id}.svg`, systemSvg(body));
for (const [id, body] of Object.entries(youngIcons)) write(`young/icons/${id}.svg`, systemSvg(body));
for (const [id, body] of Object.entries(goIcons)) write(`go/icons/${id}.svg`, systemSvg(body));
for (const [id, body] of Object.entries(doodles)) write(`young/doodles/${id}.svg`, doodleSvg(body));
for (const [id, body] of Object.entries(pinBodies)) write(`go/map/pin-${id}.svg`, systemSvg(body));
for (const [id, body] of Object.entries(badgeBodies)) write(`go/badges/badge-${id}.svg`, systemSvg(body));

const catalog = {
  version: "1.4.0",
  generatedBy: "scripts/generate-brand-assets.mjs",
  systemSvg: { viewBox: "0 0 24 24", strokeWidth: 1.75, linecap: "round", linejoin: "round", color: "currentColor" },
  doodleSvg: { viewBox: "0 0 64 64", strokeWidth: 3.5, color: "currentColor" },
  assets: {
    paths: Object.keys(paths), domains: Object.keys(domains), pansofieIcons: Object.keys(pansofieIcons),
    youngIcons: Object.keys(youngIcons), youngDoodles: Object.keys(doodles), goIcons: Object.keys(goIcons),
    goPins: Object.keys(pinBodies), goBadges: Object.keys(badgeBodies),
    pansofiePhotos: ["hero-community-left-safe-16x9", "hero-community-left-safe-4x3", "hero-community-left-safe-4x5", "curiosity-nature-16x9", "growing-together-16x9", "prague-nature-16x9", "community-city-16x9"],
    pansofieIllustrations: ["ecosystem-tree", "school-learning", "green-hope", "family-team", "project-idea"],
    youngPhotos: ["hero-rooftop-left-safe-16x9", "hero-rooftop-left-safe-4x3", "hero-rooftop-left-safe-4x5", "community-cutout", "creative-studio-16x9", "creative-studio-4x5", "explorers-nature-16x9", "explorers-nature-4x5"],
    youngIllustrations: ["ecosystem-tree", "intergenerational-help", "urban-garden", "resource-kit", "seedling"],
    goMissionCovers: ["grow-16x9", "explore-16x9", "create-16x9", "community-16x9", "help-4x5"],
  },
};
writeFileSync(join(ROOT, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`);

console.log(`Generated ${Object.keys(paths).length + Object.keys(domains).length + Object.keys(pansofieIcons).length + Object.keys(youngIcons).length + Object.keys(doodles).length + Object.keys(goIcons).length + Object.keys(pinBodies).length + Object.keys(badgeBodies).length} SVG assets.`);
