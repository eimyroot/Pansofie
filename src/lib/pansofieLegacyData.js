import {
  Heart, BookOpen, Shield, Users, Sparkles, Compass, Globe,
  Sprout, Recycle, Wrench, Trophy, HeartHandshake, Briefcase, UserRound,
} from "lucide-react";

export const PATHS = [
  { id: "zdravi", name: "Zdraví", color: "#10b981", icon: Heart, desc: "Tělo, mysl, energie a vitalita.", develops: "Tělesnou i duševní vitalitu, energii a odolnost.", areas: ["Pohyb", "Výživa", "Spánek", "Mysl"] },
  { id: "poznaní", name: "Poznání", color: "#3b82f6", icon: BookOpen, desc: "Učení, zvědavost, porozumění světu.", develops: "Zvědavost, porozumění a kritické myšlení.", areas: ["Učení", "Čtení", "Výzkum", "Diskuse"] },
  { id: "charakter", name: "Charakter", color: "#f59e0b", icon: Shield, desc: "Disciplína, integrita, odolnost.", develops: "Disciplínu, integritu, odolnost a zodpovědnost.", areas: ["Návyky", "Cíle", "Odolnost", "Hodnoty"] },
  { id: "vztahy", name: "Vztahy", color: "#f43f5e", icon: Users, desc: "Spojení, empatie, komunikace, komunita.", develops: "Empatii, komunikaci, spolupráci a komunitu.", areas: ["Rodina", "Přátelé", "Tým", "Komunita"] },
  { id: "tvorivost", name: "Tvořivost", color: "#8b5cf6", icon: Sparkles, desc: "Tvorba, nápady, řešení, výraz.", develops: "Tvorbu, nápady, řešení problémů a vlastní výraz.", areas: ["Tvorba", "Nápady", "Řešení", "Výraz"] },
  { id: "samostatnost", name: "Samostatnost", color: "#06b6d4", icon: Compass, desc: "Finance, práce, podnikavost, praktický život.", develops: "Finance, práci, podnikavost a praktické dovednosti.", areas: ["Finance", "Práce", "Podnikání", "Praktické dovednosti"] },
  { id: "prinos", name: "Přínos", color: "#6366f1", icon: Globe, desc: "Pomoc, sdílení, vliv, zlepšování světa.", develops: "Pomoc, sdílení, vliv a zlepšování světa.", areas: ["Pomoc", "Sdílení", "Vliv", "Dobrovolnictví"] },
];

export const getPath = (id) => PATHS.find((p) => p.id === id);

export const LABS = [
  { id: "food-nature", name: "Food & Nature", color: "#16a34a", icon: Sprout, desc: "Pěstování, jídlo, příroda, kompost." },
  { id: "circular", name: "Circular & Materials", color: "#0d9488", icon: Recycle, desc: "Recyklace, reuse, opravy, materiály." },
  { id: "maker", name: "Maker & Technology", color: "#0891b2", icon: Wrench, desc: "Technologie, výroba, řemeslo, inovace." },
  { id: "sport", name: "Sport & Challenge", color: "#ea580c", icon: Trophy, desc: "Sport, turnaje, outdoor, výzvy." },
  { id: "community", name: "Community & Social", color: "#db2777", icon: HeartHandshake, desc: "Komunita, pomoc, senioři, mezigenerační spolupráce." },
  { id: "life", name: "Life & Entrepreneurship", color: "#7c3aed", icon: Briefcase, desc: "Finance, práce, podnikání, praktický život." },
  { id: "self", name: "Self & Relationships", color: "#4f46e5", icon: UserRound, desc: "Sebepoznání, vztahy, komunikace." },
];

export const getLab = (id) => LABS.find((l) => l.id === id);

