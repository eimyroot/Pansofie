import { requestAnthropicMentor } from "./anthropic-mentor.js";

export const MENTOR_PROVIDER_NONE = "none";
export const MENTOR_PROVIDER_ANTHROPIC = "anthropic";

export async function requestMentorProvider({ provider, prompt, fetchImpl = globalThis.fetch }) {
  if (provider !== MENTOR_PROVIDER_ANTHROPIC) {
    return { mode: "unavailable", code: "provider_not_enabled" };
  }

  return requestAnthropicMentor({
    ...prompt,
    fetchImpl,
  });
}
