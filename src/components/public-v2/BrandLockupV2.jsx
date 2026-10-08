import Image from "next/image";
import Link from "next/link";
import { brandMarkV2 } from "../../domain/asset-system-v2";

export function BrandLockupV2({ href = "/", compact = false, showTagline = true }) {
  return <Link className={"ps2-brand" + (compact ? " ps2-brand--compact" : "")} href={href} aria-label="Pansofie, úvodní stránka">
    <span className="ps2-brand__mark" aria-hidden="true">
      <Image src={brandMarkV2()} alt="" width={34} height={34}/>
    </span>
    <span className="ps2-brand__copy">
      <strong>PANSOFIE</strong>
      {showTagline && <small>Poznej sebe. Rozvíjej svět.</small>}
    </span>
  </Link>;
}