export const PROGRAMS = [
  { id: "family", name: "Pansofie Family", desc: "Rodinné mise, 7 cest dítěte, společné projekty.", icon: HeartHandshake },
  { id: "school", name: "Pansofie School", desc: "Třídy, učitelé, školní mise a projekty.", icon: BookOpen },
  { id: "youth", name: "Pansofie Youth", desc: "Mladí lidé, samostatné mise a týmy.", icon: Sparkles },
  { id: "community", name: "Pansofie Community", desc: "Sousedství, kluby, místní komunita.", icon: Users },
  { id: "generations", name: "Generations", desc: "Mezigenerační spolupráce a předávání.", icon: Globe },
];

export const ENTRY_ROLES = [
  { id: "dítě", label: "Dítě / mladý člověk", icon: Sparkles },
  { id: "rodina", label: "Rodič / rodina", icon: HeartHandshake },
  { id: "škola", label: "Učitel / škola", icon: BookOpen },
  { id: "mentor", label: "Mentor / odborník", icon: Compass },
  { id: "senior", label: "Senior", icon: Globe },
  { id: "organizace", label: "Firma / obec / organizace", icon: Briefcase },
];

export const PROCESS_STEPS = [
  { title: "Vyber misi", desc: "Vyber si konkrétní výzvu z oblasti, která tě zajímá.", detail: "Mise jsou jednotné — mají cíl, kroky, důkaz a reflexi. Není třeba řešit, kam co patří; systém to ví za tebe." },
  { title: "Udělej ji v realitě", desc: "Zkus to opravdu — v kuchyni, na zahradě, s lidmi.", detail: "Pansofie se neodehrává na obrazovce. Odehrává se v reálném světě, s reálnými lidmi a věcmi." },
  { title: "Vytvoř výsledek", desc: "Udělej něco hmatatelného: produkt, výpočet, akci.", detail: "Bez výsledku to není mise. Výsledek je důkaz, že jsi to opravdu udělal." },
  { title: "Reflektuj", desc: "Co jsi se naučil? Co fungovalo a co ne?", detail: "Krátká reflexe promění činnost v učení. Bez ní zůstává zkušenost jen zážitkem." },
  { title: "Rozviň svůj profil", desc: "Zkušenost se zapíše jako doložený rozvoj.", detail: "Do portfolia přibyje doložená zkušenost napříč cestami, které mise rozvíjí — ne abstraktní body." },
  { title: "Najdi další lidi/projekt", desc: "Připoj se k týmu nebo projektu ve svém okolí.", detail: "Každá zkušenost tě spojuje s lidmi, kteří táhnou stejným směrem. Růst pokračuje v komunitě." },
];

export const CURRENT_USER = {
  id: "u1",
  name: "Tereza Nováková",
  role: "Mentor & člen komunity",
  location: "Praha 6",
  intro: "Propojuji pěstování jídla, komunitu a vzdělávání. Rada předávám praktické zkušenosti a hledám tým na větší projekt.",
  interests: ["Pěstování", "Komunita", "Workshopy", "Vzdělávání"],
  paths: [
    { id: "zdravi", experiences: 8, missions: 5 },
    { id: "poznaní", experiences: 12, missions: 6 },
    { id: "charakter", experiences: 4, missions: 2 },
    { id: "vztahy", experiences: 9, missions: 4 },
    { id: "tvorivost", experiences: 11, missions: 7 },
    { id: "samostatnost", experiences: 6, missions: 3 },
    { id: "prinos", experiences: 7, missions: 4 },
  ],
  skills: ["Pěstování microgreens", "Vedení workshopů", "Kompostování", "Facilitace komunity"],
  offers: ["Workshop pěstování", "Mentoring pro začátečníky", "Zapojení do komunitní zahrady"],
  seeks: ["Tým na městskou zahradu", "Někdo na grafiku a finance"],
  availability: "Otevřená pro projekty a spolupráci",
  contactable: true,
  completedMissions: 31,
  projects: 4,
  portfolioItems: 9,
};

