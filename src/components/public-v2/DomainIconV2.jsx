import { domainIconV2 } from "../../domain/asset-system-v2";

export function DomainIconV2({ domainId, size = 42, decorative = true, label }) {
  const props = decorative
    ? { "aria-hidden": "true" }
    : { role: "img", "aria-label": label || "Symbol oblasti " + domainId };

  return <span
    className="ps2-domain-icon"
    style={{
      "--ps2-symbol-mask": "url(" + domainIconV2(domainId) + ")",
      "--ps2-domain-icon-size": String(size) + "px",
    }}
    {...props}
  />;
}
