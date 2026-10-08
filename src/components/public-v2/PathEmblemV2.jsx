import { pathIconV2 } from "../../domain/asset-system-v2";

export function PathEmblemV2({ pathId, size = 64, decorative = true, label }) {
  const props = decorative
    ? { "aria-hidden": "true" }
    : { role: "img", "aria-label": label || "Symbol cesty " + pathId };

  return <span
    className="ps2-path-emblem"
    style={{
      "--ps2-symbol-mask": "url(" + pathIconV2(pathId) + ")",
      "--ps2-emblem-size": String(size) + "px",
    }}
    {...props}
  />;
}
