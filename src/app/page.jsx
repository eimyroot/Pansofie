import { PublicShell } from "../components/public/PublicShell";
import { PansofieManifestHero, PansofieEcosystemAtlas, PansofieEditorialGateway, PansofiePerspectiveField, PansofieLearningSequence, PansofieProjectStories, PansofieKnowledgeBridge, PansofieCityPractices, PansofieWorlds } from "../components/public/PansofieHomeFrame";
import { DOMAIN_DETAILS, LEARNING_METHOD, PATHS, KNOWLEDGE_EXCHANGE } from "../domain/pansofie-content";
import { DEVELOPMENT_PATHS, LEARNING_DOMAINS } from "../domain/learning-core";

export const metadata = {
  title: { absolute: "Pansofie · Všechno souvisí se vším" },
  description: "Pansofie propojuje poznání, dovednosti, vztahy, přírodu, technologie a smysl do učení pro skutečný život.",
};

const PROGRAMS = [
  { title: "Green Hope", eyebrow: "Příroda a péče", text: "Od první rostliny po komunitní projekty. Poznání se mění v konkrétní zkušenost.", href: "/green-hope", variant: "nature", nodes:["Pěstování","Péče","Místo","Komunita"] },
  { title: "Urban Family Farm", eyebrow: "Praktický život", text: "Pěstování, zpracování, náklady, prodej a reinvestice jako jeden srozumitelný cyklus.", href: "/urban-family-farm", variant: "city", nodes:["Pěstuj","Zpracuj","Spočítej","Rozhodni"] },
  { title: "Family Team", eyebrow: "Rodina jako tým", text: "Společné mise a projekty při zachování vlastního prostoru a odpovídajících oprávnění.", href: "/family-team", variant: "community", nodes:["Rodina","Role","Zkušenost","Reflexe"] },
  { title: "Knowledge Exchange", eyebrow: "Mezigenerační učení", text: KNOWLEDGE_EXCHANGE, href: "/sit", variant: "knowledge", nodes:["Dovednost","Příběh","Kontext","Vzájemnost"] },
];

const PUBLIC_DOMAINS = DOMAIN_DETAILS.map(([title, text], index) => ({ id: LEARNING_DOMAINS[index].id, title, text }));
const PUBLIC_PATHS = PATHS.map(([title, text], index) => ({ id: DEVELOPMENT_PATHS[index].id, title, text }));





export default function HomePage() {
  return <PublicShell active="/">
    <PansofieManifestHero/>

    <PansofieEcosystemAtlas domains={PUBLIC_DOMAINS} paths={PUBLIC_PATHS}/>

    <PansofieEditorialGateway/>

    <PansofiePerspectiveField/>

    <PansofieLearningSequence steps={LEARNING_METHOD}/>

    <PansofieProjectStories programs={PROGRAMS}/>

    <PansofieKnowledgeBridge/>

    <PansofieCityPractices/>

    <PansofieWorlds/>
  </PublicShell>;
}
