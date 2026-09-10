export const dynamic = "force-dynamic";

export async function GET() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  let host = null;
  try {
    host = raw ? new URL(raw).hostname : null;
  } catch {
    host = null;
  }

  return Response.json(
    { configured: Boolean(raw), host },
    { headers: { "Cache-Control": "no-store" } },
  );
}
