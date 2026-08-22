export const ENTRY_ROLES = {
  school: {
    id: "school",
    label: "Škola",
    kicker: "První školní ověření",
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
      ["cohort", "Skupinu žáků a pedagogické vedení"],
      ["need", "Skutečnou školní potřebu"],
      ["teacher-review", "Učitelské ověření a zpětnou vazbu"],
      ["pilot-evidence", "Podklady o použitelnosti a učitelské zátěži"],
    ],
    receives: ["3 jasně vymezené zkušenosti", "srozumitelný postup pro učitele", "důkaz práce a reflexi", "soukromý Experience Passport"],
    brings: ["bezpečný rámec", "skupinu žáků", "pedagogické vedení", "reálnou zpětnou vazbu z provozu"],
    safety: ["Škola drží organizaci a ochranu dětí, ale nevlastní univerzální profil člověka.", "Žák si sám nepotvrzuje ověřené dokončení ani Passport.", "Soukromá reflexe se nesdílí automaticky mimo účel ověření."],
    resultTitle: "Návrh prvního školního pilotu",
    resultText: "Začněte jednou skupinou, třemi zkušenostmi a na konci jasně rozhodněte: pokračovat, upravit, nebo zastavit. Nejdřív ověřit, potom rozšiřovat.",
  },
  family: {
    id: "family",
    label: "Rodina",
    kicker: "Rodinná podpora",
    prompt: "Co by měla skutečná zkušenost přinést vašemu dítěti?",
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
      ["context", "Rodinný kontext užitečný pro konkrétní zkušenost"],
      ["feedback", "Dobrovolnou zpětnou vazbu k pilotu"],
    ],
    receives: ["srozumitelný kontext", "bezpečný přehled", "možnost dobrovolně přispět", "jasné hranice soukromí"],
    brings: ["reálný životní kontext", "jeden užitečný vstup", "propojení mezi školou a domovem", "zpětnou vazbu"],
    safety: ["Rodina nepřebírá práci dítěte.", "Rodina automaticky nevidí soukromou reflexi.", "Zapojení musí být dobrovolné a přiměřené konkrétní zkušenosti."],
    resultTitle: "Bezpečná role rodiny kolem zkušenosti",
    resultText: "Rodina nepřidává další domácí úkol. Přináší jeden konkrétní kontext, kontakt nebo zkušenost, která propojí školu s realitou.",
  },
  partner: {
    id: "partner",
    label: "Firma / organizace",
    kicker: "Partner s reálnou výzvou",
    prompt: "Jakou skutečnou hodnotu můžete do spolupráce přinést?",
    goals: [
      ["fresh-view", "Potřebuji nový pohled na reálný problém"],
      ["challenge", "Mám vhodnou reálnou výzvu"],
      ["expert", "Mohu nabídnout odborníka"],
      ["resources", "Mohu nabídnout data, materiál nebo prostor"],
      ["adoption", "Mohu dobré řešení bezpečně vyzkoušet"],
      ["support", "Chci podporovat místní vzdělávání"],
    ],
    contributions: [
      ["brief", "Jasný problém a dostatek kontextu"],
      ["expertise", "Čas odborníka nebo know-how"],
      ["resources", "Data, materiál nebo prostředí v bezpečném rozsahu"],
      ["feedback", "Zpětnou vazbu k výstupu"],
      ["adoption", "Možnost navazujícího ověření nebo pilotního použití"],
    ],
    receives: ["nový pohled na problém", "transparentní týmové výstupy", "možnost odborné zpětné vazby", "samostatné rozhodnutí, zda má smysl výsledek dál použít"],
    brings: ["reálnou výzvu", "expertizu", "zdroje", "skutečnou možnost dalšího kroku"],
    safety: ["Partner nehodnotí lidskou hodnotu ani osobnost dítěte.", "Partner nemá automatický přístup k identitě, neveřejným podkladům ani soukromé reflexi.", "Financování nekupuje pozitivní hodnocení, použití výsledku ani tvrzení o dopadu."],
    resultTitle: "Jak může vypadat spolupráce s partnerem",
    resultText: "Vhodná výzva nejdřív projde posouzením bezpečnosti a vzdělávacího smyslu. Tým na ní pracuje ve školním rámci a partner až potom rozhodne, zda chce výsledek dál zkoumat nebo bezpečně vyzkoušet.",
  },
  community: {
    id: "community",
    label: "Obec / komunita",
    kicker: "Místní zkušenost",
    prompt: "Co můžete nabídnout jako skutečný místní kontext?",
    goals: [
      ["local-need", "Mám místní problém nebo veřejnou potřebu"],
      ["space", "Mohu nabídnout veřejný prostor"],
      ["context", "Mohu poskytnout data nebo kontext"],
      ["expert", "Mohu propojit tým s odborníkem"],
      ["pilot", "Mohu vhodné řešení vyzkoušet v praxi"],
      ["schools", "Chci podporovat místní školy"],
    ],
    contributions: [
      ["problem", "Místní problém"],
      ["environment", "Prostředí nebo veřejný prostor"],
      ["knowledge", "Místní znalost a kontakty"],
      ["adoption", "Možnost výsledek vyzkoušet nebo použít"],
    ],
    receives: ["pozornost k místní potřebě", "konkrétní týmové výstupy", "srozumitelný postup", "možnost navazujícího ověření"],
    brings: ["místní potřebu", "prostředí", "místní znalost", "možnost výsledek vyzkoušet"],
    safety: ["Komunita nezískává automaticky osobní nebo soukromé údaje dětí.", "Veřejná prezentace výstupu potřebuje zvláštní účel a potřebné souhlasy.", "Místní spolupráce nesmí znamenat nekontrolovaný kontakt dospělých s dětmi."],
    resultTitle: "Návrh místního pilotu",
    resultText: "Místní potřeba se může stát skutečnou zkušeností, pokud má jasný účel, bezpečný rozsah a reálnou možnost navazujícího kroku.",
  },
  mentor: {
    id: "mentor",
    label: "Mentor / odborník",
    kicker: "Odborná role",
    prompt: "Jak chcete do zkušenosti přinést svou odbornost?",
    goals: [
      ["questions", "Pomoci týmu lepšími otázkami"],
      ["expertise", "Předat odborný kontext"],
      ["feedback", "Dát zpětnou vazbu k výstupu"],
      ["method", "Ukázat reálnou pracovní metodu"],
      ["community", "Propojit zkušenost s místním prostředím"],
    ],
    contributions: [
      ["time", "Ohraničený čas a expertizu"],
      ["questions", "Otázky a kontext místo hotového řešení"],
      ["feedback", "Zpětnou vazbu k práci a výstupu"],
      ["resources", "Bezpečný zdroj nebo ukázku"],
    ],
    receives: ["jasný účel zapojení", "ohraničený kontakt", "kontext konkrétní zkušenosti", "možnost předat skutečné know-how"],
    brings: ["expertizu", "otázky", "pracovní realitu", "zpětnou vazbu"],
    safety: ["Mentor nemá neomezený soukromý kanál k dítěti.", "Mentor nepřebírá pedagogická rozhodnutí ani odpovědnost za ochranu dětí.", "Zpětná vazba se týká práce, ne lidské hodnoty nebo osobnosti."],
    resultTitle: "Odborná pomoc pod jasným dohledem",
    resultText: "Odborník vstupuje jen tam, kde je jeho know-how skutečně užitečné a kde je kontakt účelově omezený a pod dohledem.",
  },
  learner: {
    id: "learner",
    label: "Mladý člověk",
    kicker: "Moje zkušenost",
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
    receives: ["skutečnou zkušenost", "zpětnou vazbu", "ověřený záznam", "další smysluplný krok"],
    brings: ["vlastní práci", "důkaz", "reflexi", "přínos týmu nebo okolí"],
    safety: ["Nikdo z této zkušenosti nevytváří skóre tvé lidské hodnoty.", "Soukromá reflexe není veřejný profil.", "Důležitá rozhodnutí ověřuje člověk podle jasných pravidel."],
    resultTitle: "Ukázková zkušenost a Experience Passport",
    resultText: "Uděláš něco skutečného, doložíš to, pochopíš vlastní postup a po ověření ti zůstane soukromý záznam zkušenosti.",
  },
};

