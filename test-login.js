// Test de connexion MasterCom - Version Simplifiée
// À exécuter dans la console du navigateur (F12)

console.log('🔑 Test de Connexion MasterCom');
console.log('==============================');

// Configuration Supabase
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Test de connexion
async function testLogin() {
  try {
    console.log('🔑 Test: master@mastercom.fr / admin123');
    
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
    
    if (response.ok) {
      console.log('✅ CONNEXION RÉUSSIE!');
      console.log(`- Token: ${data.access_token ? 'Présent' : 'Manquant'}`);
      console.log(`- User ID: ${data.user?.id || 'Manquant'}`);
      console.log(`- Email: ${data.user?.email || 'Manquant'}`);
      
      alert('✅ CONNEXION RÉUSSIE!\n\nEmail: master@mastercom.fr\nMot de passe: admin123\n\nVous pouvez maintenant vous connecter.');
      
      return true;
    } else {
      console.log(`❌ Connexion échouée: ${data.error_description || data.msg}`);
      alert(`❌ Connexion échouée\n\n${data.error_description || data.msg}\n\nVérifiez que le compte existe dans Supabase Dashboard.`);
      
      return false;
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`);
    alert(`❌ Erreur de connexion\n\n${error.message}\n\nVérifiez votre connexion internet.`);
    
    return false;
  }
}

// Lancer le test
testLogin();
