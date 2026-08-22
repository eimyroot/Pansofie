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
import { publicLabel } from "@/lib/publicCopyLabels";
import "@/reference-network-r5.css";
import "@/reference-network-r5-svg.css";

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
const ROLE_SLOT_INDEX = { Žák: 0, Rodina: 1, Škola: 2, Partner: 3, Komunita: 4, Mentor: 5 };

const RELATIONSHIPS = {
  home: {
    Potřeba: ["Akce", "Důkaz"],
    Akce: ["Potřeba", "Důkaz"],
    Důkaz: ["Akce", "Ověření"],
    Reflexe: ["Důkaz", "Passport"],
    Ověření: ["Důkaz", "Passport"],
    Passport: ["Reflexe", "Ověření"],
  },
  method: {
    Potřeba: ["Akce", "Důkaz"],
    Akce: ["Potřeba", "Důkaz"],
    Důkaz: ["Akce", "Ověření"],
    Reflexe: ["Důkaz", "Transfer"],
    Ověření: ["Důkaz", "Transfer"],
    Transfer: ["Reflexe", "Ověření"],
  },
  roles: {
    Žák: ["Rodina", "Škola", "Mentor"],
    Rodina: ["Žák", "Škola"],
    Škola: ["Žák", "Rodina", "Partner", "Komunita"],
    Partner: ["Škola", "Komunita"],
    Komunita: ["Škola", "Partner"],
    Mentor: ["Žák", "Škola"],
  },
  pilot: {
    Škola: ["Experience", "Žák", "Ověření"],
    Experience: ["Škola", "Žák", "Důkaz"],
    Žák: ["Experience", "Rodina", "Důkaz"],
    Rodina: ["Žák", "Škola"],
    Důkaz: ["Experience", "Ověření"],
    Ověření: ["Škola", "Důkaz"],
  },
  partner: {
    Challenge: ["Výstup", "Review"],
    Výstup: ["Challenge", "Review"],
    Review: ["Výstup", "Rozhodnutí"],
    Rozhodnutí: ["Review", "Outcome"],
    Outcome: ["Rozhodnutí", "Hranice"],
    Hranice: ["Challenge", "Review", "Outcome"],
  },
  status: {
    Implementace: ["Testování", "Pilot"],
    Testování: ["Implementace", "Pilot"],
    Pilot: ["Testování", "Outcome"],
    Outcome: ["Pilot", "Impact"],
    Impact: ["Outcome", "Další krok"],
    "Další krok": ["Pilot", "Impact"],
  },
};

const DETAIL_OVERRIDES = {
  roles: {
    Žák: ["Skutečnou zkušenost, vedení a soukromý záznam toho, co zvládl.", "Pohled, otázky, práci v týmu, výstup, důkaz a vlastní reflexi.", "Přínos se nikdy nepřevádí na skóre člověka ani předpověď jeho budoucnosti."],
    Rodina: ["Bezpečnou a smysluplnou roli v rozvoji dítěte bez narušení soukromí.", "Reálný kontext, podnět a pohled z domova — ne hodnocení.", "Rodina automaticky nevidí soukromou reflexi žáka."],
    Škola: ["Doložený průběh a ověřitelnou práci bez univerzálního profilu dítěte.", "Bezpečný rámec, pedagogické vedení a samostatné ověření.", "Škola ověřuje práci; Pansofie z toho nevytváří skóre lidské hodnoty."],
    Partner: ["Reálný důvod se zapojit a možnost posoudit konkrétní výsledek.", "Skutečný problém, kontext a zpětnou vazbu k jasně vymezenému výstupu.", "Firma nekupuje pozitivní výsledek ani přístup k soukromým datům."],
    Komunita: ["Místní potřebu, kontext a možnost výsledek vyzkoušet nebo použít.", "Reálné prostředí, kde má práce smysl a případný dopad se teprve ověřuje.", "Zapojení se řídí konkrétní zkušeností, ne plošnou kampaní."],
    Mentor: ["Jasně ohraničené odborné zapojení do konkrétní zkušenosti.", "Expertizu, otázky a zpětnou vazbu k doložené práci.", "Mentor nemá neomezený soukromý kanál k dítěti."],
  },
  partner: {
    Challenge: ["Jasné zadání a očekávaný výstup.", "Reálný problém a dostatek kontextu, ne marketingový slib.", "Výzva nedává partnerovi přístup k soukromému profilu člověka."],
    Výstup: ["Konkrétní výsledek, který lze posoudit podle zadání.", "Doloženou práci v bezpečně vymezeném rozsahu.", "Samotný výstup ještě neříká, zda byl použit ani jaký měl dopad."],
    Review: ["Transparentní zpětnou vazbu k práci.", "Posouzení výstupu podle původního zadání.", "Partner hodnotí výstup, nikdy lidskou hodnotu."],
    Rozhodnutí: ["Jasný další krok: nepoužít, dál prozkoumat, nebo bezpečně vyzkoušet.", "Odpovědné rozhodnutí bez předem slíbeného pozitivního výsledku.", "Rozhodnutí něco vyzkoušet ještě není důkaz, že řešení funguje."],
    Outcome: ["Možnost doložit, co se po použití skutečně změnilo.", "Důkaz reálného použití místo dojmu.", "Změnu netvrdíme, dokud pro ni nemáme skutečné podklady."],
    Hranice: ["Jasné vysvětlení toho, co partner smí a nesmí vidět.", "Jen minimum dat nutné pro konkrétní účel.", "Žádná soukromá reflexe, neveřejné podklady žáka ani jeho osobní záznam bez oprávnění."],
  },
};

