import { PublicFooterV2 } from "./PublicFooterV2";
import { PublicHeaderV2 } from "./PublicHeaderV2";

export function PublicShellV2({ children, currentPath = "/", footer = null }) {
  return <div className="ps2-site" id="ps2-top">
    <a className="ps2-skip-link" href="#ps2-main">Přejít na hlavní obsah</a>
    <PublicHeaderV2 currentPath={currentPath}/>
    <main id="ps2-main">{children}</main>
    <a className="ps2-back-to-top" href="#ps2-top" aria-label="Zpět nahoru" title="Zpět nahoru"><span aria-hidden="true">↑</span></a>
    {footer ?? <PublicFooterV2/>}
  </div>;
}
