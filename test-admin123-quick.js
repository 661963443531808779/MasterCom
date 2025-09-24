// Script de test rapide pour le mot de passe admin123
// À exécuter dans la console du navigateur (F12)

console.log('🔑 Test Rapide - Mot de passe admin123');
console.log('=====================================');

// Configuration Supabase
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Emails à tester avec admin123
const emails = [
  'master@mastercom.fr',
  'master@mastercom.com',
  'admin@mastercom.fr',
  'test@mastercom.fr',
  'master@test.com',
  'admin@test.com'
];

// Fonction de test rapide
async function testAdmin123Quick() {
  console.log('🚀 Test rapide avec mot de passe admin123...');
  
  for (const email of emails) {
    try {
      console.log(`🔑 Test: ${email} / admin123`);
      
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          email: email,
          password: 'admin123'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ CONNEXION RÉUSSIE avec: ${email} / admin123`);
        console.log(`- Token: ${data.access_token ? 'Présent' : 'Manquant'}`);
        console.log(`- User ID: ${data.user?.id || 'Manquant'}`);
        console.log(`- Email: ${data.user?.email || 'Manquant'}`);
        console.log(`- Confirmed: ${data.user?.email_confirmed_at ? 'Oui' : 'Non'}`);
        
        // Afficher les identifiants qui fonctionnent
        alert(`✅ CONNEXION RÉUSSIE!\n\nEmail: ${email}\nMot de passe: admin123\n\nVous pouvez maintenant vous connecter avec ces identifiants.`);
        
        return { success: true, email: email, password: 'admin123', data: data };
      } else {
        console.log(`❌ Échec avec ${email}: ${data.error_description || data.msg}`);
      }
    } catch (error) {
      console.log(`❌ Erreur avec ${email}: ${error.message}`);
    }
  }
  
  console.log('❌ Aucun email ne fonctionne avec admin123');
  alert('❌ Aucun email ne fonctionne avec le mot de passe admin123.\n\nVérifiez que le compte existe dans Supabase Dashboard.');
  
  return { success: false, message: 'Aucun email ne fonctionne avec admin123' };
}

// Fonction de création de compte avec admin123
async function createAccountWithAdmin123() {
  console.log('📝 Tentative de création de compte avec admin123...');
  
  for (const email of emails) {
    try {
      console.log(`📝 Création: ${email} / admin123`);
      
      const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          email: email,
          password: 'admin123',
          data: {
            first_name: 'Master',
            last_name: 'Admin'
          }
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.user) {
        console.log(`✅ Compte créé avec succès: ${email} / admin123`);
        console.log(`- User ID: ${data.user.id}`);
        console.log(`- Email: ${data.user.email}`);
        console.log(`- Confirmed: ${data.user.email_confirmed_at ? 'Oui' : 'Non'}`);
        
        alert(`✅ Compte créé avec succès!\n\nEmail: ${email}\nMot de passe: admin123\n\nVous pouvez maintenant vous connecter.`);
        
        return { success: true, user: data.user, email: email, password: 'admin123' };
      } else {
        console.log(`❌ Erreur création ${email}: ${data.error_description || data.msg}`);
        
        if (data.error_description?.includes('already registered')) {
          console.log(`ℹ️ Le compte ${email} existe déjà`);
        }
      }
    } catch (error) {
      console.log(`❌ Erreur création ${email}: ${error.message}`);
    }
  }
  
  console.log('❌ Impossible de créer un compte avec admin123');
  return { success: false, error: 'Impossible de créer un compte avec admin123' };
}

// Fonction principale
async function runQuickTest() {
  console.log('🚀 Démarrage du test rapide admin123...');
  
  // Test 1: Connexion avec admin123
  const loginResult = await testAdmin123Quick();
  
  if (loginResult.success) {
    console.log('✅ SUCCÈS: Connexion réussie avec admin123!');
    return;
  }
  
  // Test 2: Création de compte avec admin123
  console.log('\n📝 Tentative de création de compte...');
  const createResult = await createAccountWithAdmin123();
  
  if (createResult.success) {
    console.log('✅ SUCCÈS: Compte créé avec admin123!');
    return;
  }
  
  console.log('❌ ÉCHEC: Impossible de se connecter ou créer un compte avec admin123');
  console.log('Vérifiez la configuration Supabase dans le dashboard');
}

// Lancer le test
runQuickTest();
