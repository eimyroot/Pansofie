import { supabase } from "@/api/supabaseClient";

const throwIfError = (result, label) => {
  if (result.error) {
    const error = new Error(`${label}: ${result.error.message}`);
    error.cause = result.error;
    throw error;
  }
  return result.data;
};

export const MATERIAL_CATEGORIES = Object.freeze([
  ["technology", "Digitální technologie & hardware"],
  ["workshop_material", "Materiál pro dílny & výtvarku"],
  ["furniture", "Nábytek & vybavení prostor"],
  ["garden_ecology", "Zahrada & ekologie"],
  ["other", "Ostatní"],
]);

export const MATERIAL_CONDITIONS = Object.freeze([
  ["like_new", "Jako nové / plně funkční"],
  ["needs_repair", "Drobné vady / k opravě"],
  ["clean_surplus", "Čistý zbytkový materiál"],
  ["not_applicable", "Neuplatňuje se"],
]);

export const CZECH_REGIONS = Object.freeze([
  "Hlavní město Praha",
  "Středočeský kraj",
  "Jihočeský kraj",
  "Plzeňský kraj",
  "Karlovarský kraj",
  "Ústecký kraj",
  "Liberecký kraj",
  "Královéhradecký kraj",
  "Pardubický kraj",
  "Kraj Vysočina",
  "Jihomoravský kraj",
  "Olomoucký kraj",
  "Moravskoslezský kraj",
  "Zlínský kraj",
]);

export async function submitAudienceIntake(payload) {
  const result = await supabase.from("audience_intakes").insert({
    audience_kind: payload.audienceKind,
    full_name: payload.fullName.trim(),
    organization_name: payload.organizationName.trim(),
    position_title: payload.positionTitle?.trim() || null,
    email: payload.email.trim().toLowerCase(),
    pillar_interests: payload.pillarInterests || [],
    digital_state: payload.digitalState || null,
    team_size: payload.teamSize?.trim() || null,
    primary_challenge: payload.primaryChallenge?.trim() || null,
    message: payload.message?.trim() || null,
    source: payload.source || "public-web",
    locale: payload.locale || "cs",
  });
  throwIfError(result, "Intake submission failed");
  return { accepted: true };
}

export async function uploadMaterialPhoto({ file, userId }) {
  if (!file || !userId) return null;
  const extension = String(file.name || "image.jpg").split(".").pop()?.toLowerCase() || "jpg";
  const safeExtension = ["jpg", "jpeg", "png", "webp"].includes(extension) ? extension : "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${safeExtension}`;
  const result = await supabase.storage.from("material-bridge").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  throwIfError(result, "Material photo upload failed");
  return path;
}

export async function getMaterialPhotoUrl(path, expiresIn = 900) {
  if (!path) return null;
  const result = await supabase.storage.from("material-bridge").createSignedUrl(path, expiresIn);
  const data = throwIfError(result, "Material photo URL failed");
  return data?.signedUrl || null;
}

export async function createMaterialListing(payload) {
  const result = await supabase
    .from("material_bridge_listings")
    .insert({
      owner_user_id: payload.ownerUserId,
      organization_id: payload.organizationId || null,
      listing_type: payload.listingType,
      title: payload.title.trim(),
      category: payload.category,
      condition_status: payload.conditionStatus || "not_applicable",
      quantity: payload.quantity?.trim() || null,
      description: payload.description?.trim() || null,
      region: payload.region,
      locality: payload.locality?.trim() || null,
      handoff_methods: payload.handoffMethods || [],
      personal_involvement: payload.personalInvolvement || [],
      photo_path: payload.photoPath || null,
      status: "available",
    })
    .select("id")
    .single();
  return throwIfError(result, "Material listing creation failed");
}

export async function listMaterialListings({ listingType = null, region = null } = {}) {
  let query = supabase
    .from("material_bridge_listings")
    .select("id, owner_user_id, organization_id, listing_type, title, category, condition_status, quantity, description, region, locality, handoff_methods, personal_involvement, photo_path, status, created_at, organizations(id, name, organization_type)")
    .eq("status", "available")
    .order("created_at", { ascending: false });
  if (listingType) query = query.eq("listing_type", listingType);
  if (region) query = query.eq("region", region);
  return throwIfError(await query, "Material listings load failed") || [];
}

export async function listMyMaterialListings(userId) {
  if (!userId) return [];
  const result = await supabase
    .from("material_bridge_listings")
    .select("id, owner_user_id, organization_id, listing_type, title, category, condition_status, quantity, description, region, locality, handoff_methods, personal_involvement, photo_path, status, reserved_at, handed_over_at, impact_summary, public_story_consent, created_at")
    .eq("owner_user_id", userId)
    .order("created_at", { ascending: false });
  return throwIfError(result, "My material listings load failed") || [];
}

export async function reserveMaterialListing({ listingId, organizationId = null }) {
  const result = await supabase.rpc("pansofie_reserve_material_listing", {
    target_listing_id: listingId,
    target_organization_id: organizationId,
  });
  return throwIfError(result, "Material reservation failed");
}

export async function markMaterialHandedOver({ listingId, impactSummary = "", publicStoryConsent = false }) {
  const result = await supabase.rpc("pansofie_mark_material_handed_over", {
    target_listing_id: listingId,
    target_impact_summary: impactSummary?.trim() || null,
    target_public_story_consent: Boolean(publicStoryConsent),
  });
  return throwIfError(result, "Material handover failed");
}

export async function cancelMaterialListing(listingId) {
  const result = await supabase
    .from("material_bridge_listings")
    .update({ status: "cancelled", updated_at: new Date().toISOString() })
    .eq("id", listingId)
    .eq("owner_user_id", (await supabase.auth.getUser()).data.user?.id || "");
  throwIfError(result, "Material listing cancellation failed");
  return true;
}

export async function listPublicMaterialStories() {
  const result = await supabase.rpc("pansofie_public_material_stories");
  return throwIfError(result, "Material story feed load failed") || [];
}
