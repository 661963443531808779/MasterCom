// Test de connexion avec l'UID fourni
// À exécuter dans la console du navigateur (F12)

console.log('🔑 Test de Connexion avec UID');
console.log('==============================');

// Configuration Supabase
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// UID fourni par l'utilisateur
const USER_UID = '4b83f2c6-ca3a-48b5-9a4e-694b725a0d44';

// Test de connexion réseau
async function testNetworkConnection() {
  try {
    console.log('🌐 Test de connexion réseau...');
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    console.log(`- Status: ${response.status}`);
    console.log(`- OK: ${response.ok ? '✅' : '❌'}`);
    
    if (response.ok) {
      console.log('✅ Connexion réseau OK');
      return true;
    } else {
      console.log('❌ Problème de connexion réseau');
      return false;
    }
  } catch (error) {
    console.log(`❌ Erreur réseau: ${error.message}`);
    return false;
  }
}

// Test de récupération des utilisateurs
async function testGetUsers() {
  try {
    console.log('👥 Test de récupération des utilisateurs...');
    
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Utilisateurs récupérés: ${data.users?.length || 0}`);
      
      // Chercher l'utilisateur avec l'UID fourni
      const user = data.users?.find(u => u.id === USER_UID);
      if (user) {
        console.log('✅ Utilisateur trouvé:');
        console.log(`- ID: ${user.id}`);
        console.log(`- Email: ${user.email}`);
        console.log(`- Confirmed: ${user.email_confirmed_at ? 'Oui' : 'Non'}`);
        console.log(`- Created: ${user.created_at}`);
        return user;
      } else {
        console.log('❌ Utilisateur avec UID non trouvé');
        return null;
      }
    } else {
      console.log(`❌ Erreur récupération utilisateurs: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`);
    return null;
  }
}

// Fonction principale
async function runTest() {
  console.log('🚀 Démarrage du test...');
  
  // Test 1: Connexion réseau
  const networkOk = await testNetworkConnection();
  if (!networkOk) {
    console.log('❌ ARRÊT: Problème de connexion réseau');
    return;
  }
  
  // Test 2: Récupération des utilisateurs
  const user = await testGetUsers();
  
  if (user) {
    console.log('✅ SUCCÈS: Utilisateur trouvé!');
    console.log(`Vous pouvez vous connecter avec: ${user.email}`);
  } else {
    console.log('❌ ÉCHEC: Utilisateur non trouvé');
    console.log('Vérifiez que l\'UID est correct dans Supabase Dashboard');
  }
}

// Lancer le test
runTest();
