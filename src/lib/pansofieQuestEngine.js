// PansofieGO R0 decision-scenario engine.
// Evaluates a scenario/decision, never a person. No persistence, profiling or AI verdicts.

export const IMPACT_LAYERS = [
  {
    id: "priroda",
    label: "Příroda",
    description: "Jak rozhodnutí působí na prostředí, zdroje a dlouhodobou udržitelnost.",
  },
  {
    id: "spolecnost",
    label: "Společnost",
    description: "Jak rozhodnutí ovlivní spolupráci, férovost, důvěru a místní komunitu.",
  },
  {
    id: "technologie",
    label: "Technologie",
    description: "Jak rozumně využívá nástroje, data a technická řešení bez samoúčelnosti.",
  },
  {
    id: "vedomi",
    label: "Vědomí",
    description: "Jak dobře scénář podporuje porozumění souvislostem, odpovědnost a reflexi.",
  },
];

export const QUESTS = [
  {
    id: "quest-komunitni-uklid-systemovy-dopad",
    missionId: "m3",
    title: "Komunitní úklid: co udělat, aby změna vydržela?",
    eyebrow: "PansofieGO · rozhodovací scénář",
    intro:
      "Jednorázově uklidit místo je užitečné. Těžší otázka zní: jak rozhodnout tak, aby se problém za měsíc nevrátil ve stejné podobě?",
    analysis: {
      facts: [
        "Lokalita se opakovaně zanáší odpadem po víkendech.",
        "Dobrovolníci mají omezený čas a nemohou uklízet každý týden.",
        "Obec umí pomoci s odvozem, ale potřebuje konkrétní podklady a odpovědnou kontaktní osobu.",
        "Digitální nástroje mohou pomoci s mapováním, samy ale nezmění chování lidí.",
      ],
      tensions: [
        "rychlý viditelný výsledek × dlouhodobá změna",
        "technické řešení × práce s lidmi",
        "minimum organizace × dostatek důkazů pro další rozhodnutí",
      ],
      question:
        "Která strategie vytvoří užitek teď, ale zároveň zvýší šanci, že další zásah už nebude muset vypadat stejně?",
    },
    choices: [
      {
        id: "rychly-uklid",
        title: "A · Rychlá akce",
        summary: "Svolat lidi, místo vyčistit, zdokumentovat výsledek a tím akci uzavřít.",
        rationale: "Nejrychlejší cesta k okamžitému a viditelnému zlepšení.",
        impact: { priroda: 74, spolecnost: 58, technologie: 28, vedomi: 48 },
        shortTerm: "Místo je rychle čisté a lidé vidí konkrétní výsledek.",
        longTerm: "Bez práce s příčinou je vysoká šance, že se problém vrátí.",
        tradeoff: "Nízká organizační náročnost za cenu slabšího dlouhodobého učení a prevence.",
      },
      {
        id: "mistni-system",
        title: "B · Místní systém",
        summary:
          "Úklid spojit s mapou problémových míst, krátkým rozhovorem se sousedy a dohodou s obcí na jednom navazujícím opatření.",
        rationale: "Kombinuje skutečnou akci, důkaz, spolupráci a jeden realistický další krok.",
        impact: { priroda: 82, spolecnost: 84, technologie: 72, vedomi: 80 },
        shortTerm: "Úklid proběhne a současně vzniknou použitelné podklady pro další rozhodnutí.",
        longTerm: "Komunita a obec mají větší šanci odstranit alespoň jednu příčinu opakovaného problému.",
        tradeoff: "Vyžaduje více koordinace, ale nezvětšuje projekt do neřiditelné kampaně.",
      },
      {
        id: "tech-first",
        title: "C · Technologický dohled",
        summary:
          "Postavit řešení hlavně na QR hlášeních, mapě, datech a automatických upozorněních na problematická místa.",
        rationale: "Vytváří přehled o problému a může zrychlit reakci na nové události.",
        impact: { priroda: 68, spolecnost: 46, technologie: 92, vedomi: 60 },
        shortTerm: "Vznikne přehledný datový obraz a jednoduchý mechanismus hlášení.",
        longTerm: "Bez lidí, odpovědnosti a navazujícího rozhodnutí může systém jen přesněji měřit stejný problém.",
        tradeoff: "Silný nástroj, ale riziko, že technologie nahradí rozhovor o příčinách a odpovědnosti.",
      },
    ],
    reflectionPrompts: [
      "Kdo z tvého rozhodnutí získá nejvíc a kdo ponese největší část práce?",
      "Který dopad se v první chvíli snadno přehlédne, ale může být důležitý za půl roku?",
      "Jaký jeden skutečný důkaz by ti ukázal, že zvolená strategie funguje i po skončení akce?",
    ],
  },
];

export function getQuest(id) {
  return QUESTS.find((quest) => quest.id === id) || null;
}

export function getQuestForMission(missionId) {
  return QUESTS.find((quest) => quest.missionId === missionId) || null;
}

export function computeScenarioHarmony(impactRatingsByLayer = {}) {
  const values = IMPACT_LAYERS.map(({ id }) => {
    const raw = Number(impactRatingsByLayer[id] ?? 0);
    return Math.min(100, Math.max(0, Number.isFinite(raw) ? raw : 0));
  });

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;

  // Higher average impact with lower imbalance scores better.
  // The score describes this scenario only; it is never a score of the person making the choice.
  return Math.max(0, Math.min(100, Math.round(mean - Math.sqrt(variance))));
}
