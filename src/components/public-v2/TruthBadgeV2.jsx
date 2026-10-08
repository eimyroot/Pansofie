const ALLOWED_STATES = Object.freeze(["DEMO", "PROTOTYPE", "MODEL", "CONCEPT", "PILOT", "VERIFIED"]);

export function TruthBadgeV2({ state }) {
  if (!ALLOWED_STATES.includes(state)) throw new Error("Unsupported public truth state: " + state);
  return <span className={"ps2-truth-badge ps2-truth-badge--" + state.toLowerCase()}>{state}</span>;
}
