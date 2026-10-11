import Link from "next/link";
import { ArrowRight, Globe2, Heart, Leaf, Mail, UsersRound } from "lucide-react";
import { BrandLockupV2 } from "../../components/public-v2/BrandLockupV2";

const GROUPS = Object.freeze([
  ["Objevuj", [
    ["/jak-to-funguje", "Jak to funguje"], ["/7-cest", "7 cest"],
    ["/16-oblasti", "16 oblastí"], ["/projekty", "Projekty"],
    ["/pro-skoly", "Pro školy"], ["/pro-organizace", "Pro organizace"], ["/blog", "Blog"],
  ]],
  ["PANSOFIE YOUNG", [
    ["/young", "Domov"], ["/young/objevuj", "Objevuj"], ["/young/mise", "Mise"],
    ["/young/projekty", "Projekty"], ["/young/komunita", "Komunita"],
    ["/young/jak-to-funguje", "Jak to funguje"],
  ]],
  ["PANSOFIE GO", [
    ["/pansofie-go", "O aplikaci"], ["/pansofie-go", "Mise a mapa"],
    ["/pansofie-go", "Projekty a týmy"], ["/pansofie-go", "Mentor a portfolio"],
  ]],
  ["Užitečné", [
    ["/o-nas", "O nás"], ["/impact", "Dopad"], ["/pro-skoly", "Pro školy"],
    ["/kontakt", "Kontakt"], ["/soukromi", "Soukromí"],
    ["/pristupnost", "Přístupnost"],
  ]],
]);

const VALUES = Object.freeze([
  {icon:Leaf,label:"Skutečné vzdělávání"},
  {icon:UsersRound,label:"Silná komunita"},
  {icon:Globe2,label:"Reálný dopad"},
  {icon:Heart,label:"Udržitelná budoucnost"},
]);

export function HowFooterW215() {
  return <footer className="ps2-how-footer">
    <div className="ps2-how-footer__main">
      <div className="ps2-how-footer__brand">
        <BrandLockupV2/>
        <p>Poznání, praxe, tvoření a komunita. Učíme se s respektem k lidem, přírodě a světu, ve kterém chceme žít.</p>
        <p className="ps2-how-footer__motto">Malé kroky,<br/>velké změny. ♡</p>
      </div>
      {GROUPS.map(([title,links])=><nav className="ps2-how-footer__nav" aria-label={title} key={title}>
        <h2>{title}</h2>
        {links.map(([href,label],i)=><Link href={href} key={href+"-"+i}>{label}</Link>)}
      </nav>)}
      <div className="ps2-how-footer__contact">
        <h2>Zůstaňme v kontaktu</h2>
        <p>Novinky, inspirace a příběhy ze světa PANSOFIE. Pro aktuální informace a spolupráci nás kontaktuj.</p>
        <Link className="ps2-how-footer__contact-cta" href="/kontakt"><Mail size={19} aria-hidden="true"/> Napiš nám <ArrowRight size={17} aria-hidden="true"/></Link>
        <div className="ps2-how-footer__values" aria-label="Hodnoty PANSOFIE">
          {VALUES.map(({icon:Icon,label})=><div key={label}><Icon size={25} strokeWidth={1.65} aria-hidden="true"/><span>{label}</span></div>)}
        </div>
      </div>
    </div>
    <div className="ps2-how-footer__scenery" aria-hidden="true">
      <span>Různé cesty.<br/>Společný směr. ♡</span>
    </div>
    <div className="ps2-how-footer__bottom">
      <span>© 2026 PANSOFIE</span>
      <nav aria-label="Právní a kontaktní odkazy">
        <Link href="/soukromi">Ochrana osobních údajů</Link>
        <Link href="/podminky">Podmínky použití</Link>
        <Link href="/pristupnost">Přístupnost</Link>
        <Link href="/kontakt">Kontakt</Link>
      </nav>
      <span>Čeština</span>
    </div>
  </footer>;
}
