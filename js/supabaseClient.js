// ============================================================
// CLIENTE SUPABASE
// ------------------------------------------------------------
// Projeto HTML/CSS/JS puro: o SDK do Supabase é carregado via CDN
// no index.html (script @supabase/supabase-js antes deste arquivo).
// Usa só a Project URL e a Publishable Key (chave pública, segura
// para expor no frontend — o RLS no banco é quem limita o que essa
// chave pode fazer).
// ============================================================

const SUPABASE_URL = 'https://llzmjevtouhpnwziejat.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_qO1Zq616lMBkEH_xyJWeNQ_ZKBtbntM';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
