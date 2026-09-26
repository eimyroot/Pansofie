import { DEVELOPMENT_PATHS, MISSION_GROW_001 } from "./learning-core.js";
import { PROJECT_GREEN_HOPE_GROW_001 } from "./project-core.js";

const PATH_COPY = Object.freeze({
  body: "Pečuj o pohyb, zdravé návyky, disciplínu, odolnost a regeneraci.",
  mind: "Hledej pravdu a řešení. Rozvíjej analytické myšlení, kreativitu a digitální gramotnost.",
  character: "Buduj vytrvalost, pravdomluvnost, odpovědnost a schopnost dokončit práci.",
  relationships: "Rozvíjej empatii, komunikaci, týmovou práci a schopnost vést i spolupracovat.",
  creativity: "Proměňuj nápady v projekty, inovace a nové věci.",
  prosperity: "Uč se hospodařit se zdroji, plánovat, pracovat a podnikat.",
  meaning: "Hledej hodnoty, službu společnosti a odpovědnost za svět.",
});

const PATH_MARKS = Object.freeze({ body: "△", mind: "✦", character: "◇", relationships: "⌁", creativity: "✧", prosperity: "◉", meaning: "◌" });

export const PATHS = DEVELOPMENT_PATHS.map(({ id, labelCs }) => [labelCs, PATH_COPY[id], PATH_MARKS[id]]);

export const DOMAIN_DETAILS = [
  ["Já", "Sebepoznání, sebehodnota a autenticita", "Sebereflexe", "Osobní cíle a rozhodnutí"],
  ["Tělo", "Pohyb, spánek, výživa a energie", "Sebeřízení", "Sportovní a pohybové návyky"],
  ["Mysl", "Kritické myšlení, učení a paměť", "Myšlení v souvislostech", "Řešení skutečných problémů"],
  ["Emoce", "Emoční gramotnost a regulace", "Empatie a sebeovládání", "Zvládání konfliktů"],
  ["Vztahy", "Komunikace, hranice a spolupráce", "Aktivní naslouchání", "Rodinné a přátelské vztahy"],
  ["Rodina", "Role, odpovědnost a sdílení", "Spolupráce napříč generacemi", "Společné projekty doma"],
  ["Společnost", "Občanská gramotnost a normy", "Zodpovědné rozhodování", "Účast na komunitním dění"],
  ["Příroda", "Ekosystémy, cykly a závislosti", "Ekologické myšlení", "Pěstování a pozorování přírody"],
  ["Technologie", "Digitální gramotnost, AI a bezpečnost", "Tvůrčí a kritické užití nástrojů", "Tvorba digitálních produktů"],
  ["Finance", "Peníze, rozpočet, investice a hodnota práce", "Finanční plánování", "Rodinný rozpočet a první výdělek"],
  ["Práce", "Pracovní návyky, odpovědnost a řemesla", "Vytrvalost a kvalita", "Brigády a mikroprojekty"],
  ["Tvorba", "Kreativita, design a řemeslo", "Tvůrčí realizace nápadu", "Výrobky, umění a prototypy"],
  ["Kultura", "Tradice, umění a identita", "Kulturní citlivost", "Místní zvyky a dědictví"],
  ["Etika", "Hodnoty, spravedlnost a integrita", "Etické rozhodování", "Rozhodování v reálných situacích"],
  ["Občanství", "Práva, povinnosti a participace", "Aktivní občanství", "Dobrovolnictví a participace"],
  ["Smysl života", "Hodnoty, poslání a dlouhodobé cíle", "Sebeurčení", "Volba směru vzdělání a kariéry"],
];

export const DOMAINS = DOMAIN_DETAILS.map(([title]) => title);
export const ECOSYSTEM_CHAIN = ["Dítě", "Rodina", "Škola", "Komunita", "Příroda", "Ekonomika", "Společnost", "Svět"];
export const LEARNING_METHOD = ["Poznej", "Hraj", "Udělej", "Vytvoř", "Sdílej", "Reflektuj"];

