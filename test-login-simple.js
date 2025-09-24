// Script de test simple pour la connexion Supabase
// À exécuter dans la console du navigateur (F12)

console.log('🔑 Test Simple - Connexion Supabase');
console.log('===================================');

// Configuration Supabase
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Fonction de test de connexion simple
async function testSimpleLogin() {
  console.log('🚀 Test de connexion simple...');
  
  try {
    console.log('🔑 Tentative de connexion: master@mastercom.fr / admin123');
    
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({
        email: 'master@mastercom.fr',
        password: 'admin123'
      })
    });
    
    const data = await response.json();
    
    console.log(`- Status: ${response.status}`);
    console.log(`- OK: ${response.ok ? '✅' : '❌'}`);
    
    if (response.ok) {
      console.log('✅ CONNEXION RÉUSSIE!');
      console.log(`- Token: ${data.access_token ? 'Présent' : 'Manquant'}`);
      console.log(`- User ID: ${data.user?.id || 'Manquant'}`);
      console.log(`- Email: ${data.user?.email || 'Manquant'}`);
      console.log(`- Confirmed: ${data.user?.email_confirmed_at ? 'Oui' : 'Non'}`);
      
      alert('✅ CONNEXION RÉUSSIE!\n\nEmail: master@mastercom.fr\nMot de passe: admin123\n\nVous pouvez maintenant vous connecter avec ces identifiants.');
      
      return { success: true, data: data };
    } else {
      console.log(`❌ Connexion échouée: ${data.error_description || data.msg}`);
      
      if (data.error_description?.includes('Invalid login credentials')) {
        console.log('ℹ️ Le compte master@mastercom.fr n\'existe pas ou le mot de passe est incorrect');
        alert('❌ Connexion échouée\n\nLe compte master@mastercom.fr n\'existe pas ou le mot de passe admin123 est incorrect.\n\nVérifiez dans Supabase Dashboard que le compte existe.');
      } else {
        alert(`❌ Connexion échouée\n\nErreur: ${data.error_description || data.msg}\n\nVérifiez la configuration Supabase.`);
      }
      
      return { success: false, error: data.error_description || data.msg };
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`);
    alert(`❌ Erreur de connexion\n\n${error.message}\n\nVérifiez votre connexion internet.`);
    return { success: false, error: error.message };
  }
}

// Fonction de test de connexion réseau
async function testNetworkConnection() {
  console.log('🌐 Test de connexion réseau...');
  
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

// Fonction principale
async function runSimpleTest() {
  console.log('🚀 Démarrage du test simple...');
  
  // Test 1: Connexion réseau
  const networkOk = await testNetworkConnection();
  if (!networkOk) {
    console.log('❌ ARRÊT: Problème de connexion réseau');
    alert('❌ Problème de connexion réseau\n\nVérifiez votre connexion internet et les paramètres Supabase.');
    return;
  }
  
  // Test 2: Connexion avec admin123
  const loginResult = await testSimpleLogin();
  
  if (loginResult.success) {
    console.log('✅ SUCCÈS: Connexion réussie!');
    console.log('Vous pouvez maintenant utiliser master@mastercom.fr / admin123');
  } else {
    console.log('❌ ÉCHEC: Connexion échouée');
    console.log('Vérifiez que le compte master@mastercom.fr existe dans Supabase Dashboard');
  }
}

// Lancer le test
runSimpleTest();
