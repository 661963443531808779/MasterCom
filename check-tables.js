// Vérification des Tables Supabase
// À exécuter dans la console du navigateur (F12)

console.log('🔍 VÉRIFICATION DES TABLES SUPABASE');
console.log('===================================');

const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

const tablesToCheck = ['clients', 'invoices', 'quotes', 'projects'];

async function checkTables() {
  console.log('📋 Tables à vérifier:', tablesToCheck.join(', '));
  console.log('');
  
  for (const table of tablesToCheck) {
    try {
      console.log(`🔍 Vérification de la table: ${table}`);
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&limit=1`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Table "${table}" existe - ${data.length} enregistrement(s) trouvé(s)`);
      } else if (response.status === 404) {
        console.log(`❌ Table "${table}" n'existe pas (404)`);
      } else if (response.status === 403) {
        console.log(`⚠️ Table "${table}" - Accès refusé (403) - Vérifiez les permissions RLS`);
      } else {
        console.log(`❌ Table "${table}" - Erreur ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ Erreur lors de la vérification de "${table}": ${error.message}`);
    }
    
    console.log('');
  }
  
  console.log('📝 RÉSUMÉ:');
  console.log('- ✅ = Table existe et accessible');
  console.log('- ❌ = Table n\'existe pas');
  console.log('- ⚠️ = Table existe mais accès refusé (RLS)');
  console.log('');
  console.log('💡 SOLUTIONS:');
  console.log('1. Créez les tables manquantes dans Supabase Dashboard > Table Editor');
  console.log('2. Configurez les politiques RLS pour les tables avec accès refusé');
  console.log('3. Ou supprimez les composants qui utilisent les tables inexistantes');
}

checkTables();
