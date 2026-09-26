import "leaflet/dist/leaflet.css";
import "../index.css";
import "../r8-living.css";
import "../r9-stability.css";
import "../artkit-v1.css";
import "../product.css";
import "../home-final.css";
import "../home-final-assets.css";
import "../board-v2.css";
import "./experience.css";
import "./young-experience-final.css";
import "./go-v2.css";
import "./school-quest.css";
import "./public-pansofie.css";
import "./current-visual-system.css";
import "./visual-engine-v1.css";
import "./mockup01.css";
import { DEFAULT_SOCIAL_IMAGE, SITE_DESCRIPTION, SITE_INDEXABLE, SITE_NAME, SITE_ORIGIN } from "../domain/site-metadata";

export const metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: `${SITE_NAME} · Všechno souvisí se vším`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: { type: "website", locale: "cs_CZ", siteName: SITE_NAME, title: SITE_NAME, description: SITE_DESCRIPTION, images: [DEFAULT_SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION, images: [DEFAULT_SOCIAL_IMAGE] },
  robots: SITE_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return <html lang="cs"><body>{children}</body></html>;
}
