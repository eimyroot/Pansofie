export const PATHS = [
  ["Poznávej", "Rozuměj souvislostem a uč se z reálného života.", "◎"],
  ["Zdraví", "Pečuj o tělo, mysl a každodenní rovnováhu.", "♡"],
  ["Charakter", "Rozvíjej odvahu, laskavost a odpovědnost.", "△"],
  ["Vztahy", "Tvoř bezpečné vztahy, rodiny a týmy.", "⌁"],
  ["Tvořivost", "Proměňuj otázky v nápady a prototypy.", "✦"],
  ["Spolupráce", "Spojuj lidi kolem společného cíle.", "∞"],
  ["Smysl", "Hledej, čemu stojí za to věnovat energii.", "◌"],
];

export const DOMAINS = [
  "Já", "Tělo", "Mysl", "Emoce", "Vztahy", "Rodina", "Společnost", "Příroda",
  "Technologie", "Finance", "Práce", "Tvořivost", "Kultura", "Etika", "Občanství", "Smysl života",
];

export const MISSIONS = [
  { id: "strom", title: "Vysaď strom", area: "Příroda", xp: 50, progress: 2, image: "/art/pansofie-v1/pillar-panorthosia.webp", detail: "Najdi vhodné místo, domluv péči a zaznamenej, co strom potřebuje." },
  { id: "den", title: "Den bez plastu", area: "Občanství", xp: 30, progress: 1, image: "/art/pansofie-v1/action-change.webp", detail: "Všimni si jednorázových obalů a navrhni jednu změnu, která vydrží." },
  { id: "komunita", title: "Pomoz v komunitě", area: "Spolupráce", xp: 40, progress: 0, image: "/art/pansofie-v1/action-help.webp", detail: "Vyber bezpečnou místní aktivitu s týmem nebo ověřenou organizací." },
];

export const PROJECTS = [
  { title: "Green Hope", tag: "Příroda · udržitelnost", image: "/art/pansofie-v1/hero-tree.webp", description: "Zeleňující platforma, ve které se nápad promění v péči o konkrétní místo." },
  { title: "Urban Family Farm", tag: "Město · rodina · jídlo", image: "/art/pansofie-v1/compost.webp", description: "Praktická laboratoř života ve městě: pěstování, komunita, workshopy a lokální jídlo." },
  { title: "Family Team", tag: "Rodina · spolupráce", image: "/art/pansofie-v1/action-help.webp", description: "Rodinný tým, ve kterém má každý hlas, roli a bezpečný prostor pro společné projekty." },
];

export const CHECKPOINTS = [
  ["Komunitní zahrada", "Praha 7", "Projekt", "62 %"],
  ["Školní laboratoř", "Brno", "Labs", "4 místa"],
  ["Sousedská dílna", "Olomouc", "Partner", "dnes"],
  ["Rodinná farma", "Litomyšl", "Projekt", "víkend"],
];

export const ROLE_COPY = {
  "owner": { title: "Dobrý den", label: "Osobní prostor", focus: "Moje cesta", metric: ["16", "7", "28", "120 h"] },
  "parent / člen rodiny": { title: "Rodinný přehled", label: "Family Team", focus: "Náš společný týden", metric: ["5", "3", "12", "46 h"] },
  "člen školy": { title: "Školní studio", label: "Učení v praxi", focus: "Třídy a projekty", metric: ["8", "6", "34", "286 h"] },
  "člen firmy": { title: "Partnerský přehled", label: "Dopad a zdroje", focus: "Místní spolupráce", metric: ["12", "9", "41", "412 h"] },
};
