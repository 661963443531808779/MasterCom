// Test de Connexion Rapide - MasterCom
// À exécuter dans la console du navigateur (F12)

console.log('🔑 Test de Connexion Rapide');
console.log('===========================');

const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Test avec les identifiants qui fonctionnaient
const testCredentials = [
  { email: 'master@master.com', password: 'admin123' },
  { email: 'master@mastercom.fr', password: 'admin123' },
  { email: 'admin@mastercom.fr', password: 'admin123' },
  { email: 'test@mastercom.fr', password: 'admin123' }
];

async function testQuickLogin() {
  console.log('🌐 Test de connexion réseau...');
  
  try {
    const networkResponse = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: { 'apikey': SUPABASE_ANON_KEY }
    });
    
    if (networkResponse.status === 200) {
      console.log('✅ Connexion réseau OK');
    } else {
      console.log(`❌ Erreur réseau: ${networkResponse.status}`);
      return;
    }
  } catch (error) {
    console.log(`❌ Erreur de connexion: ${error.message}`);
    return;
  }
  
  console.log('\n🔑 Test des identifiants...');
  
  for (const cred of testCredentials) {
    try {
      console.log(`🔄 Test: ${cred.email} / ${cred.password}`);
      
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          email: cred.email,
          password: cred.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.user) {
        console.log('✅ CONNEXION RÉUSSIE!');
        console.log(`- Email: ${data.user.email}`);
        console.log(`- UID: ${data.user.id}`);
        console.log(`- Confirmed: ${data.user.email_confirmed_at ? 'Oui' : 'Non'}`);
        console.log(`- Token: ${data.access_token ? 'Présent' : 'Manquant'}`);
        
        alert(`✅ CONNEXION RÉUSSIE!\n\nEmail: ${cred.email}\nMot de passe: ${cred.password}\nUID: ${data.user.id}\n\nUtilisez ces identifiants sur le site!`);
        return;
      } else {
        console.log(`❌ Échec: ${data.error_description || data.msg}`);
      }
    } catch (error) {
      console.log(`❌ Erreur: ${error.message}`);
    }
  }
  
  console.log('\n❌ Aucun identifiant n\'a fonctionné');
  console.log('💡 Vérifiez dans Supabase Dashboard > Authentication > Users');
  alert('❌ Aucun identifiant n\'a fonctionné. Vérifiez dans Supabase Dashboard > Authentication > Users');
}

testQuickLogin();
