import { requestAnthropicMentor } from "../src/lib/anthropic-mentor.js";

const retentionMode = process.env.ANTHROPIC_DATA_RETENTION_MODE || "unverified";
const allowedRetention = new Set(["standard_api", "zdr"]);

if (process.env.MENTOR_LIVE_SMOKE !== "1") {
  console.error("MENTOR_LIVE_SMOKE=1 is required for an explicit paid provider smoke test.");
  process.exit(2);
}
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY is not configured in the server environment.");
  process.exit(2);
}
if (!allowedRetention.has(retentionMode)) {
  console.error("ANTHROPIC_DATA_RETENTION_MODE must be acknowledged before the live smoke test.");
  process.exit(2);
}
if (process.env.MENTOR_PROVIDER_SPEND_LIMIT_VERIFIED !== "true") {
  console.error("MENTOR_PROVIDER_SPEND_LIMIT_VERIFIED=true is required before a paid provider smoke test.");
  process.exit(2);
}

const result = await requestAnthropicMentor({
  system: "Jsi testovací Sokratovský průvodce. Odpověz jednou krátkou otázkou v češtině.",
  user: "<synthetic_test>Jak ověřit tvrzení bez osobních údajů?</synthetic_test>",
});

if (result.mode !== "ok" || !result.answer) {
  console.error(`MENTOR_LIVE_SMOKE=FAIL code=${result.code || result.mode}`);
  process.exit(1);
}
const receipt = {
  status: "PASS",
  model: result.model,
  stopReason: result.stopReason,
  inputTokens: result.usage?.inputTokens || 0,
  outputTokens: result.usage?.outputTokens || 0,
  retentionMode,
  promptContentLogged: false,
  responseContentLogged: false,
};

console.log(`MENTOR_LIVE_SMOKE=${JSON.stringify(receipt)}`);
