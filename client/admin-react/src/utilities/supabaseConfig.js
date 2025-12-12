// Import Supabase client creator
import { createClient } from '@supabase/supabase-js'
// Import credentials from secrets file
import { supabaseUrl, Anonkey } from "../secrets/secretKeys.js";

// Create Supabase client with URL and ANON key (not secret key!)
// The anon key is safe to use in frontend - it's public
const supabase = createClient(supabaseUrl, Anonkey);

// Export the configured client for use throughout the app
export default supabase;