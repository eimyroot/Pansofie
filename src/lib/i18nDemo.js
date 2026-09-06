const MATERIALS_EN = {
  "demo-company-wood": {
    company: "Novák Carpentry & Interiors · DEMO",
    title: "Solid oak and spruce offcuts + fine sawdust",
    quantity: "approx. 50 kg",
    description: "Illustrative company offer for school workshops or as a dry compost component.",
    useCase: "Carving, small constructions, mulch and dry compost material.",
  },
  "demo-company-cardboard": {
    company: "PrintEco Printing House · DEMO",
    title: "Clean unprinted cardboard sheets and tubes",
    quantity: "2 pallets",
    description: "Illustrative clean-cardboard offer for creative projects or garden use.",
    useCase: "Models, mockups, carbon layer for beds and compost.",
  },
  "demo-company-textile": {
    company: "Nitka Textile Studio · DEMO",
    title: "100% cotton fabric remnants and yarn offcuts",
    quantity: "3 large boxes",
    description: "Illustrative offer for craft and textile learning.",
    useCase: "Textile toys, bags, patches, art and craft projects.",
  },
  "demo-company-pallets": {
    company: "CargoSped Logistics Centre · DEMO",
    title: "Solid wooden transport pallets",
    quantity: "15 pieces",
    description: "Illustrative pallet offer for school and community projects.",
    useCase: "Compost bays, raised beds or outdoor seating.",
  },
  "demo-community-compost": { title: "Compost", quantity: "5 kg", description: "Mature garden compost · DEMO." },
  "demo-community-leaves": { title: "Dry leaves", quantity: "2 bags", description: "Dry leaves for the brown compost layer · DEMO." },
  "demo-community-bricks": { title: "Old bricks", quantity: "50 pcs", description: "Reusable old bricks for a garden project · DEMO." },
  "demo-community-hay": { title: "Hay", quantity: "bundle", description: "Dry hay for garden use · DEMO." },
  "demo-community-tools": { title: "Garden tools", quantity: "mixed", description: "Set of used garden tools · DEMO." },
};

const SCHOOLS_EN = {
  "school-demo-1": {
    school: "Lipová Primary School · DEMO",
    project: "School insect hotel and herb spiral",
    need: "Looking for board offcuts, wooden pallets, cardboard, reeds and other clean construction material.",
    benefit: "Optional: students may share what they created, without any mandatory marketing consent.",
  },
  "school-demo-2": {
    school: "Koloběh Eco Club · DEMO",
    project: "Raised beds and a community composter",
    need: "Looking for pallets, cardboard, compost and clean sawdust.",
    benefit: "Optional sharing of the process and experience with another school.",
  },
};

const MENTORS_EN = {
  "mentor-josef": { title:"Woodworking basics", mentor:"Josef", give:"Working with a chisel, planing and basic wood joints.", take:"Help setting up a smartphone." },
  "mentor-libuse": { title:"Grafting fruit trees", mentor:"Libuše", give:"Spring pruning and apple-tree grafting in practice.", take:"Help taking branches to community compost." },
  "mentor-martin": { title:"Python and algorithmic thinking", mentor:"Martin", give:"An introduction to Python and simple algorithms.", take:"Surplus fruit or vegetables." },
  "mentor-marie": { title:"Local memory and neighbourhood stories", mentor:"Marie", give:"Local history and stories from long-time residents.", take:"Company on an errand or a shared walk." },
};

export function localizeMaterial(item, isEnglish) {
  if (!isEnglish || !item?.demo) return item;
  return { ...item, ...(MATERIALS_EN[item.id] || {}) };
}

export function localizeSchoolProject(item, isEnglish) {
  if (!isEnglish || !item?.demo) return item;
  return { ...item, ...(SCHOOLS_EN[item.id] || {}) };
}

export function localizeMentor(item, isEnglish) {
  if (!isEnglish) return item;
  return { ...item, ...(MENTORS_EN[item.id] || {}) };
}
