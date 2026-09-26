const BASE = "/assets/current";

export const CURRENT_MEDIA = Object.freeze({
  home: `${BASE}/photos/home-community.webp`,
  community: `${BASE}/photos/community-garden.webp`,
  produce: `${BASE}/photos/garden-produce.webp`,
  nature: `${BASE}/photos/volunteer-garden.webp`,
  school: `${BASE}/photos/school-prague.webp`,
  labs: `${BASE}/photos/labs-workshop.webp`,
  partnership: `${BASE}/photos/partners-hands.webp`,
  prague: `${BASE}/photos/prague-sunset.webp`,
  creative: `${BASE}/photos/creative-workshop.webp`,
});

export const CURRENT_ICONS = `${BASE}/icons`;

export function currentIcon(id) {
  return `${CURRENT_ICONS}/${id}.svg`;
}

export function currentPhoto(id) {
  const value = CURRENT_MEDIA[id];
  if (!value) throw new Error(`Unknown current visual: ${id}`);
  return value;
}
