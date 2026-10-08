import { uiIconV2 } from "../../domain/asset-system-v2";

export function UiIconV2({ id, size = 18, decorative = true, label }) {
  const props = decorative
    ? { "aria-hidden": "true" }
    : { role: "img", "aria-label": label || id };

  return <span
    className="ps2-ui-icon"
    style={{
      "--ps2-ui-mask": "url(" + uiIconV2(id) + ")",
      "--ps2-ui-size": String(size) + "px",
    }}
    {...props}
  />;
}
