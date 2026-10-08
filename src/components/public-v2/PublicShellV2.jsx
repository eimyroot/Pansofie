import { PublicFooterV2 } from "./PublicFooterV2";
import { PublicHeaderV2 } from "./PublicHeaderV2";

export function PublicShellV2({ children, currentPath = "/" }) {
  return <div className="ps2-site">
    <a className="ps2-skip-link" href="#ps2-main">Přejít na hlavní obsah</a>
    <PublicHeaderV2 currentPath={currentPath}/>
    <main id="ps2-main">{children}</main>
    <PublicFooterV2/>
  </div>;
}
