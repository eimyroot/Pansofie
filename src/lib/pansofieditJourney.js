export const ENTRY_ROLES = {
  school: {
    id: "school",
    label: "Škola",
    kicker: "Školní pilot",
    prompt: "Co by měla Pansofie ve vaší škole změnit jako první?",
    goals: [
      ["real-learning", "Více reálných zkušeností ve výuce"],
      ["local-projects", "Projekty propojené s okolím školy"],
      ["evidence", "Důkaz a reflexe místo dojmu"],
      ["partners", "Smysluplná spolupráce s firmami nebo obcí"],
      ["families", "Zapojení rodin bez dalšího administrativního chaosu"],
      ["field-pilot", "Ověřit Pansofii v prvním školním pilotu"],
    ],
    contributions: [
      ["cohort", "Kohortu žáků a pedagogické vedení"],
      ["need", "Skutečnou školní potřebu"],
      ["teacher-review", "Učitelský review a zpětnou vazbu"],
      ["pilot-evidence", "Evidence o použitelnosti a učitelské zátěži"],
    ],
    receives: ["3 ohraničené Experiences", "učitelský workflow", "evidence + reflexi", "soukromý Experience Passport"],
    brings: ["bezpečný rámec", "kohortu", "pedagogické vedení", "reálnou provozní zpětnou vazbu"],
    safety: ["Škola je organizační a safeguarding host, ne vlastník lidského profilu.", "Žák si sám nepotvrzuje ověřené dokončení ani Passport.", "Soukromá reflexe se nesdílí automaticky mimo účel review."],
    resultTitle: "Návrh prvního školního pilotu",
    resultText: "Začněte jednou kohortou, třemi Experiences a jasným GO / CHANGE / STOP vyhodnocením místo plošného zavedení.",
  },
  family: {
    id: "family",
    label: "Rodina",
    kicker: "Rodinné zapojení",
    prompt: "Co by měla skutečná Experience přinést vašemu dítěti?",
    goals: [
      ["outside-class", "Více zkušeností mimo učebnici"],
      ["practical", "Praktické dovednosti a samostatnost"],
      ["people", "Spolupráci s dalšími lidmi"],
      ["meaning", "Smysluplné projekty"],
      ["proof", "Možnost ukázat, co skutečně vytvořilo a pochopilo"],
    ],
    contributions: [
      ["observation", "Pozorování nebo zkušenost z běžného života"],
      ["contact", "Doporučení člověka nebo místního zdroje"],
      ["context", "Rodinný kontext užitečný pro Experience"],
      ["feedback", "Dobrovolnou zpětnou vazbu k pilotu"],
    ],
    receives: ["srozumitelný kontext", "bezpečný přehled", "možnost dobrovolně přispět", "jasné hranice soukromí"],
    brings: ["reálný životní kontext", "jeden užitečný vstup", "kontinuitu mezi školou a domovem", "zpětnou vazbu"],
    safety: ["Rodina nepřebírá práci dítěte.", "Rodina automaticky nevidí soukromou reflexi.", "Zapojení musí být dobrovolné a přiměřené konkrétní Experience."],
    resultTitle: "Bezpečná rodinná role kolem Experience",
    resultText: "Rodina nepřidává další domácí úkol. Přináší jeden konkrétní kontext, kontakt nebo zkušenost, která propojí školu s realitou.",
  },
  partner: {
    id: "partner",
    label: "Firma / organizace",
    kicker: "Challenge partner",
    prompt: "Jakou skutečnou hodnotu můžete do Experience přinést?",
    goals: [
      ["fresh-view", "Potřebuji nový pohled na reálný problém"],
      ["challenge", "Mám vhodnou Challenge"],
      ["expert", "Mohu nabídnout odborníka"],
      ["resources", "Mohu nabídnout data, materiál nebo prostor"],
      ["adoption", "Mohu pilotovat dobré řešení"],
      ["support", "Chci podporovat lokální vzdělávání"],
    ],
    contributions: [
      ["brief", "Jasný problém a kontext"],
      ["expertise", "Čas odborníka nebo know-how"],
      ["resources", "Data, materiál nebo prostředí v bezpečném rozsahu"],
      ["feedback", "Zpětnou vazbu k výstupu"],
      ["adoption", "Možnost navazujícího pilotu nebo adopce"],
    ],
    receives: ["nový pohled na problém", "transparentní týmové výstupy", "možnost odborného feedbacku", "oddělené adoption decision"],
    brings: ["Challenge", "expertizu", "zdroje", "reálnou možnost dalšího kroku"],
    safety: ["Partner nehodnotí lidskou hodnotu ani osobnost dítěte.", "Partner nemá automatický přístup k identitě, raw evidence nebo soukromé reflexi.", "Financování nekupuje pozitivní hodnocení, adopci ani impact claim."],
    resultTitle: "Partner Challenge preview",
    resultText: "Vhodná Challenge projde screeningem, tým na ní pracuje ve školním rámci a partner až po review rozhoduje o případném dalším pilotu nebo adopci.",
  },
  community: {
    id: "community",
    label: "Obec / komunita",
    kicker: "Lokální Experience",
    prompt: "Co můžete nabídnout jako skutečný lokální kontext?",
    goals: [
      ["local-need", "Mám lokální problém nebo veřejnou potřebu"],
      ["space", "Mohu nabídnout veřejný prostor"],
      ["context", "Mohu poskytnout data nebo kontext"],
      ["expert", "Mohu propojit tým s odborníkem"],
      ["pilot", "Mohu pilotovat vhodné řešení"],
      ["schools", "Chci podporovat místní školy"],
    ],
    contributions: [
      ["problem", "Lokální problém"],
      ["environment", "Prostředí nebo veřejný prostor"],
      ["knowledge", "Místní znalost a kontakty"],
      ["adoption", "Možnost výsledek vyzkoušet nebo použít"],
    ],
    receives: ["pozornost k místní potřebě", "konkrétní týmové výstupy", "transparentní proces", "možnost dalšího pilotu"],
    brings: ["lokální potřebu", "prostředí", "místní znalost", "možnost adopce"],
    safety: ["Komunita nezískává automaticky child data.", "Veřejná prezentace výstupu potřebuje zvláštní účel a souhlasy.", "Lokální relevance nesmí znamenat nekontrolovaný kontakt dospělých s dětmi."],
    resultTitle: "Lokální community pilot",
    resultText: "Místní potřeba se může stát Experience, pokud má jasný účel, bezpečný rozsah a skutečnou možnost navazujícího kroku.",
  },
  mentor: {
    id: "mentor",
    label: "Mentor / odborník",
    kicker: "Knowledge role",
    prompt: "Jak chcete do Experience přinést odbornou zkušenost?",
    goals: [
      ["questions", "Pomoci týmu lepšími otázkami"],
      ["expertise", "Předat odborný kontext"],
      ["feedback", "Dát feedback k výstupu"],
      ["method", "Ukázat reálnou pracovní metodu"],
      ["community", "Propojit Experience s místním prostředím"],
    ],
    contributions: [
      ["time", "Ohraničený čas a expertizu"],
      ["questions", "Otázky a kontext místo hotového řešení"],
      ["feedback", "Feedback k práci a výstupu"],
      ["resources", "Bezpečný zdroj nebo demonstraci"],
    ],
    receives: ["jasný účel zapojení", "ohraničený kontakt", "kontext Experience", "možnost předat skutečné know-how"],
    brings: ["expertizu", "otázky", "pracovní realitu", "zpětnou vazbu"],
    safety: ["Mentor nemá neomezený soukromý kanál k dítěti.", "Mentor nepřebírá pedagogické ani safeguarding rozhodnutí.", "Feedback se týká práce, ne lidské hodnoty nebo osobnosti."],
    resultTitle: "Supervidovaná knowledge role",
    resultText: "Odborník vstupuje jen tam, kde je jeho know-how skutečně užitečné a kde je kontakt účelově omezený a pod dohledem.",
  },
  learner: {
    id: "learner",
    label: "Mladý člověk",
    kicker: "Moje Experience",
    prompt: "Co bys chtěl/a skutečně udělat, ne jen o tom číst?",
    goals: [
      ["school", "Zlepšit něco ve škole"],
      ["environment", "Vyřešit problém s materiálem nebo prostředím"],
      ["help", "Pomoci konkrétnímu člověku"],
      ["place", "Zlepšit místo kolem sebe"],
      ["idea", "Rozvinout vlastní nápad"],
    ],
    contributions: [
      ["action", "Vlastní skutečnou činnost"],
      ["evidence", "Důkaz toho, co jsem udělal/a"],
      ["reflection", "Vlastní reflexi"],
      ["team", "Spolupráci v týmu"],
    ],
    receives: ["skutečnou Experience", "feedback", "ověřený záznam", "další smysluplný krok"],
    brings: ["vlastní práci", "důkaz", "reflexi", "přínos týmu nebo okolí"],
    safety: ["Nikdo z Experience nevytváří skóre tvé lidské hodnoty.", "Soukromá reflexe není veřejný profil.", "Důležitá rozhodnutí mají lidský review a jasná pravidla."],
    resultTitle: "Ukázková Experience + Passport",
    resultText: "Uděláš něco skutečného, doložíš to, pochopíš vlastní postup a po ověření ti zůstane soukromý záznam Experience.",
  },
};

