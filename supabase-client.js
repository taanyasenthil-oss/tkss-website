// Browser-safe Supabase REST client. Publishable keys are intentionally safe to expose.
const SUPABASE_URL = 'https://lecaqqccpuvmelaufdtu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_WRfNT_0l-yXs3k9_QacRug_WPW3M0BD';

export async function selectFromSupabase(table, query = '') {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase ${response.status}: ${detail || 'Unable to load data.'}`);
  }

  return response.json();
}
