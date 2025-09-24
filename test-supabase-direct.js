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

// Fonction de test de connexion avec différents mots de passe et emails
async function testLoginAttempts() {
  console.log('\n🔑 Test 2: Tentatives de connexion');
  
  const emails = [
    'master@mastercom.fr',
    'master@mastercom.com',
    'admin@mastercom.fr',
    'test@mastercom.fr',
    'master@test.com',
    'admin@test.com'
  ];
  
  const passwords = [
    'admin123', // Mot de passe configuré connu
    'MasterCom2024!',
    'mastercom2024',
    'MasterCom2024',
    'master@mastercom.fr',
    'master123',
    'Master123!',
    'password123',
    'MasterCom2023!',
    'master2024',
    'admin',
    'password',
    '123456',
    'master',
    'MasterCom',
    'mastercom',
    'MasterCom2025!',
    'mastercom2025',
    'test123',
    'Test123!'
  ];
  
  for (const email of emails) {
    for (const password of passwords) {
      try {
        console.log(`🔑 Test avec: ${email} / ${password}`);
        
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
          console.log(`✅ CONNEXION RÉUSSIE avec: ${email} / ${password}`);
          console.log(`- Token: ${data.access_token ? 'Présent' : 'Manquant'}`);
          console.log(`- User ID: ${data.user?.id || 'Manquant'}`);
          console.log(`- Email: ${data.user?.email || 'Manquant'}`);
          return { success: true, email: email, password: password, data: data };
        } else {
          console.log(`❌ Échec avec ${email} / ${password}: ${data.error_description || data.msg}`);
        }
      } catch (error) {
        console.log(`❌ Erreur avec ${email} / ${password}: ${error.message}`);
      }
    }
  }
  
  return { success: false, message: 'Aucune combinaison email/mot de passe ne fonctionne' };
}

// Fonction de création de compte avec plusieurs emails
async function testAccountCreation() {
  console.log('\n📝 Test 3: Création de compte');
  
  const emails = [
    'master@mastercom.fr',
    'master@mastercom.com',
    'admin@mastercom.fr',
    'test@mastercom.fr',
    'master@test.com',
    'admin@test.com'
  ];
  
  const passwords = [
    'MasterCom2024!',
    'mastercom2024',
    'MasterCom2024',
    'master123',
    'admin123',
    'password123'
  ];
  
  for (const email of emails) {
    for (const password of passwords) {
      try {
        console.log(`📝 Tentative de création: ${email} / ${password}`);
        
        const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY
          },
          body: JSON.stringify({
            email: email,
            password: password,
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
          console.log(`✅ Compte créé avec succès: ${email} / ${password}`);
          console.log(`- User ID: ${data.user.id}`);
          console.log(`- Email: ${data.user.email}`);
          console.log(`- Confirmed: ${data.user.email_confirmed_at ? 'Oui' : 'Non'}`);
          return { success: true, user: data.user, email: email, password: password };
        } else {
          console.log(`❌ Erreur création ${email}: ${data.error_description || data.msg}`);
          
          if (data.error_description?.includes('already registered')) {
            console.log(`ℹ️ Le compte ${email} existe déjà`);
            // Essayer de se connecter avec ce compte
            try {
              const loginResponse = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
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
              
              const loginData = await loginResponse.json();
              
              if (loginResponse.ok) {
                console.log(`✅ Connexion réussie avec compte existant: ${email} / ${password}`);
                return { success: true, user: loginData.user, email: email, password: password, existing: true };
              }
            } catch (loginError) {
              console.log(`❌ Impossible de se connecter avec ${email} / ${password}`);
            }
          }
        }
      } catch (error) {
        console.log(`❌ Erreur création ${email}: ${error.message}`);
      }
    }
  }
  
  return { success: false, error: 'Impossible de créer un compte avec tous les emails testés' };
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
