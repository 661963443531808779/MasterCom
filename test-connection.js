// Script de test de connectivité Supabase
// Exécuter avec: node test-connection.js

const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

async function testConnection() {
  console.log('🔍 Test de connectivité Supabase...\n');
  
  // Test 1: DNS Resolution
  console.log('1. Test de résolution DNS...');
  try {
    const dns = require('dns');
    const { promisify } = require('util');
    const lookup = promisify(dns.lookup);
    
    const hostname = SUPABASE_URL.replace('https://', '').replace('/rest/v1/', '');
    const result = await lookup(hostname);
    console.log(`✅ DNS résolu: ${result.address}`);
  } catch (error) {
    console.log(`❌ Erreur DNS: ${error.message}`);
  }
  
  // Test 2: HTTP Connection
  console.log('\n2. Test de connexion HTTP...');
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    console.log(`✅ HTTP Status: ${response.status}`);
    console.log(`✅ Headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)}`);
  } catch (error) {
    console.log(`❌ Erreur HTTP: ${error.message}`);
  }
  
  // Test 3: Auth Endpoint
  console.log('\n3. Test de l\'endpoint d\'authentification...');
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/`, {
      method: 'HEAD'
    });
    
    console.log(`✅ Auth Status: ${response.status}`);
  } catch (error) {
    console.log(`❌ Erreur Auth: ${error.message}`);
  }
  
  console.log('\n🏁 Test terminé');
}

testConnection().catch(console.error);
