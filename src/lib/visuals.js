export const MATERIAL_VISUALS = {
  "demo-community-compost": "/assets/mockup/mat-compost.jpg",
  "demo-company-pallets": "/assets/mockup/mat-pallets.jpg",
  "demo-company-wood": "/assets/mockup/mat-sawdust.jpg",
  "demo-company-cardboard": "/assets/mockup/mat-cardboard.jpg",
  "demo-company-textile": "/assets/mockup/mat-hay.jpg",
  "demo-community-leaves": "/assets/mockup/mat-leaves.jpg",
  "demo-community-bricks": "/assets/mockup/mat-bricks.jpg",
  "demo-community-hay": "/assets/mockup/mat-hay.jpg",
  "demo-community-tools": "/assets/mockup/mat-tools.jpg",
};

export function materialVisual(item) {
  return MATERIAL_VISUALS[item.id] || MATERIAL_VISUALS[`category-${item.category}`] || "/assets/mockup/mat-compost.jpg";
}