export const MISSIONS = [
  {
    id: "rostlina",
    blueprintId: MISSION_GROW_001.id,
    title: MISSION_GROW_001.titleCs,
    area: "Příroda",
    domainIds: MISSION_GROW_001.domainIds,
    pathIds: MISSION_GROW_001.pathIds,
    xp: 50,
    progress: 2,
    program: "Green Hope",
    programId: MISSION_GROW_001.program,
    image: "/assets/brand/go/mission-covers/grow-16x9.webp",
    thumbnailImage: "/assets/brand/go/mission-covers/grow-1x1.webp",
    detail: "Vyber semena, zasaď je, sleduj růst a zaznamenej, co rostlina potřebuje.",
    learningCycle: MISSION_GROW_001,
  },
  { id: "videohovor", title: "Nauč prarodiče používat videohovor", area: "Vztahy", xp: 40, progress: 0, program: "Knowledge Exchange", image: "/assets/brand/go/scenes/video-call-help.svg", detail: "Předej jednu digitální dovednost bezpečně, trpělivě a s respektem." },
  { id: "jidlo", title: "Uvař zdravé jídlo s rodinou", area: "Zdraví", xp: 35, progress: 1, program: "Family Team", image: "/assets/brand/go/scenes/family-cooking.svg", detail: "Naplánujte jídlo, rozdělte si role, připravte ho a společně zhodnoťte výsledek." },
  { id: "puvod", title: "Zjisti, odkud pochází potraviny", area: "Poznávej", xp: 30, progress: 0, program: "Green Hope", image: "/assets/brand/go/scenes/food-origin.svg", detail: "Vyber tři potraviny, zjisti jejich původ a porovnej lokální alternativu." },
  { id: "odpad", title: "Vytvoř něco z odpadu", area: "Tvořivost", xp: 45, progress: 0, program: "Green Hope", image: "/assets/brand/go/scenes/upcycle-build.svg", detail: "Proměň nepotřebný materiál ve funkční výrobek, prototyp nebo umělecký objekt." },
  { id: "pomoc", title: "Pomoz člověku ve svém okolí", area: "Spolupráce", xp: 40, progress: 0, program: "PansofieGO", image: "/assets/brand/go/scenes/safe-help.svg", detail: "Najdi bezpečnou konkrétní pomoc, domluv ji a udělej jeden dokončitelný krok." },
  { id: "komunita", title: "Založ malý komunitní projekt", area: "Spolupráce", xp: 70, progress: 0, program: "PansofieGO", image: "/assets/brand/go/scenes/community-project.svg", detail: "Pojmenuj problém, sestav malý tým, domluv první krok a ukaž výsledek." },
  { id: "prvni-vydelek", title: "Vydělej první peníze vlastní činností", area: "Samostatnost", xp: 60, progress: 0, program: "Urban Family Farm", image: "/assets/brand/go/scenes/micro-enterprise.svg", detail: "Vytvoř jednoduchou hodnotu, spočítej náklady a bezpečně otestuj první prodej nebo odměnu." },
  { id: "predani", title: "Nauč mladšího účastníka něco, co umíš", area: "Vztahy", xp: 45, progress: 0, program: "Knowledge Exchange", image: "/assets/brand/go/scenes/teach-younger.svg", detail: "Připrav krátké vysvětlení, ukaž postup, nech druhého vyzkoušet a společně reflektujte." },
];

export const GREEN_HOPE_TOPICS = [
  "Pěstování potravin", "Biodiverzita", "Voda", "Půda", "Energie", "Odpad a recyklace",
  "Kompostování", "Městská zeleň", "Ochrana přírody", "Lokální produkce", "Klimatická gramotnost",
];

export const URBAN_FARM_CYCLE = [
  "Zasadit", "Vypěstovat", "Sklidit", "Zpracovat", "Prodat", "Spočítat náklady", "Vytvořit produkt", "Vydělat", "Reinvestovat část zisku",
];

export const FAMILY_MISSIONS = [
  "Společné vaření", "Pěstování", "Rodinný výlet s úkolem", "Finanční plánování",
  "Rodinný tvůrčí projekt", "Rozhovor mezi generacemi", "Společná tvorba", "Pomoc komunitě jako rodina",
];

export const IMPACT_DIMENSIONS = [
  ["Poznání", "Co se lidé skutečně naučili a dokážou použít."],
  ["Dovednosti", "Dokončené mise a doložené výstupy projektu."],
  ["Well-being", "Dobrovolně sledovaná pohoda a zkušenost účastníků."],
  ["Rodina", "Společné rodinné aktivity a projekty."],
  ["Komunita", "Účast, spolupráce a dobrovolnický čas."],
  ["Příroda", "Měřitelné výstupy Green Hope projektů."],
  ["Podnikavost", "Mikroprojekty a praktická ekonomická zkušenost."],
  ["Mezigenerační propojení", "Knowledge Exchange mezi generacemi."],
];

