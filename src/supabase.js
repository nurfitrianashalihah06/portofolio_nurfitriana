import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log for debugging
if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase URL or Anon Key not configured. Supabase features will be disabled.");
  console.warn("To enable Supabase, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file");
}

// Create client only if both credentials are available
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;