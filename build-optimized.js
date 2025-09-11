import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Build optimisé en cours...');

try {
  // Nettoyer le cache
  console.log('🧹 Nettoyage du cache...');
  if (fs.existsSync('node_modules/.vite')) {
    fs.rmSync('node_modules/.vite', { recursive: true, force: true });
  }
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Build avec optimisations
  console.log('⚡ Build avec optimisations...');
  execSync('vite build --mode production', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  // Optimisations post-build
  console.log('🔧 Optimisations post-build...');
  
  // Compresser les assets si possible
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    console.log('✅ Build terminé avec succès !');
    console.log(`📁 Fichiers générés dans: ${distPath}`);
  }

} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  process.exit(1);
}