// Test de connexion directe avec vos identifiants
// À exécuter dans la console du navigateur (F12)

console.log('🔑 Test de Connexion Directe');
console.log('============================');

// Configuration Supabase
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Test avec master@master.com et différents mots de passe
async function testLoginDirect() {
  const email = 'master@master.com';
  const passwords = [
    'admin123',
    'MasterCom2024!',
    'mastercom2024',
    'MasterCom2024',
    'master123',
    'password123',
    'admin',
    'password',
    '123456',
    'master'
  ];
  
  console.log(`🔑 Test avec email: ${email}`);
  console.log(`🔑 Mots de passe à tester: ${passwords.length}`);
  
  for (const password of passwords) {
    try {
      console.log(`\n🔑 Test: ${email} / ${password}`);
      
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ CONNEXION RÉUSSIE!');
        console.log(`- Email: ${data.user.email}`);
        console.log(`- UID: ${data.user.id}`);
        console.log(`- Token: ${data.access_token ? 'Présent' : 'Manquant'}`);
        console.log(`- Confirmed: ${data.user.email_confirmed_at ? 'Oui' : 'Non'}`);
        
        alert(`✅ CONNEXION RÉUSSIE!\n\nEmail: ${data.user.email}\nMot de passe: ${password}\nUID: ${data.user.id}\n\nVous pouvez maintenant vous connecter avec ces identifiants.`);
        
        return { success: true, email: data.user.email, password: password, uid: data.user.id };
      } else {
        console.log(`❌ Échec: ${data.error_description || data.msg}`);
      }
    } catch (error) {
      console.log(`❌ Erreur: ${error.message}`);
    }
  }
  
  console.log('\n❌ Aucun mot de passe n\'a fonctionné');
  alert('❌ Aucun mot de passe n\'a fonctionné\n\nVérifiez dans Supabase Dashboard:\n1. Que le compte master@master.com existe\n2. Que le mot de passe est correct\n3. Que le compte est activé');
  
  return { success: false };
}

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

// Fonction principale
async function runTest() {
  console.log('🚀 Démarrage du test de connexion...');
  
  // Test 1: Connexion réseau
  const networkOk = await testNetworkConnection();
  if (!networkOk) {
    console.log('❌ ARRÊT: Problème de connexion réseau');
    return;
  }
  
  // Test 2: Connexion avec master@master.com
  const result = await testLoginDirect();
  
  if (result.success) {
    console.log('\n✅ SUCCÈS: Identifiants trouvés!');
    console.log(`Email: ${result.email}`);
    console.log(`Mot de passe: ${result.password}`);
    console.log(`UID: ${result.uid}`);
  } else {
    console.log('\n❌ ÉCHEC: Aucun identifiant valide trouvé');
    console.log('Vérifiez manuellement dans Supabase Dashboard');
  }
}

// Lancer le test
runTest();