export const PROBLEMS = [
  { id: "school", label: "Ve škole něco nefunguje", short: "Školní problém", challenge: "ZLEPŠI SVOU ŠKOLU", action: "pozorování → návrh → malý pilot", outcome: "ověřit, zda se něco skutečně zlepšilo" },
  { id: "circular", label: "Plýtváme materiálem", short: "Materiál / odpad", challenge: "CIRCULAR CHALLENGE", action: "měření → návrh → prototyp", outcome: "rozhodnout, zda má smysl řešení dál pilotovat" },
  { id: "digital", label: "Někdo potřebuje digitální pomoc", short: "Digitální pomoc", challenge: "DIGITÁLNÍ MOST", action: "potřeba → bezpečná pomoc → důkaz", outcome: "ověřit, zda pomoc skutečně fungovala" },
  { id: "place", label: "Chceme zlepšit místo kolem nás", short: "Místo / komunita", challenge: "LOCAL PLACE EXPERIENCE", action: "mapování → návrh → ověření s lidmi", outcome: "najít reálný další krok pro místo" },
  { id: "idea", label: "Mám vlastní nápad", short: "Vlastní nápad", challenge: "OWN IDEA EXPERIENCE", action: "otázka → první verze → evidence", outcome: "rozhodnout, co má smysl udělat dál" },
];

