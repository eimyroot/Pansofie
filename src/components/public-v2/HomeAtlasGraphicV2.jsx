import { TruthBadgeV2 } from "./TruthBadgeV2";

export function HomeAtlasGraphicV2() {
  return <figure className="ps2-home-atlas">
    <div
      className="ps2-home-atlas__canvas"
      role="img"
      aria-label="Koncept art-direction rámu pro budoucí dokumentární fotografii Pansofie: reálná činnost, přirozené světlo a vztah člověka k místu."
    >
      <div className="ps2-home-atlas__shape ps2-home-atlas__shape--arch"></div>
      <div className="ps2-home-atlas__shape ps2-home-atlas__shape--hill"></div>
      <div className="ps2-home-atlas__shape ps2-home-atlas__shape--sun"></div>
      <div className="ps2-home-atlas__shape ps2-home-atlas__shape--line"></div>

      <div className="ps2-home-atlas__photo-card">
        <div className="ps2-home-atlas__photo-card-top">
          <strong>NEW PHOTO MASTER · P0</strong>
          <TruthBadgeV2 state="CONCEPT"/>
        </div>
        <span>Reálná činnost · přirozené světlo · žádné pózování · 16:9 / 4:5 crop</span>
      </div>
    </div>

    <figcaption>
      <strong>Všechno souvisí se vším.</strong>
      <span>Kompoziční prototyp. Finální dokumentární fotografie zůstává samostatný rights/truth gate.</span>
    </figcaption>
  </figure>;
}
