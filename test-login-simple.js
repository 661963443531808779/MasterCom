// Test de connexion simple - Version Finale
// À exécuter dans la console du navigateur (F12)

console.log('🔑 Test de Connexion Simple');
console.log('===========================');

// Configuration Supabase
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Test avec master@master.com et admin123
async function testSimpleLogin() {
  const email = 'master@master.com';
  const password = 'admin123';
  
  try {
    console.log(`🔑 Test: ${email} / ${password}`);
    
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
    
    console.log(`- Status: ${response.status}`);
    console.log(`- OK: ${response.ok ? '✅' : '❌'}`);
    
    if (response.ok) {
      console.log('✅ CONNEXION RÉUSSIE!');
      console.log(`- Email: ${data.user.email}`);
      console.log(`- UID: ${data.user.id}`);
      console.log(`- Token: ${data.access_token ? 'Présent' : 'Manquant'}`);
      console.log(`- Confirmed: ${data.user.email_confirmed_at ? 'Oui' : 'Non'}`);
      
      alert(`✅ CONNEXION RÉUSSIE!\n\nEmail: ${data.user.email}\nMot de passe: ${password}\nUID: ${data.user.id}\n\nVous pouvez maintenant vous connecter sur le site.`);
      
      return true;
    } else {
      console.log(`❌ Connexion échouée: ${data.error_description || data.msg}`);
      alert(`❌ Connexion échouée\n\n${data.error_description || data.msg}\n\nVérifiez vos identifiants dans Supabase Dashboard.`);
      
      return false;
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`);
    alert(`❌ Erreur de connexion\n\n${error.message}\n\nVérifiez votre connexion internet.`);
    
    return false;
  }
}

// Lancer le test
testSimpleLogin();
