import { Compass, Gamepad2, HandHeart, PenTool, Share2, RefreshCcw } from "lucide-react";
import { PUBLIC_METHOD_V2 } from "../../domain/pansofie-public-v2";

const STEP_ICONS = [Compass, Gamepad2, HandHeart, PenTool, Share2, RefreshCcw];

export function MethodSequenceV2({ compact = false, icons = false }) {
  return <ol className={"ps2-method" + (compact ? " ps2-method--compact" : "") + (icons ? " ps2-method--icons" : "")}>
    {PUBLIC_METHOD_V2.map((step, index) => {
      const Icon = STEP_ICONS[index];
      return <li key={step.id}>
        {icons && Icon && <span className="ps2-method__icon" aria-hidden="true"><Icon size={24} strokeWidth={1.8}/></span>}
        <span className="ps2-method__number">{String(step.order).padStart(2, "0")}</span>
        <strong>{step.labelCs}</strong>
      </li>;
    })}
  </ol>;
}
