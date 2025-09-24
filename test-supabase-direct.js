// Script de test direct Supabase pour MasterCom
// À exécuter dans la console du navigateur (F12)

console.log('🧪 Test Direct Supabase MasterCom');
console.log('=====================================');

// Configuration Supabase
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Fonction de test de connexion réseau
async function testNetworkConnection() {
  console.log('\n🌐 Test 1: Connexion réseau');
  try {
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

// Fonction de test de connexion avec différents mots de passe
async function testLoginAttempts() {
  console.log('\n🔑 Test 2: Tentatives de connexion');
  
  const passwords = [
    'MasterCom2024!',
    'mastercom2024',
    'MasterCom2024',
    'master@mastercom.fr',
    'master123',
    'Master123!',
    'admin123',
    'password123',
    'MasterCom2023!',
    'master2024',
    'admin',
    'password',
    '123456',
    'master',
    'MasterCom',
    'mastercom'
  ];
  
  for (const password of passwords) {
    try {
      console.log(`🔑 Test avec: ${password}`);
      
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          email: 'master@mastercom.fr',
          password: password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ CONNEXION RÉUSSIE avec: ${password}`);
        console.log(`- Token: ${data.access_token ? 'Présent' : 'Manquant'}`);
        console.log(`- User ID: ${data.user?.id || 'Manquant'}`);
        console.log(`- Email: ${data.user?.email || 'Manquant'}`);
        return { success: true, password: password, data: data };
      } else {
        console.log(`❌ Échec avec ${password}: ${data.error_description || data.msg}`);
      }
    } catch (error) {
      console.log(`❌ Erreur avec ${password}: ${error.message}`);
    }
  }
  
  return { success: false, message: 'Aucun mot de passe ne fonctionne' };
}

// Fonction de création de compte
async function testAccountCreation() {
  console.log('\n📝 Test 3: Création de compte');
  
  try {
    console.log('📝 Tentative de création avec master@mastercom.fr...');
    
    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({
        email: 'master@mastercom.fr',
        password: 'MasterCom2024!',
        data: {
          first_name: 'Master',
          last_name: 'Admin'
        }
      })
    });
    
    const data = await response.json();
    
    console.log(`- Status: ${response.status}`);
    console.log(`- OK: ${response.ok ? '✅' : '❌'}`);
    
    if (response.ok && data.user) {
      console.log('✅ Compte créé avec succès!');
      console.log(`- User ID: ${data.user.id}`);
      console.log(`- Email: ${data.user.email}`);
      console.log(`- Confirmed: ${data.user.email_confirmed_at ? 'Oui' : 'Non'}`);
      return { success: true, user: data.user };
    } else {
      console.log(`❌ Erreur création: ${data.error_description || data.msg}`);
      
      if (data.error_description?.includes('already registered')) {
        console.log('ℹ️ Le compte existe déjà');
        return { success: false, exists: true, error: data.error_description };
      }
      
      return { success: false, error: data.error_description || data.msg };
    }
  } catch (error) {
    console.log(`❌ Erreur création: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Fonction de test avec email alternatif
async function testAlternativeEmail() {
  console.log('\n📧 Test 4: Création avec email alternatif');
  
  try {
    console.log('📝 Tentative de création avec master@mastercom.com...');
    
    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({
        email: 'master@mastercom.com',
        password: 'MasterCom2024!',
        data: {
          first_name: 'Master',
          last_name: 'Admin'
        }
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.user) {
      console.log('✅ Compte créé avec email alternatif!');
      console.log(`- User ID: ${data.user.id}`);
      console.log(`- Email: ${data.user.email}`);
      return { success: true, user: data.user };
    } else {
      console.log(`❌ Erreur création email alternatif: ${data.error_description || data.msg}`);
      return { success: false, error: data.error_description || data.msg };
    }
  } catch (error) {
    console.log(`❌ Erreur création email alternatif: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Fonction principale de test
async function runAllTests() {
  console.log('🚀 Démarrage des tests Supabase...');
  
  // Test 1: Connexion réseau
  const networkOk = await testNetworkConnection();
  if (!networkOk) {
    console.log('\n❌ ARRÊT: Problème de connexion réseau');
    return;
  }
  
  // Test 2: Tentatives de connexion
  const loginResult = await testLoginAttempts();
  if (loginResult.success) {
    console.log('\n✅ SUCCÈS: Connexion réussie!');
    console.log(`Mot de passe qui fonctionne: ${loginResult.password}`);
    return;
  }
  
  // Test 3: Création de compte
  const createResult = await testAccountCreation();
  if (createResult.success) {
    console.log('\n✅ SUCCÈS: Compte créé!');
    console.log('Maintenant testez la connexion avec master@mastercom.fr / MasterCom2024!');
    return;
  }
  
  if (createResult.exists) {
    console.log('\n⚠️ Le compte existe déjà mais aucun mot de passe ne fonctionne');
    console.log('Suggestion: Réinitialisez le mot de passe dans Supabase Dashboard');
  }
  
  // Test 4: Email alternatif
  const altResult = await testAlternativeEmail();
  if (altResult.success) {
    console.log('\n✅ SUCCÈS: Compte créé avec email alternatif!');
    console.log('Utilisez master@mastercom.com / MasterCom2024!');
    return;
  }
  
  console.log('\n❌ ÉCHEC: Impossible de créer ou se connecter');
  console.log('Vérifiez la configuration Supabase dans le dashboard');
}

// Lancer les tests
runAllTests();