export const MISSIONS = [
  {
    id: "m1", name: "Vypěstuj své první microgreens", lab: "food-nature", paths: ["zdravi", "tvorivost", "prinos"], difficulty: "Lehká", time: "60 min + 7 dní růstu",
    why: "Pěstování jídla tě naučí starost, trpělivost a propojení s přírodou. A na konci máš čerstvý superfood.",
    task: "Vypěstuj si jednu misku microgreens (ředkvička nebo slunečnice), sklid ji a použij v jídle.",
    steps: ["Sežeň semínka, misku a substrát (nebo papírový ubrousek).", "Vysévej semínka rovnoměrně a lehce je zalij.", "Umísti misku na světlé místo, udržuj vlhkost 5–7 dní.", "Sklizeň: odstřihni nad substrátem, opláchni.", "Použij v jídle a vyfotografuj výsledek."],
    proof: "Fotografie před a po + krátké video sklizně.", reflection: "Co se dařilo? Co bys příště zlepšil? Jak chutnalo?", status: "next",
  },
  {
    id: "m2", name: "Naplánuj rodinný rozpočet na měsíc", lab: "life", paths: ["samostatnost", "poznaní"], difficulty: "Střední", time: "90 min",
    why: "Porozumění financím je základ samostatnosti. Vytvoříš reálný plán, který rodina může použít.", task: "Sestav přehled příjmů a výdajů rodiny na jeden měsíc a navrhni tři úspory.",
    steps: ["Seber všechny pravidelné příjmy a výdaje.", "Rozděl výdaje do kategorií (bydlení, jídlo, doprava, volný čas).", "Spočítej, kolik zůstává nebo chybí.", "Navrhni 3 konkrétní úspory bez ztráty kvality života."],
    proof: "Tabulka rozpočtu (dokument nebo fotografie) + seznam úspor.", reflection: "Co tě překvapilo? Kterou úsporu zkusíte jako první?", status: "available",
  },
  {
    id: "m3", name: "Zorganizuj komunitní úklid v okolí", lab: "community", paths: ["prinos", "vztahy", "charakter"], difficulty: "Střední", time: "3 hodiny",
    why: "Přínos začíná nablízku. Spojíš lidi a zlepšíš místo, kde žiješ.", task: "Zorganizuj minimálně 1hodinový úklid okolí s alespoň 3 lidmi.",
    steps: ["Vyber lokalitu a termín.", "Pozvi sousedy a přátele (zpráva, plakát).", "Zajisti rukavice a pytle (obejdi obecní úřad nebo firmu).", "Proveď úklid, setřiďte a odvezte odpad.", "Vyfotografujte před a po."],
    proof: "Fotografie akce + počet účastníků + objem sesbíraného odpadu.", reflection: "Kdo se přidal? Co byste příště zorganizovali společně?", status: "available",
  },
  {
    id: "m4", name: "Postav jednoduchou solární nabíječku", lab: "maker", paths: ["tvorivost", "samostatnost", "poznaní"], difficulty: "Těžká", time: "4 hodiny",
    why: "Spojíš elektroniku, řemeslo a pochopení energie ve funkční věci.", task: "Sestav funkční solární nabíječku pro telefon z připravených součástek.",
    steps: ["Seznam se se schématem a součástkami.", "Připájej spoje podle návodu.", "Otestuj výstupní napětí multimetrem.", "Připoj k telefonu a nabíjej na slunci."],
    proof: "Funkční zařízení + fotografie + krátké video nabíjení.", reflection: "Kde jsi narazil? Jaké reálné využití by to mohlo mít?", status: "available",
  },
  {
    id: "m5", name: "Oprav rozbitý předmět místo nákupu nového", lab: "circular", paths: ["samostatnost", "prinos", "charakter"], difficulty: "Lehká", time: "45 min",
    why: "Oprava prodlužuje život věcí a šetří zdroje. Naučíš se vidět věci jinak.", task: "Najdi doma rozbitý předmět a oprav ho do funkčního stavu.",
    steps: ["Vyber předmět a zjisti, co je rozbité.", "Najdi návod nebo postup na opravu.", "Sežeň náhradní díl nebo alternativu.", "Oprav a otestuj funkčnost."],
    proof: "Fotografie před a po + popis opravy.", reflection: "Bylo to těžší než koupit nové? Co jsi se naučil?", status: "available",
  },
  {
    id: "m6", name: "Zorganizuj přátelský sportovní turnaj", lab: "sport", paths: ["vztahy", "charakter", "zdravi"], difficulty: "Střední", time: "2 hodiny",
    why: "Pohyb a sdílená výzva budují vztahy i charakter.", task: "Zorganizuj malý turnaj (např. nohejbal) pro 6–12 lidí.",
    steps: ["Dohodni hru, termín a hřiště.", "Sestav týmy a pravidla.", "Zorganizuj turnaj a jednoduché občerstvení.", "Vyfoť turnaj a sdílej výsledky."],
    proof: "Fotografie turnaje + seznam účastníků + výsledky.", reflection: "Jak se lidé bavili? Kdo by chtěl znovu?", status: "available",
  },
];

