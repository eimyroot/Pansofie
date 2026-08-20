import React, { useMemo } from "react";
import {
  Activity,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDot,
  Compass,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Lightbulb,
  LockKeyhole,
  MessageSquareText,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import "@/reference-network-r5.css";

const STAGE_W = 1000;
const STAGE_H = 620;
const CORE = { x: 500, y: 310 };
const SLOTS = [
  { x: 500, y: 88 },
  { x: 790, y: 205 },
  { x: 790, y: 430 },
  { x: 500, y: 540 },
  { x: 210, y: 430 },
  { x: 210, y: 205 },
];

const RELATIONSHIPS = {
  home: {
    "Potřeba": ["Akce", "Důkaz"],
    "Akce": ["Potřeba", "Důkaz"],
    "Důkaz": ["Akce", "Ověření"],
    "Reflexe": ["Důkaz", "Passport"],
    "Ověření": ["Důkaz", "Passport"],
    "Passport": ["Reflexe", "Ověření"],
  },
  method: {
    "Potřeba": ["Akce", "Důkaz"],
    "Akce": ["Potřeba", "Důkaz"],
    "Důkaz": ["Akce", "Ověření"],
    "Reflexe": ["Důkaz", "Transfer"],
    "Ověření": ["Důkaz", "Transfer"],
    "Transfer": ["Reflexe", "Ověření"],
  },
  roles: {
    "Žák": ["Rodina", "Škola", "Mentor"],
    "Rodina": ["Žák", "Škola"],
    "Škola": ["Žák", "Rodina", "Partner", "Komunita"],
    "Mentor": ["Žák", "Škola"],
    "Partner": ["Škola", "Komunita"],
    "Komunita": ["Škola", "Partner"],
  },
  pilot: {
    "Škola": ["Experience", "Žák", "Ověření"],
    "Experience": ["Škola", "Žák", "Důkaz"],
    "Žák": ["Experience", "Rodina", "Důkaz"],
    "Rodina": ["Žák", "Škola"],
    "Důkaz": ["Experience", "Ověření"],
    "Ověření": ["Škola", "Důkaz"],
  },
  partner: {
    "Challenge": ["Výstup", "Review"],
    "Výstup": ["Challenge", "Review"],
    "Review": ["Výstup", "Rozhodnutí"],
    "Rozhodnutí": ["Review", "Outcome"],
    "Outcome": ["Rozhodnutí", "Hranice"],
    "Hranice": ["Challenge", "Review", "Outcome"],
  },
  status: {
    "Implementace": ["Testování", "Pilot"],
    "Testování": ["Implementace", "Pilot"],
    "Pilot": ["Testování", "Outcome"],
    "Outcome": ["Pilot", "Impact"],
    "Impact": ["Outcome", "Další krok"],
    "Další krok": ["Pilot", "Impact"],
  },
};

const DETAIL_OVERRIDES = {
  roles: {
    "Žák": ["Skutečnou zkušenost, vedení a soukromý Passport.", "Pohled, otázky, práci v týmu, výstup, důkaz a vlastní reflexi.", "Přínos se nikdy nepřevádí na skóre člověka ani předpověď jeho budoucnosti."],
    "Rodina": ["Bezpečnou a smysluplnou roli v rozvoji dítěte bez narušení soukromí.", "Reálný kontext, podnět a pohled z domova — ne hodnocení.", "Rodina automaticky nevidí soukromou reflexi žáka."],
    "Škola": ["Doložený průběh a ověřitelnou práci bez univerzálního profilu dítěte.", "Bezpečný rámec, pedagogické vedení a oddělené ověření.", "Škola ověřuje práci; Pansofie z toho nevytváří skóre lidské hodnoty."],
    "Mentor": ["Jasně ohraničené odborné zapojení do konkrétní Experience.", "Expertizu, otázky a zpětnou vazbu k doložené práci.", "Mentor nemá neomezený soukromý kanál k dítěti."],
    "Partner": ["Reálný důvod se zapojit a možnost vidět výsledek v praxi.", "Skutečný problém, kontext a review bounded výstupu.", "Firma nekupuje pozitivní výsledek ani přístup k soukromým datům."],
    "Komunita": ["Místní potřebu, kontext a možnost výsledek vyzkoušet nebo použít.", "Reálné prostředí, kde má práce smysl a dopad se teprve ověřuje.", "Zapojení se řídí konkrétní Experience, ne plošnou kampaní."],
  },
  partner: {
    "Challenge": ["Jasné zadání s očekávaným bounded výstupem.", "Reálný problém a kontext, ne marketingový slib.", "Challenge nedává Partnerovi přístup k soukromému profilu člověka."],
    "Výstup": ["Konkrétní artefakt, který lze posoudit proti briefu.", "Doloženou práci v bezpečném rozsahu.", "Výstup není automaticky Outcome ani Impact."],
    "Review": ["Transparentní zpětnou vazbu k práci.", "Hodnocení výstupu proti zadání.", "Partner hodnotí výstup, nikdy lidskou hodnotu."],
    "Rozhodnutí": ["Jasný další krok: NOT ADOPT / EXPLORE FURTHER / PILOT.", "Odpovědné rozhodnutí bez automatického pozitivního výsledku.", "PILOT je rozhodnutí o dalším kroku, ne důkaz Impactu."],
    "Outcome": ["Možnost doložit, co se po použití skutečně změnilo.", "Evidence reálného použití místo dojmu.", "Outcome se netvrdí bez skutečné evidence."],
    "Hranice": ["Jasnou důvěru v to, co Partner smí a nesmí vidět.", "Minimální data nutná pro konkrétní účel.", "Žádná soukromá reflexe, raw learner evidence ani Passport bez oprávnění."],
  },
};

function fallbackDetail(key, label) {
  const lower = label.toLocaleLowerCase("cs-CZ");
  if (/potřeba|challenge/.test(lower)) return ["Jasný důvod, proč má další práce smysl.", "Konkrétní kontext místo abstraktního zadání.", "Síť začíná účelem; ne sběrem dat bez důvodu."];
  if (/důkaz|výstup/.test(lower)) return ["Doložitelnou stopu skutečné práce.", "Konkrétní artefakt, měření nebo dokumentaci.", "Důkaz práce není automaticky důkaz dlouhodobého dopadu."];
  if (/ověření|review|test/.test(lower)) return ["Oddělenou kontrolu toho, co bylo doloženo.", "Zpětnou vazbu k práci a jasný další krok.", "Ověření neslouží k vytvoření skóre lidské hodnoty."];
  if (/reflexe/.test(lower)) return ["Vlastní význam a pojmenování toho, co člověk pochopil.", "Pohled na to, co fungovalo a co příště změnit.", "Soukromá reflexe není automatický report pro všechny role."];
  if (/passport/.test(lower)) return ["Soukromý záznam skutečné zkušenosti.", "Ověřenou návaznost na další krok.", "Passport je private-by-default a není veřejný žebříček člověka."];
  if (/impact/.test(lower)) return ["Teprve dlouhodobější důkaz skutečné změny.", "Outcome evidence, čas a kontext.", "Technická připravenost ani dokončená aktivita nejsou důkaz Impactu."];
  if (/pilot/.test(lower)) return ["Kontrolované ověření v reálném provozu.", "Kontext, účastníky a konkrétní pravidla.", "Pilot není automaticky důkaz pedagogického nebo dlouhodobého dopadu."];
  return ["Jasnou hodnotu z konkrétního vztahu v síti.", `Kontext a práci spojenou s uzlem ${label}.`, "Každý přístup zůstává účelově omezený a vysvětlitelný."];
}

function detailFor(networkKey, label) {
  return DETAIL_OVERRIDES[networkKey]?.[label] || fallbackDetail(networkKey, label);
}

function iconFor(label) {
  const lower = label.toLocaleLowerCase("cs-CZ");
  if (/žák|passport/.test(lower)) return GraduationCap;
  if (/rodina/.test(lower)) return HeartHandshake;
  if (/škola/.test(lower)) return Building2;
  if (/mentor/.test(lower)) return UserRoundCheck;
  if (/partner|firma/.test(lower)) return BriefcaseBusiness;
  if (/komunita|obec/.test(lower)) return Landmark;
  if (/potřeba|challenge/.test(lower)) return Lightbulb;
  if (/akce|experience/.test(lower)) return Sparkles;
  if (/důkaz|výstup/.test(lower)) return FileCheck2;
  if (/reflexe/.test(lower)) return MessageSquareText;
  if (/ověření|review|test/.test(lower)) return CheckCircle2;
  if (/hranice|soukromí|bezpe/.test(lower)) return ShieldCheck;
  if (/outcome|impact/.test(lower)) return Target;
  if (/role|lidé/.test(lower)) return UsersRound;
  if (/přístup|data/.test(lower)) return LockKeyhole;
  if (/transfer|další|rozhodnutí/.test(lower)) return ArrowRight;
  if (/metoda|program/.test(lower)) return Compass;
  if (/implementace/.test(lower)) return Activity;
  return CircleDot;
}

function rotatedSlot(nodeIndex, activeIndex, count) {
  const normalized = (nodeIndex - activeIndex + count) % count;
  return SLOTS[normalized] || SLOTS[nodeIndex % SLOTS.length];
}

function lineStyle(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  return {
    left: `${(from.x / STAGE_W) * 100}%`,
    top: `${(from.y / STAGE_H) * 100}%`,
    width: `${(distance / STAGE_W) * 100}%`,
    transform: `rotate(${angle}deg)`,
  };
}

export default function ReferenceNetworkStage({ network, activeIndex = 0, onSelect }) {
  const nodes = network?.nodes || [];
  const safeIndex = Math.min(Math.max(activeIndex, 0), Math.max(nodes.length - 1, 0));
  const selectedLabel = nodes[safeIndex] || nodes[0] || "Experience";
  const relatedLabels = RELATIONSHIPS[network?.key]?.[selectedLabel] || [nodes[(safeIndex + 1) % nodes.length], nodes[(safeIndex + nodes.length - 1) % nodes.length]].filter(Boolean);
  const [receives, contributes, boundary] = detailFor(network?.key, selectedLabel);
  const SelectedIcon = iconFor(selectedLabel);

  const placements = useMemo(() => nodes.map((label, index) => ({
    label,
    index,
    slot: rotatedSlot(index, safeIndex, nodes.length),
  })), [nodes, safeIndex]);

  const selectedPlacement = placements.find((item) => item.index === safeIndex) || placements[0];
  const relatedPlacements = placements.filter((item) => relatedLabels.includes(item.label));

  return (
    <section className="reference-network-r5" data-network-key={network?.key || "public"} aria-label={`Interaktivní síť ${network?.core || "Pansofie"}`}>
      <div className="reference-network-r5__intro">
        <div>
          <p className="eyebrow">ŽIVÁ SÍŤ · INTERAKTIVNÍ MAPA</p>
          <h2>{network?.core || "Pansofie"} je střed. Vyber uzel a sleduj, co se mezi nimi skutečně propojí.</h2>
          <p>Aktivní vztah zesílí, související uzly se připojí a ostatní ustoupí. Síť vysvětluje mechanismus — ne nahrazuje obsah ani důkaz.</p>
        </div>
        <div className="reference-network-r5__legend" aria-label="Legenda sítě">
          <span><i data-kind="active" /> aktivní</span>
          <span><i data-kind="related" /> související</span>
          <span><i data-kind="quiet" /> ostatní</span>
        </div>
      </div>

      <div className="reference-network-r5__canvas">
        <div className="reference-network-r5__ambient" aria-hidden="true" />

        {placements.map((item) => {
          const isActive = item.index === safeIndex;
          return (
            <span
              key={`core-edge-${item.label}`}
              className="reference-network-r5__edge"
              data-active={isActive}
              data-related={relatedLabels.includes(item.label)}
              style={lineStyle(CORE, item.slot)}
              aria-hidden="true"
            />
          );
        })}

        {selectedPlacement && relatedPlacements.map((item) => (
          <span
            key={`cross-${selectedLabel}-${item.label}`}
            className="reference-network-r5__edge reference-network-r5__edge--cross"
            data-active="true"
            style={lineStyle(selectedPlacement.slot, item.slot)}
            aria-hidden="true"
          />
        ))}

        <div className="reference-network-r5__core" aria-hidden="true">
          <span><Network size={25} /></span>
          <strong>{network?.core || "Experience"}</strong>
        </div>

        {placements.map((item) => {
          const Icon = iconFor(item.label);
          const active = item.index === safeIndex;
          const related = relatedLabels.includes(item.label);
          return (
            <button
              key={item.label}
              type="button"
              className="reference-network-r5__node"
              data-reference-node={item.label}
              data-active={active}
              data-related={related}
              aria-pressed={active}
              style={{ left: `${(item.slot.x / STAGE_W) * 100}%`, top: `${(item.slot.y / STAGE_H) * 100}%` }}
              onMouseEnter={() => onSelect?.(item.index, { source: "hover" })}
              onFocus={() => onSelect?.(item.index, { source: "focus" })}
              onClick={() => onSelect?.(item.index, { source: "click" })}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div key={`${network?.key}-${selectedLabel}`} className="reference-network-r5__details" aria-live="polite">
        <article className="reference-network-r5__identity">
          <div className="reference-network-r5__identity-head">
            <span><SelectedIcon size={19} /></span>
            <div>
              <h3>{selectedLabel}</h3>
              <p>Aktivní uzel sítě</p>
            </div>
          </div>
          <p>{network?.core || "Experience"} zůstává centrem — vybraný uzel pouze mění, které vztahy právě potřebujeme vidět.</p>
        </article>

        <article className="reference-network-r5__detail-card">
          <span>ZÍSKÁVÁ</span>
          <p>{receives}</p>
        </article>

        <article className="reference-network-r5__detail-card">
          <span>PŘINÁŠÍ</span>
          <p>{contributes}</p>
        </article>

        <article className="reference-network-r5__detail-card reference-network-r5__detail-card--boundary">
          <span>HRANICE</span>
          <p>{boundary}</p>
        </article>
      </div>

      <div className="reference-network-r5__flowline" aria-label={`Aktivní tok z uzlu ${selectedLabel}`}>
        <span>CO TEĎ PROUDÍ Z {selectedLabel.toLocaleUpperCase("cs-CZ")}</span>
        <div>
          <b>{selectedLabel}</b>
          <ArrowRight size={14} />
          <em>{contributes}</em>
          {relatedLabels.slice(0, 2).map((label) => (
            <React.Fragment key={label}>
              <ArrowRight size={14} />
              <b>{label}</b>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
