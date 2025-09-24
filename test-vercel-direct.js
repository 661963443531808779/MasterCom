// Test direct pour Vercel - à exécuter dans la console F12
console.log('🚀 Test Vercel Login Direct');

// Configuration
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV5kh4A';

// Test avec fetch direct
async function testVercelLogin() {
    console.log('🔧 Test de connexion Vercel...');
    
    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
                email: 'master@mastercom.fr',
                password: 'admin123'
            })
        });

        console.log('📡 Status:', response.status);
        console.log('📡 Headers:', [...response.headers.entries()]);
        
        const data = await response.json();
        console.log('📊 Response:', data);
        
        if (response.ok && data.access_token) {
            console.log('✅ LOGIN RÉUSSI !');
            console.log('🎯 Token:', data.access_token.substring(0, 20) + '...');
            console.log('👤 User:', data.user);
            return true;
        } else {
            console.log('❌ LOGIN ÉCHOUÉ');
            console.log('💥 Erreur:', data.error_description || data.msg || 'Erreur inconnue');
            return false;
        }
    } catch (error) {
        console.log('💥 Erreur réseau:', error);
        return false;
    }
}

// Test de configuration
function testConfig() {
    console.log('🔧 Variables d\'environnement:');
    console.log('VITE_SUPABASE_URL:', window?.location?.origin || 'Non disponible');
    console.log('Variables Vite:', import.meta?.env || 'Non disponible');
    
    // Test des valeurs codées en dur
    console.log('URL Supabase:', SUPABASE_URL);
    console.log('Key présente:', !!SUPABASE_ANON_KEY);
    console.log('Key length:', SUPABASE_ANON_KEY.length);
}

// Exécuter les tests
console.log('📋 Tests de diagnostic Vercel');
testConfig();
testVercelLogin();

// Instructions
console.log(`
📝 Instructions:
1. Copiez ce code complet
2. Ouvrez la console F12 sur votre site Vercel
3. Collez et appuyez sur Entrée
4. Regardez les résultats
5. Envoyez-moi tous les logs
`);

// Export pour utilisation
window.testVercelLogin = testVercelLogin;
window.testConfig = testConfig;
