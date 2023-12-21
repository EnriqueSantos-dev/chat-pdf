import { supabaseClient } from "./supabase";

export async function uploadToSupabase(file: File | Buffer, filename: string) {
  const { error } = await supabaseClient.storage
    .from("chatpdf")
    .upload(filename, file);

  if (error) return null;

  const { data } = supabaseClient.storage
    .from("chatpdf")
    .getPublicUrl(filename);

  return data.publicUrl;
}