export const PARTICIPANTS = [
  ["learner", "Žák / tým"],
  ["teacher", "Učitel"],
  ["family", "Rodina"],
  ["partner", "Firma / organizace"],
  ["community", "Obec / komunita"],
  ["mentor", "Mentor / odborník"],
];

export function defaultParticipantsFor(roleId) {
  const base = ["learner", "teacher"];
  if (roleId === "family") base.push("family");
  if (roleId === "partner") base.push("partner");
  if (roleId === "community") base.push("community");
  if (roleId === "mentor") base.push("mentor");
  if (roleId === "school") base.push("family");
  return base;
}

export function buildExperiencePath(problem, roleId) {
  const role = ENTRY_ROLES[roleId];
  return [
    ["01", "PROBLÉM", problem.label],
    ["02", roleId === "partner" || roleId === "community" ? "SCREENING" : "ZADÁNÍ", role?.kicker || "Experience"],
    ["03", "TÝM", "lidé s jasnými rolemi"],
    ["04", problem.challenge, problem.action],
    ["05", "DŮKAZ", "co se skutečně stalo a vzniklo"],
    ["06", "REFLEXE", "co fungovalo, co ne a proč"],
    ["07", "REVIEW", "oddělené lidské ověření"],
    ["08", "EXPERIENCE", "ověřená zkušenost"],
    ["09", "PASSPORT", "soukromý záznam"],
    ["10", "DALŠÍ KROK", problem.outcome],
  ];
}
