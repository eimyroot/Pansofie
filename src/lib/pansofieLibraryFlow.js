import { supabase } from "@/api/supabaseClient";

export async function listPublicAvailableMaterials(region = null) {
  const { data, error } = await supabase.rpc("pansofie_public_available_materials", {
    target_region: region || null,
  });
  if (error) throw error;
  return data || [];
}
