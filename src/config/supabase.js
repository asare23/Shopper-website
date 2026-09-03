import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL ||
  "https://itrxwmilbthjmjyvimfp.supabase.co";
const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY || "your-anon-key-here"; // Replace with actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
