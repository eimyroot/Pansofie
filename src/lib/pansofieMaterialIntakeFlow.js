import { supabase } from "@/api/supabaseClient";

export async function submitMaterialBridgeIntake(payload) {
  const result = await supabase.from("material_bridge_intakes").insert({
    actor_kind: payload.actorKind,
    full_name: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    organization_name: payload.organizationName?.trim() || null,
    listing_type: payload.listingType,
    title: payload.title.trim(),
    category: payload.category,
    condition_status: payload.listingType === "request" ? "not_applicable" : payload.conditionStatus,
    quantity: payload.quantity?.trim() || null,
    description: payload.description?.trim() || null,
    region: payload.region,
    locality: payload.locality?.trim() || null,
    handoff_methods: payload.handoffMethods || [],
    personal_involvement: payload.personalInvolvement || [],
    locale: payload.locale || "cs",
    status: "received",
  });

  if (result.error) {
    const error = new Error(`Material Bridge intake failed: ${result.error.message}`);
    error.cause = result.error;
    throw error;
  }

  return { accepted: true };
}
