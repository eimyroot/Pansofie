import "leaflet/dist/leaflet.css";
import "../index.css";
import "../r8-living.css";
import "../r9-stability.css";
import "../artkit-v1.css";
import "../product.css";
import "../home-final.css";
import "../home-final-assets.css";
import "./experience.css";
import "./young-experience-final.css";

export const metadata = { title: "Pansofie", description: "Pansofie a Pansofie Young" };

export default function RootLayout({ children }) {
  return <html lang="cs"><body>{children}</body></html>;
}