export const getMission = (id) => MISSIONS.find((m) => m.id === id);

export const PROJECTS = [
  { id: "p1", name: "Městská zahrada Pankrác", lab: "food-nature", goal: "Vytvořit komunitní zahradu, která produkuje čerstvou zeleninu pro 30 domácností a vzdělává děti.", status: "Hledá členy", members: 8, mentors: 2, roles: ["Zahradník", "Koordinátor", "Grafik", "Finance"], seeking: ["Grafik na vizuál kampaně", "Člověk na finance a rozpočet"], paths: ["zdravi", "tvorivost", "prinos", "samostatnost"], currentMissions: ["m1", "m5"], results: "První záhonky osázeny, 12 domácností přihlášeno.", location: "Praha 4 — Pankrác" },
  { id: "p2", name: "Repair café Smíchov", lab: "circular", goal: "Pravidelné setkání, kde lidé společně opravují rozbité věci a učí se řemeslu.", status: "Příprava", members: 5, mentors: 1, roles: ["Opravář", "Koordinátor", "PR"], seeking: ["Opravář elektro", "Člověk na PR a sociální sítě"], paths: ["samostatnost", "prinos", "charakter", "tvorivost"], currentMissions: ["m5"], results: "Dva úspěšné pilotní dílny, 23 opravených předmětů.", location: "Praha 5 — Smíchov" },
  { id: "p3", name: "Robotický kroužek pro děti", lab: "maker", goal: "Děti 10–14 let se naučí stavět a programovat jednoduché roboty přes reálné mise.", status: "Běží", members: 12, mentors: 3, roles: ["Mentor", "Asistent", "Organizátor"], seeking: ["Mentor na programování", "Asistent na víkendy"], paths: ["tvorivost", "samostatnost", "poznaní"], currentMissions: ["m4"], results: "3 dokončené mise, 2 funkční roboty, výstava ve škole.", location: "Brno — Královo Pole" },
  { id: "p4", name: "Mezigenerační komunitní den", lab: "community", goal: "Spojit seniory a mladé lidi přes společné mise a předávání zkušeností.", status: "Hledá členy", members: 6, mentors: 2, roles: ["Facilitátor", "Fotograf", "Koordinátor"], seeking: ["Facilitátor pro seniory", "Fotograf akce"], paths: ["prinos", "vztahy", "charakter", "poznaní"], currentMissions: ["m3"], results: "Plán akce hotový, 4 senioři přihlášeni.", location: "Plzeň — centrum" },
];

export const getProject = (id) => PROJECTS.find((p) => p.id === id);

