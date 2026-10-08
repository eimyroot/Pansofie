import Link from "next/link";
import { PUBLIC_NAV_V2 } from "../../domain/pansofie-public-v2";
import { BrandLockupV2 } from "./BrandLockupV2";
import { UiIconV2 } from "./UiIconV2";

function routeIsActive(currentPath, group) {
  if (!currentPath) return false;
  return currentPath === group.href || group.items.some((item) => currentPath === item.href || currentPath.startsWith(item.href + "/"));
}

export function PublicHeaderV2({ currentPath = "/" }) {
  return <header className="ps2-header">
    <div className="ps2-header__inner">
      <BrandLockupV2/>
      <nav className="ps2-nav" aria-label="Hlavní navigace">
        {PUBLIC_NAV_V2.map((group) => <div className={"ps2-nav__group" + (routeIsActive(currentPath, group) ? " is-active" : "")} key={group.label}>
          <Link className="ps2-nav__top" href={group.href}>{group.label}</Link>
          <div className="ps2-nav__panel">
            <span>{group.label}</span>
            {group.items.map((item) => <Link key={item.href} href={item.href} aria-current={currentPath === item.href ? "page" : undefined}>{item.label}</Link>)}
          </div>
        </div>)}
      </nav>
      <nav className="ps2-header__actions" aria-label="Produkty a účet">
        <Link className="ps2-go-link" href="/pansofie-go">
          <UiIconV2 id="go"/>
          <span>Pansofie GO</span>
        </Link>
        <Link className="ps2-login-link" href="/login">
          <UiIconV2 id="account" size={17}/>
          <span>Přihlásit se</span>
        </Link>
      </nav>
      <details className="ps2-mobile-menu">
        <summary>
          <span>Menu</span>
          <span className="ps2-mobile-menu__open"><UiIconV2 id="menu" size={22}/></span>
          <span className="ps2-mobile-menu__close"><UiIconV2 id="close" size={22}/></span>
        </summary>
        <nav aria-label="Mobilní navigace">
          {PUBLIC_NAV_V2.map((group) => <div className="ps2-mobile-menu__group" key={group.label}>
            <Link href={group.href}><strong>{group.label}</strong></Link>
            {group.items.map((item) => <Link key={item.href} href={item.href} aria-current={currentPath === item.href ? "page" : undefined}>{item.label}</Link>)}
          </div>)}
          <Link className="ps2-mobile-menu__product" href="/pansofie-go">Pansofie GO</Link>
          <Link className="ps2-mobile-menu__product" href="/login">Přihlásit se</Link>
        </nav>
      </details>
    </div>
  </header>;
}