function fallbackDetail(_key, label) {
  const lower = label.toLocaleLowerCase("cs-CZ");
  const visibleLabel = publicLabel(label);
  if (/potřeba|challenge/.test(lower)) return ["Jasný důvod, proč má další práce smysl.", "Konkrétní kontext místo abstraktního zadání.", "Síť začíná účelem, ne sběrem dat bez důvodu."];
  if (/důkaz|výstup|evidence/.test(lower)) return ["Doložitelnou stopu skutečné práce.", "Konkrétní výstup, měření nebo dokumentaci.", "Důkaz práce není automaticky důkaz dlouhodobého dopadu."];
  if (/ověření|review|test/.test(lower)) return ["Samostatnou kontrolu toho, co bylo doloženo.", "Zpětnou vazbu k práci a jasný další krok.", "Ověření neslouží k vytvoření skóre lidské hodnoty."];
  if (/reflexe/.test(lower)) return ["Vlastní význam a pojmenování toho, co člověk pochopil.", "Pohled na to, co fungovalo a co příště změnit.", "Soukromá reflexe není automatický report pro všechny role."];
  if (/passport/.test(lower)) return ["Soukromý záznam skutečné zkušenosti.", "Ověřenou návaznost na další krok.", "Experience Passport je ve výchozím nastavení soukromý a není veřejný žebříček člověka."];
  if (/impact/.test(lower)) return ["Dlouhodobější důkaz skutečné změny.", "Čas, kontext a ověřitelné podklady o tom, co se opravdu změnilo.", "Technická připravenost ani dokončená aktivita nejsou důkaz dlouhodobého dopadu."];
  if (/outcome/.test(lower)) return ["Informaci o tom, co následovalo po použití výsledku.", "Ověřitelné podklady z reálného provozu.", "To, co se stalo potom, se nesmí domýšlet bez důkazu."];
  if (/pilot/.test(lower)) return ["Kontrolované ověření v reálném provozu.", "Kontext, účastníky a konkrétní pravidla.", "Pilot není automaticky důkaz pedagogického nebo dlouhodobého dopadu."];
  return ["Jasnou hodnotu z konkrétního vztahu v síti.", `Kontext a práci spojenou s částí „${visibleLabel}“.", "Každý přístup zůstává účelově omezený a vysvětlitelný."];
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
  if (/důkaz|výstup|evidence/.test(lower)) return FileCheck2;
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

function slotFor(networkKey, label, index) {
  const slotIndex = networkKey === "roles" ? (ROLE_SLOT_INDEX[label] ?? index) : index;
  return SLOTS[slotIndex % SLOTS.length];
}

export default function ReferenceNetworkStage({ network, activeIndex = 0, onSelect }) {
  const nodes = network?.nodes || [];
  const safeIndex = Math.min(Math.max(activeIndex, 0), Math.max(nodes.length - 1, 0));
  const selectedLabel = nodes[safeIndex] || nodes[0] || "Experience";
  const selectedPublicLabel = publicLabel(selectedLabel);
  const corePublicLabel = publicLabel(network?.core || "Pansofie");
  const relatedLabels = RELATIONSHIPS[network?.key]?.[selectedLabel] || [nodes[(safeIndex + 1) % nodes.length], nodes[(safeIndex + nodes.length - 1) % nodes.length]].filter(Boolean);
  const [receives, contributes, boundary] = detailFor(network?.key, selectedLabel);
  const SelectedIcon = iconFor(selectedLabel);

  const placements = useMemo(() => nodes.map((label, index) => ({
    label,
    index,
    slot: slotFor(network?.key, label, index),
  })), [network?.key, nodes]);

  const selectedPlacement = placements.find((item) => item.index === safeIndex) || placements[0];
  const relatedPlacements = placements.filter((item) => relatedLabels.includes(item.label));

  return (
    <section
      className="reference-network-r5"
      data-network-key={network?.key || "public"}
      data-selected-node={selectedLabel}
      aria-label={`Interaktivní síť ${corePublicLabel}`}
    >
      <div className="reference-network-r5__intro">
        <div>
          <p className="eyebrow">JAK SPOLU ČÁSTI SOUVISEJÍ</p>
          <h2>{corePublicLabel} je uprostřed. Vyberte část mapy a podívejte se, co s ní souvisí.</h2>
          <p>Mapa zvýrazní právě vybranou část a její nejbližší vztahy. Pomáhá vysvětlit souvislosti, ale nenahrazuje obsah ani důkaz.</p>
        </div>
        <div className="reference-network-r5__legend" aria-label="Legenda sítě">
          <span><i data-kind="active" /> vybrané</span>
          <span><i data-kind="related" /> související</span>
          <span><i data-kind="quiet" /> ostatní</span>
        </div>
      </div>

      <div className="reference-network-r5__canvas">
        <div className="reference-network-r5__ambient" aria-hidden="true" />

        <svg className="reference-network-r5__links" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} preserveAspectRatio="none" aria-hidden="true">
          {placements.map((item) => {
            const isActive = item.index === safeIndex;
            const isRelated = relatedLabels.includes(item.label);
            return (
              <React.Fragment key={`core-edge-${item.label}`}>
                <line
                  className="reference-network-r5__svg-edge"
                  data-active={isActive}
                  data-related={isRelated}
                  x1={CORE.x}
                  y1={CORE.y}
                  x2={item.slot.x}
                  y2={item.slot.y}
                />
                {isActive && (
                  <line
                    className="reference-network-r5__svg-edge reference-network-r5__svg-edge--signal"
                    x1={CORE.x}
                    y1={CORE.y}
                    x2={item.slot.x}
                    y2={item.slot.y}
                  />
                )}
              </React.Fragment>
            );
          })}

          {selectedPlacement && relatedPlacements.map((item) => (
            <React.Fragment key={`cross-${selectedLabel}-${item.label}`}>
              <line
                className="reference-network-r5__svg-edge reference-network-r5__svg-edge--cross"
                x1={selectedPlacement.slot.x}
                y1={selectedPlacement.slot.y}
                x2={item.slot.x}
                y2={item.slot.y}
              />
              <line
                className="reference-network-r5__svg-edge reference-network-r5__svg-edge--signal reference-network-r5__svg-edge--cross-signal"
                x1={selectedPlacement.slot.x}
                y1={selectedPlacement.slot.y}
                x2={item.slot.x}
                y2={item.slot.y}
              />
            </React.Fragment>
          ))}
        </svg>

        <div className="reference-network-r5__core" aria-hidden="true">
          <span><Network size={25} /></span>
          <strong>{corePublicLabel}</strong>
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
              onFocus={() => onSelect?.(item.index, { source: "focus" })}
              onClick={() => onSelect?.(item.index, { source: "click" })}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{publicLabel(item.label)}</span>
            </button>
          );
        })}
      </div>

      <div key={`${network?.key}-${selectedLabel}`} className="reference-network-r5__details" aria-live="polite">
        <article className="reference-network-r5__identity">
          <div className="reference-network-r5__identity-head">
            <span><SelectedIcon size={19} /></span>
            <div>
              <h3>{selectedPublicLabel}</h3>
              <p>Právě vybraná část</p>
            </div>
          </div>
          <p>{corePublicLabel} zůstává uprostřed. Výběr pouze zvýrazní vztahy, které jsou pro tuto část nejdůležitější.</p>
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

      <div className="reference-network-r5__flowline" aria-label={`Souvislosti vybrané části ${selectedPublicLabel}`}>
        <span>CO TATO ČÁST PŘINÁŠÍ</span>
        <div>
          <b>{selectedPublicLabel}</b>
          <ArrowRight size={14} />
          <em>{contributes}</em>
          {relatedLabels.slice(0, 2).map((label) => (
            <React.Fragment key={label}>
              <ArrowRight size={14} />
              <b>{publicLabel(label)}</b>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
