// Diagnostic Complet Supabase - Version Finale
// À exécuter dans la console du navigateur (F12)

console.log('🔍 DIAGNOSTIC COMPLET SUPABASE');
console.log('==============================');

const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Liste complète des emails et mots de passe à tester
const credentials = [
  // Emails probables
  { email: 'master@master.com', password: 'admin123' },
  { email: 'master@mastercom.fr', password: 'admin123' },
  { email: 'master@mastercom.com', password: 'admin123' },
  { email: 'admin@mastercom.fr', password: 'admin123' },
  { email: 'admin@mastercom.com', password: 'admin123' },
  { email: 'test@mastercom.fr', password: 'admin123' },
  { email: 'user@mastercom.fr', password: 'admin123' },
  { email: 'contact@mastercom.fr', password: 'admin123' },
  { email: 'info@mastercom.fr', password: 'admin123' },
  
  // Mots de passe alternatifs
  { email: 'master@master.com', password: 'MasterCom2024!' },
  { email: 'master@master.com', password: 'mastercom2024' },
  { email: 'master@master.com', password: 'MasterCom2024' },
  { email: 'master@master.com', password: 'master123' },
  { email: 'master@master.com', password: 'password123' },
  { email: 'master@master.com', password: 'admin' },
  { email: 'master@master.com', password: 'password' },
  { email: 'master@master.com', password: '123456' },
  { email: 'master@master.com', password: 'master' },
  
  // Combinaisons supplémentaires
  { email: 'admin@master.com', password: 'admin123' },
  { email: 'test@master.com', password: 'admin123' },
  { email: 'user@master.com', password: 'admin123' },
  { email: 'master@mastercom.fr', password: 'MasterCom2024!' },
  { email: 'master@mastercom.com', password: 'MasterCom2024!' },
];

async function diagnosticComplet() {
  console.log('🌐 Test 1 - Connexion réseau à Supabase...');
  
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
  
  console.log('\n🔑 Test 2 - Test de toutes les combinaisons...');
  console.log(`📊 ${credentials.length} combinaisons à tester`);
  
  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  
  for (let i = 0; i < credentials.length; i++) {
    const { email, password } = credentials[i];
    const progress = `[${i + 1}/${credentials.length}]`;
    
    try {
      console.log(`${progress} Test: ${email} / ${password}`);
      
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.user) {
        console.log(`✅ SUCCÈS! ${email} / ${password}`);
        console.log(`   - UID: ${data.user.id}`);
        console.log(`   - Email confirmé: ${data.user.email_confirmed_at ? 'Oui' : 'Non'}`);
        console.log(`   - Créé le: ${data.user.created_at}`);
        console.log(`   - Dernière connexion: ${data.user.last_sign_in_at || 'Jamais'}`);
        
        successCount++;
        
        // Alert pour la première connexion réussie
        if (successCount === 1) {
          alert(`🎉 CONNEXION RÉUSSIE!\n\nEmail: ${email}\nMot de passe: ${password}\nUID: ${data.user.id}\n\nUtilisez ces identifiants sur le site!`);
        }
      } else {
        const errorMsg = data.error_description || data.msg || 'Erreur inconnue';
        console.log(`❌ Échec: ${errorMsg}`);
        errors.push({ email, password, error: errorMsg });
        errorCount++;
      }
    } catch (error) {
      console.log(`❌ Erreur: ${error.message}`);
      errors.push({ email, password, error: error.message });
      errorCount++;
    }
    
    // Petite pause pour éviter de surcharger l'API
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n📊 RÉSULTATS FINAUX:');
  console.log(`✅ Connexions réussies: ${successCount}`);
  console.log(`❌ Connexions échouées: ${errorCount}`);
  
  if (successCount > 0) {
    console.log('\n🎉 AU MOINS UNE CONNEXION A RÉUSSI!');
    console.log('Utilisez les identifiants qui ont fonctionné sur le site.');
  } else {
    console.log('\n❌ AUCUNE CONNEXION N\'A RÉUSSI');
    console.log('\n🔍 ANALYSE DES ERREURS:');
    
    const errorTypes = {};
    errors.forEach(err => {
      errorTypes[err.error] = (errorTypes[err.error] || 0) + 1;
    });
    
    Object.entries(errorTypes).forEach(([error, count]) => {
      console.log(`   - "${error}": ${count} fois`);
    });
    
    console.log('\n💡 SOLUTIONS POSSIBLES:');
    console.log('1. Vérifiez dans Supabase Dashboard > Authentication > Users');
    console.log('2. Assurez-vous qu\'un compte existe avec un email valide');
    console.log('3. Vérifiez que le mot de passe est correct');
    console.log('4. Assurez-vous que le compte est activé et confirmé');
    console.log('5. Créez un nouveau compte si nécessaire');
    
    alert(`❌ Aucune connexion n'a réussi\n\nVérifiez dans Supabase Dashboard:\n1. Authentication > Users\n2. Créez un compte si nécessaire\n3. Vérifiez l'email et le mot de passe`);
  }
}

// Lancer le diagnostic
diagnosticComplet();
