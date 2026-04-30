import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qrckauyjnzgynefqdzlw.supabase.com';
const supabaseKey = 'sb_publishable_3ibISOCG3QwJuUHXvL3YHw_vjwZeeA3';

export const supabase = createClient(supabaseUrl, supabaseKey);
