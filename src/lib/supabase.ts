import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  "https://wjwwicqyfxhlkwmmurtr.supabase.co",
  process.env.SUPABASE_API_KEY as string
);