export const MEMBERS = [
  { id: "u2", name: "Jakub Dvořák", role: "Mladý člověk", location: "Brno", paths: ["samostatnost", "poznaní", "tvorivost"], interests: ["Technologie", "Finance", "Robotika"], offers: ["Programování", "3D tisk"], seeks: ["Mentor na podnikání", "Tým na projekt"], availability: "Otevřený pro týmy", completedMissions: 14, projects: 2 },
  { id: "u3", name: "Rodina Procházkových", role: "Rodina (2+2)", location: "Plzeň", paths: ["zdravi", "vztahy", "prinos"], interests: ["Pěstování", "Komunita", "Sport"], offers: ["Zkušenosti s pěstováním", "Organizace akcí"], seeks: ["Jinou rodinu na společné mise"], availability: "Víkendy", completedMissions: 22, projects: 3 },
  { id: "u4", name: "Marek Svoboda", role: "Mentor — Maker & Tech", location: "Praha 8", paths: ["tvorivost", "samostatnost", "poznaní"], interests: ["Elektronika", "Řemeslo", "Vzdělávání"], offers: ["Mentoring robotiky", "Workshopy elektroniky"], seeks: ["Projekt pro děti"], availability: "Otevřený pro mentoring", completedMissions: 41, projects: 6 },
  { id: "u5", name: "Lenka Černá", role: "Senior + komunita", location: "Praha 2", paths: ["vztahy", "prinos", "charakter"], interests: ["Předávání zkušeností", "Komunita", "Zahrada"], offers: ["Zkušenosti s výchovou", "Facilitace"], seeks: ["Mladé lidi na mezigenerační mise"], availability: "Dopoledne", completedMissions: 28, projects: 4 },
  { id: "u6", name: "Ondřej Král", role: "Mladý člověk", location: "Ostrava", paths: ["sport", "charakter", "zdravi"], interests: ["Sport", "Outdoor", "Výzvy"], offers: ["Organizace turnajů", "Tréninkové plány"], seeks: ["Tým na sportovní výzvu"], availability: "Večery", completedMissions: 9, projects: 1 },
  { id: "u7", name: "Zuzana Malá", role: "Učitelka / škola", location: "Hradec Králové", paths: ["poznaní", "vztahy", "tvorivost"], interests: ["Vzdělávání", "Projektové učení", "Příroda"], offers: ["Třída pro pilotní mise", "Zkušenosti s PBL"], seeks: ["Mentory do tříd", "Projekty pro děti"], availability: "Školní rok", completedMissions: 33, projects: 5 },
];

export const getMember = (id) => MEMBERS.find((m) => m.id === id) || CURRENT_USER;

export const OPPORTUNITIES = [
  { type: "project", title: "Projekt Městská zahrada Pankrác hledá grafika a člověka na finance", desc: "Rozvíjí Tvořivost + Samostatnost + Přínos. Odpovídá tvému profilu a lokalitě.", cta: "Zobrazit projekt", to: "/projekt/p1", paths: ["tvorivost", "samostatnost", "prinos"] },
  { type: "event", title: "Komunitní setkání Pansofie Praha — čtvrtek 18:00", desc: "Seznam se s lidmi z tvého okolí a najdi tým na misi.", cta: "Zaregistrovat", to: "/sit", paths: ["vztahy", "prinos"] },
  { type: "mentor", title: "Vhodný mentor: Marek Svoboda (Maker & Tech)", desc: "Nabízí mentoring robotiky a workshopy elektroniky.", cta: "Zobrazit profil", to: "/sit", paths: ["tvorivost", "samostatnost"] },
  { type: "challenge", title: "Místní výzva: oprav 3 věci místo nákupu nových", desc: "Circular & Materials — úkol pro tvoji komunitu v Praze 6.", cta: "Zahájit misi", to: "/mise/m5", paths: ["samostatnost", "prinos", "charakter"] },
];

export const EVENTS = [
  { id: "e1", name: "Komunitní setkání Pansofie Praha", date: "13. 8.", time: "18:00", location: "Praha 6", lab: "community", attendees: 24, capacity: 40, desc: "Seznam se s lidmi z okolí a najdi tým na misi." },
  { id: "e2", name: "Repair café — opravárna", date: "16. 8.", time: "10:00", location: "Praha 5", lab: "circular", attendees: 12, capacity: 25, desc: "Společně opravíme rozbité věci a naučíme se řemeslu." },
  { id: "e3", name: "Robotický kroužek — otevřená hodina", date: "20. 8.", time: "16:00", location: "Brno", lab: "maker", attendees: 14, capacity: 20, desc: "Přijď si vyzkoušet stavbu a programování robotů." },
  { id: "e4", name: "Mezigenerační komunitní den", date: "24. 8.", time: "14:00", location: "Plzeň", lab: "community", attendees: 18, capacity: 50, desc: "Senioři a mladí lidé spojení přes společné mise." },
  { id: "e5", name: "Sportovní turnaj v nohejbalu", date: "28. 8.", time: "17:00", location: "Ostrava", lab: "sport", attendees: 20, capacity: 24, desc: "Přátelský turnaj pro 6–12 lidí. Pohyb a sdílená výzva." },
];

