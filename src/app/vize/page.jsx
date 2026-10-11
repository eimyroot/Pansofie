import { PublicShell } from "../../components/public/PublicShell";
import { OrientationFamilyNav, OrientationHero, OrientationNext, OrientationPrinciples, OrientationStatement } from "../../components/public/PansofieOrientationFrame";
export const metadata={title:"Vize Pansofie",description:"Pansofia, Pampaedia a Panorthosia přeložené do současného života a praktické zkušenosti."};
const PILLARS=[["Pansofia","Poznávat svět v souvislostech. Spojovat informace, zkušenost, technologie, přírodu a život kolem nás."],["Pampaedia","Růst a učit se celý život. Generace, školy, rodiny a komunity se mohou učit navzájem."],["Panorthosia","Zlepšovat svět kolem sebe. Poznání může vést k péči, opravě, pomoci, znovupoužití nebo malé změně."]];
export default function VisionPage(){return <PublicShell active="/vize">
 <OrientationFamilyNav active="/vize"/>
 <OrientationHero variant="vision" kicker="VIZE PANSOFIE" title={<>Staré pilíře. Současný život.</>} lead="Pansofie nechce starší myšlenky vystavit jako historii. Překládá je do situací, které lidé skutečně žijí dnes." primary={{href:"/jak-to-funguje",label:"Jak se vize používá"}} secondary={{href:"/16-oblasti",label:"16 oblastí"}}/>
 <OrientationStatement kicker="OD KOMENSKÉHO K DNEŠKU" title="Celostní myšlení má smysl jen tehdy, když obstojí v současném světě." text="AI může pomáhat hledat souvislosti a tvořit, ale úsudek, odpovědnost a konečné rozhodnutí zůstávají na člověku." aside="poznat → růst → zlepšovat"/>
 <OrientationPrinciples items={PILLARS}/>
 <OrientationNext kicker="JEDEN RÁMEC" title="Poznávat v souvislostech. Růst celý život. Zlepšovat svět kolem sebe." text="16 oblastí a 7 cest dávají této vizi současnou strukturu." href="/16-oblasti" label="Projít 16 oblastí"/>
 </PublicShell>}