export const PROJECTS = [
  { title: "Green Hope", tag: "Příroda · udržitelnost", status: "Idea / prototyp", image: "/assets/brand/go/scenes/green-hope-project.svg", description: "Praktické environmentální mise: pěstování, kompost, voda, biodiverzita a péče o konkrétní místo." },
  { title: "Urban Family Farm", tag: "Město · rodina · jídlo", status: "Prototyp", image: "/assets/brand/go/scenes/urban-farm-project.svg", description: "Praktická laboratoř života propojující pěstování, ekonomiku, matematiku, podnikání a spolupráci." },
  { title: "Family Team", tag: "Rodina · spolupráce", status: "Model programu", image: "/assets/brand/go/scenes/family-team-project.svg", description: "Rodinný tým s vlastními společnými misemi, projekty, rolemi a bezpečným sdíleným prostorem." },
  { id: "komunitni-zahrada", blueprintId: PROJECT_GREEN_HOPE_GROW_001.id, programId: PROJECT_GREEN_HOPE_GROW_001.program, missionIds: PROJECT_GREEN_HOPE_GROW_001.missionIds, impactDimensionIds: PROJECT_GREEN_HOPE_GROW_001.impactDimensionIds, modelOnly: true, title: PROJECT_GREEN_HOPE_GROW_001.titleCs, tag: "Green Hope · modelový projekt", status: "Model projektu", image: "/assets/brand/go/mission-covers/grow-16x9.webp", description: PROJECT_GREEN_HOPE_GROW_001.summaryCs },
  { title: "Mikrogreens farma", tag: "Pěstování · podnikavost", status: "Model projektu", image: "/assets/brand/go/scenes/microgreens-work.svg", description: "Krátký pěstitelský cyklus vhodný pro školy, rodiny i komunitní piloty s jednoduchou ekonomikou." },
  { title: "Kompostovací centrum", tag: "Cirkularita · materiály", status: "Model projektu", image: "/assets/brand/go/scenes/compost-center.svg", description: "Praktické místo pro bioodpad, půdu, měření a spolupráci školy, rodin a komunity." },
  { title: "Knowledge Exchange", tag: "Mezigenerační učení", status: "Koncept", image: "/assets/brand/go/scenes/knowledge-exchange-project.svg", description: "Výměna znalostí mezi generacemi: každý něco umí, každý se může něco naučit." },
  { title: "Makerspace Pansofie", tag: "Technologie · tvorba", status: "Koncept", image: "/assets/brand/go/scenes/makerspace-project.svg", description: "Dílna pro řemeslo, digitální tvorbu, opravy, prototypování a smysluplné využití materiálů." },
];

export const CHECKPOINTS = [
  ["Komunitní zahrada", "Praha · DEMO", "Green Hope", "model checkpointu"],
  ["Školní laboratoř", "Brno · DEMO", "Labs", "model checkpointu"],
  ["Mikrogreens farma", "Košice · DEMO", "Urban Family Farm", "model checkpointu"],
  ["Komunitní skleník", "Vídeň · DEMO", "Green Hope", "model checkpointu"],
  ["Recyklační dílna", "Budapešť · DEMO", "Cirkularita", "model checkpointu"],
  ["Knowledge Exchange", "online / lokálně · DEMO", "Mezigenerační", "model checkpointu"],
];

export const ROLE_COPY = {
  owner: { title: "Dobrý den", label: "Osobní prostor", focus: "Moje cesta", metric: ["16", "7", "28", "120 h"] },
  "parent / člen rodiny": { title: "Rodinný přehled", label: "Family Team", focus: "Náš společný týden", metric: ["5", "3", "12", "46 h"] },
  "člen školy": { title: "Školní studio", label: "Učení v praxi", focus: "Třídy a projekty", metric: ["8", "6", "34", "286 h"] },
  "člen firmy": { title: "Partnerský přehled", label: "Dopad a zdroje", focus: "Místní spolupráce", metric: ["12", "9", "41", "412 h"] },
};

export const ECOSYSTEM_PRINCIPLE = "Učit se životem, tvořit společně a měnit svět malými konkrétními činy.";
export const KNOWLEDGE_EXCHANGE = "Každý člověk něco umí a každý se může něco naučit.";
