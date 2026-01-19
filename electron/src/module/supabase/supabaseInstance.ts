import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export function getSupabase() {
    if (!supabase) {
        const supabaseUrl = 'https://ddhdjyffpjroipetyayf.supabase.co';
        const supabaseKey = 'sb_publishable_VtK-2jjK7eiplyVWFGUEWA_AvK5syx5';

        supabase = createClient(supabaseUrl, supabaseKey);
    }
    return supabase;
}