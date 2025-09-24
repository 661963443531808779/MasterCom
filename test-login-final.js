// Test de connexion final - Version Ultra-Simple
// À exécuter dans la console du navigateur (F12)

console.log('🔑 Test de Connexion Final');
console.log('==========================');

// Configuration Supabase
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Test de connexion avec l'email et mot de passe que vous utilisez
async function testLogin(email, password) {
  try {
    console.log(`🔑 Test de connexion: ${email} / ${password}`);
    
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
      
      alert(`✅ CONNEXION RÉUSSIE!\n\nEmail: ${data.user.email}\nUID: ${data.user.id}\n\nVous pouvez maintenant vous connecter avec ces identifiants.`);
      
      return { success: true, user: data.user };
    } else {
      console.log(`❌ Connexion échouée: ${data.error_description || data.msg}`);
      alert(`❌ Connexion échouée\n\n${data.error_description || data.msg}\n\nVérifiez vos identifiants.`);
      
      return { success: false, error: data.error_description || data.msg };
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`);
    alert(`❌ Erreur de connexion\n\n${error.message}\n\nVérifiez votre connexion internet.`);
    
    return { success: false, error: error.message };
  }
}

// Fonction pour tester avec vos identifiants
async function testWithYourCredentials() {
  // Remplacez par vos vrais identifiants
  const email = prompt('Entrez votre email Supabase:');
  const password = prompt('Entrez votre mot de passe Supabase:');
  
  if (email && password) {
    await testLogin(email, password);
  } else {
    alert('Email et mot de passe requis');
  }
}

// Lancer le test
testWithYourCredentials();
