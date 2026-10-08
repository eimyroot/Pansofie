import { TruthBadgeV2 } from "./TruthBadgeV2";

export function HomeAtlasGraphicV2() {
  return <figure className="ps2-home-atlas">
    <div
      className="ps2-home-atlas__canvas"
      role="img"
      aria-label="Koncept atlasu Pansofie: člověk uprostřed vztahů k přírodě, místu, rodině, škole, tvorbě a komunitě."
    >
      <svg viewBox="0 0 760 760" aria-hidden="true">
        <circle className="ps2-home-atlas__ring ps2-home-atlas__ring--one" cx="380" cy="380" r="264"/>
        <circle className="ps2-home-atlas__ring ps2-home-atlas__ring--two" cx="380" cy="380" r="168"/>
        <path className="ps2-home-atlas__line" d="M380 380 178 174M380 380 596 170M380 380 640 386M380 380 572 590M380 380 190 598M380 380 120 390"/>
        <path className="ps2-home-atlas__line ps2-home-atlas__line--soft" d="M178 174 C310 62 500 80 596 170M596 170 C690 240 700 330 640 386M640 386 C650 498 626 550 572 590M572 590 C432 690 284 680 190 598M190 598 C84 536 76 460 120 390M120 390 C90 288 116 220 178 174"/>
        <path className="ps2-home-atlas__botanical" d="M381 510v-184M381 398c-74-6-114-43-129-105 73-7 118 30 129 105ZM381 352c30-70 83-104 151-90-15 77-67 119-151 121M381 454c58-5 99 24 126 85-68 10-111-17-126-85Z"/>
        <circle className="ps2-home-atlas__node" cx="380" cy="380" r="18"/>
        <circle className="ps2-home-atlas__node" cx="178" cy="174" r="9"/>
        <circle className="ps2-home-atlas__node" cx="596" cy="170" r="9"/>
        <circle className="ps2-home-atlas__node" cx="640" cy="386" r="9"/>
        <circle className="ps2-home-atlas__node" cx="572" cy="590" r="9"/>
        <circle className="ps2-home-atlas__node" cx="190" cy="598" r="9"/>
        <circle className="ps2-home-atlas__node" cx="120" cy="390" r="9"/>
      </svg>

      <span className="ps2-home-atlas__label ps2-home-atlas__label--center">Člověk</span>
      <span className="ps2-home-atlas__label ps2-home-atlas__label--nature">Příroda</span>
      <span className="ps2-home-atlas__label ps2-home-atlas__label--place">Místo</span>
      <span className="ps2-home-atlas__label ps2-home-atlas__label--school">Škola</span>
      <span className="ps2-home-atlas__label ps2-home-atlas__label--community">Komunita</span>
      <span className="ps2-home-atlas__label ps2-home-atlas__label--family">Rodina</span>
      <span className="ps2-home-atlas__label ps2-home-atlas__label--creation">Tvorba</span>
      <div className="ps2-home-atlas__badge"><TruthBadgeV2 state="CONCEPT"/></div>
    </div>

    <figcaption>
      <strong>Všechno souvisí se vším.</strong>
      <span>Clean-slate atlasový vizuál. Finální dokumentární photo master zůstává samostatný rights/truth gate.</span>
    </figcaption>
  </figure>;
}
