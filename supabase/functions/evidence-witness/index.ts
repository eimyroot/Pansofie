import { createClient } from "npm:@supabase/supabase-js@2";

const jsonHeaders = (origin: string | null) => ({
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": origin || "null",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
  "Cache-Control": "no-store",
});

const allowedOrigin = Deno.env.get("PANSOFIE_PUBLIC_ORIGIN") || "https://pansofie-staging.vercel.app";

const response = (status: number, payload: Record<string, unknown>, origin: string | null) =>
  new Response(JSON.stringify(payload), { status, headers: jsonHeaders(origin) });

async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    if (origin && origin !== allowedOrigin) return new Response(null, { status: 403 });
    return new Response(null, { status: 204, headers: jsonHeaders(origin) });
  }

  if (request.method !== "POST") {
    return response(405, { ok: false, code: "METHOD_NOT_ALLOWED" }, origin);
  }

  if (origin && origin !== allowedOrigin) {
    return response(403, { ok: false, code: "ORIGIN_NOT_ALLOWED" }, origin);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return response(503, { ok: false, code: "SERVER_NOT_CONFIGURED" }, origin);
  }

  let body: { action?: string; token?: string; note?: string };
  try {
    body = await request.json();
  } catch {
    return response(400, { ok: false, code: "INVALID_JSON" }, origin);
  }

  const action = body.action;
  const token = typeof body.token === "string" ? body.token.trim() : "";
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 1200) : null;

  if (!token || token.length < 24 || token.length > 512) {
    return response(400, { ok: false, code: "INVALID_TOKEN" }, origin);
  }

  const tokenHash = await sha256Hex(token);
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (action === "preview") {
    const { data, error } = await supabase.rpc("pansofie_preview_witness_request", {
      target_token_hash: tokenHash,
    });

    if (error) {
      console.error("witness preview failed", error.code);
      return response(500, { ok: false, code: "PREVIEW_FAILED" }, origin);
    }

    const row = Array.isArray(data) ? data[0] : data;
    if (!row) return response(404, { ok: false, code: "NOT_FOUND" }, origin);

    return response(200, {
      ok: true,
      request: {
        status: row.request_status,
        expiresAt: row.expires_at,
        witnessRole: row.witness_role,
        missionTitle: row.mission_title,
        evidenceKind: row.evidence_kind,
        evidenceDescription: row.evidence_description,
        reflection: row.reflection_text,
      },
    }, origin);
  }

  if (action === "confirm" || action === "needs_revision") {
    const decision = action === "confirm" ? "confirmed" : "needs_revision";
    const { data, error } = await supabase.rpc("pansofie_consume_witness_request", {
      target_token_hash: tokenHash,
      target_decision: decision,
      target_note: note,
    });

    if (error) {
      const message = String(error.message || "");
      if (message.includes("expired")) return response(410, { ok: false, code: "EXPIRED" }, origin);
      if (message.includes("already consumed")) return response(409, { ok: false, code: "ALREADY_USED" }, origin);
      if (message.includes("not found")) return response(404, { ok: false, code: "NOT_FOUND" }, origin);
      console.error("witness decision failed", error.code);
      return response(500, { ok: false, code: "DECISION_FAILED" }, origin);
    }

    const row = Array.isArray(data) ? data[0] : data;
    return response(200, {
      ok: true,
      result: row?.decision === "confirmed" ? "confirmed" : "needs_revision",
    }, origin);
  }

  return response(400, { ok: false, code: "UNSUPPORTED_ACTION" }, origin);
});
