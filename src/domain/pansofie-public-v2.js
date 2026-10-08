import {
  DEVELOPMENT_PATHS,
  IMPACT_DIMENSIONS,
  LEARNING_CYCLE,
  LEARNING_DOMAINS,
  MISSION_GROW_001,
  SKILL_ECOLOGICAL_THINKING,
} from "./learning-core.js";
import { PROJECT_GREEN_HOPE_GROW_001 } from "./project-core.js";

export const PATH_SLUGS_V2 = Object.freeze({
  body: "telo",
  mind: "mysl",
  character: "charakter",
  relationships: "vztahy",
  creativity: "tvorivost",
  prosperity: "prosperita",
  meaning: "smysl",
});

export const DOMAIN_SLUGS_V2 = Object.freeze({
  self: "ja",
  body: "telo",
  mind: "mysl",
  emotions: "emoce",
  relationships: "vztahy",
  family: "rodina",
  society: "spolecnost",
  nature: "priroda",
  technology: "technologie",
  finance: "finance",
  work: "prace",
  creation: "tvorba",
  culture: "kultura",
  ethics: "etika",
  citizenship: "obcanstvi",
  meaning: "smysl-zivota",
});

const METHOD_LABELS_CS = Object.freeze({
  learn: "Poznej",
  play: "Hraj",
  do: "Udělej",
  create: "Vytvoř",
  share: "Sdílej",
  reflect: "Reflektuj",
});

export const PUBLIC_PATHS_V2 = Object.freeze(
  DEVELOPMENT_PATHS.map((path, index) => Object.freeze({
    ...path,
    order: index + 1,
    slug: PATH_SLUGS_V2[path.id],
  })),
);

export const PUBLIC_DOMAINS_V2 = Object.freeze(
  LEARNING_DOMAINS.map((domain, index) => Object.freeze({
    ...domain,
    order: index + 1,
    slug: DOMAIN_SLUGS_V2[domain.id],
  })),
);

export const PUBLIC_METHOD_V2 = Object.freeze(
  LEARNING_CYCLE.map((id, index) => Object.freeze({
    id,
    order: index + 1,
    labelCs: METHOD_LABELS_CS[id],
  })),
);

export const PUBLIC_IMPACT_DIMENSION_IDS_V2 = Object.freeze([...IMPACT_DIMENSIONS]);

export const PUBLIC_NAV_V2 = Object.freeze([
  Object.freeze({
    label: "Objevuj",
    href: "/o-nas",
    items: Object.freeze([
      Object.freeze({ href: "/o-nas", label: "O Pansofii" }),
      Object.freeze({ href: "/7-cest", label: "7 cest" }),
      Object.freeze({ href: "/16-oblasti", label: "16 oblastí" }),
      Object.freeze({ href: "/jak-to-funguje", label: "Jak to funguje" }),
      Object.freeze({ href: "/blog", label: "Články" }),
    ]),
  }),
  Object.freeze({
    label: "Projekty",
    href: "/projekty",
    items: Object.freeze([
      Object.freeze({ href: "/projekty", label: "Přehled" }),
      Object.freeze({ href: "/green-hope", label: "Green Hope" }),
      Object.freeze({ href: "/urban-family-farm", label: "Urban Family Farm" }),
      Object.freeze({ href: "/digitalni-kompost", label: "Digitální kompost" }),
      Object.freeze({ href: "/labs", label: "Labs" }),
    ]),
  }),
  Object.freeze({
    label: "Komunita",
    href: "/komunita",
    items: Object.freeze([
      Object.freeze({ href: "/komunita", label: "Komunita" }),
      Object.freeze({ href: "/sit", label: "Síť" }),
      Object.freeze({ href: "/impact", label: "Dopad" }),
    ]),
  }),
  Object.freeze({
    label: "Pro koho",
    href: "/pro-koho",
    items: Object.freeze([
      Object.freeze({ href: "/pro-koho", label: "Přehled" }),
      Object.freeze({ href: "/family-team", label: "Rodiny" }),
      Object.freeze({ href: "/pro-skoly", label: "Školy" }),
      Object.freeze({ href: "/pro-organizace", label: "Organizace" }),
    ]),
  }),
  Object.freeze({
    label: "Zapoj se",
    href: "/dobrovolnictvi",
    items: Object.freeze([
      Object.freeze({ href: "/dobrovolnictvi", label: "Dobrovolnictví" }),
      Object.freeze({ href: "/partnerstvi", label: "Partnerství" }),
      Object.freeze({ href: "/kontakt", label: "Kontakt" }),
    ]),
  }),
]);

export const GREEN_HOPE_SOURCE_RELATION_V2 = Object.freeze({
  mission: MISSION_GROW_001,
  project: PROJECT_GREEN_HOPE_GROW_001,
  skill: SKILL_ECOLOGICAL_THINKING,
});

export function publicPathBySlugV2(slug) {
  return PUBLIC_PATHS_V2.find((item) => item.slug === slug) ?? null;
}

export function publicDomainBySlugV2(slug) {
  return PUBLIC_DOMAINS_V2.find((item) => item.slug === slug) ?? null;
}

export function publicPathHrefV2(id) {
  const slug = PATH_SLUGS_V2[id];
  if (!slug) throw new Error("Unknown development path id: " + id);
  return "/7-cest/" + slug;
}

export function publicDomainHrefV2(id) {
  const slug = DOMAIN_SLUGS_V2[id];
  if (!slug) throw new Error("Unknown learning domain id: " + id);
  return "/16-oblasti/" + slug;
}
