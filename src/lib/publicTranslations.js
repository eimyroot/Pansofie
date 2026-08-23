const EN = new Map(Object.entries({
  // Navigation / shared actions
  "Jak to funguje": "How it works",
  "Pro koho": "For whom",
  "Pro školy": "For schools",
  "Pro partnery": "For partners",
  "O Pansofii": "About Pansofie",
  "Přidejte se": "Join us",
  "Přihlásit": "Sign in",
  "Přihlášení": "Sign in",
  "Vyzkoušet 60 s": "Try 60 sec",
  "Vyzkoušet Pansofii za 60 sekund": "Try Pansofie in 60 seconds",
  "Vyzkoušet PANSOFIEDIT": "Try PANSOFIEDIT",
  "Jak se zapojit": "How to join",
  "Bezpečnost dětí": "Child safety",
  "Soukromí": "Privacy",
  "Podmínky": "Terms",
  "O projektu": "About the project",
  "O Pansofii a kde jsme dnes": "About Pansofie and where we are today",
  "Důvěra": "Trust",
  "Otevřít menu": "Open menu",
  "Zavřít menu": "Close menu",
  "Pansofie — domů": "Pansofie — home",

  // Shared method / network vocabulary
  "Potřeba": "Need",
  "Akce": "Action",
  "Důkaz": "Evidence",
  "Reflexe": "Reflection",
  "Ověření": "Verification",
  "Důvěra": "Trust",
  "Další krok": "Next step",
  "Zkušenost": "Experience",
  "Metoda": "Method",
  "Pilot": "Pilot",
  "Stav": "Status",
  "Vy": "You",
  "Role": "Role",
  "Bezpečí": "Safety",
  "Kontext": "Context",
  "Lidé": "People",
  "Výzva": "Challenge",
  "Výstup": "Output",
  "Zpětná vazba": "Feedback",
  "Rozhodnutí": "Decision",
  "Co se stalo potom": "What happened next",
  "Dlouhodobý dopad": "Long-term impact",
  "Hranice": "Boundaries",
  "Žák": "Learner",
  "Rodina": "Family",
  "Škola": "School",
  "Mentor": "Mentor",
  "Partner": "Partner",
  "Komunita": "Community",
  "Účel": "Purpose",
  "Minimum dat": "Data minimisation",
  "Přístup": "Access",
  "Evidence": "Evidence",
  "Pravidla": "Rules",
  "Data": "Data",
  "Odpovědnost": "Responsibility",
  "JAK SPOLU ČÁSTI SOUVISEJÍ": "HOW THE PARTS CONNECT",
  "CO TEĎ PROUDÍ...": "WHAT FLOWS NOW...",
  "ZÍSKÁVÁ": "RECEIVES",
  "PŘINÁŠÍ": "CONTRIBUTES",
  "VIDÍ": "CAN SEE",
  "NEVIDÍ / NEMÁ AUTOMATICKY": "CANNOT SEE / DOES NOT GET AUTOMATICALLY",
  "PŘÍKLADY ZKUŠENOSTÍ": "EXAMPLE EXPERIENCES",

  // Home
  "Učení, které pokračuje v reálném světě": "Learning that continues in the real world",
  "Poznej sebe.": "Know yourself.",
  "Tvoř s druhými.": "Create with others.",
  "Zlepšuj svět.": "Improve the world.",
  "Pansofie propojuje učení se skutečnou zkušeností. Mladý člověk řeší konkrétní problém, něco udělá nebo vytvoří, doloží svou práci, zamyslí se nad ní a zjistí, co může udělat dál.": "Pansofie connects learning with real experience. A young person tackles a concrete problem, does or creates something, documents the work, reflects on it and discovers what to do next.",
  "Takové zkušenosti říkáme v Pansofii": "In Pansofie, we call these experiences",
  "Kolem jedné mohou spolupracovat žák, škola, rodina, odborník, partner nebo komunita. Každý má jinou roli a vidí jen informace, které pro ni potřebuje.": "One Experience can connect a learner, school, family, expert, partner or community. Each has a different role and sees only the information needed for that role.",
  "Interaktivní ukázka nic neodesílá ani neukládá na server.": "The interactive demo does not send or store anything on a server.",
  "Škola drží bezpečný rámec": "The school provides a safe framework",
  "Rodina přidává životní kontext": "The family adds real-life context",
  "Partner hodnotí výstup, nikdy člověka": "The partner reviews the output, never the person",
  "Jedna skutečná zkušenost": "One real experience",
  "Zlepši svou školu": "Improve your school",
  "Ukázkový scénář": "Example scenario",
  "Začíná konkrétní potřebou.": "It starts with a concrete need.",
  "Navazuje na předchozí krok.": "It builds on the previous step.",
  "Zůstává soukromý záznam ověřené zkušenosti.": "It remains a private record of a verified experience.",
  "Dokončená aktivita ještě není důkaz skutečného dopadu.": "A completed activity is not yet proof of real impact.",
  "Pansofie zvlášť sleduje, co člověk udělal, co vytvořil, zda se výsledek použil a co se potom opravdu změnilo.": "Pansofie distinguishes what a person did, what they created, whether the result was used and what actually changed afterwards.",
  "Zkušenost je uprostřed. Vyberte část mapy a podívejte se, co s ní souvisí.": "Experience is at the centre. Choose a part of the map and see what connects to it.",
  "Jedna zkušenost. Šest různých rolí. Každá má jasný důvod, proč je tu.": "One Experience. Six different roles. Each has a clear reason to be here.",
  "Jednoduchá logika: něco objevit, udělat, pochopit a posunout dál.": "A simple logic: discover something, do it, understand it and carry it forward.",
  "Různé životní situace": "Different life situations",
  "Sedm cest pomáhá pojmenovat, v čem se člověk během zkušenosti posouvá.": "Seven paths help describe how a person develops through an Experience.",
  "První pilot má ověřit celý způsob spolupráce, ne jen software.": "The first pilot should validate the whole way of working, not just the software.",

  // How it works
  "Od skutečné potřeby k ověřené zkušenosti.": "From a real need to a verified experience.",
  "Metoda je uprostřed. Vyberte část mapy a podívejte se, co s ní souvisí.": "The method is at the centre. Choose a part of the map and see what connects to it.",

  // Roles
  "Jedna skutečná zkušenost může propojit více lidí. Každý ale vidí jen to, co pro svou roli potřebuje.": "One real Experience can connect several people. Each person sees only what they need for their role.",

  // Pilot
  "Ne další školní aplikace. Tři skutečné zkušenosti, které se dají doložit.": "Not another school app. Three real Experiences that can be documented.",
  "Pilot je uprostřed. Vyberte část mapy a podívejte se, co s ní souvisí.": "The pilot is at the centre. Choose a part of the map and see what connects to it.",

  // Partner
  "Přineste skutečný problém. Pomozte z něj vytvořit skutečnou zkušenost.": "Bring a real problem. Help turn it into a real Experience.",
  "Zkušenost je uprostřed. Vyberte část mapy a podívejte se, co s ní souvisí.": "Experience is at the centre. Choose a part of the map and see what connects to it.",

  // About
  "Učení má větší smysl, když se propojí se skutečným životem.": "Learning matters more when it connects with real life.",
  "Stav je uprostřed. Vyberte část mapy a podívejte se, co s ní souvisí.": "Status is at the centre. Choose a part of the map and see what connects to it.",
  "Pansofie se inspiruje pansofickou snahou Jana Amose Komenského": "Pansofie draws inspiration from Jan Amos Comenius and his pansophic effort",
  "Dnešní Pansofie je ale náš současný produkt": "Today's Pansofie, however, is our contemporary product",
  "Komenskému nepřipisujeme dnešní software, umělou inteligenci, herní mechaniky, skóre ani současnou architekturu Pansofie.": "We do not attribute today's software, artificial intelligence, game mechanics, scoring or the current Pansofie architecture to Comenius.",

  // Join
  "Pansofie potřebuje lidi, kteří přinesou něco skutečného.": "Pansofie needs people who bring something real.",
  "Vyzkoušejte Pansofii na konkrétním příkladu.": "Try Pansofie on a concrete example.",
  "Vyberte roli. Další otázky se přizpůsobí.": "Choose a role. The next questions will adapt.",
  "Veřejný web zatím nesbírá kontaktní údaje": "The public website does not collect contact details yet",

  // PansofieGO
  "PansofieGO · experimentální vrstva": "PansofieGO · experimental layer",
  "Rozhoduj se v souvislostech.": "Make decisions in context.",
  "Pak to ověř v realitě.": "Then verify them in the real world.",
  "PansofieGO je bezpečný prostor pro nácvik rozhodování před skutečnou zkušeností. Neříká, jaký jsi člověk. Ukazuje, co může způsobit konkrétní volba.": "PansofieGO is a safe space to practise decision-making before a real Experience. It does not tell you what kind of person you are. It shows what a particular choice may cause.",
  "nic se neukládá": "nothing is stored",
  "hodnotí se scénář, ne člověk": "the scenario is evaluated, not the person",
  "bez AI verdiktu": "no AI verdict",
  "Spustit scénář": "Start scenario",
  "Jak funguje Pansofie": "How Pansofie works",
  "OD CHAOSU K ODPOVĚDNÉMU KROKU": "FROM CHAOS TO A RESPONSIBLE STEP",
  "Analýza": "Analysis",
  "Rozhodnutí": "Decision",
  "Důsledky": "Consequences",
  "Reflexe": "Reflection",
  "Co víme, co nevíme a kde je skutečné napětí?": "What do we know, what do we not know, and where is the real tension?",
  "Vyber jednu strategii a přijmi její kompromisy.": "Choose one strategy and accept its trade-offs.",
  "Sleduj krátký i dlouhý dopad napříč čtyřmi vrstvami.": "Track short- and long-term effects across four layers.",
  "Polož si otázky, které vrátí simulaci zpět do reality.": "Ask questions that bring the simulation back to reality.",
  "Simulace není důkaz.": "A simulation is not evidence.",
  "Smyslem je připravit lepší otázky a rozhodnutí pro skutečnou misi.": "Its purpose is to prepare better questions and decisions for a real mission.",
  "KROK 1 · ANALÝZA": "STEP 1 · ANALYSIS",
  "KROK 2 · ROZHODNUTÍ": "STEP 2 · DECISION",
  "KROK 3 · DŮSLEDKY": "STEP 3 · CONSEQUENCES",
  "KROK 4 · REFLEXE": "STEP 4 · REFLECTION",
  "Nejdřív odděl fakta od přání.": "First separate facts from wishes.",
  "Co víme": "What we know",
  "Kde je napětí": "Where the tension is",
  "Rozhodovací otázka": "Decision question",
  "Jdu rozhodnout": "Make a decision",
  "Vyber jednu strategii. Žádná není bez ceny.": "Choose one strategy. None comes without a cost.",
  "Neexistuje skrytá „správná osobnostní odpověď“. Porovnáváme pouze důsledky konkrétní volby.": "There is no hidden ‘correct personality answer’. We compare only the consequences of a concrete choice.",
  "Zpět k analýze": "Back to analysis",
  "Ukázat důsledky": "Show consequences",
  "Harmony scénáře": "Scenario harmony",
  "Rovnováha této volby, ne hodnocení člověka.": "Balance of this choice, not an evaluation of a person.",
  "Jdu reflektovat": "Reflect",
  "Moje pracovní reflexe": "My working reflection",
  "Začít znovu": "Start again",

  // Generic / auth
  "E-mail": "Email",
  "Heslo": "Password",
  "Přihlásit se": "Sign in",
  "Registrovat se": "Register",
  "Vytvořit účet": "Create account",
  "Zapomenuté heslo": "Forgot password",
  "Obnovit heslo": "Reset password",
  "Zpět": "Back",
  "Pokračovat": "Continue",
  "Odeslat": "Send",
  "Načítám…": "Loading…",
  "Chyba": "Error",
  "Hotovo": "Done"
}));

const PATTERNS = [
  [/^(\d+) ze 100$/, "$1 of 100"],
  [/^(\d+)\/100$/, "$1/100"],
  [/^Krok (\d+) z (\d+)$/, "Step $1 of $2"],
  [/^Krok (\d+)\/(\d+)$/, "Step $1/$2"],
];

export function translatePublicText(value, locale) {
  if (locale !== "en" || typeof value !== "string") return value;
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  const core = value.trim();
  if (!core) return value;

  const exact = EN.get(core);
  if (exact) return `${leading}${exact}${trailing}`;

  for (const [pattern, replacement] of PATTERNS) {
    if (pattern.test(core)) return `${leading}${core.replace(pattern, replacement)}${trailing}`;
  }

  return value;
}

export const PUBLIC_ENGLISH_TRANSLATION_COUNT = EN.size;
