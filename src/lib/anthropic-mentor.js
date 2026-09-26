const ANTHROPIC_MESSAGES_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
export const DEFAULT_MENTOR_MODEL = "claude-sonnet-5";
export const MENTOR_MAX_OUTPUT_TOKENS = 420;
export const MENTOR_TIMEOUT_MS = 12_000;

function textFromMessage(payload) {
  const blocks = Array.isArray(payload?.content) ? payload.content : [];
  return blocks
    .filter((block) => block?.type === "text" && typeof block.text === "string")
    .map((block) => block.text.trim())
    .filter(Boolean)
    .join("\n\n")
    .slice(0, 3000);
}

export async function requestAnthropicMentor({
  system,
  user,
  apiKey = process.env.ANTHROPIC_API_KEY,
  model = process.env.ANTHROPIC_MODEL || DEFAULT_MENTOR_MODEL,
  fetchImpl = globalThis.fetch,
  timeoutMs = MENTOR_TIMEOUT_MS,
} = {}) {
  if (!apiKey) return { mode: "unavailable", code: "provider_not_configured" };
  if (typeof fetchImpl !== "function") return { mode: "error", code: "provider_unavailable" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(ANTHROPIC_MESSAGES_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model,
        max_tokens: MENTOR_MAX_OUTPUT_TOKENS,
        system,
        messages: [{ role: "user", content: user }],
      }),
      signal: controller.signal,
    });

    if (response.status === 429) {
      return { mode: "error", code: "provider_rate_limited", retryable: true };
    }
    if (!response.ok) {
      return { mode: "error", code: "provider_unavailable", retryable: response.status >= 500 };
    }

    const payload = await response.json();
    const answer = textFromMessage(payload);
    if (!answer) return { mode: "error", code: "provider_invalid_response" };

    return {
      mode: "ok",
      answer,
      model: payload?.model || model,
      stopReason: payload?.stop_reason || null,
      usage: {
        inputTokens: Number(payload?.usage?.input_tokens || 0),
        outputTokens: Number(payload?.usage?.output_tokens || 0),
      },
    };
  } catch (error) {
    return {
      mode: "error",
      code: error?.name === "AbortError" ? "provider_timeout" : "provider_unavailable",
      retryable: true,
    };
  } finally {
    clearTimeout(timer);
  }
}
