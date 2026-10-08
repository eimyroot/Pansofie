import { PUBLIC_METHOD_V2 } from "../../domain/pansofie-public-v2";

export function MethodSequenceV2({ compact = false }) {
  return <ol className={"ps2-method" + (compact ? " ps2-method--compact" : "")}>
    {PUBLIC_METHOD_V2.map((step) => <li key={step.id}>
      <span>{String(step.order).padStart(2, "0")}</span>
      <strong>{step.labelCs}</strong>
    </li>)}
  </ol>;
}