export const CONVERSATIONS = [
  { id: "c1", name: "Marek Svoboda", role: "Mentor — Maker & Tech", last: "Ahoj, viděl jsem tvůj zájem o robotiku. Můžeme spojit mise?", time: "10:24", unread: 2 },
  { id: "c2", name: "Rodina Procházkových", role: "Rodina", last: "Měli bychom spojit rodinné mise s pěstováním.", time: "Včera", unread: 0 },
  { id: "c3", name: "Zuzana Malá", role: "Učitelka", last: "Pilotní mise ve třídě — kdy se můžeme potkat?", time: "Po", unread: 1 },
  { id: "c4", name: "Tým: Městská zahrada Pankrác", role: "Projekt", last: "Potřebujeme grafika na kampaň. Máš někoho?", time: "Út", unread: 0 },
];

export const ADMIN_USERS = [
  { id: "u1", name: "Tereza Nováková", role: "Mentor", location: "Praha 6", status: "Aktivní", missions: 31 },
  { id: "u2", name: "Jakub Dvořák", role: "Mladý člověk", location: "Brno", status: "Aktivní", missions: 14 },
  { id: "u3", name: "Marek Svoboda", role: "Mentor", location: "Praha 8", status: "Aktivní", missions: 41 },
  { id: "u4", name: "Lenka Černá", role: "Senior", location: "Praha 2", status: "Čeká na ověření", missions: 0 },
  { id: "u5", name: "Zuzana Malá", role: "Učitelka", location: "Hradec Králové", status: "Aktivní", missions: 33 },
  { id: "u6", name: "Ondřej Král", role: "Mladý člověk", location: "Ostrava", status: "Aktivní", missions: 9 },
];

export const TEAMS = [
  { id: "t1", name: "Městská zahrada Pankrác", members: 8, project: "Městská zahrada Pankrác", status: "Aktivní" },
  { id: "t2", name: "Repair café Smíchov", members: 5, project: "Repair café Smíchov", status: "Příprava" },
  { id: "t3", name: "Robotický kroužek", members: 12, project: "Robotický kroužek pro děti", status: "Aktivní" },
  { id: "t4", name: "Mezigenerační den", members: 6, project: "Mezigenerační komunitní den", status: "Příprava" },
];

export const ORGANIZATIONS = [
  { id: "o1", name: "ZŠ Pankrác", type: "Škola", location: "Praha 4", members: 120, status: "Aktivní" },
  { id: "o2", name: "Komunitní centrum Smíchov", type: "Obec / centrum", location: "Praha 5", members: 45, status: "Aktivní" },
  { id: "o3", name: "Sousedská zahrada Plzeň", type: "Komunita", location: "Plzeň", members: 30, status: "Aktivní" },
  { id: "o4", name: "TechLab Brno", type: "Firma", location: "Brno", members: 18, status: "Čeká na schválení" },
];

export const MODERATION_ITEMS = [
  { id: "mod1", type: "Nahlášený komentář", context: "Projekt: Městská zahrada Pankrác", author: "Anonym", status: "Ke schválení" },
  { id: "mod2", type: "Nový projekt", context: "Sousedská knihovnička", author: "Jakub Dvořák", status: "Ke schválení" },
  { id: "mod3", type: "Profil k ověření", context: "Lenka Černá", author: "Systém", status: "Ke schválení" },
  { id: "mod4", type: "Úprava mise", context: "Oprav rozbitý předmět", author: "Marek Svoboda", status: "Návrh" },
];
