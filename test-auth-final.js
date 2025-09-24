// Test final de l'authentification Supabase
// À exécuter dans la console F12 de votre site Vercel

console.log('🚀 Test Final Authentification Supabase');

// Configuration
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Test avec l'email correct
async function testMasterLogin() {
    console.log('🔐 Test de connexion avec master@master.com...');
    
    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
                email: 'master@master.com',
                password: 'admin123'
            })
        });

        console.log('📡 Status:', response.status);
        
        const data = await response.json();
        console.log('📊 Response:', data);
        
        if (response.ok && data.access_token) {
            console.log('✅ CONNEXION RÉUSSIE !');
            console.log('🎯 Token:', data.access_token.substring(0, 20) + '...');
            console.log('👤 User ID:', data.user?.id);
            console.log('📧 Email:', data.user?.email);
            console.log('🔑 Role:', data.user?.role);
            return true;
        } else {
            console.log('❌ CONNEXION ÉCHOUÉE');
            console.log('💥 Erreur:', data.error_description || data.msg || 'Erreur inconnue');
            return false;
        }
    } catch (error) {
        console.log('💥 Erreur réseau:', error);
        return false;
    }
}

// Test de vérification des utilisateurs
async function checkUsers() {
    console.log('👥 Vérification des utilisateurs...');
    
    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('👥 Utilisateurs trouvés:', data.users?.length || 0);
            data.users?.forEach(user => {
                console.log(`- ${user.email} (${user.email_confirmed_at ? 'Confirmé' : 'Non confirmé'})`);
            });
        } else {
            console.log('❌ Impossible de récupérer les utilisateurs');
        }
    } catch (error) {
        console.log('💥 Erreur:', error);
    }
}

// Exécuter les tests
console.log('📋 Tests de diagnostic final');
testMasterLogin();
checkUsers();

// Instructions
console.log(`
📝 Instructions:
1. Assurez-vous d'avoir créé l'utilisateur master@master.com dans Supabase
2. Exécutez ce script dans la console F12
3. Vérifiez que la connexion fonctionne
4. Si ça marche, testez sur votre site avec master@master.com / admin123
`);

// Export pour utilisation
window.testMasterLogin = testMasterLogin;
window.checkUsers = checkUsers;