export const PROBLEMS = [
  { id: "school", label: "Ve škole něco nefunguje", short: "Školní problém", challenge: "ZLEPŠI SVOU ŠKOLU", action: "pozorování → návrh → malý pilot", outcome: "ověřit, zda se něco skutečně zlepšilo" },
  { id: "circular", label: "Plýtváme materiálem", short: "Materiál / odpad", challenge: "CIRKULÁRNÍ VÝZVA", action: "měření → návrh → prototyp", outcome: "rozhodnout, zda má smysl řešení dál vyzkoušet" },
  { id: "digital", label: "Někdo potřebuje digitální pomoc", short: "Digitální pomoc", challenge: "DIGITÁLNÍ MOST", action: "potřeba → bezpečná pomoc → důkaz", outcome: "ověřit, zda pomoc skutečně fungovala" },
  { id: "place", label: "Chceme zlepšit místo kolem nás", short: "Místo / komunita", challenge: "ZLEPŠI MÍSTO KOLEM SEBE", action: "mapování → návrh → ověření s lidmi", outcome: "najít reálný další krok pro místo" },
  { id: "idea", label: "Mám vlastní nápad", short: "Vlastní nápad", challenge: "ROZVIŇ VLASTNÍ NÁPAD", action: "otázka → první verze → důkaz", outcome: "rozhodnout, co má smysl udělat dál" },
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
    ["02", roleId === "partner" || roleId === "community" ? "POSOUZENÍ" : "ZADÁNÍ", role?.kicker || "Zkušenost"],
    ["03", "TÝM", "lidé s jasnými rolemi"],
    ["04", problem.challenge, problem.action],
    ["05", "DŮKAZ", "co se skutečně stalo a vzniklo"],
    ["06", "REFLEXE", "co fungovalo, co ne a proč"],
    ["07", "OVĚŘENÍ", "samostatné lidské ověření"],
    ["08", "ZKUŠENOST", "ověřená práce a zkušenost"],
    ["09", "EXPERIENCE PASSPORT", "soukromý záznam"],
    ["10", "DALŠÍ KROK", problem.outcome],
  ];
}
